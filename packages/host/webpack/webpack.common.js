const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { ModuleFederationPlugin } = require('webpack').container;

  module.exports = {
    entry: './src/main.tsx',
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: 'auto',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
        name: 'host',
        remotes: {
          mf_dashboard: 'mf_dashboard@http://localhost:3001/remoteEntry.js',
          mf_employees: 'mf_employees@http://localhost:3002/remoteEntry.js',
          mf_revenue: 'mf_revenue@http://localhost:3003/remoteEntry.js',
          mf_services: 'mf_services@http://localhost:3004/remoteEntry.js',
        },
        shared: {
          react: { singleton: true, requiredVersion: '^18.0.0' },
          'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
          'react-router-dom': { singleton: true },
          '@mui/material': { singleton: true },
          '@mui/icons-material': { singleton: true },
          '@emotion/react': { singleton: true },
          '@emotion/styled': { singleton: true },
          zustand: { singleton: true },
          axios: { singleton: true },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
  };