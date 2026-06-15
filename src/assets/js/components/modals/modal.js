import { defaultModalOptions } from "./modal.default"
import { ScrollbarLocker } from "../../lib/scrollbar-locker"

export class Modal {
  /**
   * @param { defaultModalOptions } options
   */
  constructor(options) {
    this.options = { ...defaultModalOptions, ...options }

    this.id = null

    this.$container =
      this.options.container instanceof HTMLElement
        ? this.options.container
        : document.querySelector(this.options.container)

    if (!this.$container) {
      return console.warn("Can not initialize modal with out container", this)
    }

    this.openTriggers = document.querySelectorAll(this.options.openTriggerSelector)

    this.isOpen = false

    this.closeTriggers = this.$container.querySelectorAll(this.options.closeTriggerSelector)

    this.onOpen = typeof this.options.onOpen === "function" && this.options.onOpen.bind(this)
    this.onClose = typeof this.options.onClose === "function" && this.options.onClose.bind(this)

    this.#init()
  }

  #init() {
    if (!this.$container) {
      return console.warn(
        `Modal can not be initialize because ${this.options.container} is ${!this.$container} in`,
        this,
      )
    }

    if (!this.$container.id) {
      return console.warn(
        "Modal can not be initialize because container does not have required attribute [id] in",
        this,
      )
    }

    this.id = this.$container.id.toLowerCase()

    this.openTriggers = [...this.openTriggers].filter(($button) => {
      const targetID = $button.dataset.modalId?.toLowerCase()

      if (!$button.dataset.modalId) {
        return console.warn(
          `The button has class ${this.options.openTriggerSelector} but does not have required attribute or value in [data-modal-id]`,
          $button,
        )
      }

      if (this.id !== targetID) {
        return false
      }

      $button.addEventListener("click", this.open.bind(this))

      return true
    })

    this.closeTriggers.forEach(($button) =>
      $button.addEventListener("click", this.close.bind(this)),
    )

    this.$container.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) {
        this.close()
      }
    })
  }

  #windowKeydownHandle = (event) => {
    if (event.code === "Escape") {
      this.close()
    }
  }

  open() {
    if (this.isOpen) {
      return
    }

    ScrollbarLocker.lock()

    this.$container.classList.add(this.options.openModalClass)
    this.openTriggers.forEach(($button) =>
      $button.classList.add(this.options.activeOpenTriggerClass),
    )

    window.addEventListener("keydown", this.#windowKeydownHandle)

    this.isOpen = true

    this.onOpen && this.onOpen(this)
  }

  close() {
    if (!this.isOpen) {
      return
    }

    ScrollbarLocker.unLock()

    this.$container.classList.remove(this.options.openModalClass)
    this.openTriggers.forEach(($button) =>
      $button.classList.remove(this.options.activeOpenTriggerClass),
    )

    window.removeEventListener("keydown", this.#windowKeydownHandle)

    this.isOpen = false
    this.onClose && this.onClose(this)
  }
}
