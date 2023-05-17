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
    port: 9001,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remote: 'remote@http://localhost:9002/remoteEntry.js',
      },
    }),
  ],
};

module.exports = config;
