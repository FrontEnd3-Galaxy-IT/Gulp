import { isObject } from "../lib/is-object"

export class Document {
  /**
   * @type {HTMLElement} - Root HTML element
   * */
  static root = document.documentElement

  /**
   * @type {HTMLHeadElement} - Body element
   * */
  static head = this.root.querySelector("head")

  /**
   * @type {HTMLBodyElement} - Body element
   * */
  static body = this.root.querySelector("body")

  /**
   * @type {HTMLElement} - Wrapper of webpage
   * */
  static wrapper = this.root.querySelector(".wrapper")

  /**
   * @type {HTMLElement} - Header
   * */
  static header = this.root.querySelector(".header")

  /**
   * @type {HTMLElement} - Content
   * */
  static content = this.root.querySelector(".content")

  /**
   * @type {HTMLElement} - Footer
   * */
  static footer = this.root.querySelector(".footer")

  /**
   * Set css variable
   *
   * @param { string } property - variable name
   * @param { string } value - variable value
   * */
  static setCSSVar(property, value) {
    this.root.style.setProperty(`--${property}`, value)
  }

  /**
   * Creating element with attributes
   *
   * @param {keyof HTMLElementTagNameMap} tagName
   * @param {Object} attributes - THe given object will be used as attributes. But it has reserved keys:
   * styles - Object | string
   * children - HTMLElement[]
   * */
  static createEl(tagName, attributes = {}) {
    const $newEl = document.createElement(tagName)

    for (const attributeKey in attributes) {
      const attributeValue = attributes[attributeKey]

      switch (attributeKey) {
        case "children": {
          if (!Array.isArray(attributeValue)) {
            console.warn("[Document] Children should be an array in", $newEl)
            break
          }
          attributeValue.forEach(($child) => $newEl.appendChild($child))
          break
        }
        case "style": {
          const isObjectStyle = isObject(attributeValue, (styles) => {
            for (const stylesKey in styles) {
              $newEl.style[stylesKey] = styles[stylesKey]
            }
          })
          if (!isObjectStyle) {
            $newEl.style = attributeValue
          }
          break
        }
        default:
          $newEl[attributeKey] = attributeValue
      }
    }

    return $newEl
  }

  /**
   * Creating element with attributes
   *
   * @param {HTMLElement | "head" | "body" | "wrapper" | "header" | "content" | "footer"} target
   * @param {HTMLElement} $el
   * */
  static appendTo(target, $el) {
    switch (target) {
      case "head":
        if (!this.head) {
          console.warn(
            `[Document] Can not append ${$el} to "body" because it is: `,
            this.head,
          )
          break
        }
        this.head.appendChild($el)
        break
      case "body":
        if (!this.body) {
          console.warn(
            `[Document] Can not append ${$el} to "body" because it is: `,
            this.body,
          )
          break
        }
        this.body.appendChild($el)
        break
      case "wrapper":
        if (!this.wrapper) {
          console.warn(
            `[Document] Can not append ${$el} to "wrapper" because it is: `,
            this.wrapper,
          )
          break
        }
        this.wrapper.appendChild($el)
        break
      case "header":
        if (!this.header) {
          console.warn(
            `[Document] Can not append ${$el} to "header" because it is: `,
            this.header,
          )
          break
        }
        this.header.appendChild($el)
        break
      case "content":
        if (!this.content) {
          console.warn(
            `[Document] Can not append ${$el} to "content" because it is: `,
            this.content,
          )
          break
        }
        this.content.appendChild($el)
        break
      case "footer":
        if (!this.footer) {
          console.warn(
            `[Document] Can not append ${$el} to "footer" because it is: `,
            this.footer,
          )
          break
        }
        this.footer.appendChild($el)
        break
      default:
        if (!(target instanceof HTMLElement)) {
          console.warn(
            "[Document] target should be HTMLElement of one of [body, wrapper, header, content, footer]",
          )
          return
        }
        target.appendChild($el)
    }
  }
}
