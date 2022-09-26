import { createApp } from 'vue'
// import ElementPlus from 'element-plus' // 自动按需导入 不需要import
// import 'element-plus/dist/index.css'
import App from '@/00-pinia-learn/02-解构.vue'
import { createPinia } from 'pinia'
const app = createApp(App)

// app.use(ElementPlus)

// pinia
app.use(createPinia())

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

app.mount('#app')
