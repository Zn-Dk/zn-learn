# 远程 SSH 开发机 + Expo Go 真机调试指南

## 适用场景

- Expo 项目运行在**远程 SSH 开发机**上（`expo start` 监听 8081）
- 本地电脑通过 **VSCode Remote-SSH** 连接开发机
- **手机与本地电脑连接同一个 WiFi**（同一局域网）
- 目标：手机上的 Expo Go 扫码即可访问 dev server

## 网络拓扑

```
手机(Expo Go)
  → exp://电脑局域网IP:8081
  → 本地电脑:8081 (ssh -L 0.0.0.0 转发)
  → 远程开发机:8081 (metro bundler)
```

## 两个核心障碍

1. **Expo 生成的 URL 含远程机 IP**：`exp://远程ip:8081`，手机在局域网里访问不到远程机
2. **VSCode 端口转发默认绑 localhost**：手机（局域网其他设备）访问不到本地转发的端口

> ⚠️ 实测 VSCode 的 Ports 面板**没有** Public/局域网可见切换选项（右键菜单仅有 Open in Browser / Change Local Address Port / Change Port Protocol 等，无 Port Visibility 项）。所以不能依赖 VSCode 转发暴露给局域网，需用 SSH 命令绑定 0.0.0.0 兜底。

## 解决步骤

### 1. 查本地电脑的局域网 IP

手机要访问的目标地址。
 (wifi 就找 wlan 适配器, 否则找 eth0)
```bash
# macOS
ipconfig getifaddr en0

# Linux
ip addr | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig /all 

```

假设得到 `192.168.1.100`。

### 2. SSH 端口转发（绑定 0.0.0.0 让局域网可访问）

```bash
ssh -L 0.0.0.0:8081:localhost:8081 user@远程开发机
```

`-L 0.0.0.0:8081:localhost:8081` 表示把远程机的 8081 转发到本地 8081，并绑定到所有网卡接口（0.0.0.0），这样局域网设备才能访问。

> 若同时用 VSCode Remote-SSH，可能与它的自动转发冲突，建议二者选一：要么停掉 VSCode 对 8081 的转发，要么干脆只用这条 ssh 命令做转发。

### 3. 用电脑局域网 IP 启动 Expo

在**远程开发机**上：

```bash
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.100 npx expo start
```

`REACT_NATIVE_PACKAGER_HOSTNAME` 环境变量让 Expo 生成的二维码 URL 使用该 IP，于是变成 `exp://192.168.1.100:8081`。手机扫码后请求到电脑的 8081，再由 SSH 转发到远程的 metro bundler。HMR 的 WebSocket 也走同一端口，一并打通。

### 4. 手机扫码

用 Expo Go 扫终端里的二维码即可。手机端无需任何代理 / VPN / hosts 设置。

## 停止 SSH 转发

### 前台运行（本指南的默认方式）

直接在运行 `ssh -L ...` 的终端里按 `Ctrl + C`，或输入 `exit` 退出 SSH 会话，转发随即停止。

### 后台运行（用了 `-f` 或 `&`）

```bash
# 查找转发进程
ps aux | grep "ssh -L"
# 或
pgrep -f "ssh -L 0.0.0.0:8081"

# 终止
kill <pid>
# 或一键终止匹配的进程
pkill -f "ssh -L 0.0.0.0:8081"
```

### 验证端口已释放

```bash
# macOS / Linux
lsof -i :8081
# 或 Linux
netstat -tlnp | grep 8081
```

无输出说明 8081 已不再监听，转发已停止。

### 同时停止远程 Expo

停止转发后，远程开发机上的 `expo start`（若仍开着）也应 `Ctrl + C` 停掉，避免 metro bundler 空跑（此时手机已连不上，留着无意义）。

### VSCode 自动转发的停止

若之前用了 VSCode 的 Ports 面板转发：右键 8081 → **Stop Forwarding Port**。

## 关键点

只要做好两件事即可打通：

1. **SSH 转发端口绑定 `0.0.0.0`**（而非默认 localhost）
2. **`REACT_NATIVE_PACKAGER_HOSTNAME` 设成电脑局域网 IP**

## 注意事项

- **防火墙**：本地电脑需放行 8081 的局域网入站（macOS 系统设置→网络→防火墙；Linux 看 `ufw` / `firewalld`）
- **IP 变动**：WiFi 重新分配 IP 后，`REACT_NATIVE_PACKAGER_HOSTNAME` 要跟着改，否则手机连不上
- **AP isolation（客户端隔离）**：部分公共 / 企业 WiFi 开启后会阻断同 WiFi 设备间通信，此时方案失效，只能换网络或用 tunnel
- **模拟器无触觉 / 振动硬件**：expo-haptics 等需真机测试
- **确认手机和电脑真在同一网段**：不是连了同名 WiFi 就一定同网段

## 替代方案：tunnel 模式

```bash
npx expo start --tunnel
```

通过 ngrok 建立公网隧道，手机直接扫码，无需端口转发。但：

- 远程机网络受限时可能装不了 `@expo/ngrok`
- 速度较慢，有延迟
- 适合网络环境复杂或跨网络时兜底

## 环境信息（本项目实测）

- Expo SDK 54 / React Native 0.81.5 / 新架构（newArchEnabled）
- 远程开发机：Linux
- 客户端：VSCode Remote-SSH + Expo Go（iOS / Android）
