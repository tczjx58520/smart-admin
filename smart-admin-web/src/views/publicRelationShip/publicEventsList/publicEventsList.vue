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
          <Col span="3">
            <FormItem prop="person" :label="$t('shijianbiaoti')" style="width: 100%">
              <Input
                placeholder="请输入"
                type="text"
                v-model="searchform.eventTitle"
                style="width: 100%"
                clearable
              />
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem prop="person" :label="$t('shijianfang')" style="width: 100%">
              <Input
                placeholder="请输入"
                type="text"
                v-model="searchform.eventParty"
                style="width: 100%"
                clearable
              />
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem prop="person" :label="$t('chuliren')" style="width: 100%">
              <Input
                placeholder="请输入"
                type="text"
                v-model="searchform.handlePerson"
                style="width: 100%"
                clearable
              />
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem prop="person" :label="$t('shijianshijian')" style="width: 100%">
              <DatePicker
                  type="daterange"
                  placeholder="Select date"
                  split-panels
                  style="width: 100%"
                  @on-change="selectDate"
                ></DatePicker>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem
              prop="person"
              :label="$t('zichanzhaungtai')"
              style="width: 100%"
            >
              <Select v-model="searchform.status" clearable>
                <Option :value="0">{{ $t("genjingzhong") }}</Option>
                <Option :value="1">{{ $t("jieshu") }}</Option>
              </Select>
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
        :columns="columns"
        :data="data"
        :loading="loading"
        :max-heigth="tableHeight"
        @on-selection-change="selectwelfare"
        @on-row-dblclick="Edit"
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
    </Card>
    <addemp
      :modalstat="visiable_emp"
      @updateStat="updateStat_emp"
    ></addemp>
    <addModal :modalstat="visiable" @updateStat="updateStat"></addModal>
    <editmodal :modalstat="visiable_edit" :editinfo="editinfo" @updateStat="updateStat_edit"></editmodal>
  </div>
</template>

<script>
import { publicEventsList } from '@/api/publicEventsList';
import { classification } from '@/api/classification';
import { utils } from '@/lib/util';
import addemp from './components/addemp/modal';
import addModal from './components/addmodal/modal';
import editmodal from './components/editmodal/modal';
export default {
  name: 'assetHistory',
  components: {
    addemp,
    addModal,
    editmodal
  },
  props: {},
  data () {
    return {
      isedit: false,
      visiable_emp: false,
      visiable_edit: false,
      editinfo: {},
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
          title: this.$t('shijianbiaoti'),
          key: 'title'
        },
        {
          title: this.$t('shijianneirong'),
          key: 'content'
        },
        {
          title: this.$t('shijianfang'),
          key: 'eventParty'
        },
        {
          title: this.$t('shijianchuliren'),
          key: 'handlePersonName'
        },
        {
          title: this.$t('shijianzhuangtai'),
          key: 'status',
          render: (h, params) => {
            let data = null;
            if (params.row.status === 0) {
              data = this.$t('genjingzhong');
            } else {
              data = this.$t('jieshu');
            }
            return h('span', data);
          }
        },
        {
          title: this.$t('shijianshijian'),
          key: 'createtime',
          render: (h, params) => {
            let date = 'N/A';
            if (params.row.createtime) {
              const temp = new Date(params.row.createtime);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('span', date);
          }
        },
        {
          title: this.$t('shijiangengxinshijian'),
          key: 'updateTime',
          render: (h, params) => {
            let date = 'N/A';
            if (params.row.updateTime) {
              const temp = new Date(params.row.updateTime);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('span', date);
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
                      this.handleView(params.row);
                    }
                  }
                },
                this.$t('View')
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.status === 0 ? 'inline-block' : 'none'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-16-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.handleProcess(params.row);
                    }
                  }
                },
                this.$t('Process')
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.status === 0 ? 'inline-block' : 'none'
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
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
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
                      this.Delete(params.row);
                    }
                  }
                },
                this.$t('Delete')
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
      tableHeight: 0,
      data_class: []
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.getwelfareList();
  },
  methods: {
    selectDate (val) {
      this.searchform.startTime = val[0];
      this.searchform.endTime = val[1];
    },
    handleProcess (row) {
      this.$router.push({ path: '/publicRelationShip/followPublicEvents', query: { id: row.id } });
    },
    handleView (row) {
      this.$router.push({ path: '/publicRelationShip/publicEventsDetail', query: { id: row.id } });
    },
    selectEmp () {
      this.visiable_emp = true;
    },
    clearEmp () {
      this.searchform.operatorName = '';
      this.searchform.operatorId = '';
    },
    updateStat_emp (stat, row) {
      this.visiable_emp = stat;
      if (!row) {
        return false;
      }
      this.searchform.operatorName = row.personName;
      this.searchform.operatorId = row.id;
    },
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
      for (const i in this.moreWelfare) {
        let data = {};
        data.id = this.moreWelfare[i].id;
        publicEventsList.deletestorage(data).then((res) => {
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
        let result = await publicEventsList.getstorage(this.searchform);
        this.loading = false;
        console.log('result===================', result.data.list);
        this.data = result.data.list;
        this.pageTotal = result.data.total;
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
    },
    // 弹窗组件结束=========================》
    viewDetail (row) {
      this.$router.push({
        path: '/assetInformation/assetDetail',
        query: { assetId: row.id }
      });
    },
    Delete (row) {
      this.$Modal.confirm({
        title: '友情提醒',
        content: '确定要删除吗？',
        onOk: () => {
          const data = {
            id: row.id
          };
          publicEventsList.deletestorage(data).then(res => {
            this.$Message.success(this.$t('sccg'));
            this.getwelfareList();
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item {
  margin-bottom: 0;
}
</style>
