<template>
  <span>{{ count }}</span> &nbsp;
  <button @click="addHandler">+</button>
  <br />
  <br />
  <!-- v-bind 多属性的对象 -->
  <!-- <div a="1" b="2"></div> -->
  <div v-bind="obj">
    <p>obj reactive 内部的 a={{ obj.a }}, b={{ obj.b }}</p>
  </div>
  <button @click="objHandler">修改obj</button>
  <br />
  <br />
  <button @click="changeFoo">修改Foo</button>
  <p>refFoo现在是: {{ refFoo }}, foo现在是: {{ foo }}, 由此可见 ref 包裹后原数据不会跟着改变</p>
  <br />
  <br />
  <button @click="showHandler">{{ btnText }}</button>
  <p v-if="showP">showP</p>
</template>
github
<script>
import { reactive /*h*/, ref } from 'vue'
export default {
  setup() {
    //组合式API
    //ref 传入基本数据类型 使其变为响应式元素

    // 组合式API 的好处 代码可以成块存在 而不需要像以前 method data... 割裂

    //#region
    const count = ref(0)
    function addHandler() {
      // ref 属性必须使用 .value 读写内部的值
      count.value++
      console.log(count)
      // ref包装后变为, RefImpl 对象(Reference Implement 实现) .value实际是在原型对象上 额外拷贝到了当前实例
      // 存在 get value/ set value 函数, 本质依然是 Object.defineProperty
    }
    //#endregion

    //#region
    const obj = reactive({ a: 1, b: 2 })
    function objHandler() {
      obj.a++
      obj.b++
      console.log(obj)
      // reactive包装后变为,Proxy 对象 可以直接修改并且是响应式的
    }
    //#endregion

    const obj2 = ref({ n: 1 })
    console.log(obj2) // 如果ref 传入了一个引用类型对象, 则会自动包装成 reactive的 proxy,
    console.log(obj2.value) // 通过 .value 取出这个包装的 Proxy 但是为了方便和区分 建议引用类型不要写 ref ( 直接.属性修改他不香吗?)

    let foo = 'foo'
    let refFoo = ref(foo)
    //  ref 包裹后原数据不会跟着改变
    function changeFoo() {
      refFoo.value = refFoo.value === 'bar' ? 'foo' : 'bar'
    }

    //#region
    let showP = ref(false)
    let btnText = ref('显示元素')
    function showHandler() {
      showP.value = !showP.value
      btnText.value = showP.value ? '隐藏元素' : '显示元素'
    }
    //#endregion

    // 所有需要暴露的属性 方法 都需要 return 出去

    // 使用渲染函数
    // return () => h('h1', 'Hello,composition')

    return {
      count,
      addHandler,
      obj,
      objHandler,
      foo,
      refFoo,
      changeFoo,
      showP,
      btnText,
      showHandler,
    }
  },
}
</script>

<style></style>
