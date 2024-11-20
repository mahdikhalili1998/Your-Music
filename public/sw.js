const STATIC_CACHE_VERSION = "static_1";
const DYNAMIC_CACHE_VERSION = "dynamic_2";
const STATIC_ASSESTS = [
  "/en",
  "/en/layout.ts",
  "/en/globals.css",
  "/globals.css",
  "/css/style.css",
  "/en/setting-page",
];

self.addEventListener("install", (event) => {
  console.log("sw is installing");
  event.waitUntil(
    caches
      .open(STATIC_CACHE_VERSION)
      .then((cache) => {
        console.log("cache ready");
        return cache.addAll(STATIC_ASSESTS);
      })
      .catch((e) => {
        console.log("cache error");
      }),
  );
});

self.addEventListener("activate", function (event) {
  console.log("sw is activating ");
});

self.addEventListener("fetch", (event) => {
  console.log("sw is fetching ");
  const request = event.request;
  event.respondWith(
    caches
      .match(request)
      .then((response) => {
        return (
          response ||
          fetch(request)
            .then((res) => {
              caches.open(DYNAMIC_CACHE_VERSION).then((cache) => {
                cache.put(request, res);
              });
              return res.clone();
            })
            .catch((err) => {
              console.log("[SW] cache fetch error");
            })
        );
      })
      .catch(console.error),
  );
});
