<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu class="el-menu-demo" mode="horizontal" default-active="/" router>
          <el-menu-item v-for="item in nav" :key="item.path" :index="item.path">{{
            item.name
          }}</el-menu-item>
        </el-menu>
      </el-header>
      <el-breadcrumb style="padding: 10px 20px" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'fs'
import { useRoute } from 'vue-router'
console.log(useRoute())
const route = useRoute()
const nav = [
  { path: '/', name: '首页' },
  { path: '/list', name: '商品列表' },
  { path: '/about', name: '关于我们' },
]
</script>

<style lang="scss">
.common-layout {
  height: 100%;
  & > .el-container {
    height: 100%;
  }
}
</style>
