var fs = require('fs')
var assert = require('assert')
var postcss = require('postcss')
var postcssImport = require('postcss-import')
var immutableCss = require('..')

function fixture (name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8')
}

function test (input, mutations) {
  assert.deepEqual(postcss([ postcssImport(), immutableCss() ]).process(fixture(input), { from: input }).messages, mutations)
}

describe('immutable-css', function () {

  it('should report the correct mutations', function () {
    test('basscss-mutations.css', [])
  })
})
