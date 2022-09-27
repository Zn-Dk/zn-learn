<template>
  <div class="left-blk"></div>
  <div class="center-blk">
    <div id="map"></div>
  </div>
  <div class="right-blk"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts' // echarts 5+ 必须以这种方式引入
import { onMounted } from 'vue';
import { useChartStore } from './stores';
import { getApiList } from './http/index'

const fetchList = async () => {
  let result = await getApiList()
  console.log(result)
}

const store = useChartStore()

onMounted(() => {
  fetchList()
  let ele: HTMLElement = document.querySelector('#map') as HTMLElement
  echarts.init(ele)
})
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
</style>