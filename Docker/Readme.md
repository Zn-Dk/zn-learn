# docker 常用命令以及基本工作流

## docker 常用命令

- 登录 docker 仓库

  ```bash
  docker login [OPTIONS] [SERVER]
  # OPTIONS
  #  -p, --password 密码  / --password-stdin 通过控制台输密码
  #  -u, --username 用户名
  ```

- 构建镜像

  ```bash
  docker build -t[格式为 名称[:版本号]] [DockerFile 存放 PATH|URL|-]
  ```

- 查看本地已构建的镜像

  ```bash
  docker images
  ```

- 添加容器

  ```bash
  docker run [OPTIONS] 镜像名称
  ```

  例如

  ```bash
  docker run -p 8080:80 --name hello -d example
  ```

  ```bash
  docker run -p 8080:80 --name hello -dit foobar /bin/bash
  ```

  > - 启动 example 这个容器使用 0:0:0:0:8080 端口(当前主机), 映射到内部端口 80,指定容器名称为 hello, -d 保持容器在后台持续运行
  > - 如果容器启动失败(比如 docker ps 是空的, 而且 ps -a 查看容器并未在运行 比如 Exit(1) 的状态),改成 docker run -dit /bin/bash 然后 exec 进入后台查看

- 查看进程

  ```bash
  docker ps [-a]
  ```

  可以在列表中看到容器的 [name] (如果 docker run 参数没有提供 name, 默认会随机一个)

- 启动和停止容器 (真正的启动)

  ```bash
  docker start | stop [name]
  ```

- 查看容器的日志

  ```bash
  docker logs [name] [-f 启用日志的监听模式]
  ```

- 进入容器内部 调用 bash

  ```bash
  docker exec -it [name] /bin/sh
  ```

- 卸载容器

  ```bash
  docker rm [name]
  ```

- 卸载镜像
  ```bash
  docker rmi [name]
  ```

## 推送镜像的基本流程

1. 创建镜像仓库 (docker hub / 私有 docker 仓库) 得到一个仓库名如 foo/bar

   > 这一步你可能需要 docker login 登录

2. 这个时候如果运行 docker push (推送) 会报错(因为本地镜像还没有和这个远程仓库关联)

3. 使用命令 `docker tag [本地镜像[tag]名] [远程镜像仓库地址][:tag]`

4. `docker push [远程镜像仓库地址][:tag]`

5. Done! (尝试删掉本地的远程镜像再 pull 看 CI/CD 是否正常)

## 使用 docker-compose.yml 进行自动化构建

### 启动

1. 比如我们现在的目录是 docker-test => 最终构建的镜像名称 docker-test-[serviceName]

2. 创建 docker-compose.yml

   > 查看 docker-compose.yml 示例 \
   > 更进阶的可以查看项目文件夹 docker-compose-full.yml

3. 运行 docker-compose up 自动化构建镜像和容器

```bash
    # 默认寻找 docker-compose.yml 也可以 -f 指定名称
    # 加 -d 在后台运行(不然会占用控制台)
   docker-compose up [-f docker-compose.yml] -d
```

> Additions: \
> 如果前一步已经将这个镜像上传仓库了 \
> 那么就可以在 docker-compose.yml 的原服务上加入 image 来源 \
> 例如 image: mirrors.foo.com/your_name/your_proj:1.0.0 \
> 这样就可以直接执行 up 命令 一并完成 1.远程仓库拉取 2.构建镜像服务 3.启动容器 三大操作

### 停止

1. 运行 down 命令 会一并结束进程和删除相应的容器

```bash
   docker-compose down [--rmi ]
```

### 其他说明

```bash
  docker-compose stop [serviceName]

  # 停止运行的service（可选）serviceName：表示停止某一个service

  docker-compose rm -f [serviceName]

  # 删除已停止的所有service （可选）serviceName：表示删除已停止某一个service（可以用docker-compose up重新构建service）
  # -f 强制删除

  docker-compose down -v
  #（相当于 stop + rm ）：停止并移除整个project的所有services
  # -v ：删除挂载卷和volume的链接

  docker-compose restart [serviceName]
  # 重启服务

  docker-compose config
  # 验证和查看compose文件

  docker-compose images
  # 列出所用的镜像

  docker-cpmpose scale
  # 设置服务个数 Eg：docker-compose scale web=2 worker=3

  docker-compose pause [serviceName]
  # 暂停服务

  docker-compose unpause [serviceName]
  # 恢复服务
```
