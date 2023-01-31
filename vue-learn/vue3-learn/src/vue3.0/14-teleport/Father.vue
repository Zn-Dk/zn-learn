<template>
  <div class="father">
    <h1>我是Father</h1>
    <Son />
    <div id="test"></div>
  </div>
</template>

<script>
import Son from './Son.vue'
export default {
  components: { Son },
  setup() {
    return {}
  },
}
</script>

<style lang="stylus">
.father
  background-color skyblue
  width 600px
</style>
