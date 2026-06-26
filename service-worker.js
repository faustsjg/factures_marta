/* Service worker — Factures Marta PWA
   Precache de l'app per funcionar sense connexió. */
var CACHE = "factures-v2";

var SHELL = [
  "./",
  "./app.html",
  "./app.js?v=35",
  "./styles.css?v=59",
  "./ds-tokens.css?v=1",
  "./logo-badge.js?v=2",
  "./firebase-config.js",
  "./firebase-sync.js",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon-256.png",
  "./assets/icon-180.png"
];

self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // addAll falla si un sol fitxer falla; afegim un a un per ser tolerants
      return Promise.all(SHELL.map(function (u) { return c.add(u).catch(function () {}); }));
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);

  // No interceptem Firebase / Firestore / Google APIs: ho gestiona el seu propi offline.
  if (/firebaseio|firestore|googleapis|gstatic|identitytoolkit/.test(url.host)) return;

  // Navegació (obrir l'app): xarxa primer, cau si no hi ha connexió.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).catch(function () {
        return caches.match("./app.html").then(function (r) { return r || caches.match(req); });
      })
    );
    return;
  }

  // Resta: cau primer, i actualitza en segon pla.
  e.respondWith(
    caches.match(req).then(function (cached) {
      var net = fetch(req).then(function (res) {
        if (res && res.status === 200 && (url.origin === location.origin)) {
          var clone = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, clone); });
        }
        return res;
      }).catch(function () { return cached; });
      return cached || net;
    })
  );
});
