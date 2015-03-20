'use strict';

var postcss = require('postcss');
var getCssClasses = require('./get-css-classes');
var extractClassesFromSelector = require('./extract-classes-from-selector');

module.exports = function getMutations(immutableCss, customCss, options) {
  options = options || {};
  var ignoredSelectors = options.ignoredSelectors || [];
  var immutableAst = postcss.parse(immutableCss, { safe: true });
  var customAst = postcss.parse(customCss, { safe: true });
  var immutableClasses = getCssClasses(immutableAst);

  var immutableErrors = [];
  customAst.eachRule(function(rule) {
    rule.selectors.forEach(function(selector) {
      extractClassesFromSelector(selector).forEach(function(classSelector) {
        if (immutableClasses[classSelector] && ignoredSelectors.indexOf(classSelector) == -1) {
          immutableErrors.push({
            selector: classSelector,
            line: rule.source.start.line,
            column: rule.source.start.column
          });
        }
      });
    });
  });

  return immutableErrors;
}
