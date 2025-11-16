# Bun javascript 运行时

## 1.0 介绍

Node.js 替代者 "Bun1.0"带来了许多新特性和速度提升，为开发现代化的前端应用提供了更好的兼容性和更快的运行速度。

### 亮点

- ⚡ PNPM 带缓存的安装只需 0.5 秒，比传统的 NPM 安装速度快了 200 多倍。
- ⚡ Bun1.0 自带 TSTSX 运行时，同时支持 CommonJS 和 ESM，具有更好的浏览器兼容性。
- ⚡ Bun1.0 替代了 Node.js，并且已经进入大部分的 Node API，可以取代许多现有工具。
- ⚡ Bun1.0 生态系统的速度比其他工具如 ESbuild 快五倍，加速了开发过程。
- ⚡ Bun1.0 内置了一些有用的标准 Web API 和插件，例如热重载、写文件和启动 Web 服务，如 fetch websocket Request Response 等, 使得不需要像 node 一样安装模块去运行提高了开发效率。
- ⚡ Bun 开箱即支持运行所有 .js .jsx .cjs .mjs .ts .tsx 文件，并且可以运行在浏览器和 Node.js 环境。
- ⚡ Bun 内置 SQLite 模块, 方便开发者直接搭建简易的数据库.

## 常用命令

### 初始化项目

```bash
mkdir project
cd project
bun init

# bun init helps you get started with a minimal project and tries to guess sensible defaults. Press ^C anytime to quit

# package name (project): <-修改项目名
# entry point (index.ts): <-修改入口文件
```

回车后, 会自动生成项目的初始文件包括

```bash
 + node_modules (是的 和 npm 一样的 node_modules, 直接兼容)
 + index.ts
 + .gitignore
 + tsconfig.json (for editor auto-complete)
 + README.md
 + package.json (是我们熟悉的)
 + bun.lockb (二进制文件, 类似 package.lock.json)

```

### 运行文件

`bun xxx.ts` 或 `bun run xxx.ts`

> 官方称: bun run is roughly 28x faster than npm run (6ms vs 170ms of overhead).

### 安装依赖

支持 `install` / `i`(简写) 和 `add` / `a`(简写) 两种方式

```bash
  bun add/a figlet
  bun add/a -d @types/figlet
  # 或者也可以
  bun install/i tailwindcss
```

### 卸载依赖

`bun remove`

### 更新依赖

`bun update`

### create 命令

```bash
  bun create next-app   # 用 bun 创建 next-app 类似 npm create
  bun create vite my-app # vite 支持
```

### 执行 package.json 命令

就如同 node 下一样, 使用 bun <script-name> 即可

> vite 下的使用\
> `bunx --bun vite` 使用 bunx 运行 vite dev server,\
> 可以让 vite 使用 bun 运行时代替 node\
> (1.0 后 不需要 --bun)

### 构建 打包

bun build 构建命令 原生支持 ts 的打包

```bash
  bun build ./src/** --outdir ./dist # 将 src 下的文件打包到 dist 目录
```

> 个人实测, 真的很快

### 热重载

`bun --hot xx.ts`

这个命令可以使得 bun script 执行的目标文件在被修改时热重载, 而无需重新启动

> `bun --watch xx.ts` 效果也相同 都是监视, 不过 watch 一般用于单文件调试

## 快速建立 http 服务

index.ts:

```ts
// 通过 bun 执行文件: bun index.ts

// 秒级建立 http 服务器 不依赖 node
// Bun 是内置宏 不需要引入
const server = Bun.serve({
  port: 3030,
  // 响应请求
  fetch(request, server) {
    // console.log(server);
    /*
      DebugHTTPServer {
        development: true,
        fetch: [Function: fetch],
        hostname: "localhost",
        id: "",
        pendingRequests: 1,
        pendingWebSockets: 0,
        port: 3030,
        protocol: "http",
        publish: [Function: publish],
        reload: [Function: reload],
        stop: [Function: stop],
        upgrade: [Function: upgrade]
      }
      */

    // 使用 Response 宏
    return new Response('Hello via Bun!');
  },
});
console.log(`Listening on http://localhost:${server.port}`);
```

## 读取文件

```bash
const server = Bun.serve({
  port: 3030,
  // 响应请求
  fetch(request, server) {
    // 读取文件
    const html = Bun.file('./index.html');
    return new Response(html);
  },
});
console.log(`Listening on http://localhost:${server.port}`);
```

## 引入模块

与 es import 完全一致, 不需要特殊语法

```ts
import figlet from 'figlet';

