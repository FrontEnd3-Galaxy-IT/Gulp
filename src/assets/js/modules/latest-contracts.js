/**
 * Latest Contracts: tab switching that filters cards by data-tab-id.
 * Active tab is reflected in the URL via history.replaceState (?tab=...).
 */
export function initLatestContracts() {
  const root = document.querySelector(".js-latest")
  if (!root) return

  const tabs = root.querySelectorAll(".js-tab-item")
  const cards = root.querySelectorAll(".js-contract-card")
  if (!tabs.length || !cards.length) return

  function applyActive(tabId) {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.tabId === tabId
      tab.classList.toggle("tab-item--active", isActive)
    })

    cards.forEach((card) => {
      const matches = card.dataset.tabId === tabId
      card.classList.toggle("is-hidden", !matches)
    })

    root.dataset.activeTab = tabId
  }

  const urlTab = new URLSearchParams(window.location.search).get("tab")
  const initialTab =
    (urlTab && Array.from(tabs).some((t) => t.dataset.tabId === urlTab) && urlTab) ||
    root.dataset.activeTab ||
    tabs[0].dataset.tabId

  applyActive(initialTab)

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.dataset.tabId
      applyActive(tabId)

      const params = new URLSearchParams(window.location.search)
      params.set("tab", tabId)
      const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`
      window.history.replaceState({}, "", newUrl)
    })
  })
}
