 const { merge } = require('webpack-merge');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    mode: 'development',
    devServer: {
      port: 3002,
      hot: true,
      // CORS: Allow the host app (localhost:3000) to load remoteEntry.js.
      // This config only applies to `webpack serve` (development).
      // Production CORS is handled by the deployment server (nginx, CDN, etc.).
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      },
      historyApiFallback: true,
    },
    devtool: 'eval-source-map',
  });