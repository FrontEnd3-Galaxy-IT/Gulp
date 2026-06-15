import gulp from "gulp"
import inject from "gulp-inject"
import through2 from "through2"
import { ifenv, prod } from "../utils/env.js"
import { destFolderPath } from "../gulpfile.config.js"
import { fakeStream, fontOptions, getPagesMenu, splashScreensOptions } from "../utils/inject.js"

export function injectAssets() {
  return gulp
    .src(`${destFolderPath}/**/*.html`)
    .pipe(
      ifenv(
        inject(
          fakeStream(`${destFolderPath}/launch-screens/launch-screen.png`),
          splashScreensOptions,
        ),
      ),
    )
    .pipe(
      inject(
        gulp.src("./src/assets/fonts/*.woff2", { read: false, allowEmpty: true }),
        fontOptions,
      ),
    )
    .pipe(gulp.dest(`${destFolderPath}`))
}

export function injectMenuGlobal() {
  if (prod) return Promise.resolve()

  return gulp
    .src("./src/auto/pages.json")
    .pipe(
      through2.obj(function (file, _, cb) {
        const pages = getPagesMenu(destFolderPath)

        // Put result back to pages.json
        file.contents = Buffer.from(JSON.stringify(pages, null, 2)) // null, "2" for good human reading JSON data

        cb(null, file)
      }),
    )
    .pipe(gulp.dest("./src/auto/"))
}
