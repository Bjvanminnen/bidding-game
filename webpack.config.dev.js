var webpack = require('webpack');
var assign = require('object-assign');

var base = require('./webpack.config.base');
var host = 'localhost';
var port = 3001;

module.exports = assign({}, base, {
  entry: ['webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr']
    .concat(base.entry),
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  output: assign({}, base.output, {
    publicPath: 'http://' + host + ':' + port + '/static/'
  }),
  module: {
    loaders: [
      assign({}, base.module.loaders[0], {
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
      })
    ]
  }
});
