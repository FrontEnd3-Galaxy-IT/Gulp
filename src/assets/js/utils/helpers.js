/**
 * @typedef ElementOffset
 * @property { DOMRect } rect
 * @property { number } dom.bottom
 * @property { number } dom.left
 * @property { number } dom.top
 * */

/**
 * @param { HTMLElement } $el
 * @return ElementOffset
 * */
const getElementOffset = ($el) => {
  const rect = $el.getBoundingClientRect()
  return {
    rect: rect,
    dom: {
      bottom: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    },
  }
}

/**
 * @param { number | string } value
 * @param { number } numLength
 * @param { string } template
 *
 * @return string
 * */
const pad = (value, numLength = 2, template = "00") => value.toString().padStart(numLength, template)

export { getElementOffset, pad }
