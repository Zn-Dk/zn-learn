# 从 hub.docker.com 拉取 node 镜像并指定版本号
FROM node:14.21.2
# 工作目录
WORKDIR /code
# 环境配置 :端口
ENV PORT 80
# 进行复制操作
COPY package.json /code/package.json
# 运行命令
RUN npm install
# 复制所有文件
COPY . /code
# 运行镜像时触发的指令 (主体, 参数)
# CMD [ "node",'index.js' ] 这个方法不好用
CMD node index.js | tee app.log