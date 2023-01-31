<template>
  <!-- BUG 使用 css module 页面不会自动更新 待探究 -->


  <!-- 使用 css module 如果 module 没有命名 则使用 $style 关键字-->
  <!-- volar 会智能提示类名 -->
  <p :class="$style.red">我是红色字体</p>
  <p :class="$style.blue">我是蓝色字体</p>
  <br>
  <h3 :class="text.tac">居中</h3>
  <h3 :class="text.taj">靠右对齐</h3>
</template>

<script setup lang="ts">
import { useCssModule } from 'vue';

// <script setup> 时，可以使用 useCssModule API 获取到 css module 对象。
const styles = useCssModule()

console.log(styles)


</script>


// css module 默认名 $style
<style module>
.red {
  color: red;
}

.blue {
  color: skyblue;
}
</style>

<!-- 具名 css module -->
<style module="text">
.tac {
  text-align: center;
}

.taj {
  text-align: justify;
}
</style>