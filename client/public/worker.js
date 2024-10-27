"use strict";


var CACHE_NAME = 'offline-cache';
var OFFLINE_URLS = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/logo192.png',
];
self.addEventListener('install', function (event) {
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
        return cache.addAll(OFFLINE_URLS);
    }));
});
self.addEventListener('activate', function (event) {
    var cacheWhitelist = [CACHE_NAME];
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) {
            if (!cacheWhitelist.includes(cacheName)) {
                return caches.delete(cacheName);
            }
        }));
    }));
    self.clients.claim();
});
self.addEventListener('fetch', function (event) {
    console.log("Request made")
    if (event.request.method === 'GET') {
        event.respondWith(caches.match(event.request).then(function (cachedResponse) {
            return cachedResponse || fetch(event.request);
        }));
    }
});
