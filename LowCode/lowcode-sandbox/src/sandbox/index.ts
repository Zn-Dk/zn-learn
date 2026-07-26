/**
 * 代码沙箱 — 面向低代码平台的轻量级表达式沙箱。
 */

import { wrapUserCode } from './utils'

/**
 * 在沙箱上下文中执行用户脚本表达式。
 *
 * @param script - 用户表达式字符串，如 `"name + ' is ' + age"`
 * @param context - 表达式可用的数据变量，如 `{ name: 'foo', age: 18 }`
 * @returns 表达式的求值结果
 */
export const evalScript = (
  script: string,
  context: Record<string, unknown>
) => {
  const execCode = wrapUserCode(script)
  const sandbox = createProxySandbox(context)

  return execCode.call(sandbox)
}

// ============================================================================
// 配置
// ============================================================================

/**
 * 永远不应该被用户代码访问到的变量。
 *
 * 为什么要保护这些？
 * - `window`/`self`/`global`/`globalThis`：阻止直接全局访问
 *   （在 createMockWindow 中特殊处理，返回 mock 自身）
 * - `document`/`fetch`/`XMLHttpRequest`：阻止 DOM 操作和网络请求
 * - `setTimeout`：阻止异步副作用
 * - `toString`/`valueOf`/`toLocaleString`：阻止类型强制转换漏洞，
 *   防止泄露内部 Proxy 对象
 */
const protectedVarNames = new Set([
  'toString',
  'toLocaleString',
  'valueOf',
  'window',
  'self',
  'global',
  'globalThis',
  'document',
  'console',
  'fetch',
  'setTimeout',
  // 可按需扩展：'XMLHttpRequest', 'WebSocket', 'Worker', 'eval' 等
])

function isProtectedVar(p: string | symbol) {
  return typeof p === 'string' && protectedVarNames.has(p)
}

/**
 * protectedVarNames 的子集，代表"全局对象本身"。
 *
 * 为什么要和 protectedVarNames 分开？
 * - 当用户写 `window.Math.max(1,2)` 时，我们希望 `window` 解析为
 *   我们的 mockWindow（这样 `.Math` 的查找会经过我们的 Proxy），而不是黑洞。
 * - 如果返回黑洞，`window.Math` 也会变成黑洞 → 功能损坏。
 * - 所以这些名称返回 mock window 自身，支持链式访问的同时仍在沙箱内。
 */
const globalVarNames = new Set([
  'window',
  'self',
  'global',
  'globalThis',
])

// ============================================================================
// 外层 Proxy — 沙箱主入口
// ============================================================================

/**
 * 创建 `with(this)` 绑定的外层沙箱 Proxy。
 *
 * 为什么用双层设计而不是单个 Proxy？
 * - 关注点分离：外层处理上下文注入 + 访问控制，
 *   内层处理 window 模拟 + 内置对象解析。
 * - 外层可以严格（阻止所有写入），而内层允许 mock window 的内部状态管理。
 */
