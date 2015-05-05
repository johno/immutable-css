var fs = require('fs');
var assert = require('assert');
var getCssClasses = require('../lib/get-css-classes');
var postcss = require('postcss');

function fixture(name) {
    return fs.readFileSync('test/fixtures/' + name, 'utf8').trim();
}

describe('get-css-classes', function() {

  it('should return a hash of the selectors', function() {
    var css = postcss.parse(fixture('vendor/vendor.css'), { safe: true });
    assert.deepEqual(getCssClasses(css), { '.foo': true, '.awesome': true, '.opossum': true });
  });
});
