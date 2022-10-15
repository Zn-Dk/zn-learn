<template>
  <button @click="id++">Increase ID {{ id }}</button>
  <button @click="id = 1">Reset ID</button>
  <div v-if="isPending">
    <h2>Loading Data...</h2>
  </div>
  <div v-else-if="data">{{ data }}</div>
  <div v-else-if="error.length">
    <h2>Something went wrong: {{ error }}</h2>
    <button @click="useFetch(url)">Retry</button>
  </div>
</template>

<script></script>

<script setup lang="ts">
import { watchEffect, ref, computed } from 'vue'
const id = ref(1)
const data = ref(null)
const error = ref(null)
const isPending = ref(true)
const url = computed(() => `https://jsonplaceholder.typicode.com/todos/${id.value}`)

// 模拟超时
function fakeTimeout() {
  return new Promise<void>((resolve, reject) => {
    if (Math.random() > 0.4) {
      resolve()
    } else {
      reject(new Error('SERVER ERROR 503: Request Timeout'))
    }
  })
}

async function useFetch(url) {
  //重置
  data.value = null
  error.value = null
  isPending.value = true

  // 使用fetch函数到 jsonplaceholder 网站拉取假数据

  // fetch(url)
  //   .then(res => res.json())
  //   .then(_data => {
  //     data.value = _data
  //     isPending.value = false
  //   })
  //   .catch(err => {
  //     error.value = err.message
  //     isPending.value = false
  //   })

  //改造成 async await
  try {
    await fakeTimeout()
    let res = await fetch(url)
    data.value = await res.json()
  } catch (err) {
    error.value = err.message
    isPending.value = false
  }
  isPending.value = false
}

// 将响应式函数放入watchEffect 内实现数据响应
// 在button 每次点击行为发生时
// id++
// watchEffect 观察到了这个值改变产生的副作用(因为useFetch内传入了新的值)
// useFetch 重新自执行 获取数据
watchEffect(() => {
  useFetch(url.value)
})
</script>
