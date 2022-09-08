module.exports = {
  plugins: {
    //应用autoprefixer (vue cli项目自带)
    'autoprefixer': {
      overrideBrowserslist: ["last 15 versions"]
    },
    // 'postcss-pxtorem': {
    //   //表示根元素html的fontSize值,设计稿宽度的1/10)   如 元素 150px=>2rem
    //   rootValue: 75,
    //   //一般配合 amfe-flexible来根据屏幕(自动识别缩放倍数)动态改变根元素font-size

    //   //设置 需要做转化处理的属性，如`height`、`width`、`margin`等，`*`表示全部
    //   propList: ['*'],
    //   //忽略的选择器   .ig-  表示 .ig- 开头的都不会转换
    //   selectorBlackList: []
    //   //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 浏览器会自动解析 。
    // },
  }
}