// Маркер, куди Google Workbox автоматично вставить масив ваших хешованих файлів
const ASSETS_TO_CACHE = self.__WB_MANIFEST

const STATIC_CACHE_KEY = "s-v1"
const DYNAMIC_CACHE_KEY = "d-v1"

// Функція інсталяції змінюється на роботу з об'єктами Workbox
const install_handle = async () => {
  const cache = await caches.open(STATIC_CACHE_KEY)

  // Оскільки Workbox генерує масив об'єктів [{url: "...", revision: "..."}],
  // нам потрібно дістати з них тільки чисті адреси файлів (url)
  const urlsToCache = ASSETS_TO_CACHE.map((entry) => entry.url)

  await cache.addAll(urlsToCache)
}

self.addEventListener("install", install_handle)

const activate_handle = async () => {
  const cache_keys = await caches.keys()
  await Promise.all(
    cache_keys
      .filter((cache_name) => cache_name !== STATIC_CACHE_KEY)
      .filter((cache_name) => cache_name !== DYNAMIC_CACHE_KEY)
      .map((cache_name) => caches.delete(cache_name)),
  )
}
self.addEventListener("activate", activate_handle)

// Network intercepting logic (uncommented and fixed)
const fetch_handle = (event) => {
  if (
    event.request.url.startsWith("chrome-extension") ||
    event.request.url.includes("extension") ||
    !(event.request.url.indexOf("http") === 0)
  ) {
    return
  }

  const { request } = event
  const url = new URL(request.url)

  if (url.origin === location.origin) {
    event.respondWith(static_data(request))
  } else {
    event.respondWith(dynamic_data(request))
  }
}

async function static_data(request) {
  try {
    // Try to get the fresh file from the network first
    const response = await fetch(request)
    if (response && response.status === 200) {
      return response
    }
  } catch (e) {
    // If network fails (offline), pull it straight out of the static cache
    const cached = await caches.match(request)
    if (cached) return cached
  }
  return caches.match("404.html")
}

async function dynamic_data(request) {
  const cache = await caches.open(DYNAMIC_CACHE_KEY)
  try {
    const response = await fetch(request)
    // Only cache successful requests
    if (response && response.status === 200) {
      await cache.put(request, response.clone())
    }
    return response
  } catch (e) {
    console.warn("[SW Dynamic Fetch Failed]:", e)
    const cached = await cache.match(request)
    return cached || (await caches.match("404.html"))
  }
}

self.addEventListener("fetch", fetch_handle)
