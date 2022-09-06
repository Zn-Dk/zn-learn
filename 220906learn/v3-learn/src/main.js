import { createApp } from 'vue'
import App from './App.vue'

//如果需要自定义全局
const app = createApp({})
app.config.globalProperties.$test = (msg) => { console.log(msg) }

createApp(App).mount('#app')
