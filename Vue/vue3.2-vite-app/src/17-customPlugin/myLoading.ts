import { App, createVNode, render, VNode } from 'vue'
import BaseLoading from './BaseLoading.vue'

// 需要引入的类型声明 App VNode
export default {
  install(app: App, container?: string) {
    // 所用到的模板需要编译成VNode + render
    const VNode: VNode = createVNode(BaseLoading)
    const el = container ? document.querySelector(container) : document.body
    // 注意 script setup 组件中要使用 defineExpose 导出属性方法
    // 执行 render 之后才能在 VNode 获取 component
    render(VNode, el)
    // console.log(VNode)

    // 获取这个组件暴露的方法属性
    const exposed = VNode.component.exposed

    // 将exposed 的方法/属性挂载到一个全局属性上 就可以通过这个全局变量使用这个插件了
    app.config.globalProperties.$myLoading = {
      ...exposed,
    }
  },
}
