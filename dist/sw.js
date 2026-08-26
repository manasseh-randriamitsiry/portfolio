const CACHE_NAME = 'manasseh-portfolio-v1';

const cacheResponse = async (request, response) => {
  if (response && response.ok && response.type === 'basic') {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
  }
  return response;
};

self.addEventListener('install', (event) => {
  const appShell = new URL('./', self.registration.scope).toString();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.add(appShell))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith('manasseh-portfolio-') && key !== CACHE_NAME)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // Always try to refresh HTML first so deployments are visible immediately.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => cacheResponse(request, response))
        .catch(async () => (await caches.match(request)) || caches.match(new URL('./', self.registration.scope).toString()))
    );
    return;
  }

  // App assets are served from cache on repeat visits while a fresh copy is
  // retrieved in the background for the next navigation.
  const freshResponse = fetch(request).then((response) => cacheResponse(request, response));
  event.waitUntil(freshResponse.catch(() => undefined));
  event.respondWith(caches.match(request).then((cachedResponse) => cachedResponse || freshResponse));
});
