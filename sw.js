const CACHE='helmsman-info-v1';
const ASSETS=['./','./index.html','./content.js','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png','./assets/START_Program_Information_Sheet.pdf','./assets/Boot_Camp_Family_Survival_Guide.pdf'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>self.clients.claim());
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
