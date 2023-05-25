<template>
  <div>
    <h2>测试 Service Worker 缓存请求</h2>
    <div>
      <ol>
        <li>脱机访问本页面</li>
        <li>进行联机 可以看到请求发出</li>
        <li>再次脱机，刷新页面查看是否有请求数据的缓存</li>
      </ol>
    </div>
    <br>
    <div>
      <h2>Fetch Result:</h2>
      <p>userId: {{data?.userId ?? 'none '}}</p>
      <p>id: {{data?.id ?? 'none '}}</p>
      <p>title: {{data?.title ?? 'none '}}</p>
      <p>completed: {{data?.completed ?? 'none '}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

interface ReturnData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const data = ref<ReturnData>();

const fetchData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  if(res.status === 200) {
    data.value = await res.json();
  }
}
watchEffect(() => {
  fetchData();
})

</script>

<style scoped>
p {
  text-indent: 2em;
}
</style>
