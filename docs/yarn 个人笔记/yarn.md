## yarn的安装

下载node.js，使用npm安装

npm i -g yarn
查看版本：yarn -V

> 以下是官网的新安装方法

### Node.js >=16.10

集成了 Corepack 直接启用

```
corepack enable
```

### Node.js <16.10

需要先安装 corepack 到全局

```
npm i -g corepack
```

### 激活Yarn

```
corepack prepare yarn@stable --activate
```



### 保持更新

```
yarn set version stable //稳定版
yarn set version latest //最新版
```



### 切换淘宝源

在**.yarnrc.yml** 内添加这一行

```
npmRegistryServer: 'https://registry.npm.taobao.org'
```





## yarn的常用命令



### 初始化项目


yarn init 与 npm init 一样通过交互式会话创建一个 package.json

    yarn init # yarn 
    npm init # npm
     
    # 跳过会话，直接通过默认值生成 package.json
    yarn init --yes # 简写 -y
    npm init -y
    
    yarn init -2 // yarn2 init新命令
### 安装包

```
yarn add 包名
npm install  包名 
 
yarn add 包名 -D  会记录在 package.json 的 devDependencies开发环境中
npm i 包名 -D  
 
yarn global add 包名   全局安装
npm i 包名 -g
```

### 更新一个依赖

```
yarn upgrade # 升级所有依赖项，不记录在 package.json 中
npm update # npm 可以通过 ‘--save|-D’ 指定升级哪类依赖
 
yarn upgrade 包名 # 升级指定包
npm update 包名 
 
yarn upgrade --latest    忽略版本规则，升级到最新版本，并且更新 package.json
```

### 移除一个依赖

```
 yarn remove 包名  
 npm uninstall 包名
```

安装 package.json 中的所有文件

```
yarn    在 node_modules 目录安装 package.json 中列出的所又依赖
npm i
 
yarn install 安装时，如果 node_modules 中有相应的包则不会重新下载 --force 可以强制重新下载安装
 
yarn install --force   强制下载安装
npm i --force
```

### 运行脚本

yarn run 用来执行在 package.json 中 scripts 属性下定义的脚本

```
// package.json
    {
        "scripts": {
            "dev": "node app.js",
            "start": "node app.js"
        }
    }
```

yarn run dev # yarn 执行 dev 对应的脚本 node app.js
    npm run # npm

    yarn start # yarn
    npm start # npm
### 显示某个包信息

```
yarn info 包名 # yarn 
npm info 包名 # npm
```

    yarn info 包名 --json # 输出 json 格式
    npm info 包名  --json # npm
     
    yarn info 包名 readme # 输出 README 部分
    npm info 包名 readme
### 列出项目的所有依赖

```
yarn list # 列出当前项目的依赖
npm list # npm
```

    yarn list --depth=0 # 限制依赖的深度
    yarn global list # 列出全局安装的模块
### 缓存

```
yarn cache list # 列出已缓存的每个包
yarn cache dir # 返回 全局缓存位置
yarn cache clean # 清除缓存
```



## typescript+vscode支持

```
yarn add --dev typescript
yarn dlx @yarnpkg/sdks vscode
```

插件

```
yarn plugin import typescript
```

