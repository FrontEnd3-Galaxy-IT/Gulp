import gulp from "gulp"
import changed from "gulp-changed"
import cache from "gulp-cache"
import imagemin, { gifsicle, mozjpeg, optipng } from "gulp-imagemin"
import webp from "gulp-webp"
import tinypng from "gulp-tinypng"
import { buildDir, folderName, ifenv } from "../utils/env.js"
import { tiny_png_key, img_format, destFolderPath } from "../gulpfile.config.js"
import path from "node:path"

export function video() {
  return gulp
    .src("./src/web/video/**/*.*", { encoding: false })
    .pipe(changed(`${destFolderPath}/video/`))
    .pipe(gulp.dest(`${destFolderPath}/video/`))
}

export function music() {
  return gulp
    .src("./src/web/music/**/*.*", { encoding: false })
    .pipe(changed(`${destFolderPath}/music/`))
    .pipe(gulp.dest(`${destFolderPath}/music/`))
}

export function docs() {
  return gulp
    .src("./src/web/docs/**/*.*", { encoding: false })
    .pipe(changed(`${destFolderPath}/docs/`))
    .pipe(gulp.dest(`${destFolderPath}/docs/`))
}

export function image() {
  return (
    gulp
      .src(`./src/web/img/**/*.${img_format}`, { encoding: false })
      // Pass the production environment condition directly into cache
      .pipe(
        cache(
          // We process files through tinypng first, then pass the output buffer to imagemin
          ifenv(tinypng(tiny_png_key)).pipe(
            imagemin([
              gifsicle({ interlaced: true }),
              mozjpeg({ quality: 75, progressive: true }),
              optipng({ optimizationLevel: 5 }),
            ]),
          ),
          {
            name: `${folderName}-gulp-image-cache`,
          },
        ),
      )

      .pipe(gulp.dest(path.join(buildDir, "img")))
  )
}

export function webpStream() {
  return gulp
    .src(`./src/web/img/**/*.${img_format}`, { encoding: false })
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest(`${destFolderPath}/img/`))
}
