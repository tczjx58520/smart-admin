<template>
  <div>
    <Card class="warp-card" dis-hover style="height: calc(100vh - 150px)">
      <div style="margin-bottom:20px;">
        <Button style="margin-right:15px;" @click="resetGong" icon="md-refresh" type="default">{{ $t('Reflash') }}</Button>
        <Button style="margin-right:15px;" v-privilege="['10-15-1']" @click="addGong" icon="md-add" type="warning">{{ $t('Create') }}</Button>
        <Button style="margin-right:15px;" v-privilege="['10-15-3']" @click="clearGong" icon="md-close" type="error">{{ $t('Delete') }}</Button>
      </div>
      <Table max-height="500px" :columns="Gongcolumns" :data="Gongdata" :loading="Gongloading" @on-selection-change="selectGong" @on-row-dblclick="Edit"></Table>
      <Page :current="Gongsearchform.pageNum" :page-size="Gongsearchform.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
      :total="GongpageTotal" @on-change="GongchangePage" @on-page-size-change="GongchangePageSize" show-elevator show-sizer
      show-total style="margin:24px 0;text-align:right;"></Page>
    </Card>
    <!-- 新建社保弹窗 -->
        <addGong :modalstat = "Gongvisiable" @updateStat = "updateStat_gong"></addGong>
    <!-- 新建结束============= -->
        <addShe :modalstat = "Shevisiable" :editinfo="editinfo" @updateStat = "updateStat_she"></addShe>
        <!-- 查看弹窗 -->
        <viewmodal :modalstat = "Viewvisiable" :editinfo="editinfo" @updateStat = "updateStat_view"></viewmodal>
        <!-- 计算项 -->
        <Calcmodal :modalstat = "Calcvisiable" :editinfo="editinfo" @updateStat = "updateStat_calc"></Calcmodal>
  </div>
</template>

<script>
import { collectAccountsApi } from '@/api/collectAccounts';
import addGong from './components/addmodalGong/modal';
import addShe from './components/addmodalShe/modal';
import viewmodal from './components/viewmodalShe/modal';
import Calcmodal from './components/calcmodal/modal';
export default {
  name: 'collectAccounts',
  components: {
    addGong,
    addShe,
    viewmodal,
    Calcmodal
  },
  props: {},
  data () {
    return {
      editinfo: null,
      Gongvisiable: false,
      Shevisiable: false,
      Viewvisiable: false,
      Calcvisiable: false,
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
          title: this.$t('collectAccounts_view.title'),
          key: 'name'
        },
        // {
        //   title: this.$t('collectAccounts_view.applicableOrganization'),
        //   key: 'type'
        // },
        {
          title: this.$t('collectAccounts_view.applicablePeople'),
          // key: 'idx'
          render: (h, params) => {
            const people = params.row.collectAccountEmpVos.map(item => { return item.empName; }).join(',');
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
                  title: people
                }
              }, people)
            ]);
          }
        },
        {
          title: this.$t('collectAccounts_view.socialSecurity'),
          // key: 'idx',
          render: (h, param) => {
            if (param.row.socialSecurityId === '') {
              return h('span', this.$t('collectAccounts_view.Unpadin'));
            } else {
              return h('span', this.$t('collectAccounts_view.paid'));
            }
          }
        },
        {
          title: this.$t('collectAccounts_view.accumulationFund'),
          render: (h, param) => {
            if (param.row.accumulationFundId === '') {
              return h('span', this.$t('collectAccounts_view.Unpadin'));
            } else {
              return h('span', this.$t('collectAccounts_view.paid'));
            }
          }

        },
        {
          title: this.$t('collectAccounts_view.taxes'),
          key: 'idx'
        },
        {
          title: this.$t('usermanage_view.action'),
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            console.log('params渲染==========》', params.row.stat);
            return h('div', [
              h('Button', {
                style: {
                  marginRight: '10px'
                },
                props: {
                  type: 'info',
                  size: 'small'
                },
                directives: [
                  {
                    name: 'privilege',
                    value: ['10-15-2']
                  }
                ],
                on: {
                  click: () => {
                    this.Edit(params.row);
                  }
                }
              }, this.$t('Edit')),
              h('Button', {
                style: {
                  marginRight: '10px'
                },
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.View(params.row);
                  }
                }
              }, this.$t('View')),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.Calc(params.row);
                  }
                }
              }, this.$t('collectAccounts_view.editFormula'))
            ]);
          }
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
      Gongdata: [],
      moreGong: [],
      VerPwd: ''
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  beforeMount () {
    // this.Verification();
  },
  mounted () {
    this.getGongList();
  },
  methods: {
    Verification () {
      this.$Modal.confirm({
        scrollable: true,
        okText: '确认',
        title: '验证密码',
        render: (h) => {
          return h('Input', {
            type: 'password',
            props: {
              VerPwd: this.VerPwd
            },
            on: {
              input: (val) => {
                console.log(val);
                this.VerPwd = val;
              }
            }
          });
        },
        onOk: () => {
          // if (this.VerPwd === ) {

          // }
          // const msg = this.$Message.loading({
          //   content: this.VerPwd,
          //   duration: 2000
          // });
        }
      });
    },
    selectGong (selection) {
      this.moreGong = selection;
    },
    selectShe (selection) {
      this.moreShe = selection;
    },
    clearGong () {
      console.log('清楚');
      //   socialSecurityFundApi.delGong()
      for (const i in this.moreGong) {
        let data = {};
        data.accountId = this.moreGong[i].id;
        data.operatId = this.$store.state.user.userId;
        collectAccountsApi.delcollectAccounts(data).then(res => {
          if (res.ret === 200) {
            this.$Message.success(res.msg);
            this.getGongList();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    // 查询用户登录日志
    async getGongList () {
      try {
        this.Gongloading = true;
        let result = await collectAccountsApi.querycollectAccounts(this.Gongsearchform);
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
    updateStat_gong (state) {
      this.Gongvisiable = state;
      this.getGongList();
    },
    Edit (row) {
      if (this.$judge(['10-15-2'])) {
        console.log(row);
        this.Shevisiable = true;
        this.editinfo = row;
      } else {
        console.log('need roles');
      }
    },
    updateStat_she (state) {
      this.Shevisiable = state;
      this.getGongList();
    },
    View (row) {
      this.Viewvisiable = true;
      this.editinfo = row;
    },
    updateStat_view (state) {
      this.Viewvisiable = state;
    },
    Calc (row) {
      this.Calcvisiable = true;
      this.editinfo = row;
    },
    updateStat_calc (state) {
      this.Calcvisiable = state;
    }
  }
};

</script>
<style lang="less" scoped>
    .ivu-form-item {
        margin-bottom: 0;
    }
</style>
