// A basic service worker to make the app installable (PWA)
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
});

self.addEventListener('fetch', (event) => {
    // We aren't doing heavy offline caching right now, just letting requests pass through
    // But having this fetch listener is required for the "Add to Homescreen" prompt!
});