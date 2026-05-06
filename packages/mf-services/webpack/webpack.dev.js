 const { merge } = require('webpack-merge');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    mode: 'development',
    devServer: {
      port: 3004,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      historyApiFallback: true,
    },
    devtool: 'eval-source-map',
  });