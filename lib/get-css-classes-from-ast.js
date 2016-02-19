var getCssClasses = require('get-css-classes')

module.exports = function getCssClassesFromAst (cssObject) {
  cssClasses = {}

  cssObject.walkRules(function (rule) {
    rule.selectors.forEach(function (selector) {
      getCssClasses(selector, { keepPseudos: true }).forEach(function (cssClass) {
        cssClasses[cssClass] = true
      })
    })
  })

  return cssClasses
}
