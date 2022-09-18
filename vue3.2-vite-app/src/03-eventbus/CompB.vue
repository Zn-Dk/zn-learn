<template>
  <h1>组件B</h1>
  <h2>接收到的消息: {{ message }}</h2>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, inject } from 'vue';
//import $bus from '@/libs/bus'
const { $bus } = inject('global')
ref
let message = ref('')
const showMsg = (msg: string) => {
  console.log('CompB received message from CompA')
  message.value = msg
}

$bus.on('msgToB', showMsg)
onBeforeUnmount(() => $bus.off('msgToB', showMsg))

</script>

<style lang="scss">

</style>