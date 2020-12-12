<template>

  <div>
    <div style="display:flex">
      <div style="width:20%;height: calc(80vh)">
        <Card class="warp-card"
              dis-hover>
          <Tree :data="treedata"
                style="height: calc(80vh);overflow-x: scroll"
                @on-select-change="filterorg"></Tree>
        </Card>
      </div>
      <div style="width:80%;height:calc(80vh)">
        <Card class="warp-card"
              dis-hover>
          <Row :gutter="16">
            <Form :model="searchform"
                  class="tools"
                  inline
                  ref="searchform"
                  :label-width="65"
                  label-position="left">
              <Col span="5">
              <FormItem prop="person"
                        :label="$t('usermanage_view.userName')"
                        style="width:100%">
                <Input placeholder="请输入用户名"
                       type="text"
                       v-model="searchform.employeename"
                       style="width:100%" />
              </FormItem>
              </Col>
              <Col span="5">
              <FormItem prop="startDate"
                        :label="$t('usermanage_view.account')"
                        style="width:100%">
                <Input placeholder="请输入登录帐号"
                       type="text"
                       v-model="searchform.account"
                       style="width:100%" />
              </FormItem>
              </Col>
              <Col span="4">
              <FormItem prop="origin"
                        :label="$t('usermanage_view.position')"
                        style="width:100%">
                <Select v-model="searchform.postOa"
                        style="width:100%"
                        clearable>
                  <Option v-for="item in postList"
                          :value="item.id"
                          :key="item.id">{{ item.postName }}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="4">
              <FormItem prop="type"
                        :label="$t('usermanage_view.stat')"
                        style="width:100%;margin-right:15px;">
                <Select v-model="searchform.stat"
                        style="width:100%">
                  <Option v-for="item in statList"
                          :value="item.value"
                          v-bind:key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="4">
              <FormItem>
                <ButtonGroup>
                  <Button @click="search"
                          icon="ios-search"
                          type="primary">{{ $t('Search') }}</Button>
                  <!-- <Button @click="reset" icon="md-refresh" type="default">重置</Button> -->
                </ButtonGroup>
              </FormItem>
              </Col>
            </Form>
          </Row>
        </Card>
        <Card class="warp-card"
              dis-hover>
          <div style="margin-bottom:20px;">
            <Button @click="refresh"
                    icon="md-refresh"
                    type="default"
                    style="margin-right:15px;">{{ $t('Reflash') }}</Button>
            <!-- <Button @click="created" v-privilege="['1-7-1']" icon="md-add" type="warning" style="margin-right:15px;">{{ $t('Create') }}</Button>
                    <Button @click="del" v-privilege="['1-7-3']" icon="md-trash" type="error" style="margin-right:15px;">{{ $t('Delete') }}</Button> -->
            <Button @click="forbid"
                    icon="md-close"
                    type="error"
                    style="margin-right:15px;">{{ $t('Forbid') }}</Button>
            <Button @click="open"
                    icon="md-checkmark"
                    type="primary"
                    style="margin-right:15px;">{{ $t('Open') }}</Button>
            <Button @click="viewlist"
                    icon="md-list-box"
                    type="primary">{{ $t('usermanage_view.PermissionList') }}</Button>
          </div>
          <Table border
                 ref="selection"
                 :columns="columns4"
                 :data="emplist"
                 max-height="400"
                 @on-row-click="rowClick"
                 :loading="loading"
                 @on-select="selectemp"
                 @on-row-dblclick="Edit"></Table>
          <Page :current="searchform.pageNum"
                :page-size="searchform.pageSize"
                :page-size-opts="[10, 20, 30, 50, 100]"
                :total="pageTotal"
                @on-change="changePage"
                @on-page-size-change="changePageSize"
                show-elevator
                show-sizer
                show-total
                style="margin:24px 0;text-align:right;"></Page>
        </Card>
        <!-- 新建弹窗 -->
        <addModal :modalstat="visiable"
                  :copyfile="copyfile"
                  @updateStat="updateStat"></addModal>
        <!-- 新建结束============= -->
        <!-- 修改弹窗 -->
        <editModal :modalstat="visiable2"
                   :editinfo="editinfo"
                   @updateStat="updateStat_edit"></editModal>
        <viewroleList :modalstat="visiable3"
                      :editinfo="editinfo"
                      @updateStat="updateStat_view"></viewroleList>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import { usermanagelApi } from '@/api/usermanage';