// 输出一个酷炫的命令行大字母
console.log(figlet.textSync('BUN IS RUNNING'));
```

```bash
bun index.ts
  ____  _   _ _   _   ___ ____    ____  _   _ _   _ _   _ ___ _   _  ____
 | __ )| | | | \ | | |_ _/ ___|  |  _ \| | | | \ | | \ | |_ _| \ | |/ ___|
 |  _ \| | | |  \| |  | |\___ \  | |_) | | | |  \| |  \| || ||  \| | |  _
 | |_) | |_| | |\  |  | | ___) | |  _ <| |_| | |\  | |\  || || |\  | |_| |
 |____/ \___/|_| \_| |___|____/  |_| \_\\___/|_| \_|_| \_|___|_| \_|\____|
```

### 同时使用 commonjs + es6 import 语法

You can even use import and require(), in the same file. It just works.

```typescript
// 同时使用 commonjs 和 import !
const _ = require('underscore');
import lodash from 'lodash';

const origin = { a: 1, foo: [{ bar: 2 }] };
const copy = lodash.cloneDeep(origin);
console.log('origin is equal copy', origin === copy);
// origin is equal copy false
console.log(_.filter([1, 2, 3, 4, 5, 6], (n: number) => n % 2 === 0));
// [ 2, 4, 6 ]
```

## 配置 https

```typescript
Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response('Hello from Bun!');
  },
  tls: {
    key: Bun.file('/path/to/key.pem'),
    cert: Bun.file('/path/to/cert.pem'),
  },
});
```

## 配置 websocket

```typescript
Bun.serve({
  port: 3000,
  fetch() { ... },
  websocket: {
    open(ws) { ... },
    message(ws, data) { ... },
    close(ws, code, reason) { ... },
  },
});
```

## 简易 SQLite

```typescript
import { Database } from 'bun:sqlite';

const db = new Database('./db.sqlite');
// db.run('CREATE Table foo(bar TEXT)');
// db.run<string[]>('INSERT INTO foo VALUES (?)', 'baz');
// db.run<string[]>('INSERT INTO foo VALUES (?)', ['hello']);

const query = db.query('SELECT * from foo where bar="hello"');
console.log(query.get());
```

## 内置的密码加盐

```typescript
// 使用 Bun.password 创建hash密码

const password = 'my-secret';
const hash = await Bun.password.hash(password, 'argon2d');
console.log(hash);

const isValid = await Bun.password.verify(password, hash);
console.log('Password verify result: %s', isValid);
```

## 内置的测试库

```typescript
import { expect, test } from 'bun:test';

const arr = [2, 3, 5, 7, 8, 10];
const oddArr = arr.filter(n => n % 2 != 0);
test(`odd numbers from [${arr}] is [${oddArr}]`, () => {
  expect(oddArr).toBeArray([3, 5, 7]);
});

// bun test
// bun test v1.0.3 (25e69c71)

// 5-bun.test.js:
// ✓ odd numbers from [2,3,5,7,8,10] is [3,5,7] [0.05ms]

//  1 pass
//  0 fail
//  1 expect() calls
// Ran 1 tests across 1 files. [11.00ms]
```

> Bun 无缝兼容 jest(@jest/globals) 和 vitest

## 简易 WebSocket 服务器

server.ts

```typescript
const server = Bun.serve({
  port: 3030,
  // 响应请求
  fetch(request, server) {
    const url = new URL(request.url);
    if (url.pathname === '/ws') {
      // 访问 ws 路径时 通过 upgrade 升级到 ws
      const isSuccess = server.upgrade(request);
      // Bun automatically returns a 101 Switching Protocols
      if (isSuccess) return;
    }

    // 读取文件
    const html = Bun.file('./index.html');

    return new Response(html);
  },
  // websocket 处理后转入此处
  websocket: {
    open(ws) {
      console.log(`Websocket on ws://localhost:${server.port}/ws`);
      ws.send('Hello from ws!');
    },
    message(ws, message) {
      console.log(`[RECEIVED] ${message}`);
      ws.send(`This is server, you said: ${message}`);
    },
    close(ws, code, reason) {},
  },
});
```

index.html

```html
<h2>WebSocket:</h2>
<div class="text-input">
  <input type="text" id="msg-input" placeholder="say something to server" />
  <button id="msg-btn">Send</button>
</div>
<div id="ws-msg"></div>
<script>
  const msgContainer = document.getElementById('ws-msg');
  const msgSenderInput = document.getElementById('msg-input');
  const msgSenderButton = document.getElementById('msg-btn');
  const ws = new WebSocket('ws://localhost:3030/ws');

  /**
   * @param {MessageEvent<any>} e
   */
  const onMessage = e => {
    console.log(`Client received ${e.data}`);
    msgContainer.innerHTML += `<p>[FROM SERVER] ${e.data}`;
  };

  ws.addEventListener('message', onMessage);

  msgSenderButton.addEventListener('click', () => {
    ws.send(msgSenderInput.value);
  });
</script>
```
