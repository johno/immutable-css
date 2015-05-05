'use strict';

var fs = require('fs');
var postcss = require('postcss');
var glob = require('glob');
var getMutations = require('./lib/get-mutations');
var logMutations = require('./lib/log-mutations');

module.exports = function immutableCss(immutableCssFileOrGlob, customCssFileOrGlob, options, callback) {
  options = options || {};
  callback = callback || function() {};
  var noMutationViolations = true;
  var immutableErrors = [];
  var immutableCssFiles, customCssFiles;

  glob(immutableCssFileOrGlob, function(err, immutableCssFiles) {
    glob(customCssFileOrGlob, function(err, customCssFiles) {
      immutableCssFiles.forEach(function(immutableCssFile) {
        customCssFiles.forEach(function(customCssFile) {
          var immutableCss = fs.readFileSync(immutableCssFile, 'utf8').trim();
          var customCss = fs.readFileSync(customCssFile, 'utf8').trim();
          options.file = customCssFile;

          immutableErrors = immutableErrors.concat(getMutations(immutableCss, customCss, options));
        });
      });
 
      if (options.verbose) {
        logMutations(immutableErrors);
      }

      return callback(immutableErrors);
    });
  });
}
