<template>
  <div>
    <!-- 查询结束 -->
    <Card class="warp-card" dis-hover style="height: calc(100vh - 75px)">
      <div style="margin-bottom: 20px">
        <Tabs value="name1">
          <TabPane label="超时步骤" name="name1">
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
                    <Input v-model.number="searchform.actionTime" clearable>
                      <span slot="prepend">大于</span>
                      <span slot="append">时</span>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem
                    prop="type"
                    :label="$t('ssfl')"
                    style="width: 100%; margin-right: 15px"
                  >
                    <Input v-model.number="searchform.outTime" clearable>
                      <span slot="prepend">大于</span>
                      <span slot="append">时</span>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem
                    prop="person"
                    :label="$t('fqsj')"
                    style="width: 100%"
                  >
                    <Select
                      v-model="searchform.stat"
                      style="width:200px"
                      clearable
                    >
                      <Option
                        v-for="item in statList"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option
                      >
                    </Select>
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
            <Divider />
            <Button
              style="margin-right: 15px;margin-bottom: 20px;"
              @click="refresh"
              icon="md-refresh"
              type="default"
              >{{ $t("Reflash") }}</Button
            >
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
          <TabPane label="超时统计" name="name2">
            <Row :gutter="16">
              <Form
                :model="searchform2"
                class="tools"
                inline
                :label-width="80"
                label-position="left"
              >
                <Col span="5">
                  <FormItem
                    prop="person"
                    :label="$t('ssfl')"
                    style="width: 100%"
                  >
                    <Select v-model="searchform2.categoryId" style="width: 100%" clearable>
                      <Option
                        v-for="item in categoryList"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.categoryName }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem
                    prop="type"
                    :label="$t('lcmc')"
                    style="width: 100%; margin-right: 15px"
                  >
                    <Input v-model="searchform2.flowName" clearable> </Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem
                    prop="type"
                    :label="$t('qssj')"
                    style="width: 100%; margin-right: 15px"
                  >
                    <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px" @on-change="changeMytime"></DatePicker>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <ButtonGroup>
                      <Button @click="search2" icon="ios-search" type="primary"
                        >查询</Button
                      >
                    </ButtonGroup>
                  </FormItem>
                </Col>
              </Form>
            </Row>
            <Divider />
            <Button
              style="margin-right: 15px;margin-bottom: 20px;"
              @click="refresh2"
              icon="md-refresh"
              type="default"
              >{{ $t("Reflash") }}</Button
            >
            <Table
              :columns="columns2"
              :data="data2"
              :loading="loading2"
            ></Table>
            <Page
              :current="searchform2.pageNum"
              :page-size="searchform2.pageSize"
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
        </Tabs>
      </div>
    </Card>
    <!-- <addresultDilog
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
    ></viewtaskDetail> -->
  </div>
</template>

<script>
import { FlowCategoryApi } from '@/api/flowClassification';
import { timeout } from '@/api/timeout';
import { utils } from '@/lib/util';
import { countersign } from '@/api/countersign';
export default {
  name: 'timeout',
  components: {},
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
        entrustPersonId: this.$store.state.user.userLoginInfo.userId,
        entrustedPersonId: this.$store.state.user.userLoginInfo.userId
      },
      searchform2: {
        pageNum: 1,
        pageSize: 10,
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
          title: this.$t('lcbh'),
          key: 'flowNumber'
          // fixed: 'left'
        },
        {
          title: this.$t('bzmc'),
          key: 'actionName'
          // fixed: 'left'
        },
        {
          title: this.$t('zt'),
          key: 'stat',
          render: (h, params) => {
            if (params.row.stat === 1) {
              return h('span', this.$t('blz'));
            } else if (params.row.stat === 2) {
              return h('span', this.$t('blwc'));
            }
          }
          // fixed: 'left'
        },
        {
          title: this.$t('blry'),
          key: 'endTime'
          // fixed: 'left'
        },
        {
          title: this.$t('blsx'),
          key: 'endTime'
          // fixed: 'left'
        },
        {
          title: this.$t('cgsj'),
          key: 'endTime'
          // fixed: 'left'
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
          title: this.$t('blry'),
          key: 'employeeName',
          width: '250'
          // fixed: 'left'
        },
        {
          title: this.$t('blzs'),
          key: 'allCount'
          // fixed: 'left'
        },
        {
          title: this.$t('blsled'),
          width: 200,
          key: 'outEnd'
        },
        {
          title: this.$t('blsling'),
          key: 'outBegin',
          width: '250'
        },
        {
          title: this.$t('cszj'),
          key: 'outAll',
          width: '250'
        }
      ],
      // table数据
      data2: [],
      today: '',
      moreaction: '',
      categoryList: [],
      statList: [
        { value: 1, label: '办理中' },
        { value: 2, label: '已办理' }
      ]
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
    this.getList2();
    this.getList3();
    this.getbaseclassification();
  },
  methods: {
    changeMytime (val) {
      if (val.length > 0) {
        this.searchform2.beginTime = val[0];
        this.searchform2.endTime = val[1];
      }
    },
    // 获取基础信息
    async getbaseclassification () {
      const searchForm = {
        pageNum: 1,
        pageSize: 999
      };
      await FlowCategoryApi.getGroup(searchForm).then(res => {
        this.categoryList = res.data.content.list;
      });
    },
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
        let result = await timeout.getOutTimeList(this.searchform);
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
        this.loading2 = true;
        let result = await timeout.gettimeout(this.searchform2);
        this.loading2 = false;
        this.data2 = result.data.content.list;
        this.pageTotal2 = result.data.content.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.loading2 = false;
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
      this.getList2();
    },
    refresh2 () {
      this.searchform = {
        pageNum: 1,
        pageSize: 10
      };
      this.getList3();
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
      this.getList2();
    },
    search2 () {
      this.searchform.pageNum = 1;
      this.getList3();
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
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item {
  margin-bottom: 0;
}
</style>
