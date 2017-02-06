module.exports = {
  range,
  transform,
  memoize
}

function range (min = 0, max = 1) {
  return Array.apply(0, Array(max - min))
    .map((num, index) => index + min)
}

function transform (obj, options) {
  return Object.keys(options)
    .reduce((transformed, prop) => {
      transformed[options[prop]] = obj[prop]
      return transformed
    }, {})
}

function cache (fn, key) {
  if (!fn.cache) {
    fn.cache = {}
  }

  if (!fn.cache[key]) {
    fn.cache[key] = fn(key)
  }
  return fn.cache[key]
}

function memoize (fn) {
  return cache.bind(null, fn)
}
