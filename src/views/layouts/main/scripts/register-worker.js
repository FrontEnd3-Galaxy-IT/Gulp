if (navigator.serviceWorker) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").then(
      (registration) => {
        console.log("[SW]: Registration successful: ", registration.scope)
      },
      (error) => {
        console.warn(`[SW]: Registration failed: ${error}`)
      },
    )
  })
}
