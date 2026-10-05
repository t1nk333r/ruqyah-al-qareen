"use strict";

// Both apps share the origin (t1nk333r.github.io) and so CacheStorage: only caches with this prefix are this app's.
const CACHE_PREFIX = "ruqyah-static-";
const CACHE_NAME = `${CACHE_PREFIX}v21`;
// Navigations are answered from the network and fall back to ./index.html, so "./" is never read from the cache.
const APP_SHELL = [
  "./index.html",
  "./content.js?v=5",
  "./manifest.webmanifest?v=1",
  "./icons/icon.svg?v=1",
  "./icons/icon-192.png?v=1",
  "./icons/icon-512.png?v=1",
  "./fonts/kfgqpc-uthman-taha-naskh.ttf",
  "./fonts/kfgqpc-hafs-v30.ttf",
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

// The scope root and index.html (query and hash aside) are the app shell; any other navigation in scope (the
// manifest, README.md, an icon opened in a tab) must not replace it.
function isShellRequest(url) {
  const scope = new URL(self.registration.scope).pathname;
  return url.pathname === scope || url.pathname === `${scope}index.html`;
}

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const isHtml = (response.headers.get("content-type") ?? "").toLowerCase().startsWith("text/html");
          if (response.ok && isHtml && isShellRequest(url)) {
            const copy = response.clone();
            event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copy)));
          }
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(request, copy)));
        }
        return response;
      });
    })
  );
});
