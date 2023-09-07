<template>
  <div>
    <h1>Vue 3.3 新特性之</h1>
    <h2>defineProps & defineEmits 支持外部 types 引入</h2>
    <div class="show-case">
      <Child
        v-for="(item, index) in mockUsers"
        v-bind="{ ...item, index }"
        @change="onChildChange"
        @save="onChildSave"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Child from './components/Child.vue';
import { IUser, InputPayload } from './types';

const mockUsers = ref<IUser[]>([
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

const onChildChange = ({ index, password }: InputPayload) => {
  console.log(index, password);
};
const onChildSave = ({ index, password }: InputPayload) => {
  console.log('saving password...');
  if (mockUsers.value[index]) {
    mockUsers.value[index]!.password = password;
    console.log(mockUsers.value[index], password);
  }
};
</script>
