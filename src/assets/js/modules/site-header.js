/**
 * Site Header: burger drawer toggle + smooth scroll for anchor nav links.
 */
export function initSiteHeader() {
  const burgerBtn = document.querySelector(".js-burger-btn")
  const drawer = document.querySelector(".js-burger-drawer")

  if (burgerBtn && drawer) {
    burgerBtn.addEventListener("click", () => {
      drawer.classList.toggle("is-open")
    })
  }

  document.querySelectorAll(".js-nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href")
      if (!href) {
        event.preventDefault()
        return
      }

      const hashIndex = href.indexOf("#")
      if (hashIndex === -1) return

      const anchorId = href.slice(hashIndex + 1)
      const targetOnSamePage =
        href.startsWith("#") ||
        href.startsWith("index.html#") ||
        href.startsWith("/index.html#")

      if (!targetOnSamePage) return

      const el = document.getElementById(anchorId)
      if (!el) return

      event.preventDefault()
      drawer && drawer.classList.remove("is-open")
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      })
    })
  })
}
