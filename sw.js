// Service Worker for Offline Support
const CACHE_NAME = 'reception-calendar-v10';
const urlsToCache = [
  './',
  './index.html'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .catch((err) => console.log('Service Worker: Cache failed', err))
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip Firebase and external API requests
  if (event.request.url.includes('firestore.googleapis.com') || 
      event.request.url.includes('identitytoolkit.googleapis.com') ||
      event.request.url.includes('securetoken.googleapis.com')) {
    return;
  }

  // Always prefer network for HTML/doc navigations to avoid stale app shells.
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && event.request.url.startsWith('http')) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache))
              .catch(() => {
                // Ignore cache write issues.
              });
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request).then((fetchResponse) => {
          // Don't cache if not a valid response
          if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
            return fetchResponse;
          }

          // Clone the response
          const responseToCache = fetchResponse.clone();

          // Only cache http/https requests to avoid chrome-extension errors
          if (event.request.url.startsWith('http')) {
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch(() => {
                // Silently fail if caching fails (e.g., due to unsupported scheme)
              });
          }

          return fetchResponse;
        });
      })
      .catch(() => {
        // Return offline page or fallback
        return caches.match('./index.html');
      })
  );
});
