<template>
  <div>
    DDDDDDDDDDDDDDDD
    收到 Params: {{ foo }}
    收到 State: {{ bar }}
  </div>
</template>

<script setup lang="ts">
const { foo } = defineProps(['foo'])
const { bar } = history.state
console.log(history.state)
</script>

<style lang="scss">

</style>
