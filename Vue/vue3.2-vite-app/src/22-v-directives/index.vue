<!-- 如果是 options api 需要在 directives 对象内注册 -->
<!-- <script>
export default {
  directives: {
    // v-highlight
    // 很常见的情况是仅仅需要在 mounted 和 updated 上实现相同的行为，
    // 除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令
    highlight(el, binding) {
      // 这会在 `mounted` 和 `updated` 时都调用
      // 从 binding.value 取到传入的值
      const color = binding.value?.color
      el.style.fontWeight = 'bold'
      el.style.color = color ? color : 'red'
    },
  },
}
</script> -->

<!-- 如果是 composition api + ts -->
<script setup lang="ts">
// 1.导入 Directive type
import type { Directive } from 'vue'
// 2.自行选择函数式或者对象式写法 愉快地写你的自定义指令

// const vHighlight: Directive = {
//   mounted(el, binding) {
//     const color = binding.value?.color
//     el.style.fontWeight = 'bold'
//     el.style.color = color ? color : 'red'
//   },
//   // ...
// }
const vHighlight: Directive = (el, binding) => {
  const color = binding.value?.color
  el.style.fontWeight = 'bold'
  el.style.color = color ? color : 'red'
}
</script>

<!-- 希望在全局中应用 请参阅 ./directives/focus.ts 和 src/main.ts -->

<template>
  <h3 v-highlight="{ color: '#66ccff' }">v-highlight 会将这段文字高亮</h3>
  <h3 v-highlight>v-highlight 默认样式</h3>
  <hr />
  <!-- 高亮这个输入框(color #f90) focus动作在挂载延迟 1s 后进行 -->
  <input
    v-focus
    placeholder="vFocus 默认样式,立刻聚焦"
  />
  <input
    class="highlight1"
    v-focus:highlight
    placeholder="立刻聚焦,带高亮,颜色默认"
  />
  <input
    class="highlight3"
    v-focus:highlight.delay="{ wait: 1000, bdColor: '#f90' }"
    placeholder="1秒后聚焦,带高亮,颜色橙色"
  />
  <input
    class="highlight2"
    v-focus:highlight.delay="{ wait: 3000 }"
    placeholder="3秒后聚焦,带高亮,颜色默认"
  />
</template>

<style>
input {
  display: block;
  padding: 6px 4px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.6s;
}
</style>
