'use strict';

var postcss = require('postcss');
var getCssClasses = require('./lib/get-css-classes');

module.exports = function immutableCss(baseCss, additionalCss) {
  var noMutationViolations = true;

  var baseAst = postcss.parse(baseCss, { safe: true });
  var additionalAst = postcss.parse(additionalCss, { safe: true });
  var immutableClasses = getCssClasses(baseAst);

  var immutableErrors = {};
  additionalAst.eachRule(function(rule) {
    rule.selectors.forEach(function(selector) {
      if (immutableClasses[selector]) {
        noMutationViolations = false;

        console.log('app.css: ' +
          'line ' + rule.source.start.line + ',' +
          'col ' + rule.source.start.column +
          ' - ' + selector + ' was mutated'
        );
      }
    });
  });

  return noMutationViolations;
}
