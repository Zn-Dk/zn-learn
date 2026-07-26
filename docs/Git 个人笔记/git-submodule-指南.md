# Git Submodule 实践指南

## 目录
1. [核心概念](#核心概念)
2. [基础操作](#基础操作)
3. [开发范式](#开发范式)
4. [常见问题与解决方案](#常见问题与解决方案)
5. [最佳实践](#最佳实践)

---

## 核心概念

### 什么是 Submodule

Git Submodule 允许你将一个 Git 仓库作为另一个 Git 仓库的子目录，同时保持两个仓库的独立性。父仓库只记录子仓库的**特定 commit 引用**，而非全部内容。

### 关键特性

| 特性 | 说明 |
|------|------|
| 独立版本控制 | 每个 submodule 有自己的 git 历史 |
| 固定引用 | 父仓库记录子模块的特定 commit（非分支） |
| `.gitmodules` | 存储 submodule 配置信息的文件 |
| 显式更新 | submodule 不会自动更新，需手动同步 |

### 适用场景

- ✅ 多项目共享公共库/组件
- ✅ 引入第三方依赖并需要修改
- ✅ 大型项目模块化拆分
- ❌ 频繁变更的紧耦合代码（考虑 monorepo）

---

## 基础操作

### 1. 添加 Submodule

```bash
# 添加子模块
git submodule add <repository-url> <path>

# 示例
git submodule add https://github.com/user/lib.git libs/common

# 指定分支
git submodule add -b main <repository-url> <path>
```

添加后会生成/修改：
- `.gitmodules` 文件
- 子模块目录（含子仓库内容）

### 2. 克隆包含 Submodule 的项目

```bash
# 方式一：克隆后初始化
git clone <parent-repo-url>
cd <parent-repo>
git submodule init
git submodule update

# 方式二：递归克隆（推荐）
git clone --recurse-submodules <parent-repo-url>

# 方式三：已克隆但忘记递归
git submodule update --init --recursive
```

### 3. 更新 Submodule

```bash
# 拉取子模块最新提交（远程分支）
git submodule update --remote

# 更新特定子模块
git submodule update --remote <path>

# 更新到 .gitmodules 记录的提交
git submodule update
```

### 4. 查看 Submodule 状态

```bash
# 查看所有子模块状态
git submodule status

# 查看子模块概要
git submodule summary
```

### 5. 删除 Submodule

```bash
# 1. 取消初始化
git submodule deinit -f <path>

# 2. 删除 git 内部记录
rm -rf .git/modules/<path>

# 3. 从工作区移除
git rm -f <path>

# 4. 提交更改
git commit -m "Remove submodule <path>"
```

---

## 开发范式

### 范式一：只读依赖模式

**适用**：使用第三方库，无需修改源码

```bash
# 团队约定：只更新引用，不修改子模块内容
# 更新子模块到最新稳定版本
cd libs/common
git checkout v2.1.0
cd ../..
git add libs/common
git commit -m "Update common lib to v2.1.0"
```

**原则**：
- 子模块始终指向明确的 tag 或 commit
- 禁止在父仓库中直接修改子模块代码

### 范式二：双向开发模式

**适用**：同时开发父项目和子模块

```bash
# 1. 进入子模块并切换到工作分支
cd libs/common
git checkout develop  # 关键：切换到分支而非游离 HEAD

# 2. 修改并提交子模块
# ... 编辑代码 ...
git add .
git commit -m "Add new feature"
git push origin develop

# 3. 返回父仓库更新引用
cd ../..
git add libs/common
git commit -m "Update common lib reference"
git push
```

**关键点**：submodule 默认处于 **detached HEAD** 状态，务必先 checkout 到分支再开发。

### 范式三：功能分支联动模式

**适用**：父项目与子模块需协同开发新功能

```bash
# 父仓库创建功能分支
git checkout -b feature/new-ui

# 子模块也创建对应分支
cd libs/common
git checkout -b feature/new-ui
# ... 开发 ...
git push -u origin feature/new-ui

# 返回父仓库
cd ../..
git add libs/common
git commit -m "WIP: new-ui with updated common lib"
git push -u origin feature/new-ui
```

### 开发流程图

```
┌─────────────────────────────────────────────┐
│              开始开发任务                       │
└──────────────────┬──────────────────────────┘
                   │
          ┌────────▼────────┐
          │  是否修改子模块?  │
          └────┬───────┬────┘
               │ 否     │ 是
      ┌────────▼──┐  ┌──▼──────────────┐
      │ 只读依赖   │  │ 进入子模块目录    │
      │ 更新引用   │  │ checkout 分支    │
      └───────────┘  └──┬──────────────┘
                        │
                 ┌──────▼──────┐
                 │ 修改并提交    │
                 │ push 子模块   │
                 └──────┬──────┘
                        │
                 ┌──────▼──────────┐
                 │ 父仓库更新引用     │
                 │ commit & push    │
                 └─────────────────┘
```

---

## 常见问题与解决方案

### 问题 1：Detached HEAD 状态

**现象**：进入子模块后处于游离头指针状态

```bash
# 检查状态
cd <submodule>
git status  # 显示 "HEAD detached at xxxx"

# 解决：切换到分支
git checkout main
```

### 问题 2：子模块内容为空

**现象**：克隆后子模块目录是空的

```bash
# 解决
git submodule update --init --recursive
```

### 问题 3：子模块引用冲突

**现象**：合并时出现子模块 commit 冲突

```bash
# 查看冲突的子模块指向
git diff

# 手动选择正确的 commit
cd <submodule>
git checkout <correct-commit>
cd ..
git add <submodule>
git commit
```

### 问题 4：忘记推送子模块

**现象**：父仓库引用了子模块中未推送的 commit

```bash
# 推送时检查子模块
git push --recurse-submodules=check

# 自动推送子模块
git push --recurse-submodules=on-demand
```

### 问题 5：子模块 URL 变更

```bash
# 修改 .gitmodules 中的 URL 后同步
git submodule sync
git submodule update --init --recursive
```

---

## 最佳实践

### 1. 配置全局默认行为

```bash
# 使 status/diff 显示子模块摘要
git config --global status.submoduleSummary true
git config --global diff.submodule log

# pull 时自动更新子模块
git config --global submodule.recurse true
```

### 2. 团队协作规范

```markdown
✅ DO（推荐做法）
- 提交前确认子模块已 push
- 使用 --recurse-submodules 克隆
- 子模块指向 tag 或明确的 commit
- 在 README 中说明子模块结构

❌ DON'T（避免做法）
- 在 detached HEAD 状态直接开发
- 提交父仓库前忘记推送子模块
- 随意变更子模块 URL
- 在父仓库中忽略子模块的变更
```

### 3. 便捷别名配置

```bash
# ~/.gitconfig 添加别名
[alias]
    # 更新所有子模块到远程最新
    subup = submodule update --remote --merge
    # 递归拉取
    pullall = !git pull && git submodule update --init --recursive
    # 查看子模块状态
    substatus = submodule status --recursive
```

### 4. CI/CD 集成

```yaml
# GitHub Actions 示例
steps:
  - uses: actions/checkout@v4
    with:
      submodules: recursive  # 递归检出子模块
      token: ${{ secrets.PAT }}  # 私有子模块需要 token
```

```yaml
# GitLab CI 示例
variables:
  GIT_SUBMODULE_STRATEGY: recursive
```

### 5. 版本锁定策略

| 策略 | 命令 | 适用场景 |
|------|------|---------|
| 锁定 commit | `git checkout <hash>` | 生产环境稳定性 |
| 锁定 tag | `git checkout v1.0.0` | 版本化发布 |
| 跟踪分支 | `submodule.branch` 配置 | 持续集成开发 |

### 6. 推荐工作流总结

```bash
# 日常开发标准流程
git pull                                    # 更新父仓库
git submodule update --init --recursive     # 同步子模块

# 修改子模块前
cd <submodule> && git checkout <branch>     # 切换分支

# 提交流程
# 1. 先提交并推送子模块
cd <submodule>
git add . && git commit -m "..." && git push

# 2. 再提交父仓库引用
cd ..
git add <submodule>
git commit -m "Update submodule" 
git push --recurse-submodules=on-demand     # 确保子模块已推送
```

---

## 快速参考卡

```bash
# === 克隆 ===
git clone --recurse-submodules <url>

# === 初始化（已克隆）===
git submodule update --init --recursive

# === 更新到远程最新 ===
git submodule update --remote

# === 添加 ===
git submodule add <url> <path>

# === 删除 ===
git submodule deinit -f <path>
git rm -f <path>
rm -rf .git/modules/<path>

# === 状态检查 ===
git submodule status
```

---

> **核心心法**：Submodule 的本质是父仓库记录子仓库的**指针（commit）**。所有操作围绕"更新指针"和"同步内容"两件事展开。牢记先推子模块、再推父仓库的顺序，即可避免大部分协作问题。