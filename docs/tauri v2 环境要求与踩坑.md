# Tauri v2 环境要求与踩坑记录

> 整理自一个 Tauri v2 + React + Vite 最小示例项目的 README，保留通用的环境配置与系统依赖经验。

## 技术栈

- 前端：React 19 + TypeScript + Vite
- 桌面端：Tauri v2（Rust）
- 包管理：pnpm

## 系统依赖（仅桌面构建需要）

- **Debian/Ubuntu**：

```bash
sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

- **Fedora/RHEL 9+**：

```bash
sudo dnf install webkit2gtk4.1-devel openssl-devel curl wget file libappindicator-gtk3-devel librsvg2-devel libxdo-devel
```

## 关键踩坑：webkit2gtk 必须是 4.1 API

Tauri v2 依赖 `webkit2gtk-4.1` API。**RHEL 8 系发行版（如 TencentOS Server 3.x）仓库仅提供 `webkit2gtk3`（4.0 API），不满足要求**，无法在这类系统上编译桌面端。

需要运行桌面端时，换用 Ubuntu 22.04+ / Fedora 36+ / RHEL 9 等具备 4.1 API 的环境。

## 常用脚本

```bash
pnpm install        # 安装前端依赖
pnpm dev            # 仅启动前端开发服务器（浏览器预览，invoke 不可用）
pnpm build          # 构建前端到 dist/
pnpm tauri dev      # 启动 Tauri 桌面应用（热重载，需系统依赖）
pnpm tauri build    # 打包可执行文件 / 安装包（需系统依赖）
```

## 注意

- `pnpm dev` 纯浏览器预览时，Rust 端的 `invoke` 调用不可用，需要 `pnpm tauri dev` 才能验证前后端桥接。
- 前端通过 `@tauri-apps/api` 的 `invoke` 调用 Rust 端 `#[tauri::command]` 注册的命令。
