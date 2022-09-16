<template>
  <div class="child">
    <h1>我是Child</h1>
    <h1>我是Child</h1>
    <h1>我是Child</h1>
    <h1>我是Child</h1>
    <h1>我是Child</h1>
    <h1>我是Child</h1>
    <h1>我是Child</h1>
    <h1>我是Child</h1>
    <h1>我是Child</h1>
    <h1>我是Child</h1>
    <h1>我是Child</h1>
    <h1>我是Child</h1>
    <h1>我是Child</h1>
    <h1>我是Child</h1>
  </div>
</template>

<script>
import { ref } from 'vue'

// 异步组件 setup 变为 promise 是允许的
export default {
  async setup() {
    let foo = ref(0)
    let p = await new Promise(resolve => {
      // 手动产生延时加载的效果
      setTimeout(() => {
        resolve('loaded')
      }, 2000)
    })
    return { p, foo }
  },
}
</script>

<style lang="stylus">
.child
  background-color yellowgreen
  width 200px
</style>
