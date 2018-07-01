var staticCacheName = 'currency-static-v2';

//install service worker and cache requests
self.addEventListener('install', function(event){
   
   event.waitUntil(
      caches.open(staticCacheName).then(function(cache){
           return cache.addAll([
               '/Currency-Converter',
               '/Currency-Converter/js/script.js',
               '/Currency-Converter/js/jquery.min.js',
               '/Currency-Converter/css/style.css',
               '/Currency-Converter/images/bg-panel3.png',
               'https://free.currencyconverterapi.com/api/v5/currencies'

           ]);
      })
   )
});

//Activate service worker, delete previous version of the cache 
self.addEventListener('activate',function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {

            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('currency-') &&
                        cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return cache.delte(cacheName);
                })
            );
           
        })
    );
});

//listen for all requests within the service worker scope
self.addEventListener('fetch', function(event) {
     event.respondWith(
       caches.match(event.request).then(function(response){
           if(response) return response;
           return fetch(event.response);    
       }).catch(function () {
           console.log('Bad request');
       })
     );
    
});
