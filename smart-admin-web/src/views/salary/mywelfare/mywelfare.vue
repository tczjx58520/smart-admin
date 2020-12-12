<template>
  <div>
    <Card class="warp-card" dis-hover style="height: calc(100vh - 75px)">
    <Tabs :animated="false">
        <TabPane v-privilege="['10-18-4']" label="我的薪酬">
            <div style="margin-bottom:20px;">
              <Button style="margin-right:15px;" @click="resetGong" icon="md-refresh" type="default">{{ $t('Reflash') }}</Button>
              <DatePicker type="month" v-model="Gongsearchform.yearAndMonth" format="yyyy-MM-dd" split-panels placeholder="Select date" style="width: 200px;margin-right:15px;" @on-change="showmytime"></DatePicker>
              <!-- <Button style="margin-right:15px;" @click="addGong" icon="md-add" type="warning">{{ $t('Create') }}</Button> -->
              <Button style="margin-right:15px;" @click="search" icon="md-search" type="default">{{ $t('Search') }}</Button>
            </div>
            <Table :columns="Gongcolumns" :data="Gongdata" :loading="Gongloading" @on-selection-change="selectGong"></Table>
            <Page :current="Gongsearchform.pageNum" :page-size="Gongsearchform.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
            :total="GongpageTotal" @on-change="GongchangePage" @on-page-size-change="GongchangePageSize" show-elevator show-sizer
            show-total style="margin:24px 0;text-align:right;"></Page>
        </TabPane>
        <TabPane v-privilege="['10-17-4']" label="我的福利">
            <div style="margin-bottom:20px;">
                <Button style="margin-right:15px;" @click="resetShe" icon="md-refresh" type="default">{{ $t('Reflash') }}</Button>
            </div>
            <Table :columns="Shecolumns" :data="Shedata" :loading="Sheloading" @on-selection-change="selectShe"></Table>
            <!-- <Page :current="Shesearchform.pageNum" :page-size="Shesearchform.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
            :total="ShepageTotal" @on-change="ShechangePage" @on-page-size-change="ShechangePageSize" show-elevator show-sizer
            show-total style="margin:24px 0;text-align:right;"></Page> -->
        </TabPane>
    </Tabs>
    </Card>
    <!-- 新建社保弹窗 -->
        <addGong :modalstat = "Gongvisiable" :editinfo = "editinfo" @updateStat = "updateStat_gong"></addGong>
    <!-- 新建结束============= -->
    <!-- 新建公积金弹窗 -->
        <addShe :modalstat = "Shevisiable" @updateStat = "updateStat_she"></addShe>
    <!-- 新建结束============= -->
  </div>
</template>

