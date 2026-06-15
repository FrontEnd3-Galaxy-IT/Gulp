export class RootField {
  constructor(options) {
    this.options = options

    /** @type Form */
    this.form = this.options.form

    /** @type number */
    this.index = this.options.index

    /** @type { HTMLElement | null } */
    this.$field = this.options.field
    /** @type { HTMLInputElement | null } */
    this.$input = this.$field.querySelector(this.options.inputSelector)
    /** @type { HTMLElement | null } */
    this.$error = this.$field.querySelector(this.options.errorSelector)

    /** @type { boolean } */
    this.isRequired = this.$field.classList.contains("is-required")

    if (!this.$input.name) {
      console.warn(
        "[name] is required, the input without the attribute will get automatically",
        this.form,
        this.$input,
      )

      this.$input.setAttribute("name", `field_${this.index}`)
    }

    /** @type { string } */
    this.name = this.$input.name

    /** @type { string } */
    this.value = this.$input.value
  }

  setValidStatus() {
    this.$field.classList.remove("_invalid")
    this.$field.classList.add("_valid")
  }

  setInvalidStatus() {
    this.$field.classList.remove("_valid")
    this.$field.classList.add("_invalid")
  }

  resetStatus() {
    this.$field.classList.remove("_valid")
    this.$field.classList.remove("_invalid")
  }
}