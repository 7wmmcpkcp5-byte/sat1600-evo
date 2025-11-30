const CACHE_NAME = 'sat-owl-evo-v1.0';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './questions.js',
  './explanations.js',
  './gamification.js',
  './premium-features.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
