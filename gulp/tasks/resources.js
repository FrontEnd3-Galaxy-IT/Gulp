import gulp from "gulp"
import { destFolderPath } from "../gulpfile.config.js"

export function resourcesCopy() {
  return gulp.src("./src/assets/*.*").pipe(gulp.dest(`${destFolderPath}`))
}
