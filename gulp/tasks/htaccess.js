import gulp from "gulp"
import concat from "gulp-concat"
import { ifenv, prod } from "../utils/env.js"
import { destFolderPath } from "../gulpfile.config.js"

export function htaccess() {
  if (!prod) return Promise.resolve()

  return gulp
    .src("./src/ht.access")
    .pipe(ifenv(concat(".htaccess")))
    .pipe(ifenv(gulp.dest(`${destFolderPath}`)))
}
