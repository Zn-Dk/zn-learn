<template>
  <h1>组件B</h1>
  <div class="group1">
    <h3>Radio group1</h3>
    <input type="radio" value="apple" v-model="fruit"><label>apple</label>
    <input type="radio" value="orange" v-model="fruit"><label>orange</label>
    <input type="radio" value="pineapple" v-model="fruit"><label>pineapple</label>
  </div>
  <div class="group2">
    <h3>Checkbox group2</h3>
    <input type="checkbox" value="sing" v-model="hobbies"><label>唱歌</label>
    <input type="checkbox" value="jump" v-model="hobbies"><label>跳舞</label>
    <input type="checkbox" value="rap" v-model="hobbies"><label>RAP</label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fruit = ref("")
const hobbies = ref<string[]>([])
</script>

<style lang="scss">

</style>