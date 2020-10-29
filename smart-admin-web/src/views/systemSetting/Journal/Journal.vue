<template>
  <div>
    <!-- 头部查询 -->
    <Card class="warp-card" dis-hover>
      <Row :gutter="16">
        <Form :model="searchform" class="tools" inline ref="searchform" :label-width="65" label-position="left">
          <Col span="4">
          <FormItem prop="type" :label="$t('type')" style="width:100%;margin-right:15px;">
            <Input placeholder="请输入" type="text" v-model="searchform.operatorType" style="width:100%" />
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem prop="person" :label="$t('userName')" style="width:100%">
            <Input placeholder="请输入用户名" type="text" v-model="searchform.operatorName" readonly style="width:100%" @click.native="selectemp" clearable @on-clear="clearemp"/>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem prop="startDate" :label="$t('actiontime')" style="width:100%">
            <DatePicker type="daterange" split-panels v-model="searchform.time" placeholder="起始时间" style="width:100%" @on-change="showmytime"></DatePicker>
          </FormItem>
          </Col>
          <!-- <Col span="4">
          <FormItem prop="origin" :label="$t('origin')" style="width:100%">
            <Select v-model="searchform.origin" style="width:100%">
              <Option v-for="item in originList" :value="item.label" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem> -->
          </Col>
          <Col span="4">
          <FormItem>
            <ButtonGroup>
              <Button @click="search" icon="ios-search" type="primary">查询</Button>
              <!-- <Button @click="reset" icon="md-refresh" type="default">重置</Button> -->
            </ButtonGroup>
          </FormItem>
          </Col>
        </Form>
      </Row>
    </Card>
    <!-- 查询结束 -->
    <Card class="warp-card" dis-hover style="height: calc(100vh - 75px)">
      <ButtonGroup style="margin-bottom:20px;">
        <Button @click="reset" icon="md-refresh" type="default">刷新</Button>
        <!-- <Button @click="clear" icon="md-close" type="error">清除</Button> -->
      </ButtonGroup>
      <Table :columns="columns" :data="data" :loading="loading"></Table>
      <Page :current="searchform.pageNum" :page-size="searchform.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
        :total="pageTotal" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator show-sizer
        show-total style="margin:24px 0;text-align:right;"></Page>
    </Card>
    <!-- 添加员工弹窗 -->
    <addemp :modalstat = "visiable_emp" @updateStat = "updateStat_emp"></addemp>
  </div>
</template>

<script>
import {
  JournalApi
} from '@/api/Journal';
import addemp from './components/addemp/modal';
export default {
  name: 'UserLoginLog',
  components: {
    addemp
  },
  props: {},
  data () {
    return {
      visiable_emp: false,
      loading: false,
      searchform: {
        type: 1,
        startDate: '',
        endDate: '',
        pageNum: 1,
        pageSize: 10,
        module: '',
        operatorId: '',
        origin: 1
      },
      typeList: [{
        value: '类型1',
        label: '类型1'
      },
      {
        value: '类型2',
        label: '类型2'
      }
      ],
      originList: [{
        value: '来源1',
        label: '来源1'
      },
      {
        value: '来源2',
        label: '来源2'
      }
      ],
      pageTotal: 0,
      // table表头
      columns: [{
        title: '操作类型',
        key: 'operatorType',
        width: '100'
      },
      {
        title: '账号',
        key: 'account'
      },
      {
        title: 'Ip',
        key: 'ipAddress'
      },
      {
        title: '操作时间',
        key: 'createTime',
        width: '100'
      },
      {
        title: '来源',
        key: 'module'
      },
      {
        title: '内容',
        key: 'context'
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
      data: [],
      today: ''
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.gettoday();
    this.getUserLoginLogPage();
  },
  methods: {
    clearemp () {
      delete this.searchform.operatorId;
      this.searchform.operatorName = '';
    },
    selectemp () {
      console.log(1231231231231);
      this.visiable_emp = true;
    },
    updateStat_emp (state, row) {
      this.visiable_emp = state;
      if (row) {
        this.searchform.operatorId = row.id;
        this.searchform.operatorName = row.personName;
      }
    },
    showmytime (e) {
      console.log('e==============>', e);
      this.searchform.time = e;
      this.searchform.beginTime = this.searchform.time[0] + ' 00:00:00';
      this.searchform.endTime = this.searchform.time[1] + ' 23:59:59';
    },
    gettoday () {
      let myDate = new Date(); // 获取当前年份(2位)
      let year = myDate.getFullYear(); // 获取完整的年份(4位,1970-????)
      let month = myDate.getMonth(); // 获取当前月份(0-11,0代表1月)
      if (month + 1 < 10) {
        month = '0' + (month + 1);
      }
      let day = myDate.getDate(); // 获取当前日(1-31)
      if (day < 10) {
        day = '0' + day;
      }
      let dayNow = year + '-' + month + '-' + day;
      this.today = dayNow;
      this.searchform.beginTime = this.today + ' 00:00:00';
      this.searchform.endTime = this.today + ' 23:59:59';
      console.log(this.today);
    },
    clear () {
      console.log('清楚');
    },
    // 查询用户登录日志
    async getUserLoginLogPage () {
      try {
        this.loading = true;
        console.log('time==============>', this.searchform.beginTime, this.searchform.endTime);
        let result = await JournalApi.queryList(this.searchform);
        this.loading = false;
        this.data = result.data.content;
        this.pageTotal = result.data.totalCount;
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
      this.$refs.searchform.resetFields();
      this.search();
    },
    // 删除日志(暂无)
    async deleteLog (id) {
      this.$Spin.show();
      await JournalApi.deleteUserLoginLog(id);
      this.$Spin.hide();
      this.$Message.success('删除成功');
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
