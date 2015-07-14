var extractClasses = require('./extract-classes-from-selector');

module.exports = function getCssClasses(cssObject) {
  var cssClasses = {};

  cssObject.eachRule(function(rule) {
    rule.selectors.forEach(function(selector) {
      if (!selector) {
        return false
      }
      extractClasses(selector).forEach(function(cssClass) {
        cssClasses[cssClass] = true;
      });
    });
  });

  return cssClasses;
};
