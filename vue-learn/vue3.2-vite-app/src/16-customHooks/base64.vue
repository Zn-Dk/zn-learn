<template>
  <img id="icon" src="@pub/raiden.png" alt="!" width="300" height="300">
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useBase64 from './hooks/useBase64'



onMounted(async () => {
  const result = await useBase64('#icon')
  console.log(result)
})
</script>

<style lang="scss">

</style>