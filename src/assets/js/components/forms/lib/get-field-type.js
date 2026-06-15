import { FormCheckbox } from "../components/form-checkbox"
import { FormRadioGroup } from "../components/form-radio-group"
import { FormField } from "../components/form-field"

/**
 * @param { Form } form
 * @param { HTMLElement } $field
 * @param { number } index
 *
 * @return FormField | FormCheckbox | FormRadioGroup
 * */
export const getFieldType = (form, $field, index) => {
  const fields = ["empty", "email", "name", "number", "password", "tel"]
  const checkboxes = ["checkbox", "radio"]

  /**
   * Here you can add you common field type
   * */

  if (fields.includes($field.dataset.type)) {
    return new FormField({ form, field: $field, index })
  }

  if (checkboxes.includes($field.dataset.type)) {
    return new FormCheckbox({ form, field: $field, index })
  }

  if ($field.dataset.type === "radio-group") {
    return new FormRadioGroup({ form, field: $field, index })
  }

  /**
   * If param field type will not be matched with any expression
   * by default field will be registered as FormField with type "empty"
   * */

  console.warn(
    "[data-type] is required, the field without the attribute will get automatically",
    form,
    $field,
  )
  $field.setAttribute("data-type", "empty")

  return new FormField({ form, field: $field, index })
}
