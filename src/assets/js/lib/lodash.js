class LodashLocal {
  /**
   * Detailed information you can try and read here
   * @link https://javascript.info/task/debounce
   *
   * @param { function } f
   * @param { number } ms
   *
   * @return { function }
   * */
  debounce(f, ms) {
    let isCooldown = false

    return function() {
      if (isCooldown) return

      f.apply(this, arguments)

      isCooldown = true

      setTimeout(() => (isCooldown = false), ms)
    }
  }

  /**
   * Detailed information you can try and read here
   * @link https://javascript.info/task/throttle
   *
   * @param { function } func
   * @param { number } ms
   *
   * @return { function }
   * */
  throttle(func, ms) {
    let isThrottled = false,
      savedArgs,
      savedThis

    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments
        savedThis = this
        return
      }

      func.apply(this, arguments)

      isThrottled = true

      setTimeout(function() {
        isThrottled = false
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs)
          savedArgs = savedThis = null
        }
      }, ms)
    }

    return wrapper
  }
}

/**
 * @type {LodashLocal}
 * */
export const Lodash = new LodashLocal()