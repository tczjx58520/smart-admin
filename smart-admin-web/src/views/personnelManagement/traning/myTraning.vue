<template>
  <div>
    <Card class="warp-card"
          dis-hover>
      <Tabs @on-click="changeTab">
        <TabPane :label="$t('pxjl')"
                 name="tab1">
          <Table border
                 ref="selection"
                 :columns="columns1"
                 :data="data1">
          </Table>
        </TabPane>
        <TabPane :label="$t('pxap')"
                 name="tab2">
          <Table border
                 ref="selection"
                 :columns="columns2"
                 :data="data2">
            <template slot-scope="{ row, index }"
                      slot="action">
              <Button type="error"
                      size="small"
                      @click="qiandao(row)">{{$t('qiandao')}}</Button>
            </template>
          </Table>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>
<script>
import { training } from '@/api/traning';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  employeeId: null
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
          title: this.$t('traningName'),
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
          title: this.$t('traningType'),
          key: 'questionCount'
        },
        {
          title: this.$t('traningPlace'),
          key: 'questionCount'
        },
        {
          title: this.$t('traningTeacher'),
          key: 'questionCount'
        },
        {
          title: this.$t('traningCondition'),
          key: 'questionCount'
        },
        {
          title: this.$t('testCondition'),
          key: 'questionCount'
        }
      ],
      columns2: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('traningName'),
          key: 'taskName'
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
          title: this.$t('traningType'),
          key: 'taskType',
          render: (h, params) => {
            if (params.row.status === 0) {
              return h('span', '本组织自行培训');
            } if (params.row.status === 1) {
              return h('span', '公司集体培训');
            } else {
              return h('span', '外训');
            }
          }
        },
        {
          title: this.$t('traningPlace'),
          key: 'address'
        },
        {
          title: this.$t('signTimes'),
          key: 'address'
        },
        {
          title: this.$t('traningTeacher'),
          key: 'createTime'
        },
        {
          title: this.$t('fqr'),
          key: 'createTime'
        },
        {
          title: this.$t('signDays'),
          key: 'sign_days'
        },
        {
          title: this.$t('action'),
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],

      data1: [],
      data2: [],
      todayTime: null

    };
  },
  mounted () {
    this.getList();
    this.getList1();
  },
  methods: {
    getList () {
      this.listQuery.employeeId = this.$store.state.user.userLoginInfo.userId;
      training.findMytraningCord(this.listQuery).then(res => {
        console.log(res);
        this.data1 = res.data.list;
      });
    },
    getList1 () {
      let date = new Date();
      let YY = date.getFullYear() + '-';
      let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      this.todayTime = YY + MM + DD;
      console.log(33333, this.todayTime);

      this.listQuery.status = 1;
      this.listQuery.employeeId = this.$store.state.user.userLoginInfo.userId;
      training.findMytraningArrange(this.listQuery).then(res => {
        console.log(res);
        this.data2 = res.data.list;
      });
    },
    changeTab (val) {
      // console.log(val);
    },
    qiandao (row) {
      console.log(row);
      if (this.todayTime === row.signTime) {
        this.$Message.error('今日已签到！');
        return false;
      }

      const data = {
        signDays: row.sign_days + 1,
        taskId: row.id,
        employeeId: this.$store.state.user.userLoginInfo.userId
      };
      training.sign(data).then(res => {
        console.log(res);
        this.getList();
        this.getList1();
      });
    }

  }
};
</script>
>
