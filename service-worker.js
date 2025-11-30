const CACHE_NAME = "sat-pro-master-evo-v1";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./router.js",
  "./questions-reading.js",
  "./questions-writing.js",
  "./questions-math.js",
  "./explanations.js",
  "./exam-engine.js",
  "./scoring.js",
  "./analytics.js",
  "./gamification.js",
  "./parent-dashboard.js",
  "./ai-tutor.js",
  "./premium-features.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
