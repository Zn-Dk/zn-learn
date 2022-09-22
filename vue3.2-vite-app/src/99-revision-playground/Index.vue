<template>
  <p>Computed fullName : {{fullName}}</p>
  <hr>
  <div>
    <h3>asd</h3>
    <p ref="refTest">ref test</p>
    <p :ref="getRef">getRef function test</p>
  </div>
  <hr>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';

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
const getRef = (el) => console.log(el)
</script>

<style >
p {
  font-size: 16px;
}

h3 {
  font-size: 20px;
}
</style>