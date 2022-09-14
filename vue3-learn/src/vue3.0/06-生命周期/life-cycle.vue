<template>
  <h1>生命周期</h1>
  <button @click="toggle = !toggle">挂载/卸载组件</button>
  <Demo v-if="toggle" />
</template>

<script>
import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref } from 'vue'
import Demo from './demo.vue'
export default {
  // 生命周期 在 setup 内需要写 on+生命周期
  // beforeDestroy destroyed 改名为 onUnMounted onBeforeUnmount
  components: { Demo },
  setup() {
    let toggle = ref(false)

    onBeforeMount(() => console.log('onBeforeMount'))
    onMounted(() => console.log('onMounted'))

    onBeforeUpdate(() => console.log('onBeforeUpdate'))
    onUpdated(() => console.log('onUpdated'))
    return { toggle }
  },
  // 如果同时存在 Vue2的生命周期 同一钩子下 Vue2 在Vue3 的后面
  beforeMount() {
    console.log('Vue2 beforeMount')
  },
  mounted() {
    console.log('Vue2 mounted')
  },
  beforeUpdate() {
    console.log('Vue2 beforeUpdate')
  },
  updated() {
    console.log('Vue2 updated')
  },
}
</script>

<style lang="stylus"></style>
