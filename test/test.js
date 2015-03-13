var assert = require('assert');
var immutableCss = require('..');

describe('immutable.css', function() {

  it('should return false if immutability has been broken', function() {
    assert.equal(immutableCss('test/fixtures/vendor.css', 'test/fixtures/app.css', { verbose: true }).length, 1);
  });
});
