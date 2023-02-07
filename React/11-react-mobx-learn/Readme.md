## 本 Demo 采用 mobx + mobx-react-lite

# 在 Vite + React-TS 环境下启用装饰器语法

## 1. 安装依赖

`npm i -D @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
`

## 2. 配置 vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // babel 的装饰器要在 react 插件内部使用
      babel: {
        plugins: [
          ["@babel/plugin-proposal-class-properties", { loose: true }],
          ["@babel/plugin-proposal-decorators", { legacy: true }],
        ],
      },
    }),
  ],
});
```

## 3. 配置 tsconfig.json

```json
{
  "compilerOptions": {
    ....
    "experimentalDecorators": true,
  },
  ...

```

## 4. Test and Enjoy

```tsx
// App.tsx
const decor: (color: string) => MethodDecorator = (color) => {
  return function (target, key, desc) {
    console.log(color);
  };
};

class Test {
  @decor("red")
  foo() {}
}

new Test().foo(); // log: red
```
