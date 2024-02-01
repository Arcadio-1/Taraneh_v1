// const installEvent = () => {
//   self.addEventListener("install", (e) => {
//     // console.log("service worker installed", e);
//   });
// };
// installEvent();

// const activateEvent = () => {
//   self.addEventListener("activate", (e) => {
//     // console.log("service worker activated", e);
//   });
// };
// activateEvent();

// const cacheName = "v3";

// const cacheClone = async (e) => {
//   const res = await fetch(e.request);
//   const resClone = res.clone();

//   const cache = await caches.open(cacheName);
//   await cache.put(e.request, resClone);
//   return res;
// };

// const fetchEvent = () => {
//   self.addEventListener("fetch", (e) => {
//     // console.log(e);
//     e.respondWith(
//       cacheClone(e)
//         .catch(() => caches.match(e.request))
//         .then((res) => res),
//     );
//   });
// };

// fetchEvent();
