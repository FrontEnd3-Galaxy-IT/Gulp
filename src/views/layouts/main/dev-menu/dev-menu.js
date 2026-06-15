const wordsInLinkToUpper = []

const FTP_USER_ENDPOINT = `/${window.location.href.replace(new RegExp(window.location.origin + "/"), "").split("/")[0]}/`

const HOME_URL = window.location.origin.match(new RegExp("html.galaxy-it.net"))
  ? window.location.origin + FTP_USER_ENDPOINT
  : window.location.origin

window.addEventListener("load", () => {
  const devMenu = document.querySelector(".dev-menu")

  if (!devMenu) return
  devMenu.style.display = "block"

  const devMenuToggler = document.querySelector(".dev-menu-toggler")
  const devMenuList = document.querySelector(".dev-menu-list")
  const devMenuLinks = devMenu.querySelectorAll(".dev-menu-link")

  let activeDevMenuLink = null

  devMenuLinks?.forEach((link) => {
    if (link.pathname === window.location.pathname) {
      link.classList.add("active")
      activeDevMenuLink = link
    } else if (window.location.pathname === "/" && link.pathname === "/index.html") {
      link.classList.add("active")
      activeDevMenuLink = link
    }

    link.innerHTML = link.innerHTML
      .trim()
      .split(" ")
      .map((word) => {
        if (wordsInLinkToUpper.includes(word)) {
          word = `<span class="dev-menu-uppercase">${word}</span>`
        }

        return word
      })
      .join(" ")
  })

  devMenuToggler?.addEventListener("click", () => {
    if (!devMenu) return
    devMenu.classList.toggle("active")

    if (activeDevMenuLink && devMenuList) {
      devMenuList.scroll({
        top: activeDevMenuLink.offsetTop - devMenuList.offsetHeight / 2,
        behavior: "smooth",
      })
    }
  })

  window.addEventListener("click", (event) => {
    if (!devMenu) return
    if (!devMenu.contains(event.target)) {
      devMenu.classList.remove("active")
    }
  })

  window.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.code === "KeyI") {
      window.open("https://html.galaxy-it.net/h/gulp_examples/", "_blank")
    }

    if (event.shiftKey && event.ctrlKey && event.code === "KeyH") {
      window.location.href = HOME_URL
    }

    if (event.shiftKey && event.ctrlKey && event.code === "KeyS") {
      window.open(HOME_URL + "/icon/stack/sprite.stack.html", "_blank")
    }
  })
})
