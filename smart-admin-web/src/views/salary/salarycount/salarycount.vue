<template>
  <div>
    <Card class="warp-card" dis-hover style="height: calc(80vh - 75px)">
    <Tabs :animated="false" v-model="flag">
        <TabPane v-privilege="['10-21-4']" label="薪酬统计" name="tab1">
            <div style="margin-bottom:20px;">
              <Button style="margin-right:15px;" @click="resetGong" icon="md-refresh" type="default">{{ $t('Reflash') }}</Button>
              <DatePicker type="year" v-model="Gongsearchform.year" format="yyyy" split-panels placeholder="Select date" style="width: 200px;margin-right:15px;" @on-change="showmytime"></DatePicker>
              <!-- <Button style="margin-right:15px;" @click="addGong" icon="md-add" type="warning">{{ $t('Create') }}</Button> -->
              <Button style="margin-right:15px;" @click="search" icon="md-search" type="default">{{ $t('Search') }}</Button>
            </div>
            <Table class="mytable" :columns="Gongcolumns" :data="Gongdata" :loading="Gongloading" @on-selection-change="selectGong"></Table>
            <Page :current="Gongsearchform.pageNum" :page-size="Gongsearchform.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
            :total="GongpageTotal" @on-change="GongchangePage" @on-page-size-change="GongchangePageSize" show-elevator show-sizer
            show-total style="margin:24px 0;text-align:right;"></Page>
        </TabPane>
        <TabPane v-privilege="['10-22-4']" label="薪酬统计图" name="tab2">
            <div>
              <DatePicker type="year" v-model="charform.year" format="yyyy" split-panels placeholder="Select date" style="width: 200px;margin-right:15px;" @on-change="showmytime2"></DatePicker>
              <Select v-model="charform.type" style="width:200px;margin-right:15px;">
                  <Option v-for="item in viewList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button style="margin-right:15px;" @click="search2" icon="md-search" type="default">{{ $t('Search') }}</Button>
                <!-- <Button style="margin-right:15px;" @click="resetShe" icon="md-refresh" type="default">{{ $t('Reflash') }}</!-->
            </div>
            <div style="width:100%;">
                <ChartPie :value="pieData" :flag="flag"/>
                <p style="text-align:center;font-weight:700;">总薪酬</p>
            </div>
        </TabPane>
    </Tabs>
    </Card>
    <!-- 新建社保弹窗 -->
        <addModal :modalstat = "Gongvisiable" :queryinfo = "queryinfo" @updateStat = "updateStat_gong"></addModal>
    <!-- 新建结束============= -->

  </div>
</template>

