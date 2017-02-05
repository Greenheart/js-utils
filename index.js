module.exports = {
  range,
  transform
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
