<template>
  <div
    class="main-page flex flex-col min-h-screen bg-weather-pri font-roboto text-white"
  >
    <SiteNav />
    <RouterView class="main" />
  </div>
</template>

<script setup lang="ts">
import SiteNav from './components/SiteNav.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<style></style>
