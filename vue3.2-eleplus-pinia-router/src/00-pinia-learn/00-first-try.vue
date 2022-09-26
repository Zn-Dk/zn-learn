<template>
  <el-button>Hello Element Plus</el-button>

  <h2>Test Pinia</h2>
  <p>Now pinia say: {{store.foo}}, Now pinia count: {{store.count}}</p>

  <p>Pinia getter: {{store.getCurrency}}</p>

  <p>Pinia action - addCount, click the button below this:</p>
  <button @click="store.addMoney">addMoney</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// usePinia store
import testStore from '@/store/test'

const store = testStore()


</script>

<style lang="scss" scoped>
.ipt {
  :deep(.el-input__inner) {
    color: brown;
  }
}
</style>