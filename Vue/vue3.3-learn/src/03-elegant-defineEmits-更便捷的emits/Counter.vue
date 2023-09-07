<template>
  <button
    class="mr6"
    @click="onAdd"
  >
    Counter is
    {{ count }}
  </button>
  <button @click="onReset">Reset</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const INIT_VAL = 0;
const count = ref(INIT_VAL);

// BEFORE:
// 事件名必须通过 event 参数带出, 反直觉
// defineEmits<{
//   (event: 'change', val: number): void;
//   (event: 'reset', info: string, ...rest: any[]): void;
// }>();

// NOW
// 支持以下这种写法 更符合直觉
const emits = defineEmits<{
  change: [val: number];
  reset: [info: string, ...rest: any[]];
}>();

const onAdd = () => {
  count.value += 1;
  emits('change', count.value);
};

const resetConfirmCallback = (isPermitted: boolean) => {
  if (isPermitted) {
    count.value = INIT_VAL;
  }
};

const onReset = () => {
  emits('reset', 'Counter wants to reset, accept this change?', resetConfirmCallback);
};
</script>
