'use strict';

var fs = require('fs');
var postcss = require('postcss');
var getMutations = require('./lib/get-mutations');

module.exports = function immutableCss(immutableCssFile, customCssFile, options) {
  options = options || {};
  var noMutationViolations = true;

  var immutableCss = fs.readFileSync(immutableCssFile, 'utf8').trim();
  var customCss = fs.readFileSync(customCssFile, 'utf8').trim();

  var immutableErrors = getMutations(immutableCss, customCss);
  immutableErrors.forEach(function(error) {
 
   if (options.verbose) { 
      console.log(customCssFile + ': ' +
        'line ' + error.line + ',' +
        'col ' + error.column +
        ' - ' + error.selector + ' was mutated'
      );
   }
  });

  return immutableErrors;
}
