import { RootField } from "./root-field"
import { formRadioGroupOptions } from "../options/form-radio-group-options"

/**
 * @extends RootField
 * */
export class FormRadioGroup extends RootField {
  /** @param { formRadioGroupOptions } options */
  constructor(options) {
    /** @param { formRadioGroupOptions } options */
    super({ ...formRadioGroupOptions, ...options })

    this.$group = this.$field.querySelector(this.options.groupSelector)

    /** @type { NodeListOf<HTMLInputElement> } */
    this.$inputs = this.$group.querySelectorAll(this.options.inputSelector)

    /** @type { HTMLInputElement | null } */
    this.$checkedInput = null

    /** @type { boolean } */
    this.isChecked = !!this.$checkedInput?.checked

    this.#init()
  }

  #init() {
    this.$inputs.forEach(($input) => {
      $input.addEventListener("input", this.#inputChangeHandle)
    })
  }

  #inputChangeHandle = (event) => {
    this.value = event.target.value
    this.$checkedInput = event.target
    this.isChecked = true

    this.validate()
  }

  validate() {
    if (!this.isRequired) {
      this.resetStatus()
      this.validationStatus = true
      return
    }

    if (this.isChecked) {
      return this.setValidStatus()
    }

    this.setInvalidStatus()
    this.form.isValid = false
  }

  reset() {
    this.$checkedInput = null
    this.isChecked = !!this.isRequired
    this.value = ""
    this.resetStatus()
  }
}