import { formCheckboxOptions } from "../options/form-checkbox-options"
import { RootField } from "./root-field"

/**
 * @extends RootField
 * */
export class FormCheckbox extends RootField {
  /**
   * @param { formFieldOptions } options
   * */
  constructor(options) {
    super({ ...formCheckboxOptions, ...options })

    /** @type { boolean } */
    this.isChecked = !!this.$input.checked

    this.#init()
  }

  #init() {
    this.$input.addEventListener("change", this.#inputChangeHandle)
  }

  #inputChangeHandle = () => {
    this.isChecked = !!this.$input.checked

    if (this.form.isDirty) {
      this.validate()
    }
  }

  validate() {
    if (!this.isRequired) {
      this.isChecked = !!this.$input.checked
      return
    }

    if (this.isChecked) {
      return this.setValidStatus()
    }

    this.setInvalidStatus()
    this.form.isValid = false
  }

  reset() {
    this.$input.checked = false
    this.isChecked = false
    this.resetStatus()
  }
}