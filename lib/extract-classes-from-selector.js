var specificity = require('specificity');
var hasClassSelector = require('has-class-selector');

module.exports = function extractClassesFromSelector(selector) {
  if (!selector) {
    return false
  }
  return specificity.calculate(selector)[0].parts.filter(function(selectorPart) {
    return selectorPart.type === 'b';
  }).filter(function(cssClass) {
    // Sometimes it isn't actually a CSS class
    return hasClassSelector(cssClass.selector);
  }).map(function(cssClass) {
    return cssClass.selector;
  });
}
