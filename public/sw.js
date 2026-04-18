const STATIC_CACHE = 'ys-tool-static-v2'; // immutable Next.js assets
const DYNAMIC_CACHE = 'ys-tool-dynamic-v2'; // HTML + other assets
const ALL_CACHES = [STATIC_CACHE, DYNAMIC_CACHE];

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => !ALL_CACHES.includes(k)).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // Next.js static assets (content-hashed → 불변) — 캐시 우선
  if (url.pathname.startsWith('/_next/static/')) {
    e.respondWith(cacheFirst(e.request, STATIC_CACHE));
    return;
  }

  // 페이지 탐색(HTML) — 네트워크 우선 (최신 버전 보장)
  if (e.request.mode === 'navigate') {
    e.respondWith(networkFirst(e.request, DYNAMIC_CACHE));
    return;
  }

  // 나머지 (manifest, icon 등) — stale-while-revalidate
  e.respondWith(staleWhileRevalidate(e.request, DYNAMIC_CACHE));
});

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  const cache = await caches.open(cacheName);
  cache.put(request, response.clone());
  return response;
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached ?? Response.error();
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkFetch = fetch(request).then((response) => {
    cache.put(request, response.clone());
    return response;
  });
  return cached ?? networkFetch;
}
