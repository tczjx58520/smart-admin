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
              :label="$t('ssfl')"
              style="width: 100%; margin-right: 15px"
            >
              <Select
                v-model="searchform.categoryId"
                style="width: 100%"
                clearable
              >
                <Option
                  v-for="item in categoryList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.categoryName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem prop="person" :label="$t('fqsj')" style="width: 100%">
              <DatePicker type="daterange" placeholder="Select date" v-model="searchform.timeRange" style="width: 200px" @on-change="setTime"></DatePicker>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem prop="origin" :label="$t('fqr')" style="width: 100%">
              <Input
                placeholder="请输入用户名"
                type="text"
                v-model="searchform.empName"
                clearable
                readonly
                style="width: 100%"
                @click.native="selectemp"
                @on-clear="clearemp"
              />
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
        <Button
          v-if="searchform.flag === 1"
          style="margin-right: 15px"
          v-privilege="['1-4-1']"
          @click="searchSignCounter"
          icon="md-add"
          type="error"
          >{{ $t("hqdb") }}</Button
        >
        <Button
          v-else
          style="margin-right: 15px"
          v-privilege="['1-4-1']"
          @click="searchToDoList"
          icon="md-add"
          >{{ $t("dblb") }}</Button
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
    </Card>
    <!-- 添加员工弹窗 -->
    <addemp
      :modalstat="visiable_emp"
      :type="mytype"
      @updateStat="updateStat_emp"
    ></addemp>
    <!-- 添加任务 -->
    <!-- <addGong :modalstat="visiable" @updateStat="updateStat"></addGong> -->
    <!-- 修改任务 -->
    <!-- <editGong
      :modalstat="visiable_edit"
      :editinfo="editinfo"
      @updateStat="updateStat_edit"
    ></editGong> -->
    <viewtaskDetail
      :modalstat="visiable_view"
      :editinfo="editinfo"
      @updateStat="updateStat_view"
    ></viewtaskDetail>
    <handlerTaskDetail
      :modalstat="visiable_handler"
      :editinfo="editinfo"
      @updateStat="updateStat_handler"
    ></handlerTaskDetail>
  </div>
</template>

<script>
import { assessmentTaskApi } from '@/api/assessmentTask';
import addemp from './components/addemp/modal';
// import addGong from './components/addmodalGong/modal';
// import editGong from './components/editmodalGong/modal';
import viewtaskDetail from './components/viewtaskDetail/modal';
import handlerTaskDetail from './components/handlertaskDetail/handlertaskDetail';
import { FlowCategoryApi } from '@/api/flowClassification';
import { unDoFlowApi } from '@/api/unDoFlow';
import { utils } from '@/lib/util';
import { countersign } from '@/api/countersign';
export default {
  name: 'assessmentTask',
  components: {
    addemp,
    viewtaskDetail,
    handlerTaskDetail
  },
  props: {},
  data () {
    return {
      editinfo: null,
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
        empId: this.$store.state.user.userLoginInfo.userId,
        stat: 1
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
          title: this.$t('fqall'),
          width: 200,
          render: (h, params) => {
            const mydate = params.row.createDate || params.row.sendDate
            let DateStr = utils.getDate(new Date(mydate), 'YMDHMS');
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
                    title: `${params.row.startPersonName || params.row.sendPersonName} / ${DateStr}`
                  }
                },
                `${params.row.startPersonName || params.row.sendPersonName} / ${DateStr}`
              )
            ]);
          }
        },
        {
          title: this.$t('ssflsslc'),
          width: 200,
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
                    title: `${params.row.flowCategory} / ${params.row.flowName}`
                  }
                },
                `${params.row.flowCategory} / ${params.row.flowName}`
              )
            ]);
          }
        },
        {
          title: this.$t('bzmc'),
          key: 'actionName',
          width: '200'
        },
        {
          title: this.$t('cstx'),
          key: 'effectiveDate'
        },
        {
          title: this.$t('assessmentTask_view.stat'),
          key: 'stat',
          width: '100',
          render: (h, params) => {
            return h('span', this.$options.filters.statfilter(params.row.stat));
          }
        },
        {
          title: this.$t('action'),
          key: 'action',
          width: 200,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handler_list(params.row);
                    }
                  }
                },
                this.$t('bl')
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['1-4-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.View_list(params.row);
                    }
                  }
                },
                this.$t('View')
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
        1: '办理中'
      };
      return statMap[value];
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.getUserLoginLogPage();
    this.getbaseclassification();
  },
  methods: {
    setTime (val, type) {
      console.log(val);
      if (val.length > 0) {
        this.searchform.beginTime = val[0];
        this.searchform.endTime = val[1];
      }
    },
    searchToDoList () {
      this.getUserLoginLogPage();
    },
    searchSignCounter () {
      this.searchform.flag = 2;
      this.getcounterSign();
    },
    getcounterSign () {
      this.loading = true;
      countersign.getcountersign(this.searchform).then(res => {
        console.log('代办列表=================', res);
        this.loading = false;
        this.data = res.data.content.list;
        this.pageTotal = res.data.content.totalCount;
      });
    },
    async getbaseclassification () {
      const searchForm = {
        pageNum: 1,
        pageSize: 9999
      };
      await FlowCategoryApi.getGroup(searchForm).then(res => {
        this.categoryList = res.data.content.list;
      });
    },
    View_list (row) {
      this.visiable_view = true;
      this.editinfo = row;
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
    updateStat_emp (state, row, type) {
      this.visiable_emp = state;
      if (row) {
        if (type === 1) {
          this.searchform.empId = row.id;
          this.searchform.empName = row.personName;
        } else {
          this.searchform.empId = row.id;
          this.searchform.empName = row.personName;
        }
      }
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
        pageSize: 10,
        empId: this.$store.state.user.userLoginInfo.userId,
        stat: 1
      };
      this.getUserLoginLogPage();
    },
    // 查询用户登录日志
    async getUserLoginLogPage () {
      this.searchform.flag = 1;
      try {
        this.loading = true;
        let result = await unDoFlowApi.getFlowRecord(this.searchform);
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
