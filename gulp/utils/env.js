/** Аналог gulp-if-env: повертає плагін або через потік-заглушку */
import gulpIf from "gulp-if"
import process from "node:process"
import { fileURLToPath } from "node:url"
import path from "node:path"
import { destFolderPath } from "../gulpfile.config.js"

/** true, якщо NODE_ENV=production */
export const prod = process.env.NODE_ENV === "production"

export const ifenv = (plugin, type = "production") =>
  gulpIf(type === "production" ? prod : !prod, plugin)

export const getDirname = path.dirname(fileURLToPath(import.meta.url))

export const folderName = path.basename(process.cwd());

export const buildDir = path.resolve(destFolderPath || "./build");
