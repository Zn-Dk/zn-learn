<template>
  <el-row>
    <el-col :span="4" tag="aside">
      <el-menu :default-active="routeList[0].path" router>
        <el-menu-item :index="item.path" v-for="item in routeList">
          <span slot="title">{{ item.meta?.title }} </span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20" tag="main">
      <router-view :userName="userName"></router-view>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { toReactive } from '@vueuse/shared'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter, RouteRecordRaw, useRoute } from 'vue-router'

const router = useRouter()

// 计算属性 获得当前权限
const routeList = computed(() =>
  router.getRoutes().filter(route => {
    return route.path.match(/^\/index\/.*/)
  }),
)

const userName = ref(window.localStorage.getItem('user') || '默认用户')
</script>

<style lang="scss"></style>
