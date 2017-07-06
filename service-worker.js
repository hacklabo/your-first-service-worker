var cacheName = 'your-first-service-worker';

var urlsToCache = [
    '/',
    'css/tachyons.min.css',
    'img/andre-benz-248755.jpg',
    'img/andre-benz-250740.jpg',
    'img/andre-benz-256762.jpg',
    'img/redd-angelo-230297.jpg'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch the contents and reply with cache
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});