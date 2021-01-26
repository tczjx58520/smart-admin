<template>
  <div>
    <Card dis-hover>
      <div style="display:flex">
        <div style="width: 15%">
          <organizationTree @chooseTreeData="getTreeData" />
        </div>

        <div style="width: 75%;margin-left:100px">
          <div style="display:flex">
            <RadioGroup v-model="searchform.category"
                        @on-change="changeSelect"
                        type="button">
              <Radio :label="0">日报</Radio>
              <Radio :label="1">周报</Radio>
              <Radio :label="2">月报</Radio>
            </RadioGroup>
          </div>
          <Divider style="background-color:gray" />

          <div style="display:flex;margin-bottom:20px">
            <DatePicker type="month"
                        placeholder="Select month"
                        style="width: 200px"
                        @on-change="getMonth" />
            <CheckboxGroup v-model="searchform.check"
                           style="margin-left:20px">
              <Checkbox label="正常"></Checkbox>
              <!-- <Checkbox label="补交"></Checkbox> -->
              <Checkbox label="未提交"></Checkbox>
            </CheckboxGroup>

            <span style="width:10px;height:10px;border-radius:50%;background-color:red;margin-top: 5px;"></span>
            <span>表示未提交统计</span>
            <!-- <span style="width:10px;height:10px;border-radius:50%;background-color:yellow;margin-top: 5px;margin-left:10px"></span>
            <span>表示补交统计</span> -->
            <span style="width:10px;height:10px;border-radius:50%;background-color:blue;margin-top: 5px;margin-left:10px"></span>
            <span>表示正常提交</span>
          </div>
          <Table border
                 ref="selection"
                 :columns="columns"
                 :data="tableData"
                 max-height="400"
                 :loading="table_loading"></Table>
          <Page :current="searchform.pageNum"
                :page-size="searchform.pageSize"
                :page-size-opts="[10, 20, 30, 50, 100]"
                :total="pageTotal"
                @on-change="changePage"
                @on-page-size-change="changePageSize"
                show-elevator
                show-sizer
                show-total
                style="margin:24px 0;text-align:right;"></Page>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import organizationTree from '@/components/organizationTree';
