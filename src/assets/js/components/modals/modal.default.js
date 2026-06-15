/**
 * @typedef defaultModalOptions
 * @property { string | HTMLElement } container - Will get tabs container html element from DOM
 * @property { string } openTriggerSelector - Will get open trigger buttons html element from DOM
 * @property { string } closeTriggerSelector - Will get close trigger buttons html element from container
 * @property { string } openModalClass - Will be added to modal container element on open modal
 * @property { string } activeOpenTriggerClass - Will be added to open trigger buttons on open modal
 * @property { function } onOpen - Event will be called after open modal
 * @property { function } onClose - Event will be called after close modal
 * */

/** @type { defaultModalOptions } */
export const defaultModalOptions = {
  /**
   * 
   * @type string | HTMLElement
   */
  container: ".js-modal",

  /**
   * Will get open trigger buttons html element from DOM
   * @type string
   */
  openTriggerSelector: ".js-modal-open-trigger",

  /**
   * Will get close trigger buttons html element from container
   * @type string
   */
  closeTriggerSelector: ".js-modal-close-trigger",

  /**
   * Will be added to modal container element on open modal
   * @type string
   */
  openModalClass: "_show",

  /**
   * Will be added to open trigger buttons on open modal
   * @type string
   */
  activeOpenTriggerClass: "_modal-open",

  /**
   * Event will be called after open modal
   * @type function | null
   */
  onOpen: null,
  /**
   * Event will be called after close modal
   * @type function | null
   */
  onClose: null,
}
