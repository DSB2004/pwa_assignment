"use strict";

const DB_NAME = 'offline-requests';
const STORE_NAME = 'failedPutRequests';

async function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onerror = (event) => reject('Failed to open IndexedDB');
        request.onsuccess = (event) => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(STORE_NAME, { autoIncrement: true });
        };
    });
}

async function saveFailedRequest(url, data) {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const request = store.add({ url, data });
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => reject('Failed to save request to IndexedDB');
    }).finally(() => {
        transaction.oncomplete = () => db.close();
    });
}


async function syncFailedRequests() {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const allRequests = await new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('Failed to retrieve requests from IndexedDB');
    });
    for (const request of allRequests) {
        const { url, data } = request;
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
    const deleteTransaction = db.transaction(STORE_NAME, 'readwrite');
    const deleteStore = deleteTransaction.objectStore(STORE_NAME);


    await new Promise((resolve, reject) => {
        const clearRequest = deleteStore.clear();
        clearRequest.onsuccess = () => {
            console.log("All failed requests cleared from IndexedDB.");
            resolve();
        };
        clearRequest.onerror = () => reject('Failed to clear requests from IndexedDB');
    });

    db.close();
}

const CACHE_NAME = 'offline-cache';
const OFFLINE_URLS = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/logo192.png',
    '/offline.html',
];

// List of assets to cache
const ASSETS_TO_CACHE = [
    '/static/js/main.js',
    '/static/css/main.css',
];

// API endpoint cache
const API_CACHE_NAME = 'api-cache';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll([...OFFLINE_URLS, ...ASSETS_TO_CACHE]);
        })
    );
    console.log("Static assets cached");
});

self.addEventListener('activate', function (event) {
    const cacheWhitelist = [CACHE_NAME, API_CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method === 'GET') {
        if (event.request.url.includes('/api/')) {
            event.respondWith(
                fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.ok) {
                        return caches.open(API_CACHE_NAME).then((cache) => {
                            cache.put(event.request.url, networkResponse.clone());
                            return networkResponse;
                        });
                    } else {
                        return caches.match(event.request).then(cachedResponse => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            return new Response('Network error occurred. Please try again later.', { status: 404 });
                        });
                    }
                })
            );
        } else {
            // Handling static assets
            event.respondWith(
                caches.match(event.request).then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse; // Return cached response if available
                    }
                    return fetch(event.request).catch(() => {
                        // If fetch fails, serve the offline page
                        return caches.match('/offline.html');
                    });
                })
            );
        }
    }

    if (event.request.method === 'PUT') {
        if (event.request.url.includes('/api/')) {
            const clonedRequest = event.request.clone();
            event.respondWith(
                clonedRequest.json().then(requestData => {
                    return fetch(event.request).then(async (networkResponse) => {
                        if (!networkResponse || !networkResponse.ok) {
                            saveFailedRequest(event.request.url, requestData);

                            return new Response('Failed to create resource, saved locally.', { status: 200 });
                        } else {
                            console.log("PUT request successful");
                            await self.registration.sync.register('sync-failed-requests')
                            return networkResponse;
                        }
                    });
                }).catch(err => {
                    console.error("Error reading request data:", err);
                    return new Response('Invalid request data.', { status: 400 });
                })
            );
        }
    }
});

self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-failed-requests') {
        console.log("Sync event triggered");
        event.waitUntil(syncFailedRequests());
    }
});

