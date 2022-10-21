<template>
  <h1>shallow 浅层 Ref/Reactive</h1>
  <br />
  <h3>Count: {{ count }}</h3>
  <button @click="count++">点我count+</button>
  <br />
  <h2>个人信息</h2>
  <br />
  <p>姓名 : {{ name }} 年龄 : {{ age }}</p>
  <p>状态 : {{ job.type }} 工资 : {{ job.s.salary }}</p>
  <br />
  <button @click="name += '!'">修改姓名</button>
  <br />
  <button @click="job.s.salary += 100">增加工资</button>
  <br />
  <br />
</template>

<script>
import { ref, shallowReactive, shallowRef, toRefs } from 'vue'

export default {
  // shallowRef / shallowReactive
  // 使用 shallow - 两种方法优化性能
  /*
    如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
    如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

  */

  setup() {
    // ref / reactive 默认都会建立深层次的响应式机制
    // 如果 ref 传入了一个引用类型数据 也会因为 deep 遍历损失性能
    // let count = ref(0)
    let count = shallowRef(0) //基本数据类型没意义

    let msg = ref('Hello')

    // 只对第一层数据建立响应式
    let person = shallowReactive({
      name: '张三',
      age: 25,
      job: {
        type: 'employed',
        s: {
          salary: 20000, // 深层次的数据将会是一个普通的对象
        },
      },
    })

    // .value 是一个普通对象  而如果是 ref 会经过reactive包装
    let refP = shallowRef({
      name: '张三',
      age: 25,
      job: {
        type: 'employed',
        s: {
          salary: 20000,
        },
      },
    })

    console.log('refP', refP)

    /*
      PS 这里有个 bug shallowRef 和 ref 同时使用会使得 shallowRef 值一起更新

    */

    return {
      count,
      msg,
      ...toRefs(person),
      refP,
    }
  },
}
</script>

<style lang="stylus"></style>