<script>
import { salaryQueryApi } from '@/api/salaryQuery';
import { welfareApi } from '@/api/welfare';
import { usermanagelApi } from '@/api/usermanage';
import addGong from './components/addmodalGong/modal';
import addShe from './components/addmodalShe/modal';
export default {
  name: 'mywelfare',
  components: {
    addGong,
    addShe
  },
  props: {},
  data () {
    return {
      editinfo: {},
      Gongvisiable: false,
      Gongloading: false,
      Gongsearchform: {
        pageNum: 1,
        pageSize: 10
      },
      GongpageTotal: 0,
      // table表头
      Gongcolumns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'empName'
        },
        {
          title: '日期',
          key: 'yearAndMonth'
        },
        {
          title: '所属组织',
          key: 'organizeName'
        },
        {
          title: '绩效得分',
          key: 'companyAdd'
        },
        {
          title: this.$t('usermanage_view.action'),
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            if (params.row.confirmStat === 0) {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-18-7']
                    }
                  ],
                  on: {
                    click: () => {
                      this.sure(params.row);
                    }
                  }
                }, this.$t('sure')),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-18-7']
                    }
                  ],
                  on: {
                    click: () => {
                      this.Disagree(params.row);
                    }
                  }
                }, this.$t('Disagree')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.View(params.row);
                    }
                  }
                }, this.$t('View'))
              ]);
            } else if (params.row.confirmStat === 1) {
              return h('div', [
                h('span', {
                  style: {
                    marginRight: '5px'
                  }
                }, this.$t('sured')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.View(params.row);
                    }
                  }
                }, this.$t('View'))
              ]);
            } else if (params.row.confirmStat === 2) {
              return h('div', [
                h('span', {
                  style: {
                    marginRight: '5px'
                  }
                }, this.$t('cancel')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.View(params.row);
                    }
                  }
                }, this.$t('View'))
              ]);
            }
          }
        }
        // {
        //   title: '操作',
        //   key: 'action',
        //   align: 'center',
        //   className: 'action-hide',
        //   render: (h, param) => {
        //     return this.$tableAction(h, [{
        //       title: '删除',
        //       directives: [{
        //         name: '',
        //         value: 'user-login-log-delete'
        //       }],
        //       action: () => {
        //         this.$Modal.confirm({
        //           title: '友情提醒',
        //           content: '确定要删除吗？',
        //           onOk: () => {
        //             this.deleteLog(param.row.id);
        //           }
        //         });
        //       }
        //     }]);
        //   }
        // }
      ],
      // table数据
      Gongdata: [],
      //   社保
      Shevisiable: false,
      Sheloading: false,
      Shesearchform: {
        pageNum: 1,
        pageSize: 10
      },
      ShepageTotal: 0,
      // table表头
      Shecolumns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '通知人',
          key: 'createName'
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '内容',
          key: 'content'
        }
        //   {
        //     title: '操作',
        //     key: 'action',
        //     align: 'center',
        //     className: 'action-hide',
        //     render: (h, param) => {
        //       return this.$tableAction(h, [{
        //         title: '删除',
        //         directives: [{
        //           name: 'privilege',
        //           value: 'user-login-log-delete'
        //         }],
        //         action: () => {
        //           this.$Modal.confirm({
        //             title: '友情提醒',
        //             content: '确定要删除吗？',
        //             onOk: () => {
        //               this.deleteLog(param.row.id);
        //             }
        //           });
        //         }
        //       }]);
        //     }
        //   }
      ],
      // table数据
      Shedata: [],
      moreGong: [],
      moreShe: []
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.$Modal.confirm({
      title: '验证密码',
      render: (h) => {
        return h('Input', {
          props: {
            value: this.value,
            placeholder: 'Please enter your pwd',
            type: 'password',
            password: true
          },
          on: {
            input: (val) => {
              this.value = val;
            }
          }
        });
      },
      onOk: async () => {
        console.log('this.value==============>', this.value);
        let data = {};
        data.pageNum = 1;
        data.pageSize = 10;
        data.empId = this.$store.state.user.userLoginInfo.userId;
        data.loginRepositoryId = this.$store.state.user.userLoginInfo.repositoryId;
        let res = await usermanagelApi.queryList(data);
        console.log('res=========', res.data.content.list[0].password === this.value);
        if (this.value === res.data.content.list[0].password) {
          this.$Message.success('正确');
          this.getGongList();
          this.getSheList();
        } else {
          this.$Message.error('密码错误');
        }
      },
      onCancel: () => {
        this.$Message.warning('cacel');
      }
      // onOk: () => {
      //   this.$Message.info('Clicked ok');
      //   this.getGongList();
      //   this.getSheList();
      // },
      // onCancel: () => {
      //   this.$Message.info('Clicked cancel');
      // }
    });
  },
  methods: {
    sure (row) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>已确认工资</p>',
        onOk: () => {
          let data = {};
          data.salaryId = row.id;
          data.confirmStat = 1;
          data.operatId = row.id;
          salaryQueryApi.confirmSalaryList(data).then(res => {
            if (res.ret === 200) {
              this.$message.success(res.msg);
              this.getGongList();
            } else {
              this.$message.error(res.msg);
            }
          });
        },
        onCancel: () => {
          this.$Message.info('cancel');
        }
      });
    },
    Disagree (row) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>工资有异议</p>',
        onOk: () => {
          let data = {};
          data.salaryId = row.id;
          data.confirmStat = 2;
          data.operatId = row.id;
          salaryQueryApi.confirmSalaryList(data).then(res => {
            if (res.ret === 200) {
              this.$message.success(res.msg);
              this.getGongList();
            } else {
              this.$message.error(res.msg);
            }
          });
        },
        onCancel: () => {
          this.$Message.info('cancel');
        }
      });
    },
    View (row) {
      this.Gongvisiable = true;
      this.editinfo = row;
    },
    search () {
      this.getGongList();
    },
    showmytime (e) {
      console.log('e==============>', e);
      this.Gongsearchform.yearAndMonth = e;
    },
    selectGong (selection) {
      this.moreGong = selection;
    },
    selectShe (selection) {
      this.moreShe = selection;
    },
    // 查询用户登录日志
    async getGongList () {
      try {
        this.Gongloading = true;
        this.Gongsearchform.empId = this.$store.state.user.userLoginInfo.userId;
        let result = await salaryQueryApi.getsalaryList(this.Gongsearchform);
        this.Gongloading = false;
        this.Gongdata = result.data.content.list;
        this.GongpageTotal = result.data.content.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.Gongloading = false;
      }
    },
    // 翻页
    GongchangePage (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getGongList();
    },
    // 改变一页展示数
    GongchangePageSize (pageSize) {
      this.Gongsearchform.pageNum = 1;
      this.Gongsearchform.pageSize = pageSize;
      this.getGongList();
    },
    // 重置
    resetGong () {
      this.getGongList();
    },
    addGong () {
      this.Gongvisiable = true;
    },
    // 社保===================================>
    // 查询用户登录日志
    async getSheList () {
      try {
        this.Sheloading = true;
        this.Shesearchform.empId = this.$store.state.user.userLoginInfo.userId;
        this.Shesearchform.organizeId = this.$store.state.user.userLoginInfo.organizationOa;
        // this.Shesearchform.empId = this.$store.state.user.userLoginInfo.userId;
        let result = await welfareApi.getmywelfare(this.Shesearchform);
        this.Sheloading = false;
        this.Shedata = result.data.content;
        this.ShepageTotal = result.data.content.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.Sheloading = false;
      }
    },
    // 翻页
    ShechangePage (pageNum) {
      this.Shesearchform.pageNum = pageNum;
      this.getSheList();
    },
    // 改变一页展示数
    ShechangePageSize (pageSize) {
      this.Shesearchform.pageNum = 1;
      this.Shesearchform.pageSize = pageSize;
      this.getSheList();
    },
    // 重置
    resetShe () {
      this.getSheList();
    },
    addShe () {
      this.Shevisiable = true;
    },
    updateStat_gong (state) {
      this.Gongvisiable = state;
      this.getGongList();
    },
    updateStat_she (state) {
      this.Shevisiable = state;
      this.getSheList();
    }
  }
};

</script>
<style lang="less" scoped>
    .ivu-form-item {
        margin-bottom: 0;
    }
</style>
