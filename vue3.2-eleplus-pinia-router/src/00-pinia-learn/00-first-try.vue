<template>
  <el-button>Hello Element Plus</el-button>

  <h2>Test Pinia</h2>
  <p>Now pinia say: {{store.foo}}, Now pinia count: {{store.count}}</p>

  <p>Pinia getter: {{store.getCurrency}}</p>

  <p>Pinia action - addCount, click the button below this:</p>
  <button @click="store.addMoney">addMoney</button>

  <p>data: {{store.URL}}</p>

  <pre class="code-block" v-if="reqData" v-text="reqData" />
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';

// usePinia store
// 所有的外部 hooks 包括 store 都建议以 use.. 开头
import useTestStore from '@/store/test'

const store = useTestStore()


let reqData = ref({})
onMounted(async () => {
  reqData.value = await store.fetchData('https://httpbin.org/get') as Ref<string>
})

</script>

<style lang="scss" scoped>
.ipt {
  :deep(.el-input__inner) {
    color: brown;
  }
}

.code-block {
  background-color: var(--vp-c-bg-mute) !important;
  padding: 4px 8px;
  margin: 12px 0;
  border-radius: 4px;
  opacity: .8;
  overflow: auto;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>