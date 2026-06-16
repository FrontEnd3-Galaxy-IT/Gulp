/**
 * Search Page: filter contract cards by the `query` URL param.
 * Card title and description are read from data-* attributes.
 */
export function initSearchPage() {
  const root = document.querySelector(".js-search-page")
  if (!root) return

  const grid = root.querySelector(".js-search-grid")
  const empty = root.querySelector(".js-search-empty")
  const queryEl = root.querySelector(".js-search-query")
  const cards = grid ? grid.querySelectorAll(".js-contract-card") : []

  const params = new URLSearchParams(window.location.search)
  const query = (params.get("query") || "").trim().toLowerCase()

  if (queryEl) queryEl.textContent = query

  let visibleCount = 0

  cards.forEach((card) => {
    const title = (card.dataset.title || "").toLowerCase()
    const description = (card.dataset.description || "").toLowerCase()
    const matches = !query || title.includes(query) || description.includes(query)
    card.classList.toggle("is-hidden", !matches)
    if (matches) visibleCount += 1
  })

  if (empty) {
    empty.style.display = !query || visibleCount > 0 ? "none" : ""
  }

  if (grid) {
    grid.style.display = visibleCount > 0 ? "" : "none"
  }
}
