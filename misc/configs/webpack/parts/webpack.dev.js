const { merge } = require('webpack-merge');
const path = require('path')
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "development", //开发模式(不对代码压缩混淆)
  //将编译后的代码映射回原始源代码。(仅开发模式去使用) 'inline-source-map'/'eval'(更快一点)
  devtool: 'eval',
  devServer: {
    static: path.join(__dirname, '../public'),
    host: 'localhost',
    port: 8080,
    open: true //打开浏览器
  }
})