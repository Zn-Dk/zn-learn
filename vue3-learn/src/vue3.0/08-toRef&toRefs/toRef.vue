<template>
  <h1>toRef</h1>
  <p>{{ person }}</p>
  <h2>个人信息</h2>
  <br />
  <p>姓名 : {{ name }} 年龄 : {{ age }}</p>
  <p>状态 : {{ person.job.type }} 工资 : {{ salary }}</p>
  <br />
  <button @click="name += '!'">修改姓名</button>
  <br />
  <button @click="age += 1">修改年龄</button>
  <br />
  <button @click="salary += 100">增加工资</button>
  <br />
  <br />
</template>

<script>
import { reactive, toRef } from 'vue'

export default {
  // toRef 创建一个 ref 对象，其value值指向另一个reactive对象中的某个属性。
  // toRef 能够将 reactive 内的基本数据类型转换成响应式的数据
  // 并且能够保证与原对象的关联
  // 适用于: 数据嵌套很深 能够通过变量替代 (避免多次链式查找损耗性能)
  setup() {
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

    // toRef(<object>,<key>)
    // toRef 第一个参数 接收reactive原对象/ reactive内部的对象 第二个参数为object 内的key(可以参考TS声明)

    /*
    错误的两种示范
    let age = person.age // 单纯取值
    let age = ref(person.age) // 无法跟源对象关联
    */

    let age = toRef(person, 'age')
    let name = toRef(person, 'name')

    // 比如 salary 嵌套在对象内很深的地方
    let salary = toRef(person.job.s, 'salary')
    return {
      person, // 将剩余不常用的对象整体也一并导出
      name,
      age,
      salary,
    }
  },
}
</script>

<style lang="stylus"></style>
