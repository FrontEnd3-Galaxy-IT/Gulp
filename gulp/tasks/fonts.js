import gulp from "gulp"
import ttf2svg from "gulp-ttf-svg"
import ttf2eot from "gulp-ttf2eot"
import ttf2woff from "gulp-ttf2woff"
import ttf2woff2 from "gulp-ttf2woff2"
import { destFolderPath } from "../gulpfile.config.js"

const fontsSourceDir = "./src/assets/fonts/"

export function fontsCopy() {
  return gulp.src(`${fontsSourceDir}*.*`, { encoding: false }).pipe(gulp.dest(`${destFolderPath}/fonts/`))
}

function _toSvg() {
  return gulp
    .src(`${fontsSourceDir}*.ttf`, { encoding: false })
    .pipe(ttf2svg())
    .pipe(gulp.dest(`${destFolderPath}/fonts/`))
}

function _toEot() {
  return gulp
    .src(`${fontsSourceDir}*.ttf`, { encoding: false })
    .pipe(ttf2eot())
    .pipe(gulp.dest(`${destFolderPath}/fonts/`))
}

function _toWoff() {
  return gulp
    .src(`${fontsSourceDir}*.ttf`, { encoding: false })
    .pipe(ttf2woff())
    .pipe(gulp.dest(`${destFolderPath}/fonts/`))
}

function _toWoff2() {
  return gulp
    .src(`${fontsSourceDir}*.ttf`, { encoding: false })
    .pipe(ttf2woff2())
    .pipe(gulp.dest(`${destFolderPath}/fonts/`))
}

export const fontsGenerate = gulp.parallel(_toSvg, _toEot, _toWoff, _toWoff2)
