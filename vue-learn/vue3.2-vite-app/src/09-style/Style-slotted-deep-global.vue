<template>
  <StyleSlottedChild>
    <template #sl>
      <h2 class="title">使用:slotted 修饰符修改样式</h2>
    </template>
  </StyleSlottedChild>
  <div class="box">Scoped :global 选择器</div>
</template>

<script setup lang="ts">
import StyleSlottedChild from './Style-slotted-child.vue';

</script>

<style lang="scss" scoped>
// 在 scoped 里写全局样式
// 之前通常都是新建一个style 标签 不加scoped 现在有更优雅的解决方案
:global(.box) {
  width: 200px;
  height: 300px;
  background-color: violet;
}

/*
  scoped模式下的样式穿透, :deep(selector)

  常用于 UI组件库的修改
  比如 <el-input class="ipt" value="Hello Input"></el-input>
  找到渲染后的 dom 分析 .el-input__inner 需要修改
  如果单纯的使用 .ipt .el-input__inner 是无法在 scoped 下命中的
  因为此时的选择器是 .ipt .el-input__inner[data-v-XXXXXXX]
  而 data-v 是在 el-input 而不是 __inner 上面

    这时候需要使用

    .ipt {
      :deep(.el-input__inner) {
        color: brown;
      }
    }

    修改这个按钮的样式

*/
</style>