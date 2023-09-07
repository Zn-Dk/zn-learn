import { createApp } from 'vue'
import './style.css'
// import App from './App.vue'
import renderAppFn from './renderFn';

createApp(renderAppFn).mount('#app')
