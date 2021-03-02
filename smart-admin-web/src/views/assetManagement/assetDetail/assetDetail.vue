<template>
  <div>
    <Card class="warp-card" dis-hover>
      <Row :gutter="16">
        <Form
          :model="searchform"
          class="tools"
          inline
          ref="searchform"
          :label-width="120"
          label-position="left"
        >
          <Col span="5">
            <FormItem prop="person" :label="$t('zichanmingxibianhao')" style="width: 100%">
              <Input
                placeholder="请输入"
                type="text"
                v-model="searchform.assetDetailNum"
                style="width: 100%"
              />
            </FormItem>
          </Col>
          <Col span="5">
          <FormItem :label="$t('zichanzhaungtai')" style="width: 100%">
            <Select v-model="searchform.assetStatus" clearable>
              <Option :value="0" >{{ $t('daiyong') }}</Option>
              <Option :value="1" >{{ $t('waijie') }}</Option>
              <Option :value="2" >{{ $t('weixiu') }}</Option>
              <Option :value="3" >{{ $t('baofei') }}</Option>
              <Option :value="4" >{{ $t('diushi') }}</Option>
            </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem>
              <ButtonGroup>
                <Button @click="search" icon="ios-search" type="primary">{{ $t("Search") }}</Button>
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
        <!-- <Button
          v-privilege="['10-16-1']"
          style="margin-right: 15px"
          @click="created"
          icon="md-add"
          type="warning"
          >{{ $t("Create") }}</Button
        > -->
      </div>
      <Table
        ref="multipleTable"
        :columns="columns"
        :data="data"
        :loading="loading"
        :max-heigth="tableHeight"
        @on-selection-change="selectwelfare"
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
    <addModal :modalstat="visiable" :flag="flag" :hadlerInfo="hadlerInfo" @updateStat="updateStat"></addModal>
    <changemodal :modalstat="visiable_edit" :hadlerInfo="hadlerInfo" @updateStat="updateStat_edit"></changemodal>
  </div>
</template>

<script>

import { assetDetail } from '@/api/assetDetail';
import { classification } from '@/api/classification';
import { assetManage } from '@/api/assetManage';
import addModal from './components/addmodal/modal';
import changemodal from './components/changemodal/modal';
export default {
  name: 'assetDetail',
  components: {
    addModal,
    changemodal
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
        assetId: this.$route.query.assetId
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
          title: this.$t('zichanmingxibianhao'),
          key: 'assetDetailNum'
        },
        {
          title: this.$t('zichanmingchen'),
          key: 'assetName'
        },
        {
          title: this.$t('gouzhiriqi'),
          key: 'purchaseTime'
        },
        {
          title: this.$t('canzhilv'),
          key: 'depreciationRate'
        },
        {
          title: this.$t('leijizhejiujine'),
          key: 'totalDepreciationAmount'
        },
        {
          title: this.$t('zt'),
          key: 'assetStatus',
          render: (h, params) => {
            const map = {
              0: this.$t('daiyong'),
              1: this.$t('waijie'),
              2: this.$t('weixiu'),
              3: this.$t('baofei'),
              4: this.$t('diushi')
            };
            return h('span', map[params.row.assetStatus]);
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
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.assetStatus === 1 || params.row.assetStatus === 2 ? 'inline-block' : 'none'
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
                this.$t('change')
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
                    display: params.row.assetStatus === 1 || params.row.assetStatus === 2 ? 'inline-block' : 'none'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-16-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.Copy(params.row, 1);
                    }
                  }
                },
                this.$t('diushi')
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
                    display: params.row.assetStatus === 0 ? 'inline-block' : 'none'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-16-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.Copy(params.row, 2);
                    }
                  }
                },
                this.$t('weixiu')
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
                    display: params.row.assetStatus === 1 || params.row.assetStatus === 2 ? 'inline-block' : 'none'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-16-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.Copy(params.row, 3);
                    }
                  }
                },
                this.$t('guihuan')
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
                    display: params.row.assetStatus === 0 ? 'inline-block' : 'none'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-16-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.Copy(params.row, 4);
                    }
                  }
                },
                this.$t('waijie')
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
                    display: params.row.assetStatus === 0 ? 'inline-block' : 'none'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-16-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.Copy(params.row, 5);
                    }
                  }
                },
                this.$t('baofei')
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
                      this.viewDetail(params.row);
                    }
                  }
                },
                this.$t('View')
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
      data_class: [],
      flag: null,
      hadlerInfo: null
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
    Copy (row, handleStat) {
      this.flag = handleStat;
      this.hadlerInfo = row;
      this.visiable = true;
    },
    viewDetail (row) {
      this.$router.push({ path: '/assetInformation/assetDetailDetailed', query: { id: row.id, parentId: this.$route.query.assetId } });
    },
    Edit (row) {
      if (this.$judge(['1-4-2'])) {
        this.hadlerInfo = row;
        this.visiable_edit = true;
      } else {
        console.log('needroles');
      }
    },
    selectwelfare (selection) {
      this.moreWelfare = selection;
    },
    clear () {
      // console.log('this.moreWelfare', this.moreWelfare);
      // for (const i in this.moreWelfare) {
      //   let data = {};
      //   data.id = this.moreWelfare[i].id;
      //   data.operatId = this.$store.state.user.userLoginInfo.userId;
      //   salesroom.delGroup(data).then((res) => {
      //     if (res.ret === 200) {
      //       this.$Message.success(res.msg);
      //       this.reset();
      //     } else {
      //       this.$Message.error(res.msg);
      //     }
      //   });
      // }
    },
    // 查询用户登录日志
    async getwelfareList () {
      try {
        this.loading = true;
        let result = await assetDetail.getstorage(this.searchform);
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
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item {
  margin-bottom: 0;
}
</style>
