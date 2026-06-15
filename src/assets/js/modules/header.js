export class Header {
  constructor() {
    /** @type { HTMLElement } */
    this.$header = document.querySelector(".header")
    if (!this.$header) {
      return console.warn("Can not initialize header without header", this)
    }

    /** @type { string } */
    this.headerHeightCssVar = "--header-height"
    /** @type { string } */
    this.hiddenVisibleVlass = "_hide"

    /** @type { number } */
    this.currentScrollPosition = window.scrollY

    this.init()
  }

  init() {
    this.setCssVars()
    this.toggleHeaderVisible()

    window.addEventListener("scroll", this.scrollHandle)
    window.addEventListener("resize", this.resizeHandle)
  }

  scrollHandle = () => {
    this.toggleHeaderVisible()
  }

  resizeHandle = () => {
    this.setCssVars()
  }

  toggleHeaderVisible() {
    if (window.scrollY < this.currentScrollPosition || window.scrollY < this.$header.offsetHeight) {
      this.$header.classList.remove(this.hiddenVisibleVlass)
    } else {
      this.$header.classList.add(this.hiddenVisibleVlass)
    }

    this.currentScrollPosition = window.scrollY
  }

  setCssVars() {
    document.documentElement.style.setProperty(
      this.headerHeightCssVar,
      `${this.$header.offsetHeight}px`,
    )
  }
}
