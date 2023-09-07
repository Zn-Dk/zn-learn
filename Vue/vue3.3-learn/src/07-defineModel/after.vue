<script setup lang="ts">
// defineModel
/*

  ******* READ THIS FIRST *******
  这个功能是实验性的, 要启用, 配置 vite.config.js

  // vite.config.js
  export default {
    plugins: [
      vue({
        script: {
          defineModel: true
        }
      })
    ]
  }

*/

// The macro automatically registers a prop, and returns a ref that can be directly mutated:
// 自动注册 prop 和 emitter,  并且返回一个响应式的 ref 值 (在 dev-tool 印证了这一点)
// 泛型参数 props 的类型

// 参数 1 name  可选, 如果为空, 则默认指向 modelValue 这个属性(也是 v-model 的默认值)
//   - 如果是具名 v-model , 如 v-model:val -> 则需要指定属性名 defineModel<number>('val');
// 参数 2 PropsOption (同一般属性的定义)

const modelValue = defineModel<string>();
const num = defineModel<number>('num');

// const emits = defineEmits(['update:num']);

const onAdd = () => {
  if (num.value === undefined) return;
  num.value++;
  // emits('update:num', ++num.value);  
  // 上面这一步是不需要的, 因为 num 是响应式的, value 变化时就会触发 update, 可以解开代码验证
};
</script>

<template>
  <div>
    <p>使用 defineModel</p>
    <input v-model="modelValue" />
    <button @click="onAdd">num: {{ num }}</button>
  </div>
</template>
