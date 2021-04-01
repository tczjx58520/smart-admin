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
            <FormItem prop="person" :label="$t('jbmc')" style="width: 100%">
              <Input
                placeholder="请输入级别名称"
                type="text"
                v-model="searchform.levelName"
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
          v-privilege="['1-12-1']"
          style="margin-right: 15px"
          @click="created"
          icon="md-add"
          type="warning"
          >{{ $t("Create") }}</Button
        >
      </div>
      <Table
        ref="multipleTable"
        :columns="columns"
        :data="data"
        :loading="loading"
        :max-heigth="tableHeight"
        @on-selection-change="selectwelfare"
        @on-row-dblclick="Edit($event,true)"
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
      :isedit="editfalg"
      :editinfo="editinfo"
      @updateStat="updateStat_edit"
    ></editModal>
  </div>
</template>
<script>
import { SalesRoomlevel } from '@/api/salesroomLevel';
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
      editfalg: false,
      visiable_edit: false,
      editinfo: null,
      searchform: {
        pageNum: 1,
        pageSize: 10
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
          title: this.$t('jbmc'),
          key: 'levelName'
        },
        {
          title: this.$t('jbbz'),
          key: 'employeeStandards'
        },
        {
          title: this.$t('cjr'),
          key: 'createName'
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
                      value: ['1-12-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.Edit(params.row, false);
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
                      value: ['1-12-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.Edit(params.row, true);
                    }
                  }
                },
                this.$t('Edit')
              )
            ]);
          }
        }
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
    Edit (row, stat) {
      if (this.$judge(['1-4-2'])) {
        this.editinfo = row.id;
        this.editfalg = stat;
        this.visiable_edit = true;
      } else {
        console.log('needroles');
      }
    },
    selectwelfare (selection) {
      this.moreWelfare = selection;
    },
    // 查询用户登录日志
    async getwelfareList () {
      try {
        this.loading = true;
        let result = await SalesRoomlevel.getSalesRoomlevel(this.searchform);
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
      this.getwelfareList();
    },
    // 改变一页展示数
    changePageSize (pageSize) {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getwelfareList();
    },
    // 搜索
    search () {
      this.searchform.pageNum = 1;
      this.getwelfareList();
    },
    // 重置
    reset () {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = 10;
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
