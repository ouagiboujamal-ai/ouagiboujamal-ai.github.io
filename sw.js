/* ==========================================================================
   Zakhrafa — small service worker
   Caches local static files only. Advertising, Google Fonts, Google Sign-In
   and every other cross-origin request are deliberately left untouched.
   ========================================================================== */

var CACHE = 'zakhrafa-static-v1';

var PRECACHE = [
  './',
  './index.html',
  './cards.html',
  './collection.html',
  './about.html',
  './privacy.html',
  './contact.html',
  './404.html',
  './free-fire.html',
  './pubg.html',
  './instagram.html',
  './tiktok.html',
  './whatsapp.html',
  './girls.html',
  './boys.html',
  './symbols.html',
  './css/styles.css',
  './js/config.js',
  './js/i18n.js',
  './js/data.js',
  './js/decorations-latin.js',
  './js/decorations-arabic.js',
  './js/storage.js',
  './js/auth.js',
  './js/layout.js',
  './js/card-templates.js',
  './js/decorate.js',
  './js/cards.js',
  './js/collection.js',
  './js/app.js',
  './manifest.json',
  './assets/favicon.svg',
  './assets/favicon-16.png',
  './assets/favicon-32.png',
  './assets/favicon-48.png',
  './assets/favicon.ico',
  './assets/apple-touch-icon.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/og-image.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(PRECACHE);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE) return caches.delete(key);
        return null;
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;

  var url = new URL(request.url);

  // Local files only. This excludes Monetag, Google Fonts and Google Identity.
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(function (response) {
        if (response && response.ok) {
          var copy = response.clone();
          caches.open(CACHE).then(function (cache) { cache.put(request, copy); });
        }
        return response;
      }).catch(function () {
        return caches.match(request, { ignoreSearch: true }).then(function (cached) {
          return cached || caches.match('./index.html');
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then(function (cached) {
      if (cached) return cached;
      return fetch(request).then(function (response) {
        if (response && response.ok && response.type === 'basic') {
          var copy = response.clone();
          caches.open(CACHE).then(function (cache) { cache.put(request, copy); });
        }
        return response;
      });
    })
  );
});
