
var atImport = require('postcss-import')
var customMedia = require('postcss-custom-media')
var customProperties = require('postcss-custom-properties')
var calc = require('postcss-calc')
var colorFunction = require('postcss-color-function')

module.exports = {

  entry: './demo/entry.js',

  output: {
    filename: 'bundle.js',
    publicPath: 'demo',
    path: __dirname
  },

  module: {
    loaders: [
      { test: /(\.js$|\.jsx$)/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test:   /\.css$/, loader: 'css-loader?-minimize!postcss-loader' },
    ]
  },

  postcss: function() {
    return [
      atImport(),
      customMedia(),
      customProperties(),
      calc(),
      colorFunction()
    ]
  },

  node: {
    fs: 'empty'
  }

}

