<template>
  <h1>组件A</h1>
  <input type="text" v-model="message">
  <button @click="emitMsg">向 Comp B 传递信息</button>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, ref } from 'vue';
// 如果要使用总线

// 一. 直接引入的
// import mitt 即可 注意是导出的统一内存地址
// import $bus from '@/libs/bus'

// 二. 全局绑定的

// 方法1. 使用 getCurrentInstance (但其实不太推荐 太麻烦了 而且一样要引入)
// const { $bus } = getCurrentInstance().appContext.config.globalProperties

// 方法2. main.ts 内 app.provide inject 全局 ('global') (推荐)
const { $bus } = inject('global')

const message = ref('')
const emitMsg = () => {
  $bus.emit('msgToB', message.value)
}

</script>

<style lang="stylus" scoped></style>
