'use strict';

var postcss = require('postcss');
var getCssClasses = require('./lib/get-css-classes');

module.exports = function immutableCss(baseCss, additionalCss) {
  var baseAst = postcss.parse(baseCss, { safe: true });
  var additionalAst = postcss.parse(additionalCss, { safe: true });

  var immutableClasses = getCssClasses(baseAst);
  var additionalClasses = getCssClasses(additionalAst);

  Object.keys(immutableClasses).forEach(function(classSelector) {
    if (additionalClasses[classSelector]) {
      handleSelectorReopen(additionalAst, classSelector);
    }
  });
  return true;
}

function handleSelectorReopen(ast, selector) {
  ast.eachRule(function(rule) {
    if (rule.selectors.indexOf(selector) != -1) {
      console.log(rule);
      console.log('Immutable.css Error:' +
        rule.source.start.line +
        ' [' + selector +'] was reopened'
      );
    }
  });
}
