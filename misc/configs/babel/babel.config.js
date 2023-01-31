module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //按需加载
  "plugins": [
    //element
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    //lodash
    ["lodash"],
    //vant
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
