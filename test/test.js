var assert = require('assert');
var immutableCss = require('..');

describe('immutable-css', function() {

  it('should return an array of errors if immutability has been broken', function(done) {
    immutableCss('test/fixtures/vendor/vendor.css', 'test/fixtures/app/app.css', { verbose: true }, function(mutations) {
      assert.equal(mutations.length, 5);
      done();
    });
  });

  it('should support globbing', function(done) {
    immutableCss('test/fixtures/vendor/**/*.css', 'test/fixtures/app/**/*.css', function(mutations) {
      assert.equal(mutations.length, 9);
      done();
    });
  });
});
