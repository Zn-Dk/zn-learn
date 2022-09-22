<template>
  <div v-for="item in list">
    <p>Name: {{ item.name }} </p>
    <p>Age: {{item.age}}</p>
  </div>
</template>

<script setup lang="ts">
import $http from './server'
// 异步的组件在父组件引用时使用 defineAsyncComponent api

// 顶层 await
let list = await $http('./test-data.json')


</script>

<style lang="scss">

</style>