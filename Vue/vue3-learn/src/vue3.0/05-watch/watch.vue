<template>
  <h1>Watch 的几大要点</h1>
  <br />
  <h3>Count: {{ count }}</h3>
  <button @click="count++">点我count+</button>
  <input type="text" v-model="msg" />
  <br />
  <h2>个人信息</h2>
  <br />
  <p>姓名 : {{ person.name }} 年龄 : {{ person.age }}</p>
  <p>状态 : {{ person.job.type }} 工资 : {{ salary }}</p>
  <br />
  <button @click="person.name += '!'">修改姓名</button>
  <br />
  <button @click="salary += 100">增加工资</button>
  <br />
  <br />
</template>

<script>
import { reactive, ref, toRef, watch } from 'vue'

export default {
  //watch 注意的几大要素
  setup() {
    // 基本数据类型
    let count = ref(0)
    let msg = ref('Hello')
    // 引用数据类型
    let person = reactive({
      name: '张三',
      age: 25,
      job: {
        type: 'employed',
        s: {
          salary: 20000,
        },
      },
    })

    // 提前写一个 ( 令对象基础值也变为响应式的办法 )
    let salary = toRef(person.job.s, 'salary')

    // Case 1 Watch ref
    // watch(
    //   count,
    //   (newV, oldV) => {
    //     console.log('count:', newV, oldV)
    //   },
    //   //{ immediate: true }, // 立即监视可用
    // )

    // Case 2 同时Watch 多个ref
    // watch(
    //   [count, msg],
    //   (newV, oldV) => {
    //     // newV, oldV 拿到的是一个数组
    //     console.log('count:', newV[0], oldV[0])
    //     console.log('msg:', newV[1], oldV[1])
    //   },
    //   { immediate: true }, // 立即监视可用
    // )

    // Case 3 Watch 整个reactive对象
    // tip1 reactive (Proxy)默认开启了深层监视 deep (不需要手动)
    // tip2 reactive对象监视 oldValue 拿不到
    // 此时无论是对象哪一层的属性发生变化 都会被监视
    // watch(person, (newV, oldV) => {
    //   console.log('person', newV, oldV)
    // })

    //Case 4 Watch reactive对象的内部属性(原始值)
    // 监视reactive定义的响应式数据中某个属性时：deep配置有效。
    // 如果是基本类型的 需要写成回调(而且可以获取 oldvalue)
    // 如果是引用类型的 因为本身深层监视了,直接写属性(不可以获取 oldvalue)
    watch(
      // person.job,
      // () => person.name,
      () => person.job.s.salary,
      (newV, oldV) => {
        console.log('salary', newV, oldV)
      },
      // { deep: true },
    )

    //Case 5 Watch 多个reactive对象的内部属性
    // watch(
    //   [() => person.name, () => person.job.s.salary],
    //   (newV, oldV) => {
    //     console.log('person changed', newV, oldV)
    //   },
    //   // { deep: true },
    // )

    return {
      count,
      msg,
      person,
      salary,
    }
  },
}
</script>

<style lang="stylus"></style>
