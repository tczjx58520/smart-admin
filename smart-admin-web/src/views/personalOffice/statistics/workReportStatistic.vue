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
                        v-if="searchform.category===0"
                        placeholder="Select month"
                        style="width: 200px"
                        @on-change="getMonth" />
            <DatePicker type="year"
                        v-else
                        placeholder="Select year"
                        style="width: 200px"
                        @on-change="getYear" />
            <!-- <CheckboxGroup v-model="searchform.check"
                           style="margin-left:20px">
              <Checkbox label="正常"></Checkbox>
              <Checkbox label="补交"></Checkbox>
              <Checkbox label="未提交"></Checkbox>
            </CheckboxGroup> -->

            <span style="width:10px;height:10px;border-radius:50%;background-color:red;margin-top: 5px;margin-left:20px"></span>
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
                 @on-cell-click="cellClick"></Table>
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
    <Modal v-model="modalVisible"
           width="720px"
           :title="$t('workReport')">
      <Timeline>
        <TimelineItem v-for="item in reportList "
                      :key="item.id">
          <p class="time">{{item.createTime}}</p>

          <div style="font-size:15px;font-weight:600;;margin-top:10px">今日完成工作</div>
          <p class="content">{{item.todayWork}}</p>

          <div style="font-size:15px;font-weight:600;margin-top:10px">任务工作汇报</div>
          <p class="content">{{item.note}}</p>

          <div style="font-size:15px;font-weight:600;margin-top:10px">未完成的工作</div>
          <p class="content">{{item.unfinishedWork}}</p>

          <div style="font-size:15px;font-weight:600;margin-top:10px">需协调的工作</div>
          <p class="content">{{item.help}}</p>

          <div style="font-size:15px;font-weight:600;margin-top:10px">附件</div>
        </TimelineItem>
      </Timeline>
    </Modal>
  </div>
