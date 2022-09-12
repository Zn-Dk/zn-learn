<template>
  <p>{{ count }}</p>
  <button @click="addHandler">+</button>

  <!-- v-bind 多属性的对象 -->
  <!-- <div a="1" b="2"></div> -->
  <div v-bind="obj">
    <p>a={{ obj.a }}, b={{ obj.b }}</p>
  </div>

  <button @click="showHandler">{{ btnText }}</button>
  <p v-if="showP">showP</p>
</template>
github
<script>
import { onMounted, reactive /*h*/, ref } from 'vue'
export default {
  setup() {
    //组合式API
    //ref 传入基本数据类型 使其变为响应式元素
    const count = ref(0)
    const obj = reactive({ a: 1, b: 2 })

    function addHandler() {
      //必须使用 .value 读写内部的值
      count.value++
    }

    let showP = ref(false)
    let btnText = ref('显示元素')
    function showHandler() {
      //必须使用 .value 读写内部的值
      showP.value = !showP.value
      btnText.value = showP.value ? '隐藏元素' : '显示元素'
    }

    onMounted(() => {
      //必须使用 .value 读写内部的值
      console.log('初始值: ' + count.value)
    })

    // 所有需要暴露的属性 方法 都需要 return 出去

    // 使用渲染函数
    // return () => h('h1', 'Hello,composition')

    return {
      count,
      obj,
      addHandler,
      showP,
      btnText,
      showHandler,
    }
  },
}
</script>

<style lang="stylus"></style>
