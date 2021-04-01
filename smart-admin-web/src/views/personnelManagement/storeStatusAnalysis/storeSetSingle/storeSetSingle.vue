<template>

<div>
    <div style="display:flex">
        <div style="width:100%;height:calc(80vh)">
            <Card class="warp-card" dis-hover>
                <Row :gutter="16">
                    <Form :model="searchform" class="tools" inline ref="searchform" :label-width="80" label-position="left">
                      <Col span="5">
                      <FormItem prop="person" :label="$t('zbxmc')" style="width:100%">
                        <Input placeholder="请输入" type="text" v-model="searchform.name" clearable style="width:100%" />
                      </FormItem>
                      </Col>
                      <Col span="4">
                      <FormItem>
                        <ButtonGroup>
                          <Button @click="search" icon="ios-search" type="primary">{{ $t('Search') }}</Button>
                        </ButtonGroup>
                      </FormItem>
                      </Col>
                    </Form>
                </Row>
            </Card>
            <Card class="warp-card" dis-hover>
                <div style="margin-bottom:20px;">
                    <Button style="margin-right:15px;" @click="refresh" icon="md-refresh" type="default">{{ $t('Reflash') }}</Button>
                    <Button style="margin-right:15px;" v-privilege="['59-81-1']" @click="created" icon="md-add" type="warning">{{ $t('Create') }}</Button>
                    <Button style="margin-right:15px;" v-privilege="['59-81-3']" @click="del" icon="md-trash" type="error">{{ $t('Delete') }}</Button>
                </div>
                <Table border ref="selection" :columns="columns4" :data="indicatorlist" max-height="calc(70vh)" @on-selection-change="getmoreaction" @on-row-click="rowClick" :loading="loading" @on-row-dblclick="Edit"></Table>
                <Page :current="searchform.pageNum" :page-size="searchform.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
                :total="pageTotal" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator show-sizer
                show-total style="margin:24px 0;text-align:right;"></Page>
            </Card>
            <!-- 新建弹窗 -->
            <addModal :modalstat = "visiable" @updateStat = "updateStat"></addModal>
            <editModal :modalstat = "visiable_edit" :editinfo="editinfo" @updateStat = "updateStat_edit"></editModal>
            <!-- 新建结束============= -->
        </div>
    </div>
</div>
</template>
<script>
import { roleApi } from '@/api/role';
import { repoTaskItem } from '@/api/repoTaskItem';
import addModal from './components/addmodal/modal';
import editModal from './components/editmodal/modal';
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
          title: this.$t('zbxmc'),
          key: 'itemName'
        },
        {
          title: this.$t('ms'),
          key: 'desc1'
        },
        {
          title: this.$t('action'),
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                directives: [
                  {
                    name: 'privilege',
                    value: ['59-81-2']
                  }
                ],
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.Edit(params.row);
                  }
                }
              }, this.$t('Edit')),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                directives: [
                  {
                    name: 'privilege',
                    value: ['59-81-3']
                  }
                ],
                on: {
                  click: () => {
                    this.delSingle(params.row);
                  }
                }
              }, this.$t('sc'))
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
  created () {
  },
  mounted () {
    this.getindicatorlist();
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
      this.getindicatorlist();
    },
    // 分页
    changePageSize (pageSize) {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getindicatorlist();
    },
    getmoreaction (list) {
      this.moreaction = list;
      console.log('list===>', list);
    },
    updateStat (stat) {
      this.visiable = stat;
      this.getindicatorlist();
    },
    updateStat_edit (stat) {
      this.visiable_edit = stat;
      this.getindicatorlist();
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
    getindicatorlist () {
      this.loading = true;
      repoTaskItem.getTaskItem(this.searchform).then(res => {
        this.loading = false;
        this.indicatorlist = res.data.content.list;
        this.pageTotal = res.data.content.totalCount;
      });
    },
    rowClick (data, index) { // data 该行数据 ，index该行索引
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
      const data = {
        id: row.id,
        operatId: this.$store.state.user.userLoginInfo.userId
      };
      repoTaskItem.delTaskItem(data).then(res => {
        this.$Message.success(this.$t('sccg'));
        this.getindicatorlist();
      });
    },
    newtask (row) {
      this.visiable3 = true;
      this.id = row.id;
    },
    search () {
      this.getindicatorlist();
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
      this.getindicatorlist();
    },
    created () {
      this.visiable = true;
      this.copyfile = null;
    },
    del () {
      console.log('del');
      for (const i in this.moreaction) {
        const id = this.moreaction[i].id;
        let data = id;
        personnelAnalysis.delpostTaskSingleSet(data).then(res => {
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
        }).then(res => {
          this.getindicatorlist();
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
