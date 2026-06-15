class Scrollbar {
  constructor() {
    this.cssVar = "--current-scrollbar-width"
    this.lockClass = "_lock"
    this.scrollbarCurrentWidth = 0
    this.isLocked = false
  }

  toggle() {
    if (this.isLocked) {
      this.lock()
    } else {
      this.unLock()
    }
  }

  getScrollbarWidth() {
    const $outer = document.createElement("div")
    $outer.style.width = "100px"
    $outer.style.height = "100px"
    $outer.style.overflow = "scroll"

    const $inner = document.createElement("div")
    $inner.style.width = "100%"
    $inner.style.height = "100%"

    $outer.append($inner)
    document.body.append($outer)

    this.scrollbarCurrentWidth = $outer.offsetWidth - $inner.offsetWidth

    $outer.remove()

    return this.scrollbarCurrentWidth
  }

  lock() {
    const scrollbarWidth = this.getScrollbarWidth()

    document.documentElement.style.setProperty(this.cssVar, `${scrollbarWidth}px`)
    document.body.classList.add(this.lockClass)
    this.isLocked = true
  }

  unLock() {
    document.documentElement.style.setProperty(this.cssVar, "0px")
    document.body.classList.remove(this.lockClass)
    this.isLocked = false
  }
}

/**
 * @property { string } cssVar - Is holding css variable name
 * @property { string } lockClass - Is holding css class name to lock scroll on document
 * @property { number } scrollbarCurrentWidth = Is holding scrollbar width value
 * @property { boolean } isLocked = Is holding current scrollbar state
 * @property { () => void } lock - The method is locking scrollbar
 * @property { () => void } unLock - The method is unLocking scrollbar
 * @property { () => void } toggle - The method is switching state between unlocking and locking
 * @property { () => number } getScrollbarWidth - The method is calculating scrollbar width value
 * */
export const ScrollbarLocker = new Scrollbar()
