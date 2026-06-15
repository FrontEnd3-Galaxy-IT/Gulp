/**
 * A simple state manager class.
 */
export class StateManager {
  /**
   * Constructs a new instance of the class with an optional initial state.
   * @param {Object} [initialState={}] - The initial state for the instance.
   */
  constructor(initialState = {}) {
    /**
     * The state object for the instance.
     * @type {Object}
     */
    this.state = initialState

    /**
     * A set to hold the listeners for the instance.
     * @type {Set}
     */
    this.listeners = new Set()
  }

  /**
   * Returns the current state of the object.
   * @returns {Object} The current state.
   */
  getState() {
    return this.state
  }

  /**
   * Sets a new state for the object.
   * If the new state is a function, it will be called with the current state
   * and the returned value will become the new state.
   * Otherwise, the new state will be merged with the current state.
   * @param {Object|function} newState - The new state or a function returning the new state.
   */
  setState(newState) {
    if (typeof newState === "function") {
      this.state = newState(this.state)
    } else {
      this.state = { ...this.state, ...newState }
    }
    this.notifyListeners()
  }

  /**
   * Subscribes a listener function to state changes.
   * @param {function} listener - The listener function to be called when the state changes.
   * @returns {function} A function to unsubscribe the listener.
   */
  subscribe(listener) {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  /**
   * Notifies all registered listeners about state changes.
   */
  notifyListeners() {
    for (const listener of this.listeners) {
      listener(this.state)
    }
  }
}

/**
 * TODO: Example of usage
 * */

/**
 * Selects the HTML element with the class "title".
 * @type {HTMLElement}
 */
// const title = document.querySelector(".title")

/**
 * Creates a new instance of StateManager with an initial state containing a count and text.
 * @type {StateManager}
 */
// const stateManager = new StateManager({ count: 0, text: title.innerHTML })

/**
 * Subscribes a listener function to state changes in the stateManager.
 * Updates the innerHTML of the title element with the new state's text and count.
 * @type {function}
 */
// const unsubscribe = stateManager.subscribe((state) => {
//   console.log("State:", state)
//   title.innerHTML = state.text + " " + state.count
// })

/**
 * Handles the click event on the window.
 * Increments the count in the stateManager's state.
 */
// const handlerClick = () => {
//   stateManager.setState((prevState) => ({
//     ...prevState,
//     count: prevState.count + 1,
//   }))
// }

// window.addEventListener("click", handlerClick)

/**
 * Handles the double click event on the window.
 * Unsubscribes the listener function from state changes.
 * Removes event listeners for click and dblclick from the window.
 */
// const handlerDblClick = () => {
//   unsubscribe()
//   window.removeEventListener("click", handlerClick)
//   window.removeEventListener("dblclick", handlerDblClick)
// }

// window.addEventListener("dblclick", handlerDblClick)
