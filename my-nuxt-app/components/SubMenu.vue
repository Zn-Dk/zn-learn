<template functional>
  <a-sub-menu :key="menuInfo">
    <template #title>{{ menuInfo.name }}</template>
    <template v-for="(item, index) in menuInfo.children">
      <template v-if="!item?.children">
        <a-menu-item :key="index">
          {{ item.name }}
        </a-menu-item>
      </template>
      <!-- 递归引入自己 -->
      <template v-else>
        <SubMenu :menuInfo="item" :key="index" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts">
import SubMenu from './SubMenu.vue'
type MenuInfo = {
  route: string
  name: string
  children?: MenuInfo[]
}
defineProps<{
  menuInfo: MenuInfo
}>()
</script>

<style lang="scss"></style>
