var path = require('path');
var webpack = require('webpack');

var PROD = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: "inline-source-map",
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"],
    root: path.resolve(__dirname, "node_modules")
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        query: {
          stage: 0
        }
      }
    ]
  }
};