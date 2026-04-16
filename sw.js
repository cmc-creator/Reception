// Service worker intentionally disabled.
// This file exists only to unregister any previously installed SW and clear caches.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .then(() => self.clients.matchAll({ includeUncontrolled: true }))
      .then(clients => clients.forEach(client => {
        // Use cache-busting query param to bypass HTTP disk cache
        var base = client.url.split('?')[0];
        client.navigate(base + '?nocache=' + Date.now());
      }))
      .then(() => self.registration.unregister())
  );
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
