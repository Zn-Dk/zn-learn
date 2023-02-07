<template>
  <!-- 形成命名空间.变量的实现 还带有名称自动补全提示 -->
  <Comp.Bar />
  <br>
  <br>
  <br>
  <Comp.Foo />

</template>



<script setup lang="ts">
// 命名空间组件
// 1.在components 文件夹下新建 index.ts 导入期望的组件 然后 export
// 2. import * as ...(命名空间名称) from './'
import * as Comp from './components/namespace'


</script>

<style lang="stylus"></style>
