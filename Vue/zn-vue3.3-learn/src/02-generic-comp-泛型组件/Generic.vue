<template>
  <div>
    <h2>Generic Info</h2>
    <h3>id: {{ id }}</h3>
    <!-- 目前看 template 这边的直读 props 的 ts 支持不是特别完善 还需要 as 一下 -->
    <p>label: {{ (item as IBaseGenericItem).label }}</p>
    <p>value: {{ (item as IBaseGenericItem).value }}</p>
  </div>
</template>

<!-- 这个泛型组件规定了 T U 两个泛型, 以限制组件传入参数的类型 -->
<script setup lang="ts" generic="T extends string|number, U extends IBaseGenericItem">
import { IBaseGenericItem } from './types';

defineProps<{
  id: T;
  item: U;
}>();
</script>

<style lang="less" scoped></style>
