import gulp from "gulp"
import { twig } from "./twig.js"
import { injectAssets, injectMenuGlobal } from "./inject.js"
import { pwaSw } from "./pwa.js"
import { styles } from "./styles.js"
import { svg } from "./svg.js"
import { scripts } from "./scripts.js"
import { image, music, docs, video, webpStream } from "./media.js"
import { img_format } from "../gulpfile.config.js"

export function watch() {
  // 1. Core Templates: Render HTML first, then link assets, then build menu arrays
  gulp.watch("./src/views/**/*.twig", gulp.series(twig, injectAssets, injectMenuGlobal))
  gulp.watch("./src/data/**/*.json", gulp.series(twig))

  // 2. Corrected PWA Order: Compile templates first, THEN update the service worker cache map
  gulp.watch("./src/assets/pwa/service-worker.js", gulp.series(twig, pwaSw))

  // 3. Styles & Scripts: Standard lightning-fast isolated compilers
  gulp.watch("./src/assets/scss/**/*.scss", gulp.series(styles))
  gulp.watch("./src/assets/{icon,svg}/*.svg", gulp.series(svg))
  gulp.watch("./src/assets/js/**/*.js", gulp.series(scripts))

  // 4. Media & Assets: Handles binary streaming data copies
  gulp.watch("./src/web/video/**/*.*", gulp.series(video))
  gulp.watch("./src/web/music/**/*.*", gulp.series(music))
  gulp.watch("./src/web/docs/**/*.*", gulp.series(docs))
  gulp.watch(`./src/web/img/**/*.${img_format}`, gulp.series(image, webpStream))
}
