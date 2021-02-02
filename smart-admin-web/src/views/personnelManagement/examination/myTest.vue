<template>
  <div>
    <Card class="warp-card"
          dis-hover>
      <Tabs @on-click="changeTab">
        <TabPane :label="$t('xywksd')"
                 name="tab1">
          <Table border
                 ref="selection"
                 :columns="columns1"
                 :data="data1">
            <template slot-scope="{ row, index }"
                      slot="action">
              <Button type="error"
                      size="small"
                      @click="immediatelyTest(row)">{{$t('immediatelyExam')}}</Button>
            </template>
          </Table>
          <Page :current="listQuery.pageNum"
                :page-size="listQuery.pageSize"
                :page-size-opts="[10, 20, 30, 50, 100]"
                :total="total1"
                @on-change="changePage1"
                @on-page-size-change="changePageSize1"
                show-elevator
                show-sizer
                show-total
                style="margin:24px 0;text-align:right;"></Page>
        </TabPane>
        <TabPane :label="$t('wwcd')"
                 name="tab2">
          <Table border
                 ref="selection"
                 :columns="columns2"
                 :data="data2">
            <!-- <template slot-scope="{ row, index }"
                      slot="action">
              <Button type="error"
                      size="small"
                      >{{$t('look')}}</Button>
            </template> -->
          </Table>
          <Page :current="listQuery.pageNum"
                :page-size="listQuery.pageSize"
                :page-size-opts="[10, 20, 30, 50, 100]"
                :total="total2"
                @on-change="changePage2"
                @on-page-size-change="changePageSize2"
                show-elevator
                show-sizer
                show-total
                style="margin:24px 0;text-align:right;"></Page>
        </TabPane>
        <TabPane :label="$t('wqkd')"
                 name="tab3">
          <Table border
                 ref="selection"
                 :columns="columns3"
                 :data="data3">
            <Page :current="listQuery.pageNum"
                  :page-size="listQuery.pageSize"
                  :page-size-opts="[10, 20, 30, 50, 100]"
                  :total="total3"
                  @on-change="changePage3"
                  @on-page-size-change="changePageSize3"
                  show-elevator
                  show-sizer
                  show-total
                  style="margin:24px 0;text-align:right;"></Page>
            <!-- <template slot-scope="{ row, index }"
                      slot="action">
              <Button type="error"
                      size="small"
                      @click="immediatelyTest(row)">{{$t('immediatelyExam')}}</Button>
            </template> -->
          </Table>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>
<script>
import { examination } from '@/api/examination';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  employeeId: null,
  status: 0
};
export default {
  data () {
    return {
      total1: 0,
      total2: 0,
      total3: 0,
      listQuery: Object.assign({}, defaultListQuery),
      columns1: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('examActivityName'),
          key: 'examName'
        },
        {
          title: this.$t('startTime'),
          key: 'startTime'
        },
        {
          title: this.$t('endTime'),
          key: 'endTime'
        },
        {
          title: this.$t('questionNum'),
          key: 'questionCount'
        },
        {
          title: this.$t('action'),
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      columns2: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('examActivityName'),
          key: 'examName'
        },
        {
          title: this.$t('startTime'),
          key: 'startTime'
        },
        {
          title: this.$t('endTime'),
          key: 'endTime'
        },
        {
          title: this.$t('questionNum'),
          key: 'questionCount'
        },
        {
          title: this.$t('getGoal'),
          key: 'point'
        },
        {
          title: this.$t('examTime'),
          key: 'createTime'
        }
        // {
        //   title: this.$t('action'),
        //   slot: 'action',
        //   width: 150,
        //   align: 'center'
        // }
      ],
      columns3: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('examActivityName'),
          key: 'examName'
        },
        {
          title: this.$t('startTime'),
          key: 'startTime'
        },
        {
          title: this.$t('endTime'),
          key: 'endTime'
        },
        {
          title: this.$t('questionNum'),
          key: 'questionCount'
        }
        // {
        //   title: this.$t('action'),
        //   slot: 'action',
        //   width: 150,
        //   align: 'center'
        // }
      ],
      data1: [],
      data2: [],
      data3: []

    };
  },
  mounted () {
    this.getList();
    this.getList1();
    this.getList2();
  },
  methods: {
    immediatelyTest (row) {
      console.log(row);
      const nowTime = new Date().getTime();
      const startTime = new Date(row.startTime).getTime();
      if (nowTime < startTime) {
        return this.$Message.error('未到开始时间！！！');
      }

      const data = {
        employeeId: this.$store.state.user.userLoginInfo.userId,
        examId: row.examId
      };
      examination.beginExam(data).then(res => {
        console.log(res);
        this.$router.push({ path: '/examination/test', query: { examId: row.examId, totalTime: row.totalTime } });
      });
    },
    getList () {
      this.listQuery.employeeId = this.$store.state.user.userLoginInfo.userId;
      examination.findMyExam(this.listQuery).then(res => {
        console.log(res);
        this.data1 = res.data.list;
        this.total1 = res.data.total;
      });
    },
    getList1 () {
      this.listQuery.status = 1;
      this.listQuery.employeeId = this.$store.state.user.userLoginInfo.userId;
      examination.findMyExam(this.listQuery).then(res => {
        console.log(res);
        this.data2 = res.data.list;
        this.total2 = res.data.total;
      });
    },
    getList2 () {
      this.listQuery.status = 2;
      this.listQuery.employeeId = this.$store.state.user.userLoginInfo.userId;
      examination.findMyExam(this.listQuery).then(res => {
        console.log(res);
        this.data3 = res.data.list;
        this.total3 = res.data.total;
      });
    },
    changeTab (val) {
      // console.log(val);
    },
    changePage1 (val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    changePageSize1 (val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    changePage2 (val) {
      this.listQuery.pageNum = val;
      this.getList1();
    },
    changePageSize2 (val) {
      this.listQuery.pageNum = val;
      this.getList1();
    },
    changePage3 (val) {
      this.listQuery.pageNum = val;
      this.getList2();
    },
    changePageSize3 (val) {
      this.listQuery.pageNum = val;
      this.getList2();
    }

  }
};
</script>