import { organization } from '@/api/organization';
import { roleApi } from '@/api/role';
import { positionApi } from '@/api/position';
import addModal from './components/addmodal/modal';
import editModal from './components/editmodal/modal';
import DepartmentEmployeeTree from './components/department-employee-tree/department-employee-tree';
import viewroleList from './components/viewroleList/modal';
export default {
  name: 'usermanage',
  components: {
    DepartmentEmployeeTree,
    addModal,
    editModal,
    viewroleList
  },
  data () {
    return {
      editinfo: {},
      visiable: false,
      visiable2: false,
      visiable3: false,
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
          title: this.$t('usermanage_view.userName'),
          key: 'personName',
          width: '100'
        },
        {
          title: this.$t('usermanage_view.account'),
          key: 'account',
          width: '100'
        },
        {
          title: this.$t('usermanage_view.role'),
          key: 'rolesOaName',
          width: '100'
        },
        {
          title: this.$t('usermanage_view.Organization'),
          key: 'organizationOaName'
        },
        {
          title: this.$t('usermanage_view.position'),
          key: 'postOaName'
        },
        {
          title: this.$t('usermanage_view.stat'),
          key: 'stat',
          width: '100',
          render: (h, params) => {
            if (params.row.stat === 1) {
              return h('span', this.$t('Open'));
            } else {
              return h('span', this.$t('Forbid'));
            }
          }
        },
        {
          title: this.$t('usermanage_view.action'),
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            if (params.row.stat === 2) {
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
                      this.show(params);
                    }
                  }
                }, this.$t('Open')),
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
                      value: ['1-7-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.Edit(params.row);
                    }
                  }
                }, this.$t('Edit'))
              ]);
            } else {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.Forbid(params);
                    }
                  }
                }, this.$t('Forbid')),
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
                      value: ['1-7-2']
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
        }
      ],
      emplist: [],
      isShowTree: false,
      loading: true,
      roleNames: [],
      moreemp: [],
      postList: [],
      copyfile: null
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {
  },
  mounted () {
    this.getemplist();
    this.getorganizationtreedata();
    // this.getBaseRole();
    this.getBasePost();
  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { },
  methods: {
    getBasePost () {
      let From = {};
      From.pageNum = 1;
      From.pageSize = 9999;
      positionApi.postList(From).then(res => {
        if (res.ret === 200) {
          this.postList = res.data.content.list;
        } else {
          console.log('列表出错');
        }
      });
    },
    filterorg (a, b) {
      console.log('b=================>', b);
      this.searchform.organizationOa = b.id;
      this.getemplist();
    },
    selectemp (selection) {
      this.moreemp = selection;
      console.log(this.moreemp.length);
    },
    async getBaseRole () {
      const myrole = this.$store.state.user.privilegeMenuKeyList;
      const rolesfilter = myrole.filter(function (elem) {
        return (elem.indexOf('1-7') !== -1);
      });
      const needRolesId = rolesfilter.map(function (item) {
        return (item.replace('1-7-', ''));
      });
      const list = await Promise.all(needRolesId.map(function (item) {
        return roleApi.getDetailById(item).then(res => {
          console.log(res.ret === 200 && res.data.content.length !== 0 && res.data.content[0] !== undefined);
          if (res.ret === 200 && res.data.content.length !== 0 && res.data.content[0] !== undefined) {
            console.log('res===================>', res);
            return res.data.content[0];
          }
        });
      }));
      console.log('list===>', list);
      const listRoleName = list.filter(function (ele) {
        if (ele !== undefined) {
          return (ele.name.indexOf('-') !== -1);
        }
      });
      console.log(listRoleName);
      const sss2 = listRoleName.map(function (item) {
        return item.name;
      });
      const sss3 = sss2.map(function (item) {
        return {
          id: item.split('-')[0],
          name: item.split('-')[1]
        };
      });
      this.roleNames = sss3;
      console.log('this.roleNames=======>', this.roleNames);
    },
    updateStat (stat) {
      this.visiable = stat;
      this.getemplist();
    },
    updateStat_edit (stat) {
      this.visiable2 = stat;
      this.getemplist();
    },
    updateStat_view (stat) {
      this.visiable3 = stat;
    },
    getemplist () {
      usermanagelApi.queryList(this.searchform).then(res => {
        console.log('empresult=>', res.data.content.list);
        this.pageTotal = res.data.content.totalCount;
        this.loading = false;
        // console.table(res.data.content.list);
        this.emplist = res.data.content.list;
        // console.table(this.emplist);
      });
      //   this.$set(this.emplist, empresult.data.content.list);
    },
    rowClick (data, index) { // data 该行数据 ，index该行索引
      //   this.$refs.selection.toggleSelect(index);// 选中/取消该行（若已选中则是取消，若已取消则是选中）
    },
    Edit (row) {
      if (this.$judge(['1-7-2'])) {
        console.log(row);
        this.visiable2 = true;
        this.editinfo = row;
      } else {
        console.log('need roles');
      }
    },
    search () {
      this.getemplist();
    },
    show (row) {
      console.log(row.row.id);
      let data = {};
      data.empids = row.row.id;
      data.stat = 1;
      usermanagelApi.isWork(data).then(res => {
        if (res.ret === 200) {
          this.$Message.info('启用成功');
          this.getemplist();
        }
      });
    },
    Forbid (row) {
      console.log(row.row.id);
      let data = {};
      data.empids = row.row.id;
      data.stat = 2;
      usermanagelApi.isWork(data).then(res => {
        if (res.ret === 200) {
          this.$Message.info('停用成功');
          this.getemplist();
        }
      });
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
      usermanagelApi.delete().then(res => {
      });
      for (const i in this.moreemp) {
        let data = {};
        data.empids = this.moreemp[i].id;
        usermanagelApi.delete(data).then(res => {
          if (res.ret === 200) {
            this.$Message.info('删除成功');
            this.getemplist();
          } else {
            this.$Message.info(res.msg);
          }
        });
      }
    },
    forbid () {
      console.log('forbid');
      for (const i in this.moreemp) {
        let data = {};
        data.empids = this.moreemp[i].id;
        data.stat = 2;
        usermanagelApi.isWork(data).then(res => {
          if (res.ret === 200) {
            this.$Message.info('停用成功');
            this.getemplist();
          } else {
            this.$Message.info(res.msg);
          }
        });
      }
    },
    open () {
      console.log('open');
      for (const i in this.moreemp) {
        let data = {};
        data.empids = this.moreemp[i].id;
        data.stat = 1;
        usermanagelApi.isWork(data).then(res => {
          if (res.ret === 200) {
            this.$Message.info('启用成功');
            this.getemplist();
          } else {
            this.$Message.info(res.msg);
          }
        });
      }
    },
    viewlist () {
      console.log(this.moreemp);
      if (this.moreemp.length > 1) {
        this.$Message.error('请选择一个角色');
        return false;
      }
      this.editinfo = this.moreemp[0];
      this.visiable3 = true;
    },
    // 分页函数
    changePage (pageNum) {
      console.log(pageNum);
      this.searchform.pageNum = pageNum;
      this.getemplist();
    },
    changePageSize (pageSize) {
      //   this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getemplist();
    },
    // 选择部门点击外部关闭
    clickOutside () {
      if (this.isShowTree) {
        this.isShowTree = false;
      }
    },
    // 选择部门或者成员
    selectDepartmentOrEmployee (department) {
      console.log('department', department);
      this.formdata.organizeParent = department.name;
      // this.$set(this.formdata, 'organizeParent', department.id);
      // this.$set(this.formdata, 'organizeParent', department.name);
      this.isShowTree = false;
      $('.department-wrap').hide();
    },
    handleSave () {

    },
    deletetree () {

    },
    //     /**
    //  * tree 数据转换
    //  * @param  {Array} tree 待转换的 tree
    //  * @param  {Object} map  键值对映射
    //  * @return {Array}      转换后的 tree
    //  */
    convertTree (tree, map) {
      const result = [];

      // 遍历 tree
      tree.forEach((item) => {
        // 读取 map 的键值映射
        const title = item[map.title];
        const parentId = item[map.parentId];
        const expand = true;
        let children = item[map.children];
        const id = item[map.id];
        // 如果有子节点，递归
        if (children) {
          children = this.convertTree(children, map);
        }

        result.push({
          title,
          expand,
          parentId,
          children,
          id
        });
      });

      return result;
    },
    // 组织架构树数据
    async getorganizationtreedata () {
      const result = await organization.organizationlist().then(res => {
        return res;
      });
      console.log('result', result);
      const map = {
        title: 'organizeName',
        parentId: 'parentId',
        children: 'children',
        id: 'id'
      };
      this.treedata = this.convertTree(result.data.content, map);
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
