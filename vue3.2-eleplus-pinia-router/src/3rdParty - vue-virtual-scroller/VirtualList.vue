<template>
  <!--
    item-size 每一条数据的元素高度
   -->
  <h2>vue-virtual-scroller 第三方库 虚拟列表</h2>
  <RecycleScroller
    style="width: 300px; height: 360px; overflow-y: auto; border: 1px solid salmon"
    :key-field="'id'"
    :items="list"
    :item-size="50"
    #default="{ item, index, active }"
  >
    <p
      style="line-height: 50px; margin: 0; transition: background-color 0.3s"
      :key="index"
      :class="{ active: idx === item.id }"
      @click="idx = item.id"
    >
      {{ item.id }}--{{ item.text }}
    </p>
  </RecycleScroller>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { genList } from './dataGen'
import ListComp from './ListComp.vue'

let list = ref(genList(1000))
let idx = ref(0)
</script>

<style lang="scss">
.hover {
  background-color: pink;
}
.active {
  background-color: aquamarine;
}
</style>
