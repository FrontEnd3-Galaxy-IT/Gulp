import cssnano from "cssnano"
import autoprefixer from "autoprefixer"
import combineMediaQuery from "postcss-combine-media-query"
import sortMediaQueries from "postcss-sort-media-queries"
import short from "postcss-short"

export default {
  plugins: [
    cssnano({
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
    autoprefixer(),
    combineMediaQuery(),
    sortMediaQueries(),
    short(),
    // purgecss({
    //   content: ['./src/assets/**/*.{scss,css,styl,stylus,js}', './build/**/*.html'],
    //   // extractors: [
    //   //   {
    //   //     extractor: principalExtractor,
    //   //     extensions: ['pug']
    //   //   }
    //   // ],
    //   fontFace: true,
    //   keyframes: true,
    //   variables: true,
    //   whitelistPatterns: [/[a-z]+__+[a-z]/],
    //   whitelistPatternsChildren: [/[a-z]+__+[a-z]/],
    //   safelist: {
    //     greedy: [/[a-z]+__+[a-z]/]
    //   },
    //   defaultExtractor: (content) => {
    //     const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    //     const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    //     return broadMatches.concat(innerMatches);
    //   }
    // })
  ],
}
