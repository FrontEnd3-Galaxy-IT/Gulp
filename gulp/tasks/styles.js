import gulp, { series } from "gulp"
import gulpSass from "gulp-sass"
import * as dartSass from "sass"
import sourcemaps from "gulp-sourcemaps"
import postcss from "gulp-postcss"
import plumber from "gulp-plumber"
import concat from "gulp-concat"
import { bs } from "./browser-sync.js"
import { ifenv } from "../utils/env.js"
import tap from "gulp-tap"
import { tapGlobalMixin } from "../utils/styles.js"
import { destFolderPath } from "../gulpfile.config.js"

const sass = gulpSass(dartSass)

export const styles = series(prepareStyles, compileStyles)

function prepareStyles() {
  return gulp
    .src("src/assets/scss/**/*.scss")
    .pipe(tap((file) => tapGlobalMixin(file)))
    .pipe(gulp.dest(".tmp/scss")) // dest temporary files to .tmp folder
}

function compileStyles() {
  return gulp
    .src(".tmp/scss/main.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        loadPaths: ["src/assets/scss", "node_modules"],
        errLogToConsole: true,
      }).on("error", sass.logError),
    )
    .pipe(postcss())
    .pipe(ifenv(plumber(), "development"))
    .pipe(concat("app.css"))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(`${destFolderPath}/css/`))
    .pipe(ifenv(bs.reload({ stream: true }), "development"))
    .on("end", () => {})
}
