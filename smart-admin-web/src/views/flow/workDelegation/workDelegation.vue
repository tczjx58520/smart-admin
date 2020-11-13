<template>
  <div>
    <!-- 查询结束 -->
    <Card class="warp-card" dis-hover style="height: calc(100vh - 75px)">
      <div style="margin-bottom: 20px">
        <Tabs value="name1">
          <TabPane label="我的委托规则" name="name1">
            <Button
              style="margin-right: 15px"
              @click="refresh"
              icon="md-refresh"
              type="default"
              >{{ $t("Reflash") }}</Button
            >
            <Button
              style="margin-right: 15px"
              v-privilege="['1-4-1']"
              @click="creatResult"
              icon="md-add"
              >{{ $t("cj") }}</Button
            >
            <Button
              style="margin-right: 15px"
              v-privilege="['1-4-1']"
              @click="delResult"
              >{{ $t("sc") }}</Button
            >
            <Divider />
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
          </TabPane>
          <TabPane label="我的委托记录" name="name2">
            <Table
              :columns="columns2"
              :data="data2"
              :loading="loading2"
            ></Table>
            <Page
              :current="searchform.pageNum2"
              :page-size="searchform.pageSize2"
              :page-size-opts="[10, 20, 30, 50, 100]"
              :total="pageTotal2"
              @on-change="changePage2"
              @on-page-size-change="changePageSize2"
              show-elevator
              show-sizer
              show-total
              style="margin: 24px 0; text-align: right"
            ></Page>
          </TabPane>
          <TabPane label="我的被委托记录" name="name3">
            <Table
              :columns="columns3"
              :data="data3"
              :loading="loading3"
            ></Table>
            <Page
              :current="searchform.pageNum3"
              :page-size="searchform.pageSize3"
              :page-size-opts="[10, 20, 30, 50, 100]"
              :total="pageTotal3"
              @on-change="changePage3"
              @on-page-size-change="changePageSize3"
              show-elevator
              show-sizer
              show-total
              style="margin: 24px 0; text-align: right"
            ></Page>
          </TabPane>
        </Tabs>
      </div>
    </Card>
    <Modal
      v-model="mymoadlStat"
      class="add"
      width="60%"
      :closable="false"
      :mask-closable="false"
      :styles="{ top: '10px' }"
    >
      <Divider />
      <div>
          <Table
              :columns="columns4"
              :data="data4"
            ></Table>
      </div>
      <div slot="footer">
          <Button type="error" size="large" @click="cancel">{{
            $t("Close")
          }}</Button>
        </ButtonGroup>
      </div>
      <!-- 各种办理弹窗 -->
    </Modal>
    <addresultDilog
      :modalstat="visiable_addResult"
      @updateStat="updateStat_view"
    />
    <editresultDilog
      :modalstat="visiable_EditResult"
      :editInfo="editInfo"
      @updateStat="updateStat_Edit"
    />
    <viewtaskDetail
      :modalstat="visiable_view"
      :editinfo="editinfo"
      @updateStat="updateStat_viewDetail"
    ></viewtaskDetail>
  </div>
</template>

