var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: ['./example/example.js'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: []

};