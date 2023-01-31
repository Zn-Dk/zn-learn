<template>
  <div class="b">
    <p>Foo:{{foo}}</p>
    <p>Bar:{{bar}}</p>
    <p>Buz:{{buz}}</p>
    <button @click="changeBuz">changeBuz</button>
    <br>
    <br>
    <button @click="changeBar">changeBar</button>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, Ref } from 'vue';

const foo = inject('foo')

// 第二个参数是默认值, 假如希望在孙组件修改祖组件传入的值
// 1. inject需声明响应式的泛型
// 引入大写Ref(interface) => Ref<boolean> 如果是对象 声明一个对象属性的 type
// 2. 第二参数给出对应的默认值 比如 ref(false)
// 3. 暂时没有发现 reactive 可以被修改 如果要修改对象请用 ref

const buz = inject<Ref<number>>('buz', ref(0))

const changeBuz = () => {
  buz.value = 100
}

type obj = {
  a: number,
  b: number
}
const bar = inject<Ref<obj>>('bar', ref({ a: 0, b: 0 }))
const changeBar = () => {
  bar.value.b = 1231245
}

</script>

<style lang="stylus">
.b
  width 300px
  height 300px
  background-color skyblue
</style>