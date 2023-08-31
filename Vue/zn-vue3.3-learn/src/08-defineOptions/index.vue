<template>
  <div>
    <h1>Vue 3.3 实验性新特性之</h1>
    <h2>DefineOptions</h2>
    <code>
      <p>- 个人看法: 在 script setup 也能自定义组件名了, 泪流满面</p>
    </code>
    <div class="show-case">
      $attrs: {{ $attrs }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['foo']);

defineOptions({
  // 天下苦 script setup 不能自定义组件名久矣! 再也不需要单独写一个 script 标签了
  name: 'MyCustomComponent',
  // 让组件标签上的非 props 属性不会写入 html 标签中 , 默认是 true , 会写入标签
  // 设置为 false, 就可以隐藏属性值了 (但不论写不写 $attrs 都会收集传入的属性)
  inheritAttrs: false,
});
</script>
