var path = require('path');
var webpack = require('webpack');

var PROD = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: PROD ? 'source-map' : "inline-source-map",
  entry: (PROD ? [] : ['webpack-hot-middleware/client']).concat(
    ['./src/index']
  ),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: PROD ? [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ] : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
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
          stage: 0,
          plugins: PROD ? undefined : ["react-transform"],
          extra: PROD ? undefined : {
            "react-transform": {
              transforms: [{
                transform: "react-transform-hmr",
                imports: ["react"],
                locals: ["module"]
              }, {
                transform: "react-transform-catch-errors",
                imports: ["react", "redbox-react"]
              }]
            }
          }
        }
      }
    ]
  }
};
