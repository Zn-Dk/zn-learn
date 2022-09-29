import { createApp } from 'vue'
import App from '@/00-pinia-learn/03-$apis.vue'
const app = createApp(App)

// ElementPlus
// import ElementPlus from 'element-plus' // 自动按需导入 不需要import
// import 'element-plus/dist/index.css'

// pinia + 持久化插件
import { createPinia } from 'pinia'
const pinia = createPinia()

// import piniaPersist from 'pinia-plugin-persist'
// 自己实现的状态持久化插件测试
// import myPiniaPersist from './01-pinia持久化实现/piniaPlugin'
// pinia.use(
//   myPiniaPersist({
//     type: 'localStorage',
//     customPrefix: 'Store',
//   }),
// )

//pinia.use(piniaPersist)

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

app
  .use(pinia)
  // .use(ElementPlus)
  .mount('#app')