</template>
<script>
import organizationTree from '@/components/organizationTree';
import { statistic } from '@/api/taskStatistic';
import { now } from 'moment';
export default {
  name: 'wrokReportStatistic',
  components: {
    organizationTree
  },
  data () {
    return {
      // 绑定表格元素
      columns: [],

      // 查询条件
      searchform: {
        pageNum: 1,
        pageSize: 10,
        yeanAndMonth: null,
        category: 0,
        organizationId: 15
      },
      // 选择的月份
      month: null,

      // 选择的年份
      year: null,

      pageTotal: 0,

      // 表格数据
      tableData: [],
      table_loading: false,
      modalVisible: false,
      reportList: []
    };
  },
  created () {

  },
  mounted () {
    this.getNowMonth();
  },
  methods: {
    // 选择组织改变事件
    getTreeData (val) {
      this.searchform.organizationId = val.id;
      this.getList();
    },

    // 获取当前月份
    getNowMonth () {
      let curDate = new Date();
      let nowYear = curDate.getFullYear();
      this.month = curDate.getMonth() < 10 ? '0' + (curDate.getMonth() + 1) : curDate.getMonth() + 1;
      this.searchform.yeanAndMonth = nowYear + '-' + this.month;
      this.setColumns();
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
      this.month = val.substring(5, 7);
      let curDate = new Date();
      let nowYear = curDate.getFullYear();
      this.searchform.yeanAndMonth = nowYear + '-' + this.month;
      if (val) {
        this.setColumns();
        this.getList();
      }
    },
    // 选择年份
    getYear (val) {
      console.log(val);
      this.searchform.yeanAndMonth = val;
      if (val) {
        this.getYearWeek();
        this.getList();
      }
    },

    // 获取今年周数且设置周报表头
    getYearWeek () {
      console.log(111222222, this.$moment(2021).weeksInYear());
      const weeks = this.$moment().weeksInYear();
      let columnsArr = [];
      for (let i = 1; i <= weeks; i++) {
        let columsTitle = '';
        if (i < 10) {
          columsTitle = '0' + i;
        } else {
          columsTitle = i;
        }
        const obj = {
          title: String(columsTitle),
          key: columsTitle,
          align: 'center',
          width: '200',
          render: (h, params) => {
            // console.log('params======', columsTitle, params.row[columsTitle]);
            if (params.row[columsTitle] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '15px',
                  width: '15px',
                  backgroundColor: 'red',
                  margin: '0 auto'
                }
              });
            }
            if (params.row[columsTitle] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '15px',
                  width: '15px',
                  backgroundColor: 'blue',
                  margin: '0 auto'
                }
              });
            }
          }
        };
        columnsArr.push(obj);
      }
      columnsArr.unshift({
        title: '用户名',
        key: 'employeeName',
        align: 'center',
        width: '100'
      });
      this.columns = columnsArr;
    },

    // 获取年份及年报表头格式
    getYearMonth () {
      let date = new Date();
      let nowYear = date.getFullYear();
      console.log(3333, nowYear);
      let columnsArr = [];
      for (let i = 1; i <= 12; i++) {
        let columsTitle = '';
        if (i < 10) {
          columsTitle = '0' + i;
        } else {
          columsTitle = i;
        }
        const yearTitle = nowYear + '-' + columsTitle;
        const obj = {
          title: yearTitle,
          key: yearTitle,
          align: 'center',
          width: '200',
          render: (h, params) => {
            // console.log('params======', columsTitle, params.row[columsTitle]);
            if (params.row[yearTitle] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '15px',
                  width: '15px',
                  backgroundColor: 'red',
                  margin: '0 auto'
                }
              });
            }
            if (params.row[yearTitle] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '15px',
                  width: '15px',
                  backgroundColor: 'blue',
                  margin: '0 auto'
                }
              });
            }
          }
        };
        columnsArr.push(obj);
      }
      columnsArr.unshift({
        title: '用户名',
        key: 'employeeName',
        align: 'center',
        width: '100'
      });
      this.columns = columnsArr;
    },

    // 获取当月天数
    getMonthDays () {
      let curDate = new Date();
      /* 获取当前月份 */
      let curMonth = this.month;
      let curYear = curDate.getFullYear();
      // this.searchform.month = curMonth + 1;
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

    // 获取日报表头格式
    async setColumns () {
      let today = new Date();
      let year = today.getFullYear();
      let month = this.month;
      let countDays = this.getMonthDays();
      // console.log('countDays', countDays);
      let columnsArr = [];
      for (let i = 1; i <= countDays; i++) {
        let columsTitle = '';
        if (i < 10) {
          columsTitle = year + '-' + month + '-' + '0' + i;
        } else {
          columsTitle = year + '-' + month + '-' + i;
        }
        const obj = {
          title: columsTitle,
          key: columsTitle,
          align: 'center',
          width: '200',
          render: (h, params) => {
            // console.log('params======', columsTitle, params.row[columsTitle]);
            if (params.row[columsTitle] === 0) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '15px',
                  width: '15px',
                  backgroundColor: 'red',
                  margin: '0 auto'
                }
              });
            }
            if (params.row[columsTitle] === 1) {
              return h('div', {
                style: {
                  borderRadius: '50%',
                  height: '15px',
                  width: '15px',
                  backgroundColor: 'blue',
                  margin: '0 auto'
                }
              });
            }
          }
        };
        columnsArr.push(obj);
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
      let curDate = new Date();
      let nowYear = curDate.getFullYear();
      if (!this.month) {
        this.month = curDate.getMonth() < 10 ? '0' + (curDate.getMonth() + 1) : curDate.getMonth() + 1;
      }
      if (val === 0) {
        this.setColumns();
        this.searchform.category = 0;
        this.searchform.yeanAndMonth = nowYear + '-' + this.month;
        this.getList();
      }
      if (val === 1) {
        this.getYearWeek();
        this.searchform.category = 1;
        this.searchform.yeanAndMonth = nowYear;
        this.getList();
      }
      if (val === 2) {
        this.getYearMonth();
        this.searchform.category = 2;
        this.searchform.yeanAndMonth = nowYear;
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
    },
    cellClick (row, column, data, event) {
      console.log(row);
      console.log(column.title);
      console.log(data);
      console.log(event);
      const sendData = {
        employeeId: row.employeeId,
        date: column.title,
        category: this.searchform.category
      };
      statistic.findWorkReportDetail(sendData).then(res => {
        console.log('获取日报等======', res);
        if (res.data.length !== 0) {
          this.modalVisible = true;
        }
        this.reportList = res.data;
      });
    },
    ok () {
      this.modalVisible = false;
    },
    cancel () {
      this.modalVisible = false;
    }

  }
};
</script>
<style scoped>
.time {
  font-size: 14px;
  font-weight: bold;
}
.content {
  padding-left: 5px;
}
</style>
