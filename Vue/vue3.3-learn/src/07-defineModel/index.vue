<template>
  <div>
    <h1>Vue 3.3 实验性新特性之</h1>
    <h2>DefineModel</h2>
    <code>
      <p>- 个人看法: 好用, 方便简洁的一个 hooks (只不过是宏命令 不需要引入)</p>
      <p>在不需要专门手动控制的属性的场景, 提升效率</p>
    </code>
    <div class="show-case">
      <h3>Father Component :</h3>
      <p>modelValA: {{ modelValA }}</p>
      <p>modelValB: {{ modelValB }}</p>
      <hr />
      <Before
        v-model="modelValA"
        v-model:num="modelNumA"
      />
      <hr />
      <After
        v-model="modelValB"
        v-model:num="modelNumB"
        @update:num="onUpdated"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Before from './before.vue';
import After from './after.vue';

const modelValA = ref('Before');
const modelNumA = ref(0);
const modelValB = ref('After');
const modelNumB = ref(0);

const onUpdated = (num: number) => {
  console.log(`modelNumB is now: ${num}!`);
};
</script>
