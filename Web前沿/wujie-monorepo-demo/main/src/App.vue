<script setup lang="ts">
import {  ref } from 'vue';
import { bus } from 'wujie';

window.global = 123;

const propsForVue = {
  key: 'vue3',
  value: '来自主应用给vue子应用的props',
};

const msgFromVue = ref('');
const msgFromReact = ref('');
const msgToSub = ref('');
bus.$on('sub-vue', (msg: string) => {
  msgFromVue.value = msg;
});
bus.$on('sub-react', (msg: string) => {
  msgFromReact.value = msg;
});

const postMsgToSub = () => {
  bus.$emit('main', msgToSub.value);
};

</script>
<template>
  <h1>这里是主应用</h1>
  <div>
    接收信息:
    <p>msgFromVue: {{ msgFromVue }}</p>
    <p>msgFromReact: {{ msgFromReact }}</p>
  </div>
  <div>
    <input type="text" v-model="msgToSub" placeholder="给子应用的信息" />
    <button @click="postMsgToSub"> 发送信息 </button>
  </div>
  <div class="container">
    <!-- 子应用1 vue3 -->
    <div class="app-wrapper">
      <WujieVue name="vue3" url="http://127.0.0.1:5173" :props="propsForVue"></WujieVue>
    </div>
    <!-- 子应用2 react -->
    <div class="app-wrapper">
      <WujieVue name="react" url="http://127.0.0.1:5174"></WujieVue>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
.app-wrapper {
  width: 50%;
  border: 1px solid #000;
}
</style>