<script>
import { FlowCategoryApi } from '@/api/flowClassification';
import { entrust } from '@/api/entrust';
import { utils } from '@/lib/util';
import { countersign } from '@/api/countersign';
import addresultDilog from './components/addresult-dilog/addresult-dilog';
import editresultDilog from './components/editresult-dilog/editresult-dilog';
import viewtaskDetail from './components/viewtaskDetail/modal';
export default {
  name: 'assessmentTask',
  components: {
    addresultDilog,
    editresultDilog,
    viewtaskDetail
  },
  props: {},
  data () {
    return {
      editInfo: null,
      mymoadlStat: false,
      editinfo: null,
      mytype: null,
      visiable_addResult: false,
      visiable_EditResult: false,
      visiable_edit: false,
      visiable_view: false,
      visiable_handler: false,
      visiable_emp: false,
      loading: false,
      loading2: false,
      loading3: false,
      searchform: {
        pageNum: 1,
        pageSize: 10,
        pageNum2: 1,
        pageSize2: 10,
        pageNum3: 1,
        pageSize3: 10,
        entrustPersonId: this.$store.state.user.userLoginInfo.userId,
        entrustedPersonId: this.$store.state.user.userLoginInfo.userId
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
          title: this.$t('wtr'),
          key: 'entrustPersonName'
          // fixed: 'left'
        },
        {
          title: this.$t('bwtr'),
          key: 'entrustedPersonName'
          // fixed: 'left'
        },
        {
          title: this.$t('kssj'),
          key: 'beginTime'
          // fixed: 'left'
        },
        {
          title: this.$t('jssj'),
          key: 'endTime'
          // fixed: 'left'
        },
        {
          title: this.$t('sl'),
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#ed4014'
                  },
                  on: {
                    click: () => {
                      this.viewNumberDetail(params.row);
                    }
                  }
                },
                params.row.flowInfoVos.length
              )
            ]);
          }
          // fixed: 'left'
        },
        // {
        //   title: this.$t('zt'),
        //   key: 'stat',
        //   width: '250'
        //   // fixed: 'left'
        // },
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
                    type: params.row.stat === 1 ? 'success' : 'error',
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
                      if (params.row.stat) {
                        const data = {
                          id: params.row.id,
                          stat: params.row.stat === 1 ? 2 : 1
                        };
                        entrust.updateentrustedResult(data).then(res => {
                          this.getList2();
                        });
                      }
                    }
                  }
                },
                params.row.stat === 1 ? this.$t('qy') : this.$t('jy')
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handler_EditRule(params.row);
                    }
                  }
                },
                this.$t('Edit')
              )
              // h(
              //   'Button',
              //   {
              //     props: {
              //       type: 'info',
              //       size: 'small'
              //     },
              //     style: {
              //       marginRight: '5px'
              //     },
              //     directives: [
              //       {
              //         name: 'privilege',
              //         value: ['1-4-2']
              //       }
              //     ],
              //     on: {
              //       click: () => {
              //         this.View_list(params.row);
              //       }
              //     }
              //   },
              //   this.$t('View')
              // )
            ]);
          }
        }
      ],
      // table数据
      data: [],
      pageTotal2: 0,
      // table表头
      columns2: [
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
          title: this.$t('bwtr'),
          key: 'entrustedPersonName'
          // fixed: 'left'
        },
        {
          title: this.$t('wtsj'),
          width: 200,
          render: (h, params) => {
            let DateStr = utils.getDate(
              new Date(params.row.entrustDate),
              'YMDHMS'
            );
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
          title: this.$t('zt'),
          key: 'stat',
          width: '250'
          // fixed: 'left'
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
      data2: [],
      pageTotal3: 0,
      // table表头
      columns3: [
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
          title: this.$t('bwtr'),
          key: 'entrustedPersonName'
          // fixed: 'left'
        },
        {
          title: this.$t('wtsj'),
          width: 200,
          render: (h, params) => {
            let DateStr = utils.getDate(
              new Date(params.row.entrustDate),
              'YMDHMS'
            );
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
          title: this.$t('zt'),
          key: 'stat',
          width: '250'
          // fixed: 'left'
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
      data3: [],
      today: '',
      moreaction: '',
      categoryList: [],
      columns4: [
        {
          title: this.$t('lcmc'),
          key: 'flowName',
          width: '250'
          // fixed: 'left'
        },
        {
          title: this.$t('wtr'),
          key: 'wtr'
          // fixed: 'left'
        },
        {
          title: this.$t('bwtr'),
          key: 'bwtr'
          // fixed: 'left'
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
                'Poptip',
                {
                  props: {
                    size: 'small',
                    confirm: true,
                    title: '是否确认收回',
                    transfer: true
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }, [
                  h('Button', this.$t('sh'))
                ]
              )
            ]);
          }
        }
      ],
      data4: []
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
    this.getList2();
    this.getList3();
  },
  methods: {
    handler_EditRule (row) {
      this.visiable_EditResult = true;
      this.editInfo = row;
    },
    cancel () {
      this.mymoadlStat = false;
    },
    viewNumberDetail (row) {
      this.mymoadlStat = true;
      this.data4 = row.flowInfoVos;
    },
    delResult () {
      const length = this.moreaction.length;
      let count = 0;
      this.moreaction.map(async item => {
        const data = {
          entrustRuleId: item.id,
          operatId: this.$store.state.user.userLoginInfo.userId
        };
        await entrust.delentrustedResult(data).then(res => {
          console.log(res);
          count++;
        });
      });
      this.$Message.success('删除成功');
    },
    creatResult () {
      this.visiable_addResult = true;
    },
    async getList2 () {
      try {
        this.loading = true;
        let result = await entrust.getentrustResult(this.searchform);
        this.loading = false;
        this.data = result.data.content.list;
        this.pageTotal = result.data.content.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.loading = false;
      }
    },
    async getList3 () {
      try {
        this.loading3 = true;
        let result = await entrust.getentrustedResult(this.searchform);
        this.loading3 = false;
        this.data3 = result.data.content.list;
        this.pageTotal3 = result.data.content.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.loading3 = false;
      }
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
      this.visiable_addResult = state;
      this.getUserLoginLogPage();
    },
    updateStat_viewDetail (state) {
      this.visiable_view = state;
      this.getUserLoginLogPage();
    },
    updateStat_Edit (state) {
      this.visiable_EditResult = state;
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
      try {
        this.loading2 = true;
        let result = await entrust.getentrustRecord(this.searchform);
        this.loading2 = false;
        this.data2 = result.data.content.list;
        this.pageTotal2 = result.data.content.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.loading2 = false;
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
    // 翻页
    changePage2 (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getUserLoginLogPage();
    },
    // 改变一页展示数
    changePageSize2 (pageSize) {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getUserLoginLogPage();
    },
    // 翻页
    changePage3 (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getUserLoginLogPage();
    },
    // 改变一页展示数
    changePageSize3 (pageSize) {
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
    }
    // 删除
    // async del (id) {
    //   this.$Spin.show();
    //   // =======================================
    //   for (const i in this.moreaction) {
    //     const id = this.moreaction[i].id;
    //     let data = {};
    //     data.taskId = id;
    //     data.operatId = this.$store.state.user.userLoginInfo.userId;
    //     await assessmentTaskApi.delassessmentTask(data).then(res => {
    //       if (res.ret === 200) {
    //         console.log(res.msg);
    //         this.$Message['success']({
    //           background: true,
    //           content: res.msg
    //         });
    //       } else {
    //         console.log(res.msg);
    //         this.$Message['error']({
    //           background: true,
    //           content: res.msg
    //         });
    //       }
    //     });
    //   }
    //   this.getUserLoginLogPage();
    // }
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item {
  margin-bottom: 0;
}
</style>
