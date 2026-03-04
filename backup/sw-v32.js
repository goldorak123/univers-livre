const CACHE_NAME = 'simonlero-plume-v32';
const urlsToCache = [
    '/livre-accueil-v32.html',
    '/livre-accueil.html',
    '/manifest-v32.json',
    '/pwa-plume-192.png',
    '/pwa-plume-512.png',
    '/pwa-plume-apple.png'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
