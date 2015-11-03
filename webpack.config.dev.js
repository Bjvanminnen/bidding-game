var webpack = require('webpack');
var assign = require('object-assign');

var base = require('./webpack.config.base');

module.exports = assign({}, base, {
  entry: ['webpack-hot-middleware/client'].concat(base.entry),
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      assign({}, base.loaders[0], {
        query: {
          stage: 0,
          plugins: ["react-transform"],
          extra: {
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
      )
    ]
  }
});
