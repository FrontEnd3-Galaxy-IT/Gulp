import path from "node:path"
import through from "through2"
import { buildDir } from "../utils/env.js"

const generateConfigXml = () => {
  return through.obj((file, encoding, callback) => {
    const manifest = JSON.parse(file.contents.toString())

    // Set name and path to file
    file.path = path.join(buildDir, "config.xml")

    file.contents = Buffer.from(`<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="./favicons/mstile-70x70.png"/>
      <square150x150logo src="./favicons/mstile-150x150.png"/>
      <wide310x150logo src="./favicons/mstile-310x150.png"/>
      <square310x310logo src="./favicons/mstile-310x310.png"/>
      <TileColor>${manifest.theme_color || '#000000'}</TileColor>
    </tile>
  </msapplication>
</browserconfig>`)

    callback(null, file)
  })
}

export default generateConfigXml
