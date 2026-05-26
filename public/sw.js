// Service Worker para Cope - PWA básico
const CACHE_NAME = 'cope-v1';
const urlsToCache = [
  '/',
  '/icon-192.png',
  '/icon-512.png',
];

// Instalar service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia de caché: Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Caché la respuesta
        const cache = caches.open(CACHE_NAME);
        cache.then((c) => c.put(event.request, response.clone()));
        return response;
      })
      .catch(() => {
        // Si falla, usa el caché
        return caches.match(event.request);
      })
  );
});
