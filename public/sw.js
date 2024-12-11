const cacheVersion = 1.2;
const activeCaches = {
  staticVersion: `yourMusicStatic_V ${cacheVersion}`,
  dynamicVersion: `yourMusicDynamic_V ${cacheVersion}`,
};

self.addEventListener("install", (event) => {
  console.log("sw is installed");
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(activeCaches["staticVersion"])
      .then((cache) => {
        console.log("file cached successfully");
        cache.addAll(["/", "/en", "/en/fallback"]);
      })
      .catch((err) => console.log(err)),
  );
});

self.addEventListener("activate", (event) => {
  console.log("sw is activated");
  const activeCachesName = Object.values(activeCaches);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cach) => {
          if (!activeCachesName.includes(cach)) {
            return caches.delete(cach);
          }
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open(activeCaches["dynamicVersion"]).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch((err) => {
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match("/en/fallback");
        });
      }),
  );
});
