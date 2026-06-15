import fs from "node:fs"
import path from "node:path"
import Twig from "twig"
import { getDirname } from "./env.js"

export const twigFunctions = [
  {
    name: "json", // get variables from .json files from data folder
    func: (fileName) =>
      JSON.parse(
        fs.readFileSync(path.join(getDirname, "../../src/data", `${fileName}.json`), "utf8"),
      ),
  },
  {
    name: "auto",
    func: (fileName) =>
      JSON.parse(
        fs.readFileSync(path.join(getDirname, "../../src/auto", `${fileName}.json`), "utf8"),
      ),
  },
  {
    name: "include_module",
    func: (fileName) => {
      const moduleData = loadModuleData(fileName)
      const modulePath = path.join(getDirname, "../../src/views/modules", `${fileName}.twig`)
      const moduleTemplate = Twig.twig({
        data: fs.readFileSync(modulePath, "utf8"),
        path: modulePath,
      })

      return moduleTemplate.render(moduleData)
    },
  },
]

export const getCurrentPage = ({ path: filePath }) =>
  path.basename(filePath).replace(new RegExp(path.extname(filePath)), "")

export function getTwigData(file) {
  const fileName = path.basename(file.path, ".twig")
  const dataPath = path.join(getDirname, "../../src/data/pages", `${fileName}.twig.json`)

  if (fs.existsSync(dataPath)) {
    return JSON.parse(fs.readFileSync(dataPath, "utf8"))
  }

  return {}
}

export function loadModuleData(fileName) {
  const dataPath = path.join(getDirname, "../../src/data/modules", `${fileName}.twig.json`)

  if (fs.existsSync(dataPath)) {
    return JSON.parse(fs.readFileSync(dataPath, "utf8"))
  }

  return {}
}
