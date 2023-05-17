import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { bus } from 'wujie'

createApp(App).mount('#app')

declare global {
  interface Window {
    global: number;
    $wujie: {
      props: Record<string,any>
      bus: typeof bus;
    }
  }
}