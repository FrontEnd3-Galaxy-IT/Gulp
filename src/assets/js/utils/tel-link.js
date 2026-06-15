export const convertLinkToTelPattern = (linkNode) => {
  if(!linkNode || !linkNode.href.includes("tel")) return
  const linkHref = linkNode.getAttribute("href")
  const newTelLink = "tel:" + "+" + linkHref.replace(/\D/g, "")
  linkNode.href = newTelLink
}