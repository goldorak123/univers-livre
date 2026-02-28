const CACHE_NAME = 'simon-lero-v48';
const urlsToCache = [
    '/',
    '/livre-accueil.html',
    '/livre.html',
    '/resume.html',
    '/fiche-technique.html',
    '/distribution.html',
    '/faq.html',
    '/contact.html',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png',
    '/apple-touch-icon.png',
    '/fond-livre-accueil-ultra.jpg'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    // Stratégie Network-first : On essaie le réseau, si ça échoue (hors ligne), on prend le cache.
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Si la réponse est valide, on peut optionnellement mettre à jour le cache ici
                // Mais pour l'instant on se contente de la renvoyer pour garantir la fraîcheur.
                return response;
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
