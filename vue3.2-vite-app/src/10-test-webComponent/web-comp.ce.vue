// .ce.vue 结尾命名的 vue sfc 组件 可以导出后直接转为 WebComponent
<template>

  <h3>{{msg}}</h3>
  <ul>
    <li v-for="item in list" :key="item.id">{{item.content}}</li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  msg: string,
  list: { id: number, content: string }[]
}>()
</script>

<style>
ul {
  color: cadetblue;
}
</style>