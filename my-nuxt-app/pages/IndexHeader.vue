<template>
  <a-layout-header>
    <div class="logo" />
    <a-menu
      theme="dark"
      mode="horizontal"
      v-model:selectedKeys="selectedKeys"
      :style="{ lineHeight: '64px' }"
    >
      <!-- key 选中后会存入 selectedKeys 数组 -->
      <template v-for="item in headerList">
        <template v-if="!item.children">
          <a-menu-item :key="item.route">
            {{ item.name }}
          </a-menu-item>
        </template>
        <!-- 存在 children 渲染 submenu  需要自定义一个组件递归方式创建 -->
        <template v-else> </template>
      </template>
    </a-menu>
    <!-- 切换顶部栏主题 可以做进 vuex/pinia 全局管理 -->
  </a-layout-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import SubMenu from '../components/SubMenu.vue'

const headerList = ref([
  { route: 'index', name: '首页' },
  { route: 'docs', name: '文档' },
  {
    route: 'column',
    name: '分类',
    children: [
      { route: 'javascript', name: 'JavaScript' },
      { route: 'vue', name: 'Vue' },
      { route: 'react', name: 'React' },
    ],
  },
  { route: 'chat', name: '留言' },
  { route: 'about', name: '关于' },
])

const selectedKeys = ref<string[]>([])
</script>

<style lang="scss"></style>
