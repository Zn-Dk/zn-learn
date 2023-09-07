<template>
  <div class="father">
    <h1>我是Father</h1>
    <!-- 两个插槽 -->
    <!-- "default" 默认-加载完成的  放组件 -->
    <!-- "fallback" 未加载的 放预置内容 -->
    <Suspense>
      <!-- <template #default>  可以不写 默认插槽-->
      <Child />
      <!-- </template> -->
      <template #fallback>
        <div class="skeleton-wrapper">
          <header class="skeleton-header"></header>
          <section class="skeleton-block" v-for="i in arr" :key="i">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTA4MCAyNjEiPjxkZWZzPjxwYXRoIGlkPSJiIiBkPSJNMCAwaDEwODB2MjYwSDB6Ii8+PGZpbHRlciBpZD0iYSIgd2lkdGg9IjIwMCUiIGhlaWdodD0iMjAwJSIgeD0iLTUwJSIgeT0iLTUwJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij48ZmVPZmZzZXQgZHk9Ii0xIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlQ29sb3JNYXRyaXggaW49InNoYWRvd09mZnNldE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAuOTMzMzMzMzMzIDAgMCAwIDAgMC45MzMzMzMzMzMgMCAwIDAgMCAwLjkzMzMzMzMzMyAwIDAgMCAxIDAiLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEpIj48dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggZmlsbD0iI0Y2RjZGNiIgZD0iTTIzMCA0NGg1MzN2NDZIMjMweiIvPjxyZWN0IHdpZHRoPSIxNzIiIGhlaWdodD0iMTcyIiB4PSIzMCIgeT0iNDQiIGZpbGw9IiNGNkY2RjYiIHJ4PSI0Ii8+PHBhdGggZmlsbD0iI0Y2RjZGNiIgZD0iTTIzMCAxMThoMzY5djMwSDIzMHpNMjMwIDE4MmgzMjN2MzBIMjMwek04MTIgMTE1aDIzOHYzOUg4MTJ6TTgwOCAxODRoMjQydjMwSDgwOHpNOTE3IDQ4aDEzM3YzN0g5MTd6Ii8+PC9nPjwvc3ZnPg=="
            />
          </section>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
// import Child from './Child.vue' // 静态引入 必须所有加载完成页面才会显示 如果子组件及子组件内部的孙组件没有加载完成页面不会有显示

// 引入异步组件 (异步组件的setup 可以是异步的 async await)
const Child = defineAsyncComponent(() => import('./Child.vue'))
// 异步组件的缺点 如果内容没有加载出来
// 1. 布局会改变
// 2. 用户会误以为没有内容 然后突然出现 体验不好

// 借助 Suspense (支撑 骨架) 实现预留的占位 ( 骨架屏 )

export default {
  components: { Child },
  setup() {
    let arr = [1, 2, 3, 4, 5, 6]
    return { arr }
  },
}
</script>

<style lang="stylus">
.father
  background-color skyblue
  width 600px

.skeleton-block {
  display: flex;
  flex-direction: column;
  padding-top: 8px;
}
</style>
