<template>
  <div>
    <Card class="warp-card"
          dis-hover>
      <Tabs @on-click="changeTab">
        <TabPane label="需要我考试的"
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
        </TabPane>
        <TabPane label="我完成的"
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
        </TabPane>
        <TabPane label="我缺考的"
                 name="tab3">
          <Table border
                 ref="selection"
                 :columns="columns3"
                 :data="data3">
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
          title: this.$t('examStat'),
          key: 'status'
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
          title: this.$t('examStat'),
          key: 'status'
        },
        {
          title: this.$t('getGoal'),
          key: 'point'
        },
        {
          title: this.$t('examTime'),
          key: 'status'
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
        },
        {
          title: this.$t('examStat'),
          key: 'status'
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
      const data = {
        employeeId: this.$store.state.user.userLoginInfo.userId,
        examId: row.examId
      };
      examination.beginExam(data).then(res => {
        console.log(res);
        this.$router.push({ path: '/examination/test', query: { questionList: res.data.choiceQstList, examId: row.examId, startTime: res.data.createTime, totalTime: row.totalTime } });
      });
    },
    getList () {
      this.listQuery.employeeId = this.$store.state.user.userLoginInfo.userId;
      examination.findMyExam(this.listQuery).then(res => {
        console.log(res);
        this.data1 = res.data.list;
      });
    },
    getList1 () {
      this.listQuery.status = 1;
      this.listQuery.employeeId = this.$store.state.user.userLoginInfo.userId;
      examination.findMyExam(this.listQuery).then(res => {
        console.log(res);
        this.data2 = res.data.list;
      });
    },
    getList2 () {
      this.listQuery.status = 2;
      this.listQuery.employeeId = this.$store.state.user.userLoginInfo.userId;
      examination.findMyExam(this.listQuery).then(res => {
        console.log(res);
        this.data3 = res.data.list;
      });
    },
    changeTab (val) {
      // console.log(val);
    }

  }
};
</script>
