import { createApp } from 'vue'
// import App from './02-components/comp-namespace.vue'
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
import App from './20-nextTick/case2.vue'
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
