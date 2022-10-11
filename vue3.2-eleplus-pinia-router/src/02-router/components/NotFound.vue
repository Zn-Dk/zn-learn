<template>
  <el-card class="not-found">
    <template #header>
      <h2>页面未找到</h2>
    </template>
    <h3>404 - 你似乎迷路了...</h3>
    <el-button @click="backToIndex" type="danger">返回首页</el-button>
  </el-card>
  <h2></h2>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
const backToIndex = () => {
  router.push('/')
}
</script>

<style lang="scss">
.not-found {
  margin: 20px;
  height: 80%;
  display: flex;
  flex-direction: column;

  .el-card__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
</style>