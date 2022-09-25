import { App, createVNode, render, VNode } from 'vue'
import BaseLoading from './BaseLoading.vue'

// 需要引入的类型声明 App VNode
export default {
  install(app: App, container?: string) {
    // 所用到的模板需要编译成VNode + render
    const VNode: VNode = createVNode(BaseLoading)
    const el = container ? document.querySelector(container) : document.body
    // render 之后 VNode才读出 component
    // 组件中使用 defineExpose 导出
    render(VNode, el)
    // console.log(VNode)

    const exposed = VNode.component.exposed

    // 将exposed 的方法/属性 挂载到一个全局对象上的属性
    // 就可以通过 $myLoading方法使用了
    app.config.globalProperties.$myLoading = {
      ...exposed,
    }
  },
}
