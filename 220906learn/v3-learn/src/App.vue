<template>
  <div>
    <p>{{ count }}</p>
    <button @click="addHandler">测试</button>
  </div>
</template>

<script setup>
//组合式API
import { ref, onMounted } from "vue";

//ref 传入基本数据类型 使其变为响应式元素
const count = ref(0);
function addHandler(){
  //必须使用 .value 读写内部的值
  count.value++;
}

onMounted(() => {
  //必须使用 .value 读写内部的值
  console.log('初始值: ' + count.value);
})

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
