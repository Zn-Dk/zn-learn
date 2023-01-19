# docker 常用命令


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

  > 启动 example 这个容器 挂载到 0:0:0:0:8080 端口(zhu), 映射到内部端口 80,
  > 指定容器名称为 hello, -d 保持容器在后台持续运行
  > 如果还是失败,改成 docker run -dit /bin/bash 然后 exec 进入后台查看

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
