<template>
  <h2>Pinia 解构</h2>
  <p>Now pinia say: {{ foo }}, Now pinia count: {{ count }}</p>

  <p>Pinia getter: {{ getCurrency }}</p>

  <p>Pinia action - addCount, click the button below this:</p>
  <button @click="count++">addCount</button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

// usePinia store
import useTestStore from '@/store/test'
import { storeToRefs } from 'pinia'
const store = useTestStore()

// 解构 同时保持响应式

// 普通解构会丢失响应式
// const { foo, count } = store
// count++
// console.log(foo, count)

// 使用 api storeToRefs 将整个 store 包装为 ref (其原理跟toRefs 一样给里面的数据包裹一层 toRef)
const { foo, count, getCurrency } = storeToRefs(store)
console.log(foo, count)
</script>

<style lang="scss" scoped>
.ipt {
  :deep(.el-input__inner) {
    color: brown;
  }
}
</style>
