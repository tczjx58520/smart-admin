<template>

<div>
    <div style="display:flex">
        <div style="width:100%;height:calc(80vh)">
            <Card class="warp-card" dis-hover>
                <Row :gutter="16">
                    <Form :model="searchform" class="tools" inline ref="searchform" :label-width="80" label-position="left">
                      <Col span="5">
                      <FormItem prop="person" :label="$t('ygxm')" style="width:100%">
                        <Input placeholder="请输入" type="text" v-model="searchform.employeeName" clearable style="width:100%" />
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
                    <Button style="margin-right:15px;" v-privilege="['59-64-44']" @click="created" type="warning">{{ $t('gwddsq') }}</Button>
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
import { jobTransfer } from '@/api/jobTransfer';
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
          title: this.$t('sqr'),
          key: 'applyPersonName'
        },
        {
          title: this.$t('yzz'),
          key: 'oldOrganizeName'
        },
        {
          title: this.$t('xzz'),
          key: 'newOrganizeName'
        },
        {
          title: this.$t('ygw'),
          key: 'oldPostName'
        },
        {
          title: this.$t('xgw'),
          key: 'newPostName'
        },
        {
          title: this.$t('sqrq'),
          key: 'applyDate',
          render: (h, params) => {
            const mydate = new Date(params.row.applyDate);
            return h('span', utils.getDate(mydate, 'YMDHMS'));
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
    this.getempInductionList();
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
      jobTransfer.getjobTransfer(this.searchform).then(res => {
        this.loading = false;
        this.pageTotal = res.data.content.totalCount;
        this.indicatorlist = res.data.content.list;
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
      indicatorSingle.delindicatorSingle(itemNameId).then(res => {
        this.$Message.success(this.$t('sccg'));
        this.getempInductionList();
      });
    },
    newtask (row) {
      this.visiable3 = true;
      this.id = row.id;
    },
    search () {
      this.getempInductionList();
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
      this.getempInductionList();
    },
    created () {
      // this.visiable = true;
      // this.copyfile = null;
      this.$router.push({ path: '/processDo/flowStart' });
    },
    del () {
      console.log('del');
      for (const i in this.moreaction) {
        const id = this.moreaction[i].id;
        let data = id;
        indicatorSingle.delindicatorSingle(data).then(res => {
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
