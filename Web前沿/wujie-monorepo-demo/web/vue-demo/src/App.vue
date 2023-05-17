<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import { foo, rdm, fetchData } from 'common';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { bus as Bus } from 'wujie'

const curData = ref();

const getData = async () => {
  const data = await fetchData();
  curData.value = data;
};

watchEffect(() => {
  // 实时追踪 common 模板变化
  getData()
})

onMounted(() => {
  getData();
});


// 主应用和子应用通信

// 1. 全局变量 获取主应用 window 的 global 变量
onMounted(() => {
  console.log(window.parent.global);
})

// 2. 获取 props
// 子应用可以通过 window.$wujie.props 来获取主应用入参
const props = computed(() => window.$wujie.props);

// 3. eventBus
// 子应用可以通过 window.$wujie.bus 与主应用进行消息发布订阅
const bus = ref<typeof Bus>();
const msgFromMain = ref('')
const msgToMain = ref('')
const onMainMsg = (msg: string) => {
  msgFromMain.value = msg;
}
const postMsgToMain = () => {
  bus.value?.$emit('sub-vue',msgToMain.value)
}
const postMsgToReact = () => {
  bus.value?.$emit('msg-vue', '子应用vue发来消息');
};

onMounted(() => {
  bus.value = window.$wujie.bus;
  console.log(bus.value);

  bus.value.$on('main', onMainMsg)
})

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div>
    <div>foo is : {{ foo }}</div>
    <div>rdm is : {{ rdm(12) }}</div>
    <div>data is : {{ curData || 'loading' }}</div>
  </div>
  <div>
    <h2>通信演示</h2>
    <div>1. 主应用传来的 props: { key: {{ props.key }} value: {{ props.value }} }</div>
    <div>2. eventBus 发送信息</div>
    <div>
      <div>主应用->子应用</div>
      <div v-show="msgFromMain">收到主应用消息: {{msgFromMain}}</div>
      <div>子应用->主应用</div>
      <input type="text" v-model="msgToMain">
      <button @click="postMsgToMain">发送消息</button>
      <button @click="postMsgToReact"> 发送信息给React子应用 </button>
    </div>

  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
