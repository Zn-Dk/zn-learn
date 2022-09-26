import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'
const app = createApp(App)
app.use(ElementPlus)

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
