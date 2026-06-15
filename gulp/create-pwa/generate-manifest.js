import * as screens from "./screen-sizes.js"
import through from "through2"
import { folderName } from "../utils/env.js"

// Change to pretty name (EXAMPLE: "Gulp V2")
const prettyProjectName = folderName
  .replace(/[-_]/g, " ")
  .replace(/\b\w/g, (char) => char.toUpperCase())

const manifestTemplate = {
  name: prettyProjectName,
  short_name: prettyProjectName,
  start_url: ".",
  display: "fullscreen",
  background_color: "#000000",
  theme_color: "#000000",
  description: "The best IT company, now it is from USA. USA is dream, so Galaxy IT - it's dream :D",
  related_applications: [],
  permissions: ["gcm"],
  gcm_sender_id: "",
  gcm_user_visible_only: true,
  lang: "en",
  dir: "ltr",
  orientation: "all",
  scope: "/",
}

const icons = screens.icons.map((size) => ({
  src: `favicons/icon-${size}.png`,
  sizes: size,
  type: "image/png",
  purpose: "any maskable",
}))

const generateManifest = () => {
  return through.obj((file, encoding, callback) => {
    const manifest = JSON.parse(file.contents.toString())
    const result = { ...manifestTemplate, ...manifest, icons }

    file.contents = Buffer.from(JSON.stringify(result, null, 2))
    callback(null, file)
  })
}

export default generateManifest
