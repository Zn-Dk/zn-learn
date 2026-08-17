# GitHub SSH 克隆失败排障记录

## 一、问题背景

在 Linux 云服务器上配置 GitHub SSH：

- 本地已有 `/root/.ssh/id_ed25519` 私钥；
- 执行过 `ssh-add ~/.ssh/id_ed25519`；
- 已将 `/root/.ssh/id_ed25519.pub` 的内容添加到 GitHub 账号；
- 但是执行 `git clone` 或 `ssh -T git@github.com` 时连接失败。

## 二、最初的错误现象

执行：

```bash
ssh -T git@github.com
```

返回：

```text
kex_exchange_identification: Connection closed by remote host
```

进一步使用详细日志：

```bash
ssh -vT git@github.com
```

发现：

```text
Connecting to github.com [20.205.243.166] port 36000.
Connection established.
...
HTTP/1.1 502 Server UnReachable
proxy-agent: VM-135-10-centos
kex_exchange_identification: Connection closed by remote host
```

## 三、根因分析

这不是 SSH 密钥错误，而是网络连接地址被服务器环境中的 SSH 配置或代理改写了：

```text
本地服务器 → github.com:36000 → 云平台代理 → HTTP 502
```

SSH 协议需要先完成密钥交换，之后才会进行公钥认证。此时服务器返回的是 HTTP `502`，说明连接在 SSH 密钥认证之前就被关闭了，因此：

- `id_ed25519` 私钥本身没有问题；
- `id_ed25519.pub` 是否注册到 GitHub 不是当时的主要问题；
- `ssh-add` 也无法解决网络端口或代理问题。

## 四、解决方案：使用 GitHub SSH 的 443 端口

GitHub 提供了 `ssh.github.com:443` 作为 SSH 连接入口，可用于绕过网络对 TCP `22` 端口的限制。

先执行一次直接测试：

```bash
ssh -vvT \
  -p 443 \
  -o HostName=ssh.github.com \
  -o ProxyCommand=none \
  -o ProxyJump=none \
  -i ~/.ssh/id_ed25519 \
  -o IdentitiesOnly=yes \
  git@ssh.github.com
```

首次连接时可能出现主机指纹确认：

```text
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

确认指纹来自 GitHub 官方记录后输入：

```text
yes
```

本次排障中确认的 GitHub ECDSA 指纹为：

```text
SHA256:XXXXXXXXXXX
```

确认后，主机密钥会保存到：

```text
/root/.ssh/known_hosts
```

## 五、永久配置 SSH

编辑 SSH 用户配置文件：

```bash
vi /root/.ssh/config
```

添加：

```ssh
Host github.com
    HostName ssh.github.com
    User git
    Port 443
    IdentityFile /root/.ssh/id_ed25519
    IdentitiesOnly yes
```

设置权限：

```bash
chmod 700 /root/.ssh
chmod 600 /root/.ssh/config
chmod 600 /root/.ssh/id_ed25519
chmod 644 /root/.ssh/id_ed25519.pub
```

检查 SSH 最终采用的配置：

```bash
ssh -G github.com | egrep '^(hostname|port|user|identityfile|proxycommand|proxyjump) '
```

预期至少包含：

```text
hostname ssh.github.com
port 443
user git
identityfile /root/.ssh/id_ed25519
```

如果系统配置中存在类似以下内容：

```ssh
Host *
    Port 36000
```

应确保 `Host github.com` 配置位于它之前。OpenSSH 对同一配置项通常采用先匹配到的值，因此配置顺序可能影响最终结果。

## 六、验证认证是否成功

执行：

```bash
ssh -T git@github.com
```

成功结果类似：

```text
Hi Zn-Dk! You've successfully authenticated, but GitHub does not provide shell access.
```

这句话表示：

- 已经连接到 GitHub；
- GitHub 已识别当前 SSH 公钥；
- 公钥对应的账号是 `Zn-Dk`；
- GitHub 不提供交互式 Shell，因此提示不提供 shell access 是正常的。

`ssh -T` 最后显示 `Exit status 1` 也通常是正常现象，因为 GitHub 仅用于 Git 操作，不提供 Shell 会话。

## 七、执行克隆

使用 SSH 地址克隆：

```bash
git clone git@github.com:OWNER/REPOSITORY.git
```

例如：

```bash
git clone git@github.com:octocat/Hello-World.git
```

不要把 HTTPS 地址和 SSH 配置混用：

```bash
# SSH 地址
git@github.com:OWNER/REPOSITORY.git

