<template>
  <div>
    <!-- <a-select
      v-if="options"
      v-model:value="value"
      :options="options"
      mode="multiple"
      placeholder="Please select"
      style="width: 200px"
    >
    </a-select> -->

    <a-select
      v-model:value="value"
      placeholder="Please select"
      :options="[{ value: 1 }, { value: 2 }]"
    >
    </a-select>
    <!-- <a-select
      v-model:value="value"
      style="width: 100%"
      placeholder="Please select"
      :options="
        [...Array(25)].map((_, i) => ({
          value: (i + 10).toString(36) + (i + 1),
        }))
      "
    >
    </a-select>
    <a-select
      v-model:value="value"
      mode="multiple"
      style="width: 100%"
      placeholder="Please select"
      :options="
        [...Array(25)].map((_, i) => ({
          value: (i + 10).toString(36) + (i + 1),
        }))
      "
    >
    </a-select> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = Array.from(new Array(10), (item) => {
  return { value: Math.random().toString(20).slice(-8) }
})
let value = ref('')
</script>

<style lang="scss"></style>
