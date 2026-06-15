import browserSync from "browser-sync"
import { destFolderPath } from "../gulpfile.config.js"
export const bs = browserSync.create()

export function serve(cb) {
  bs.init({ server: `${destFolderPath}` }, cb)
}
