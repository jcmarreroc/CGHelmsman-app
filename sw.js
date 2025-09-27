const CACHE='helmsman-info-v2';
const CORE=['./','./index.html','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png',
'./assets/START_Program_Information_Sheet.pdf','./assets/Boot_Camp_Family_Survival_Guide.pdf'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  // Network-first for JS/HTML to ensure updates, cache-first for others
  if(url.pathname.endsWith('.js')||url.pathname.endsWith('/CGHelmsman-app/')||url.pathname.endsWith('/CGHelmsman-app/index.html')){
    e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;})
      .catch(()=>caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
  }
});
