<template>
  <a-layout id="app">
    <IndexHeader />
    <a-layout>
      <a-layout-sider theme="light"></a-layout-sider>
      <a-layout-content style="padding: 0 50px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ background: '#fff', padding: '24px', minHeight: '280px' }"
        >
          <IndexContent />
        </div>
      </a-layout-content>
    </a-layout>
    <a-layout-footer style="text-align: center">
      <h2>FOOTER</h2>
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
export default {
  name: 'IndexPage',
}
</script>

<script lang="ts" setup>
//import Vue from 'vue'
import IndexContent from './IndexContent.vue'
import IndexHeader from './IndexHeader.vue'
</script>

<style>
html,
body,
#__nuxt,
#__layout,
#app {
  overflow: hidden;
  height: 100%;
}
</style>
