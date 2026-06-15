import fs from "node:fs"
import path from "node:path"
import { Readable } from "node:stream"
import Vinyl from "vinyl"
import devices from "../create-pwa/devices.js"

const injectTransformHandle = (filepath) => filepath.match(/[^\\/]+\.[^\\/]+$/)[0]

export const splashScreensOptions = {
  starttag: "<!-- inject:splash screens -->",
  endtag: "<!-- endinject:splash screens -->",
  removeTags: false,
  transform: () =>
    devices
      .map(
        (d) =>
          `<link rel="apple-touch-startup-image" ` +
          `media="(device-width:${d.width / d.ratio}px) and (device-height:${
            d.height / d.ratio
          }px) and (-webkit-device-pixel-ratio:${d.ratio})" ` +
          `href="./launch-screens/launch-screen-${d.width}x${d.height}.png" />`,
      )
      .join(""),
}

export const fontOptions = {
  starttag: "<!-- inject:font preload -->",
  endtag: "<!-- endinject:font preload -->",
  removeTags: false,
  transform: (filepath) => {
    const fileName = injectTransformHandle(filepath)
    return `<link rel="preload" href="fonts/${fileName}" as="font" type="font/woff2" crossorigin="" />`
  },
}

// Fake stream with one vinyl-file — that inject always call transform()
export const fakeStream = (fakePath) => {
  const stream = new Readable({ objectMode: true })
  stream.push(new Vinyl({ path: path.resolve(fakePath), contents: null }))
  stream.push(null)
  return stream
}
export function getPagesMenu(destPath) {
  const absolutePath = path.resolve(destPath)

  const pages = deepScanDir(absolutePath, ".html")
    .filter((p) => !p.match(/index\.html|stack\.html/))
    .map((p) => {
      const pageName = path.basename(p, ".html")
      const relativePath = path.relative(absolutePath, p).replace(/\\/g, "/")

      return {
        name: pageName,
        path: "./" + relativePath,
      }
    })

  return pages.sort((a, b) => a.name.localeCompare(b.name))
}

export function deepScanDir(folder, ext) {
  let result = []
  for (const f of fs.readdirSync(folder)) {
    const full = path.resolve(folder, f)
    if (f.endsWith(ext)) result.push(full)
    if (isDirectory(full)) result = result.concat(deepScanDir(full, ext))
  }
  return result
}

function isDirectory(p) {
  try {
    return fs.statSync(p).isDirectory()
  } catch {
    return false
  }
}