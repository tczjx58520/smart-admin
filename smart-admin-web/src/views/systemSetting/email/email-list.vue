<template>
  <div>
    <Card class="warp-card" dis-hover>
      <Row :gutter="16">
        <Form :model="searchForm" class="tools" inline ref="searchform" :label-width="65" label-position="left">
          <Col span="4">
          <FormItem prop="type" :label="$t('notice_view.title')" style="width:100%;margin-right:15px;">
            <Input placeholder="请输入标题" type="text" v-model="searchForm.title" style="width:100%" clearable/>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem prop="startDate" :label="$t('actiontime')" style="width:100%">
            <DatePicker type="date" placeholder="Select date" v-model="searchForm.beginTime" format="yyyy-MM-dd" style="width: 100%" @on-change="time1"></DatePicker>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem prop="startDate" :label="$t('actiontime')" style="width:100%">
            <DatePicker type="date" placeholder="Select date" v-model="searchForm.endTime" format="yyyy-MM-dd" style="width: 100%" @on-change="time2"></DatePicker>
          </FormItem>
          </Col>
          <Col span="4">
          <FormItem>
            <ButtonGroup>
              <Button @click="find" icon="ios-search" type="primary">查询</Button>
              <!-- <Button @click="reset" icon="md-refresh" type="default">重置</Button> -->
            </ButtonGroup>
          </FormItem>
          </Col>
        </Form>
      </Row>
    </Card>
    <Card class="warp-card" dis-hover >
      <div class="butttonGroup" style="margin-bottom:10px;">
        <Button style="margin-right:15px;" @click="refresh" icon="md-refresh" type="default">{{ $t('Reflash') }}</Button>
        <Button v-privilege="['1-9-1']" style="margin-right:15px;" @click="addNew" icon="md-add" type="warning">{{ $t('Create') }}</Button>
        <Button v-privilege="['1-9-3']" style="margin-right:15px;" @click="del" icon="md-trash" type="error">{{ $t('Delete') }}</Button>
      </div>
      <Table :columns="columns" :data="tableData" @on-selection-change="SelectMore"></Table>
      <Page
        :current="searchForm.pageNum"
        :page-size="searchForm.pageSize"
        :page-size-opts="[10, 20, 30, 50, 100]"
        :total="total"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
        show-elevator
        show-sizer
        show-total
        style="margin:24px 0;text-align:right;"
      ></Page>
    </Card>
    <!-- 新建弹窗 -->
            <addModal :modalstat = "visiable" :info = "infoList" @updateStat = "updateStat"></addModal>
            <!-- 新建结束============= -->
  </div>
</template>

<script>
import { noticeApi } from '@/api/notice';
import addModal from './components/addmodal/modal';
export default {
  name: 'noticeList',
  components: {
    addModal
  },
  props: {},
  data () {
    return {
      infoList: {},
      visiable: false,
      // 数据量
      total: null,
      // 查询参数
      searchForm: {
        endTime: null,
        pageNum: 1,
        pageSize: 10,
        beginTime: null,
        title: null
      },
      // 表头
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '发布人员',
          key: 'createName'
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '过期',
          key: 'title'
        },
        {
          title: '开始时间',
          key: 'beginTime'
        },
        {
          title: '结束时间',
          key: 'endTime'
        },
        {
          title: this.$t('usermanage_view.action'),
          key: 'action',
          width: 200,
          align: 'center',
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
                    this.View(params);
                  }
                }
              }, this.$t('View')),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                directives: [
                  {
                    name: 'privilege',
                    value: ['1-9-2']
                  }
                ],
                on: {
                  click: () => {
                    this.editEmail(params);
                  }
                }
              }, this.$t('Edit'))
            ]);
          }
        }
      ],
      // table数据
      tableData: [],
      // 删除id
      delId: null,
      moreNotice: []
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {
    this.getEmailMess();
  },
  methods: {
    updateStat (stat) {
      this.visiable = stat;
    },
    SelectMore (selection) {
      this.moreNotice = selection;
    },
    time1 (e) {
      this.searchForm.beginTime = e;
    },
    time2 (e) {
      this.searchForm.endTime = e;
    },
    refresh () {
      this.getEmailMess();
    },
    del () {
      const delmap = this.moreNotice.map(item => { return item.id; });
      for (const i in delmap) {
        let data = {};
        data.noticeId = delmap[i];
        data.operatId = this.$store.state.user.userLoginInfo.userId;
        noticeApi.deleteNotice(data).then(res => {
          if (res.ret === 200) {
            this.$Message.success(res.msg);
            this.getEmailMess();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    View (params) {
      this.infoList = params.row;
      this.visiable = true;
      console.log('查看');
    },
    // 编辑邮件
    editEmail (params) {
      this.$router.push({
        path: '/notice/notice',
        query: { id: params.row.id }
      });
    },
    // 新增
    addNew () {
      this.$router.push({ path: '/notice/notice' });
    },
    // 重置
    reset () {
      this.$refs.searchForm.resetFields();
      this.searchForm.startDate = null;
      this.searchForm.endDate = null;
      this.$set(this.searchForm, 'endDate', null);
      this.find();
    },
    // 删除确定
    async deleteSure () {
      this.$Spin.show();
      let res = await noticeApi.deleteEmail(this.delId);
      this.$Message.success('删除成功');
      this.$Spin.hide();
      this.getEmailMess();
    },
    // 删除操作
    deleteEmail (params) {
      this.delId = params.row.id;
      this.$Modal.confirm({
        title: '友情提醒',
        content: '确定要删除吗？',
        onOk: () => {
          this.deleteSure(params.row.id);
        }
      });
    },
    // 查询
    find () {
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = 10;
      this.getEmailMess();
    },
    // 更改分页查询条数
    changePageSize (pageSize) {
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = pageSize;
      this.getEmailMess();
    },
    // 获取邮件数据
    async getEmailMess () {
      this.$Spin.show();
      let res = await noticeApi.getNoticeList(this.searchForm);
      this.$Spin.hide();
      this.tableData = res.data.content.list;
      this.total = res.data.content.totalCount;
    },
    // 页码改变
    changePage (pageNum) {
      this.searchForm.pageNum = pageNum;
      this.getEmailMess();
    }
  }
};
</script>
<style lang="less" scoped>
  .ivu-form-item {
        margin-bottom: 0;
    }
</style>
