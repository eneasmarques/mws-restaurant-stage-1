// fonte - https://developers.google.com/web/fundamentals/codelabs/offline/
// fonte - https://developers.google.com/web/fundamentals/primers/service-workers/?hl=en
var staticCacheName = 'restaurant-reviews';

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll([
          '/',
          '/img/1.jpg',
          '/img/2.jpg',
          '/img/3.jpg',
          '/img/4.jpg',
          '/img/5.jpg',
          '/img/6.jpg',
          '/img/7.jpg',
          '/img/8.jpg',
          '/img/9.jpg',
          '/img/10.jpg',
          '/css/styles.css',
          '/js/main.js',
          '/js/dbhelper.js',
          '/js/restaurant_info.js',
          './data/restaurants.json',
        ])
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request)
          .then(fetchResponse => {
            return caches.open(staticCacheName).then(cache => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
          .catch(error => {
            return new Response(
              "Application is not connected to the internet",
              {
                status: 404,
                statusText: "Application is not connected to the internet"
              }
            );
          })
      );
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== staticCacheName) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});
