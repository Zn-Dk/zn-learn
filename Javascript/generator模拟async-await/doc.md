# Generator 模拟 async/await 深度分析

---

## 一、实际使用场景

这段代码实现的是 **"用 Generator 手动模拟 async/await"**，核心是 `genToAsync` 这个协程调度器。

### 典型使用场景

**1. 理解 async/await 的底层原理（最主要场景）**

这本身就是一个教学/探索性代码，帮助理解 `async/await` 是如何工作的。

**2. 需要对异步流程进行精细控制**

Generator 相比 async/await 多了一个能力：**可以从外部控制生成器的执行**。

```typescript
const gen = genFetchData();

// 可以在任意时机手动推进
const step1 = gen.next();         // 执行到第一个 yield
const step2 = gen.next(mockResp); // 注入 mock 数据，跳过真实请求
```

这在以下场景很有价值：
- **单元测试**：注入 mock 数据，无需真实网络请求
- **时间旅行调试**：记录每一步的状态，可回放
- **取消/暂停异步流**：在任意 yield 点中断

**3. Redux-Saga 的核心模式**

这正是 `redux-saga` 的底层实现思路，用于管理复杂的副作用流程。

---

## 二、工具库实践

### `co`（Generator 时代的 async/await 前身）

```typescript
import co from 'co';

// co 就是你的 genToAsync！
co(function* () {
  const resp = yield fetch('/api/data');
  const data = yield resp.json();
  return data;
}).then(console.log);
```

`co` 是 TJ Holowaychuk 在 ES2017 `async/await` 出现前写的库，`genToAsync` 就是 `co` 的简化版。

### `redux-saga`（最典型的生产级实践）

```typescript
import { call, put, takeEvery } from 'redux-saga/effects';

// 和 genFetchData 几乎一模一样的模式！
function* fetchUserSaga(action) {
  const resp = yield call(fetch, `/api/users/${action.id}`);
  const data = yield call([resp, 'json']);
  yield put({ type: 'USER_LOADED', payload: data });
}
```

`redux-saga` 的 `runSaga` 就是 `genToAsync` 的生产级实现，额外支持：
- `take` / `put` / `call` / `fork` 等 Effect 描述符
- 并发控制（`race`、`all`）
- 取消（`cancel`）

### `effection`（现代版）

```typescript
import { main, call } from 'effection';

main(function* () {
  const resp = yield* call(fetch('/api/data'));
  return yield* call(resp.json());
});
```

---

## 三、与 async/await 底层实现的区别

### 相同点：本质都是协程

```
async/await  ←→  Generator + Promise 调度器（genToAsync）
```

事实上，**Babel 早期就是把 `async/await` 编译成 Generator + `regeneratorRuntime`**（一个类似 `genToAsync` 的调度器）。

### 关键区别对比

| 维度 | `async/await` | `Generator + genToAsync` |
|---|---|---|
| **控制权** | 引擎内部调度，外部无法干预 | 外部可通过 `gen.next(value)` 注入值 |
| **可测试性** | 需要 mock 网络层 | 可直接注入 mock 值，无需 mock |
| **取消支持** | 原生不支持（需 AbortController） | 可在任意 yield 点中断 |
| **错误注入** | 无法从外部注入错误 | `gen.throw(err)` 可注入错误 |
| **性能** | 引擎原生优化，更快 | 有额外的 Promise 包装开销 |
| **可读性** | 更简洁直观 | 更冗长，但意图更显式 |

### 底层执行机制对比

```
async/await（引擎内部）
─────────────────────────────────────────────────────
引擎          函数体
 │──── 开始执行 ────────────────────────────────────▶│
 │◀─── await fetch() → 挂起，返回 Promise ───────────│
 │  注册微任务，继续执行其他代码
 │──── Promise resolve → 恢复执行，注入 Response ───▶│
 │◀─── await resp.json() → 再次挂起 ─────────────────│
 │──── resolve → 恢复，注入 data ────────────────────▶│
 │◀─── return data ───────────────────────────────────│

Generator + genToAsync（用户空间）
─────────────────────────────────────────────────────
调度器(genToAsync)    函数体(Generator)
 │──── gen.next() ──────────────────────────────────▶│
 │◀─── yield fetch() → {value: Promise, done: false}─│
 │  Promise.resolve(value).then(res => gen.next(res))
 │──── gen.next(Response) ──────────────────────────▶│
 │◀─── yield resp.json() → {value: Promise, done: false}
 │──── gen.next(data) ──────────────────────────────▶│
 │◀─── return data → {value: data, done: true} ───────│
```

### 核心差异：`yield` 表达式的求值结果

这是最本质的区别：

```typescript
// async/await：await 的结果由引擎直接注入，类型精确
async function foo() {
  const resp = await fetch('/api'); // resp 类型精确为 Response ✅
}

// Generator：yield 的结果由 gen.next(value) 注入，TS 无法推断
function* foo() {
  const resp = yield fetch('/api'); // resp 类型为 NextType（unknown/any）❌
  //                                   TS 不知道外部会传入什么
}
```

**根本原因**：`async/await` 是语言级别的语法糖，编译器能追踪类型；Generator 是用户空间的模拟，编译器无法跨越 `gen.next()` 的边界推断类型。这也是为什么 `genToAsync` 中 `NextType` 必须手动指定为 `any`。

---

## 四、总结

`genToAsync` 本质上就是 **`co` 库 / Babel 的 `regeneratorRuntime` 的简化版**，也是 `redux-saga` 调度器的核心思想。

```
genToAsync ≈ co ≈ regeneratorRuntime（核心调度逻辑）
```

在 `async/await` 普及后，这种模式在日常开发中已基本被取代，但在需要**外部控制异步流程**（测试、取消、时间旅行）的场景下，Generator 仍然是 `async/await` 无法替代的工具。

| 场景 | 推荐方案 |
|---|---|
| 日常异步请求 | `async/await` |
| 复杂副作用管理（Redux） | `redux-saga`（Generator） |
| 需要精细控制/可取消的异步流 | `effection` 或自定义 Generator 调度器 |
| 学习底层原理 | 手写 `genToAsync`（就是这份代码！） |
