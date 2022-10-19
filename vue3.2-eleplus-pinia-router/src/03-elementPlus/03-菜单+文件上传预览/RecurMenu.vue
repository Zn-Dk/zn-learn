<template>
  <template v-for="item in data">
    <template v-if="!item.children">
      <el-menu-item :index="item.name" :key="item.name">{{ item.title }}</el-menu-item>
    </template>
    <template v-else>
      <el-sub-menu :index="item.name" :key="item.name">
        <template #title>
          <span>{{ item.title }}</span>
        </template>
        <RecurMenu :data="item.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import RecurMenu from './RecurMenu.vue'
type Data = {
  name: string
  title: string
  children?: Data[]
}
defineProps<{ data: Data[] }>()
</script>

<style lang="scss"></style>
