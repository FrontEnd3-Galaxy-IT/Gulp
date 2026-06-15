import gulp from "gulp"
import plumber from "gulp-plumber"
import data from "gulp-data"
import gulpTwig from "gulp-twig"
import notify from "gulp-notify"
import htmlmin from "gulp-htmlmin"
import flatten from "gulp-flatten"
import { bs } from "./browser-sync.js"
import { ifenv, prod } from "../utils/env.js"
import { getCurrentPage, getTwigData, twigFunctions } from "../utils/twig.js"
import { destFolderPath } from "../gulpfile.config.js"

export function twig() {

  return gulp
    .src("./src/views/**/{*.page.twig,index.twig}")
    .pipe(ifenv(plumber(), "development"))
    .pipe(data(getTwigData)) // Extract data dynamically based on the twig file name in /src/data/pages/*.twig.json
    .pipe(data((file) => ({ currentPage: getCurrentPage(file), prod })))
    .pipe(gulpTwig({ base: "./src/views", functions: twigFunctions }))
    .on(
      "error",
      notify.onError((e) => ({ title: "Twig", message: e })),
    )
    .pipe(ifenv(htmlmin({ collapseWhitespace: true })))
    .pipe(flatten()) // put all in build without directory tree
    .pipe(
      gulp.dest((file) => {
        file.path = file.path.replace(/\.page/, "")
        return destFolderPath
      }),
    )
    .pipe(ifenv(bs.reload({ stream: true }), "development"))
}
