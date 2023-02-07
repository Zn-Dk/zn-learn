<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          default-active="/"
          router
        >
          <el-menu-item
            v-for="item in nav"
            :key="item.path"
            :index="item.path"
          >{{
            item.name
          }}</el-menu-item>
        </el-menu>
      </el-header>
      <el-breadcrumb
        style="padding: 10px 20px"
        :separator-icon="ArrowRight"
      >
        <!-- 通过循环 matched 数组 渲染面包屑 -->
        <el-breadcrumb-item
          v-for="item in $route.matched"
          :to="{ name: item.name }"
        >
          <p class="bread-item--title">
            {{ item.meta?.title ?? '面包屑' }}
          </p>
        </el-breadcrumb-item>
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
import { ArrowRight } from '@element-plus/icons-vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const nav = [
  { path: '/', name: '首页' },
  { path: '/list', name: '商品列表' },
  { path: '/about', name: '关于我们' },
]

const route = useRoute()

// 使用 route.matched 匹配面包屑
watch(
  () => route.matched,
  newRoute => {
    console.log(newRoute)
  },
)
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100%;

  &>.el-container {
    height: 100%;
  }
}

.el-breadcrumb {
  line-height: 45px;
  background-color: rgba($color: #468, $alpha: 0.5);
}

.bread-item--title,
// :deep 样式穿透
:deep(.el-breadcrumb__separator.el-icon) {
  color: #fff;
}
</style>
