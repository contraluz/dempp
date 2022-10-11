<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="main"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import chinaJson from "@/assets/china";
import sdata from "@/assets/data";
import { planePath } from "@/assets/planePath";

export default {
  name: "about",
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表

    echarts.registerMap("china", {
      geoJSON: chinaJson,
    });
    myChart.setOption({
      backgroundColor: "#100c2a",
      title: {
        left: 10,
        right: 10,
        text: "中国地图",
        textStyle: {
          color: "#fff",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          let html = "";
          const { value, name: cityName } = params.data;
          if (cityName) {
            html = `${cityName} (共${value[2]}位)`;
          }
          return html;
        },
      },
      legend: {
        orient: "vertical",
        y: "bottom",
        x: "right",
        textStyle: {
          color: "#fff",
        },
      },
      geo: {
        map: "china",
        zoom: 1.2,
        scaleLimit: {
          min: 1,
          max: 6,
        },
        roam: true,
        itemStyle: {
          areaColor: "rgba(0,116,177, .6)",
          borderColor: "rgb(79,228,255)",
        },
        emphasis: {
          label: {
            show: false,
          },
          itemStyle: {
            areaColor: "rgba(0,162,248, .6)",
          },
        },
      },
      series: [
        {
          name: "lines",
          type: "lines",
          zlevel: 1,
          // 飞行线特效
          effect: {
            show: true,
            period: 4, //箭头指向速度，值越小速度越快
            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: "arrow", //箭头图标
            // symbol: planePath, //飞机图标
            symbolSize: 5, //图标大小
            color: "#FFE269",
            animation: false,
          },
          emphasis: {
            disabled: true,
          },
          // 线条样式
          lineStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(255,226,105,0)",
              },
              {
                offset: 0.5,
                color: "rgb(255,226,105,0.5)",
              },
              {
                offset: 1,
                color: "rgb(255,226,105,1)",
              },
            ]),
            width: 1, //尾迹线条宽度
            opacity: 1, //尾迹线条透明度
            curveness: -0.2, //尾迹线条曲直度
          },
          data: [
            [
              {
                coord: [120.70647, 28.001],
              },
              {
                coord: [116.41338, 39.9109],
              },
            ],
            [
              {
                coord: [120.70647, 28.001],
              },
              {
                coord: [110.00851, 27.57516],
              },
            ],
            [
              {
                coord: [120.70647, 28.001],
              },
              {
                coord: [120.4574, 41.5798],
              },
            ],
            [
              {
                coord: [120.70647, 28.001],
              },
              {
                coord: [110.18845, 22.65983],
              },
            ],
          ],
        },
        {
          name: "deepskyblue",
          type: "scatter",
          coordinateSystem: "geo",
          data: sdata.slice(1, 100),
          symbol: "roundRect",
          symbolSize: function (val) {
            return Math.log(val[2]) * 2;
          },
          itemStyle: {
            color: "deepskyblue",
          },
        },
        {
          name: "deeppink",
          type: "scatter",
          coordinateSystem: "geo",
          data: sdata.slice(100, -1),
          symbol: "circle",
          symbolSize: function (val) {
            return Math.log(val[2]) * 2;
          },
          itemStyle: {
            color: "deeppink",
          },
        },
      ],
    });

    myChart.on("click", (clickData) => {
      if (clickData.componentType === "series" && clickData.name) {
        console.log(clickData.name, clickData.value[2]);
      }
    });
  },
};
</script>

<style scoped>
#main {
  width: 100%;
  height: 600px;
}
</style>

