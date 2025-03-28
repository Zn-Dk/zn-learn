<template>
  <div class="px-4 bg-white">
    <Foo />
    <p> num is : {{  num }} </p>
    <!-- <p>{{ data?.data }}</p> -->
  </div>
</template>

<script setup lang="ts">

const time = computed(() => new Date().toLocaleDateString());

// 添加head数据
useHead({
  title: `${time.value} 我的页面`,
  meta: [
    { name: 'description', content: 'my page' }
  ]
})

definePageMeta({
  middleware: 'page-my' // 使用中间件
})

const num = useState(() => 1); // 预渲染变量

// const fetchFn = useFetch('https://jsonplaceholder.typicode.com/todos/1');
// const { data } = useAsyncData(() => useFetch('https://jsonplaceholder.typicode.com/todos/1'));
// const { data } = await fetchFn;

// console.log(data.value, 'data');

</script>
