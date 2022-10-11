<template>
  <!-- v-model 给组件传递 props -->
  <div>
    <h3>父组件绑定子组件 v-model 默认属性为 modelValue(必须这个属性名)</h3>
    <!-- @input="$emit('update:modelValue', $event.target.value) TS会产生类型报错 -->
    <input type="text" @input="updateFoo" />
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', msg: string): void
}>()

// 更新 foo
const updateFoo = (e: InputEvent) => {
  let target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style lang="scss"></style>
