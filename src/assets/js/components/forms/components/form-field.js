import { RootField } from "./root-field"
import { getValidationPattern } from "../lib/get-validation-pattern"
import { formFieldOptions } from "../options/form-field-options"

/**
 * @extends RootField
 * */
export class FormField extends RootField {
  /**
   * @param { formFieldOptions } options
   * */
  constructor(options) {
    super({ ...formFieldOptions, ...options })

    /** @type { string } */
    this.validationType = this.$field.dataset.type
    /** @type { RegExp } */
    this.validationPattern = getValidationPattern(this.validationType)
    /** @type { boolean } */
    this.validationStatus = !this.isRequired

    this.#init()
  }

  #init() {
    this.$input.addEventListener("input", this.#inputHandle)
  }

  #inputHandle = (event) => {
    this.value = event.target.value.trim()
    this.validationStatus = !!this.value.match(this.validationPattern)

    if (this.form.isDirty) {
      this.validate()
    }
  }

  validate() {
    if (!this.isRequired) {
      this.resetStatus()
      this.validationStatus = true
      return
    }

    const isMinMaxQuantityValid = this.minMaxQuantityValidate()
    const isMinMaxLengthValid = this.minMaxLengthValidate()

    if (this.validationStatus && isMinMaxQuantityValid && isMinMaxLengthValid) {
      return this.setValidStatus()
    }

    this.setInvalidStatus()
    this.form.isValid = false
  }

  reset() {
    this.$input.value = ""
    this.value = this.$input.value
    this.validationStatus = !this.isRequired
    this.resetStatus()
  }

  /**
   * Check HTML default attributes [min] and [max]
   * @return { boolean | boolean }
   */
  minMaxQuantityValidate() {
    const { $input } = this
    const { min, max } = $input

    const minLengthIsValid = min ? +min <= parseInt($input.value) : true
    const maxLengthIsValid = max ? +max >= parseInt($input.value) : true

    return minLengthIsValid && maxLengthIsValid
  }

  /**
   * Check HTML default attributes [minlength] and [maxlength]
   * @return { boolean | boolean }
   */
  minMaxLengthValidate() {
    const { $input } = this
    const { minLength, maxLength } = $input

    const minLengthIsValid = minLength >= 0 ? +minLength <= $input.value.length : true
    const maxLengthIsValid = maxLength >= 0 ? +maxLength >= $input.value.length : true

    return minLengthIsValid && maxLengthIsValid
  }
}