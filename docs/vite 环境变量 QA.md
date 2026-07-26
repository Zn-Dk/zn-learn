# Vite 环境变量 QA 笔记

> 整理自项目学习过程中的对话记录，涵盖 `process.env` 与 `import.meta.env` 的核心知识点。

---

## Q1: 为什么在 `vite.config.ts` 插件中 `import.meta.env` 是 `undefined`？

### 背景代码

```typescript
// vite.config.ts 中的插件钩子
{
  name: 'vite-plugin-transformHtml',
  transformIndexHtml(html, ctx) {
    console.log("🚀 ~ process.env.NODE_ENV:", process.env.NODE_ENV); // ✅ 可以获取到
    console.log(import.meta.env, 'html') // ❌ undefined
  }
}
```

### 答案

**核心原因：`vite.config.ts` 运行在 Node.js 环境中，而 `import.meta.env` 是 Vite 特有的客户端环境变量注入机制，只在浏览器环境的应用源代码中可用。**

#### 关键区别

| 环境 | `process.env.NODE_ENV` | `import.meta.env` |
|------|----------------------|-------------------|
| Node.js（`vite.config.ts`） | ✅ 可用（Node.js 原生） | ❌ `undefined` |
| 浏览器（`src/main.tsx`） | ✅ 被 Vite 特殊处理（语法糖） | ✅ 可用（Vite 编译时注入） |

#### 解决方案

在配置文件中应使用 `process.env` 或 Vite 提供的 `loadEnv()` 函数来获取环境变量：

```typescript
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'FOO_'])
  console.log(env.VITE_API_URL) // ✅
  // ...
})
```

Vite 使用 dotenv 从你的 环境目录 中的下列文件加载额外的环境变量, 加载原则:

```bash
   .env                # 所有情况下都会加载
   .env.local          # 所有情况下都会加载，但会被 git 忽略
   .env.[mode]         # 只在指定模式下加载
   .env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

> 另外，Vite 执行时已经存在的环境变量有最高的优先级，不会被 .env 类文件覆盖。例如当运行 VITE_SOME_KEY=123 vite build 的时候。
---

## Q2: `process.env` 除了 `loadEnv` 手动引用配置文件，还有什么方式注入？

### 答案

`process.env` 的注入方式有以下几种：

#### 1. 操作系统 / Shell 环境变量（自动）

Node.js 启动时自动继承当前 Shell 的所有环境变量：

```bash
# 临时设置
API_KEY=xxx node app.js

# 或 export
export API_KEY=xxx
npm run dev
```

#### 2. Vite 内部自动注入（自动）

Vite 根据命令自动设置 `NODE_ENV`：
- `vite` / `vite dev` → `NODE_ENV = 'development'`
- `vite build` → `NODE_ENV = 'production'`

#### 3. `loadEnv()` 手动加载 `.env` 文件

```typescript
import { loadEnv } from 'vite'
const env = loadEnv(mode, process.cwd(), ['VITE_'])
```

> ⚠️ 注意：`loadEnv` 返回的是一个新对象，**不会**自动写入 `process.env`。

#### 4. `dotenv` 等第三方库

```typescript
import dotenv from 'dotenv'
dotenv.config() // 将 .env 文件内容注入 process.env
```

#### 5. `cross-env` 等命令行工具

```json
{
  "scripts": {
    "build:staging": "cross-env NODE_ENV=staging vite build"
  }
}
```

#### 6. CI/CD 平台 / Docker

```yaml
# GitHub Actions
env:
  VITE_API_URL: https://api.example.com

