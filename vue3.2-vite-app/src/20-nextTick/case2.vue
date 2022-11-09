<template>
  <!-- nextTick 的第二个使用场景 -->
  <span>姓名:</span>
  <span v-show="!isShow">{{ name }}</span>
  <input ref="iptRef" type="text" v-model="name" v-show="isShow" />
  <!-- 点击按钮后自动聚焦 input -->
  <button @click="changeName">{{ isShow ? '确定' : '编辑' }}</button>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

const isShow = ref(false)
const name = ref('张三')
const iptRef = ref<HTMLInputElement>()

const changeName = () => {
  isShow.value = !isShow.value

  // 在nextTick才能获取DOM
  nextTick(() => {
    iptRef.value.focus()
  })
}
</script>

<style lang="scss"></style>
