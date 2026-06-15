import gulp from "gulp"
import { bs } from "./browser-sync.js"
import { ifenv } from "../utils/env.js"

export function json() {
  return gulp.src("./src/data/**/*.json").pipe(ifenv(bs.reload({ stream: true }), "development"))
}
