/**
 * @param { "empty" | "email" | "name" | "number" | "password" | "tel" } type
 * @return { RegExp | null }
 * */
export const getValidationPattern = (type) => {
  switch (type) {
    case "empty":
      /**
       * Returns true only with any symbols in string
       * You will get false if string will be with white spaces only
       * */
      return /./g

    case "email":
      /**
       * Returns true only with example like email@mail.com
       * */
      return /^[\w!#$%&'*+\-/=?^`{|}~]+(?:\.[\w!#$%&'*+\-/=?^`{|}~]+)*@(?:([a-z0-9][a-z0-9-]{0,62}[a-z0-9]|[a-z])\.)+[a-z]{2,11}|\d{1,3}(?:\.\d{1,3}){3}(?::\d{1,11})?$/i

    case "name":
      /**
       * Returns true only from letters
       * */
      return /^[А-яїЇіІA-z\s]+$/

    case "number":
      /**
       * Returns true only from numbers
       * */
      return /^\d+$/

    case "password":
      /**
       * Returns true if string will contain
       * - One lower charter
       * - One upper charter
       * - One number charter
       * - One special charter
       * - Min 8 charters
       *
       * @example valid - aaAA11!!
       */
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

    case "tel":
      /**
       * Valid formats
       * +123 (456) 789 00 00
       * +123 (456) 789-00-00
       * +123 (456) 7890000
       * +123(456)7890000
       */
      return /^\+?[0-9]{1,3}\s?\(?[0-9]{1,3}\)?-?\s?[0-9]{3}-?\s?[0-9]{2}-?\s?[0-9]{2}$/

    default:
      return null
  }
}
