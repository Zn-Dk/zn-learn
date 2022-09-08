const path = require('path');
//插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
//webpack 查看打包模块依赖关系以及size 插件
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  // 指定主项目入口文件 默认entry 为 index.js 或者 main.js
  //多个文件入口
  entry: {
    main: './app/main.js',
  },
  module: {
    //loader(打包其他非js的文件前,经过一次loader转换)
    //包含两个必须属性：test 和 use
    //rules 是一个对象数组,可以插入多条规则
    rules: [
      //设置 hbs
      {
        test: /\.(handlebars|hbs)$/,
        use: "handlebars-loader"
      },
      //设置 css
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      //设置 stylus
      {
        test: /\.styl$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
          {
            loader: "stylus-loader",
          },
        ]
      },
      //文件资源解析器(例如图片)
      {
        test: /\.(jpg|png|gif|svg|webp)$/i,
        use: "file-loader",
      },

    ]
  },
  //插件
  plugins: [
    //每次生成dist自动清除旧文件
    new CleanWebpackPlugin(),
    //组件分析器
    //new BundleAnalyzerPlugin(),
    //自动生成html
    new htmlPlugin({
      //指定页面标题
      //如果已经指定了静态模板,模板html的<head>title要设置成
      //<title><%= htmlWebpackPlugin.options.title %></title>
      //否则 这个属性不生效
      //title: 'My Blog',
      //指定生成页面名称
      filename: 'index.html',
      //指定生成页面的静态页面模板
      template: './index.html'
    })
  ],
  //解析
  resolve: {
    //引用路径别名
    alias: {
      Template: path.join(__dirname, '../src/views')
    }
  }
}
