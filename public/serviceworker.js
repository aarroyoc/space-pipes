/* eslint-disable no-restricted-globals */

const CACHE_NAME = "space-pipes-1.0";
/* To upgrade a version, set new cache name in install, delete previous one in "activate" */
/* Static Assets */
const CACHE_LIST = [
    "/prolog/hexaprim.pl",
    "/ask.mp3",
    "/click.mp3",
    "/deploy.mp3",
    "/error.mp3",
    "/information.mp3",
    "/typing.mp3",
    "/warning.mp3",
    "/logo192.png",
    "/logo512.png",
    "/favicon.ico",
    "/SpacePipesRules.mp4",
    "/offline.txt",
    "/"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CACHE_LIST);
        })
    ); 
});

self.addEventListener("fetch", (event) => {
    const request = event.request;
    event.respondWith(
        caches.match(request).then((cached_result)=>{
            if(cached_result){
                return cached_result;
            }
            return fetch(request).then(response => {
                /* Save REACT CSS and JS in Cache */
                const copy = response.clone();
                event.waitUntil(
                    caches.open(CACHE_NAME).then(cache => cache.put(request, copy))
                )
                return response;
            }).catch(() => caches.match("/offline.txt"));
        })
    );
});