const common = require('./webpack.common');
const path = require('path');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: "production", //production 生产模式
  output: {
    //filename: '[name].[hash:7].js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [

  ],
  //排除规则 指定某些模块不打包
  externals: {
    jquery: 'jQuery',
    axios: 'axios',
    wangeditor: 'wangEditor'
  },
  // 提取多入口模块中的第三方库 单独整合打包
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        }
      }
    }
  }
})