<script>
import { salarycountApi } from '@/api/salarycount';
import addModal from './components/addmodal/modal';
import ChartPie from './components/chart-pie';
import HomeCard from './components/card';
export default {
  name: 'salarycount',
  components: {
    addModal,
    ChartPie,
    HomeCard
  },
  props: {},
  data () {
    return {
      viewList: [
        {
          value: 1,
          label: '实发'
        },
        {
          value: 2,
          label: '应发'
        }
      ],
      queryinfo: {},
      Gongvisiable: false,
      Gongloading: false,
      Gongsearchform: {
        pageNum: 1,
        pageSize: 10
      },
      GongpageTotal: 0,
      // table表头
      Gongcolumns: [
        {
          type: 'selection',
          width: 50,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '所属组织',
          key: 'organizeName',
          align: 'center',
          width: 100,
          fixed: 'left'
        },
        {
          title: '年份',
          key: 'year',
          width: 100,
          fixed: 'left'
        },
        {
          title: '总计',
          children: [
            {
              title: '实发',
              key: 'allActual',
              width: 100
            },
            {
              title: '应发',
              key: 'allShould',
              width: 100
            }
          ]
        },
        {
          title: '一月',
          children: [
            {
              title: '实发',
              key: 'oneActual',
              width: 100
            },
            {
              title: '应发',
              key: 'oneShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '二月',
          children: [
            {
              title: '实发',
              key: 'twoActual',
              width: 100
            },
            {
              title: '应发',
              key: 'twoShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '三月',
          children: [
            {
              title: '实发',
              key: 'threeActual',
              width: 100
            },
            {
              title: '应发',
              key: 'threeShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '四月',
          children: [
            {
              title: '实发',
              key: 'fourActual',
              width: 100
            },
            {
              title: '应发',
              key: 'fourShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '五月',
          children: [
            {
              title: '实发',
              key: 'fiveActual',
              width: 100
            },
            {
              title: '应发',
              key: 'fiveShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '六月',
          children: [
            {
              title: '实发',
              key: 'sixActual',
              width: 100
            },
            {
              title: '应发',
              key: 'sixShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '七月',
          children: [
            {
              title: '实发',
              key: 'sevenActual',
              width: 100
            },
            {
              title: '应发',
              key: 'sevenShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '八月',
          children: [
            {
              title: '实发',
              key: 'eightActual',
              width: 100
            },
            {
              title: '应发',
              key: 'eightShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '九月',
          children: [
            {
              title: '实发',
              key: 'nineActual',
              width: 100
            },
            {
              title: '应发',
              key: 'nineShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '十月',
          children: [
            {
              title: '实发',
              key: 'tenActual',
              width: 100
            },
            {
              title: '应发',
              key: 'tenShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '十一月',
          children: [
            {
              title: '实发',
              key: 'elevenActual',
              width: 100
            },
            {
              title: '应发',
              key: 'elevenShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '十二月',
          children: [
            {
              title: '实发',
              key: 'twelveActual',
              width: 100
            },
            {
              title: '应发',
              key: 'twelveShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: this.$t('usermanage_view.action'),
          key: 'action',
          width: 200,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.View(params.row);
                  }
                }
              }, this.$t('View'))
            ]);
          }
        }
        // {
        //   title: '操作',
        //   key: 'action',
        //   align: 'center',
        //   className: 'action-hide',
        //   render: (h, param) => {
        //     return this.$tableAction(h, [{
        //       title: '删除',
        //       directives: [{
        //         name: '',
        //         value: 'user-login-log-delete'
        //       }],
        //       action: () => {
        //         this.$Modal.confirm({
        //           title: '友情提醒',
        //           content: '确定要删除吗？',
        //           onOk: () => {
        //             this.deleteLog(param.row.id);
        //           }
        //         });
        //       }
        //     }]);
        //   }
        // }
      ],
      // table数据
      Gongdata: [],
      //   社保
      moreGong: [],
      pieData: [],
      flag: 'tab2',
      charform: {
        type: 1
      }
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.getGongList();
    this.gettoyear();
    this.getchart();
  },
  methods: {
    View (row) {
      this.Gongvisiable = true;
      this.queryinfo = row;
    },
    search () {
      this.getGongList();
    },
    search2 () {
      this.getchart();
    },
    showmytime (e) {
      console.log('e==============>', e);
      this.Gongsearchform.year = e;
    },
    showmytime2 (e) {
      console.log('e==============>', e);
      this.charform.year = e;
    },
    selectGong (selection) {
      this.moreGong = selection;
    },
    selectShe (selection) {
      this.moreShe = selection;
    },
    color16 () { // 十六进制颜色随机
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      let color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
      return color;
    },
    // 查询薪酬列表
    async getGongList () {
      try {
        this.Gongloading = true;
        this.Gongsearchform.empId = this.$store.state.user.userLoginInfo.userId;
        let result = await salarycountApi.getsalaryList(this.Gongsearchform);
        this.Gongloading = false;
        this.Gongdata = result.data.content.list;
        this.GongpageTotal = result.data.content.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.Gongloading = false;
      }
    },
    gettoyear () {
      let myDate = new Date();
      let tYear = myDate.getFullYear();
      this.charform.year = String(tYear);
    },
    // 查询用户登录日志
    async getchart () {
      try {
        this.charform.pageSize = 999;
        this.charform.pageNum = 1;
        let result = await salarycountApi.getsalaryList(this.charform);
        let charres = result.data.content.list;
        if (this.charform.type === 1) {
          this.pieData = charres.map(item => {
            return {
              name: item.organizeName || '其他区域',
              value: item.allActual
            };
          });
        } else {
          this.pieData = charres.map(item => {
            return {
              name: item.organizeName || '其他区域',
              value: item.allShould
            };
          });
        }

        console.log('result==============>', result.data.content.list);
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
      }
    },
    // 翻页
    GongchangePage (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getGongList();
    },
    // 改变一页展示数
    GongchangePageSize (pageSize) {
      this.Gongsearchform.pageNum = 1;
      this.Gongsearchform.pageSize = pageSize;
      this.getGongList();
    },
    // 重置
    resetGong () {
      this.getGongList();
    },
    addGong () {
      this.Gongvisiable = true;
    },
    updateStat_gong (state) {
      this.Gongvisiable = state;
      this.getGongList();
    }

  }
};

</script>
<style lang="less" scoped>
    .ivu-form-item {
        margin-bottom: 0;
    }
    /deep/ .ivu-table table tr th {
        text-align: center;
    }
</style>
