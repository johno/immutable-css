var fs = require('fs');
var assert = require('assert');
var immutableCss = require('..');

function fixture(name) {
    return fs.readFileSync('test/fixtures/' + name, 'utf8').trim();
}

describe('immutable.css', function() {

  it('should return false if immutability has been broken', function() {
    assert.equal(immutableCss(fixture('vendor.css'), fixture('app.css')), false);
  });
});
