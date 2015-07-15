
var path = require('path')
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
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.jsx$/, loader: 'babel-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test:   /\.css$/, loader: 'css-loader?-minimize!postcss-loader' },

      // Load fonts from Bootstrap
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader' }

    ],
  },

  postcss: function() {
    return [
      atImport({
        path: [
          'node_modules',
          path.join(__dirname, '../bower_components'),
        ],
        onImport: function (files) {
          files.forEach(this.addDependency);
        }.bind(this)
      }),
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

