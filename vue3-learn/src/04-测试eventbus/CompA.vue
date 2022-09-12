<template>
  <button @click="emitMsg">传递信息</button>
  <CompB />
</template>

<script>
import CompB from './CompB.vue'
export default {
  name: 'CompA',
  components: { CompB },
  setup() {
    //const emitMsg = $bus.emit('showMsg', 'Hello world')
  }

}
</script>

<style lang="stylus" scoped></style>
