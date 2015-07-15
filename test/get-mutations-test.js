var fs = require('fs')
var assert = require('assert')
var getMutations = require('../lib/get-mutations')

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8').trim()
}

describe('get-mutations', function() {

  it('should return an array of mutations', function() {
    assert.equal(getMutations(fixture('vendor.css'), fixture('app.css')).length, 5)
  })

  it('should find basscss mutations when they exist', function() {
    assert.equal(getMutations(fixture('basscss.css'), fixture('basscss-mutations.css')).length, 2)
  })

  it('should find bootstrap mutations when they exist', function() {
    assert.equal(getMutations(fixture('bootstrap.css'), fixture('bootstrap-mutations.css')).length, 1)
  })

  it('should include immutable selectors that are passes as options', function() {
    assert.equal(
      getMutations(
        fixture('vendor.css'),
        fixture('app.css'),
        { immutableSelectors: ['.sibling'] }
      ).length, 6)
  })

  it('should ignore the specified classes', function() {
    assert.equal(
      getMutations(
        fixture('basscss.css'),
        fixture('basscss-mutations.css'),
        { ignoredSelectors: ['.button'] }
      ).length, 1)
  })
})
