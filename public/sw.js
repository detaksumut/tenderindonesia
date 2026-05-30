// Service worker for Tender Intelligence Indonesia PWA installation
const CACHE_NAME = 'tii-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Pass-through fetch event handler to satisfy browser PWA install criteria
// without caching stale bundles, keeping the app 100% up-to-date with Vercel.
self.addEventListener('fetch', (event) => {
  // Directly fetch from network
  event.respondWith(fetch(event.request));
});
