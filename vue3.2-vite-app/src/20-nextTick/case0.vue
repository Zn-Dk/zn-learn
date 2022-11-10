<template>
  0000
  <Case2 ref="test" @edit="editName" />
  <div class="f">
    <div class="c"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref, nextTick } from 'vue'
import Case2 from './case2.vue'
const test = ref(null)

onMounted(() => {
  console.log(test.value.isShow)
  console.log(a)
})
onUpdated(() => {
  console.log(test.value.isShow)
})
const editName = showState => {
  test.value.isShow = showState
  // v-if 显示的组件, 在nextTick才能获取DOM
  nextTick(() => {
    test.value.iptRef.focus()
  })
}
</script>

<style lang="scss">
.f {
  width: 400px;
  background-color: pink;
}
</style>
