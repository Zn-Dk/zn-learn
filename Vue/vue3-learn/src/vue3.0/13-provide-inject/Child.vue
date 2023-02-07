<template>
  <div class="child">
    <h1>我是Child</h1>
    <p>inject注入的祖组件的消息:</p>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  setup() {
    let msg = inject('msg')
    return { msg }
  },
}
</script>

<style lang="stylus">
.child
  background-color yellowgreen
  width 200px
  height 200px
</style>
