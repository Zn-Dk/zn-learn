# sz/rz - Linux 上传文件和下载文件命令



### 准备

使用工具：SecureCRT 或 Xshell

### 安装lrzsz（zmodem）

安装lrzsz软件，root权限下。

- 对于CentOS系统：

```bash
yum -y install lrzsz
```

- 对于debian系统：

```bash
apt-get install lrzsz
```

### 使用rz(receive)命令上传文件

rz 命令把文件从windows系统上传到linux系统中,

- 在SecureCRT或Xshell的命令行中，cd到你要放置上传文件的路径下，输入rz命令，

SecureCRT或者Xshell会弹出文件选择对话框，选择确定后就会上传到使用命令时所在的目录了。

> 此外，Xshell 还支持直接拖到文件到 Xshell 窗口，也可以直接上传。

- 或者在Transfer-Zmodem Upoad list弹出文件选择对话框，选好文件后按Add按钮。

然后OK窗口自动关闭。在linux下选中存放文件的目录，输入rz命令,上传完成。



### 使用sz(send)命令下载文件

使用sz命令，把文件从linux系统下载到windows系统中

在SecureCRT或Xshell的命令行中，输入：sz filename，

手动选择你要存放在windows的目录（比如桌面）。zmodem接收可以自行启动。

```bash
### 下载一个文件： 
sz filename 
### 下载多个文件： 
sz filename1 filename2
### 下载dir目录下的所有文件，不包含dir下的文件夹： 
sz dir/*
### 如果要连通子文件夹一起下载, 建议使用 tar 命令打包
tar -cvf dir.tar dir && sz dir.tar
```
