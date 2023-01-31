<template>
  <!-- default slot -->
  <slot>我是默认插槽</slot>

  <!-- named slot -->
  <slot name="foo"> 我是 foo 具名插槽</slot>
  <!-- scoped slot -->
  <slot name="bar" test="hello" data-zoo="zoo"> 我是 foo 具名插槽</slot>

</template>

<script lang="ts" setup>
import { onMounted, useAttrs, useSlots } from 'vue';

// useSlots 返回当前子组件的插槽使用情况 相当于普通script setup 接收的第二个参数
// setup(props,{slots}) <=
const slots = useSlots()
console.log(slots, 'slots')
// 获取插槽具体信息
console.log(slots.foo())
onMounted(() => {
  console.log(slots.bar())
})


// useAttrs 相当于普通script setup 接收的第二个参数
// setup(props,{attrs}) <=
const attrs = useAttrs()
console.log(attrs, 'attrs')
/*
  class: "child-class"
  count: 0
  id: "child"
*/
</script>

<style lang="scss">

</style>