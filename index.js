'use strict'

var postcss = require('postcss')
var getCssClasses = require('get-css-classes')
var extendOptions = require('extend-options')

var hasMutation = require('./lib/has-mutation')
var getMutations = require('./lib/get-mutations')
var getWarningString = require('./lib/get-warning-string')
var containsMutationFromSource = require('./lib/contains-mutation-from-source')

module.exports = postcss.plugin('immutable-css', function (opts, cb) {
  var mutationsMap = {}

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
          mutationsMap[klass] = mutationsMap[klass] || []

          var klassSource = rule.source.input.from
          var klassLine = rule.source.start.line
          var klassColumn = rule.source.start.column

          // Ignore same file mutations. TODO: Make configurable
          if (containsMutationFromSource(klassSource, mutationsMap[klass])) {
            return
          }

          mutationsMap[klass].push({
            selector: klass,
            line: klassLine,
            column: klassColumn,
            rule: rule
          })
        })
      })
    })

    Object.keys(mutationsMap).forEach(function (mutationClass) {
      if (hasMutation(mutationClass, mutationsMap, opts)) {
        result.warn(getWarningString(mutationsMap[mutationClass]))
      } else {
        delete mutationsMap[mutationClass]
      }
    })

    cb(mutationsMap)
  }
})

module.exports.getMutations = getMutations
