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
            <FormItem prop="person" :label="$t('caozuoren')" style="width: 100%">
              <Input
                placeholder="请输入"
                type="text"
                v-model="searchform.operatorName"
                style="width: 100%"
                clearable
                readonly
                @on-focus="selectEmp"
                @on-clear="clearEmp"
              />
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem
              prop="person"
              :label="$t('zichanzhaungtai')"
              style="width: 100%"
            >
              <Select v-model="searchform.operatorType" clearable>
                <Option :value="0">{{ $t("daiyong") }}</Option>
                <Option :value="1">{{ $t("waijie") }}</Option>
                <Option :value="2">{{ $t("weixiu") }}</Option>
                <Option :value="3">{{ $t("baofei") }}</Option>
                <Option :value="4">{{ $t("diushi") }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem
              prop="person"
              :label="$t('zichanmingchen')"
              style="width: 100%"
            >
              <DatePicker
                v-model="searchform.timeStr"
                type="daterange"
                split-panels
                placeholder="Select date"
                style="width: 100%"
                clearable
                @on-change="getime"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem
              prop="person"
              :label="$t('zichanmingchen')"
              style="width: 100%"
            >
              <Input
                placeholder="请输入"
                type="text"
                v-model="searchform.assetName"
                style="width: 100%"
              />
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem
              prop="person"
              :label="$t('zichanbianhao')"
              style="width: 100%"
            >
              <Input
                placeholder="请输入"
                type="text"
                v-model="searchform.assetDetailNum"
                style="width: 100%"
              />
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem
              prop="person"
              :label="$t('jiediaobianhao')"
              style="width: 100%"
            >
              <Input
                placeholder="请输入"
                type="text"
                v-model="searchform.assetBorrowNum"
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
  </div>
</template>

<script>
import { assetManage } from '@/api/assetManage';
import { classification } from '@/api/classification';
import { utils } from '@/lib/util';
import { usermanagelApi } from '@/api/usermanage';
import addemp from './components/addemp/modal';
export default {
  name: 'assetHistory',
  components: {
    addemp
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
          title: this.$t('caozuoren'),
          key: 'operatorName'
        },
        {
          title: this.$t('zt'),
          key: 'operationCategory',
          render: (h, params) => {
            const map = {
              0: this.$t('daiyong'),
              1: this.$t('waijie'),
              2: this.$t('weixiu'),
              3: this.$t('baofei'),
              4: this.$t('diushi')
            };
            return h('span', map[params.row.operationCategory]);
          }
        },
        {
          title: this.$t('caozuoshijian'),
          key: 'operationTime',
          render: (h, params) => {
            let date = 'N/A';
            if (params.row.operationTime) {
              const temp = new Date(params.row.operationTime);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('span', date);
          }
        },
        {
          title: this.$t('zichanmingchen'),
          key: 'assetName'
        },
        {
          title: this.$t('zichanmingxibianhao'),
          key: 'assetDetailNum'
        },
        {
          title: this.$t('shiyongzuzhi'),
          key: 'useOrganizationName'
        },
        {
          title: this.$t('shiyongrenyuan'),
          key: 'usersName'
        }
        // {
        //   title: this.$t('mdzt'),
        //   key: 'stat',
        //   render: (h, params) => {
        //     if (params.row.stat === 1) {
        //       return h('span', this.$t('qy'));
        //     } else {
        //       return h('span', this.$t('Close'));
        //     }
        //   }
        // },
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
    setTimeout(() => {
      this.tableHeight =
        window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 200;
    }, 200);
    this.getList();
  },
  methods: {
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
    getime (val) {
      console.log('val========', val);
      this.searchform.startTime = val[0];
      this.searchform.endTime = val[1];
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
        assetManage.deletestorage(data).then((res) => {
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
        let result = await assetManage.getHistory(this.searchform);
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
    getList (val) {
      const data = {
        parentId: val || 0
      };
      classification.getstorage(data).then((res) => {
        console.log('res=======', res.data);
        const data = res.data.map((item) => {
          return {
            loading: false,
            label: item.classifyName,
            value: item.id,
            parentId: 0,
            children: []
          };
        });
        this.data_class = data;
      });
    },
    loadData_class (item, callback) {
      const data = {
        parentId: item.value
      };
      classification.getstorage(data).then((res) => {
        const data = res.data.map((items) => {
          return {
            label: items.classifyName,
            value: items.id,
            parentId: item.id
          };
        });
        item.children = data;
        callback();
      });
    },
    viewDetail (row) {
      this.$router.push({
        path: '/assetInformation/assetDetail',
        query: { assetId: row.id }
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
