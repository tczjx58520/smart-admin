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
            <FormItem prop="origin" :label="$t('blr')" style="width: 100%">
              <Input
                placeholder="请输入用户名"
                type="text"
                v-model="searchform.initiatePersonName"
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
          v-if="searchform.stat === 2"
          style="margin-right: 15px"
          v-privilege="['1-4-1']"
          @click="searchSignCounter"
          icon="md-add"
          type="error"
          >{{ $t("wbl") }}</Button
        >
        <Button
          v-else
          style="margin-right: 15px"
          v-privilege="['1-4-1']"
          @click="searchToDoList"
          icon="md-add"
          >{{ $t("ybl") }}</Button
        >
        <Button
          v-if="searchform.stat"
          style="margin-right: 15px"
          v-privilege="['1-4-1']"
          @click="searchAllList"
          icon="md-add"
          >{{ $t("qblc") }}</Button
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
    <entrust :modalstat="visiable_entrust" :actionInfoId="actionInfoId" @updateStat="updateStat_entrust" />
    <correct :modalstat="visiable_correct" :actionInfoId="actionInfoId" @updateStat="updateStat_correct" />
    <stepaction :modalstat="visiable_stepaction" :actionInfoId="actionInfoId" @updateStat="updateStat_stepaction" />
    <processSteps :modalstat="visiable_processSteps" :actionInfoId="actionInfoId" @updateStat="updateStat_processSteps" />
  </div>
</template>

