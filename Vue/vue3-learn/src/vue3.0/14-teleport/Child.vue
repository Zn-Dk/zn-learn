<template>
  <div class="child">
    <h1>我是Child</h1>
    <button @click="showDialog = true">点我弹窗</button>
    <BaseDialog :isShow="showDialog" @close="showDialog = false" />
  </div>
</template>

<script>
import { ref } from 'vue'
import BaseDialog from './BaseDialog.vue'
export default {
  components: { BaseDialog },
  setup() {
    let showDialog = ref(false)
    return { showDialog }
  },
}
</script>

<style lang="stylus">
.child
  background-color yellowgreen
  width 200px
  height 200px
</style>
