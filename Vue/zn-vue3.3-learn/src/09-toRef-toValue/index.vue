<template>
  <div>
    <h1>Vue 3.3 实验性新特性之</h1>
    <h2>增强的 toRef 新增的 toValue 方法</h2>
    <code>
      <p>- 个人看法: 一些小更新, 不是特别常用的函数</p>
      <p>- 使用 toRef 替换简单的 computed 这个值得评估一下后面的使用情况</p>
    </code>
    <div class="show-case">
      <p>a: {{ a }} <span @click="a++">+</span></p>
      <p>anotherA: {{ anotherA }}</p>
      <p>props.foo {{ foo }} <span @click="foo++">+</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef, toValue } from 'vue';

const props = defineProps<{
  foo: number;
}>();

// case 1 创建一个现有 ref 的克隆
const a = ref(0);
const anotherA = toRef(a);

// case 2 新增: 通过函数创建只读的 getter (foo++ 报错)
// 这个跟 computed 作用一样, 不过官方宣称如果没有复杂计算的话 toRef 性能更好
// "Calling toRef with a getter is similar to computed, but can be more efficient
//  when the getter is just performing property access with no expensive computations."
const foo = toRef(() => props.foo);

/*
  官方 Example:
  // before: allocating unnecessary intermediate refs
  useFeature(computed(() => props.foo))
  useFeature(toRef(props, 'foo'))

  // after: more efficient and succinct
  useFeature(() => props.foo)

*/

// toValue -> 替换 unref , 支持 getter 函数
console.log(toValue(a));
console.log(toValue(() => false));
</script>
