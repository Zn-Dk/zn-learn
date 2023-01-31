<template>
  <h1>组件A</h1>
  FirstName : <input type="text" v-model="firstName">
  LastName : <input type="text" v-model="lastName">
</template>

<script setup lang="ts">
import { ref } from 'vue';

const firstName = ref("")
const lastName = ref("")
</script>

<style lang="scss">

</style>