<template>
  <button @click="id++">Increase ID {{ id }}</button>
  <button @click="id = 1">Reset ID</button>
  <div v-if="isPending">Loading Data...</div>
  <div v-else-if="data">{{ data }}</div>
  <div v-else-if="error">Something went wrong: {{ error }}</div>
</template>

<script></script>

<script setup>
import { watchEffect, ref } from 'vue'
const id = ref(1)
const data = ref(null)
const error = ref(null)
const isPending = ref(true)

async function useFetch(getUrl) {
  // 使用fetch函数到 jsonplaceholder 网站拉取假数据

  // fetch(getUrl())
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
    let res = await fetch(getUrl())
    data.value = await res.json()
    isPending.value = false
  } catch (err) {
    error.value = err.message
    isPending.value = false
  }
}

// 将响应式函数放入watchEffect 内实现数据响应
// 在button 每次点击行为发生时
// id++
// watchEffect 观察到了这个值改变产生的副作用(因为useFetch内传入了新的值)
// useFetch 重新自执行 获取数据
watchEffect(() => {
  //重置
  data.value = ref(null)
  error.value = ref(null)
  isPending.value = ref(true)
  useFetch(() => `https://jsonplaceholder.typicode.com/todos/${id.value}`)
})
</script>
