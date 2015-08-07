module.exports = function containsImmutablePrefix (mutationClass, opts) {
  return opts.immutablePrefixes.some(function (prefix) {
    return prefix.test(mutationClass)
  })
}
