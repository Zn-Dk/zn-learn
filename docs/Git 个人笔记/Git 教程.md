[https://www.liaoxuefeng.com/wiki/896043488029600/](https://www.liaoxuefeng.com/wiki/896043488029600/)


# 自我学习总结


右键 - `open git bash here`

## 个人信息配置(首次commit 前会询问)

```bash
git config --global user.email "qiu5873@gmail.com"
git config --global user.name  "zn_dk"
```

![image](assets/image-20220905220220-tgb8kb7.png)


## git init

Git 使用 **git init** 命令来初始化一个 Git 仓库，Git 的很多命令都需要在 Git 的仓库中运行，所以 **git init** 是使用 Git 的第一个命令。

在执行完成 **git init** 命令后，Git 仓库会生成一个 .git 目录，该目录包含了资源的所有元数据，其他的项目目录保持不变。

### 使用方法

使用当前目录作为 Git 仓库，我们只需使它初始化。

```
git init
```

该命令执行完后会在当前目录生成一个 .git 目录。

使用我们指定目录作为Git仓库。

```
git init newrepo
```

初始化后，会在 newrepo 目录下会出现一个名为 .git 的目录，所有 Git 需要的数据和资源都存放在这个目录中。

## status

查看当前仓库状态 (包括未跟踪待 commit 的文件等)

```shell
git status
```

## remote

```shell
git remote // 查看当前远程库名称
```

### 查看状态

```shell
git remote -v // 查看远程库状态
```

典型的示例:

```shell
> git remote -v
origin  git@github.com:Zn-Dk/branch-test.git (fetch)
origin  git@github.com:Zn-Dk/branch-test.git (push)

```

- 这便是在告诉你, 现在你要pull/push 等操作的库, 对应名称是 `origin` 以及相应的地址, 比如 `git push origin master` 就是在 `origin` 库的 `master` 分支上做操作。

(在同时有其他远程库,比如 Gitee Github 共存的时候起好名字区分是有必要的)

### 添加远程库

```shell
git remote add <name> <url> 
```

添加一个 <name> 的远程库, 远程库地址为 <url>

比如:

```shell
git remote add github git:xxxxx
```

后续操作:

```shell
git push github <branch-name> ...
```

### 移除远程库

```shell
git remote remove <name>
```




## clone

将仓库的内容拉取到本地, .git 地址从托管库中获取

```bash
git clone "https://XXXX.git"
```

## push/pull

将本地仓库的代码推送到远程仓库 origin

```bash
git push origin main(github)/master(gitee)
```

从远程仓库拉取最新代码(本地已有版本库,非公开库需要输入用户名密码)

```bash
git pull origin main(github)/master(gitee)
```


## add/commit


**git add** 命令可将该文件添加到暂存区。

添加一个或多个文件到暂存区：

```
git add [file1] [file2] ...
```

添加指定目录到暂存区，包括子目录：

```
git add [dir]
```

添加当前目录下的所有文件到暂存区：

```
git add .
```

以上命令将目录下以 .c 结尾及 README 文件提交到仓库中。

> **注：** 在 Linux 系统中，commit 信息使用单引号 **'**，Windows 系统，commit 信息使用双引号 **"**。
>
> 所以在 git bash 中 **git commit -m '提交说明'** 这样是可以的，在 Windows 命令行中就要使用双引号 **git commit -m "提交说明"**。
>


例子  本地文件更新之后 执行的顺序

```bash
git add .  
git commit -m "commit的注释写在这里"
git push origin main
```



## 版本追溯 reset 

![image-20220906155326814](assets\image-20220906155326814.png)

![image-20220906155339551](assets\image-20220906155339551.png)在仓库网页上可以看到项目提交的历史记录和浏览历史版本文件



如果需要在本地回溯之前的版本 需要使用 `reset` 命令

```
git reset --hard <version>
```



首先复制好想要还原的版本号 比如图上的 5d0e479....

```
git reset --hard 5d0e479cfcdae5aa49f71e06ea94fb40b7498f5b
```

> 如果想要返回最新的版本 输入最新版本的版本号即可



>#### 总结
>
>1. commit 之后 本地文件是否删除都可以通过版本追溯找回
>2. 团队开发时 commit 备注一定要写清楚 方便追溯.
>3. 开发项目过程中, 每天至少 commit 一次.(保险 防丢失)



## 分支branch

### 查看所有分支

```shell
git branch   // 列出所有本地分支

git branch -r  // 列出所有远程分支

git branch -a  // 列出所有本地和远程分支

git branch -v // 查看所属分支 commit ID message
```

### 分支管理

```shell
git branch <name>(分支名)
git branch -d 分支名    删除指定分支
```

### 切换分支

```shell
git checkout develop // 切换到刚才的 develop
```



- 完成后续操作之后, 在该分支下对文件的更改就会被记录到新分支中正常的 add commit push

  > 注意后续 pull/push 是从/到 **origin develop**

  ```bash
  git push origin develop:develop
  ```

  

- 如果切换回原有 master/main 分支 则新分支的文件会不可见(物理上也是)



### 合并分支 merge

#### 合并到master/main

先 checkout 切换到master/main

执行以下:

```shell
git merge <分支名>
git push origin master/main
```

在项目正式完成开发后, dev 分支的文件需要和原始的文件进行合并, 新增的文件会自动添加.

#### 合并其他分支

 但是如果项目由不同开发组开发(假定devA devB),devA devB要先合并到dev,再提交到master, 如果有版本冲突, 需要A B组人员沟通核实确认后, 选择一个版本进行覆盖

```bash
git checkout devA
git merge devB
...冲突 解决后 merge
git checkout dev
git merge devA/devB
....
git checkout master
git merge dev

```



## 配置公钥免密推送SSH

1. 生成公钥

   ```bash
   ssh-keygen -t rsa
   //一路回车
   //生成的目录  C盘用户文件夹\.ssh
   ```

   

2. 复制公钥文件 id_rsa.pub  (id_rsa 为私钥)

3. 复制公钥到 gitee 添加 SSH 公钥

4. done 可以免密提交了

5. 免密的克隆 不使用 HTTPS 可以使用 SSH 链接 





## 代理

有些时候由于连不上git服务器而我们又需要推送代码，这时就需要设定git代理服务器。


### 1，http和https代理


如果说使用的是项目http或者https地址，就配置http与https代理即可，输入以下命令：

```bash
git config --global http.proxy "socks5://地址:端口"
git config --global https.proxy "socks5://地址:端口"
```


例如设定本地代理：

```bash
git config --global http.proxy "socks5://127.0.0.1:7890"
git config --global https.proxy "socks5://127.0.0.1:7890"
```


这样使用git clone/push/pull所有http或者https地址项目都会走代理。

还可以使用下面命令取消代理设置：

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 2，ssh代理设定


如果说项目使用的ssh地址，那么就需要配置ssh代理。

我们需要编辑ssh的配置文件，位于用户文件夹下的.ssh文件夹下。

Windows ssh配置文件路径：`C:\Users\你的用户名.ssh\config`

Linux ssh配置文件路径：`/home/你的用户名/.ssh/config`

使用文本编辑器打开配置文件config加入下列配置：

`ProxyCommand connect -S 代理地址:端口 %h %p`  
如果说.ssh文件夹不存在或者config文件不存在就自己创建一个。

配置好了，ssh就会走代理了。

上面是配置全局走代理，事实上一般只需要为指定网址配置代理，例如只为github配置代理，就在配置文件加入：

```bash
Host github.com
	ProxyCommand connect -S 代理地址:端口 %h %p
```


Host后面接的就是指定要走代理的地址，可以接多个地址例如：

```bash
Host github.com gitlab.com
	ProxyCommand connect -S 代理地址:端口 %h %p
```


可见多个地址使用空格隔开放在Host后面即可，这个例子就是同时指定ssh访问github和gitlab时走代理。


例如配置ssh访问github走本地代理：

```bash
Host github.com
	ProxyCommand connect -S 127.0.0.1:1080 %h %p
```





## prune

根据官方的解释，直白一点的翻译就是删除 git 数据库中不可访问的对象，那我的理解是这样的，git prune删除的是你本地 .git 下的 object 目录下，没有被使用到的 hash 值，我理解的是它会删除 origin/xx 开头的没有用到的分支，这个分支在你的远程的 git 服务器中已经删除但是本地任然存在 origin/xxx 的映射，这个时候你就可以使用git prune来删除本地的 origin/xxx 的映射。

但是官方推荐使用的是 git gc，而想删除本地的 xxx 分支，就只能只用git branch -D XXX，

清除本地无用分支的shell :

```bash
git fetch --all --prune && git branch -vv | grep gone | awk '{ print $1 }' | grep -v pit | xargs git branch -D
```



作者：agatex
链接：https://www.jianshu.com/p/f215964f40a5
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
