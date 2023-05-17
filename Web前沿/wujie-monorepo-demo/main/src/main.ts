import { createApp } from 'vue'
import App from './App.vue'
import Wujie from 'wujie-vue3';
import { bus } from 'wujie';
// import Wujie from 'zn-wujie-vue';

const app = createApp(App);

app.use(Wujie)
.mount('#app')

declare global {
  interface Window {
    global: number;
    $wujie: {
      props: Record<string,any>
      bus: typeof bus;
    }
  }
}
