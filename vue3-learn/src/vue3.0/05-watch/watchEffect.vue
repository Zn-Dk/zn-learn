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
import { reactive, ref, toRef, watchEffect } from 'vue'

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

    // 提前写一个 ( 令对象基础值也变为响应式的办法 ) (这个数据还与原对象产生关联)
    let salary = toRef(person.job.s, 'salary')

    // watchEffect 传入一个回调函数
    // 不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性
    // 只要出现在watchEffect的变量发生改变,这个回调都会从头到尾执行
    // 适合在那种多个数据联动进行操作
    // 这个函数在 setup 的时候就会立即执行一次 ( immediate )
    watchEffect(() => {
      console.log(msg.value, 'msg')
      console.log(person.name, '修改姓名,涨薪!')
      salary.value += 100
    })

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
