'use strict'

var postcss = require('postcss')
var getCssClasses = require('get-css-classes')

module.exports = postcss.plugin('immutable-css', function () {
  var classMap = {}
  return function immutableCss (root, opts, cb) {
    if (typeof opts === 'function') {
      cb = opts
      opts = {}
    }

    opts = opts || {}
    cb = cb || function () {}

    root.eachRule(function (rule) {
      rule.selectors.forEach(function (selector) {
        getCssClasses(selector).forEach(function (klass) {
          classMap[klass] = classMap[klass] || []
 
          if (!containsMutationFromSource(rule.source.input.from, classMap[klass])) {
            classMap[klass].push({
              selector: klass,
              line: rule.source.start.line,
              column: rule.source.start.column,
              rule: rule
            })
          }
        })
      })
    })

    Object.keys(classMap).forEach(function (mutationClass) {
      if (classMap[mutationClass].length === 1) {
        delete classMap[mutationClass]
      }
    })

    console.log(classMap)
  }
})

function containsMutationFromSource(source, mutations) {
  return mutations.some(function (mutation) {
    return mutation.rule.source.input.from === source
  }) 
}
