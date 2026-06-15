/**
 * Checks if the given object is a plain object (excluding arrays and null).

 * @param {any} obj - The object to check.
 * @param {function} [callback] - An optional callback function to apply to the object if it is a plain object.

 * @returns {boolean|any} - Returns true if the object is a plain object, otherwise returns false.

 * If a callback function is provided, it will be called with the object as an argument and its return
 * value will be returned or if return value will be null | undefined return value will be boolean.
 */
export const isObject = (obj, callback) => {
  if (typeof obj === "object" && !Array.isArray(obj) && obj !== null) {
    return callback ? callback(obj) ?? true : true
  }

  return false
}
