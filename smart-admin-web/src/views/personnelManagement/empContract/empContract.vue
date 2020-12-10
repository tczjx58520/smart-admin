<template>
  <div>
    <Tabs value="name1">
      <TabPane :label="$t('xygdqht')" name="name1">
        <div style="display:flex">
          <div style="width:100%;height:calc(80vh)">
            <Card class="warp-card" dis-hover>
              <Row :gutter="16">
                <Col :span="5">
                  <RadioGroup v-model="searchform.stat" type="button" @on-change="Search">
                    <Radio :label="1">{{ $t("dqs") }}</Radio>
                    <Radio :label="2">{{ $t("qsz") }}</Radio>
                  </RadioGroup>
                </Col>
              </Row>
            </Card>
            <Card class="warp-card" dis-hover>
              <div style="margin-bottom:20px;">
                <Button
                  style="margin-right:15px;"
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
                :loading="loading"
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
                style="margin:24px 0;text-align:right;"
              ></Page>
            </Card>
            <!-- 新建弹窗 -->
            <addModal :modalstat="visiable" @updateStat="updateStat"></addModal>
            <editModal
              :modalstat="visiable_edit"
              :editinfo="editinfo"
              @updateStat="updateStat_edit"
            ></editModal>
            <!-- 新建结束============= -->
          </div>
        </div>
      </TabPane>
      <TabPane :label="$t('yght')" name="name2">
        <div style="display:flex">
          <div style="width:100%;height:calc(80vh)">
            <Card class="warp-card" dis-hover>
              <Row :gutter="16">
                <Col :span="5">
                  <RadioGroup v-model="searchform2.stat" type="button" @on-change="Search2">
                    <Radio :label="0">{{ $t("qb") }}</Radio>
                    <Radio :label="1">{{ $t("zc") }}</Radio>
                    <Radio :label="2">{{ $t("jjdq") }}</Radio>
                  </RadioGroup>
                </Col>
              </Row>
            </Card>
            <Card class="warp-card" dis-hover>
              <div style="margin-bottom:20px;">
                <Button
                  style="margin-right:15px;"
                  @click="refresh2"
                  icon="md-refresh"
                  type="default"
                  >{{ $t("Reflash") }}</Button
                >
              </div>
              <Table
                border
                ref="selection"
                :columns="columns5"
                :data="indicatorlist2"
                max-height="calc(70vh)"
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
                style="margin:24px 0;text-align:right;"
              ></Page>
            </Card>
            <!-- 新建弹窗 -->
            <addModal :modalstat="visiable" @updateStat="updateStat"></addModal>
            <editModal
              :modalstat="visiable_edit"
              :editinfo="editinfo"
              @updateStat="updateStat_edit"
            ></editModal>
            <!-- 新建结束============= -->
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { roleApi } from '@/api/role';
import { empContract } from '@/api/empContract';
import addModal from './components/addmodal/modal';
import editModal from './components/editmodal/modal';
import { utils } from '@/lib/util';
// import newModal from './components/editmodalGong/modal';
export default {
  name: 'indicatorSet',
  components: {
    addModal,
    editModal
  },
  data () {
    return {
      id: '',
      copyfile: null,
      editinfo: {},
      visiable: false,
      visiable_edit: false,
      pageTotal: 0,
      pageTotal2: 0,
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
        pageSize: 10,
        stat: 1
      },
      searchform2: {
        pageNum: 1,
        pageSize: 10,
        stat: 0
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
          title: this.$t('sszz'),
          key: 'organizeName'
        },
        {
          title: this.$t('ssgw'),
          key: 'postName'
        },
        {
          title: this.$t('jhrzsj'),
          key: 'planDate',
          render: (h, params) => {
            if (!params.row.planDate) {
              return h('span', 'N/A');
            }
            const mydate = new Date(params.row.planDate);
            return h('span', utils.getDate(mydate, 'YMDHMS'));
          }
        },
        {
          title: this.$t('sjrz'),
          key: 'actualDate',
          render: (h, params) => {
            if (!params.row.actualDate) {
              return h('span', 'N/A');
            }
            const mydate = new Date(params.row.actualDate);
            return h('span', utils.getDate(mydate, 'YMDHMS'));
          }
        },
        {
          title: this.$t('action'),
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            if (params.row.stat !== 1) {
              return h('span', '');
            } else {
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
                      // this.Edit(params.row);
                        this.$router.push({path: '/processDo/flowStart'})
                      }
                    }
                  },
                  this.$t('qsht')
                )
              ]);
            }
          }
        }
      ],
      columns5: [
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
          title: this.$t('sszz'),
          key: 'organizeName'
        },
        {
          title: this.$t('ssgw'),
          key: 'postName'
        },
        {
          title: this.$t('htkssj'),
          key: 'beginTime',
          render: (h, params) => {
            if (!params.row.beginTime) {
              return h('span', 'N/A');
            }
            const mydate = new Date(params.row.beginTime);
            return h('span', utils.getDate(mydate, 'YMDHMS'));
          }
        },
        {
          title: this.$t('htjssj'),
          key: 'endTime',
          render: (h, params) => {
            if (!params.row.endTime) {
              return h('span', 'N/A');
            }
            const mydate = new Date(params.row.endTime);
            return h('span', utils.getDate(mydate, 'YMDHMS'));
          }
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
                      this.$router.push({path: '/processDo/flowStart'})
                    }
                  }
                },
                this.$t('xqht')
              )
            ]);
          }
        }
      ],
      indicatorlist: [],
      indicatorlist2: [],
      loading: false,
      loading2: false,
      moreaction: ''
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.getempInductionList();
    this.getempInductionList2();
  },
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {},
  methods: {
    // 分页
    changePage (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getempInductionList();
    },
    // 分页
    changePageSize (pageSize) {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getempInductionList();
    },
    // 分页
    changePage2 (pageNum) {
      this.searchform2.pageNum = pageNum;
      this.getempInductionList2();
    },
    // 分页
    changePageSize2 (pageSize) {
      this.searchform2.pageNum = 1;
      this.searchform2.pageSize = pageSize;
      this.getempInductionList2();
    },
    getmoreaction (list) {
      this.moreaction = list;
      console.log('list===>', list);
    },
    updateStat (stat) {
      this.visiable = stat;
      this.getempInductionList();
    },
    updateStat_edit (stat) {
      this.visiable_edit = stat;
      this.getempInductionList();
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
    getempInductionList () {
      this.loading = true;
      empContract.getempContract(this.searchform).then(res => {
        this.loading = false;
        this.pageTotal = res.data.content.totalCount;
        this.indicatorlist = res.data.content.list;
      });
    },
    getempInductionList2 () {
      this.loading2 = true;
      empContract.getempAllContract(this.searchform2).then(res => {
        this.loading2 = false;
        this.pageTotal2 = res.data.content.totalCount;
        this.indicatorlist2 = res.data.content.list;
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
      const itemNameId = row.id;
      indicatorSingle.delindicatorSingle(itemNameId).then(res => {
        this.$Message.success(this.$t('sccg'));
        this.getempInductionList();
      });
    },
    newtask (row) {
      this.visiable3 = true;
      this.id = row.id;
    },
    Search () {
      this.getempInductionList();
    },
    Search2 () {
      this.getempInductionList2();
    },
    remove (row) {
      console.log('发起考核');
    },
    refresh () {
      this.searchform = {
        pageNum: 1,
        pageSize: 10
      };
      this.getempInductionList();
    },
    refresh2 () {
      this.searchform2 = {
        pageNum: 1,
        pageSize: 10
      };
      this.getempInductionList2();
    },
    created() {
      // this.visiable = true;
      // this.copyfile = null;
      this.$router.push({path: '/processDo/flowStart'})
    },
    del () {
      console.log('del');
      for (const i in this.moreaction) {
        const id = this.moreaction[i].id;
        let data = id;
        indicatorSingle
          .delindicatorSingle(data)
          .then(res => {
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
          .then(res => {
            this.getempInductionList();
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
