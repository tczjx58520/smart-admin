<template>
  <div>
    <Card class="warp-card" dis-hover>
      <Row :gutter="16">
        <Form
          :model="searchform"
          class="tools"
          inline
          ref="searchform"
          :label-width="65"
          label-position="left"
        >
          <Col span="5">
            <FormItem prop="person" :label="$t('shijianshijian')" style="width: 100%">
              <DatePicker
                  type="month"
                  placeholder="Select date"
                  split-panels
                  style="width: 100%"
                  @on-change="selectDate"
                ></DatePicker>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem>
              <ButtonGroup>
                <Button @click="search" icon="ios-search" type="primary">{{
                  $t("Search")
                }}</Button>
              </ButtonGroup>
            </FormItem>
          </Col>
        </Form>
      </Row>
    </Card>
    <!-- 查询结束 -->
    <Card class="warp-card" dis-hover style="height: calc(100vh)">
      <Table
        :columns="columns"
        :data="data"
        :loading="loading"
        :max-heigth="tableHeight"
        @on-selection-change="selectwelfare"
        @on-row-dblclick="Edit"
      ></Table>
      <Page
        :current="searchform.pageNum"
        :page-size="searchform.pageSize"
        :page-size-opts="[10, 20, 30, 50, 100]"
        :total="pageTotal"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
        show-elevator
        show-sizer
        show-total
        style="margin: 24px 0; text-align: right"
      ></Page>
    </Card>
  </div>
</template>

<script>
import { reposAwardList } from '@/api/reposAwardList';
import { utils } from '@/lib/util';
export default {
  name: 'assetHistory',
  components: {
  },
  props: {},
  data () {
    return {
      isedit: false,
      visiable_emp: false,
      visiable_edit: false,
      editinfo: {},
      searchform: {
        pageNum: 1,
        pageSize: 10
      },
      loading: false,
      pageTotal: 0,
      // table表头
      columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('dianmianmingchen'),
          key: 'repositoryName'
        },
        {
          title: this.$t('yuefen'),
          key: 'month',
          render: (h, params) => {
            let date = 'N/A';
            if (params.row.month) {
              const temp = new Date(params.row.month);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('span', date);
          }
        },
        {
          title: this.$t('all'),
          key: 'eventParty'
        },
        {
          title: this.$t('tuanduijiang'),
          key: 'handlePersonName',
          children: [
            {
              title: this.$t('benyueyingfa'),
              key: 'teamReward',
              align: 'center',
              width: 200
            },
            {
              title: this.$t('shangyuezankou'),
              key: 'lastImpounded',
              align: 'center',
              width: 200
            },
            {
              title: this.$t('benyuezankou'),
              key: 'impoundedMoney',
              align: 'center',
              width: 200
            },
            {
              title: this.$t('quxiaojine'),
              key: 'cancelMoney',
              align: 'center',
              width: 200
            }
          ]
        },
        {
          title: this.$t('lingtourenjiang'),
          key: 'leaderReward'
        },
        {
          title: this.$t('dianmianjinlijiang'),
          key: 'managerReward'
        },
        {
          title: this.$t('dianmiangerenmubiaojinag'),
          key: 'personalReward'
        }
      ],
      // table数据
      data: [],
      // 新建弹窗
      visiable: false,
      moreWelfare: [],
      tableHeight: 0,
      data_class: []
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.getwelfareList();
  },
  methods: {
    selectDate (val) {
      console.log(val);
      this.searchform.month = val;
    },
    selectEmp () {
      this.visiable_emp = true;
    },
    updateStat_emp (stat, row) {
      this.visiable_emp = stat;
      if (!row) {
        return false;
      }
      this.searchform.operatorName = row.personName;
      this.searchform.operatorId = row.id;
    },
    Edit (row) {
      if (this.$judge(['1-4-2'])) {
        this.editinfo = row;
        this.visiable_edit = true;
      } else {
        console.log('needroles');
      }
    },
    selectwelfare (selection) {
      this.moreWelfare = selection;
    },
    // 查询用户登录日志
    async getwelfareList () {
      try {
        this.loading = true;
        let result = await reposAwardList.getList(this.searchform);
        this.loading = false;
        this.data = result.data.content.list;
        this.pageTotal = result.data.content.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.loading = false;
      }
    },
    // 翻页
    changePage (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getwelfareList();
    },
    // 改变一页展示数
    changePageSize (pageSize) {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getwelfareList();
    },
    // 搜索
    search () {
      this.searchform.pageNum = 1;
      this.getwelfareList();
    },
    // 重置
    reset () {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = 10;
      this.search();
    },
    // 删除日志(暂无)
    async deleteLog () {
      this.$Spin.show();
      this.$Spin.hide();
      this.$Message.success('删除成功');
      this.getwelfareList();
    },
    // 弹窗组件
    created () {
      console.log(12312312);
      this.visiable = true;
    },
    updateStat (stat) {
      this.visiable = stat;
      this.getwelfareList();
    },
    updateStat_edit (stat) {
      this.visiable_edit = stat;
      this.getwelfareList();
    },
    // 弹窗组件结束=========================》
    viewDetail (row) {
      this.$router.push({
        path: '/assetInformation/assetDetail',
        query: { assetId: row.id }
      });
    },
    Delete (row) {
      this.$Modal.confirm({
        title: '友情提醒',
        content: '确定要删除吗？',
        onOk: () => {
          const data = {
            id: row.id
          };
          publicEventsList.deletestorage(data).then(res => {
            this.$Message.success(this.$t('sccg'));
            this.getwelfareList();
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item {
  margin-bottom: 0;
}
</style>
