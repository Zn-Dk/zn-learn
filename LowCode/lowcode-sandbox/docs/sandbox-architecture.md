# 代码沙箱架构

## 概述

面向低代码平台的轻量级 JavaScript 表达式沙箱。允许安全地执行用户编写的表达式（如 `name + ' is ' + age + ' years old'`），注入上下文变量的同时阻止对危险浏览器 API 的访问。

**设计目标**：以最大安全性、最小开销实现自然的表达式语法。

**非目标**：这不是针对不可信任意代码的安全沙箱。如需那种级别的隔离，请使用 iframe 沙箱或 Web Worker。

---

## 架构图

```
- 架构（双层 Proxy）：

  用户代码
      ↓  execCode.call(sandbox)
  外层 Proxy (createProxySandbox)
    - 拦截所有来自 `with(this)` 的变量查找
    - 提供上下文变量（冻结以保证安全）
    - 阻止 constructor 逃逸、原型操纵
    - 将未知查找委托给内层
      ↓
  内层 Proxy (createMockWindow)
    - 模拟一个安全的 `window` 对象
    - 对 `window`/`self`/`globalThis` 返回自身（使 `window.Math` 可用）
    - 对受保护的危险全局变量返回 BlackHole
    - 对安全的内置对象穿透到纯净 iframe window（Math, JSON 等）
      ↓
  纯净 Window (iframe.contentWindow)
    - 提供未被污染的内置对象
    - 缓存单例，避免重复 DOM 操作
```

```
┌─────────────────────────────────────────────────────────────────┐
│                        evalScript(script, context)               │
│                                                                  │
│  1. wrapUserCode(script)  →  创建可执行函数                       │
│  2. createProxySandbox(context)  →  创建沙箱 Proxy               │
│  3. execCode.call(sandbox)  →  在沙箱中运行用户代码               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    wrapUserCode (utils.ts)                        │
│                                                                  │
│  将用户表达式包装为：                                              │
│                                                                  │
│    new Function(`                                                │
│      with(this) {              ← 通过 Proxy 注入变量              │
│        return (function() {                                      │
│          'use strict';         ← 安全：阻止逃逸路径               │
│          return (用户代码);     ← 用户表达式在此                   │
│        }).call(this)           ← 正确的 `this` 绑定              │
│      }                                                           │
│    `)                                                            │
│                                                                  │
│  关键决策：                                                       │
│  • new Function > eval（不捕获词法作用域）                         │
│  • with 在严格模式外层（with 在 strict 中被禁止）                  │
│  • strict mode 在内层 IIFE 中（阻止函数中 `this` 逃逸）           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │  .call(sandbox)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              外层 Proxy — createProxySandbox                      │
│              （`with` 绑定的 `this`）                             │
│                                                                  │
│  职责：                                                           │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ has() → true        所有查找被拦截，无法逃逸                 │ │
│  │ set() → true        静默丢弃写入（纯求值）                   │ │
│  │ get(p):                                                    │ │
│  │   Symbol.unscopables → undefined（防止 with 泄漏）          │ │
│  │   p in context       → 冻结的上下文值                       │ │
│  │   'constructor'      → undefined（阻止逃逸）                │ │
│  │   其他               → 委托给内层 mockWindow                │ │
│  │ defineProperty/deleteProperty → 受保护变量则抛出             │ │
│  │ setPrototypeOf       → 始终抛出                            │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │  Reflect.get(target, p)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              内层 Proxy — createMockWindow                        │
│              （模拟安全的 window 对象）                            │
│                                                                  │
│  职责：                                                           │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ get(p):                                                    │ │
│  │   p in target        → 返回值（上下文数据）                  │ │
│  │   globalVarNames     → 返回自身（window.window === win）    │ │
│  │   protectedVarNames  → 返回 BlackHole（静默阻止）           │ │
│  │   其他               → getPropertyFromNativeWindow(p)      │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
          │                                    │
          ▼                                    ▼
┌──────────────────────┐        ┌──────────────────────────────────┐
│      BlackHole       │        │     纯净 Window (iframe)          │
│      （黑洞）         │        │                                    │
│ 递归 Proxy，吸收     │        │ 未被污染的内置对象：               │
│ 所有访问：           │        │ Math, JSON, parseInt, Array,      │
│                      │        │ Date, Promise 等                  │
│ .anything → BlackHole│        │                                    │
│ () → BlackHole       │        │ • 缓存单例（性能）                 │
│ toString → ''        │        │ • 函数正确绑定                     │
│                      │        │ • 构造函数不绑定（new 可用）        │
└──────────────────────┘        └──────────────────────────────────┘
```

---

## 关键设计决策

### 1. 为什么用双层 Proxy？

