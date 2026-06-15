import path from "path"

export function tapGlobalMixin(file) {
  const filePath = file.path.replace(/\\/g, "/")

  // Ignore files in `tools` folder
  if (filePath.includes("/_tools/")) {
    return
  }
  // 1. Absolute path to _tools.scss
  const absoluteToolsPath = path.resolve("src/assets/scss/_tools/_index.scss")

  // 2. Count related path to tools/_index.scss
  let relativePath = path.relative(path.dirname(file.path), absoluteToolsPath)

  // 3. Windows-dashes to CSS-dashes (if you still use Windows)
  relativePath = relativePath.replace(/\\/g, "/")

  // 4. Sass not use `_` in @use, replace it
  // Replace to path "../../_tools/_index.scss" in "../../tools" by default Sass try to find _index.scss not need extra type it
  relativePath = relativePath.replace("/_index.scss", "")

  // 5. If file in same dir, path.relative not set "./", just for validating
  if (!relativePath.startsWith(".")) {
    relativePath = "./" + relativePath
  }

  // Build @use string with correct path for current file
  const headerText = `@use '${relativePath}' as *;\n`

  file.contents = Buffer.concat([Buffer.from(headerText), file.contents])
}