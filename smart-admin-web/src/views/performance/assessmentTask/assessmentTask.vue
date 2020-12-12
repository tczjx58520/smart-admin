<template>
  <div>
    <!-- 头部查询 -->
    <Card class="warp-card" dis-hover>
      <Row :gutter="16">
        <Form :model="searchform" class="tools" inline ref="searchform" :label-width="80" label-position="left">
          <Col span="4">
          <FormItem prop="type" :label="$t('assessmentTask_view.taskName')" style="width:100%;margin-right:15px;">
            <Input placeholder="请输入" type="text" v-model="searchform.title" clearable style="width:100%" />
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem prop="person" :label="$t('assessmentTask_view.examiner')" style="width:100%">
            <Input placeholder="请输入用户名" type="text" v-model="searchform.testName" clearable readonly style="width:100%" @click.native="selectemp" @on-clear="clearemp"/>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem prop="person" :label="$t('assessmentTask_view.assessee')" style="width:100%">
            <Input placeholder="请输入用户名" type="text" v-model="searchform.empName" clearable readonly style="width:100%" @click.native="selectemp2" @on-clear="clearemp"/>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem prop="origin" :label="$t('assessmentTask_view.assessmentIndicatorSet')" style="width:100%">
            <Select v-model="searchform.collectId" style="width:100%" clearable>
              <Option v-for="item in originList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem>
            <ButtonGroup>
              <Button @click="search" icon="ios-search" type="primary">查询</Button>
            </ButtonGroup>
          </FormItem>
          </Col>
        </Form>
      </Row>
    </Card>
    <!-- 查询结束 -->
    <Card class="warp-card" dis-hover style="height: calc(100vh - 75px)">
      <div style="margin-bottom:20px;">
          <Button style="margin-right:15px;" @click="refresh" icon="md-refresh" type="default">{{ $t('Reflash') }}</Button>
          <Button style="margin-right:15px;" v-privilege="['1-4-1']" @click="created" icon="md-add" type="warning">{{ $t('Create') }}</Button>
          <Button style="margin-right:15px;" v-privilege="['1-4-3']" @click="del" icon="md-trash" type="error">{{ $t('Delete') }}</Button>
      </div>
      <Table :columns="columns" :data="data" :loading="loading" @on-selection-change="getmoreaction"></Table>
      <Page :current="searchform.pageNum" :page-size="searchform.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
        :total="pageTotal" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator show-sizer
        show-total style="margin:24px 0;text-align:right;"></Page>
    </Card>
    <!-- 添加员工弹窗 -->
    <addemp :modalstat = "visiable_emp" :type="mytype" @updateStat = "updateStat_emp"></addemp>
    <!-- 添加任务 -->
    <addGong :modalstat = "visiable" @updateStat = "updateStat"></addGong>
    <!-- 修改任务 -->
    <editGong :modalstat = "visiable_edit" :editinfo="editinfo" @updateStat = "updateStat_edit"></editGong>
    <viewtaskDetail :modalstat = "visiable_view" :editinfo="editinfo" @updateStat = "updateStat_view"></viewtaskDetail>
  </div>
</template>

<script>
import {
  assessmentTaskApi
} from '@/api/assessmentTask';
import { indicatorSetApi } from '@/api/indicatorSet';
import addemp from './components/addemp/modal';
import addGong from './components/addmodalGong/modal';
import editGong from './components/editmodalGong/modal';
import viewtaskDetail from './components/viewtaskDetail/modal';
export default {
  name: 'assessmentTask',
  components: {
    addemp,
    addGong,
    editGong,
    viewtaskDetail
  },
  props: {},
  data () {
    return {
      editinfo: null,
      mytype: null,
      visiable: false,
      visiable_edit: false,
      visiable_view: false,
      visiable_emp: false,
      loading: false,
      searchform: {
        pageNum: 1,
        pageSize: 10,
        empId: this.$store.state.user.userLoginInfo.userId
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
          title: this.$t('assessmentTask_view.taskName'),
          key: 'title',
          width: 200
          // fixed: 'left'
        },
        {
          title: this.$t('assessmentTask_view.examiner'),
          key: 'testName',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                domProps: {
                  title: params.row.testName
                }
              }, params.row.testName)
            ]);
          }
        },
        {
          title: this.$t('assessmentTask_view.assessee'),
          key: 'empName',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                domProps: {
                  title: params.row.empName
                }
              }, params.row.empName)
            ]);
          }
        },
        {
          title: this.$t('assessmentTask_view.assessmentIndicatorSet'),
          key: 'assessmentCollectName',
          width: '200'
        },
        {
          title: this.$t('assessmentTask_view.effectiveDate'),
          key: 'effectiveDate',
          width: '200'
        },
        {
          title: this.$t('assessmentTask_view.deadline'),
          key: 'deadDate',
          width: '100'
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
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.View_list(params.row);
                  }
                }
              }, this.$t('assessmentTask_view.assessmentSituation')),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: params.row.stat === 2 || params.row.stat === 3 ? 'none' : 'inline-block'
                },
                directives: [
                  {
                    name: 'privilege',
                    value: ['1-4-2']
                  }
                ],
                on: {
                  click: () => {
                    this.Edit(params.row);
                  }
                }
              }, this.$t('Edit')),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display:params.row.stat === 2 || params.row.stat === 3 ? 'none' : 'inline-block'
                },
                on: {
                  click: () => {
                    this.Stop(params.row);
                  }
                }
              }, this.$t('assessmentTask_view.termination'))
            ]);
          }
        }
      ],
      // table数据
      data: [],
      today: '',
      moreaction: ''
    };
  },
  filters: {
    statfilter (value) {
      const statMap = {
        0: '初始',
        1: '考核中',
        2: '考核完成',
        3: '被终止'
      };
      return statMap[value];
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.getUserLoginLogPage();
    this.getindicator();
  },
  methods: {
    Stop (row) {
      this.$Modal.confirm({
        title: 'Warning',
        content: '<p>请确认是否终止此次考核</p>',
        onOk: async () => {
          let data = {};
          data.taskId = row.id;
          data.operatId = this.$store.state.user.userLoginInfo.userId;
          await assessmentTaskApi.terminationTask(data);
          this.$Message.success('termination ok');
          this.getUserLoginLogPage();
        },
        onCancel: () => {
          this.$Message.info('cancel');
        }
      });
    },
    View_list (row) {
      this.visiable_view = true;
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
    async getindicator () {
      let data = {};
      data.pageNum = 1;
      data.pageSize = 10;
      let result = null;
      await indicatorSetApi.queryIndicator(data).then(res => {
        result = res.data.content.list;
      });
      this.originList = result.map(item => {
        return {
          name: item.name,
          id: item.id
        };
      });
    },
    created () {
      this.visiable = true;
    },
    clearemp () {
      delete this.searchform.testId;
      this.searchform.testName = '';
    },
    clearemp2 () {
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
          this.searchform.testId = row.id;
          this.searchform.testName = row.personName;
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
      try {
        this.loading = true;
        let result = await assessmentTaskApi.queryassessmentTask(this.searchform);
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
