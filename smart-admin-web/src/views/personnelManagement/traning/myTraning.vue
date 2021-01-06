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
                      size="small">{{$t('qiandao')}}</Button>
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
          key: 'point'
        },
        {
          title: this.$t('traningPlace'),
          key: 'createTime'
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
          title: this.$t('action'),
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],

      data1: [],
      data2: []

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
      this.listQuery.status = 1;
      this.listQuery.employeeId = this.$store.state.user.userLoginInfo.userId;
      training.findMytraningArrange(this.listQuery).then(res => {
        console.log(res);
        this.data2 = res.data.list;
      });
    },
    changeTab (val) {
      // console.log(val);
    }

  }
};
</script>
>
