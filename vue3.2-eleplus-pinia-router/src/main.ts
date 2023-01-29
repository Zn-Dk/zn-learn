import { createApp } from 'vue'
/* -----------------------PINIA----------------------- */

// import App from '@/00-pinia-learn/00-first-try.vue'
// import App from '@/00-pinia-learn/01-state.vue'
// import App from '@/00-pinia-learn/02-解构.vue'
// import App from '@/00-pinia-learn/03-$apis.vue'

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

/* -----------------------ROUTER----------------------- */

// 1.router-entry
import App from '@/02-router/index.vue'

// 2.router-config 切换以察看不同 demo
// import router from './02-router/router/index01'
// import router from './02-router/router/index02'
// import router from './02-router/router/index03'
import router from './02-router/router/index04Bread'
// import router from './02-router/router/index05Dynamic'

/* -----------------------ELEMENT----------------------- */

// import App from './03-elementPlus/index.vue'

// import ElementPlus from 'element-plus' // 自动按需导入 不需要import
import 'element-plus/dist/index.css'

const app = createApp(App)

/* -----------------------PLUGIN----------------------- */
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

// VirtualScroller 虚拟化
// import VirtualScroller from 'vue-virtual-scroller'
// import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

app
  .use(pinia)
  .use(router)
  // .use(VirtualScroller)
  .mount('#app')
