export class Navigation {
  constructor() {
    /** @type { HTMLElement } */
    this.$nav = document.querySelector(".nav")
    if (!this.$nav) {
      return console.warn("Can not initialize navigation without nav", this)
    }

    /** @type { NodeListOf<HTMLButtonElement> } */
    this.triggers = document.querySelectorAll(".js-nav-trigger")

    this.navOpenClass = "_show"
    this.triggerActiveClass = "_active"

    /** @type { boolean } */
    this.isOpen = false

    this.init()
  }

  init() {
    this.triggers.forEach(($trigger) => {
      $trigger.addEventListener("click", this.triggerClickHandle)
    })
  }

  triggerClickHandle = () => {
    this.toggle()
  }

  toggle() {
    if (this.isOpened) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    this.$nav.classList.add(this.navOpenClass)

    this.triggers.forEach(($trigger) => {
      $trigger.classList.add(this.triggerActiveClass)
    })

    this.isOpened = true
  }

  close() {
    this.$nav.classList.remove(this.navOpenClass)

    this.triggers.forEach(($trigger) => {
      $trigger.classList.remove(this.triggerActiveClass)
    })

    this.isOpened = false
  }
}
