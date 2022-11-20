<template>
  <h2>商品列表</h2>

  <ul class="shop-list">
    <!-- 命名路由 replace属性 不保留历史-->
    <!-- <router-link :to="{
      name: 'Details',
      params: {id:item.id}
    }" v-for="item in list" :key="item.id">
    </router-link> -->
    <el-card v-for="item in list" :key="item.id">
      <img class="pic" :src="item.thumbSrc" :alt="item.title" width="200" height="200" />
      <h3 class="title">{{ item.title }}</h3>
      <p class="desc">{{ item.des }}</p>
      <p class="price">
        <span class="red">{{ item.price }}</span
        >元起
      </p>
      <!-- 编程式导航 -->
      <el-button @click="goDetail(item.id)">跳转到详情</el-button>
    </el-card>
  </ul>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import list from '../../../assets/data.json'
// 引入router => useRouter / route => useRoute

const router = useRouter()

//console.log(router, 'router')

// router.push 留下历史记录(可以前进后退)
// .replace 不会留下历史记录 (登录注册)

//前进 数量不限于1 可以小于0(后退)
//router.go(1)
//后退
//router.back()

const goDetail = (id: string) => {
  // router.push({
  //   name: 'Details',
  //   query: { id }
  // })
  console.log(id)
  router.push({
    name: 'Details',
    params: { id },
  })
}
</script>

<style lang="scss">
body {
  user-select: none;
}

.shop-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  width: 960px;
}

a,
el-card {
  padding: 10px;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
}

a:hover {
  color: #444;
}

.red {
  color: #ff0084;
}

.pic {
  width: 160px;
  height: 160px;
}

.title {
  font-size: 14px;
  font-weight: 400;
  line-height: 42px;
}

.desc {
  width: 180px;
  height: 18px;
  font-size: 12px;
  color: #b0b0b0;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.price {
  font-size: 12px;
  color: #444;
  line-height: 28px;
}
</style>
