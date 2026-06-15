/**
 * @typedef formFieldOptions
 * @property { Form } form - Parent form instance
 * @property { number } index - The index position in array in form instance
 * @property { HTMLElement } [field] - Field container html element
 * @property { string } [inputSelector] - Will get input html element inside field container
 * @property { string } [errorSelector] - Will get error html element inside field container
 */

/** @type formFieldOptions */
export const formFieldOptions = {
  form: null,
  index: 0,
  field: null,
  inputSelector: ".js-field-input",
  errorSelector: ".js-field-error",
}
