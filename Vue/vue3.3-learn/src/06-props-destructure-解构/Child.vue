<template>
  <div>
    <p>Msg: {{ msg }}</p>
    <p>isTrue: {{ isTrue }}</p>
    <p>num: {{ num }}</p>
    <p>moneyNum: {{ moneyNum }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch, watchEffect } from 'vue';

/*

  ******* READ THIS FIRST *******
  这个功能是实验性的, 要启用, 配置 vite.config.js

  // vite.config.js
  export default {
    plugins: [
      vue({
        script: {
          propsDestructure: true
        }
      })
    ]
  }

*/

// const props = defineProps<{
//   msg: string;
//   isTrue?: boolean;
//   num?: number;
// }>();

// 1.之前 props 的解构会导致响应式丢失, 这个问题在 3.3 中已被实验性地支持.
// 2.我们之前使用 withDefaults 这个编译宏函数为 props 赋予默认值, 现在可以直接通过 解构赋值 来完成.
const {
  msg,
  isTrue = false,
  num = 1234,
} = defineProps<{
  msg: string;
  isTrue?: boolean;
  num?: number;
}>();

// const moneyNum = computed(() => props.num);
const moneyNum = computed(() => '$' + num);

watchEffect(() => {
  // console.log(`msg is ${props.msg}, isTrue is ${props.isTrue}, num is ${props.num}`);

  // watchEffect 里面则不需要解构 数值会自动跟踪
  // 下面语句打印: msg is Hello World, isTrue is false, num is 1234
  console.log(`msg is ${msg}, isTrue is ${isTrue}, num is ${num}`);
});

watch(
  () => msg, // 推荐写法
  () => {
    console.log(`props: msg changed ${msg}`);
  },
  {
    immediate: true,
  },
);
</script>
