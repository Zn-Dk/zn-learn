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

// 如果需要实现默认值 可以在defineProps 外层 再套一层
// withDefaults , 第一个参数传入 defineProps, 第二个参数填写对应的默认值
// withDefaults(props: unknown, defaults: InferDefaults<unknown>): {}
withDefaults(defineProps<
  {
    name?: string,
    age?: number,
    list?: IList[],
  }
>(), {
  name: '默认名称',
  age: 10,
  // 对象或数组的默认值
  // 必须从一个工厂函数返回。
  // 该函数接收组件所接收到的原始 prop 作为参数。
  list: (rawProps) => [{ id: 0, content: '默认内容' }]
})



</script>

<style lang="scss">

</style>