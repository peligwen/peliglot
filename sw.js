const CACHE_NAME = 'peliglot-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/guides/spanish.html',
  '/guides/arabic.html',
  '/guides/english.html',
  '/guides/german.html',
  '/guides/hawaiian.html',
  '/guides/french.html',
  '/guides/japanese.html',
  '/guides/portuguese.html',
  '/guides/music.html',
  '/guides/jazz-guitar.html',
  '/guides/math.html',
  '/guides/music2.html',
  '/guides/statistics.html',
  '/guides/programming.html'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(r => {
      if (r.ok) {
        const clone = r.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      }
      return r;
    }).catch(() => caches.match(e.request))
  );
});
