const CACHE_NAME = "kokorin-cache-v1";
const urlsToCache = [
  "/",
  "/globals.css",
  "https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap",
  "https://res.cloudinary.com/dam7wdzvx/image/upload/v1747262134/Kamil/vW45A8151.webp",
  "https://www.harasov.eu/gallery/titulka_a_tiny.jpg",
  "https://res.cloudinary.com/dam7wdzvx/image/upload/v1747262135/Kamil/W45A8080.webp",
  "https://res.cloudinary.com/dam7wdzvx/image/upload/v1747262136/Kamil/W45A8096.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    }),
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
