'use strict'

var postcss = require('postcss')
var getCssClasses = require('get-css-classes')
var extendOptions = require('extend-options')

module.exports = postcss.plugin('immutable-css', function (opts, cb) {
  var classMap = {}

  return function immutableCss (root, result) {
    if (typeof opts === 'function') {
      cb = opts
      opts = {}
    }

    cb = cb || function () {}
    opts = extendOptions({
      immutableSelectors: [],
      ignoredSelectors: []
    }, opts || {})

    root.eachRule(function (rule) {
      rule.selectors.forEach(function (selector) {
        getCssClasses(selector).forEach(function (klass) {
          classMap[klass] = classMap[klass] || []
          if (containsMutationFromSource(rule.source.input.from, classMap[klass])) {
            return
          }

          classMap[klass].push({
            selector: klass,
            line: rule.source.start.line,
            column: rule.source.start.column,
            rule: rule
          })
        })
      })
    })

    Object.keys(classMap).forEach(function (mutationClass) {
      if (hasMutation(mutationClass, classMap, opts)) {
        result.warn(getWarningString(classMap[mutationClass]))
      } else {
        delete classMap[mutationClass]
      }
    })

    cb(classMap)
  }
})

function containsMutationFromSource(source, mutations) {
  return mutations.some(function (mutation) {
    return mutation.rule.source.input.from === source
  }) 
}

function getWarningString(mutations) {
  var warning = mutations[0].selector + ' was mutated ' + mutations.length + ' times\n'

  mutations.forEach(function (mutation) {
   warning += '[line ' + mutation.line + ', col ' + mutation.column + ']: ' + mutation.rule.source.input.from + '\n'
  })

  return warning
}

function hasMutation(mutationClass, classMap, opts) {
  return (classMap[mutationClass].length > 1 || opts.immutableSelectors.indexOf(mutationClass) != -1) &&
         opts.ignoredSelectors.indexOf(mutationClass) == -1
}