| 关注点       | 外层 Proxy  | 内层 Proxy         |
| ------------ | ----------- | ------------------ |
| 上下文注入   | ✅ 主要职责 | 兜底               |
| 写入保护     | ✅ 阻止所有 | 允许内部           |
| 全局模拟     | ❌ 委托     | ✅ 主要职责        |
| 内置对象解析 | ❌          | ✅ 通过纯净 window |

分离关注点使每一层更简单、更容易推理。

### 2. 为什么 `has() { return true }`？

`with` 语句使用 `in` 运算符检查变量是否存在于作用域对象上：

```js
with (obj) {
  x // JS 引擎执行：if ('x' in obj) → obj.x，否则 → global.x
}
```

如果 `has` 对任何属性返回 `false`，该查找会**逃逸到真实全局作用域**。始终返回 `true`，保证每个变量查找都命中我们的 `get` 陷阱。

### 3. 为什么用 BlackHole 而不是 `undefined`？

```js
// 如果 document 返回 undefined：
document.getElementById('x') // ❌ TypeError: Cannot read properties of undefined

// 如果 document 返回 BlackHole：
document.getElementById('x').style.color // ✅ 静默返回 ''
```

BlackHole 防止引用被阻止 API 的用户代码产生运行时错误，提供优雅降级。

### 4. 为什么用 iframe 获取纯净 Window？

```js
// 页面的 window 可能被污染：
window.Promise = MyCustomPromise  // 第三方 polyfill
window.fetch = instrumentedFetch  // 分析工具包装

// iframe.contentWindow 始终是原始的：
iframe.contentWindow.Promise === native Promise  // ✅
```

### 5. 为什么阻止 `constructor`？

```js
// 没有保护时：
;({}).constructor.constructor('return this')()(
  // → 真实 window！🚨

  // 有保护时（constructor → undefined）：
  {},
).constructor // → undefined，链条断裂 ✅
```

### 6. 为什么用 `!ret.prototype` 检查来决定是否绑定函数？

```js
// 内置方法（没有 prototype）— 需要绑定：
parseInt.prototype // undefined → 可以安全绑定
Math.max.prototype // undefined → 可以安全绑定

// 构造函数（有 prototype）— 不能绑定：
Array.prototype // 存在 → 不绑定
Map.prototype // 存在 → 不绑定

// 为什么？bind + new = 损坏：
const BoundArray = Array.bind(window)
new BoundArray() // ❌ 可能失败或行为异常
```

---

## 安全模型

### 已防护的攻击向量：

| 攻击向量                                   | 缓解措施                  |
| ------------------------------------------ | ------------------------- |
| 直接全局访问（`window`、`document`）       | 受保护变量 → BlackHole    |
| 通过 `with` 穿透的变量逃逸                 | 两层都 `has() → true`     |
| 原型链逃逸（`{}.constructor.constructor`） | `constructor → undefined` |
| 写入污染（`x = 'evil'`）                   | `set() → true`（丢弃）    |
| 属性重定义（`Object.defineProperty`）      | 受保护变量则抛出          |
| 原型操纵（`setPrototypeOf`）               | 始终抛出                  |
| 类型强制转换泄漏（`toString`、`valueOf`）  | 受保护变量 → BlackHole    |
| `Symbol.unscopables` 绕过                  | 返回 `undefined`          |

### 未防护的（已知局限）：

| 攻击                         | 为什么未缓解                 |
| ---------------------------- | ---------------------------- |
| 死循环                       | 没有 Worker 无法限制执行时间 |
| `arguments.callee.caller` 链 | 严格模式缓解，但存在边缘情况 |
| 时序攻击                     | 超出表达式沙箱范围           |
| 内存耗尽                     | 没有 Worker 无法限制内存     |

---

## 使用示例

```typescript
import { evalScript } from '@zn-lowcode/code-runner'

// 简单表达式
evalScript('name + " is " + age', { name: 'Alice', age: 25 })
// → "Alice is 25"

// 使用内置对象（允许）
evalScript('Math.max(a, b)', { a: 3, b: 7 })
// → 7

// 危险访问（静默阻止）
evalScript('document.cookie', {})
// → ""（BlackHole toString）

// 写入尝试（静默忽略）
evalScript('(() => { window.x = 1; return x })()', { x: 42 })
// → 42（原始上下文值，写入被丢弃）
```

---

## 文件结构

```
packages/code-runner/
├── src/
│   ├── index.ts              # 包入口（重新导出）
│   └── sandbox/
│       ├── index.ts          # 核心沙箱逻辑（Proxy 层）
│       └── utils.ts          # 代码包装工具（with + new Function）
├── docs/
│   └── sandbox-architecture.md  # 本文件
├── package.json
└── tsconfig.json
```
