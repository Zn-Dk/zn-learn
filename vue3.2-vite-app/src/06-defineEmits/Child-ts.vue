<template>
  <p>Count: {{count}}</p>
  <button @click="handleClick">点我加</button> <input type="text" v-model="step">
  <hr>
  <p>向父组件发送消息: </p>
  <input type="checkbox" name="" id="" @change="handleChange">
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineProps(['count'])

// 使用 ts 的函数签名解决
interface Events {
  // (e:事件名称(包括原生事件), 传入的参数ctx)
  (e: 'handle-click', step: number): void
  (e: 'handle-change', msg: string): void
}
const emits = defineEmits<Events>()

// 或者使用字面量
// const emits = defineEmits<{
//   (e: 'handle-click', step: number): void
//   (e: 'handle-change', msg: string): void
// }>()

const step = ref(1)
const handleClick = () => emits('handle-click', Number(step.value))

const handleChange = () => emits('handle-change', 'Hello World from Child !')



</script>

<style lang="scss">

</style>