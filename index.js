'use strict'

var postcss = require('postcss')
var getCssClasses = require('get-css-classes')
var extendOptions = require('extend-options')

var hasMutation = require('./lib/has-mutation')
var getWarningString = require('./lib/get-warning-string')
var containsMutationFromSource = require('./lib/contains-mutation-from-source')

module.exports = postcss.plugin('immutable-css', function (opts, cb) {
  var classMap = {}

  return function immutableCss (root, result) {
    if (typeof opts === 'function') {
      cb = opts
      opts = {}
    }

    cb = cb || function () {}
    opts = extendOptions({
      immutableClasses: [],
      immutablePrefixes: [],
      ignoredClasses: []
    }, opts || {})

    root.eachRule(function (rule) {
      rule.selectors.forEach(function (selector) {
        getCssClasses(selector).forEach(function (klass) {
          classMap[klass] = classMap[klass] || []

          // Ignore same file mutations. TODO: Make configurable
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
