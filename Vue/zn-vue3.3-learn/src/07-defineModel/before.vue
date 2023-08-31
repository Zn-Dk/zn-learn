<script setup lang="ts">
// 传统语法 需要同时定义 props , emits, eventHandler

const props = defineProps<{
  modelValue: string;
  num: number;
}>();

const emits = defineEmits(['update:modelValue', 'update:num']);

const onInput = (e: Event) => {
  emits('update:modelValue', (e.target as HTMLInputElement).value);
};

const onAdd = () => {
  emits('update:num', props.num + 1);
};
</script>

<template>
  <div>
    <p>v-model on component 传统语法</p>
    <input type="text" :value="modelValue" @input="onInput" />
    <button @click="onAdd">num: {{ num }}</button>
  </div>
</template>
