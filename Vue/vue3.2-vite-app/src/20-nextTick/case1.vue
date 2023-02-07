<template>
  <!-- nextTick 的第一个使用场景 -->
  <!-- v-if 获取标签值 -->
  <p ref="msg" v-if="isShow">这段文字被隐藏了,你拿的到吗</p>
  <button @click="getMsg">Get Message</button>
  <p>获取到的值: {{ msg1 }}</p>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

const isShow = ref(false)
// v-if 为 false 这时候 DOM 没有被渲染
// 无法获取元素
const msg = ref<HTMLParagraphElement>()
const msg1 = ref('')
const getMsg = () => {
  isShow.value = true
  // DOM的显示要到setup钩子结束后
  // 所以下面的代码报错 Cannot read properties of undefined (reading 'innerText')
  // msg1.value = msg.value.innerText

  // 在nextTick就可以获取DOM了
  nextTick(() => {
    console.log(msg.value)
    msg1.value = msg.value.innerText
  })
}
</script>

<style lang="scss"></style>
