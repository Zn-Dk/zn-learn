/**
 * 将用户代码包装为沙箱可执行函数。
 *
 * 为什么用 `new Function` 而不是 `eval`？
 * - `new Function` 在全局作用域创建函数，不会捕获当前词法作用域。
 *   这天然地将用户代码与我们的内部变量（如沙箱实现细节）隔离开来。
 * - `eval` 能访问调用处的所有局部变量，既有安全风险，也让代码难以推理。
 *
 * 为什么用 `with(this)` + IIFE + `'use strict'` 组合包装？
 * - `with(this)`：让 `this`（即沙箱 Proxy）上的属性可以作为裸变量名直接访问。
 *   例如 context = { name: 'foo' } 时，用户可以直接写 `name` 而不是 `this.name`。
 *   这是实现自然表达式语法的关键。
 * - IIFE `.call(this)`：确保用户代码内部的 `this` 指向同一个沙箱 Proxy，
 *   这样 `this.xxx` 也能正确工作。
 * - `'use strict'`：阻止危险的隐式行为，如自动创建全局变量、`arguments.callee`，
 *   并使普通函数调用中的 `this` 为 `undefined`（封堵一条逃逸路径）。
 *
 * 为什么 `with` 在外层，`'use strict'` 在内层？
 * - `with` 在严格模式下是被禁止的。所以我们刻意将 `with` 放在外层（非严格模式），
 *   `'use strict'` 只放在内层 IIFE 中。
 *   这样既获得了 `with` 的变量注入能力，又获得了严格模式对用户代码的安全保护。
 *
 * 局限性（对低代码表达式场景可接受）：
 * - 不是真正的安全沙箱 — 原型链逃逸仍然可能（由 index.ts 的 Proxy 层缓解，但非 100% 防弹）。
 * - 无法限制执行时间 — 死循环会阻塞主线程。
 * - 对于不可信的任意代码，应使用 iframe 沙箱或 Web Worker。
 */
export const wrapUserCode = (script: string) => {
  const wrapping = `with(this){
    return (function() {
      'use strict';
      return (${script});
    }).call(this)
  }`

  return new Function(wrapping)
}