<template>
  {{ title }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const title = ref('我是普通script refChild')
    return { title }
  },
})
</script>

<style lang="scss">

</style>