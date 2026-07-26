# NestJS 为什么默认用 tsc 而不是 webpack/bundler

> 背景：NestJS 官方文档中可以选择 builder（tsc / webpack / swc），但默认是 tsc。
> 本文分析为什么服务端框架不需要 bundler，以及动态加载模块是否会产生性能问题。

## 1. 服务端不需要 bundle 优化

服务端和前端的核心诉求完全不同：

| 维度       | 前端（浏览器）                      | 后端（Node.js 服务）         |
| ---------- | ----------------------------------- | ---------------------------- |
| 传输       | 代码要通过网络发送给用户            | 代码就在服务器本地           |
| 体积敏感度 | 极度敏感（影响首屏加载）            | 几乎不敏感（磁盘空间廉价）   |
| 模块加载   | HTTP 请求，每个文件都是一次网络往返 | 本地磁盘 `require()`，微秒级 |
| 启动频率   | 每次用户访问都要加载                | 启动一次，长期运行           |

**核心结论**：前端做 bundle 是因为每多一个文件 = 多一次 HTTP 请求 = 用户等更久。而 Node.js 服务启动时从本地磁盘读 `node_modules`，速度极快，且只启动一次就持续运行，不存在"每次请求都重新加载模块"的问题。

## 2. 动态加载不会产生运行时性能问题

Node.js 的 `require()` 有**模块缓存机制**：

```javascript
// 第一次 require：从磁盘读取 + 编译 + 缓存
const express = require('express') // ~几毫秒

// 后续所有 require：直接返回缓存的引用
const express2 = require('express') // ~微秒级，命中缓存
```

所以：

- **启动时**：所有模块加载一次，可能花几百毫秒（对服务端启动来说完全可接受）
- **运行时**：所有模块已在内存中，处理请求时**零额外开销**

## 3. NestJS 不用 bundler 的真正原因

除了"不需要"之外，还有"用了反而会出问题"：

### ① 装饰器 + 反射元数据

NestJS 重度依赖 TypeScript 装饰器和 `reflect-metadata`：

```typescript
@Controller('users')
export class UserController {
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) { ... }
}
```

这些装饰器在编译时会生成元数据，NestJS 在运行时通过反射读取。Webpack 的 tree-shaking 和代码重组可能**破坏这些元数据的关联关系**。

### ② 动态模块加载

NestJS 支持动态模块：

```typescript
TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get('DB_HOST'),
    // ...
  }),
  inject: [ConfigService],
})
```

Bundler 做静态分析时无法追踪这些动态依赖，可能把"看起来没用到"的模块 tree-shake 掉。

### ③ 原生模块（Native Addons）

像 `bcrypt`、`sharp`、数据库驱动（`pg-native`）等包含 `.node` 二进制文件，webpack 无法打包这些文件。

## 4. 那 webpack 选项存在的意义是什么？

NestJS 确实提供了 `webpack` builder 选项，它的主要用途是：

- **Monorepo 模式**——monorepo 下多个包之间的引用关系复杂，webpack 可以帮助解析路径和打包
- **HMR（热模块替换）**——开发时用 webpack 可以实现模块热替换，不用重启整个服务
- **特殊部署场景**——如 Serverless（AWS Lambda），每次冷启动都要加载模块，此时 bundle 成单文件可以显著减少冷启动时间

## 5. 总结

```
┌─────────────────────────────────────────────────────────────┐
│  NestJS 默认用 tsc 的原因：                                    │
│                                                             │
│  1. 不需要 → 服务端不走网络传输，体积无所谓                      │
│  2. 没好处 → 启动一次长期运行，模块加载不是瓶颈                   │
│  3. 有风险 → 装饰器/反射/动态模块/原生模块都可能被 bundler 搞坏   │
│  4. 简单可靠 → tsc 只做类型擦除，行为 100% 可预测                │
└─────────────────────────────────────────────────────────────┘
```

**一句话**：服务端只需要处理请求，不需要像前端那样优化资源体积和加载速度。tsc 是最安全、最可预测的选择。