export function createProxySandbox(context: Record<string, unknown>) {
  const mockWin = createMockWindow(context)

  return new Proxy(mockWin, {
    /**
     * 为什么 `has() { return true }`？
     * - `with` 语句使用 `in` 运算符检查变量是否存在于作用域对象上。
     *   如果 `has` 返回 false，查找会"穿透"到真实全局作用域 — 逃逸沙箱。
     * - 始终返回 true，确保所有变量查找都被我们的 `get` 陷阱拦截。
     *   通过 `with` 不可能逃逸。
     */
    has() {
      return true
    },

    /**
     * 为什么 `set() { return true }`（静默忽略所有写入）？
     * - 用户表达式应该是纯的/无副作用的。
     * - 允许写入会让用户代码在多次求值之间污染沙箱状态。
     * - 返回 true（而非抛出异常）避免破坏意外赋值的用户代码 — 我们只是静默丢弃。
     */
    set() {
      return true
    },

    get(target, p, receiver) {
      /**
       * 为什么要处理 Symbol.unscopables？
       * - `with` 会检查作用域对象上的 `Symbol.unscopables` 属性，
       *   来决定哪些属性不被 `with` 作用域捕获。
       * - Array.prototype[Symbol.unscopables] 包含 `keys`、`values`、`entries` 等。
       * - 如果不在这里返回 undefined，这些名称可能会"逃逸" with 作用域，
       *   意外解析为全局的 Array 方法。
       */
      if (p === Symbol.unscopables) return undefined

      // 上下文变量优先级最高 — 这是用户的数据
      if (p in context) {
        const v = Reflect.get(context, p, receiver)

        /**
         * 为什么要冻结上下文值？
         * - 防止用户代码修改传入的数据树。
         * - 确保沙箱对上下文数据是真正只读的。
         * - TODO: 可优化为在沙箱创建时一次性 deepFreeze，
         *   而非每次访问时冻结（Object.freeze 是幂等的但有开销）。
         */
        if (typeof v === 'object' && v !== null) {
          Object.freeze(v)
          Object.values(v).forEach(Object.freeze)
        }
        return v
      }

      /**
       * 为什么要阻止 `constructor`？
       * - 原型链逃逸：`({}).constructor.constructor('return this')()`
       *   会获取到真实的全局 `window`。
       * - 对 `constructor` 返回 undefined，切断这条逃逸路径。
       * - 结合包装器中的 `'use strict'`（使普通函数中的 `this` 为 undefined），
       *   覆盖了两条主要逃逸路线。
       */
      if (p === 'constructor') return undefined

      // 其他所有属性委托给内层 mockWindow Proxy
      return Reflect.get(target, p, receiver)
    },

    /**
     * 为什么要阻止受保护变量的 defineProperty/deleteProperty/setPrototypeOf？
     * - 这些是绕过 `set` 陷阱的替代修改路径。
     * - `Object.defineProperty(window, 'fetch', {...})` 可能重新启用危险 API。
     * - `delete` 可能移除我们的保护。
     * - `setPrototypeOf` 可能注入恶意原型链。
     */
    defineProperty(target, p, attributes) {
      if (isProtectedVar(p)) {
        throw new Error('can\'t define property:' + p.toString())
      }
      return Reflect.defineProperty(target, p, attributes)
    },
    deleteProperty(target, p) {
      if (isProtectedVar(p)) {
        throw new Error('can\'t delete property:' + p.toString())
      }
      return Reflect.deleteProperty(target, p)
    },
    setPrototypeOf() {
      throw new Error('can\'t invoke setPrototypeOf')
    }
  })
}

// ============================================================================
// BlackHole — 危险属性访问的递归陷阱
// ============================================================================

/**
 * 创建一个"黑洞" Proxy，静默吸收所有操作。
 *
 * 为什么不直接对受保护变量返回 `undefined`？
 * - 如果用户写 `document.getElementById('x').style.color`，
 *   对 `document` 返回 undefined 会抛出："Cannot read property of undefined"。
 * - 黑洞对任何属性访问或函数调用都返回另一个黑洞，
 *   所以 `document.anything.anything.anything` 只会返回 ''。
 * - 这防止了引用被阻止 API 的用户代码产生运行时错误，
 *   同时有效阻止了操作（没有真实 DOM 访问发生）。
 *
 * 为什么 target 是一个函数？
 * - 这样黑洞可以被当作函数调用：`fetch('url')` → 返回黑洞。
 * - 没有函数 target，Proxy 会在 `apply` 陷阱上抛出异常。
 *
 * 为什么要处理 `toString` 和 `Symbol.toPrimitive`？
 * - 当 JS 将黑洞强制转换为字符串时（如模板字面量、字符串拼接），
 *   我们返回 '' 而不是 '[object Object]' 或抛出异常。
 */
function createBlackHole() {
  return new Proxy(
    function () {
      return createBlackHole()
    },
    {
      get(_, p) {
        if (p === 'toString' || p === Symbol.toPrimitive) {
          return function () {
            return ''
          }
        }
        return createBlackHole()
      }
    }
  )
}

// ============================================================================
// 内层 Proxy — Mock Window
// ============================================================================

/**
 * 创建一个模拟安全全局访问的 mock window 对象。
 *
 * 为什么不直接阻止一切，只允许上下文？
 * - 用户表达式经常需要内置对象：`Math.max()`、`JSON.parse()`、
 *   `parseInt()`、`Array.isArray()`、`Date.now()` 等。
 * - 阻止所有全局变量会使沙箱对实际使用来说过于严格。
 * - mock window 选择性地允许安全的内置对象，同时阻止危险的。
 *
 * 为什么将 `ctx` 传入 Proxy target？
 * - 这样 get 陷阱中的 `p in t` 检查可以找到上下文属性。
 * - 这允许内层在通过 `window.xxx` 模式访问时也能提供上下文数据
 *   （如 `window.myVar`）。
 */
