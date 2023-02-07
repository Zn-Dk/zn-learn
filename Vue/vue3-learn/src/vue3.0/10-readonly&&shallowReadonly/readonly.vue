<template>
  <h1>只读 readonly / shallowReadonly</h1>

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
import { readonly, reactive, toRefs, shallowReadonly } from 'vue'

export default {
  // - readonly: 让一个响应式数据变为只读的（深只读）。
  // - shallowReadonly：让一个响应式数据变为只读的（浅只读）。
  // - 应用场景: 不希望数据被修改时。
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

    // 将一个 reactive 对象传入
    // person = readonly(person)

    // 将一个 reactive 对象传入 浅只读(外层)
    // 可以看到 能够修改 salary 不能修改 name
    person = shallowReadonly(person)

    return {
      ...toRefs(person),
    }

    // 此时修改数据 会出现警告提示这个数据是只读的  [Vue warn] Set operation on key "name" failed: target is readonly.
  },
}
</script>

<style lang="stylus"></style>
