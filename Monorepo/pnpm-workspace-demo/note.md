# monorepo 基础设置

1. 在工作空间根目录执行 pnpm init, 随后新建 pnpm-workspace.yaml 文件
2. 在 pnpm-workspace.yaml 文件中配置 packages 字段
2. 在工作空间根目录执行 pnpm i

> 这样一来, 所有子包的依赖都被安装到了工作空间根目录的 node_modules 中
> 子包内的 node_modules 只存在自身需要的依赖, 且所以依赖都是通过软链接 共享工作空间根目录的 node_modules

# monorepo 项目内部子包共享

> 假设我们有一个项目, 其中有一个子包 vue-proj, 我们希望 vue-proj 可以使用项目中的 common 包

1. 在子包的 package.json 中添加依赖, 格式为 "common": "workspace:^"
2. 执行 pnpm i 安装依赖
3. 子包即可使用 common 包中的模块

> 也可以通过命令 pnpm -F [需要依赖的包] add [被依赖的包]
> 例如: pnpm -F vue-proj add common
