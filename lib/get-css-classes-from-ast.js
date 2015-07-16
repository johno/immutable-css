var getCssClasses = require('get-css-classes')

module.exports = function getCssClassesFromAst(cssObject) {
  var cssClasses = {}

  cssObject.eachRule(function(rule) {
    rule.selectors.forEach(function(selector) {
      getCssClasses(selector).forEach(function(cssClass) {
        cssClasses[cssClass] = true
      })
    })
  })

  return cssClasses
}
