import * as screens from "./screen-sizes.js"
import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"
import ico from "sharp-ico"

const ensureDir = (folder) => fs.mkdirSync(folder, { recursive: true })
const toBuffer = (buffer) => sharp(buffer).png().toBuffer()

const resizeTo = (buf, folder, size, prefix) => {
  const [width, height] = size.split("x")
  return sharp(buf)
    .resize(Number(width), Number(height))
    .png()
    .toFile(path.join(folder, `${prefix}-${size}.png`)) // Виправлено на path.join
}

export const faviconIcoGenerate = async (buffer, dest) => {
  ensureDir(dest)
  const buf = await toBuffer(buffer)
  // Виправлено склеювання шляху
  await ico.sharpsToIco([sharp(buf)], path.join(dest, "favicon.ico")).catch(console.error)
}

export const faviconGenerate = async (buffer, dest) => {
  ensureDir(dest)
  const buf = await toBuffer(buffer)
  await Promise.all([
    ...screens.icons.map((size) => resizeTo(buf, dest, size, "icon")),
    ...screens.favicons.map((size) => resizeTo(buf, dest, size, "favicon")),
    ...screens.msTiles.map((size) => resizeTo(buf, dest, size, "ms-tile")),
    ...screens.appleTouchIcons.map((size) => resizeTo(buf, dest, size, "apple-touch-icon")),
  ])
}

export const launchScreensGenerate = async (buffer, dest) => {
  ensureDir(dest)
  const buf = await toBuffer(buffer)
  await Promise.all(screens.launchScreens.map((size) => resizeTo(buf, dest, size, "launch-screen")))
}

export default { faviconGenerate, launchScreensGenerate, faviconIcoGenerate }
