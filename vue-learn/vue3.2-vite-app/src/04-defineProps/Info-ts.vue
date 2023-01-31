<template>
  <h2>Personal Info</h2>
  <p>name: {{ name }}</p>
  <p>age: {{ age }}</p>
  <h3>List</h3>
  <ul>
    <!-- 因为有了类型声明 可以很好的检查数据类型 并且语法提示 -->
    <li v-for="item in list" :key="item.id">{{item.content}} {{item.jazz}}</li>
  </ul>
</template>
<script setup lang="ts">
// 使用 ts 的类型声明 可以健全完备的类型 对传入的数据进行判断 和语法自动提示
// 泛型的方法使用 defineProp<.....>()
// 类型声明后 括号内就不用传入配置对象了(也允许传)

// 接口暂不支持引入，因为 setup 语法糖会将 List 编译成一个变量，因此只能在文件内写
interface IList {
  readonly id: number
  content: string,
  jazz?: string
}
// type 同理


// defineProp 返回一个包含 props 的对象
// const props = defineProps<
//   {
//     name: string,
//     age: number,
//     // 字面量的方式声明 (如果写的很长还是建议写到接口里)
//     // list?: { id: number, content: string, jazz?: string }[]
//     // 实现接口
//     list?: IList[],
//   }

// >()

// // 如果 script 中需要用到 props 可以这样获取
// console.log(props.list, 'list')
// console.log(props.age, 'age')


// 通过解构的方式取值 也是可行的
const { name, age, list } = defineProps<
  {
    name: string,
    age: number,
    list?: IList[],
  }
>()

console.log(name, age, list)


</script>

<style lang="scss">

</style>