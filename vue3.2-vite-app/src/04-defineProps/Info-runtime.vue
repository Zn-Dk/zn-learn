<template>
  <h2>Personal Info</h2>
  <p>name: {{ name }}</p>
  <p>age: {{ age }}</p>
  <h3>List</h3>
  <ul>
    <!-- 因为没有类型声明 报错(可忽略) -->
    <li v-for="item in list" :key="item.id">{{item.content}}</li>
  </ul>
</template>

<!-- <script lang="ts">
// defineComponent() ，它并没有实现任何的逻辑，只是把接收的 Object 直接返回，
// 它的存在是为了可以让传入的整个对象获得对应的类型，
// 完全为了服务 TypeScript 而存在的
// 加上 defineComponent（） 之后，可以获得自动提示 例如setup接受参数 prop context 的具体类型

import { defineComponent } from 'vue';

export default defineComponent({
  // 传统的 options api (vue2.x/3.x) 接受父组件传递的 props
  // 是属于运行时检查的
  // (比如发生属性检查不正确 只会在浏览器提示warn 但不会有编译时提示)
  props: {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    list: {
      type: Array,
    },
  },

  setup(props, context) {
    console.log(props.name)
    console.log(props.age)

  }

})
</script> -->

<script lang="ts" setup>
// 使用 setup 语法糖的时候
// 类似 defineXXXX 的一些方法在运行前会经过一个编译的过程
// 无需引入组件, 这里是因为借助了 Compiler Macros (编译时宏命令)
// 编译时宏命令只能在 `<script setup>` 中使用

// defineProps(object) 传入要配置的运行时属性声明 写法与之前props属性相同
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  list: {
    type: Array,
  },
});

console.log(props.name)
console.log(props.age)
</script>




<style lang="scss">

</style>