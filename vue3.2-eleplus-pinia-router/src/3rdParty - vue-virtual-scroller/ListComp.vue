<template>
  <!-- <p>{{ source.id }} - {{ source.text }}</p> -->
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'
defineProps({
  index: {
    // 每一行的索引
    type: Number,
  },
  source: {
    type: Object,
    default: () => {},
  },
})
console.log(useAttrs())
</script>

<style lang="scss"></style>
