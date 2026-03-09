const CACHE = 'kilde-assistent-v1';
const ASSETS = [
  '/kilde-assistent/',
  '/kilde-assistent/index.html',
  '/kilde-assistent/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).catch(() => caches.match('/kilde-assistent/'));
    })
  );
});
