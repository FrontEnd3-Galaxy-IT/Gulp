import gulp from "gulp"
import zopfliGreen from "gulp-zopfli-green"
import { prod } from "../utils/env.js"
import { destFolderPath } from "../gulpfile.config.js"

export function gzip() {
  if (!prod) return Promise.resolve()

  return gulp
    .src(`${destFolderPath}/**/*.{css,js}`)
    .pipe(zopfliGreen())
    .pipe(gulp.dest(`${destFolderPath}/`))
}
