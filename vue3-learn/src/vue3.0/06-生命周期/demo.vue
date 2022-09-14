<template>
  <h2>Demo被挂载了</h2>
</template>

<script>
import { onBeforeMount, onMounted, onBeforeUnmount, onUnmounted } from 'vue'

export default {
  setup() {
    onBeforeMount(() => console.log('组件 onBeforeMount'))
    onMounted(() => console.log('组件 onMounted'))

    onBeforeUnmount(() => console.log('组件 onBeforeUnmount'))
    onUnmounted(() => console.log('组件 onUnmounted'))

    return {}
  },
}
</script>

<style lang="stylus"></style>
