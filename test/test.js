var fs = require('fs')
var path = require('path')
var assert = require('assert')
var postcss = require('postcss')
var postcssImport = require('postcss-import')
var postcssReporter = require('postcss-reporter')
var immutableCss = require('..')

function fixture (name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8')
}

function test (input, mutations, opts, cb) {
  var messages =  postcss([ postcssImport(), immutableCss(opts, cb), postcssReporter() ])
      .process(fixture(input), { from: input })
      .messages

  if (mutations) {
    assert.deepEqual(messages, mutations)
  }
}

describe('immutable-css', function () {

  it('should report the correct mutations', function () {
    test('basscss-mutations.css', mutations)
  })

  it('should return the mutations object in the callback', function (done) {
    test('basscss-mutations.css', undefined, {}, function (classMap) {
      assert.equal(Object.keys(classMap).length, 2)
      done()
    })
  })

  it('should ignore the specified selectors', function (done) {
    test('basscss-mutations.css', undefined, { ignoredClasses: ['.button'] }, function (classMap) {
      assert.equal(Object.keys(classMap).length, 1)
      done()
    })
  })

  it('should ignore the specified prefixes', function (done) {
    test('basscss-mutations.css', undefined, { immutablePrefixes: [/\.right/] }, function (classMap) {
      assert.equal(Object.keys(classMap).length, 5)
      done()
    })
  })
})

describe('immutable-css --strict', function () {
  it('does not allow class mutations in the same file', function (done) {
    test('vendor.css', undefined, { strict: true }, function (classMap) {
      assert.equal(Object.keys(classMap).length, 1)
      done()
    })
  })
})

describe('immutable-css.processFiles', function () {

  it('reports the mutations', function () {
    var foundMutations = immutableCss.processFiles('test/fixtures/basscss.css', 'test/fixtures/basscss-mutations.css')
    assert.equal(foundMutations.length, mutations.length)
  })
})

describe('immutable-css.processGlob', function () {

  it('reports the mutations', function () {
    var foundMutations = immutableCss.processGlob('test/fixtures/**/*.css')
    assert.equal(foundMutations.length, 15)  // Magic mutation number in test/fixtures
  })
})

var mutations = [{
  plugin: 'immutable-css',
  text: '.button was mutated 2 times\n[line 93, col 1]: ' + __dirname + '/fixtures/basscss.css\n[line 11, col 1]: ' + path.resolve(__dirname, '..') + '/basscss-mutations.css\n',
  type: 'warning'
}, {
  plugin: 'immutable-css',
  text: '.left was mutated 2 times\n[line 291, col 1]: ' + __dirname + '/fixtures/basscss.css\n[line 15, col 1]: ' + path.resolve(__dirname, '..') + '/basscss-mutations.css\n',
  type: 'warning'
}]
