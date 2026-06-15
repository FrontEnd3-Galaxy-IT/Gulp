import cache from "gulp-cache"
import { prod } from "../utils/env.js"

export function cacheClean(cb) {
  if (!prod) return Promise.resolve()
  return cache.clearAll(cb)
}

export function manualCacheClean(cb) {
  return cache.clearAll(cb)
}
