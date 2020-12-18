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
          title: {
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['男', '女', '未知']
          },
          series: [
            {
              name: '性别比例',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: 335, name: '男' },
                { value: 310, name: '女' },
                { value: 234, name: '未知' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
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
