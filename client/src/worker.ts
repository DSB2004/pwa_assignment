export { }
// Declare cache names
const CACHE_NAME: string = 'offline-cache';
const OFFLINE_URLS: string[] = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/logo192.png',
    '/offline.html',
];

// List of assets to cache
const ASSETS_TO_CACHE: string[] = [
    '/static/js/main.js',
    '/static/css/main.css',
];

// API endpoint cache
const API_CACHE_NAME: string = 'api-cache';
declare const self: ServiceWorkerGlobalScope;



// Install event
self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache: Cache) => {
            return cache.addAll([...OFFLINE_URLS, ...ASSETS_TO_CACHE]);
        })
    );
    console.log("Static assets cached");
});

// Activate event
self.addEventListener('activate', (event: ExtendableEvent) => {
    const cacheWhitelist: string[] = [CACHE_NAME, API_CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames: string[]) => {
            return Promise.all(
                cacheNames.map((cacheName: string) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event: FetchEvent) => {
    if (event.request.method === 'GET') {
        if (event.request.url.includes('/api/')) {
            event.respondWith(
                fetch(event.request).then((networkResponse: Response) => {
                    if (networkResponse && networkResponse.ok) {
                        return caches.open(API_CACHE_NAME).then((cache: Cache) => {
                            cache.put(event.request.url, networkResponse.clone());
                            return networkResponse;
                        });
                    } else {
                        return caches.match(event.request).then((cachedResponse: Response | undefined) => {
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
                caches.match(event.request).then((cachedResponse: Response | undefined) => {
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
    } else if (event.request.method === 'PUT') {
        if (event.request.url.includes('/api/')) {
            // Clone the request so we can read its body
            const clonedRequest: Request = event.request.clone();
            event.respondWith(
                clonedRequest.json().then((requestData: any) => {
                    return fetch(event.request).then((networkResponse: Response) => {
                        if (!networkResponse || !networkResponse.ok) {
                            console.error("PUT request failed with status:", networkResponse.status);
                            return networkResponse;
                        } else {
                            console.log("PUT request successful");
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
