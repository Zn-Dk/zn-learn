<template>
  <!-- 可以看到直接使用就可以了 这是因为 setup语法糖在编译的时候 _createVNode 将子模板包含进了输出函数(与其他节点一起) -->
  <FooComp />
  <BarComp />
  <hr />
  <h1>切换动态组件</h1>
  <button @click="isFoo = !isFoo">Change</button>
  <component :is="isFoo ? FooComp : BarComp"></component>
</template>

<script setup lang="ts">
// 1.script setup 引入的子组件不再需要注册，可以直接在模板中使用

// 2.动态组件的使用与V2.x 相同 都是v-bind :is 决定了组件的渲染
import FooComp from '@/02-组件/components/FooComp.vue'
import BarComp from '@/02-组件/components/BarComp.vue'

import { ref } from 'vue'
const isFoo = ref(true)
</script>

<style lang="stylus"></style>
