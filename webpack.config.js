const path = require("path")

module.exports = {
  entry: ["@babel/polyfill", "./src/assets/js/main.js"],
  devtool: prod ? false : "source-map",
  mode: prod ? "production" : "development",
  output: {
    filename: "main.js"
  },
  optimization: {
    minimize: prod
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-nullish-coalescing-operator",
              "@babel/plugin-transform-template-literals",
              "@babel/plugin-transform-optional-chaining",
              "@babel/plugin-transform-private-methods",
              [
                "@babel/plugin-transform-modules-commonjs",
                {
                  allowTopLevelThis: true
                }
              ],
              [
                "@babel/plugin-transform-regenerator",
                {
                  asyncGenerators: false,
                  generators: false,
                  async: false
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
