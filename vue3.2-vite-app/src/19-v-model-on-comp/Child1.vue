<template>
  <!-- v-model 给组件传递 props -->
  <div>
    <h3>组件 v-model:title 自定义名称</h3>
    <p>title: {{ title }}</p>
    <input type="text" v-model="newTitle" />
    <button @click="updateTitle">changeTitle</button>
    <p>同理 v-model:attr 在一个组件上就能创建多个 v-model 双向绑定</p>
    <input type="text" v-model="newPrice" />
    <button @click="updatePrice">changePrice</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 自定义 v-model props 名称
defineProps<{
  title: string
  price: number
}>()

const newTitle = ref('')
const newPrice = ref(0)

const emit = defineEmits<{
  (e: 'update:title', newTitle: string): void
  (e: 'update:price', newPrice: number): void
}>()

// 更新
const updateTitle = () => {
  emit('update:title', newTitle.value)
}
const updatePrice = () => {
  emit('update:price', newPrice.value)
}
</script>

<style lang="scss"></style>
