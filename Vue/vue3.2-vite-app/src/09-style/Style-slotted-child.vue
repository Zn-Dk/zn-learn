<template>
  <slot name="sl">default</slot>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
// 父组件放入子组件插槽内的类名 可以在子组件内通过 :slotted 选择器设置样式
// 注意是伪类 不是伪元素::slotted

:slotted(.title) {
  font-size: 24px;
  color: aqua;
}
</style>