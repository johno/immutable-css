var assert = require('assert');
var immutableCss = require('..');

describe('immutable-css', function() {

  it('should return false if immutability has been broken', function() {
    assert.equal(immutableCss('test/fixtures/vendor.css', 'test/fixtures/app.css', { verbose: true }).length, 5);
    assert.equal(immutableCss('test/fixtures/bootstrap.css', 'test/fixtures/basscss.css', { verbose: true }).length, 13);
  });
});
