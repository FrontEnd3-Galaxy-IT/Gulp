import { defaultFormOptions } from "./options/form-options"
import { getFieldType } from "./lib/get-field-type"
import { NSerializeJson } from "nserializejson"

export class Form {
  /**
   * @param { defaultFormOptions } options
   */
  constructor(options) {
    this.options = { ...defaultFormOptions, ...options }

    /** @type { HTMLFormElement } */
    this.$form =
      this.options.form instanceof HTMLElement
        ? this.options.form
        : document.querySelector(this.options.form)

    if (!this.$form) {
      return console.warn("Can not initialize form without form", this)
    }

    this.action = this.$form.getAttribute("action")
    this.type = this.$form.dataset.type
    this.method = this.$form.getAttribute("method") || "GET"

    /** @type { FormField[] | FormCheckbox[] | FormRadioGroup[] } */
    this.fields = Array.from(this.$form.querySelectorAll(this.options.fieldSelector)).map(
      ($field, index) => getFieldType(this, $field, index),
    )

    /** @type { FormField[] | [] } */
    this.invalidFields = []

    /** @type { boolean } */
    this.isValid = false
    /** @type { boolean } */
    this.isDirty = false

    /**
     * @type FormData
     */
    this.data = new FormData()

    this.#init()
  }

  #init() {
    this.$form.setAttribute("novalidate", "novalidate")

    this.$form.addEventListener("submit", this.submitHandle)
  }

  setLoading(isLoading) {
    if (isLoading) {
      this.$form.classList.add("_is_loading")
    } else {
      this.$form.classList.remove("_is_loading")
    }
  }

  async #sendReq() {
    this.setLoading(true)
    const options = {
      method: this.method,
      headers: this.type === "json" ? { "Content-Type": "application/json" } : {},
      body: this.type === "json"
        ? JSON.stringify(NSerializeJson.serializeForm(this.$form))
        : new FormData(this.$form)
    }
  
    try {
      const response = await fetch(this.action, options)
      if (!response.ok) {
        console.log("Request with error")
        this.setLoading(false)
        return
      }
      console.log("Request is success")
      this.setLoading(false)
      // const data = await response.json(); //if server send response
      // console.log("Response data:", data)
      this.reset()
    } catch (error) {
      console.error("Request failed", error)
      this.setLoading(false)
    }
  }

  submitHandle = (event) => {
    event.preventDefault()
    this.invalidFields = []
    this.isDirty = true

    this.validate()

    if (this.isValid) {
      this.#sendReq()
    } else {
      console.warn("Validation error", this.invalidFields)
    }
  }

  validate() {
    this.isValid = true

    this.invalidFields = this.fields.filter((field) => {
      field.validate()

      return !field.validationStatus
    })
  }

  reset() {
    this.$form.reset()
    this.isDirty = false

    this.fields.forEach((field) => field.reset())
  }
}
