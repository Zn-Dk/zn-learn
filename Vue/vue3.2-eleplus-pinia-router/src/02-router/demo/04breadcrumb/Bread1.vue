<template>
  <h3 class="bread-o">Bread1</h3>
  <el-button>
    <router-link :to="{ name: 'Bread2' }">Bread2</router-link>
  </el-button>
  <router-view></router-view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.bread-o {
  background-color: palevioletred;
  line-height: 500px;
}
</style>
