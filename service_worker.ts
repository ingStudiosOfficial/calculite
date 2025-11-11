self.addEventListener('install', (event: ExtendableEvent) => {
    console.log('Service worker installed.');
});

self.addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(fetch(event.request));
});