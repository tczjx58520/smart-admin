<template>
  <div class="line-main"
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
    value: Object,
    value2: Array,
    text: String,
    subtext: String
  },
  mounted () {
    this.initChart();
  },
  watch: {
    value: {
      handler () {
        this.initChart();
      },
      deep: true
    }
  },
  methods: {
    resize () {
      this.dom.resize();
    },
    initChart () {
      this.$nextTick(() => {
        const List = [];
        let Legend = [];
        for (const key in this.value) {
          const Temp = Object.values(this.value[key]);
          Legend = Object.keys(this.value[key]);
          const data = {
            name: key,
            data: Temp,
            type: 'line',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#f2f5ff' },
                  { offset: 1, color: '#fff' }
                ])
              }
            },
            lineStyle: {
              // normal: {
              //   width: 5,
              //   color: '#36CBCB'
              // }
            }
          };
          List.push(data);
        }
        console.log(List);
        let option = {
          grid: {
            left: '3%',
            right: '4%',
            // top: '2%',
            bottom: '3%',
            containLabel: true
          },
          legend: {
            data: Legend
          },
          title: {
            text: this.text,
            subtext: this.subtext,
            x: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            // show: false,
            type: 'category',
            data: this.value2,
            splitLine: {
              show: false
            }
          },
          yAxis: [
            {
              // show: false,
              type: 'value',
              splitLine: {
                show: true,
                lineStyle: {
                  // 设置刻度线粗度(粗的宽度)
                  width: 4,
                  // 颜色数组，数组数量要比刻度线数量大才能不循环使用
                  color: [
                    'rgba(0, 0, 0, 0)',
                    '#eee',
                    '#eee',
                    '#eee',
                    '#eee',
                    '#eee',
                    '#eee',
                    '#eee',
                    '#eee'
                  ]
                }
              }
            }
          ],
          series: List
        };
        this.dom = echarts.init(this.$refs.dom, 'tdTheme');
        this.dom.setOption(option, true);
        on(window, 'resize', this.resize);
      });
    }
  }
};
</script>

<style>
.line-main {
  width: 100%;
  height: 720px;
  padding: 28px;
  background: #fff;
}
</style>
