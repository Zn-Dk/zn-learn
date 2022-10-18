<template>
  <!--
    emitUpdate 设置为true时 激活一个 'update' 事件
    update (startIndex, endIndex, visibleStartIndex, visibleEndIndex)
   -->
  <h2>vue-virtual-scroller 第三方库 动态</h2>
  <DynamicScroller
    style="width: 300px; height: 360px; overflow-y: auto; border: 1px solid salmon"
    :items="list"
    :min-item-size="50"
    :emitUpdate="true"
    @update="update"
    v-if="list.length"
  >
    <template #default="{ item, index, active }">
      <DynamicScrollerItem
        style="line-height: 50px; margin: 0; transition: background-color 0.3s"
        :item="item"
        :active="active"
        :data-index="index"
        :class="{ active: idx === item.id }"
        @click="idx = item.id"
      >
        <div :key="item.id">{{ item.id }}--{{ item.text }}</div>
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>

<script setup lang="ts">
import { reject } from 'lodash'
import { onMounted, ref } from 'vue'
import { genList, List } from './dataGen'
import ListComp from './ListComp.vue'

let list = ref(genList(10))
let idx = ref(0)
// 每次滚动时时执行
// startIndex 起始序号, endIndex 终止序号, 可见..visibleStartIndex , visibleEndIndex

let timer
let isUpdating = false

const ajaxData = (time: number): Promise<List[]> => {
  return new Promise((resolve, reject) => {
    isUpdating = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      resolve(genList(10))
    }, time)
  })
}

const update = async (startIndex, endIndex) => {
  // console.log(startIndex, endIndex)
  if (endIndex === list.value.length && !isUpdating) {
    console.log('update!')
    let data = await ajaxData(1000)
    list.value = [...list.value, ...data]
    isUpdating = false
  }
}
</script>

<style lang="scss">
.hover {
  background-color: pink;
}
.active {
  background-color: aquamarine;
}
</style>
