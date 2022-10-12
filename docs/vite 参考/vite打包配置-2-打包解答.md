##### 目录

- [1 如何创建vite项目？](https://www.ab62.cn/article/6567.html#_label0)
- [2 如何让vite项目启动时自动打开浏览器？](https://www.ab62.cn/article/6567.html#_label1)
- [3vite启动默认端口为3000？如何更改默认端口？](https://www.ab62.cn/article/6567.html#_label2)
- [4 vite如何设置热更新？](https://www.ab62.cn/article/6567.html#_label3)
- [5vite中如何配置别名路径？](https://www.ab62.cn/article/6567.html#_label4)
- [6 vite中如何设置便捷图片路径引用？](https://www.ab62.cn/article/6567.html#_label5)
- [7如何把vite打包以后的js,css和img资源分别分门别类在js/css/img文件夹中?](https://www.ab62.cn/article/6567.html#_label6)
- [8 如何通过vite给项目配置多个环境？](https://www.ab62.cn/article/6567.html#_label7)
- [9 vite中如何配置多入口，进行多页面开发？](https://www.ab62.cn/article/6567.html#_label8)
- [10 如何设置开启生产打包分析文件大小功能？类似webpack-bundle-analyzer?](https://www.ab62.cn/article/6567.html#_label9)
- [11 如何解决require is not define报错的的问题？ 场景： 比如我们assets文件夹下有一个静态的json：](https://www.ab62.cn/article/6567.html#_label10)



## 1 如何创建vite项目？

```
step 1 :
 npm init vite@latest
 yarn create vite
step2 :
npm init vite@latest my-vue-app --template vue
 
npm 7+, 需要额外的双横线：
npm init vite@latest my-vue-app -- --template vue
 
# yarn
yarn create vite my-vue-app --template vue
```



## 2 如何让vite项目启动时自动打开浏览器？

注：vite针对开发环境，打包环境和预览环境分别定义了三个选项： server、build、preview。 开发环境server类似于webpack中的devServer。

```
export default ({mode})=>{
return defineConfig({
  server:{
    open:true, //vite项目启动时自动打开浏览器
  },
}
}
```



## 3vite启动默认端口为3000？如何更改默认端口？

```
export default ({mode})=>{
return defineConfig({
  server:{
    port:8080, //vite项目启动时自定义端口
  },
}
}
```



## 4 vite如何设置热更新？

vite默认开发环境关闭了热更新。代码更改需要手动更新，设置更改代码自动刷新页面需要设置hmr：true

```
export default ({mode})=>{
return defineConfig({
  server:{
    hmr:true, //开启热更新
  },
}
}
```



## 5vite中如何配置别名路径？

设置resolver选项

```
import { resolve } from 'path';
 
export default ({mode})=>{
return defineConfig({
  resolve:{
      alias:{
        "@":resolve(__dirname,"src"),
        "@c":resolve(__dirname,"src/components"),
      }
  },
}
}
```



## 6 vite中如何设置便捷图片路径引用？

比如图片资源都在src/assets/image目录下，不想在项目中每次都通过require("../assets/image/1.jpg")这样写一长串去引用。能否通过 类似nuxt中的快速引用？

```
  这里直接引用
export default ({mode})=>{
return defineConfig({
  resolve:{
      alias:{
      "/images":"src/assets/images/"
      //这里不能通过path模块解析路径的写法
      }
  },
}
}
```



## 7如何把vite打包以后的js,css和img资源分别分门别类在js/css/img文件夹中?

```
//由于是处理打包以后的资源，所以需要配置build选项
export default ({mode})=>{
return defineConfig({
   build:{
    assetsDir:"static",
    rollupOptions:{
      
      input:{
        index:resolve(__dirname,"index.html"),
        project:resolve(__dirname,"project.html")
      },
      output:{
        chunkFileNames:'static/js/[name]-[hash].js',
        entryFileNames:"static/js/[name]-[hash].js",
        assetFileNames:"static/[ext]/name-[hash].[ext]"
      }
    },
  },
 
}
}
```

## 8 如何通过vite给项目配置多个环境？

以开发、测试和生产环境为例

（1）在项目根目录下分别新建.env.development,.env.test,.env.production文件

```
//.env.devopment文件内容
NODE_ENV="development"
VITE_APP_BASEAPI="https://www.dev.com"
//.env.test文件内容
NODE_ENV="test"
VITE_APP_BASEAPI="https://www.test.com"
//.env.production文件内容
NODE_ENV="production"
VITE_APP_BASEAPI="https://www.production.com"
```

(2) package.json文件做如下修改

```
 "scripts": {
    "dev": "vite --mode development",
    "build": "vite build --mode production",
    "test": "vite build --mode test",
    "preview": "vite preview"
  },
```

（3）项目中通过Import.meta.env.VITE_APP_BASEAPI来获取对应环境的值



## 9 vite中如何配置多入口，进行多页面开发？

step1：在根目录新建一个入口页面以project.html为例，同时在根目录下新建一个project文件夹，在此文件夹新建一个main.js,App.vue

![img](http://www.ab62.cn/uploads/20220409/2348209863a3c645bd6270ecda3bf9c0.jpg)

step2:vite.config.js作如下修改：

```
import { defineConfig,loadEnv  } from 'vite'
import {resolve} from "path";

export default ({mode})=>{
return defineConfig({
  build:{
    rollupOptions:{
      input:{
        index:resolve(__dirname,"index.html"),
        project:resolve(__dirname,"project.html")
      },
     //output:{
       // chunkFileNames:'static/js/[name]-[hash].js',
        //entryFileNames:"static/js/[name]-[hash].js",
        //assetFileNames:"static/[ext]/name-[hash].[ext]"
      }
    },
  },

  plugins: [
    vue(),
  ]
})

} 
```

 step3:vite run dev 启动以后在url加上project.html查看project项目 localhost:3000/project.html



## 10 如何设置开启生产打包分析文件大小功能？类似webpack-bundle-analyzer?

```
//1 安装rollup-plugin-visualizer 插件
npm i rollup-plugin-visualizer
//2 vite.config.js中引入插件
import {visualizer} from "rollup-plugin-visualizer"
export default ({mode:string})=>{
 
  const plugins=[ 
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    visualizer({
        open:true,  //注意这里要设置为true，否则无效
        gzipSize:true,
        brotliSize:true
     })
  ];
 }
 return  defineConfig({
            
            resolve:{
              alias:{
                "@":resolve(__dirname,"src"),
                "/images":"src/assets/images/"
              }
            },
            plugins
          })
```



## 11 如何解决require is not define报错的的问题？ 场景： 比如我们assets文件夹下有一个静态的json：

```
        list:[
            {
                shop_id:1,
                shop_name:'搜猎人艺术生活',
                products:[
                    {
                        pro_id:101,
                        text:'洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶',
                        price:480,
                        num:1,
                        img:require("./images/1.png"),
                        sum:480,
                        checked:false//商品选中状态
                    },
                    {
                        pro_id:102,
                        text:'花露水花露水花露水花露水花露水花露水花露水花露水',
                        price:680,
                        num:1,
                        img:require('./images/2.png'),
                        sum:680,
                        checked:false
                    },
                    {
                        pro_id:103,
                        text:'燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片',
                        price:380,
                        num:1,
                        img:require('./images/3.png'),
                        sum:380,
                        checked:false
                    }
                ],
                check:false,//店铺选中状态
                choose:0,//商品选中个数
            },
            {
                shop_id:2,
                shop_name:'卷卷旗舰店',
                products:[
                    {
                        pro_id:201,
                        text:'剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀',
                        price:580,
                        num:1,
                        img:require('./images/4.png'),
                        sum:580,
                        checked:false
                    },
                    {
                        pro_id:202,
                        text:'卫生纸卫生纸卫生纸卫生纸卫生纸卫生纸卫生纸卫生纸',
                        price:780,
                        num:1,
                        img:require('./images/5.png'),
                        sum:780,
                        checked:false
                    }
                ],
                check:false,
                choose:0,
            },
           
        ],
    status:false,//全选选中状态
    allchoose:0,//店铺选中个数
    allsum:0,//总计价格
    allnum:0,//总计数量
}
export default fetchData
```

此时运行你回发现报错：require is not define？ 解决办法：

```
const fetchData={
        list:[
            {
                shop_id:1,
                shop_name:'搜猎人艺术生活',
                products:[
                    {
                        pro_id:101,
                        text:'洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶洗面奶',
                        price:480,
                        num:1,
                        img:new URL("./images/1.png",import.meta.url).href,
                        sum:480,
                        checked:false//商品选中状态
                    },
                    {
                        pro_id:102,
                        text:'花露水花露水花露水花露水花露水花露水花露水花露水',
                        price:680,
                        num:1,
                        img:new URL('./images/2.png',import.meta.url).href,
                        sum:680,
                        checked:false
                    },
                    {
                        pro_id:103,
                        text:'燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片燕麦片',
                        price:380,
                        num:1,
                        img:new URL('./images/3.png',import.meta.url).href,
                        sum:380,
                        checked:false
                    }
                ],
                check:false,//店铺选中状态
                choose:0,//商品选中个数
            },
            {
                shop_id:2,
                shop_name:'卷卷旗舰店',
                products:[
                    {
                        pro_id:201,
                        text:'剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀剃须刀',
                        price:580,
                        num:1,
                        img:new URL('./images/4.png',import.meta.url).href,
                        sum:580,
                        checked:false
                    },
                    {
                        pro_id:202,
                        text:'卫生纸卫生纸卫生纸卫生纸卫生纸卫生纸卫生纸卫生纸',
                        price:780,
                        num:1,
                        img:new URL('./images/5.png',import.meta.url).href,
                        sum:780,
                        checked:false
                    }
                ],
                check:false,
                choose:0,
            },
            
        ],
    status:false,//全选选中状态
    allchoose:0,//店铺选中个数
    allsum:0,//总计价格
    allnum:0,//总计数量
}
export default fetchData
```

注意引用方式的变化：require------->new URL('./images/5.png',import.meta.url).href





## 12 vite 打包后直接预览项目

之前我们要预览 build 后的文件, 通常来说，

- 第一种办法是手动到 dist 文件夹下手动启用 live server 预览, 而这样往往又会遇到要修改资源路径前缀 比如 "/path" 改为 'path' , 对于某些路由懒加载的资源,更有可能直接不加载。

- 第二种办法则需要自己开启一个 node 服务器，启动静态资源`app.use(express.static(<path>))`后将文件扔到 public 目录上，或者直接放到实际项目的后端服务器上, 也不是很方便。



- vite 提供一个 **preview** 的功能帮助我们**直接启动打包好的项目**
- 执行 `npx vite preview`， 或者在 `package.json` 中创建命令 `preview: "vite preview"` 通过 `npm run preview` 执行, 就可以直接预览生产版本的文件了。