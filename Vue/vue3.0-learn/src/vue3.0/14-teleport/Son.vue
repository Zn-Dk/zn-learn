<template>
  <div class="son">
    <h1>我是Son</h1>
    <Child />
  </div>
</template>

<script>
import Child from './Child.vue'
export default {
  components: { Child },
  setup() {
    return {}
  },
}
</script>

<style lang="stylus">
.son
  background-color pink
  width 400px
  height 300px
</style>
