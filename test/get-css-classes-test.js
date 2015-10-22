var fs = require('fs')
var assert = require('assert')
var getCssClassesFromAst = require('../lib/get-css-classes-from-ast')
var postcss = require('postcss')

function fixture(name) {
    return fs.readFileSync('test/fixtures/' + name, 'utf8').trim()
}

describe('get-css-classes-from-ast', function() {

  it('should return a hash of the selectors', function() {
    var css = postcss.parse(fixture('vendor.css'))
    assert.deepEqual(getCssClassesFromAst(css), { '.foo': true, '.awesome': true, '.opossum': true })
  })
})
