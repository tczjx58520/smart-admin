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
            <Button
              style="margin-right: 15px"
              v-privilege="['59-77-1']"
              @click="addGong"
              icon="md-add"
              type="warning"
              >{{ $t("Release") }}</Button
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
    <!-- 添加任务 -->
    <addGong :modalstat = "visiable" @updateStat = "updateStat"></addGong>
    <editGong :modalstat = "visiable_edit" :editinfo="editinfo" @updateStat = "updateStat_edit"></editGong>
    <handler-test :modalstat="visiable_test" :editInfo="editinfo" @updateStat="updateStat_test"/>
  </div>
</template>
<script>
import { roleApi } from '@/api/role';
import { personnelAnalysis } from '@/api/personnelAnalysis';
import { positionApi } from '@/api/position';
import addemp from './components/addemp/modal';
import addGong from './components/addmodalGong/modal';
import editGong from './components/editmodalGong/modal';
import { utils } from '@/lib/util';
import HandlerTest from './components/handlerTest.vue';
// import newModal from './components/editmodalGong/modal';
export default {
  name: 'staffPositionAnalysis',
  components: {
    addemp,
    addGong,
    editGong,
    HandlerTest
  },
  data () {
    return {
      visiable_test: false,
      postData: [],
      id: '',
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
          title: this.$t('khrwbt'),
          key: 'title'
        },
        {
          title: this.$t('khr'),
          key: 'testHandleNames'
        },
        {
          title: this.$t('khzbj'),
          key: 'postCollectName'
        },
        {
          title: this.$t('sxrq'),
          key: 'effectiveDate',
          render: (h, params) => {
            let date = '';
            if (params.row.effectiveDate) {
              const temp = new Date(params.row.effectiveDate);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('div', [
              h(
                'span',
                {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }
                },
                params.row.effectiveDate ? date : '无'
              )
            ]);
          }
        },
        {
          title: this.$t('jzrq'),
          key: 'deadDate',
          render: (h, params) => {
            let date = '';
            if (params.row.deadDate) {
              const temp = new Date(params.row.deadDate);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('div', [
              h(
                'span',
                {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }
                },
                params.row.deadDate ? date : '无'
              )
            ]);
          }
        },
        // {
        //   title: this.$t("brkhzt"),
        //   key: "organizeName",
        // },
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
                  directives: [
                    {
                      name: 'privilege',
                      value: ['59-77-47']
                    }
                  ],
                  on: {
                    click: () => {
                      this.haveAcontract(params.row);
                    }
                  }
                },
                this.$t('khzk')
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: params.row.stat !== 3 ? 'inline-block' : 'none'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['59-77-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.EditRow(params.row);
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
                    display: params.row.stat !== 3 ? 'inline-block' : 'none'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['59-77-13']
                    }
                  ],
                  on: {
                    click: () => {
                      this.delSingle(params.row);
                    }
                  }
                },
                this.$t('ljzz')
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
    updateStat_test (stat) {
      this.visiable_test = stat;
    },
    addGong () {
      this.visiable = true;
    },
    haveAcontract (row) {
      this.editinfo = row;
      this.visiable_test = true;
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
      personnelAnalysis.querypostTaskList(this.searchform).then((res) => {
        this.loading = false;
        this.indicatorlist = res.data.content.list;
        this.pageTotal = res.data.content.totalCount;
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
    EditRow (row) {
      this.visiable_edit = true;
      this.editinfo = row;
    },
    delSingle (row) {
      const data = {
        id: row.id,
        operatId: this.$store.state.user.userLoginInfo.userId
      };
      personnelAnalysis.endingTask(data).then(res => {
        console.log(res);
        this.getpersonnelAnalysis();
      });
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
    del () {
      console.log('del');
      for (const i in this.moreaction) {
        const id = this.moreaction[i].id;
        let data = id;
        indicatorSingle
          .delindicatorSingle(data)
          .then((res) => {
            if (res.ret === 200) {
              console.log(res.msg);
              this.$Message['success']({
                background: true,
                content: res.msg
              });
            } else {
              console.log(res.msg);
              this.$Message['error']({
                background: true,
                content: res.msg
              });
            }
          })
          .then((res) => {
            this.getpersonnelAnalysis();
          });
      }
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
