<template>
  <my-comp-vue msg="Hello WebComponent" year="2022"></my-comp-vue>

  <!-- 注意 基础值可以正常使用 v-bind简写 :
    引用数据类型要使用 .prop 修饰符强制地将 v-bind 绑定值设置为 DOM 属性。  -->
  <ce-vue-comp :list.prop="list" :msg="msg"></ce-vue-comp>
  <!-- 简写成 . -->
  <ce-vue-comp .list="list" :msg="msg"></ce-vue-comp>
</template>

<script setup lang="ts">

/*
使用 vue 构建自定义元素需要用到 "vue/dist/vue.esm-bundler.js".
配置 vite.config.ts :

alias: [
{ find: 'vue', replacement: 'vue/dist/vue.esm-bundler.js' },
],
或者
{ 'vue': 'vue/dist/vue.esm-bundler.js', }

*/

// 函数式写法
import './web-comp';

// 直接引入 sfc 文件的方法，但这里注意。 要使用这种方式模式，只需将组件文件名以 .ce.vue 结尾即可(customElement)
import { defineCustomElement, ref, shallowRef } from 'vue';
import ceVueWebComp from './web-comp.ce.vue';
const myCeVueWebComp = defineCustomElement(ceVueWebComp)

// 注册
customElements.define('ce-vue-comp', myCeVueWebComp)
const msg = ref('信息列表')
const list = shallowRef([
  { id: 1, content: '111111' },
  { id: 2, content: '222222' },
  { id: 3, content: '333333' },
])
</script>

<style>

</style>