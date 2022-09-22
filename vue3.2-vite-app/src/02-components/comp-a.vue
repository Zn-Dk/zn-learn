<template>myCompA</template>

<script>
//script 和 script setup 是可以共存的 如果一定要显式地命名组件 可以开一个script标签写名称
export default {
  name: 'MyCompA',
}
</script>

<script setup lang="ts">
//Vue3 会自动根据文件名推断组件 name 比如 comp-a => CompA
</script>

<style lang="stylus"></style>
