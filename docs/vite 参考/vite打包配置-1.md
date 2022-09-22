## **技术栈**

- vite
- rollup

## **打包方式**

vue-cli 自带的是 webpack 的打包方式，打出的包体积有点大，而 vite 自带的是 rollup 的打包方式，这种方式打包的体积就非常小，官网也有一些使用说明，所以学会之后还是比较很方便的。

vite 的库项目可以分为两类：（我自己分的）

- 一个是纯js的项目，不带HTML；
- 一个是可以带上HTML（模板）的项目，比如UI库。

下面分别介绍一下编写和打包方式，其实大同小异。

## **纯js的库项目**

使用 vite 建立项目，这里举一个简单的例子：

// main.js

```js
const toTypeString = (val) => { 
    return Object.prototype.toString.call(val)
  }
  
  const typeName = (val) => {
    return Object.prototype.toString.call(val).replace(/^\[object (\S+)\]$/,'$1').toLowerCase()
  }

  const hasOwnProperty = Object.prototype.hasOwnProperty
  const hasOwn = (val, key) => hasOwnProperty.call(val, key)

  const isFunction = (val) => toTypeString(val) === '[object Function]'
  const isAsync = (val) => toTypeString(val) === '[object AsyncFunction]'
  const isObject = (val) => val !== null && typeof val === 'object'
  const isArray = Array.isArray
  const isString = (val) => typeof val === 'string'
  const isNumber = (val) => typeof val === 'number'
  const isBigInt = (val) => typeof val === 'bigint'
  const isBoolean = (val) => typeof val === 'boolean'
  const isRegExp = (val) => toTypeString(val) === '[object RegExp]'
  const isDate = (val) => val instanceof Date
  const isMap = (val) => toTypeString(val) === '[object Map]'
  const isSet = (val) => toTypeString(val) === '[object Set]'
  const isPromise = (val) => toTypeString(val) === '[object Promise]'
  const isSymbol = (val) => typeof val === 'symbol'
  const isNullOrUndefined = (val) => {
    if (val === null) return true
    if (typeof val === 'undefined') return true
    return false
  }

  function log(){
    if (window.__showlog) console.log(...arguments)
  }
  const logTime = (msg, auto = true) => {
    const start = () => {
      if (window.__showlog) console.time(msg)
    }
    const end = () => {
      if (window.__showlog) console.timeEnd(msg)
    }
    if (auto) start() // 自动开始计时
    return { start, end }
  }

export {
  log, // 打印调试信息
  logTime, // 计时
  toTypeString, // Object.prototype.toString.call(val)
  typeName, // 获取可以识别的名称

  hasOwnProperty,
  hasOwn,

  isFunction, // 验证普通函数
  isAsync, // 验证 async 的函数
  isPromise, // 验证 Promise
  isObject, // 验证 Object
  isArray, // 验证数组
  isString, // 验证字符串
  isNumber, // 验证 number
  isBigInt, // 验证 BigInt
  isBoolean, // 验证 布尔
  isRegExp, // 验证正则类型
  isDate, // 验证日期
  isMap, // 验证 map
  isSet, // 验证 set
  isSymbol, // 验证 Symbol
 
  isNullOrUndefined // null 或者 undefined 返回 true
}
```

代码比较简单，仅仅只是演示。

想要打包的话，只能有一个出口文件，所以内部的代码结构要设置好。

## **带HTML的库项目**

纯js的好办了，export 输出就好，那么带模板的怎么办呢？其实也是一样的。

用 vite 建立一个项目，建立一个测试文件：

// t-text.vue

- 模板部分：

```html
<!--单行文本-->
<template>
  <el-input
    v-model="value"
    :id="'c' + columnId"
    :name="'c' + columnId"
    :size="size"
    :clearable="clearable"
    :validate-event="validate_event"
    :show-word-limit="show_word_limit"
    @blur="run"
    @change="run"
    @clear="run"
    @input="myinput"
    @keydown="clear"
  >
  </el-input>
```

- 代码部分

```js
import { defineComponent } from 'vue'
  // 按需索取的方式引入UI库（非必须）
  import { ElInput } from 'element-plus'
  // 引入组件需要的属性、表单子控件的管理类
  import { itemProps, itemController } from 'nf-ui-controller'

  export default defineComponent({
    name: 'el-form-item-text',
    props: {
      'el-input': ElInput,
      modelValue: [String, Number],
      ...itemProps // 基础属性
    },
    emits: ['update:modelValue'],
    setup (props, context) {
      const {
        value,
        run,
        clear,
        myinput
      } = itemController(props, context.emit)

      return {
        value,
        run,
        clear,
        myinput
      }
    }
  })
```

