<template>
  <div class="left-blk">
    <ul class="top-info-card" v-if="store.chinaAdd">
      <li v-for="item in infoCardCfg" :key="item.title">
        <!-- keyof ChinaAdd 类型 表明键值一定是存在与这个接口的,
          如果没有接口/类型 使用 keyof typeof obj , 即 typeof 先获取对象的类型 -->
        <p>较上日 <span>+{{ store.chinaAdd[item.top as keyof ChinaAdd ] }}</span></p>
        <p>{{ store.chinaTotal[item.mid as keyof ChinaTotal ] }}</p>
        <p>{{item.title}}</p>
      </li>
    </ul>
    <div id="charts-pie"></div>
  </div>
  <div class="center-blk">
    <div id="map"></div>
  </div>
  <div class="right-blk">
    <table v-show="isShow && store.item" class="right-table" border="1" cellspacing="0">
      <thead>
        <tr>
          <th>地区</th>
          <th>新增确诊</th>
          <th>累计确诊</th>
          <th>治愈</th>
          <th>死亡</th>
        </tr>
      </thead>
      <tr v-for="item in store.item" :key="Math.random()">
        <td align="center">{{item.name}}</td>
        <td align="center">{{item.today.confirm}}</td>
        <td align="center">{{item.total.confirm}}</td>
        <td align="center">{{item.total.heal}}</td>
        <td align="center">{{item.total.dead}}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import '@/core/china' //引入core china.js
import * as echarts from 'echarts' // echarts 5+ 必须以这种方式引入
import { useChartStore } from './stores';

import { optionsChinaMap, optionsPie } from '@/configs/chartOptions' // echarts 配置
import { geoCoordMap } from '@/configs/geoMap' // 省份经纬度
import infoCardCfg from '@/configs/infoCardCfg' // 卡片信息
import type { ChinaAdd, ChinaTotal } from "@/core/type";

const store = useChartStore()
const isShow = ref(false)


// echarts 初始化
const initChart = (selector: string, optionsFn: Function, data: object, callback?: Function) => {
  const chart = echarts.init(document.querySelector(selector) as HTMLElement)
  chart.setOption(optionsFn(data))
  typeof callback === 'function' && callback(chart)
}

// 地图
const initMap = (el: string) => {
  const province = store.list.diseaseh5Shelf.areaTree[0].children
  const dataList = province.map(v => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.today.confirm),
      children: v.children,
    }
  })
  /*
    每条省份 data 的格式
    {
      name: '广东',
      value:[ 经度 , 纬度 , 当日新增病例 ] (新增病例从 v.today.confirm 获取),
      children : v.children // 各城市信息
    }
  */
  initChart(el, optionsChinaMap, dataList, (chart: echarts.ECharts) => {
    // 点击时显示右侧表格 将 children 传递给 store
    chart.on('click', (e: any) => {
      console.log(e)
      isShow.value = true
      store.item = e.data.children
    })
  })
}

// 饼图
const initPie = (el: string) => {
  initChart(el, optionsPie, store.newTop10)
}

onMounted(async () => {
  await store.fetchList()
  initMap('#map')
  initPie('#charts-pie')
})
</script>

<style lang="scss">
$-itemColor: #41b0db;
$-itemBg: #223651;
$-itemBorder: #212028;

* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

#app {
  display: flex;
  color: #f1f1f1;
  background-color: rgba(50, 84, 104, 0.5);
}

#map {
  height: 100%;
}

.left-blk {
  position: relative;
  width: 400px;

  .top-info-card {
    // position: absolute;
    display: grid;
    list-style-type: none;
    margin: 0;
    padding: 0;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    background-color: rgba($color: $-itemBg, $alpha: .85);

    li {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 10px;
      line-height: 32px;
      border-bottom: 1px solid $-itemBorder;
      border-right: 1px solid $-itemBorder;

      p:nth-of-type(2) {
        font-weight: bold;
        color: $-itemColor;
      }

      span {
        color: rgb(255, 71, 71);
        font-size: 12px;
      }
    }
  }

  #charts-pie {
    width: 100%;
    height: 400px;
  }
}


table {
  background-color: $-itemBorder;
}

.right-blk {
  width: 400px;

  .right-table {
    width: 100%;
    background-color: rgba($color: $-itemBg, $alpha: .5);

    tr {
      th {
        padding: 5px;
        white-space: nowrap;
      }

      td {
        padding: 5px 10px;
        width: 100px;
        white-space: nowrap;
      }
    }
  }
}

.center-blk {
  // width: 1500px;
  flex: 1;
  padding: 20px;
  overflow-y: hidden;
  overflow-x: auto;
}
</style>