<template>

<div>
    <div style="display:flex">
        <!-- <div style="width:20%;height: calc(80vh)">
            <Card class="warp-card" dis-hover>
                <Tree
                  :data="treedata"
                  style="height: calc(80vh);overflow-x: scroll"
                ></Tree>
            </Card>
        </div> -->
        <div style="width:100%;height:calc(80vh)">
            <!-- <Card class="warp-card" dis-hover>
                <Row :gutter="16">
                    <Form :model="searchform" class="tools" inline ref="searchform" :label-width="65" label-position="left">
                      <Col span="5">
                      <FormItem prop="person" :label="$t('role_view.roleName')" style="width:100%">
                        <Input placeholder="请输入用户名" type="text" v-model="searchform.employeename" style="width:100%" />
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
            </Card> -->
            <Card class="warp-card" dis-hover>
                <ButtonGroup style="margin-bottom:20px;">
                    <Button @click="refresh" icon="md-refresh" type="default">{{ $t('Reflash') }}</Button>
                    <Button v-privilege="['1-3-1']" @click="created" icon="md-add" type="warning">{{ $t('Create') }}</Button>
                    <Button v-privilege="['1-3-3']" @click="del" icon="md-trash" type="error">{{ $t('Delete') }}</Button>
                </ButtonGroup>
                <Table border ref="selection" :columns="columns4" :data="rolelist" max-height="calc(70vh)" @on-selection-change="getmoreaction" @on-row-click="rowClick" :loading="loading" @on-row-dblclick="Edit"></Table>
            </Card>
            <!-- 新建弹窗 -->
            <addModal :modalstat = "visiable" :copyfile="copyfile" @updateStat = "updateStat"></addModal>
            <!-- 新建结束============= -->
            <!-- 修改弹窗 -->
            <editModal :modalstat = "visiable2" :editinfo="editinfo" @updateStat = "updateStat_edit"></editModal>
        </div>
    </div>
</div>
</template>
<script>
import $ from 'jquery';
import { usermanagelApi } from '@/api/usermanage';
import { roleApi } from '@/api/role';
import { organization } from '@/api/organization';
import addModal from './components/addmodal/modal';
import editModal from './components/editmodal/modal';
export default {
  name: 'role',
  components: {
    addModal,
    editModal
  },
  data () {
    return {
      copyfile: null,
      editinfo: {},
      visiable: false,
      visiable2: false,
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
        employeename: '',
        account: '',
        roleId: '',
        stat: '',
        pageNum: 1,
        pageSize: 10,
        loginRepositoryId: this.$store.state.user.userLoginInfo.repositoryId
      },
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('role_view.roleName'),
          key: 'roleName'
        },
        {
          title: this.$t('role_view.description'),
          key: 'description'
        },
        {
          title: this.$t('CreatePerson'),
          key: 'createPersonName'
        },
        {
          title: this.$t('CreateTime'),
          key: 'createTime'
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
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.remove(params);
                  }
                }
              }, this.$t('Copy')),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                directives: [
                  {
                    name: 'privilege',
                    value: ['1-3-2']
                  }
                ],
                on: {
                  click: () => {
                    this.Edit(params.row);
                  }
                }
              }, this.$t('Edit'))
            ]);
          }
        }
      ],
      rolelist: [],
      isShowTree: false,
      loading: true,
      moreaction: ''
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {
  },
  mounted () {
    this.getrolelist();
  },
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {},
  methods: {
    getmoreaction (list) {
      this.moreaction = list;
      console.log('list===>', list);
    },
    updateStat (stat) {
      this.visiable = stat;
      this.getrolelist();
    },
    updateStat_edit (stat) {
      this.visiable2 = stat;
      this.getrolelist();
    },
    getrolelist () {
      roleApi.getAllRole(this.searchform).then(res => {
        console.log('roleresult=>', res.data.content);
        this.loading = false;
        this.rolelist = res.data.content;
      });
    },
    rowClick (data, index) { // data 该行数据 ，index该行索引
    //   this.$refs.selection.toggleSelect(index);// 选中/取消该行（若已选中则是取消，若已取消则是选中）
    },
    Edit (row) {
      if (this.$judge(['1-4-2'])) {
        console.log(row);
        this.visiable2 = true;
        this.editinfo = row;
      } else {
        console.log('need roles');
      }
    },
    search () {
      this.getrolelist();
    },
    remove (row) {
      this.visiable = true;
      this.copyfile = row.row;
    },
    refresh () {
      console.log('refresh');
    },
    created () {
      this.visiable = true;
      this.copyfile = null;
    },
    del () {
      console.log('del');
      for (const i in this.moreaction) {
        const id = this.moreaction[i].id;
        let data = {};
        data.roleid = id;
        data.operatId = this.$store.state.user.userLoginInfo.userId;
        roleApi.deleteRole(data).then(res => {
          if (res.ret === 200) {
            console.log(res.msg);
          } else {
            console.log(res.msg);
            this.$Message['error']({
              background: true,
              content: res.msg
            });
          }
        }).then(res => {
          this.getrolelist();
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
