import { createApp, createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import './style.css'
import App from './App.vue'

import { camel } from 'common/utils'

renderToString(createSSRApp(App)).then((html) => {
  console.log(html)
  // document.getElementById('app')!.innerHTML = html
})

console.log(camel('hello world'))

createApp(App).mount('#app')
