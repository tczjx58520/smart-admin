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
            <FormItem prop="person" :label="$t('leibie')" style="width: 100%">
              <Cascader v-model="searchform.parentClassifyId" :data="data_class" :load-data="loadData_class"></Cascader>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem prop="person" :label="$t('zichanmingchen')" style="width: 100%">
              <Input
                placeholder="请输入"
                type="text"
                v-model="searchform.assetName"
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
    <addModal :modalstat="visiable" @updateStat="updateStat"></addModal>
    <editmodal :modalstat="visiable_edit" :editinfo="editinfo" @updateStat="updateStat_edit"></editmodal>
  </div>
</template>

<script>

import { assetManage } from '@/api/assetManage';
import { classification } from '@/api/classification';
import addModal from './components/addmodal/modal';
import editmodal from './components/editmodal/modal';
import { fixedField } from '@/api/fixedField';
export default {
  name: 'assetManage',
  components: {
    addModal,
    editmodal
  },
  props: {},
  data () {
    return {
      isedit: false,
      visiable_edit: false,
      editinfo: {},
      searchform: {
        pageNum: 1,
        pageSize: 10,
        flag: 0,
        custodiansId: this.$store.state.user.userLoginInfo.userId,
        parentClassifyId: []
      },
      loading: false,
      pageTotal: 0,
      // table表头
      columns: [],
      initColumns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('zichanbianhao'),
          key: 'assetNum'
        },
        {
          title: this.$t('zichanmingchen'),
          key: 'assetName'
        },
        {
          title: this.$t('leibiemingchen'),
          key: 'classifyName'
        },
        {
          title: this.$t('xinghao'),
          key: 'speciation'
        },
        {
          title: this.$t('danwei'),
          key: 'companyName'
        },
        {
          title: this.$t('shuliang'),
          key: 'amount'
        },
        {
          title: this.$t('danjia'),
          key: 'unitPrice'
        },
        {
          title: this.$t('jiazhi'),
          key: 'totalPrice',
          render: (h, params) => {
            return h('span', (params.row.unitPrice * params.row.amount.toFixed(2)));
          }
        },
        {
          title: this.$t('shiyongnianxian'),
          key: 'serviceLife'
        },
        {
          title: this.$t('nianzhejiuzijin'),
          key: 'yearOldMoney',
          render: (h, params) => {
            return h('span', params.row.unitPrice * params.row.amount * params.row.depreciationRate);
          }
        },
        {
          title: this.$t('canzhilv'),
          key: 'depreciationRate'
        },
        {
          title: this.$t('baoguanrenyuan'),
          key: 'custodiansName'
        },
        {
          title: this.$t('cunfnagdidian'),
          key: 'storageLocation'
        },
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
                      this.viewDetail(params.row);
                    }
                  }
                },
                this.$t('viewDetail')
              ),
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
      tableHeight: 0,
      data_class: []
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  async mounted () {
    await this.getShowList();
    this.getwelfareList();
    setTimeout(() => {
      this.tableHeight =
        window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 200;
    }, 200);
    this.getList();
  },
  activated () {
    this.getShowList();
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
      if (this.searchform.parentClassifyId.length > 0) {
        this.searchform.classifyId = this.searchform.parentClassifyId[1];
      } else {
        this.searchform.classifyId = null;
      }
      try {
        this.loading = true;
        let result = await assetManage.getstorage(this.searchform);
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
      this.$router.push({ path: '/assetInformation/assetDetail', query: { assetId: row.id } });
    },
    getShowList () {
      const Map = {
        '价值': 'totalPrice',
        '使用年限': 'serviceLife',
        '保管人员': 'custodiansName',
        '保管组织': 'custodiansName',
        '单价': 'unitPrice',
        '单位': 'companyName',
        '型号': 'speciation',
        '备注': 'remark',
        '存放地点': 'storageLocation',
        '年折旧资金': 'yearOldMoney',
        '数量': 'amount',
        '残值率': 'depreciationRate',
        '登记日期': 'dengjiriqi',
        '类别名称': 'classifyName',
        '购置日期': 'buyTime',
        '资产名称': 'assetName',
        '资产编号': 'assetNum'
      };
      fixedField.getListShow().then(res => {
        const data = res.data;
        let temp = this._.cloneDeep(this.initColumns);
        for (const key in data) {
          if (!data[key]) {
            console.log(Map[key]);
            temp = temp.filter(col => { return col.key !== Map[key]; });
          }
        }
        this.columns = this._.cloneDeep(temp);
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
