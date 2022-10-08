<template>
  <h2>商品详情</h2>
  <el-button @click="goBack">返回</el-button>
  <h3 class="de-title">{{item.title}}</h3>
  <p class="de-desc">{{item.des}}</p>
  <p class="de-price red">{{item.price}}元起</p>
  <el-image :src="item.thumbSrc" :alt="item.title" :preview-src-list="[item.picSrc]"></el-image>
</template>

<script setup lang="ts">
import list from '../../../assets/data.json'
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
console.log(route)
// const item = list.find(item => item.id === route.query.id)
const item = list.find(item => item.id === route.params.id)

// 路由返回
const goBack = () => {
  router.back()
}



</script>

<style lang="scss">
.de {
  &-title {
    font-size: 32px;
  }

  &-desc {
    font-size: 24px;
  }

  &-price {
    font-size: 24px;
  }
}
</style>