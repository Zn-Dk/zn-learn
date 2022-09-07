<template>
  <div>
    <p>{{ count }}</p>
    <button @click="addHandler">+</button>

    <!-- v-bind 多属性的对象 -->
    <!-- <div a="1" b="2"></div> -->
    <div v-bind="obj">
      <p>{a:{{ obj.a }}, b:{{ obj.b }}}</p>
    </div>

    <button @click="showHandler">{{ btnText }}</button>
    <p v-if="showP">showP</p>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

//组合式API

// script setup 声明的变量 不再需要 return 任何变量或者方法，定义后可直接在模板中使用

//ref 传入基本数据类型 使其变为响应式元素
const count = ref(0);
const obj = reactive({ a: 1, b: 2 });

function addHandler() {
  //必须使用 .value 读写内部的值
  count.value++;
}

let showP = ref(false);
let btnText = ref("显示元素");
function showHandler() {
  //必须使用 .value 读写内部的值
  showP.value = !showP.value;
  btnText.value = showP.value ? "隐藏元素" : "显示元素";
}

onMounted(() => {
  //必须使用 .value 读写内部的值
  console.log("初始值: " + count.value);
});
</script>

<style lang="stylus">
</style>
