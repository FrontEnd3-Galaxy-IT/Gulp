import { deleteAsync } from "del"
import { destFolderPath } from "../gulpfile.config.js"

export async function clean() {
  return deleteAsync([`${destFolderPath}`, './.tmp'])
}
