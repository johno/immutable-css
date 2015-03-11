var hasClassSelector = require('has-class-selector');

module.exports = function getCssClasses(cssObject) {
  cssClasses = {};

  cssObject.eachRule(function(rule) {
    rule.selectors.forEach(function(selector) {
      selector.split(/\s/).forEach(function(subSelector) {
        if (hasClassSelector(subSelector)) {
          cssClasses[subSelector] = true;
        }
      });
    });
  });

  return cssClasses;
};
