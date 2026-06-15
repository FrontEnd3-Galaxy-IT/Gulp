// gulpfile.js
import gulp from "gulp"
import { clean } from "./gulp/tasks/clean.js"
import { cacheClean, manualCacheClean } from "./gulp/tasks/clean-cache.js"
import { serve } from "./gulp/tasks/browser-sync.js"
import { fontsCopy, fontsGenerate } from "./gulp/tasks/fonts.js"
import { gzip } from "./gulp/tasks/gzip.js"
import { htaccess } from "./gulp/tasks/htaccess.js"
import { injectAssets, injectMenuGlobal } from "./gulp/tasks/inject.js"
import { json } from "./gulp/tasks/json.js"
import { docs, image, music, video, webpStream } from "./gulp/tasks/media.js"
import { pwaSw, pwaConfigs, pwaFavicons } from "./gulp/tasks/pwa.js"
import { revision, revisionRewrite } from "./gulp/tasks/revision.js"
import { scripts } from "./gulp/tasks/scripts.js"
import { styles } from "./gulp/tasks/styles.js"
import { svg } from "./gulp/tasks/svg.js"
import { twig } from "./gulp/tasks/twig.js"
import { watch } from "./gulp/tasks/watch.js"
import { resourcesCopy } from "./gulp/tasks/resources.js"

const tasks = gulp.series(
  clean,
  gulp.parallel(
    fontsGenerate,
    twig,
    scripts,
    fontsCopy,
    svg,
    image,
    docs,
    video,
    music,
    webpStream,
    htaccess,
    json,
  ),
  styles,
  resourcesCopy,
  pwaSw,
  pwaConfigs,
  pwaFavicons,
  revision,
  revisionRewrite,
  injectAssets,
  gzip,
  cacheClean,
)

export { tasks as build, manualCacheClean }
export default gulp.series(tasks, injectMenuGlobal, gulp.parallel(watch, serve))