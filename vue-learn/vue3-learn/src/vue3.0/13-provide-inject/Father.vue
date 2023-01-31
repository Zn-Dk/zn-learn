<template>
  <div class="father">
    <h1>我是Father</h1>
    <input v-model="msg" />
    <Son />
  </div>
</template>

<script>
import { provide, ref } from 'vue'
import Son from './Son.vue'
export default {
  components: { Son },
  setup() {
    // provide 注入
    // provide key,value
    let msg = ref('Hello From Father')
    provide('msg', msg)

    // 
    provide({
      msg,

    })

    return { msg }
  },
}
</script>

<style lang="stylus">
.father
  background-color skyblue
  width 600px
</style>
