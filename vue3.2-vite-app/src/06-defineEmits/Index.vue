<template>
  <!-- <ChildVue :count="count" @handle-click="handleClick" @handle-change="handleChange" /> -->

  <ChildTsVue :count="count" @handle-click="handleClick" @handle-change="handleChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChildTsVue from './Child-ts.vue';
// import ChildVue from './Child.vue';
const count = ref(0)

const handleClick = (step: number) => {
  count.value += step
}
const handleChange = (msg: string) => {
  console.log(msg)
}

</script>

<style lang="scss">

</style>