<template>
  <div class="tree-list-item" @click.stop="clickItem(data)" v-for="(data,index) in list" :key="index">
    <h3 class="tree-list-title">{{data.title}}</h3>
    <p class="tree-list-body">{{data.body}}</p>
    <!-- 在循环中调用自身 -->
    <!-- 给递归组件内部嵌套元素绑定事件的时候 注意要派发一个自身组件的事件 传入 emit 冒泡到祖元素 -->
    <!-- <TreeList v-if="data?.children?.length" :list="data.children" @on-click="clickItem" /> -->
    <!-- 如果使用字面量形式触发, 自定义事件的 $event 就是 上下文 context, 也就是 data -->
    <TreeList v-if="data?.children?.length" :list="data.children" @on-click="$emit('on-click',$event)" />
  </div>
</template>

<script setup lang="ts">
// 递归组件使用的几大要素
// 1.需要在v-for 循环中引入自身
// 2.从上级接收属性
// 3.将 Children 数组数据扔到循环内的自身属性上 (注意组件名称)
// 4.派发Children嵌套事件时需要将自己组件的事件再派发一次 让事件冒泡到祖元素(别忘了.stop修饰符)

import TreeList from './TreeList.vue'
import { ITree } from './interfaces'

// interface ITree {
//   title: string,
//   body?: string,
//   children?: ITree[] | []// children 也是接口自身
// }

defineProps<{
  list?: ITree[]
}>()



// 测试父组件事件传递
const emits = defineEmits<{
  (e: 'on-click', data: ITree): void
}>()

const clickItem = (data: ITree) => {
  emits('on-click', data)
}

</script>

<style lang="scss">
.tree-list {
  &-item {
    margin-left: 10px;
  }

  &-title {
    font-size: 20px;
    font-weight: 500;
  }

  &-body {
    font-size: 14px;
    text-indent: 2em;
  }
}
</style>

