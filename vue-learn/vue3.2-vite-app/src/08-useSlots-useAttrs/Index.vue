<template>
  <ChildSetup class="child-class" id="child" :count="count">
    <h3>Hello, 我将覆盖默认插槽</h3>

    <template #foo>
      <p>Index 组件 子组件foo插槽使用</p>
    </template>

    <!-- 作用域插槽 接受组件信息 -->
    <template #bar="{ test, dataZoo }">
      <p>Index 组件 bar</p>
      <span>{{ test }}</span> | <span>{{ dataZoo }}</span>
    </template>
  </ChildSetup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChildSetup from './Child-setup.vue'

const count = ref(0)
</script>

<style lang="scss">

</style>
