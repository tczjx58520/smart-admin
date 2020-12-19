<template>
  <div class="pie-main"
       id="box"
       ref="dom"></div>
</template>

<script>
import echarts from 'echarts';
import tdTheme from './theme.json';
import { on, off } from '@/lib/util';
echarts.registerTheme('tdTheme', tdTheme);
export default {
  props: {
    value: Array,
    text: String,
    subtext: String
  },
  mounted () {
    this.initChart();
  },
  methods: {
    resize () {
      this.dom.resize();
    },
    initChart () {
      this.$nextTick(() => {
        let legend = this.value.map(_ => _.name);
        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['大专', '本科', '研究生', '博士', '未知'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '数量',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390]
            }
          ]
        };
        this.dom = echarts.init(this.$refs.dom, 'tdTheme');
        this.dom.setOption(option);
        on(window, 'resize', this.resize);
      });
    }
  }
};
</script>

<style>
.pie-main {
  width: 100%;
  height: 360px;
  padding: 28px;
  background: #fff;
}
</style>
