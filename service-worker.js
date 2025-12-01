// service-worker.js - ACTUALIZADO para SAT OWL PRO
const CACHE_NAME = 'sat-owl-pro-v2.0';
const FILES_TO_CACHE = [
  // === ARCHIVOS PRINCIPALES ===
  './',
  './index.html',
  './analytics-dashboard.html',
  
  // === ESTILOS ===
  './style.css',
  
  // === MÓDULOS ESENCIALES ===
  './main.js',
  './config.js',
  './data-service.js',
  './ui-components.js',
  './analytics-manager.js',
  './premium-features.js',
  './parent-dashboard.js',
  
  // === DATOS ===
  './data/math-algebra.js',
  './data/question-repository.js',
  
  // === RECURSOS EXTERNOS ===
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  
  // === MANIFEST ===
  './manifest.json'
];

// === ESTRATEGIAS DE CACHE ===
const CACHE_STRATEGIES = {
  STATIC: 'static-v1',
  DATA: 'data-v1',
  EXTERNAL: 'external-v1'
};

self.addEventListener('install', (event) => {
  console.log('🔄 Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache de archivos estáticos
      caches.open(CACHE_STRATEGIES.STATIC)
        .then(cache => cache.addAll(FILES_TO_CACHE.filter(file => !file.includes('http')))),
      
      // Cache de recursos externos
      caches.open(CACHE_STRATEGIES.EXTERNAL)
        .then(cache => cache.addAll(FILES_TO_CACHE.filter(file => file.includes('http')))),
      
      self.skipWaiting()
    ]).then(() => {
      console.log('✅ Service Worker installed successfully');
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('🎯 Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Eliminar caches antiguos
          if (!Object.values(CACHE_STRATEGIES).includes(cacheName) && 
              cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker activated');
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  
  // Solo manejar requests GET
  if (request.method !== 'GET') return;

  // Estrategias diferentes según el tipo de recurso
  if (request.url.includes('cdn.jsdelivr.net') || 
      request.url.includes('fonts.googleapis.com')) {
    // Recursos externos - Cache First
    event.respondWith(cacheFirst(request));
  } else if (request.url.includes('/data/')) {
    // Datos - Network First
    event.respondWith(networkFirst(request));
  } else {
    // Archivos de la app - Cache First
    event.respondWith(cacheFirst(request));
  }
});

// === ESTRATEGIAS DE CACHE ===

function cacheFirst(request) {
  return caches.match(request).then(response => {
    // Si está en cache, devolverlo
    if (response) {
      return response;
    }
    
    // Si no está en cache, buscar en red y guardar
    return fetch(request).then(networkResponse => {
      if (networkResponse.ok) {
        const responseClone = networkResponse.clone();
        caches.open(CACHE_STRATEGIES.STATIC)
          .then(cache => cache.put(request, responseClone));
      }
      return networkResponse;
    }).catch(() => {
      // Fallback para HTML requests
      if (request.headers.get('Accept').includes('text/html')) {
        return caches.match('./index.html');
      }
    });
  });
}

function networkFirst(request) {
  return fetch(request).then(networkResponse => {
    // Si la red responde, actualizar cache
    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      caches.open(CACHE_STRATEGIES.DATA)
        .then(cache => cache.put(request, responseClone));
    }
    return networkResponse;
  }).catch(() => {
    // Si falla la red, usar cache
    return caches.match(request);
  });
}

// === SINCRONIZACIÓN EN SEGUNDO PLANO ===
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Aquí puedes agregar lógica de sincronización
  // Por ejemplo, enviar analytics pendientes
  console.log('🔄 Performing background sync...');
}

// === MANEJO DE PUSH NOTIFICATIONS ===
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'Nueva actualización disponible',
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || './'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'SAT OWL PRO', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});

// === MANEJO DE ERRORES ===
self.addEventListener('error', (event) => {
  console.error('❌ Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Service Worker unhandled rejection:', event.reason);
});

console.log('🎯 SAT OWL PRO Service Worker loaded successfully');