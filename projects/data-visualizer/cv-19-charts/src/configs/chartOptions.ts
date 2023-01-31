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

interface DataMap {
  name: string;
  value: number[];
}
interface DataPie {
  name: string;
  value: number;
}

// 传入数据 data 返回 option
export function optionsChinaMap(dataList: DataMap[]) {
  const option /*: echarts.EChartsOption*/ = {
    backgroundColor: "rgba(0,0,0,0)",
    geo: {
      map: "china",
      aspectScale: 0.75,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        //normal: {
        borderColor: "rgba(147, 235, 248, 1)",
        borderWidth: 1,
        areaColor: {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
            },
          ],
        },
        shadowColor: "rgba(128, 217, 248, 1)",
        // shadowColor: 'rgba(255, 255, 255, 1)',
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10,
      },
      // 5.0 echarts emphasis 与 itemstyle 平级
      emphasis: {
        // areaColor: "#389BB7",
        // borderWidth: 0,
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
        map: "china",
        selectedMode: "single", // 选择模式: 多选|系列|单选
        aspectScale: 0.75,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
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
          label: {
            show: true, // 控制鼠标hover时, 标签是否显示
            color: "#fff",
          },
        },
        data: dataList,
      },
      //地图点的动画效果
      {
        // name: "Top 5",
        type: "scatter",
        data: dataList,
        coordinateSystem: "geo",
        // showEffectOn: "render",
        // rippleEffect: {
        //   brushType: "stroke",
        // },
        // hoverAnimation: true,
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
          shadowBlur: 10,
          shadowColor: "#f9b207",
          // },
        },
        zlevel: 1,
      },
    ],
  };

  return option;
}

export function optionsPie(dataList: DataPie[]) {
  let fontColor = "#fafafa";
  let color = [
    "#c065e7",
    "#765deb",
    "#3862d8",
    "#6a89E2",
    "#219CF9",
    "#6efbbf",
    "#40c057",
    "#ffd351",
    "#ff8e43",
    "#f56b6d",
  ];
  const options /*: echarts.EChartsOption*/ = {
    backgroundColor: "rgba(255,255,255,.3)",
    color: fontColor,
    // roseType: "area",
    legend: { show: false },
    series: [
      {
        name: "新增病例Top10",
        type: "pie",
        radius: ["40%", "60%"],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: "#fff", borderWidth: 1 },
        color: [
          "#52A8FF",
          "#00B389",
          "#E27272",
          "#FFC53D",
          "#006EFE",
          "#F5855F",
          "#C099FC",
          "#FFA940",
          "#29EFC4",
          "#F8AEA4",
        ],
        label: {
          show: true,
          // alignTo: "labelLine", // ! 文字对齐方式
          formatter: function (e: any) {
            let {
              data: { value, name },
            } = e;
            return `{x|}{a|${name}}\n{b|${value}例}`;
          },
          minMargin: 5,
          lineHeight: 15,
          rich: {
            x: {
              width: 10,
              height: 10,
              backgroundColor: "inherit",
              borderRadius: 5,
            },
            a: { fontSize: 12, color: "inherit", padding: [0, 20, 0, 8] },
            b: {
              fontSize: 12,
              align: "left",
              color: fontColor,
              padding: [8, 0, 0, 18],
            },
            c: {
              fontSize: 12,
              align: "left",
              color: fontColor,
              padding: [8, 0, 0, 8],
            },
          },
        },
        // labelLine: {
        //   show: true,
        //   showAbove: true,
        // },
        data: dataList,
      },
    ],
  };
  return options;
}
