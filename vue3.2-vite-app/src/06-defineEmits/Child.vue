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

// 普通的 defineEmits 接收与 emits 选项相同的值。
// 通过接收的 emits 变量去触发父组件自定义事件 (vue2: $emit vue3: emit)
const emits = defineEmits(['handle-click', 'handle-change'])

const step = ref(1)
const handleClick = () => emits('handle-click', Number(step.value))

const handleChange = () => emits('handle-change', 'Hello World from Child !')
// 问题: 这样是没有任何的类型检查的
//const handleChange = () => emits('handle-change', 123)



</script>

<style lang="scss">

</style>