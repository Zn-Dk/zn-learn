// 使用 基础写法声明一个 webComponent ( shadowDOM )

// API
import { defineCustomElement } from 'vue'

// 1. 写普通的setup
// 缺点 template 和 style 都只能用字符串
const MyWebCompVue = defineCustomElement({
  props: {
    msg: String,
    year: Number,
  },
  template: `<div class="red">{{ msg }},{{ year }}</div>`,
  styles: [`.red { color: red; }`],
})

// 2.注册自定义元素 原生API (自定义标签名, 自定义标签函数(这里vue api 已经做了处理))
customElements.define('my-comp-vue', MyWebCompVue)
