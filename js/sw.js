const CACHE_NAME = 'pwa-ohm-v1';
const urlsToCache = [
  './',
  './index.html',
  './form.html',
  './js/formulas.js',
  './js/form-handler.js',
  './css/styles.css',
  './manifest.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
