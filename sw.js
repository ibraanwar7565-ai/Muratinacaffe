/* Muratina Café POS — service worker
   Strategy:
   - Navigations: network-first, fall back to cache, then offline.php
   - Same-origin static assets (css/js/img/videos): stale-while-revalidate
   - Never touch non-GET requests (sales, logins, etc. always hit the network)
*/
const VERSION = 'muratina-pos-v1';
const CORE = [
  './',
  './index.php',
  './offline.php',
  './assets/css/style.css',
  './assets/js/app.js',
  './assets/js/pwa.js',
  './assets/img/icon-192.png',
  './assets/img/icon-512.png',
  './manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) =>
      // Cache core files individually so one failure doesn't abort install.
      Promise.allSettled(CORE.map((u) => cache.add(u)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return; // POSTs go straight to the network

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // App navigations: try network first, fall back to cache / offline page.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (sameOrigin) caches.open(VERSION).then((c) => c.put(req, res.clone()));
          return res;
        })
        .catch(() => caches.match(req).then((c) => c || caches.match('./offline.php')))
    );
    return;
  }

  // Static assets: serve from cache fast, refresh in the background.
  if (sameOrigin && /\.(css|js|png|jpg|jpeg|svg|webp|gif|woff2?|mp4|webm)$/i.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => { caches.open(VERSION).then((c) => c.put(req, res.clone())); return res; })
          .catch(() => cached);
        return cached || network;
      })
    );
  }
});
