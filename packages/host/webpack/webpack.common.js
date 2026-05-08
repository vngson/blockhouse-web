const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { env } = require('../../../webpack.env');

// Cache-busting version for remote URLs (changes per build)
const buildVersion = Date.now();

function remoteUrl(name, url) {
  return `${name}@${url}/remoteEntry.js?v=${buildVersion}`;
}

module.exports = {
  entry: './src/main.tsx',
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
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        mf_dashboard: remoteUrl('mf_dashboard', env.MF_DASHBOARD_URL),
        mf_employees: remoteUrl('mf_employees', env.MF_EMPLOYEES_URL),
        mf_revenue: remoteUrl('mf_revenue', env.MF_REVENUE_URL),
        mf_services: remoteUrl('mf_services', env.MF_SERVICES_URL),
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
