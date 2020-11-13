<template>
  <div>
    <!-- 头部查询 -->
    <Card class="warp-card" dis-hover>
      <Row :gutter="16">
        <Form
          :model="searchform"
          class="tools"
          inline
          ref="searchform"
          :label-width="80"
          label-position="left"
        >
          <Col span="4">
            <FormItem
              prop="type"
              :label="$t('lcbh')"
              style="width: 100%; margin-right: 15px"
            >
              <Input
                placeholder="请输入"
                type="text"
                v-model="searchform.flowNumber"
                clearable
                style="width: 100%"
              />
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem
              prop="type"
              :label="$t('zhr')"
              style="width: 100%; margin-right: 15px"
            >
              <Input
                placeholder="请输入"
                type="text"
                v-model="searchform.recallPersonName"
                clearable
                readonly
                style="width: 100%"
                @click.native="seleectEmp"
                @on-clear="clearSearchPrson"
              />
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem
              prop="type"
              :label="$t('kssj')"
              style="width: 100%; margin-right: 15px"
            >
              <DatePicker type="daterange" placeholder="Select date" v-model="searchform.timeRange" style="width: 200px" @on-change="setTime"></DatePicker>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem>
              <ButtonGroup>
                <Button @click="search" icon="ios-search" type="primary"
                  >查询</Button
                >
              </ButtonGroup>
            </FormItem>
          </Col>
        </Form>
      </Row>
    </Card>
    <!-- 查询结束 -->
    <Card class="warp-card" dis-hover style="height: calc(100vh - 75px)">
      <div style="margin-bottom: 20px">
        <Button
          style="margin-right: 15px"
          @click="refresh"
          icon="md-refresh"
          type="default"
          >{{ $t("Reflash") }}</Button
        >
      </div>
      <Table
        :columns="columns"
        :data="data"
        :loading="loading"
        @on-selection-change="getmoreaction"
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
      <addemp :modalstat = "visiable_emp" @updateStat = "updateStat_emp" />
    </Card>
  </div>
</template>
<script>
import { recall } from '@/api/recall';
import { utils } from '@/lib/util';
import addemp from './addemp/modal';
export default {
  name: 'flowWatch',
  components: {
    addemp
  },
  props: {},
  data () {
    return {
      editinfo: null,
      distributionRecordId: null,
      mytype: null,
      visiable: false,
      visiable_edit: false,
      visiable_view: false,
      visiable_handler: false,
      visiable_emp: false,
      loading: false,
      searchform: {
        pageNum: 1,
        pageSize: 10,
        recallPersonId: this.$store.state.user.userLoginInfo.userId
      },
      originList: [],
      pageTotal: 0,
      // table表头
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
          // fixed: 'left'
        },
        {
          title: this.$t('lcbh'),
          key: 'flowNumber',
          width: '250'
          // fixed: 'left'
        },
        {
          title: this.$t('zhsj'),
          render: (h, params) => {
            let DateStr = utils.getDate(new Date(params.row.sendDate), 'YMDHM');
            return h('div', [
              h(
                'span',
                {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    title: `${DateStr}`
                  }
                },
                `${DateStr}`
              )
            ]);
          }
        },
        {
          title: this.$t('zhr'),
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    title: `${params.row.flowCategoryName} / ${params.row.flowName}`
                  }
                },
                `${params.row.flowCategoryName} / ${params.row.flowName}`
              )
            ]);
          }
        }
      ],
      // table数据
      data: [],
      today: '',
      moreaction: '',
      categoryList: []
    };
  },
  filters: {
    statfilter (value) {
      const statMap = {
        1: '未阅',
        2: '已阅'
      };
      return statMap[value];
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.getUserLoginLogPage();
  },
  methods: {
    setTime (val, type) {
      console.log(val);
      if (val.length > 0) {
        this.searchform.beginTime = val[0];
        this.searchform.endTime = val[1];
      }
    },
    setEndTime (val, type) {
      this.searchform.endTime = val;
    },
    updateStat_emp (stat, val) {
      this.visiable_emp = stat;
      console.log('传递============', val);
      if (val) {
        console.log(val);
        this.searchform.recallPersonName = val.personName;
        this.searchform.recallPersonId = val.id;
      }
    },
    seleectEmp () {
      this.visiable_emp = true;
    },
    clearSearchPrson () {
      this.searchform.recallPersonName = '';
      this.searchform.recallPersonId = '';
    },
    searchToDoList (stat) {
      this.searchform.stat = stat;
      this.getUserLoginLogPage();
    },
    View_list (row) {
      this.visiable_view = true;
      this.editinfo = row;
      this.distributionRecordId = row.id;
    },
    handler_list (row) {
      this.visiable_handler = true;
      this.editinfo = row;
    },
    Edit (row) {
      this.visiable_edit = true;
      this.editinfo = row;
    },
    getmoreaction (selection) {
      this.moreaction = selection;
      console.log('list===>', this.moreaction);
    },
    created () {
      this.visiable = true;
    },
    clearemp () {
      delete this.searchform.empId;
      this.searchform.empName = '';
    },
    selectemp () {
      this.visiable_emp = true;
      this.mytype = 1;
    },
    selectemp2 () {
      this.visiable_emp = true;
      this.mytype = 2;
    },
    updateStat (state) {
      this.visiable = state;
      this.getUserLoginLogPage();
    },
    updateStat_edit (state) {
      this.visiable_edit = state;
      this.getUserLoginLogPage();
    },
    updateStat_view (state) {
      this.visiable_view = state;
      this.getUserLoginLogPage();
    },
    updateStat_handler (state) {
      this.visiable_handler = state;
      this.getUserLoginLogPage();
    },
    clear () {
      console.log('清楚');
    },
    refresh () {
      this.searchform = {
        pageNum: 1,
        pageSize: 10
      };
      this.getUserLoginLogPage();
    },
    // 查询用户登录日志
    async getUserLoginLogPage () {
      this.searchform.flag = 1;
      try {
        this.loading = true;
        let result = await recall.getrecall(this.searchform);
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
      this.getUserLoginLogPage();
    },
    // 改变一页展示数
    changePageSize (pageSize) {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getUserLoginLogPage();
    },
    // 搜索
    search () {
      this.searchform.pageNum = 1;
      this.getUserLoginLogPage();
    },
    // 重置
    reset () {
      this.searchform = {
        pageNum: 1,
        pageSize: 10
      };
      this.$refs.searchform.resetFields();
      this.search();
    },
    // 删除
    async del (id) {
      this.$Spin.show();
      // =======================================
      for (const i in this.moreaction) {
        const id = this.moreaction[i].id;
        let data = {};
        data.taskId = id;
        data.operatId = this.$store.state.user.userLoginInfo.userId;
        await assessmentTaskApi.delassessmentTask(data).then(res => {
          if (res.ret === 200) {
            console.log(res.msg);
            this.$Message['success']({
              background: true,
              content: res.msg
            });
          } else {
            console.log(res.msg);
            this.$Message['error']({
              background: true,
              content: res.msg
            });
          }
        });
      }
      this.getUserLoginLogPage();
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item {
  margin-bottom: 0;
}
</style>
