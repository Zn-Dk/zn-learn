import { createApp } from 'vue'
// import App from './02-components/comp-namespace.vue'
// import App from './03-test-eventbus/Index.vue'
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
import App from './15-provideInject/Index.vue'

// 2.1 注册全局组件 自定义
import GlobalCard from '@/12-globalComponent-recurComponent/GlobalCard.vue'

const app = createApp(App)

// 1.1 eventBus 第三方库引入
import mitt from 'mitt'

// 1.2 使用 globalProperties 接收全局变量
app.config.globalProperties.$bus = mitt() // 别忘了执行

app
  // 1.3 配置全局变量 页面中使用 inject 接收(推荐)
  .provide('global', {
    // store,
    // axios
    $bus: mitt(),
  })
  // 2.2 注册全局自定义组件(可以多个注册) (参数 组件名称, 组件对象)
  .component('GlobalCard', GlobalCard)
  .mount('#app')
