<template>
  <div>
    <div style="display: flex">
      <div style="width: 100%; height: calc(80vh)">
        <Card class="warp-card" dis-hover>
          <div style="margin-bottom: 20px">
            <Button
              style="margin-right: 15px"
              @click="refresh"
              icon="md-refresh"
              type="default"
              >{{ $t("Reflash") }}</Button
            >
          </div>
          <Table
            border
            ref="selection"
            :columns="columns4"
            :data="indicatorlist"
            max-height="calc(70vh)"
            @on-selection-change="getmoreaction"
            @on-row-click="rowClick"
            :loading="loading"
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
      </div>
    </div>
  </div>
</template>
<script>
import { roleApi } from '@/api/role';
import { personnelAnalysis } from '@/api/personnelAnalysis';
import { positionApi } from '@/api/position';
// import newModal from './components/editmodalGong/modal';
export default {
  name: 'staffPositionAnalysis',
  components: {},
  data () {
    return {
      postData: [],
      id: '',
      copyfile: null,
      editinfo: {},
      visiable: false,
      visiable_edit: false,
      pageTotal: 0,
      statList: [
        {
          value: 1,
          label: '启用'
        },
        {
          value: 2,
          label: '停用'
        }
      ],
      treedata: [],
      formdata: {
        organizeParent: ''
      },
      searchform: {
        pageNum: 1,
        pageSize: 10
      },
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('xm'),
          key: 'empName'
        },
        {
          title: this.$t('ssgw'),
          key: 'postName'
        },
        {
          title: this.$t('ssjb'),
          key: 'levelName'
        },
        // {
        //   title: this.$t('bykhjg'),
        //   key: 'organizeName'
        // },
        // {
        //   title: this.$t('sykhjg'),
        //   key: 'organizeName'
        // },
        {
          title: this.$t('pjz'),
          key: 'avg'
        },
        {
          title: this.$t('jy'),
          key: 'adviceType'
        },
        {
          title: this.$t('action'),
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.haveAcontract(params.row);
                    }
                  }
                },
                this.$t('qr')
              )
            ]);
          }
        }
      ],
      indicatorlist: [],
      loading: false,
      moreaction: ''
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.getlist();
    this.getpersonnelAnalysis();
  },
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {},
  methods: {
    haveAcontract (row) {
      this.$router.push({
        path: '/processDo/flowStart',
        query: { id: row.id }
      });
    },
    getlist () {
      const searchFrom = {
        pageNum: 1,
        pageSize: 9999
      };
      positionApi.postList(searchFrom).then((res) => {
        if (res.ret === 200) {
          this.postData = res.data.content.list;
        } else {
          console.log('列表出错');
        }
      });
    },
    // 分页
    changePage (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getpersonnelAnalysis();
    },
    // 分页
    changePageSize (pageSize) {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getpersonnelAnalysis();
    },
    getmoreaction (list) {
      this.moreaction = list;
      console.log('list===>', list);
    },
    updateStat (stat) {
      this.visiable = stat;
      this.getpersonnelAnalysis();
    },
    updateStat_edit (stat) {
      this.visiable_edit = stat;
      this.getpersonnelAnalysis();
    },
    updateStat_new (stat) {
      this.visiable3 = stat;
    },
    to_conduct (stat) {
      this.visiable3 = stat;
      this.$router.push({
        name: 'conductAnAssessment'
      });
    },
    getpersonnelAnalysis () {
      this.loading = true;
      personnelAnalysis.queryPostAnalysis(this.searchform).then((res) => {
        this.loading = false;
        console.log('获取结果=================', res.ret);
        if (res.ret === 100) {
          this.$Notice.warning({
            title: 'Warning',
            desc: '请创建人员流动规则'
          });
        } else {
          this.indicatorlist = res.data.content.list;
          this.pageTotal = res.data.content.totalCount;
        }
      });
    },
    rowClick (data, index) {
      // data 该行数据 ，index该行索引
      //   this.$refs.selection.toggleSelect(index);// 选中/取消该行（若已选中则是取消，若已取消则是选中）
    },
    Edit (row) {
      console.log(row);
      this.visiable_edit = true;
      this.editinfo = row;
    },
    delSingle (row) {
      console.log(row);
      this.$router.push({ path: '/processDo/flowStart' });
    },
    newtask (row) {
      this.visiable3 = true;
      this.id = row.id;
    },
    search () {
      this.getpersonnelAnalysis();
    },
    remove (row) {
      console.log('发起考核');
    },
    refresh () {
      console.log('refresh');
      this.searchform = {
        pageNum: 1,
        pageSize: 10
      };
      this.getpersonnelAnalysis();
    },
    created () {
      this.$router.push({ path: '/processDo/flowStart' });
    },
    forbid () {
      console.log('forbid');
    },
    open () {
      console.log('open');
    }
  }
};
</script>

<style lang="less" scoped>
.ivu-tree-children {
  cursor: pointer;
  width: 100%;
}
.option-department {
  font-size: 14px;
  padding: 5px;
  cursor: pointer;
}
.option-department:hover {
  background-color: rgba(5, 170, 250, 0.2);
}
.departmentWrap {
  position: absolute;
  background-color: #ffffff;
  padding: 5px;
  border: 1px solid #dedede;
  width: 100%;
  z-index: 9;
  display: none;
  height: 250px;
  overflow-y: scroll;
}
.ivu-form-item {
  margin-bottom: 0;
}
</style>
