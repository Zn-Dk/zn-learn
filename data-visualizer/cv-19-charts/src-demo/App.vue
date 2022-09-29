
<template>
  <div :style="{background:`url(${bg})`}" class="box">
    <div class="box-left" style="color:#fff">
      <div class="box-left-card">
        <section>
          <div>较上日+ {{store.chinaAdd.localConfirmH5}}</div>
          <div>{{store.chinaTotal.localConfirm}}</div>
          <div>本地现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{store.chinaAdd.nowConfirm}}</div>
          <div>{{store.chinaTotal.nowConfirm}}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{store.chinaAdd.confirm}}</div>
          <div>{{store.chinaTotal.confirm}}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日+ {{store.chinaAdd.noInfect}}</div>
          <div>{{store.chinaTotal.noInfect}}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+ {{store.chinaAdd.importedCase}}</div>
          <div>{{store.chinaTotal.importedCase}}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+ {{store.chinaAdd.dead}}</div>
          <div>{{store.chinaTotal.dead}}</div>
          <div>累计死亡</div>
        </section>
      </div>
      <div class="box-left-pie"></div>
      <div class="box-left-line"></div>
    </div>
    <div id="china" class="box-center"></div>
    <div class="box-right" style="color:white">
      <table class="table" border="1" cellspacing="0">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group enter-active-class="animate__animated animate__flipInY" tag="tbody">
          <tr v-for="item in store.item" :key="item.name">
            <td align="center">{{item.name}}</td>
            <td align="center">{{item.today.confirm}}</td>
            <td align="center">{{item.total.confirm}}</td>
            <td align="center">{{item.total.heal}}</td>
            <td align="center">{{item.total.dead}}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import bg from "./assets/1.jpg";
import { useStore } from "./stores";
import { onMounted, ref, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import "../src/core/china";
import { geoCoordMap } from "../src/core/geoMap";
import "animate.css";

const store = useStore();
const cityName = ref<string>("广东");

// 卸载前清除计时器，销毁图表Dom
onBeforeUnmount(() => {
  clearInterval(timer);
  console.log("页面卸载");
});
onMounted(async () => {
  await store.getList();
  initCharts();
  initPie();

  await store.getCityList(cityName.value);
  initLine();
});

// 定时器，5s自动更新一个接口
const timer = setInterval(async () => {
  await store.getList();
}, 5 * 1000);

//左边折线图
const initLine = () => {
  const chart = echarts.init(
    document.querySelector(".box-left-line") as HTMLElement
  );

  chart.setOption({
    backgroundColor: "#223651",
    title: {
      text: `${cityName.value}疫情新增趋势`,
      textStyle: { color: "#fff" },
    },
    // 提示框
    tooltip: {
      order: "valueDesc",
      trigger: "axis",
    },
    // 图例
    legend: [
      {
        show: true,
        top: "8%",
        right: "0%",
        orient: "horizontal",
        textStyle: { color: "#fff" },
      },
    ],
    xAxis: {
      type: "category",
      data: store.cityData.map((v) => v.year + "." + v.date),
      nameTextStyle: { color: "#fff" },
      axisLine: {
        lineStyle: { color: "#fff" },
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: { color: "#fff" },
      },
      nameTextStyle: { color: "#fff" },
      axisLine: {
        lineStyle: { color: "#fff" },
      },
    },
    // 缩放
    dataZoom: [
      {
        // inside 内置于图表的缩放组件，slider 独立于图表外的缩放组件
        type: "inside",
        xAxisIndex: [0],
        start: 80,
        end: 100,
      },
      {
        type: "inside",
        yAxisIndex: [0],
        start: 0,
        end: 100,
      },
    ],
    // 设置上下左右边距
    grid: {
      top: "20%",
      left: "3%",
      right: "5%",
      bottom: "5%",
      containLabel: true,
    },
    // 无障碍
    aria: {
      show: true,
    },
    series: [
      {
        name: "新增确诊",
        type: "line",
        smooth: true,
        data: store.cityData.map((v) => v.newConfirm),
      },
      {
        name: "新增治愈",
        type: "line",
        smooth: true,
        data: store.cityData.map((v) => v.newHeal),
      },
      {
        name: "新增死亡",
        type: "line",
        smooth: true,
        data: store.cityData.map((v) => v.newDead),
      },
    ],
  });
};

//中间中国地图
const initCharts = () => {
  const city = store.list.diseaseh5Shelf.areaTree[0].children;
  store.item = city[6].children;
  console.log("中国地图", city);

  const data = city.map((v) => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children,
    };
  });

  const chart = echarts.init(document.querySelector("#china") as HTMLElement);

  chart.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "120%",
      itemStyle: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
      },
      emphasis: {
        areaColor: "#0f5d9d",
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "120%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: "pin",
        symbolSize: [45, 45],
        label: {
          show: true,
          color: "#fff",
          formatter(value: any) {
            return value.data.value[2];
          },
        },
        itemStyle: {
          color: "#1E90FF", //标志颜色
        },
        data: data,
      },
    ],
  });
  chart.on("click", (e: any) => {
    store.item = e.data.children;
  });
};

//左边饼状图
const initPie = () => {
  const chart = echarts.init(
    document.querySelector(".box-left-pie") as HTMLElement
  );
  console.log("饼状图", store.cityDetail);

  chart.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: {
          borderRadius: 4,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "15",
          },
        },
        data: store.cityDetail.map((v) => {
          return {
            name: v.city,
            value: v.nowConfirm,
          };
        }),
      },
    ],
  });
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;
.table {
  width: 100%;
  background: #212028;
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
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
.box {
  height: 100%;
  display: flex;
  &-left {
    width: 400px;
    &-line {
      height: 280px;
      margin-top: 20px;
    }
    &-pie {
      height: 350px;
      margin-top: 20px;
    }
    &-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;
      section {
        background: @itemBg;
        border: 1px solid @itemBorder;
        padding: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
        div:nth-child(2) {
          color: @itemColor;
          padding: 10px 0;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
  &-center {
    flex: 1;
  }
  &-right {
    width: 400px;
  }
}
</style>
