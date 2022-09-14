<template>
  <h1>只读 readonly / shallowReadonly</h1>

  <h2>个人信息</h2>
  <br />
  <p>姓名 : {{ name }} 年龄 : {{ age }}</p>
  <p>状态 : {{ job.type }} 工资 : {{ job.s.salary }}</p>
  <br />
  <p v-if="person.hobby">爱好: {{ person.hobby?.name }} 喜爱程度: {{ person.hobby?.level }}</p>
  <br />
  <button @click="addHobby">新增爱好</button>
  <button @click="changeHobby">修改爱好</button>
  <br />

  <br />
  <br />
</template>

<script>
import { markRaw, reactive, toRefs, isReactive } from 'vue'

export default {
  /*

  ref/reactive数据类型的特点:
  每次修改都会被追踪, 都会更新UI界面, 但是这样其实是非常消耗 性能的
  所以如果我们有一些操作不需要追踪, 不需要更新UI界面, 那么这个时候,
  我们就可以通过toRaw方法拿到它的原始数据, 对原始数据进行修改
  这样就不会被追踪, 这样就不会更新UI界面, 这样性能就好了
  
  - toRaw：
    - 作用：将一个由reactive生成的响应式对象转为普通对象。
    - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。

  - markRaw：
    - 作用：标记一个对象，使其永远不会再成为响应式对象。
    - 应用场景:
      1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
      2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

*/
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

    // 这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。
    // const rawPerson = toRaw(person)
    // console.log(rawPerson)

    // markRaw 标记的用处

    // vue3 的新响应式特性 使得给对象添加新的属性时 也会自动变成响应式的
    function addHobby() {
      let hobby = { name: '打篮球', level: '喜欢' }

      // person.hobby = hobby

      // markRaw标记**数据对象** 再给原来的**reactive对象**添加属性
      // person.hobby = markRaw(hobby)
      // console.log(isReactive(person.hobby)) // false 已经无法响应了

      // markRaw标记整个reactive
      person.hobby = hobby
      person = markRaw(person)
      console.log(person) // Proxy Target 中出现 __v_skip : true
    }

    // markRaw 之后

    function changeHobby() {
      // person.hobby = { name: '唱跳RAP', level: '超级喜欢' } // 这种方式是重写 相当于覆盖了属性 依然会变化
      person.hobby.name = '唱跳RAP' // 不改变
      person.hobby.level = '超级喜欢' // 不改变
    }

    return {
      ...toRefs(person),
      person,
      addHobby,
      changeHobby,
    }
  },
}
</script>

<style lang="stylus"></style>
