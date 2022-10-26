import { createApp } from 'vue'
// import App from '@/00-pinia-learn/00-first-try.vue'
// import App from '@/00-pinia-learn/02-解构.vue'
// import App from '@/02-router/index.vue'
import App from './03-elementPlus/index.vue'
const app = createApp(App)
// vue-router
// import router from './02-router/router/index'

// ElementPlus
// import ElementPlus from 'element-plus' // 自动按需导入 不需要import
import 'element-plus/dist/index.css'

// pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

// 持久化插件
import piniaPersist from 'pinia-plugin-persist'
pinia.use(piniaPersist)

// 自己实现的状态持久化插件测试
// import myPiniaPersist from './01-pinia持久化实现/piniaPlugin'
// pinia.use(
//   myPiniaPersist({
//     type: 'localStorage',
//     customPrefix: 'Store',
//   }),
// )

// eventBus
import mitt from 'mitt'
app.config.globalProperties.$bus = mitt()
type Bus = {
  on: (evName: string, handler: any) => void
  off: (evName: string, handler: any) => void
  emit: (evName: string) => void
}
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $bus: Bus
  }
}

import VirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
app
  .use(VirtualScroller)
  .use(pinia)
  // .use(router)
  // .use(ElementPlus)
  .mount('#app')
