<template>
  <h1>组件B</h1>
  <h2>接收到的消息: {{ message }}</h2>
</template>

<script setup lang="ts">
import { onBeforeUnmount, getCurrentInstance, ref, inject } from 'vue';
// import $bus from '@/libs/bus'
// const $bus = getCurrentInstance().appContext.config.globalProperties?.$bus


const g: any = inject('global')

let message = ref('')
const showMsg = (msg: string) => {
  console.log('CompB received message from CompA')
  message.value = msg
}

g.$bus.on('msgToB', showMsg)
onBeforeUnmount(() => g.$bus.off('msgToB', showMsg))

</script>

<style lang="scss">

</style>