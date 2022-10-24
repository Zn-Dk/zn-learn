<template>
  <header class="sticky top-0 bg-weather-pri shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 py-6">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex text-2xl gap-3 items-center">
          <i class="fa-solid fa-sun"></i>
          <p>今日天气</p>
        </div>
      </RouterLink>
      <div class="flex text-xl flex-1 gap-2 justify-end">
        <i
          class="fa-solid fa-circle-exclamation hover:text-yellow-400 cursor-pointer duration-300"
        ></i>
        <i
          class="fa-sharp fa-solid fa-circle-plus hover:text-yellow-400 cursor-pointer duration-300"
        ></i>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
</script>
