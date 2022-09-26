<template>
  <!-- 绑定一个静态的类名 -->
  <h2 class="title">Hello World</h2>
  <p class="test">test</p>
  <p class="color">3秒之后我将变色</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

// 单文件组件的 <style> 标签可以通过 v-bind 这一 CSS 函数将 CSS 的值关联到动态的组件状态上：

// 声明一个变量
const bold = ref(900)

// 改变变量查看效果
const color = ref('blue')
onMounted(() => {
  setTimeout(() => {
    color.value = 'pink'
  }, 3000)
})

</script>

<script>

</script>

<style>
/* 引入全局变量 缺点 没有语法提示 */
@import './global-style.css';


/* 通过 v-bind 将css变量通过 setup 定义 */
/* 实际的值会被编译成 hash 的 CSS 自定义 property，CSS 本身仍然是静态的。 */
/* 自定义 property 会通过*内联样式*的方式应用到组件的根元素上，并且在源值变更的时候响应式更新。 */

/* 回顾 css var */
/* 在专属的 :root 伪类上写明变量即可 */
:root {
  --main-theme-color: #368;
}


.title {
  font-weight: v-bind(bold);
  color: var(--main-theme-color);
}



.test {
  color: var(--main-font-color);
  background-color: var(--main-orange-color);
}

.color {
  font-size: 32px;
  color: v-bind(color)
}
</style>