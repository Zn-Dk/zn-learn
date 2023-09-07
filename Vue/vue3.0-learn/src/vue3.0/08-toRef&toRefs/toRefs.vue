<template>
  <h1>toRef</h1>
  <p v-if="nperson">{{ nperson }}</p>
  <h2>个人信息</h2>
  <br />
  <p>姓名 : {{ name }} 年龄 : {{ age }}</p>
  <p>状态 : {{ job.type }} 工资 : {{ salary }}</p>
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
import { reactive, toRef, toRefs } from 'vue'

export default {
  // 可以批量创建多个 ref 对象,
  // (return的时候解构出来即可, 如果希望把属性都拆解出来做响应式 这个方法就很方便)
  // setup 语法糖中猜测可能是先需要解构声明
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

    // toRefs(<object>)
    // toRefs 第一个参数 接收reactive原对象/ reactive内部的对象

    // 嵌套在对象内很深的属性 在 toRefs 之前转换
    let salary = toRef(person.job.s, 'salary')

    let nperson = toRefs(person)
    person = toRefs(person)

    // 每个键值都变为 ObjectRefImpl
    console.log(person)

    return {
      ...person,
      nperson,
      salary,
    }
  },
}
</script>

<style lang="stylus"></style>
