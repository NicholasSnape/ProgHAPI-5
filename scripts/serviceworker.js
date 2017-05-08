var BASE_PATH = '/ProgHAPI-5/';
var CACHE_NAME = 'gih-cache';
var CACHED_URLS = [
    // Our HTML
    BASE_PATH + 'index.html',
    
    // Games JSON
    BASE_PATH + 'assets/games.json',
    
    // Images for favicons
    BASE_PATH + 'assets/favicons/android-chrome-icon-192x192.png',
    BASE_PATH + 'assets/favicons/android-chrome-384x384.png',
    BASE_PATH + 'assets/favicons/apple-touch-icon.png',
    BASE_PATH + 'assets/favicons/favicon.ico',
    BASE_PATH + 'assets/favicons/favicon-16x16.png',
    BASE_PATH + 'assets/favicons/favicon-32x32.png',
    BASE_PATH + 'assets/favicons/mstile-150x150.png',

    //Images for page
    BASE_PATH + 'images/call-of-duty-2.png',
    BASE_PATH + 'images/call-of-duty-4.png',
    BASE_PATH + 'images/call-of-duty-aw.png',
    BASE_PATH + 'images/call-of-duty-bo.png',
    BASE_PATH + 'images/call-of-duty-bo2.png',
    BASE_PATH + 'images/call-of-duty-bo3.png',
    BASE_PATH + 'images/call-of-duty-ghosts.png',
    BASE_PATH + 'images/call-of-duty-iw.png',
    BASE_PATH + 'images/call-of-duty-logo.png',
    BASE_PATH + 'images/call-of-duty-mw2.png',
    BASE_PATH + 'images/call-of-duty-mw3.png',
    BASE_PATH + 'images/call-of-duty-uo.png',
    BASE_PATH + 'images/call-of-duty-waw.png',
    BASE_PATH + 'images/logo.png',
    
    // JavaScript
    BASE_PATH + 'scripts/jquery-3.2.1.min.js',
    BASE_PATH + 'scripts/checkout.js',
    BASE_PATH + 'scripts/load-games.js',
    
    // Manifest
    BASE_PATH + 'assets/favicons/manifest.json',
    
    
    BASE_PATH + 'css/normalize.css',
    BASE_PATH + 'css/codshop.css'
];


self.addEventListener('install', function(event) {
  // Cache everything in CACHED_URLS. Installation fails if anything fails to cache
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  var requestURL = new URL(event.request.url);
  // Handle requests for index.html
  if (requestURL.pathname === BASE_PATH + 'first.html') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match('index.html').then(function(cachedResponse) {
          var fetchPromise = fetch('index.html').then(function(networkResponse) {
            cache.put('index.html', networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (
    CACHED_URLS.includes(requestURL.href) ||
    CACHED_URLS.includes(requestURL.pathname)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request);
        });
      })
    );
  }
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('gih-cache') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});





