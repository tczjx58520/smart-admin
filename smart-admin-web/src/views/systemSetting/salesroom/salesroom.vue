<template>
  <div>
    <Card class="warp-card" dis-hover>
      <Row :gutter="16">
        <Form
          :model="searchform"
          class="tools"
          inline
          ref="searchform"
          :label-width="65"
          label-position="left"
        >
          <Col span="5">
            <FormItem prop="person" :label="$t('gwmc')" style="width: 100%">
              <Input
                placeholder="请输入用户名"
                type="text"
                v-model="searchform.categoryName"
                style="width: 100%"
              />
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem>
              <ButtonGroup>
                <Button @click="search" icon="ios-search" type="primary">{{
                  $t("Search")
                }}</Button>
              </ButtonGroup>
            </FormItem>
          </Col>
        </Form>
      </Row>
    </Card>
    <!-- 查询结束 -->
    <Card class="warp-card" dis-hover style="height: calc(100vh)">
      <div style="margin-bottom: 20px">
        <Button
          style="margin-right: 15px"
          @click="reset"
          icon="md-refresh"
          type="default"
          >{{ $t("Reflash") }}</Button
        >
        <Button
          v-privilege="['10-16-1']"
          style="margin-right: 15px"
          @click="created"
          icon="md-add"
          type="warning"
          >{{ $t("Create") }}</Button
        >
        <Button
          v-privilege="['10-16-3']"
          style="margin-right: 15px"
          @click="clear"
          icon="md-close"
          type="error"
          >{{ $t("Delete") }}</Button
        >
      </div>
      <Table
        ref="multipleTable"
        :columns="columns"
        :data="data"
        :loading="loading"
        :max-heigth="tableHeight"
        @on-selection-change="selectwelfare"
        @on-row-dblclick="Edit"
      ></Table>
      <Page
        :current="searchform.pagenum"
        :page-size="searchform.pagesize"
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
    <!-- 新建弹窗 -->
    <addModal :modalstat="visiable" @updateStat="updateStat"></addModal>
    <!-- 新建结束============= -->
    <editModal
      :modalstat="visiable_edit"
      :editinfo="editinfo"
      @updateStat="updateStat_edit"
    ></editModal>
  </div>
</template>

<script>
import { salesroom } from '@/api/salesroom';
import addModal from './components/addmodal/modal';
import editModal from './components/editmodal/modal';
import addemp from './components/addemp/modal';
export default {
  name: 'flowClassification',
  components: {
    addModal,
    addemp,
    editModal
  },
  props: {},
  data () {
    return {
      visiable_edit: false,
      editinfo: {},
      searchform: {
        pagenum: 1,
        pagesize: 10
      },
      loading: false,
      pageTotal: 0,
      // table表头
      columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('mdmc'),
          key: 'repositoryName'
        },
        {
          title: this.$t('melx'),
          key: 'type',
          render: (h, params) => {
            if (params.row.type === 1) {
              return h('span', this.$t('ck'));
            } else {
              return h('span', this.$t('md'));
            }
          }
        },
        {
          title: this.$t('mdzt'),
          key: 'stat',
          render: (h, params) => {
            if (params.row.type === 1) {
              return h('span', this.$t('qy'));
            } else {
              return h('span', this.$t('Close'));
            }
          }
        },
        {
          title: this.$t('usermanage_view.action'),
          key: 'action',
          width: 200,
          align: 'center',
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
                      value: ['10-16-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.Edit(params.row);
                    }
                  }
                },
                this.$t('Copy')
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-16-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.Edit(params.row);
                    }
                  }
                },
                this.$t('Edit')
              )
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
      data: [],
      // 新建弹窗
      visiable: false,
      moreWelfare: [],
      tableHeight: 0
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.getwelfareList();
    setTimeout(() => {
      this.tableHeight =
        window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 200;
    }, 200);
  },
  methods: {
    Edit (row) {
      if (this.$judge(['1-4-2'])) {
        this.editinfo = row;
        this.visiable_edit = true;
      } else {
        console.log('needroles');
      }
    },
    selectwelfare (selection) {
      this.moreWelfare = selection;
    },
    clear () {
      console.log('this.moreWelfare', this.moreWelfare);
      for (const i in this.moreWelfare) {
        let data = {};
        data.id = this.moreWelfare[i].id;
        data.operatId = this.$store.state.user.userLoginInfo.userId;
        FlowCategoryApi.delGroup(data).then((res) => {
          if (res.ret === 200) {
            this.$Message.success(res.msg);
            this.reset();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    // 查询用户登录日志
    async getwelfareList () {
      try {
        this.loading = true;
        let result = await salesroom.getSalesRoomList(this.searchform);
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
      this.searchform.pagenum = pageNum;
      this.getwelfareList();
    },
    // 改变一页展示数
    changePageSize (pageSize) {
      this.searchform.pagenum = 1;
      this.searchform.pagesize = pageSize;
      this.getwelfareList();
    },
    // 搜索
    search () {
      this.searchform.pagenum = 1;
      this.getwelfareList();
    },
    // 重置
    reset () {
      this.searchform.pagenum = 1;
      this.searchform.pagesize = 10;
      this.search();
    },
    // 删除日志(暂无)
    async deleteLog () {
      this.$Spin.show();
      this.$Spin.hide();
      this.$Message.success('删除成功');
      this.getwelfareList();
    },
    // 弹窗组件
    created () {
      console.log(12312312);
      this.visiable = true;
    },
    updateStat (stat) {
      this.visiable = stat;
      this.getwelfareList();
    },
    updateStat_edit (stat) {
      this.visiable_edit = stat;
      this.getwelfareList();
    }
    // 弹窗组件结束=========================》
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item {
  margin-bottom: 0;
}
</style>
