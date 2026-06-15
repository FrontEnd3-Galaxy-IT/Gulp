import gulp from "gulp"
import path from "node:path"
import fs from "node:fs"
import generateManifest from "../create-pwa/generate-manifest.js"
import generateConfigXml from "../create-pwa/generate-config-xml.js"
import {
  faviconGenerate,
  faviconIcoGenerate,
  launchScreensGenerate,
} from "../create-pwa/generate-images.js"
import { destFolderPath } from "../gulpfile.config.js"
import { getManifest } from "workbox-build"
import { buildDir } from "../utils/env.js"

export async function pwaSw() {

  // 1. Ask Google Workbox to scan ready builder folder after revision
  const { manifestEntries } = await getManifest({
    globDirectory: buildDir,
    globPatterns: [
      "**/*.html", // Find All pages
      "css/**/*.css", // Find & compile revision .css
      "js/**/*.js", // Find & compile revision .js
      "favicons/favicon-196x196.png",
    ],
  })

  // 2. Read out file-template from src folder
  const swTemplatePath = path.resolve("./src/assets/pwa/service-worker.js")
  let swContent = fs.readFileSync(swTemplatePath, "utf8")

  // 3. Заміняємо маркер self.__WB_MANIFEST на реальний згенерований масив об'єктів
  // Change array JS to text row JSON
  const manifestString = JSON.stringify(manifestEntries, null, 2)
  swContent = swContent.replace("self.__WB_MANIFEST", manifestString)

  // 4. Записуємо готовий, повністю укомплектований файл прямо в корінь папки збірки
  const finalSwPath = path.join(buildDir, "service-worker.js")
  fs.writeFileSync(finalSwPath, swContent, "utf8")

  console.log(
    `[PWA SW]: Success in "**/*.html",implement ${manifestEntries.length} files (includes revision&hash) in service-worker.js`,
  )
}

export function pwaConfigs() {
  return gulp
    .src("./src/assets/pwa/manifest.json")
    .pipe(generateManifest())
    .pipe(gulp.dest(buildDir))
    .pipe(generateConfigXml())
    .pipe(gulp.dest(buildDir)) // Запис config.xml прямо в корінь buildDir
}

export async function pwaFavicons() {
  // Знаходимо вихідні файли строго від кореня проєкту
  const faviconSrc = path.resolve("src/assets/pwa/favicon.png")
  const launchSrc = path.resolve("src/assets/pwa/launch-screen.png")

  // Цільові папки всередині нашої універсальної buildDir
  const faviconsDir = path.join(buildDir, "favicons")
  const launchDir = path.join(buildDir, "launch-screens")

  const faviconBuf = fs.readFileSync(faviconSrc)
  const launchBuf = fs.readFileSync(launchSrc)

  await Promise.all([
    faviconGenerate(faviconBuf, faviconsDir),
    launchScreensGenerate(launchBuf, launchDir),
    faviconIcoGenerate(faviconBuf, faviconsDir),
  ])
}
