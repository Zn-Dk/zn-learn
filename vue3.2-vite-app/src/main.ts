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
import App from './11-revision-playground/Index.vue'

const app = createApp(App)

// eventBus 第三方库
import mitt from 'mitt'

// 1. 使用 globalProperties 接收全局变量
app.config.globalProperties.$bus = mitt() // 别忘了执行

// 2.配置全局变量 页面中使用 inject 接收(推荐)
app.provide('global', {
  // store,
  // axios
  $bus: mitt(),
})

app.mount('#app')
