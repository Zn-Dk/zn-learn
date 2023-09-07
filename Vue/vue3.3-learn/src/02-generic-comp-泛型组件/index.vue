<template>
  <div>
    <h1>Vue 3.3 新特性之</h1>
    <h2>泛型组件 Generic Component</h2>
    <div class="show-case">
      <!-- 泛型组件规定参数 (不符合的情况) -->
      <Generic
        v-for="(item, index) in mockUsers"
        :id="index"
        :item="item"
      />
      <!-- 泛型组件规定参数 (符合的情况) -->
      <Generic
        v-for="(item, index) in selectOptions"
        :id="index"
        :item="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Generic from './Generic.vue';
import { IBaseGenericItem } from './types';
/*

Generic 的泛型限制
<script setup lang="ts" generic="T extends string|number, U extends IBaseGenericItem">

  interface IBaseGenericItem {
  label: string;
  value: string | number;
}

*/

// 不符合
const mockUsers = ref([
  {
    id: 1,
    name: 'John',
    email: 'abc@example.com',
    password: 'password',
  },
  {
    id: 2,
    name: 'Doe',
    email: 'abc1@example.com',
    password: 'pas2sword',
  },
]);

// 符合
const selectOptions = reactive<IBaseGenericItem[]>([
  {
    label: 'AA',
    value: 'aa',
  },
  {
    label: 'BB',
    value: 'bb',
  },
]);
</script>
