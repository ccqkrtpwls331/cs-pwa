const CACHE_NAME = 'cs-quiz-cache-v2'; // v1 -> v2로 버전 변경
const ASSETS = ['/index.html', '/app.js', '/questions.js', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting(); // 새 서비스 워커 즉시 활성화
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim(); // 열린 탭에 즉시 제어권 적용
});

// 네트워크 우선 전략 (수정 사항 즉시 반영 + 오프라인 지원)
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
