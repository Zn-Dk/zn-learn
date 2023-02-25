import { createApp } from 'vue'
// import App from './01-scriptSetup sugar/script-setup.vue'
// import App from './02-components/comp-a.vue'
// import App from './02-1-testwatchEffect/fetch-data.vue'
// import App from './03-eventbus/Index.vue'
// import App from './04-defineProps/Index.vue'
// import App from './05-withDefault/Index.vue'
// import App from './06-defineEmits/Index.vue'
// import App from './07-defineExpose/Index.vue'
// import App from './08-useSlots-useAttrs/Index.vue'
// import App from './09-style/Style-v-bind.vue'
// import App from './10-test-webComponent/Index.vue'
// import App from './11-revision-playground/Index.vue'
// import App from './12-globalComponent-recurComponent/Global-Index.vue'
// import App from './12-globalComponent-recurComponent/Recur-Index.vue'
// import App from './13-Suspense-AsyncComponent/Index.vue'
// import App from './14-keepAlive/Index.vue'
// import App from './15-provideInject/Index.vue'
// import App from './16-customHooks/base64.vue'
// import App from './17-customPlugin/Index.vue'
// import App from './18-pxtoviewport-test/Index.vue'
// import App from './19-v-model-on-comp/Father.vue'
// import App from './20-nextTick/case0.vue'
// import App from './21-v-memo/index.vue'
import App from './22-v-directives/index.vue'
// import App from './98-environment/EnvTest.vue'
// import App from './99-revision-playground/Index.vue'
// 2.1 注册全局组件 自定义
import GlobalCard from '@/12-globalComponent-recurComponent/GlobalCard.vue'

const app = createApp(App)

console.log(`You're running in [${import.meta.env.MODE}] mode!`)

// 1.1 eventBus 第三方库引入
import mitt from 'mitt'

// 1.2 使用 globalProperties 接收全局变量
app.config.globalProperties.$bus = mitt() // 别忘了执行
// 1.2-1 制作声明(这样引入全局变量后才会有方法提示)
type Bus = {
  on: (evName: string | symbol, handler: any) => void
  off: (evName: string | symbol, handler: any) => void
  emit: (evName: string | symbol) => void
}

// 1.2-2 Vue3 声明文件的形式如下
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    // 全局变量: 方法属性的相关类型声明
    $bus: Bus
  }
}

// 3.1 配置自定义插件
import myLoading from './17-customPlugin/myLoading'
app.use(myLoading)
// 3.1-1 声明这个插件的变量
import { Ref } from 'vue'
type load = {
  isShow: Ref<boolean>
  show: () => void
}
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    // 全局变量: 方法属性的相关类型声明
    $myLoading: load
  }
}

// Vue 错误处理捕获
app.config.errorHandler = function (err: Error, instance, info) {
  let {
    message, // 异常信息
    name, // 异常名称
    // script, // 异常脚本url  注释的这几个需要在 stack 正则匹配
    // line, // 异常行号
    // column, // 异常列号
    stack, // 异常堆栈信息
  } = err
  let matches = stack.match(/at\s(.*)\n/)[1]
  let subM = matches.match(/^(https?:\/\/.*\.vue).*:(\d+):(\d+)/)
  console.log('错误信息: ', message)
  console.log('错误脚本url: ', subM[1])
  console.log('异常行号: ', subM[2])
  console.log('异常列号: ', subM[3])
  console.log('错误类型: ', name)
  console.log('错误栈: ', stack)
  console.log('错误发生实例: ', instance)
  console.log('错误发生位置/生命周期钩子: ', info) // 比如: mounted hook / setup function
}

// 全局注册自定义指令v-focus ,配合 22-v-directives 使用
import { vFocus } from './22-v-directives/directives/focus'
app.directive('focus', vFocus)

app
  // 1.3 配置全局变量 页面中使用 inject 接收(推荐)
  .provide('global', {
    // store,
    // axios
    $bus: mitt(),
  })
  // 2.2 注册全局自定义组件(可以多个注册) (参数 全局组件名称, 组件对象)
  .component('GlobalCard', GlobalCard)
  .mount('#app')
