
var basscss = require('postcss-basscss')
var cssnext = require('cssnext')
var csswring = require('csswring')
var autoprefixer = require('autoprefixer-core')

module.exports = {

  entry: './demo/entry.js',

  output: {
    filename: 'bundle.js',
    publicPath: 'demo',
    path: __dirname + '/demo'
  },

  module: {
    loaders: [
      { test: /(\.js$|\.jsx$)/, exclude: /node_modules/, loader: 'babel-loader' },
      { test:   /\.css$/, exclude: /demo/, loader: 'css-loader!postcss-loader' },
    ]
  },

  postcss: function() {
    return {
      defaults: [cssnext],
      app: [basscss, autoprefixer, csswring]
    }
  }

}

