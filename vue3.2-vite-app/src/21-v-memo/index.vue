<template>
  <div id="app">
    <h3>v-memo 之使用 (性能优化)</h3>

    <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
      <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
      <p>{{ item.name }}</p>
    </div>
    <button @click="change">修改其他属性</button>
    <button @click="changeSelected">修改 selected 属性</button>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
/*
  v-memo 用法
  记住一个模板的子树。元素和组件上都可以使用。该指令接收一个固定长度的数组作为依赖值进行记忆比对。
  如果数组中的每个值都和上次渲染的时候相同，则整个该子树的更新会被跳过

  <div v-memo="[valueA]">
    ...
  </div>

  当组件重新渲染的时候，如果 valueA 都维持不变，那么对这个<div>以及它的所有子节点的更新都将被跳过。
    事实上，即使是虚拟 DOM 的 VNode 创建也将被跳过，因为子树的记忆副本可以被重用。

  使用场景
  假设请求接口返回来了1000+条数据。 前端需要做筛选。 选出符合条件的数据进行展示。 如果没有符合条件的。则保持上次的展示。
*/
const list = reactive([
  {
    id: 0,
    name: '小明',
  },
  {
    id: 1,
    name: '小红',
  },
  {
    id: 2,
    name: '小花',
  },
  {
    id: 3,
    name: '小王',
  },
])

let selected = ref(2)
const change = () => {
  // v-memo 应用的元素及子元素, 如果不修改 selected, 下面值的修改不会触发页面更新
  list[0].name = '老王'
  list[2].name = '老张'
  // 打印 reactive 对象, 证明如果先修改了其他属性 这时修改是生效的, 但是不触发视图层更新
  console.log(list)
}

const changeSelected = () => {
  // 视图更新在这一步发生
  selected.value = 0
}
</script>
