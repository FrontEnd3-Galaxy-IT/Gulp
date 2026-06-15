import propertyGroups from "stylelint-config-recess-order/groups.js"

export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recess-order",
    "stylelint-config-standard-scss",
  ],
  rules: {
    "order/properties-order": propertyGroups.map((group) => ({
      ...group,
      emptyLineBefore: ["always", { except: ["after-rule"] }],
      noEmptyLineBetween: true,
    })),
    "order/properties-alphabetical-order": true,
    "selector-class-pattern": "^([a-z]+__)?[a-z]+([_-][a-z0-9]+)*$", // BEM
    // "selector-class-pattern": null,  // Any pattern
    "number-max-precision": 5,
    "block-no-empty": true,
    "declaration-no-important": false,
    "declaration-empty-line-before": null,
    "font-family-name-quotes": "always-where-required",
    "no-invalid-double-slash-comments": true,
    "comment-no-empty": true,
    "declaration-block-trailing-semicolon": "always", // крапка з комою в кінці
    "declaration-block-single-line-max-declarations": 1, // 1 декларація на рядок
    "selector-max-attribute": 3, // максимум 3 атрибути в селекторі
    "selector-max-class": 4, // максимум 3 класи
    "no-descending-specificity": null, // дозволяє селекторам з більшою специфічністю йти після менш специфічних
  },
}