function createMockWindow(ctx?: object) {
  const win: object = new Proxy(
    Object.assign({}, ctx),
    {
      /**
       * 为什么这里也要 `has() { return true }`？
       * - 外层 Proxy 通过 `Reflect.get(target, p)` 委托到这个对象。
       * - 如果外层 Proxy 的 `in` 检查传播到这里（如 `with` 穿透），
       *   我们仍然想拦截一切。
       */
      has() {
        return true
      },

      /**
       * 为什么这里允许 `set`（不像外层 Proxy）？
       * - 外层 Proxy 已经用 `set() { return true }` 阻止了所有写入。
       * - 这个内层 `set` 只能通过内部操作到达，
       *   不能从用户代码直接触达。它允许 mock window 在需要时维护内部状态。
       */
      set(t, p, newV) {
        return Reflect.set(t, p, newV)
      },

      get(t, p) {
        // target 上已有的属性（上下文数据）— 直接返回
        if (p in t) {
          return Reflect.get(t, p)
        }

        /**
         * 为什么对全局变量名返回 `win` 自身？
         * - `window.Math.max(1,2)` 应该能工作：`window` → win → `.Math` → get 陷阱 → 纯净 window
         * - 如果返回黑洞，`window.Math` 也会是黑洞 → 功能损坏。
         * - 返回 `win` 创建自引用循环（就像真实的 `window.window === window`），
         *   所以 `window.Math` 这样的链式访问会重新进入这个 Proxy 的 get 陷阱。
         */
        if (typeof p === 'string' && globalVarNames.has(p)) return win

        // 受保护变量返回黑洞
        if (isProtectedVar(p)) {
          return createBlackHole()
        }

        // 安全的内置对象：委托给纯净的（未被污染的）window
        return getPropertyFromNativeWindow(p)
      },
    }
  )

  return win
}

// ============================================================================
// 纯净 Window — 通过 iframe 获取未被污染的内置对象
// ============================================================================

/**
 * 为什么用 iframe 的 contentWindow 而不是页面的 `window`？
 * - 页面的 `window` 可能被第三方脚本污染
 *   （如 polyfill 覆盖 `window.Promise`，分析工具覆盖 `window.fetch`）。
 * - iframe 的 contentWindow 是全新的、未修改的 JavaScript 环境。
 * - 这确保用户代码始终获得标准的内置行为。
 *
 * 为什么缓存 iframe（单例模式）？
 * - 创建 iframe 涉及 DOM 操作 — 如果每次求值都创建会很昂贵。
 * - 纯净 window 永远不变，一个实例就够了。
 *
 * 为什么不从 DOM 中移除 iframe？
 * - 在某些浏览器中，移除 iframe 会使其 contentWindow 失效。
 * - 我们保持它隐藏（`display: none`）但挂载在 DOM 上，以维持有效引用。
 */
let cachedPureWindow: Window | null = null

function getPureWindow() {
  if (!cachedPureWindow) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    cachedPureWindow = iframe.contentWindow!
  }
  return cachedPureWindow
}

/**
 * 从纯净 window 获取属性值，带安全处理。
 */
function getPropertyFromNativeWindow(p: PropertyKey) {
  const pureWindow = getPureWindow()
  const ret = Reflect.get(pureWindow, p)

  /**
   * 为什么要绑定函数，且只绑定没有 `prototype` 的？
   * - 原生函数如 `setTimeout`、`parseInt` 需要 `window` 作为它们的 `this`
   *   才能正确工作。不绑定的话，它们会收到我们的 Proxy 作为 `this` → 报错。
   * - 没有 `prototype` 的函数是箭头函数或内置方法
   *   （如 `Math.max`、`parseInt`）。这些绑定是安全的。
   * - 有 `prototype` 的函数是构造函数（如 `Array`、`Map`、`Promise`）。
   *   对构造函数做 bind 会破坏 `new Constructor()`，因为 `bind` 会干扰
   *   `new` 运算符的原型链设置。
   */
  if (typeof ret === 'function' && !ret.prototype) {
    return ret.bind(pureWindow)
  }

  /**
   * 为什么对 DOM 元素返回 null？
   * - `window[id]` 可以通过 id 属性返回 DOM 元素。
   * - 序列化 DOM 元素可能导致错误，且在表达式中从不是预期行为。
   * - 返回 null 是安全且可预测的。
   */
  if (ret instanceof Element || ret instanceof HTMLCollection) {
    return null
  }

  return ret
}