# pnpm Monorepo 依赖冲突解决实践指南

> 基于本项目 `tubrorepo-demo` 的 pnpm workspace monorepo 结构，以 **lodash** 为例，演示如何排查和解决子应用之间的依赖版本冲突。

## 目录

1. [项目结构概览](#1-项目结构概览)
2. [制造依赖冲突场景](#2-制造依赖冲突场景)
3. [使用 pnpm ls 排查依赖](#3-使用-pnpm-ls-排查依赖)
4. [解决方案一：pnpm overrides 统一版本](#4-解决方案一pnpm-overrides-统一版本)
5. [解决方案二：pnpm catalog 集中版本管理](#5-解决方案二pnpm-catalog-集中版本管理)
6. [解决方案三：peerDependencies 约束](#6-解决方案三peerdependencies-约束)
7. [验证与清理](#7-验证与清理)
8. [常见问题](#8-常见问题)

---

## 1. 项目结构概览

```
tubrorepo-demo/
├── apps/
│   ├── web/          # Next.js web app (port 3000)
│   └── docs/         # Next.js docs app (port 3001)
├── packages/
│   ├── ui/           # shared UI components (@repo/ui)
│   ├── eslint-config/
│   └── typescript-config/
├── package.json          # root package.json
├── pnpm-workspace.yaml   # workspace 配置
└── pnpm-lock.yaml
```

当前 `pnpm-workspace.yaml` 内容：

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

---

## 2. 制造依赖冲突场景

我们故意让 `web` 和 `docs` 依赖不同版本的 lodash：

### Step 1: 给 web 安装 lodash@4.17.21

```bash
# 在根目录执行，--filter 指定子应用
pnpm add lodash@4.17.21 --filter web
pnpm add -D @types/lodash --filter web
```

### Step 2: 给 docs 安装 lodash@4.17.15 (旧版本)

```bash
pnpm add lodash@4.17.15 --filter docs
pnpm add -D @types/lodash --filter docs
```

### Step 3: 给 shared package (ui) 也安装一个版本

```bash
pnpm add lodash@4.17.19 --filter @repo/ui
```

此时，三个 workspace 分别依赖了不同版本的 lodash：

- `web` → `lodash@4.17.21`
- `docs` → `lodash@4.17.15`
- `@repo/ui` → `lodash@4.17.19`

---

## 3. 使用 pnpm ls 排查依赖

### 3.1 查看某个子应用的依赖树

```bash
# 查看 web 应用的 lodash 依赖
pnpm ls lodash --filter web

# 查看 docs 应用的 lodash 依赖
pnpm ls lodash --filter docs

# 查看 ui 包的 lodash 依赖
pnpm ls lodash --filter @repo/ui
```

### 3.2 查看整个 workspace 的某个依赖

```bash
# 查看所有 workspace 中 lodash 的版本分布（最常用！）
pnpm ls lodash -r

# 输出示例：
# web@0.1.0 /path/to/tubrorepo-demo/apps/web
# dependencies:
# lodash 4.17.21
#
# docs@0.1.0 /path/to/tubrorepo-demo/apps/docs
# dependencies:
# lodash 4.17.15
#
# @repo/ui@0.0.0 /path/to/tubrorepo-demo/packages/ui
# dependencies:
# lodash 4.17.19
```

### 3.3 查看依赖深度（递归依赖）

```bash
# 查看完整依赖树（包含子依赖），深度为 2
pnpm ls lodash -r --depth 2

# 只看直接依赖（depth=0）
pnpm ls lodash -r --depth 0
```

### 3.4 以 JSON 格式输出（方便脚本处理）

```bash
pnpm ls lodash -r --json
```

### 3.5 查看为什么安装了某个包

```bash
# 找出哪些包依赖了 lodash
pnpm why lodash -r
```

---

## 4. 解决方案一：pnpm overrides 统一版本

**适用场景**：强制整个 monorepo 使用统一版本的某个依赖。

### 编辑根目录 `package.json`

在根目录的 `package.json` 中添加 `pnpm.overrides` 字段：

```jsonc
{
  "name": "tubrorepo-demo",
  "private": true,
  // ... 其他字段保持不变 ...
  "pnpm": {
    "overrides": {
      // 强制所有 workspace 使用 lodash 4.17.21
      "lodash": "4.17.21",
    },
  },
}
```

### 应用 overrides

```bash
# 重新安装依赖，overrides 会生效
pnpm install

# 验证：所有 workspace 的 lodash 版本应该统一
pnpm ls lodash -r
```

### overrides 的高级用法

```jsonc
{
  "pnpm": {
    "overrides": {
      // 1. 精确版本
      "lodash": "4.17.21",

      // 2. 版本范围
      "lodash": ">=4.17.20",

      // 3. 只覆盖特定包的依赖（仅覆盖 some-pkg 内部的 lodash）
      "some-pkg>lodash": "4.17.21",

      // 4. 替换为另一个包（例如用 lodash-es 替换 lodash）
      "lodash": "npm:lodash-es@4.17.21",

      // 5. 链接到 workspace 中的本地包
      "some-shared-lib": "workspace:*",
    },
  },
}
```

### ⚠️ 注意事项

- `overrides` 只能在 **根目录** `package.json` 中定义
- 修改后必须重新运行 `pnpm install`
- overrides 会影响 **所有 workspace**，包括子依赖（transitive dependencies）
- 锁文件 `pnpm-lock.yaml` 会同步更新

---

## 5. 解决方案二：pnpm catalog 集中版本管理

> 需要 pnpm v9.5.0+

**适用场景**：统一管理 monorepo 中各包的依赖版本声明，确保大家在 `package.json` 中引用的版本一致。

### 编辑 `pnpm-workspace.yaml`

```yaml
packages:
  - 'apps/*'
  - 'packages/*'

catalog:
  lodash: '4.17.21'
  react: '^19.2.0'
  react-dom: '^19.2.0'
```

### 在子应用中使用 catalog 版本

```jsonc
// apps/web/package.json
{
  "dependencies": {
    "lodash": "catalog:"   // 自动解析为 catalog 中定义的 4.17.21
  }
}

// apps/docs/package.json
{
  "dependencies": {
    "lodash": "catalog:"   // 同样解析为 4.17.21
  }
}
```

### 安装并验证

```bash
pnpm install
pnpm ls lodash -r
```

### catalog vs overrides 对比

| 特性           | `pnpm.overrides`              | `catalog`                        |
| -------------- | ----------------------------- | -------------------------------- |
| 定义位置       | 根 `package.json`             | `pnpm-workspace.yaml`            |
| 作用范围       | 强制覆盖所有（含 transitive） | 仅影响显式声明 `catalog:` 的地方 |
| 子依赖控制     | ✅ 可以覆盖深层依赖           | ❌ 不能控制 transitive 依赖      |
| 灵活性         | 强制统一                      | 协商式统一                       |
| 最小 pnpm 版本 | v7+                           | v9.5.0+                          |

---

## 6. 解决方案三：peerDependencies 约束

**适用场景**：shared package 不自带依赖，而是要求宿主应用提供。

### 修改 `packages/ui/package.json`

```jsonc
{
  "name": "@repo/ui",
  // 把 lodash 从 dependencies 移到 peerDependencies
  "peerDependencies": {
    "lodash": ">=4.17.20",
  },
  "devDependencies": {
    // 开发时仍需要，用于类型检查和测试
    "lodash": "4.17.21",
  },
}
```

这样 `@repo/ui` 会使用宿主应用（web/docs）提供的 lodash 版本，避免打包多个版本。

---

## 7. 验证与清理

### 7.1 验证版本统一

```bash
# 确认所有 workspace 中 lodash 版本一致
pnpm ls lodash -r --depth 0

# 用 why 确认没有其他来源引入旧版本
pnpm why lodash -r
```

### 7.2 清理缓存并重新安装

```bash
# 清理 node_modules 并重新安装
pnpm store prune            # 清理 pnpm store 中无用的包
rm -rf node_modules          # 删除根 node_modules
pnpm -r exec rm -rf node_modules  # 删除所有 workspace 的 node_modules
pnpm install                 # 重新安装
```

### 7.3 检查锁文件中的版本

```bash
# 在 pnpm-lock.yaml 中搜索 lodash 版本
grep "lodash" pnpm-lock.yaml | head -20
```

### 7.4 实验完成后清理 lodash

```bash
# 从各子应用移除 lodash
pnpm remove lodash --filter web
pnpm remove lodash --filter docs
pnpm remove lodash --filter @repo/ui
pnpm remove -D @types/lodash --filter web
pnpm remove -D @types/lodash --filter docs

# 如果添加了 overrides，也要从根 package.json 中手动移除 pnpm.overrides 字段
```

---

## 8. 常见问题

### Q1: overrides 和各子应用 package.json 中的版本号不一致，以谁为准？

**以 overrides 为准。** overrides 的优先级最高，即使 `apps/docs/package.json` 写了 `"lodash": "4.17.15"`，实际安装的也是 overrides 中指定的版本。

### Q2: pnpm 的 overrides 和 npm 的 overrides / yarn 的 resolutions 有什么区别？

| 包管理器 | 字段名           | 定义位置          |
| -------- | ---------------- | ----------------- |
| pnpm     | `pnpm.overrides` | 根 `package.json` |
| npm      | `overrides`      | 根 `package.json` |
| yarn     | `resolutions`    | 根 `package.json` |

语法略有不同，但核心功能一致：**强制指定某个依赖的版本**。

### Q3: 如何只覆盖某个子应用的依赖，而不是全局？

pnpm overrides 是全局的。如果只想让某个子应用使用特定版本，直接在该子应用的 `package.json` 中写精确版本即可：

```jsonc
// apps/web/package.json
{
  "dependencies": {
    "lodash": "4.17.21", // 精确版本，不用 ^ 或 ~
  },
}
```

### Q4: 依赖 A 内部用了 lodash@3，但我项目用 lodash@4，overrides 会破坏 A 吗？

**有可能。** overrides 是强制覆盖，包括 transitive 依赖。如果某个第三方库内部依赖了 lodash@3 并使用了 v3 特有的 API，强制升级到 v4 可能导致 runtime error。建议：

1. 先查看那个第三方库的 changelog，确认是否兼容
2. 使用 `"package-name>lodash": "3.x"` 语法单独保留该包的 lodash 版本

### Q5: 如何查看 pnpm store 中实际存储了几个版本的 lodash？

```bash
pnpm store list | grep lodash
```

---

## 快速参考：常用命令速查表

| 命令                                  | 用途                               |
| ------------------------------------- | ---------------------------------- |
| `pnpm ls <pkg> -r`                    | 查看所有 workspace 中某依赖的版本  |
| `pnpm ls <pkg> --filter <app>`        | 查看指定子应用的某依赖版本         |
| `pnpm ls -r --depth 0`                | 查看所有直接依赖                   |
| `pnpm ls -r --json`                   | JSON 格式输出依赖信息              |
| `pnpm why <pkg> -r`                   | 查看为什么安装了某个包             |
| `pnpm add <pkg>@<ver> --filter <app>` | 给指定子应用安装特定版本           |
| `pnpm remove <pkg> --filter <app>`    | 从指定子应用移除依赖               |
| `pnpm install`                        | 重新安装（应用 overrides 等变更）  |
| `pnpm -r exec rm -rf node_modules`    | 清理所有 workspace 的 node_modules |
| `pnpm store prune`                    | 清理 pnpm store 中未引用的包       |
