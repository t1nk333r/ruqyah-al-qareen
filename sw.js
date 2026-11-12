"use strict";

// رقية القرين is now the «رقية» tab of أذكار المسلم (../athkar/#ruqyah). This worker replaces the app's so that installed
// copies stop serving the cached app: it deletes the app's caches (prefix ruqyah-static-; أذكار المسلم shares this
// origin and keeps its own) and unregisters itself. With no fetch handler, every request goes to the network, which
// serves the page that hands the progress over and opens the tab.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith("ruqyah-static-")).map(key => caches.delete(key))))
      .then(() => self.registration.unregister())
  );
});
