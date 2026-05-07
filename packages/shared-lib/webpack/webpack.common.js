const path = require('path');
const webpack = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;
const dotenv = require('dotenv');

const envFile = path.resolve(__dirname, '../.env');
dotenv.config({ path: envFile });

module.exports = {
  entry: './src/index.ts',
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
    new webpack.DefinePlugin({
      'process.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL || 'http://localhost:5000'),
    }),
    new ModuleFederationPlugin({
      name: 'shared_lib',
      filename: 'remoteEntry.js',
      exposes: {
        './api': './src/api',
        './components': './src/components',
        './hooks': './src/hooks',
        './utils': './src/utils',
        './theme': './src/theme',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
        '@mui/material': { singleton: true },
        '@mui/icons-material': { singleton: true },
        '@emotion/react': { singleton: true },
        '@emotion/styled': { singleton: true },
      },
    }),
  ],
};
