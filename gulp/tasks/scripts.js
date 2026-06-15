import { rollup } from "rollup"
import { babel } from "@rollup/plugin-babel"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"
import { globSync } from "glob"
import path from "node:path"
import { bs } from "./browser-sync.js"
import { buildDir, prod } from "../utils/env.js"

const srcDir = path.resolve("src/assets/js")

const plugins = [
  nodeResolve(),
  commonjs(),
  babel({
    babelHelpers: "bundled",
    presets: [...(prod ? ["@babel/preset-env"] : [])],
  }),
]

const buildEntry = (input, output) =>
  rollup({ input, plugins }).then((bundle) =>
    bundle.write({
      file: output,
      sourcemap: true,
      format: "iife",
      inlineDynamicImports: true,
      plugins: [terser()],
    }),
  )

export async function scripts() {
  // Replacing Windows backslashes with forward slashes keeps glob happy on all OS
  const files = globSync(`${srcDir.replace(/\\/g, '/')}/*.js`)

  await Promise.all(
    files.map((file) => {
      // 4. Safely calculate the output destination relative to the root build directory
      const relativePath = path.relative(srcDir, file)
      const outputFile = path.join(`${buildDir}/js`, relativePath)

      return buildEntry(file, outputFile)
    }),
  )
  if (!prod) bs.reload()
}
