<template>
  <div>
    <Card class="warp-card"
          dis-hover>
      <div>
        <Button style="margin-right:15px;"
                icon="md-refresh"
                @click="refresh"
                type="default">{{ $t('Reflash') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['59-72-1']"
                @click="addGong"
                icon="md-add"
                type="warning">{{ $t('Release') }}</Button>
      </div>
    </Card>
    <Card style="margin-top:10px">
      <Table border
             ref="selection"
             :columns="columns4"
             :data="tableData"
             :loading="Gongloading">
      </Table>
      <Page :current="listQuery.pageNum"
            :page-size="listQuery.pageSize"
            :page-size-opts="[10, 20, 30, 50, 100]"
            :total="GongpageTotal"
            @on-change="GongchangePage"
            @on-page-size-change="GongchangePageSize"
            show-elevator
            show-sizer
            show-total
            style="margin:24px 0;text-align:right;"></Page>
    </Card>
    <releaseTest :modalstat="visiable"
                 @updateStat="updateStat"></releaseTest>
  </div>
</template>
<script>
import releaseTest from './components/releaseTest';
import { examination } from '@/api/examination';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10
};
export default {
  components: {
    releaseTest
  },
  data () {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      visiable: false,
      columns4: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('examActivityName'),
          key: 'examName',
          align: 'center'
        },
        {
          title: this.$t('startTime'),
          key: 'startTime',
          align: 'center'
        },
        {
          title: this.$t('endTime'),
          key: 'endTime',
          align: 'center'
        },
        {
          title: this.$t('questionNum'),
          key: 'questionCount',
          align: 'center'
        },
        // {
        //   title: this.$t('examStat'),
        //   key: 'status',
        //   align: 'center'
        // },
        {
          title: this.$t('examNum'),
          key: 'employeeTotalCount',
          align: 'center'
        },
        {
          title: this.$t('alreadyNum'),
          key: 'employeeCount',
          align: 'center'
        },
        {
          title: this.$t('passGoal'),
          key: 'passPoint',
          align: 'center'
        }, {
          title: this.$t('passNum'),
          key: 'employeePassCount',
          align: 'center'
        }
      ],
      Gongsearchform: {
        pageNum: 1,
        pageSize: 10
      },
      GongpageTotal: 0,
      Gongloading: false,
      tableData: []
    };
  },
  mounted () {
    this.getList();
  },
  methods: {
    getList () {
      this.Gongloading = true;
      examination.findExamTask(this.listQuery).then(res => {
        console.log(res);
        this.tableData = res.data.list;
        this.GongpageTotal = res.data.totalCount;
        this.Gongloading = false;
      });
    },
    GongchangePage (val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    GongchangePageSize (val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    addGong () {
      this.visiable = true;
      console.log(111);
    },
    updateStat (stat) {
      this.visiable = stat;
      this.getList();
    },
    refresh () {
      this.listQuery.pageNum = 1;
      this.getList();
    }
  }
};
</script>
