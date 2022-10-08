<template>
  <h1>Hello World</h1>
  <h2>Test Custom Plugin</h2>
  <button @click="emitLoading">唤起Loading</button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';

const inst = getCurrentInstance()
console.log(inst.proxy)
const $load = inst.proxy?.$myLoading
const emitLoading = () => {
  console.log($load.isShow.value)
  $load.show()
}

</script>

<style lang="scss">

</style>