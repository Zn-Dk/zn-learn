import { createApp } from 'vue'
import App from './App.vue'


const app = createApp(App)
app.mount('#app')

//vuex
import store from '@/store/index'
app.use(store)

//如果需要自定义全局
//app.config.globalProperties.$test = (msg) => { console.log(msg) }

