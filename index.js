module.exports = {
  range,
  transform,
  memoize,
  median,
  Reducers,
  Filters,
  Sorters
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

  if (fn.cache[key] === undefined) {
    fn.cache[key] = fn(key)
  }

  return fn.cache[key]
}

function memoize (fn) {
  return cache.bind(null, fn)
}

function median (...numbers) {
  const sorted = numbers.sort(Sorters.ascending)
  const middle = Math.floor(numbers.length / 2)

  if (numbers.length % 2 === 1) {
    return sorted[middle]
  }

  return (sorted[middle - 1] + sorted[middle]) / 2.0
}

const Reducers = {
  flatten (a, b) {
    return a.concat(b)
  },

  deepFlatten (arr) {
    return arr.reduce((a, b) => (
      a.concat(Array.isArray(b) ? this.deepFlatten(b) : b)
    ), [])
  },

  sum (a, b) {
    return a + b
  }
}

const Filters = {
  keepUnique (item, index, array) {
    return index === array.indexOf(item)
  }
}

const Sorters = {
  ascending: (a, b) => a - b,
  descending: (a, b) => b - a
}
