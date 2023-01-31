<template>
  <div class="drag-box">
    <div class="head">
      <p>窗口内容</p><span>x</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useDrag from './hooks/useDrag'

onMounted(() => {
  useDrag('.drag-box', true)
})
</script>

<style lang="scss">
.drag-box {
  position: absolute;
  top: 350px;
  left: 200px;
  width: 400px;
  height: 250px;
  background-color: rgba(164, 209, 209, .8);
  box-shadow: 0 2px 8px #ccc;
  user-select: none;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p,
  span {
    color: #fff;
  }

  span {
    font-size: 32px;
    padding: 10px;
  }
}
</style>