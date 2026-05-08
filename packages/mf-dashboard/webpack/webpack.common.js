const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { ModuleFederationPlugin } = require('webpack').container;

  module.exports = {
    entry: './src/bootstrap.tsx',
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: 'auto',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@blockhouse/shared-lib': path.resolve(__dirname, '../../shared-lib/src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'mf_dashboard',
        filename: 'remoteEntry.js',
        exposes: {
          './Dashboard': './src/DashboardRemote',
        },
        shared: {
          react: { singleton: true, requiredVersion: '^18.0.0', eager: false },
          'react-dom': { singleton: true, requiredVersion: '^18.0.0', eager: false },
          '@mui/material': { singleton: true, eager: false },
          '@mui/icons-material': { singleton: true, eager: false },
          '@emotion/react': { singleton: true, eager: false },
          '@emotion/styled': { singleton: true, eager: false },
          zustand: { singleton: true, eager: false },
          axios: { singleton: true, eager: false },
          recharts: { singleton: true, eager: false },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
  };