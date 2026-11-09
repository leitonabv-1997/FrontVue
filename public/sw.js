const NOMBRE_CACHE = 'tareas-cache-v1'
const ARCHIVOS_ESTATICOS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
]

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(NOMBRE_CACHE).then((cache) => {
      return cache.addAll(ARCHIVOS_ESTATICOS)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys().then((claves) => {
      return Promise.all(
        claves
          .filter((clave) => clave !== NOMBRE_CACHE)
          .map((clave) => caches.delete(clave))
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', (evento) => {
  if (evento.request.method !== 'GET') {
    return
  }

  evento.respondWith(
    fetch(evento.request)
      .then((respuestaRed) => {
        if (respuestaRed && respuestaRed.status === 200) {
          const clonRespuesta = respuestaRed.clone()
          caches.open(NOMBRE_CACHE).then((cache) => {
            cache.put(evento.request, clonRespuesta)
          })
        }
        return respuestaRed
      })
      .catch(() => {
        return caches.match(evento.request)
      })
  )
})

