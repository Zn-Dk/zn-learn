## webpack 内部的模块系统

**webpack_require**(id) 模块加载器,类似 Node.js 的 require
**webpack_require**.r(exports) 标记模块为 ES Module (设置 **esModule )
**webpack_require**.d(exports, definition) 定义导出属性的 getter
**webpack_require\_\_.o(obj, prop) Object.hasOwnProperty 的简写

## 基础流程

### 1. 整体结构

```javascript
(() => { // webpackBootstrap
  "use strict";
  var __webpack_modules__ = ({ /* 模块定义 */ });
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) { /* 模块加载器 */ }

  // 运行时辅助函数
  __webpack_require__.d = ...  // 定义导出属性
  __webpack_require__.o = ...  // hasOwnProperty 简写
  __webpack_require__.r = ...  // 标记 ES Module

  // 启动入口模块
  var __webpack_exports__ = __webpack_require__("./src/index.js");
})()
```

### 2. 模块定义 `__webpack_modules__`

以键值对形式存储所有模块,键为模块路径,值为模块函数:

```javascript
var __webpack_modules__ = {
  './src/index.js': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    // 模块代码...
  },
  './src/utils.js': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    // 模块代码...
  },
};
```

### 3. 模块缓存 `__webpack_module_cache__`

用于缓存已加载的模块,避免重复执行:

```javascript
var __webpack_module_cache__ = {};
```

### 4. 核心加载器 `__webpack_require__(moduleId)`

```javascript
function __webpack_require__(moduleId) {
  // 1. 检查缓存,有则直接返回
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }

  // 2. 创建新模块对象并放入缓存
  var module = (__webpack_module_cache__[moduleId] = {
    exports: {},
  });

  // 3. 检查模块是否存在
  if (!(moduleId in __webpack_modules__)) {
    throw new Error("Cannot find module '" + moduleId + "'");
  }

  // 4. 执行模块函数,传入
  // module, 定义的 exports 对象, require 工具函数,
  // 在内部将 export 的对象进行填充
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  // 5. 返回模块的导出对象
  return module.exports;
}
```

### 5. 运行时辅助函数

#### `__webpack_require__.d(exports, definition)` - 定义导出属性

传入 definition 对象, 然后遍历其自身的属性, 随后用 Object.defineProperty -> getter 指向 definition
将模块的导出内容挂载到 exports 对象上:

```javascript
__webpack_require__.d = (exports, definition) => {
  for (var key in definition) {
    if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
      Object.defineProperty(exports, key, {enumerable: true, get: definition[key]});
    }
  }
};
```

#### `__webpack_require__.o(obj, prop)` - hasOwnProperty 简写

```javascript
__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
```

#### `__webpack_require__.r(exports)` - 标记 ES Module

```javascript
__webpack_require__.r = exports => {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
  }
  Object.defineProperty(exports, '__esModule', {value: true});
};
```

### 6. 执行流程图

```
启动入口 __webpack_require__("./src/index.js")
    │
    ├─► 检查缓存 → 无缓存
    │
    ├─► 创建 module 对象 { exports: {} }
    │
    ├─► 执行 index.js 模块函数
    │       │
    │       ├─► __webpack_require__.r() 标记为 ES Module
    │       │
    │       ├─► __webpack_require__("./src/utils.js") 加载依赖
    │       │       │
    │       │       ├─► 检查缓存 → 无缓存
    │       │       ├─► 创建 module 对象
    │       │       ├─► 执行 utils.js 模块函数
    │       │       │       ├─► __webpack_require__.r() 标记
    │       │       │       └─► __webpack_require__.d() 定义导出
    │       │       │
    │       │       └─► 返回 module.exports (包含 add, default)
    │       │
    │       └─► 执行 main() 函数
    │
    └─► 返回 module.exports
```

## 面试话术

Webpack 打包后的代码本质上是一个 IIFE，内部实现了一套完整的模块系统，核心有三部分：

**模块注册：** 所有模块以键值对形式存储在 `__webpack_modules__` 对象中，键是模块路径，值是一个包裹了模块源码的函数，接收 module、exports、`__webpack_require__` 三个参数。

**模块加载器 `__webpack_require__`：** 这是整个系统的核心，模拟了 Node.js 的 require。它先查 `__webpack_module_cache__` 缓存，命中则直接返回 exports；未命中则创建一个 `{ exports: {} }` 的模块对象放入缓存，然后执行对应的模块函数。模块函数内部会通过参数向 exports 上挂载导出内容，执行完毕后返回 `module.exports`。缓存机制确保每个模块只执行一次。

**运行时辅助函数：** `__webpack_require__.r` 通过设置 `__esModule: true` 标记模块为 ES Module；`__webpack_require__.d` 用 `Object.defineProperty` 为导出属性定义 getter，实现了 ES Module 的 live binding 特性，保证导入方始终能获取到导出方的最新值。

**执行流程：** 从入口模块开始调用 `__webpack_require__`，遇到依赖就递归加载，形成深度优先的模块初始化链，最终完成整个依赖图的构建。