这是基于UI库做的二次封装的库，使用了两个第三方插件：

- 一个是 element-plus，采用按需加载的方式；
- 一个是自己做的 nf-ui-controller 库。

然后我们设置一个入口文件 main.js

```js
import nfText from './t-text.vue'

export {
  nfText
}
```

如果有很多组件的话，就要考虑好结构，这里只是举个例子。

## **设置vite.config.js**

代码写好之后，需要设置一下 vite.config.js

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path' // 主要用于alias文件路径别名
 
export default defineConfig({
  plugins: [vue()],
  // 打包配置
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'), // 设置入口文件
      name: 'nf-tool', // 起个名字，安装、引入用
      fileName: (format) => `nf-tool.${format}.js` // 打包后的文件名
    },
    sourcemap: true, // 输出.map文件
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
```

- entry：指定要打包的入口文件。
- name：包的名称
- fileName：包文件的名称，默认是umd和es两个文件。
- sourcemap：是否生成 .map 文件，默认是不会生成的，如果需要的话需要设置为 true。
- rollupOptions：如果项目引用了第三方插件，那么需要在这里设置排除，如果不设置的话，第三方插件的源码也会被打包进来，这样打包文件就变大了。排除之后第三方的插件会单独存在。

vite 会按照这里的设置进行打包，打包分为两种模式：

- umd：打包后代码很紧凑、体积小，但是不易读；
- es：打包后的代码和我们写的代码很像，易读，但是体积大。

## **第三方插件的处理方式**

如果项目使用了第三方的插件，那么需要在 external 里面做设置：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path' // 主要用于alias文件路径别名

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 打包配置
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'nf-ui-element-plus',
      fileName: (format) => `nf-ui-element-plus.${format}.js`
    },
    sourcemap: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue','nf-ui-controller','element-plus'], // 注意看这里
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'nf-ui-controller': 'nfUIController',
          'element-plus': 'elementPlus'
        }
      }
    }
  }
})
```

设置之后，第三方插件的代码，会以 import 的方式被引用。
如果不做设置的话，就会把第三方插件里面使用到的代码，拿出来作为项目内部代码一起被打包，这样包的体积就变大了。

## **设置package.json**

设置 package.json 主要是发布的时候做资源包的说明，需要按照 npm 的要求设置属性：

```json
{
  "name": "nf-tool",
  "version": "0.0.4",
  "description": "JavaScript 的小工具，验证 JavaScript 的数据类型，输出调试信息等。",
  "keyword": "JavaScript typeof log",
  "files": ["dist"],
  "main": "./dist/nf-tool.umd.js",
  "module": "./dist/nf-tool.es.js",
  "exports": {
    ".": {
      "import": "./dist/nf-tool.es.js",
      "require": "./dist/nf-tool.umd.js"
    }
  },
  "private": false,
  "license": "MIT",
  "auther": "jin yang (jyk). Email: jyk0013@163.com",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "@element-plus/icons": "^0.0.11",
    "element-plus": "^1.2.0-beta.3",
    "nf-tool": "^0.0.6",
    "vue": "^3.2.16"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^1.9.3",
    "vite": "^2.6.4"
  }
}
```

如果在安装资源包的时候，不想自动安装第三方插件的话，需要去掉 dependencies 和 devDependencies，否则会自动安装里面涉及到的第三方插件。

## **打包**

设置好之后我们可以用 `yarn build` 进行打包。

打包后的文件是这种风格：

- nf-tool-es.js

![img](D:\git\zn-web-learn\docs\vite 参考\assets\v2-51db33494771f79f5b19e9d8f67cf009_720w.jpg)



- nf-tool-umd.js

![img](D:\git\zn-web-learn\docs\vite 参考\assets\v2-ba11592125012204f06011b4972ee745_720w.jpg)



## **发布资源包到 [http://npmjs.com](https://link.zhihu.com/?target=http%3A//npmjs.com)**

简单介绍一下步骤：

- 先到 [http://npmjs.com](https://link.zhihu.com/?target=http%3A//npmjs.com) 网站注册账号；
- 到注册邮箱激活账号；
- 打开终端，使用 `npm login`登录；
- 使用 `npm publish` 发布；

篇幅有限，细节就不介绍了。

## **安装资源包**

我喜欢使用 yarn 安装资源包，因为速度更快一些。

```js
yarn add nf-tool
```

package.json 里面设置的名称就是安装用的名称，所以要起个好的名称，另外不能和现有的名称重复。

## **如果一个项目即是库项目，又需要发布到网站怎么办？**

为啥会有这样的需求？
库项目在编写的时候，需要一个开发环境，一边写代码，一边运行看效果。
写好之后需要按库项目的方式打包。
然后是不是需要一个测试环境，或者演示环境？

如果再建立一个项目写测试和演示，那么就有点麻烦了，如果可以在一个项目搞定就方便多了。
这个时候就需要设置不同的 vite.config.js 。

之前使用注释的方式，改来改去的比较麻烦。现在发现 vite 提供了“模式”的方式，允许我们在 vite.config.js 里面做不同的设置。

## **设置.env文件**

按照官网的说明，我们可以建立多个 .env.* 文件，来存放不同的“模式”：

.env ： 开发环境（默认）

```text
VITE_BASEURL=./
```

.env.project ： 测试、演示环境

```text
VITE_BASEURL=nf-rollup-tool
```

.env.lib ： 库打包

```text
VITE_BASEURL=lib
```

模式设置好之后我们来修改 vite.config.js

## **修改 vite.config.js**

在 vite.config.js 里面，首先定义不同的 defineConfig 备用，然后使用 loadEnv 读取模式值，根据模式返回对应的 defineConfig。

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path' // 主要用于alias文件路径别名
const pathResolve = (dir) => resolve(__dirname, '.', dir)

// 发布库的设置
const lib = defineConfig({
  plugins: [vue()],
  // 打包配置
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'nf-tool',
      fileName: (format) => `nf-tool.${format}.js`
    },
    sourcemap: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})

// 开发模式、生产模式
const project = (url) => {
  return defineConfig({
    plugins: [vue()],
    devtools: true,
    resolve: {
      alias: {
        '/@': resolve(__dirname, '.', 'src'),
        '/nf-tool': pathResolve('lib/main.js') //
      }
    },
    base: url,
    // 打包配置
    build: {
      sourcemap: true,
      outDir: 'distp', // 指定输出路径，要和库的包区分开
      assetsDir: 'static/img/', // 指定生成静态资源的存放路径
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js1/[name]-[hash].js',
          entryFileNames: 'static/js2/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        },
        brotliSize: false, // 不统计
        target: 'esnext', 
        minify: 'esbuild' // 混淆器，terser构建后文件体积更小
      }
    }
  })
}

