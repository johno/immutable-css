'use strict'

// This is used for a stylesheetA and stylesheetB comparison. This is
// the method used for some CLI cases and the immutablecss.com webapp.

var postcss = require('postcss')
var getCssClasses = require('get-css-classes')
var getCssClassesFromAst = require('./get-css-classes-from-ast')

var ignoredSelectors, immutableSelectors, immutableClasses

module.exports = function getMutations (immutableCss, customCss, options) {
  options = options || {}
  ignoredSelectors = options.ignoredSelectors || []
  immutableSelectors = options.immutableSelectors || []

  var immutableAst = postcss.parse(immutableCss)
  var customAst = postcss.parse(customCss)
  
  immutableClasses = getCssClassesFromAst(immutableAst)

  var immutableErrors = []
  customAst.walkRules(function (rule) {
    rule.selectors.forEach(function (selector) {
      getCssClasses(selector).forEach(function (classSelector) {
        if (hasMutation(classSelector)) {
          immutableErrors.push({
            selector: classSelector,
            line: rule.source.start.line,
            column: rule.source.start.column,
            rule: rule
          })
        }
      })
    })
  })

  return immutableErrors
}

function hasMutation (classSelector) {
  return (immutableClasses[classSelector] || immutableSelectors.indexOf(classSelector) != -1) &&
         ignoredSelectors.indexOf(classSelector) == -1
}
