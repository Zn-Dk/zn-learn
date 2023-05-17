# pnpm + workspace 功能实现 monorepo(单个仓库中管理多个项目) 及无界微前端演示



> 核心概念:  软链接，复用依赖库 (pnpm 的轻量化也是利用了这个)

> 说明: 
>
> - main 文件夹 存放项目主应用 (vue 3)
> - web 文件夹 存放子应用文件 (1 vue 3 + 1 react 18)
> - common 文件夹 导出公用代码



## 基础 monorepo 演示流程



1. 在 web 目录下初始化两个子项目 react-demo / vue-demo, 同时初始化 main 文件夹

   ```
   /web/** ... main
   pnpm create vite
   ```

2. 定义 pnpm-workspace.yaml 工作空间配置

   ```yaml
   packages:
     # all packages in direct subdirs of packages(直接子目录 主应用)/
     - 'main'
     # all packages in subdirs of components(子应用组件位置)/
     - 'web/**'
     # exclude packages that are inside test directories
     - '!**/test/**'
   ```

3. 在项目根目录执行 pnpm init

   ```
   pnpm init
   pnpm i // 关键的一步, 在根目录下通过 workspace 配置后 pnpm 会按照配置收集分配 node_modules 到子项目中
   ```

4. 通过 pnpm --filter(-F) 执行工作空间命令

   ```
   pnpm -F react-demo dev
   pnpm -F vue-demo dev
   ```

5. 初始化公用库，导出一些示例

   ```js
   // common dir
   pnpm init
   // index.js example code
   import axios from 'axios';
   
   export const foo = 123;
   
   export const rdm = num => {
     return Math.random(num);
   };
   ```

6.  添加 common 文件夹到 pnpm-workspace.yaml 下，使其成为一个项目内部依赖库

   ````yaml
   packages:
     - 'common'  # <--- add here
   ````
   
7. 向子应用 react-demo 添加工作空间内的 common 模块

   ```
   pnpm -F react-demo add common
   ```

   > 这时查看 react-demo 下的 package.json 会发现引入了我们工作空间下导出的模块

   ```json
     "dependencies": {
       "common": "workspace:^",  // <-- 这里
       "react": "^18.2.0",
       "react-dom": "^18.2.0"
     },
   ```

   ```tsx
   /* App.tsx */
   import { foo,rdm, fetchData } from 'common'
   
   ... 调用 查看效果
   function App() {
     const [data, setData] = useState(null)
     useEffect(() => {
       getData()
     }, [])
   
     const getData = async () => {
       const data = await fetchData()
       setData(data);
     }
   
     return (
       <>
         <h1>Vite + React</h1>
         <div>foo is: {foo}</div>
         <div>random is: {rdm(123)}</div>
         <div>random is: {rdm(123)}</div>
         <div>data is: {JSON.stringify(data)}</div>
       </>
     )
   }
   ```

   ![image-20230516131436051](C:\Users\zndkqiu\AppData\Roaming\Typora\typora-user-images\image-20230516131436051.png)

7. 在 vue-demo 里重复 6 操作 ...





## 无界微前端快速上手

1. main 主应用上安装 wujie (主应用 vue 使用 wujie-vue3 框架)

   ```
   pnpm i wujie-vue3
   ```

2.  引入无界组件(main.ts)

   ```typescript
   import { createApp } from 'vue'
   import App from './App.vue'
   import Wujie from 'wujie-vue3';
   
   const app = createApp(App);
   
   app.use(Wujie)
   .mount('#app')
   ```

3. 启动子应用

   ```
   pnpm -F vue-demo run dev  
   pnpm -F react-demo run dev     
   ```
   
4. 在主应用引入子应用

   ```vue
   /*    main/src/App.vue     */
   // WujieVue 是固定名称 具体属性参考官方文档
   // https://wujie-micro.github.io/doc/pack/
   
   <template>
     <h1>这里是主应用</h1>
   <div class="container">
       <!-- 子应用1 vue3 -->
       <div class="app-wrapper">
         <WujieVue name="vue3" url="http://127.0.0.1:5173"></WujieVue>
       </div>
       <!-- 子应用2 react -->
       <div class="app-wrapper">
         <WujieVue name="react" url="http://127.0.0.1:5174"></WujieVue>
       </div>
   </div>
   </template>
   ```
   



## 无界通信的几种方式

### 1. 全局变量(使用少)

主应用: 

````typescript
// 主应用声明全局变量
var global = 123; // 或者 window.global = 123;

// typescript 在 main.ts 声明
declare global {
  interface Window {
    global: number;
  }
}
````

子应用:

```typescript
// typescript 在 main.ts 声明
declare global {
  interface Window {
    global: number;
  }
}

// App.vue
onMounted(() => {
  console.log(window.parent.global); // 123
})
```



### 2. $wujie.props

>  无界会给子应用 window 下挂载 $wujie 这个对象

```
// 子应用 main.ts 的声明
declare global {
  interface Window {
    $wujie: {
      props: Record<string,any>
    }
  }
}
```

主应用传入 props 属性

```vue
<WujieVue name="xxx" url="xxx" :props="{ data: xxx, methods: xxx }"></WujieVue>
```

子应用可以通过[$wujie](https://wujie-micro.github.io/doc/api/wujie.html#wujie-props)来获取：

```typescript
const props = window.$wujie?.props; // {data: xxx, methods: xxx}
```

### 3. $wujie.bus

> $wujie 对象上还有有 bus 方法 用于实现父子应用的发布订阅模式

```typescript
// 类型声明
import { bus } from 'wujie'

createApp(App).mount('#app')

declare global {
  interface Window {
    global: number;
    $wujie: {
      props: Record<string,any>
      bus: typeof bus;
    }
  }
}
```

主应用 (直接引入 wujie 的 bus)

```vue
import { bus } from 'wujie'

const msgFromVue = ref('');
const msgToSub = ref('')
bus.$on('sub-vue', (msg: string) => {
  msgFromVue.value = msg;
});
const postMsgToSub = () => {
  bus.$emit('main', msgToSub.value);
};

<template>
  <div>
    接收信息:
    <p>msgFromVue: {{ msgFromVue }}</p>
    <p>msgFromReact: {{ msgFromReact }}</p>
  </div>
  <div>
    <input type="text" v-model="msgToSub" placeholder="给子应用的信息" />
    <button @click="postMsgToSub"> 发送信息 </button>
  </div>
</template>
```

子应用通过 window.$wujie.bus

```vue
const bus = ref<typeof Bus>();
const msgFromMain = ref('')
const msgToMain = ref('')
const onMainMsg = (msg: string) => {
  msgFromMain.value = msg;
}
const postMsgToMain = () => {
  console.log(bus.value);
  bus.value?.$emit('sub-vue',msgToMain.value)
}
onMounted(() => {
  bus.value = window.$wujie.bus;
  bus.value.$on('main', onMainMsg)
})


<template>
<div>2. eventBus 发送信息</div>
    <div>
      <div>主应用->子应用</div>
      <div v-show="msgFromMain">收到主应用消息: 		  {{msgFromMain}}</div>
      <div>子应用->主应用</div>
      <input type="text" v-model="msgToMain">
      <button @click="postMsgToMain">发送消息</button>
    </div>
</template>
```

