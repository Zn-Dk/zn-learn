const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

/**
 * @type { import("webpack").Configuration }
 */
const config = {
  mode: 'none',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    port: 9002,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './addList': './list.js',
      },
    }),
  ],
};

module.exports = config;