# Docker
ENV VITE_API_URL=https://api.example.com
```

#### 总结

| 方式 | 是否自动 | 说明 |
|------|---------|------|
| Shell 环境变量 | ✅ 自动 | Node.js 进程启动时继承 |
| Vite 内部注入 | ✅ 自动 | 仅 `NODE_ENV` |
| `loadEnv()` | ❌ 手动 | 加载 `.env` 文件，返回新对象 |
| `dotenv` | ❌ 手动 | 加载 `.env` 文件到 `process.env` |
| `cross-env` | ❌ 手动 | 命令行设置 |
| CI/CD / Docker | ❌ 手动 | 平台配置注入 |

> ⚠️ **重要**：`.env` 文件中的变量**不会自动**注入到 `process.env`，必须通过 `loadEnv()` 或 `dotenv` 等方式手动加载。

---

## Q3: 对比 `process.env` 和 `import.meta.env` 的使用场景

### 核心区别一览

| 特性 | `process.env` | `import.meta.env` |
|------|--------------|-------------------|
| **运行环境** | Node.js | 浏览器（客户端） |
| **可用位置** | `vite.config.ts`、插件、SSR | `src/` 下的应用源代码 |
| **注入时机** | Node.js 进程启动时继承 | Vite **编译时**静态替换 |
| **变量来源** | Shell 环境变量 + 手动 `loadEnv` | `.env` 文件中 `VITE_` 前缀的变量 |
| **安全性** | 包含所有系统变量（PATH、HOME 等） | 仅暴露 `VITE_` 前缀变量（安全过滤） |
| **类型** | 运行时对象，动态读取 | 编译时静态替换，打包后是字面量 |

### `process.env` — Node.js 端

#### 适用场景
- `vite.config.ts` 配置文件
- Vite 插件内部（如 `transformIndexHtml` 钩子）
- 构建脚本、SSR 服务端代码

#### 特点
```
process.env = {
  NODE_ENV: 'development',   // Vite 自动注入
  PATH: '/usr/bin:...',       // 系统变量（大量）
  HOME: '/data/home/xxx',     // 系统变量
  USER: 'xxx',                // 系统变量
  // ❌ 不会自动包含 .env 文件中的 VITE_API_URL 等变量
}
```

### `import.meta.env` — 浏览器端

#### 适用场景
- `src/` 下的应用源代码（组件、工具函数等）
- 所有会被 Vite 编译处理的前端代码

#### 内置变量
```typescript
import.meta.env.MODE         // 'development' | 'production'
import.meta.env.DEV          // boolean
import.meta.env.PROD         // boolean
import.meta.env.BASE_URL     // '/'
import.meta.env.VITE_API_URL // 来自 .env 文件
```

#### 编译原理（静态替换）
```typescript
// 源代码
const url = import.meta.env.VITE_API_URL

// 编译后（浏览器实际执行的代码）
const url = "/api"  // 直接替换为字面量字符串
```

### 安全性设计 — 为什么要区分？

```
┌─────────────────────────────────────────────┐
│  process.env (Node.js 端)                   │
│  ├── NODE_ENV = 'development'               │
│  ├── PATH = '/usr/bin:...'                  │
│  ├── DB_PASSWORD = 'secret123'  ← 敏感！    │
│  ├── AWS_SECRET_KEY = 'xxx'     ← 敏感！    │
│  └── VITE_API_URL = '/api'                  │
└─────────────────────────────────────────────┘
            │
            │ Vite 安全过滤：只暴露 VITE_ 前缀
            ▼
┌─────────────────────────────────────────────┐
│  import.meta.env (浏览器端)                  │
│  ├── MODE = 'development'                   │
│  ├── DEV = true                             │
│  ├── PROD = false                           │
│  ├── BASE_URL = '/'                         │
│  └── VITE_API_URL = '/api'   ← 仅 VITE_ 前缀│
│                                             │
│  ❌ DB_PASSWORD    (不会暴露)                │
│  ❌ AWS_SECRET_KEY (不会暴露)                │
└─────────────────────────────────────────────┘
```

> 如果 `process.env` 直接暴露到浏览器，所有系统敏感变量（数据库密码、密钥等）都会被打包进前端代码中，任何人都能在浏览器 DevTools 中看到。

### 总结口诀

| 你在哪写代码？ | 用什么？ |
|---------------|--------|
| `vite.config.ts` / 插件 | `process.env` + `loadEnv()` |
| `src/**/*.ts` / 组件 | `import.meta.env` |
| SSR 服务端 | `process.env` |
| `.env` 文件定义变量 | 加 `VITE_` 前缀才能在浏览器端访问 |

## Q4: Vite 中怎么对 import.meta.env 进行 TypeScript 类型定义?

参考 src 下的 [vite-env.d.ts文件](./src/vite-env.d.ts)


## Q5: Vite 中对 html 文件的处理有哪些方法？
- 通过插件, 使用 transformHtml Hook, 对 html 文件进行处理
- 默认机制处理环境变量 `import.meta.env`
import.meta.env 中的任何属性都可以通过特殊的 %CONST_NAME% 语法在 HTML 文件中使用(jsx, vue 不支持)：

  ```html
  <h1>Vite is running in %MODE%</h1>
  <p>Using data from %VITE_API_URL%</p>
  ```

> ✅ 以上的操作在最终构建产物 index.html会被替换为实际的值
---

## 相关文件参考

- 配置文件：`vite.config.ts`
- 环境变量类型定义 ：`src/vite-env.d.ts`
- 客户端代码：`src/main.tsx`
- 环境变量文件：`.env` / `.env.development` / `.env.production`

## 参考文档

- [Vite 官方文档 - 环境变量和模式](https://cn.vite.dev/guide/env-and-mode.html)
- [Vite 官方文档 - loadEnv](https://cn.vite.dev/guide/api-javascript.html#loadenv)
