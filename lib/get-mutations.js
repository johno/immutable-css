'use strict';

var postcss = require('postcss');
var getCssClasses = require('./get-css-classes');
var CssSelectorParser = require('css-selector-parser').CssSelectorParser;

module.exports = function getMutations(immutableCss, customCss) {
  var selectorParser = new CssSelectorParser();

  var immutableAst = postcss.parse(immutableCss, { safe: true });
  var customAst = postcss.parse(customCss, { safe: true });
  var immutableClasses = getCssClasses(immutableAst);

  var immutableErrors = [];
  customAst.eachRule(function(rule) {
    rule.selectors.forEach(function(selector) {
      console.log(selectorParser.parse(selector));
      if (immutableClasses[selector]) {
        immutableErrors.push({
          selector: selector,
          line: rule.source.start.line,
          column: rule.source.start.column
        });
      }
    });
  });

  return immutableErrors;
}
