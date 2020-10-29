<template>
  <div>
    <Card class="warp-card" dis-hover style="height: calc(100vh - 75px)">
    <Tabs :animated="false">
        <TabPane v-privilege="['10-12-4']" label="公积金">
            <div style="margin-bottom:20px;">
              <Button style="margin-right:15px;" @click="resetGong" icon="md-refresh" type="default">{{ $t('Reflash') }}</Button>
              <Button v-privilege="['10-12-1']" style="margin-right:15px;" @click="addGong" icon="md-add" type="warning">{{ $t('Create') }}</Button>
              <Button v-privilege="['10-12-3']" style="margin-right:15px;" @click="clearGong" icon="md-close" type="error">{{ $t('Delete') }}</Button>
            </div>
            <Table :columns="Gongcolumns" :data="Gongdata" :loading="Gongloading" @on-selection-change="selectGong"></Table>
            <Page :current="Gongsearchform.pageNum" :page-size="Gongsearchform.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
            :total="GongpageTotal" @on-change="GongchangePage" @on-page-size-change="GongchangePageSize" show-elevator show-sizer
            show-total style="margin:24px 0;text-align:right;"></Page>
        </TabPane>
        <TabPane v-privilege="['10-11-4']" label="社保">
            <div style="margin-bottom:20px;">
                <Button style="margin-right:15px;" @click="resetShe" icon="md-refresh" type="default">{{ $t('Reflash') }}</Button>
                <Button v-privilege="['10-11-1']" style="margin-right:15px;" @click="addShe" icon="md-add" type="warning">{{ $t('Create') }}</Button>
                <Button v-privilege="['10-11-3']" style="margin-right:15px;" @click="clearShe" icon="md-close" type="error">{{ $t('Delete') }}</Button>
            </div>
            <Table :columns="Shecolumns" :data="Shedata" :loading="Sheloading" @on-selection-change="selectShe"></Table>
            <Page :current="Shesearchform.pageNum" :page-size="Shesearchform.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
            :total="ShepageTotal" @on-change="ShechangePage" @on-page-size-change="ShechangePageSize" show-elevator show-sizer
            show-total style="margin:24px 0;text-align:right;"></Page>
        </TabPane>
    </Tabs>
    </Card>
    <!-- 新建社保弹窗 -->
        <addGong :modalstat = "Gongvisiable" @updateStat = "updateStat_gong"></addGong>
    <!-- 新建结束============= -->
    <!-- 新建公积金弹窗 -->
        <addShe :modalstat = "Shevisiable" @updateStat = "updateStat_she"></addShe>
    <!-- 新建结束============= -->
  </div>
</template>

<script>
import { socialSecurityFundApi } from '@/api/socialSecurityFund';
import addGong from './components/addmodalGong/modal';
import addShe from './components/addmodalShe/modal';
export default {
  name: 'socialSecurityFund',
  components: {
    addGong,
    addShe
  },
  props: {},
  data () {
    return {
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
          title: '基数',
          key: 'basicMoney'
        },
        {
          title: '创建人',
          key: 'createName'
        },
        {
          title: '个人承担',
          key: 'personalAdd'
        },
        {
          title: '公司承担',
          key: 'companyAdd'
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
          title: '基数',
          key: 'basicMoney'
        },
        {
          title: '创建人',
          key: 'createName'
        },
        {
          title: '养老保险',
          align: 'center',
          children: [
            {
              title: '个人承担',
              key: 'personalPensionInsurance'
            },
            {
              title: '公司承担',
              key: 'companyPensionInsurance'
            }
          ]
        },
        {
          title: '医疗保险',
          align: 'center',
          children: [
            {
              title: '个人承担',
              key: 'personalMedicalInsurance'
            },
            {
              title: '公司承担',
              key: 'companyMedicalInsurance'
            }
          ]
        },
        {
          title: '生育保险',
          align: 'center',
          children: [
            {
              title: '个人承担',
              key: 'personalBirthInsurance'
            },
            {
              title: '公司承担',
              key: 'companyBirthInsurance'
            }
          ]
        },
        {
          title: '失业保险',
          align: 'center',
          children: [
            {
              title: '个人承担',
              key: 'personalUnemploymentInsurance'
            },
            {
              title: '公司承担',
              key: 'companyUnemploymentInsurance'
            }
          ]
        },

        {
          title: '工伤保险',
          align: 'center',
          children: [
            {
              title: '个人承担',
              key: 'personalInjuryInsurance'
            },
            {
              title: '公司承担',
              key: 'companyInjuryInsurance'
            }
          ]
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
    this.getGongList();
    this.getSheList();
  },
  methods: {
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
        data.basicId = this.moreGong[i].id;
        data.operatId = this.$store.state.user.userId;
        socialSecurityFundApi.delGong(data).then(res => {
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
        let result = await socialSecurityFundApi.getGongList(this.Gongsearchform);
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
    clearShe () {
      for (const i in this.moreShe) {
        let data = {};
        data.basicId = this.moreShe[i].id;
        data.operatId = this.$store.state.user.userId;
        socialSecurityFundApi.delShe(data).then(res => {
          if (res.ret === 200) {
            this.$Message.success(res.msg);
            this.getSheList();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    // 查询用户登录日志
    async getSheList () {
      try {
        this.Sheloading = true;
        let result = await socialSecurityFundApi.getSheList(this.Shesearchform);
        this.Sheloading = false;
        this.Shedata = result.data.content.list;
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
