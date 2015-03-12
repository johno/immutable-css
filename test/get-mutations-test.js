var fs = require('fs');
var assert = require('assert');
var getMutations = require('../lib/get-mutations');

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8').trim();
}

describe('get-mutations', function() {

  it('should return an array of mutations', function() {
    assert.equal(getMutations(fixture('vendor.css'), fixture('app.css')).length, 1);
  });
});
