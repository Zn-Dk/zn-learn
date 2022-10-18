<template>
  <el-card>
    <template #header>
      <h2>虚拟列表</h2>
    </template>
    <el-table-v2
      :sort-state="sortState"
      @column-sort="onSort"
      :columns="columns"
      :data="list"
      :width="700"
      :height="300"
    >
    </el-table-v2>
  </el-card>
</template>

<script setup lang="ts">
import { genList, columns } from './dataGen'
import type { SortBy, SortState } from 'element-plus'
import { TableV2SortOrder } from 'element-plus'
import { ref, h, render } from 'vue'
let list = ref(genList(1000))

// let vn = h(
//   'div',
//   {
//     class: 'bar',
//     onClick: e => {
//       e.target.style.color = 'red'
//     },
//   },
//   [h('h1', 'Hello Title'), h('p', 'I'm p tag.')],
// )
// render(vn, document.body)

// 排序 方法

// 单列排序
// const sortState = ref<SortBy>({
//   key: 'id',
//   order: TableV2SortOrder.ASC, // 升序
// })

// 多列排序
const sortState = ref<SortState>({
  index: TableV2SortOrder.ASC, // 升序
  id: TableV2SortOrder.ASC, // 降序
})

// 事件
const onSort = ({ key, order }: SortBy) => {
  console.log(key, order)
  sortState.value[key] = order // 排序状态

  const sortType = order === 'asc' ? 1 : -1
  list.value.sort((a, b) => (a[key] > b[key] ? sortType : -sortType))

  // sortState.value = sortBy // 每次点击 会在 DESC(降序) 和 ASC(升序) 之间切换
}
</script>

<style lang="scss"></style>