import { statistic } from '@/api/taskStatistic';
export default {
  name: 'wrokReportStatistic',
  components: {
    organizationTree
  },
  data () {
    return {
      // 绑定表格元素
      columns: [],

      // 周表格元素
      weekcolumns: [
        {
          title: this.$t('userName1'),
          width: '200',
          key: 'employeeName'
        },
        {
          title: '1',
          width: '200',
          key: '01'
        },
        {
          title: '2',
          width: '200',
          key: '02'
        },
        {
          title: '3',
          width: '200',
          key: '03'
        },
        {
          title: '4',
          width: '200',
          key: '04'
        },
        {
          title: '5',
          width: '200',
          key: '05'
        },
        {
          title: '6',
          width: '200',
          key: '06'
        },
        {
          title: '7',
          width: '200',
          key: '07'
        },
        {
          title: '8',
          width: '200',
          key: '08'
        },
        {
          title: '9',
          width: '200',
          key: '09'
        },
        {
          title: '10',
          width: '200',
          key: '10'
        },
        {
          title: '11',
          width: '200',
          key: '11'
        },
        {
          title: '12',
          width: '200',
          key: '12'
        },
        {
          title: '13',
          width: '200',
          key: '13'
        },
        {
          title: '14',
          width: '200',
          key: '14'
        },
        {
          title: '15',
          width: '200',
          key: '15'
        },
        {
          title: '16',
          width: '200',
          key: '16'
        },
        {
          title: '17',
          width: '200',
          key: '17'
        },
        {
          title: '18',
          width: '200',
          key: '18'
        },
        {
          title: '19',
          width: '200',
          key: '19'
        },
        {
          title: '20',
          width: '200',
          key: '20'
        },
        {
          title: '21',
          width: '200',
          key: '21'
        },
        {
          title: '22',
          width: '200',
          key: '22'
        },
        {
          title: '23',
          width: '200',
          key: '23'
        },
        {
          title: '24',
          width: '200',
          key: '24'
        },
        {
          title: '25',
          width: '200',
          key: '25'
        },
        {
          title: '26',
          width: '200',
          key: '26'
        },
        {
          title: '27',
          width: '200',
          key: '27'
        },
        {
          title: '28',
          width: '200',
          key: '28'
        },
        {
          title: '29',
          width: '200',
          key: '29'
        },
        {
          title: '30',
          width: '200',
          key: '30'
        },
        {
          title: '31',
          width: '200',
          key: '31'
        },
        {
          title: '32',
          width: '200',
          key: '32'
        },
        {
          title: '33',
          width: '200',
          key: '33'
        },
        {
          title: '34',
          width: '200',
          key: '34'
        },
        {
          title: '35',
          width: '200',
          key: '35'
        },
        {
          title: '36',
          width: '200',
          key: '36'
        },
        {
          title: '37',
          width: '200',
          key: '37'
        },
        {
          title: '38',
          width: '200',
          key: '38'
        },
        {
          title: '39',
          width: '200',
          key: '39'
        },
        {
          title: '40',
          width: '200',
          key: '40'
        },
        {
          title: '41',
          width: '200',
          key: '41'
        },
        {
          title: '42',
          width: '200',
          key: '42'
        },
        {
          title: '43',
          width: '200',
          key: '43'
        },
        {
          title: '44',
          width: '200',
          key: '44'
        },
        {
          title: '45',
          width: '200',
          key: '45'
        },
        {
          title: '46',
          width: '200',
          key: '46'
        },
        {
          title: '47',
          width: '200',
          key: '47'
        },
        {
          title: '48',
          width: '200',
          key: '48'
        },
        {
          title: '49',
          width: '200',
          key: '49'
        },
        {
          title: '50',
          width: '200',
          key: '50'
        },
        {
          title: '51',
          width: '200',
          key: '51'
        },
        {
          title: '52',
          width: '200',
          key: '52'
        }
      ],

      // 月份表格元素
      monthColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('userName1'),
          key: 'employeeName'
        },
        {
          title: '1',
          key: '2021-00',
          render: (h, params) => {
            if (params.row['2021-00'] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'red'
                }
              });
            }
            if (params.row['2021-00'] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'blue'
                }
              });
            }
          }
        },
        {
          title: '2',
          key: '2021-01',
          render: (h, params) => {
            if (params.row['2021-01'] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'red'
                }
              });
            }
            if (params.row['2021-01'] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'blue'
                }
              });
            }
          }
        },
        {
          title: '3',
          key: '2021-02',
          render: (h, params) => {
            if (params.row['2021-02'] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'red'
                }
              });
            }
            if (params.row['2021-02'] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'blue'
                }
              });
            }
          }
        },
        {
          title: '4',
          key: '2021-03',
          render: (h, params) => {
            if (params.row['2021-03'] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'red'
                }
              });
            }
            if (params.row['2021-03'] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'blue'
                }
              });
            }
          }
        },
        {
          title: '5',
          key: '2021-04',
          render: (h, params) => {
            if (params.row['2021-04'] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'red'
                }
              });
            }
            if (params.row['2021-04'] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'blue'
                }
              });
            }
          }
        },
        {
          title: '6',
          key: '2021-05',
          render: (h, params) => {
            if (params.row['2021-05'] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'red'
                }
              });
            }
            if (params.row['2021-05'] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'blue'
                }
              });
            }
          }
        },
        {
          title: '7',
          key: '2021-06',
          render: (h, params) => {
            if (params.row['2021-06'] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'red'
                }
              });
            }
            if (params.row['2021-06'] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'blue'
                }
              });
            }
          }
        },
        {
          title: '8',
          key: '2021-07',
          render: (h, params) => {
            if (params.row['2021-07'] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'red'
                }
              });
            }
            if (params.row['2021-07'] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'blue'
                }
              });
            }
          }
        },
        {
          title: '9',
          key: '2021-08',
          render: (h, params) => {
            if (params.row['2021-08'] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'red'
                }
              });
            }
            if (params.row['2021-08'] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'blue'
                }
              });
            }
          }
        },
        {
          title: '10',
          key: '2021-09',
          render: (h, params) => {
            if (params.row['2021-09'] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'red'
                }
              });
            }
            if (params.row['2021-09'] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'blue'
                }
              });
            }
          }
        },
        {
          title: '11',
          key: '2021-10',
          render: (h, params) => {
            if (params.row['2021-10'] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'red'
                }
              });
            }
            if (params.row['2021-10'] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'blue'
                }
              });
            }
          }
        },
        {
          title: '12',
          key: '2021-11',
          render: (h, params) => {
            if (params.row['2021-11'] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'red'
                }
              });
            }
            if (params.row['2021-11'] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'blue'
                }
              });
            }
          }
        }
      ],

      // 查询条件
      searchform: {
        pageNum: 1,
        pageSize: 10,
        yeanAndMonth: null,
        category: 0,
        organizationId: 15
      },

      month: null,

      pageTotal: 0,

      // 表格数据
      tableData: [],
      table_loading: false
    };
  },
  created () {

  },
  mounted () {
    this.getNowMonth();

    this.getList();
  },
  methods: {
    // 选择组织改变事件
    getTreeData (val) {
      this.searchform.organizationId = val.id;
      this.getList();
    },
    // 查询表格数据
    getList () {
      statistic.findWorkReportStatistic(this.searchform).then(res => {
        console.log('获取表格数据', res);
        this.tableData = res.data;
      });
    },
    // 选择月份
    getMonth (val) {
      console.log(val);
      this.searchform.month = val;
      this.month = val.substring(5, 7);
      this.setColumns();
    },
    // 获取当前月份
    getNowMonth () {
      console.log(111111);
      let curDate = new Date();
      let nowYear = curDate.getFullYear();
      this.month = curDate.getMonth() < 10 ? '0' + (curDate.getMonth() + 1) : curDate.getMonth() + 1;
      this.searchform.yeanAndMonth = nowYear + '-' + this.month;
      this.setColumns();
    },

    // 获取当月天数
    getMonthDays () {
      let curDate = new Date();
      /* 获取当前月份 */
      let curMonth = this.month;
      let curYear = curDate.getFullYear();
      // this.month = curMonth + 1;
      // this.month =curYear + '-' + this.searchform.month
      /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
      curDate.setMonth(Number(curMonth));
      /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
      curDate.setDate(0);
      let lastDay = new Date(curYear, curMonth, 0).getDate();
      // console.log('curYear', curYear)
      // console.log('curMonth', curMonth)

      // console.log('lastDay', lastDay)

      /* 返回当月的天数 */
      return curDate.getDate();
    },

    // 获取表头格式
    async setColumns () {
      let today = new Date();
      let year = today.getFullYear();
      let month = this.month;
      let countDays = this.getMonthDays();
      // console.log('countDays', countDays);
      let columnsArr = [];
      let columsTitle = '';
      let weekday = '';
      for (let i = 1; i <= countDays; i++) {
        if (i < 10) {
          columsTitle = year + '-' + month + '-' + '0' + i;
        } else {
          columsTitle = year + '-' + month + '-' + i;
        }
        // let d = new Date(columsTitle);
        // let week = d.getDay(); // 获取星期
        // switch (week) {
        //   case 0:
        //     weekday = '星期日';
        //     break;
        //   case 1:
        //     weekday = '星期一';
        //     break;
        //   case 2:
        //     weekday = '星期二';
        //     break;
        //   case 3:
        //     weekday = '星期三';
        //     break;
        //   case 4:
        //     weekday = '星期四';
        //     break;
        //   case 5:
        //     weekday = '星期五';
        //     break;
        //   case 6:
        //     weekday = '星期六';
        //     break;
        // }
        columnsArr.push({
          title: columsTitle + weekday,
          key: columsTitle,
          align: 'center',
          width: '200',
          editType: 'select',
          editable: 'true',
          selectData: this.selectData,
          render: (h, params) => {
            console.log(123123, params);
            if (params.row[columsTitle] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'red'
                }
              });
            }
            if (params.row[columsTitle] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '10px',
                  width: '10px',
                  backgroundColor: 'blue'
                }
              });
            }
          }
        });
      }
      // console.log('columnsArr', columnsArr);
      columnsArr.unshift({
        title: '用户名',
        key: 'employeeName',
        align: 'center',
        width: '100'
      });
      this.columns = columnsArr;
    },
    // 月周日改变事件
    changeSelect (val) {
      console.log(111, val);
      if (val === 0) {
        this.setColumns();
        this.getList();
      }
      if (val === 1) {
        this.columns = this.weekcolumns;
        this.searchform.category = 1;
        this.getList();
      }
      if (val === 2) {
        this.columns = this.monthColumns;
        this.searchform.category = 2;
        this.getList();
      }
    },

    // 分页函数
    changePage (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getemplist();
    },
    changePageSize (pageSize) {
      this.searchform.pageSize = pageSize;
      this.getemplist();
    }

  }
};
</script>
