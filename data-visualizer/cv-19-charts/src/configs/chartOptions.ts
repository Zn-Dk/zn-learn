import type * as echarts from "echarts";
// 默认高亮
// const data = [
//   {
//     name: "上海", // 省份名称
//     itemStyle: {
//       areaColor: "#86b1da", //背景色
//     },
//     value: [121.484, 31.2386], // 地图定位点经纬度
//   },
// ];

interface Data {
  name: string;
  value: number[];
}

// 传入数据 data 返回 option
export default function (dataList: Data[]) {
  const option: echarts.EChartsOption = {
    backgroundColor: "rgba(0,0,0,0)",
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "120%",
      itemStyle: {
        //normal: {
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
          //},
          shadowColor: "#0f5d9d",
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          opacity: 0.5,
        },
      },
      // 5.0 echarts emphasis 与 itemstyle 平级
      emphasis: {
        areaColor: "#0f5d9d",
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            //normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            //},
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
        selectedMode: "single", // 选择模式: 多选|系列|单选
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
          show: true, // 始终显示省份 label
          color: "#f1f1f1",
          fontSize: 14,
        },
        itemStyle: {
          //normal: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
          // },
        },
        // 5.0 echarts emphasis 与 itemstyle 平级
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true, // 控制鼠标hover时, 标签是否显示
            color: "#fff",
          },
        },
        data: dataList,
      },
      {
        name: "Top 5",
        type: "scatter",
        coordinateSystem: "geo",
        // symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: "pin", // 标注类型
        symbolSize: 60, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
        //symbolRotate : null, // 标注旋转控制
        label: {
          //normal: {
          show: true,
          position: "inside", // 'left'|'right'|'top'|'bottom'

          // 将传入的数据进行格式化 比如这里要返回 data.value[2]
          formatter(value: any) {
            // console.log(value, "--");
            return value.data.value[2];
          },
          //},
        },
        itemStyle: {
          //normal: {
          color: "#D8BC37", //标志颜色
          // },
        },
        data: dataList,
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke",
        },

        zlevel: 1,
      },
    ],
  };

  return option;
}
