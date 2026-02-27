const CACHE_NAME = 'simonlero-nuclear-v27-icons';
const urlsToCache = [
    '/livre-accueil-v27.html',
    '/livre-accueil.html',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png',
    '/apple-touch-icon.png'
];

self.addEventListener('install', event => {
    // Force activation immediate
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('SW: Caching assets');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('SW: Claiming clients and purging old caches');
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        )).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    // Stratégie Network-First pour éviter que le bouton "Rafraîchir" ne revienne
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
