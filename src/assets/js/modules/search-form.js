/**
 * Search Form: redirects to search.html?query=... on submit.
 * Pre-fills input from current URL if present.
 */
export function initSearchForm() {
  const forms = document.querySelectorAll(".js-search-form")
  if (!forms.length) return

  const currentQuery = new URLSearchParams(window.location.search).get("query") || ""

  forms.forEach((form) => {
    const input = form.querySelector("input[name='query']")
    if (input && currentQuery && !input.value) {
      input.value = currentQuery
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault()
      if (!input) return

      const value = input.value.trim()
      if (!value) return

      const params = new URLSearchParams()
      params.set("query", value)
      window.location.href = `search.html?${params.toString()}`
    })
  })
}
