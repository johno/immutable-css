'use strict';

var postcss = require('postcss');
var getCssClasses = require('./get-css-classes');
var extractClassesFromSelector = require('./extract-classes-from-selector');

var ignoredSelectors, immutableSelectors, immutableClasses;

module.exports = function getMutations(immutableCss, customCss, options) {
  options = options || {};
  ignoredSelectors = options.ignoredSelectors || [];
  immutableSelectors = options.immutableSelectors || [];

  var immutableAst = postcss.parse(immutableCss, { safe: true });
  var customAst = postcss.parse(customCss, { safe: true });
  
  immutableClasses = getCssClasses(immutableAst);

  var immutableErrors = [];
  customAst.eachRule(function(rule) {
    rule.selectors.forEach(function(selector) {
      extractClassesFromSelector(selector).forEach(function(classSelector) {
        if (hasMutation(classSelector)) {
          immutableErrors.push({
            selector: classSelector,
            file: options.file,
            line: rule.source.start.line,
            column: rule.source.start.column,
            rule: rule
          });
        }
      });
    });
  });

  return immutableErrors;
}

function hasMutation(classSelector) {
  return (immutableClasses[classSelector] || immutableSelectors.indexOf(classSelector) != -1) &&
         ignoredSelectors.indexOf(classSelector) == -1;
}
