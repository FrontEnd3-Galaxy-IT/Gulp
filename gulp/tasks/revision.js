import gulp from "gulp"
import rev from "gulp-rev"
import revDeleteOriginal from "gulp-rev-delete-original"
import revRewrite from "gulp-rev-rewrite"
import fs from "fs"
import { prod } from "../utils/env.js"
import { destFolderPath } from "../gulpfile.config.js"

export function revision() {
  if (!prod) return Promise.resolve()
  return gulp
    .src(`${destFolderPath}/**/*.{js,css}`)
    .pipe(rev())
    .pipe(revDeleteOriginal())
    .pipe(gulp.dest(`${destFolderPath}`))
    .pipe(rev.manifest())
    .pipe(gulp.dest(`${destFolderPath}`))
}

export function revisionRewrite() {
  if (!prod) return Promise.resolve()
  const manifestJson = fs.readFileSync(`${destFolderPath}/rev-manifest.json`, "utf8")

  return gulp
    .src(`${destFolderPath}/**/*.html`)
    .pipe(revRewrite({ manifest: manifestJson }))
    .pipe(gulp.dest(`${destFolderPath}`))
}
