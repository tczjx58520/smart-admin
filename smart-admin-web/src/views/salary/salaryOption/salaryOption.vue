<template>
  <div>
    <Card class="warp-card" dis-hover style="height: calc(100vh - 75px)">
      <div style="margin-bottom:20px;">
        <Button style="margin-right:15px;" @click="resetGong" icon="md-refresh" type="default">{{ $t('Reflash') }}</Button>
        <Button style="margin-right:15px;" v-privilege="['10-13-1']" @click="addGong" icon="md-add" type="warning">{{ $t('Create') }}</Button>
        <Button style="margin-right:15px;" v-privilege="['10-13-2']" @click="clearGong" icon="md-close" type="error">{{ $t('Delete') }}</Button>
      </div>
      <Table :columns="Gongcolumns" :data="Gongdata" :loading="Gongloading" @on-selection-change="selectGong" @on-row-dblclick="Edit"></Table>
      <Page :current="Gongsearchform.pageNum" :page-size="Gongsearchform.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
      :total="GongpageTotal" @on-change="GongchangePage" @on-page-size-change="GongchangePageSize" show-elevator show-sizer
      show-total style="margin:24px 0;text-align:right;"></Page>
    </Card>
    <!-- 新建社保弹窗 -->
        <addGong :modalstat = "Gongvisiable" @updateStat = "updateStat_gong"></addGong>
    <!-- 新建结束============= -->
        <addShe :modalstat = "Shevisiable" :editinfo="editinfo" @updateStat = "updateStat_she"></addShe>
  </div>
</template>

<script>
import { salaryOptionApi } from '@/api/salaryOption';
import addGong from './components/addmodalGong/modal';
import addShe from './components/addmodalShe/modal';
export default {
  name: 'salaryOption',
  components: {
    addGong,
    addShe
  },
  props: {},
  data () {
    return {
      editinfo: null,
      Gongvisiable: false,
      Shevisiable: false,
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
          title: this.$t('salaryOption_view.name'),
          key: 'name'
        },
        {
          title: this.$t('salaryOption_view.type'),
          key: 'type',
          render: (h, params) => {
            console.log(params);
            let typeList = [
              { value: 1, label: this.$t('salaryOption_view.System') },
              { value: 2, label: this.$t('salaryOption_view.Input') },
              { value: 3, label: this.$t('salaryOption_view.Report') },
              { value: 4, label: this.$t('salaryOption_view.Calculation') }
            ];
            console.log(typeList.filter(item => item.value === params.row.type));
            return h('span', typeList.filter(item => item.value === params.row.type)[0].label);
          }
        },
        {
          title: this.$t('salaryOption_view.sort'),
          key: 'idx'
        },
        {
          title: this.$t('usermanage_view.action'),
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            console.log('params渲染==========》', params.row.stat);
            if (params.row.type === 1) {
              return h('div', {}
              );
            } else {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-13-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.Edit(params.row);
                    }
                  }
                }, this.$t('Edit'))
              ]);
            }
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
        data.optionId = this.moreGong[i].id;
        data.operatId = this.$store.state.user.userId;
        salaryOptionApi.delsalaryOption(data).then(res => {
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
        let result = await salaryOptionApi.getsalaryOptionList(this.Gongsearchform);
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
      if (this.$judge(['1-4-2']) && row.type !== 1) {
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
    }
  }
};

</script>
<style lang="less" scoped>
    .ivu-form-item {
        margin-bottom: 0;
    }
</style>
