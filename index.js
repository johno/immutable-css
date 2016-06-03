'use strict'

var fs = require('fs')
var glob = require('glob')
var isCss = require('is-css')
var postcss = require('postcss')
var fileExists = require('file-exists')
var getCssClasses = require('get-css-classes')
var extendOptions = require('extend-options')

var hasMutation = require('./lib/has-mutation')
var getWarningString = require('./lib/get-warning-string')
var containsMutationFromSource = require('./lib/contains-mutation-from-source')

var immutableCss =  postcss.plugin('immutable-css', function (opts, cb) {
  return function immutableCss (root, result) {
    var mutationsMap = {}
    
    if (typeof opts === 'function') {
      cb = opts
      opts = {}
    }

    cb = cb || function () {}
    opts = extendOptions({
      immutableClasses: [],
      immutablePrefixes: [],
      ignoredClasses: [],
      strict: false
    }, opts || {})

    root.walkRules(function (rule) {
      rule.selectors.forEach(function (selector) {
        getCssClasses(selector).forEach(function (klass) {
          mutationsMap[klass] = mutationsMap[klass] || []

          var klassSource = rule.source.input.from
          var klassLine = rule.source.start.line
          var klassColumn = rule.source.start.column

          if (containsMutationFromSource(klassSource, mutationsMap[klass]) && !opts.strict) {
            return
          }

          mutationsMap[klass].push({
            selector: klass,
            line: klassLine,
            column: klassColumn,
            rule: rule
          })
        })
      })
    })

    Object.keys(mutationsMap).forEach(function (mutationClass) {
      if (hasMutation(mutationClass, mutationsMap, opts)) {
        result.warn(getWarningString(mutationsMap[mutationClass]))
      } else {
        delete mutationsMap[mutationClass]
      }
    })

    cb(mutationsMap)
  }
})

module.exports = immutableCss

module.exports.processFiles = function processFiles (immutableCssFile, customCssFile, options) {
  if (isValidFile(immutableCssFile) && isValidFile(customCssFile)) {
    var immutableCssSrc = fs.readFileSync(immutableCssFile, 'utf8')
    var customCssSrc = fs.readFileSync(customCssFile, 'utf8')

    // Concatenate the files with source maps.
    var immutableRoot = postcss.parse(immutableCssSrc, { from: immutableCssFile })
    var customRoot = postcss.parse(customCssSrc, { from: customCssFile })
    immutableRoot.append(customRoot)

    return immutableCss.process(immutableRoot, options).messages
  } else {
    console.error('immutable-css expected two CSS files')
  }
}

module.exports.processGlob = function processGlob (cssGlob, options) {
  var files = glob.sync(cssGlob)
  var root = null

  files.forEach(function (file) {
    if (isValidFile(file)) {
      var css = fs.readFileSync(file, 'utf8')
      var newRoot = postcss.parse(css, { from: file })

      if (root) {
        root.append(newRoot)
      } else {
        root = newRoot
      }
    } else {
      console.error(file + ' is an invalid file')
    }
  })

  return immutableCss.process(root, options).messages
}

function isValidFile (file) {
  return isCss(file) && fileExists(file)
}
