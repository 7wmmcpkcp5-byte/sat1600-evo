const CACHE_NAME = 'parent-dashboard-beta-v1';
const urlsToCache = [
    './',
    './index.html',
    './styles/style.css',
    './scripts/app.js',
    './scripts/analytics.js',
    './scripts/questions.js',
    './scripts/gamification.js'
];

// Instalación
self.addEventListener('install', event => {
    console.log('Service Worker instalado');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Activación
self.addEventListener('activate', event => {
    console.log('Service Worker activado');
});

// Fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Devuelve la versión en cache o busca en la red
                return response || fetch(event.request);
            })
    );
});
