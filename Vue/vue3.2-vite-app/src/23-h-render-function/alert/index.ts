import { h, render, createVNode } from "vue"
import Alert from "./alert.vue"

export default function $alert(props:{
  theme?: 'default' | 'warning' | 'error' | 'success',
  size?: 'big' | 'small' | 'normal'
  text?: string
},container?: string) {
  // h 函数作用, 将组件转变成 vNode 节点, 第二个参数传入 props
  // 因为 h 函数也可以创建原生 dom 节点 现在有更明确的方法 createVNode
  // const vNode = h(Alert, props);
  const vNode = createVNode(Alert, props)
  const wrapper = document.querySelector('.alert-wrap') || document.createElement('div')
  wrapper.className = 'alert-wrap'
  // render 函数作用, 将 vNode 节点渲染成真实 DOM, 第二个参数为挂载的节点
  render(vNode,wrapper)
  const dom = document.querySelector(container || 'body');
  dom.appendChild(wrapper)
};
