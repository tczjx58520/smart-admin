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
  watch: {
    value () {
      this.dom.setOption({
        series: [
          {
            name: '组织架构',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: (this.value).slice().sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              shadowBlur: 200
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      });
    }
  },
  methods: {
    resize () {
      this.dom.resize();
    },
    initChart () {
      this.$nextTick(() => {
        // let legend = this.value.map(_ => _.name);
        let option = {
          backgroundColor: '#2c343c',
          title: {
            text: '薪酬工资',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          visualMap: {
            show: false,
            min: 800,
            max: 100000,
            inRange: {
              colorLightness: [0.5, 1]
            }
          },
          series: []
        };
        this.dom = echarts.init(this.$refs.dom, 'tdTheme');
        this.dom.setOption(option);
        window.addEventListener('resize', () => {
          this.resize();
        });
      });
    }
  }
};
</script>

<style>
.pie-main {
  width: 100%;
  height: 65vh;
  padding: 20px;
  background: #fff;
}
</style>
