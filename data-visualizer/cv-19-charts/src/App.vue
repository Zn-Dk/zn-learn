<template>
  <div class="left-blk"></div>
  <div class="center-blk">
    <div id="map"></div>
  </div>
  <div class="right-blk"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts' // echarts 5+ 必须以这种方式引入
import './core/china' //引入core china.js
import { onMounted } from 'vue';
import { useChartStore } from './stores';
import chartOptions from './configs/chartOptions' // echarts 配置
import { geoCoordMap } from '@/core/geoMap' // 省份经纬度
const store = useChartStore()


onMounted(async () => {
  await store.fetchList()
  const province = store.list.diseaseh5Shelf.areaTree[0].children

  const dataList = province.map(v => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.today.confirm),
    }
  })
  /*
    每条省份 data 的格式
    {
      name: '广东',
      value:[ 经度 , 纬度 , 当日新增病例 ] (新增病例从 v.today.confirm 获取)
    }
  */
  const chart = echarts.init(document.querySelector('#map') as HTMLElement)
  chart.setOption(chartOptions(dataList))
  chart.on('click', (e) => {
    console.log(e  )
  })
})
</script>

<style lang="scss">
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
}

#app {
  display: flex;
  background-color: rgba(50, 84, 104, 0.5);
}

#map {
  width: 100%;
  height: 100%;
}

.left-blk,
.right-blk {
  width: 10%;
}

.center-blk {
  width: 80%;
}
</style>