// 用  loadEnv 读取模式，然后返回对应的 defineConfig 
export default ({ mode }) => {
  const url = loadEnv(mode, process.cwd()).VITE_BASEURL
  if (url === 'lib') {
    // 打包库文件
    return lib
  } else {
    // 开发模式、生产模式
    return project(url)
  }
}
```

> 注意：需要设置不同的输出的文件夹，否则会互相覆盖。

## **修改 package.js**

设置执行的命令，后面加上需要的模式。

```json
"scripts": {
    "dev": "vite",
    "build": "vite build --mode project",
    "lib": "vite build --mode lib",
    "serve": "vite preview"
  }
```

这样就可以把不同的环境完全分开了，如果有其他的需求，还可以增加更多的模式。

## **更改后的打包命令**

```js
yarn dev  // 开发环境
yarn build // 打包发布到网站，演示
yarn lib // 打包库项目，做成资源包
```

这样各司其职，互不干扰，也不用各种写注释了。



## CDN

项目打包发布到[http://npmjs.com](https://link.zhihu.com/?target=http%3A//npmjs.com)之后，就可以用 [https://unpkg.com/](https://link.zhihu.com/?target=https%3A//unpkg.com/nf-rollup-ui-element-plus)xxx 的方式访问，xxx表示资源包的名称，

比如：

[https://unpkg.com/element-plu](https://link.zhihu.com/?target=https%3A//unpkg.com/nf-rollup-ui-element-plus)s

[https://unpkg.com/nf-](https://link.zhihu.com/?target=https%3A//unpkg.com/nf-rollup-ui-element-plus)tool

[https://unpkg.com/nf-](https://link.zhihu.com/?target=https%3A//unpkg.com/nf-rollup-ui-element-plus)ui-controller

[https://unpkg.com/nf-ui-element-plu](https://link.zhihu.com/?target=https%3A//unpkg.com/nf-ui-element-plus)s