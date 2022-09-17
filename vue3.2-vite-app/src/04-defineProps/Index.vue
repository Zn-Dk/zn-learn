<template>
  <!-- 这里只能给出浅层的基本类型检查 归功于 volar -->
  <!-- <InfoRuntimeVue name="John" :age="13" :list="list" /> -->

  <!-- 引入 ts 类型声明后 进行了很详细的静态编译属性检查 包括对象/数组内部的实现 -->
  <InfoTsVue name="John" :age="13" :list="list" />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
//import InfoRuntimeVue from './Info-runtime.vue';

import InfoTsVue from './Info-ts.vue';
const list = shallowRef([
  { id: 1, content: '11', jazz: 'abc' },
  { id: 2, content: '22' },
  { id: 3, content: '33' },
])

</script>

<style lang="scss">

</style>