# HTTPS 地址
https://github.com/OWNER/REPOSITORY.git
```

如果本地仓库已经存在，可修改远程地址：

```bash
git remote set-url origin git@github.com:OWNER/REPOSITORY.git
```

## 八、只对单次克隆使用 443 端口

如果不希望修改 `/root/.ssh/config`，可以只为本次命令指定 SSH 参数：

```bash
GIT_SSH_COMMAND='ssh -o HostName=ssh.github.com -p 443 -i /root/.ssh/id_ed25519 -o IdentitiesOnly=yes' \
  git clone git@github.com:OWNER/REPOSITORY.git
```

## 九、如果配置后 Git 仍然连接到 36000

检查 Git 是否设置了单独的 SSH 命令：

```bash
git config --show-origin --get core.sshCommand
```

如果输出包含错误端口或代理配置，删除全局设置：

```bash
git config --global --unset core.sshCommand
```

检查是否存在环境变量覆盖：

```bash
env | grep '^GIT_SSH'
```

也可以查看 Git 实际执行的 SSH 过程：

```bash
GIT_TRACE=1 GIT_SSH_COMMAND='ssh -v' \
  git clone git@github.com:OWNER/REPOSITORY.git
```

重点确认日志中的目标是否为：

```text
ssh.github.com ... port 443
```

而不是：

```text
github.com ... port 36000
```

## 十、各步骤分别解决什么问题

| 步骤 | 作用 |
|---|---|
| 生成 `id_ed25519` | 生成本地 SSH 私钥和公钥 |
| `ssh-add ~/.ssh/id_ed25519` | 将私钥加载到本机 `ssh-agent`，供 SSH 使用 |
| 向 GitHub 添加 `.pub` 文件 | 授权 GitHub 识别对应的公钥 |
| 首次输入 `yes` | 信任并保存 GitHub 服务器的主机密钥 |
| 配置 `/root/.ssh/config` | 指定 GitHub 的实际主机、端口和私钥 |
| `ssh -T git@github.com` | 验证 SSH 网络和 GitHub 账号认证 |
| `git clone git@github.com:...` | 使用 SSH 协议克隆仓库 |

## 十一、为什么官方教程没有提到 `config`

GitHub 官方教程通常假设：

```text
本机 → github.com:22 → GitHub
```

在这种标准网络环境下，只需要：

1. 生成 SSH 密钥；
2. 加载私钥；
3. 将公钥添加到 GitHub；
4. 使用 SSH 地址进行 Git 操作。

本次云服务器的实际情况是：

```text
本机 → github.com:36000 → 云平台代理
```

服务器出口网络或预置 SSH 配置改变了默认端口，代理又返回了 HTTP `502`。因此，在官方密钥配置流程之外，还需要通过 `/root/.ssh/config` 将 GitHub 映射到 `ssh.github.com:443`。

这属于**网络环境差异**，不是 GitHub SSH 认证流程发生了变化。

## 十二、排障结论

本次问题最终分为两个阶段：

1. **网络阶段**：`github.com:36000` 返回 HTTP `502`，需要改用 `ssh.github.com:443`；
2. **认证阶段**：公钥认证成功，GitHub 返回 `Hi Zn-Dk!`，说明密钥和账号配置正确。

以后遇到类似问题，应先区分：

- 是否能建立 SSH 连接；
- 是否能完成 SSH 密钥交换；
- 是否能完成公钥认证；
- Git 使用的远程地址是否确实是 SSH 地址。

不要在网络连接尚未成功时反复生成密钥或重复注册公钥。

## 十三、安全注意事项

- 只能将 `id_ed25519.pub` 添加到 GitHub；
- 绝不能泄露 `id_ed25519` 私钥；
- 不要把包含私钥内容的日志、文件或截图发给他人；
- 首次连接时应核对 GitHub 官方主机指纹；
- 私有仓库还需要当前 GitHub 账号具备仓库访问权限。
