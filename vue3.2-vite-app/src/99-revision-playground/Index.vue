<template>
  <p>Computed fullName : {{ fullName }}</p>
  <hr />
  <div>
    <h3>asd</h3>
    <p ref="refTest">ref test</p>
    <p :ref="getRef">getRef function test</p>
  </div>

  <div>
    <p>refV: {{ refV.a }}, shallowRefV:{{ shallowRefV.a }}</p>
    <button @click="changeRef">Click button to change refV and shallowRefV together</button>
  </div>
  <hr />
</template>

<script setup lang="ts">
import { computed, shallowRef } from '@vue/reactivity'
import { onMounted, ref } from 'vue'

//复习1 computed
let firstName = ref('John')
let lastName = ref('Doe')
// ts 推导的类型
let fullName = computed(() => {
  return firstName.value + '___' + lastName.value
})

//// 复习2 ref
const refTest = ref<any>(null)
onMounted(() => {
  console.log(refTest.value, 'refTest')
})
// 通过函数获取
const getRef = el => console.log(el)

const refV = ref({
  a: 1,
})
const shallowRefV = shallowRef({
  a: 1,
})

// shallowRef 和 ref 一起使用会有bug shallowRef 的值更改生效了, 但是单独使用 shallow 则不会
const changeRef = () => {
  refV.value.a = 2
  shallowRefV.value.a = 2
}
</script>

<style>
p {
  font-size: 16px;
}

h3 {
  font-size: 20px;
}
</style>
