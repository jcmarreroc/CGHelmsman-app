self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open('helmsman-v3').then(c => c.addAll([
    './','./index.html','./content.js','./manifest.webmanifest',
    './assets/icon-192.png','./assets/icon-512.png'
  ])));
});
self.addEventListener('activate', e => { self.clients.claim(); });
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
