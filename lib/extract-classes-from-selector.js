var specificity = require('specificity');

module.exports = function extractClassesFromSelector(selector) {
  console.log(specificity.calculate(selector));
  return specificity.calculate(selector)[0].parts.filter(function(selectorPart) {
    return selectorPart.type === 'b';
  }).map(function(cssClass) {
    return cssClass.selector;
  });
}
