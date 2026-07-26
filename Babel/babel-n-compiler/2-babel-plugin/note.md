编写 babel 插件的流程

1. 在插件定义中导出一个函数
```js
modules.exports = function ({ types: t }) {
  return {
    name: 'babel-plugin-transform-jsx-link',
    // 核心: 实现访问器函数
    visitor: {
      JSXElement(path) {
        console.log('JSXElement:', path.node)
      }
    }
  }
}
```

2. 在 `.babelrc` 中配置插件
```json
{
  "plugins": [
    "./plugin/babel-plugin-transform-jsx-link.js"
  ]
}
```

3. run babel
```bash
babel index.js -o index-transform.js
```