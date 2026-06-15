/**
 * The function is fixing ios field focus opening keyboard
 *
 * @param {HTMLInputElement} $input - Origin input element,
 * need it only to add near input helper
 *
 * @return {void}
 */
export const focusOnInput = ($input) => {
  const $parent = $input.parentNode

  /**
   * @type {HTMLInputElement} - Input helper need just to have Intermediate element
   */
  const $inputHelper = document.createElement("input")
  $parent.appendChild($inputHelper)
  $inputHelper.focus()

  /**
   * Dispatching event on input helper
   */
  $inputHelper.dispatchEvent(new KeyboardEvent("touchstart", { "bubbles": true }))

  setTimeout(() => {

    /**
     * Change focus on origin input
     */
    $input.focus()
    $parent.removeChild($inputHelper)
  }, 100)
}
