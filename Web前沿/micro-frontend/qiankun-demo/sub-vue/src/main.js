import { createApp } from 'vue'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

// 保存 Vue 应用实例，用于 unmount 时正确卸载
let appInstance = null

function render(props) {
  const mountNode = props?.container
    ? // qiankun 挂载到 props.container（会复用当前的 index.html 格式）
      props.container.querySelector('#root')
    : // 开发模式下挂载到 #root（index.html）
      '#root'
  appInstance = createApp(App)
  // 将 qiankun props 注入 Vue 组件树（子组件通过 inject('qiankunProps') 获取）
  appInstance.provide('qiankunProps', props || {})
  appInstance.mount(mountNode)
}

// 使用 vite-plugin-qiankun 提供的 renderWithQiankun 注册生命周期
renderWithQiankun({
  bootstrap() {
    console.log('Vue 子应用 bootstrap')
  },
  mount(props) {
    console.log('Vue 子应用 mount，收到 props：', props)
    render(props)
  },
  unmount(props) {
    console.log('Vue 子应用 unmount')
    appInstance?.unmount()
    appInstance = null
  },
  update(props) {
    console.log('Vue 子应用 update', props)
  },
})

// 独立运行时直接渲染
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
