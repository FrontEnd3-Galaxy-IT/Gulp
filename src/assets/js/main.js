import { convertLinkToTelPattern } from "./utils/tel-link"
import { initSiteHeader } from "./modules/site-header"
import { initSearchForm } from "./modules/search-form"
import { initLatestContracts } from "./modules/latest-contracts"
import { initSearchPage } from "./modules/search-page"

/**
 * Show hidden elements as modals, popups, tooltips, etc.
 * In a first load webpage html elements loads before styles. That's all
 * elements with transition is jumping on a page.
 * @type { NodeListOf<HTMLElement> }
 * */
const hiddenElements = document.querySelectorAll(".important_none")

window.addEventListener("load", async () => {
  hiddenElements.forEach(($el) => $el.classList.remove("important_none"))
  const linksToCheckTelPattern = document.querySelectorAll("a")
  linksToCheckTelPattern && linksToCheckTelPattern.forEach((linkTel) => convertLinkToTelPattern(linkTel))
  initLatestContracts()
  initSiteHeader()
  initSearchForm()
  initSearchPage()
})
