const { defineConfig } = require('@vue/cli-service')
const path = require('path');


//lodash按需加载
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
//压缩插件
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.join(__dirname, 'dist'),
  //让资源使用相对路径
  publicPath: '',
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      //占用大小分析插件
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end()
      //不让资源文件在未使用时后台加载
      config.plugins.delete('prefetch')
      //排除的模块(CDN)
      config.externals({
        //"@wangeditor/editor": 'wangEditor',
        "vue": 'Vue',
        "vuescroll/dist/vuescroll-native": 'vuescroll',
        "jsencrypt": 'JSEncrypt'
      })
    }
  },
  configureWebpack: {
    resolve: {
      //引用路径别名
      alias: {
        "@": path.join(__dirname, 'src'),
        "components": path.join(__dirname, 'src/components'),
        "views": path.join(__dirname, 'src/views'),
      }
    },
    //代理服务器
    devServer: {
      proxy: {
        '/public': {
          target: 'http://127.0.0.1:3000', //所需要的代理的API服务器地址
          pathRewrite: {
            //http://localhost:8081/api/pay => http://127.0.0.1:3000/pay
            '^/public': ''
          }
        },
      }
    },
    plugins: [
      new LodashModuleReplacementPlugin,
      new CompressionPlugin({
        algorithm: 'gzip', // 使用gzip压缩
        test: /\.js$|\.html$|\.css$/, // 匹配文件名
        filename: '[path][base].gz', // 压缩后的文件名(保持原文件名，后缀加.gz) 版本请写 '[path].gz[query]'
        minRatio: 1, // 压缩率小于1才会压缩
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
      })
    ],
  },
  pluginOptions: {
    //css注入全局变量 plugin vue-cli-plugin-style-resources-loader
    'style-resources-loader': {
      //选择预处理器 stylus
      preProcessor: 'stylus',
      patterns: [
        //全局变量的位置 (不能写@)
        path.resolve(__dirname, './src/assets/styl/var.styl'),
      ]
    }
  }
})

