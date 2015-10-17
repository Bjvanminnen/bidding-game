var path = require('path');
var webpack = require('webpack');
var SuccessPlugin = require('webpack-success-plugin');

var BUILD_DIR = 'build/';

var config = module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/main.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: new RegExp(__dirname + '\/[src|test].*\.jsx*$'),
        loaders: [
          'babel'
        ]
      }
   ],
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"],
    root: path.resolve(__dirname, "node_modules")
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: "eval",
}
