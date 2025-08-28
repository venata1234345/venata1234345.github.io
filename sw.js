self.addEventListener('install', event => {
  console.log('✅ Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('✅ Service Worker activated');
  return self.clients.claim();
});

self.addEventListener('message', event => {
  console.log('📩 SW received:', event.data);

  if (event.source) {
    event.source.postMessage('Reply from SW to: ' + event.data);
  } else if (event.ports && event.ports[0]) {
    event.ports[0].postMessage('Reply (via port) to: ' + event.data);
  }
});
