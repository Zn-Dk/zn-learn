// CREATE
// REACT
// APP
// CONFIGURATION
// OVERRIDE
// CRACO 配置 用于覆盖默认设置 (比如配置 webpack alias)

const CracoAntDesignPlugin = require('craco-antd');
const CracoLessPlugin = require('craco-less');
const { resolve } = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  // 插件设置
  plugins: [
    // antd 自定义主题
    {
      plugin: CracoAntDesignPlugin,
      options: {
        // 自定义antd主题位置(只能指定一个 less 文件, 如果要多个, 参考下面的)
        customizeThemeLessPath: resolve(__dirname, 'src/custom-theme.less'),
        // 自定义 antd 主题变量
        modifyVars: { '@primary-color': '#1DA57A' },
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          // javascriptEnabled: true, // 这行不注释会报错
        },
        modifyLessRule(lessRule, context) {
          const resourcesLoader = {
            // 注入 loader , 必须提供模块的路径
            loader: resolve(__dirname, './node_modules/style-resources-loader/lib/loader.js'),
            options: {
              patterns: [
                resolve(__dirname, 'src/global.less'),
                resolve(__dirname, 'src/mixin.less')
              ],
            },
          };
          lessRule.use.push(resourcesLoader);
          return lessRule;
        },
      },
    },
  ],
};
