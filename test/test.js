var fs = require('fs')
var assert = require('assert')
var postcss = require('postcss')
var postcssImport = require('postcss-import')
var postcssReporter = require('postcss-reporter')
var immutableCss = require('..')

function fixture (name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8')
}

function test (input, mutations) {
  assert.deepEqual(
    postcss([ postcssImport(), immutableCss(), postcssReporter() ])
      .process(fixture(input), { from: input })
      .messages,
    mutations
  )
}

describe('immutable-css', function () {

  it('should report the correct mutations', function () {
    test('basscss-mutations.css', [{
      plugin: 'immutable-css',
      text: '.button was mutated 2 times\n[line 93, col 1]: ' + __dirname + '/fixtures/basscss.css\n[line 11, col 1]: /Users/johnotander/code/lab/immutable-css/basscss-mutations.css\n',
      type: 'warning'
    }, {
      plugin: 'immutable-css',
      text: '.left was mutated 2 times\n[line 291, col 1]: ' + __dirname + '/fixtures/basscss.css\n[line 15, col 1]: /Users/johnotander/code/lab/immutable-css/basscss-mutations.css\n',
      type: 'warning'
    }])
  })
})
