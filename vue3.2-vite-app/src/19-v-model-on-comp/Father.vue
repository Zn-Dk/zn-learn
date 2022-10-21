<template>
  <div class="father">
    <h2>父组件 foo: {{ foo }}</h2>
    <h2>父组件 title: {{ title }}</h2>
    <h2>父组件 price: {{ price }}</h2>
    <input type="text" v-model="foo" />
    <!-- v-model 绑定到子组件上 子组件默认接收 prop名称 modelValue  事件 update:modelValue -->
    <Child v-model="foo" />
    <!-- 自定义名称 v-model冒号后加自定义属性 可以接受一个或多个 v-model -->
    <!-- 子组件接收 prop:自定义prop   事件 update:自定义prop -->
    <Child1 v-model:title="title" v-model:price="price" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Child from './Child.vue'
import Child1 from './Child1.vue'

const foo = ref('foo')
const title = ref('标题')
const price = ref(9.98)
</script>

<style lang="scss">
div {
  border: 1px solid #000;
}

.father {
  padding: 10px;
}
</style>
