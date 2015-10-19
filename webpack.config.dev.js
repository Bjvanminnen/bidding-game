var path = require('path');
var webpack = require('webpack');

module.exports = {
  // devtool: 'eval',
  devtool: "#inline-source-map",
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"],
    root: path.resolve(__dirname, "node_modules")
  },
 module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
