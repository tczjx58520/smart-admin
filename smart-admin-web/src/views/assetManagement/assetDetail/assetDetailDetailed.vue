<template>
  <div>
    <div
      style="
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e1e1e1;
        padding-bottom: 20px;
      "
    >
      <div
        style="
          width: 4px;
          height: 20px;
          background: #2d8cf0;
          margin-right: 15px;
        "
      ></div>
      <div>{{ $t("BaseData") }}</div>
    </div>
    <Divider />
    <Form
      ref="form"
      :model="addformbase"
      label-position="right"
      :label-width="100"
      inline
    >
      <Row>
        <Col span="12">
          <FormItem
            :label="$t('zichanbianhao')"
            style="width: 100%; height: 60px"
          >
            <span>：{{ addformbase.assetNum }}</span>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            :label="$t('zichanmingchen')"
            style="width: 100%; height: 60px"
          >
            <span>：{{ addformbase.assetName }}</span>
          </FormItem>
        </Col>
        <!-- <Col span="12">
          <FormItem :label="$t('zczt')" style="width: 100%; height: 60px">
            <span>：{{ statFilter(addformbase.assetStatus) }}</span>
          </FormItem>
        </Col> -->
      </Row>
    </Form>
    <div
      style="
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e1e1e1;
        padding-bottom: 20px;
      "
    >
      <div
        style="
          width: 4px;
          height: 20px;
          background: #2d8cf0;
          margin-right: 15px;
        "
      ></div>
      <div>{{ $t("zhuagntaibiangengxiangqing") }}</div>
    </div>
    <Tabs value="name1" :animated="false" @on-click="getDetailList2">
      <TabPane :label="$t('jiediaojilu')" name="name1">
        <Table
          ref="multipleTable"
          :columns="columns"
          :data="data"
          :loading="loading"
          max-heigth="200"
        ></Table>
      </TabPane>
      <TabPane :label="$t('biangengjilu')" name="name2">
        <Table
          ref="multipleTable"
          :columns="columns2"
          :data="data2"
          :loading="loading2"
          max-heigth="200"
        ></Table>
      </TabPane>
      <TabPane :label="$t('diushijilu')" name="name3">
        <Table
          ref="multipleTable"
          :columns="columns3"
          :data="data3"
          :loading="loading3"
          max-heigth="200"
        ></Table>
      </TabPane>
      <TabPane :label="$t('weixiujilu')" name="name4">
        <Table
          ref="multipleTable"
          :columns="columns4"
          :data="data4"
          :loading="loading4"
          max-heigth="200"
        ></Table>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { assetDetail } from '@/api/assetDetail';
import { utils } from '@/lib/util';
export default {
  name: 'assetDetailDetailed',
  components: {},
  props: {},
  data () {
    return {
      addformbase: {},
      // table表头
      columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('jiediaobianhao'),
          key: 'lendingNum'
        },
        {
          title: this.$t('jiechushijian'),
          key: 'lendingTime',
          render: (h, params) => {
            let date = 'N/A';
            if (params.row.lendingTime) {
              const temp = new Date(params.row.lendingTime);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('span', date);
          }
        },
        {
          title: this.$t('jiediaoren'),
          key: 'usersName'
        },
        {
          title: this.$t('jiediaorenzuzhi'),
          key: 'useOrganizationName'
        },
        {
          title: this.$t('guihuanshijian'),
          key: 'returnTime',
          render: (h, params) => {
            let date = 'N/A';
            if (params.row.returnTime) {
              const temp = new Date(params.row.returnTime);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('span', date);
          }
        }
      ],
      columns2: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('jiediaobianhao'),
          key: 'lendingNum'
        },
        {
          title: this.$t('chulishijian'),
          key: 'changeTime',
          render: (h, params) => {
            let date = 'N/A';
            if (params.row.changeTime) {
              const temp = new Date(params.row.changeTime);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('span', date);
          }
        },
        {
          title: this.$t('ziduan'),
          key: 'field'
        },
        {
          title: this.$t('yuanzhi'),
          key: 'originalValue'
        },
        {
          title: this.$t('genxinghoudehzi'),
          key: 'presentValue'
        }
      ],
      columns3: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('jiediaobianhao'),
          key: 'lendingNum'
        },
        {
          title: this.$t('diushishijian'),
          key: 'lostTime',
          render: (h, params) => {
            let date = 'N/A';
            if (params.row.lostTime) {
              const temp = new Date(params.row.lostTime);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('span', date);
          }
        },
        {
          title: this.$t('diushiren'),
          key: 'usersName'
        },
        {
          title: this.$t('diushirenzuzhi'),
          key: 'useOrganizationName'
        },
        {
          title: this.$t('shiyongshouming'),
          key: 'serviceLife'
        },
        {
          title: this.$t('shengyushouming'),
          key: 'leftLife'
        }
      ],
      columns4: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('jiediaobianhao'),
          key: 'lendingNum'
        },
        {
          title: this.$t('weixiushijian'),
          key: 'repairTime',
          render: (h, params) => {
            let date = 'N/A';
            if (params.row.repairTime) {
              const temp = new Date(params.row.repairTime);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('span', date);
          }
        },
        {
          title: this.$t('weixiuren'),
          key: 'usersName'
        },
        {
          title: this.$t('weixiurenzuzhi'),
          key: 'useOrganizationName'
        }
      ],
      data: [],
      data2: [],
      data3: [],
      data4: [],
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.getList();
    this.getDetailList();
  },
  methods: {
    statFilter (val) {
      const map = {
        0: this.$t('daiyong'),
        1: this.$t('waijie'),
        2: this.$t('weixiu'),
        3: this.$t('baofei'),
        4: this.$t('diushi')
      };
      return map[val];
    },
    getList () {
      const searchform = {
        pageNum: 1,
        pageSize: 99,
        assetId: this.$route.query.parentId
      };
      assetDetail.getBaseDetail(searchform).then((res) => {
        this.addformbase = Object.assign({}, res.data);
        console.log('this.addformbase========', this.addformbase);
      });
    },
    getDetailList () {
      this.loading = true;
      const form = {
        assetDetailId: this.$route.query.id
      };
      assetDetail.getBorrowDetail(form).then((res) => {
        this.loading = false;
        this.data = res.data.list;
        console.log('res=======', res.data.list);
      });
    },
    getDetailList2 (name) {
      console.log(name);
      if (name === 'name1') {
        this.loading = true;
        const form = {
          assetDetailId: this.$route.query.id
        };
        assetDetail.getBorrowDetail(form).then((res) => {
          this.loading = false;
          this.data = res.data.list;
        });
      } else if (name === 'name2') {
        this.loading2 = true;
        const form = {
          assetDetailId: this.$route.query.id
        };
        assetDetail.getchangeDetail(form).then((res) => {
          this.loading2 = false;
          this.data2 = res.data.list;
        });
      } else if (name === 'name3') {
        this.loading3 = true;
        const form = {
          assetDetailId: this.$route.query.id
        };
        assetDetail.getLoseDetail(form).then((res) => {
          this.loading3 = false;
          this.data3 = res.data.list;
        });
      } else if (name === 'name4') {
        this.loading4 = true;
        const form = {
          assetDetailId: this.$route.query.id
        };
        assetDetail.getRepairDetail(form).then((res) => {
          this.loading4 = false;
          this.data4 = res.data.list;
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item {
  margin-bottom: 0;
}
</style>
