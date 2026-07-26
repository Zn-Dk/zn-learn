<template>
  <div class="vue-app">
    <h2>🟩 Vue 子应用</h2>
    <p>这是通过 qiankun 加载的 Vue 子应用（Vite 构建）</p>
    <button @click="increment">Count is {{ counter }}</button>
    <p style="color: #666; font-size: 14px">↑ 点击按钮，主应用头部的 Count 会同步变化</p>
    <p>当前全局主题：{{ globalTheme }}</p>
    <p>当前全局用户：{{ globalUser }}</p>
  </div>
</template>
<script setup>
import { ref, inject, onMounted } from 'vue'

// 通过 inject 获取 qiankun 传入的 props（包含 setGlobalState）
const qiankunProps = inject('qiankunProps', {})

// 用基座传入的 initCount 作为初始值，如果没传则默认 0
const counter = ref(qiankunProps.initCount ?? 0)

const increment = () => {
  counter.value++
  // 通过 qiankun 全局状态通信，将 count 同步到主应用
  if (qiankunProps.setGlobalState) {
    qiankunProps.setGlobalState({ count: counter.value })
  }
}


// 全局状态：通过 onGlobalStateChange 监听
const globalTheme = ref('')
const globalUser = ref('')

onMounted(() => {
  if (qiankunProps.onGlobalStateChange) {
    // 第二个参数 true → 立即触发一次，拿到当前全局状态
    qiankunProps.onGlobalStateChange((state) => {
      globalTheme.value = state.theme
      globalUser.value = state.user
    }, true)
  }
})
</script>
<style scoped>
.vue-app {
  border: 2px solid #42b883;
  padding: 16px;
  margin: 16px;
}
</style>
