<template>
  <ChildSetup class="child-class" id="child" :count="count">
    <h3>Hello, 我将覆盖默认插槽</h3>

    <template #foo>
      <p>Index 组件 子组件foo插槽使用</p>
    </template>

    <template #bar="data">
      <p>Index 组件 bar </p>
      <span>{{data?.test}}</span> | <span>{{data?.dataZoo}}</span>
    </template>

  </ChildSetup>
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue';
import ChildSetup from './Child-setup.vue';

const count = ref(0)



</script>

<style lang="scss">

</style>