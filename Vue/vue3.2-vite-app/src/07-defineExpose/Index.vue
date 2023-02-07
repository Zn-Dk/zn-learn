<template>
  <Child ref="refChild" />
  <hr>
  <ChildSetup ref="refSetupChild" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ChildSetup from './Child-setup.vue';
import Child from './Child.vue';

// ref 获取组件信息 数据
// 变量需与标签上定义的名称相同
const refChild = ref(null)
const refSetupChild = ref(null)

//普通 script 定义的组件是默认能直接获取属性的
console.log(refChild, 'refChild')

// script-setup定义的组件
// 1. value 属性没有东西
// 2. 自己的发现 value 底层有 __v_skip:true 开启了 markRaw
console.log(refSetupChild, 'refSetupChild')

// 在 onMounted 钩子取值
/*
    使用 <script setup> 的组件是默认关闭的——即通过模板引用
    或者 $parent 链获取到的组件的公开实例，不会暴露任何在 <script setup> 中声明的绑定。
    可以通过 defineExpose 编译器宏来显式指定在 <script setup> 组件中要暴露出去的属性：
*/
onMounted(() => {
  console.log(refChild.value?.title)
  console.log(refSetupChild.value?.title) // 如果没有 defineExpose 将打印 undefined
})


</script>

<style lang="scss">

</style>