<script>
import { assessmentTaskApi } from '@/api/assessmentTask';
import addemp from './components/addemp/modal';
import entrust from './components/handler-dialogs/entrust';
import correct from './components/handler-dialogs/correct';
import stepaction from './components/handler-dialogs/stepaction';
import viewtaskDetail from './components/viewtaskDetail/modal';
import handlerTaskDetail from './components/handlertaskDetail/handlertaskDetail';
import processSteps from './components/handler-dialogs/processSteps';
import { FlowCategoryApi } from '@/api/flowClassification';
import { standingbook } from '@/api/standingbook';
import { utils } from '@/lib/util';
export default {
  name: 'assessmentTask',
  components: {
    addemp,
    viewtaskDetail,
    handlerTaskDetail,
    entrust,
    stepaction,
    processSteps,
    correct
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
        pageSize: 10
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
          render: (h, params) => {
            let DateStr = utils.getDate(new Date(params.row.initiateDate), 'YMDHMS');
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
                    title: `${params.row.initiatePersonName} / ${DateStr}`
                  }
                },
                `${params.row.initiatePersonName} / ${DateStr}`
              )
            ]);
          }
        },
        {
          title: this.$t('ssflsslc'),
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
        },
        {
          title: this.$t('jbrjbsc'),
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
                    title: `${params.row.handlePersonName} / ${params.row.hours}`
                  }
                },
                `${params.row.handlePersonName || '无'} ${params.row.handlePersonName ? '/' : ''}${params.row.hours || ''}`
              )
            ]);
          }
        },
        {
          title: this.$t('dycs'),
          key: 'printNum'
        },
        {
          title: this.$t('zt'),
          key: 'stat',
          render: (h, params) => {
            if (params.row.stat === 1) {
              return h('span', this.$t('blz'));
            } else if (params.row.stat === 2) {
              return h('span', this.$t('blwc'));
            } else if (params.row.stat === 3) {
              return h('span', this.$t('Open'));
            } else if (params.row.stat === 4) {
              return h('span', this.$t('Open'));
            } else if (params.row.stat === 5) {
              return h('span', this.$t('cgx'));
            } else if (params.row.stat === 6) {
              return h('span', this.$t('zz'));
            }
          }
        },
        {
          title: this.$t('action'),
          key: 'action',
          width: 350,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
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
                      this.handler_list(params.row);
                    }
                  }
                },
                this.$t('View')
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.stat === 2 ? 'none' : 'inline-block'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['1-4-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.handlerEntrust(params.row);
                    }
                  }
                },
                this.$t('wt')
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.stat === 2 ? 'none' : 'inline-block'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['1-4-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.handlerstepaction(params.row);
                    }
                  }
                },
                this.$t('db')
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.stat === 2 ? 'none' : 'inline-block'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['1-4-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.handlerCorrect(params.row);
                    }
                  }
                },
                this.$t('jz')
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.stat === 2 ? 'none' : 'inline-block'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['1-4-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: 'Title',
                        content: '<p>确认中止流程?</p>',
                        onOk: () => {
                          console.log(params.row);
                          params.row.stat = 6; // 结束状态
                          const data = JSON.stringify(params.row);
                          standingbook.updatestandingbook(data).then((res) => {
                            if (res.ret === 200) {
                              this.modal_loading = false;
                              this.$emit('updateStat', false);
                              this.$Message.success(res.msg);
                              this.getUserLoginLogPage();
                            }
                          });
                        },
                        onCancel: () => {
                          this.$Message.info('Clicked cancel');
                        }
                      });
                    }
                  }
                },
                this.$t('zz')
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.stat === 2 ? 'none' : 'inline-block'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['1-4-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: 'Title',
                        content: '<p>确认删除流程?</p>',
                        onOk: () => {
                          console.log(params.row);
                          const data = JSON.stringify(params.row);
                          standingbook.delstandingbook(params.row.id).then((res) => {
                            if (res.ret === 200) {
                              this.modal_loading = false;
                              this.$emit('updateStat', false);
                              this.$Message.success(res.msg);
                              this.getUserLoginLogPage();
                            }
                          });
                        },
                        onCancel: () => {
                          this.$Message.info('Clicked cancel');
                        }
                      });
                    }
                  }
                },
                this.$t('sc')
              )
            ]);
          }
        }
      ],
      // table数据
      data: [],
      today: '',
      moreaction: '',
      categoryList: [],
      // 操作1弹窗
      visiable_entrust: false,
      visiable_stepaction: false,
      visiable_processSteps: false,
      visiable_correct: false,
      actionInfoId: null
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
    updateStat_correct (stat) {
      this.visiable_correct = stat;
    },
    updateStat_entrust (stat) {
      this.visiable_entrust = stat;
    },
    updateStat_stepaction (stat) {
      this.visiable_stepaction = stat;
    },
    updateStat_processSteps (stat) {
      this.visiable_processSteps = stat;
    },
    handlerEntrust (row) {
      this.actionInfoId = row.id;
      this.visiable_entrust = true;
    },
    handlerstepaction (row) {
      this.actionInfoId = row.id;
      this.visiable_stepaction = true;
    },
    handlerprocessSteps (row) {
      this.actionInfoId = row.id;
      this.visiable_processSteps = true;
    },
    handlerCorrect (row) {
      this.actionInfoId = row.id;
      this.visiable_correct = true;
    },
    setTime (val, type) {
      console.log(val);
      if (val.length > 0) {
        this.searchform.beginTime = val[0];
        this.searchform.endTime = val[1];
      }
    },
    searchToDoList () {
      this.searchform.stat = 2;
      this.getUserLoginLogPage();
    },
    searchAllList () {
      delete this.searchform.stat;
      this.getUserLoginLogPage();
    },
    searchSignCounter () {
      this.searchform.stat = 1;
      this.getUserLoginLogPage();
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
      delete this.searchform.initiatePersonId;
      this.searchform.initiatePersonName = '';
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
          this.searchform.initiatePersonId = row.id;
          this.searchform.initiatePersonName = row.personName;
        } else {
          this.searchform.initiatePersonId = row.id;
          this.searchform.initiatePersonName = row.personName;
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
        pageSize: 10
      };
      this.getUserLoginLogPage();
    },
    // 查询用户登录日志
    async getUserLoginLogPage () {
      this.searchform.flag = 1;
      try {
        this.loading = true;
        let result = await standingbook.getstandingbook(this.searchform);
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
