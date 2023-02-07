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
          @click="toggleActive"
          class="fa-solid fa-circle-exclamation hover:text-yellow-400 cursor-pointer duration-300"
        ></i>
        <i
          class="fa-sharp fa-solid fa-circle-plus hover:text-yellow-400 cursor-pointer duration-300"
        ></i>
      </div>
    </nav>
    <!-- 使用 Teleport 将 modal 发送 to body -->
    <Teleport to="body">
      <BaseModal :modal-active="isModalActive" @close-modal="toggleActive">
        <template #default>
          <div class="text-black">
            <h1 class="text-2xl mb-1">About:</h1>
            <p class="mb-4">
              The Local Weather allows you to track the current and future
              weather of cities of your choosing.
            </p>
            <h2 class="text-2xl">How it works:</h2>
            <ol class="list-decimal list-inside mb-4">
              <li>
                Search for your city by entering the name into the search bar.
              </li>
              <li>
                Select a city within the results, this will take you to the
                current weather for your selection.
              </li>
              <li>
                Track the city by clicking on the "+" icon in the top right.
                This will save the city to view at a later time on the home
                page.
              </li>
            </ol>
            <h2 class="text-2xl">Removing a city</h2>
            <p>
              If you no longer wish to track a city, simply select the city
              within the home page. At the bottom of the page, there will be am
              option to delete the city.
            </p>
          </div>
        </template>
      </BaseModal>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import { reactive, ref, toRefs } from 'vue'

const isModalActive = ref(false)
const toggleActive = () => {
  isModalActive.value = !isModalActive.value
}
</script>
