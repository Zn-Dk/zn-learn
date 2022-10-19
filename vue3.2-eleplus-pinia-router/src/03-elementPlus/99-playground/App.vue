<template>
  <!-- el-button :icon -->
  <el-button type="primary" :icon="Edit" />
  <el-button type="primary" :icon="Share" />
  <el-button type="primary" :icon="Delete" />
  <el-button type="primary">
    <!-- <el-icon><IconName /></el-icon>  属性  color  size(number|string)-->
    <el-icon class="el-icon--right" color="pink" :size="20"><Search /></el-icon> Search
  </el-button>
  <el-row>
    <el-col :span="24"><div class="grid-content bg-purple-dark" /></el-col>
  </el-row>
  <el-row>
    <el-col :span="12"><div class="grid-content bg-purple" /></el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light" /></el-col>
  </el-row>
</template>

<script setup lang="ts">
import { Delete, Edit, Search, Share } from '@element-plus/icons-vue'
</script>

<style lang="scss">
.grid-content {
  border-radius: 4px;
  min-height: 60px;
}

.bg-purple-dark {
  background-color: purple;
}
.bg-purple {
  background-color: palevioletred;
  &-dark {
    background-color: purple;
  }
  &-light {
    background-color: plum;
  }
}
</style>
