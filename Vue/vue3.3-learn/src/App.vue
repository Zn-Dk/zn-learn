<script setup lang="ts">
import DemoImportType from '@/01-defineXX 支持外部引入 types/index.vue';
import DemoGenericComp from '@/02-generic-comp-泛型组件/index.vue';
import DemoElegantEmits from '@/03-elegant-defineEmits-更便捷的emits/index.vue';
import DemoDefineSlots from '@/04-defineSlots/index.vue';
import DemoPropsDestruct from '@/06-props-destructure-解构/index.vue';
import DemoDefineModel from '@/07-defineModel/index.vue';
import DemoDefineOptions from '@/08-defineOptions/index.vue';
import DemoToRefToValue from '@/09-toRef-toValue/index.vue';
</script>

<template>
  <!-- <DemoImportType /> -->
  <!-- <DemoGenericComp /> -->
  <!-- <DemoElegantEmits /> -->
  <!-- <DemoDefineSlots /> -->
  <!-- <DemoPropsDestruct /> -->
  <!-- <DemoDefineModel /> -->
  <!-- <DemoDefineOptions foo="1" bar="22" /> -->
  <DemoToRefToValue :foo="1" />
</template>
