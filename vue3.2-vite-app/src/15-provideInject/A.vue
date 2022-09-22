<template>
  <div class="a">
    <p>Foo:{{foo}}</p>
    <p>Bar:{{bar}}</p>
    <p>Buz:{{buz}}</p>

    <BBB />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import BBB from './B.vue';

// 第二个参数是默认值
const foo = inject('foo')
const bar = inject('bar')
const buz = inject('buz')

</script>

<style lang="stylus">
.a
  width 500px
  height 500px
  background-color violet

</style>