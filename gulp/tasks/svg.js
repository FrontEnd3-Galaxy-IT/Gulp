import gulp from "gulp"
const { src, dest, parallel } = gulp
import cache from "gulp-cache"
import path from "node:path"
import svgmin from "gulp-svgmin"
import cheerio from "gulp-cheerio"
import replace from "gulp-replace"
import svgSprite from "gulp-svg-sprite"
import { buildDir } from "../utils/env.js"

function buildSvgSprite() {
  return (
    src("./src/assets/icon/*.svg")
      .pipe(svgmin({ cwd: "./gulp" }))
      .pipe(
        cheerio({
          run: ($) => {
            $("[style]").removeAttr("style")
            $("[stroke]").attr("stroke", "currentColor")
            $("[fill]").attr("fill", "currentColor")
          },
          parserOptions: { xmlMode: true },
        }),
      )
      .pipe(replace("&gt;", ">"))
      .pipe(
        svgSprite({
          shape: {
            id: {
              // If file named adaptation.svg, it's ID in sprite.svg will be strict "adaptation"
              generator: function (name) {
                return path.basename(name, ".svg")
              },
            },
          },
          mode: {
            stack: {
              sprite: "./sprite.svg", // Sprite file name
              mixins: true,
              example: {
                template: path.resolve("./gulp/utils/svg-sprite-preview-template.html"), // Galaxy IT Custom Sprite template
                dest: "./galaxyit-sprite-showcase.html", // Custom template name
              },
            },
          },
        }),
      )
      // store to `${destFolderPath}/icon/`
      .pipe(dest(path.join(buildDir, "icon")))
  )
}

function buildStandaloneSvg() {
  return src("./src/assets/svg/*.svg")
    .pipe(cache(svgmin(), { name: "svg-standalone-illustrations-cache" }))
    .pipe(dest(path.join(buildDir, "svg")))
}

export const svg = parallel(buildSvgSprite, buildStandaloneSvg)
