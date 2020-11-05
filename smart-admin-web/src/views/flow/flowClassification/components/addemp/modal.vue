<template>
        <Modal v-model="mymoadlStat" class="add" width="1020" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('usermanage_view.adduser') }}</span>
        </div>
        <div>
            <Card dis-hover>
              <div style="display:flex">
                <div style="width: 20%">
                  <Tree
                    ref="mytree"
                    :data="treedata"
                    style="height: 485px;overflow-x: scroll"
                    @on-select-change="filterorg"
                  ></Tree>
                </div>
                <Divider type="vertical" />
                <div style="width: 80%">
                  <Row :gutter="16">
                    <Form :model="searchform" class="tools" inline ref="searchform" :label-width="60" label-position="left">
                      <Col span="5">
                      <FormItem prop="person" :label="$t('usermanage_view.userName')" style="width:100%">
                        <Input placeholder="请输入用户名" type="text" v-model="searchform.employeename" style="width:100%" />
                      </FormItem>
                      </Col>
                      <Col span="5">
                      <FormItem prop="startDate" :label="$t('usermanage_view.account')" style="width:100%">
                        <Input placeholder="请输入登录帐号" type="text" v-model="searchform.account" style="width:100%" />
                      </FormItem>
                      </Col>
                      <Col span="5">
                      <FormItem prop="origin" :label="$t('usermanage_view.role')" style="width:100%">
                        <Select v-model="searchform.roleOa" style="width:100%">
                          <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.roleName }}</Option>
                        </Select>
                      </FormItem>
                      </Col>
                      <Col span="5">
                      <FormItem prop="type" :label="$t('usermanage_view.stat')" style="width:100%;margin-right:15px;">
                        <Select v-model="searchform.stat" style="width:100%">
                          <Option v-for="item in statList" :value="item.value" v-bind:key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                      </Col>
                      <Col span="4">
                          <Button @click="search" icon="ios-search" type="primary">{{ $t('Search') }}</Button>
                          <!-- <Button @click="reset" icon="md-refresh" type="default">重置</Button> -->
                      </Col>
                    </Form>
                  </Row>
                  <Table border ref="selection" :columns="columns4" :data="emplist" max-height="400" :loading="emp_loading" @on-selection-change="selectService"></Table>
                  <Page :current="searchform.pageNum" :page-size="searchform.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
                  :total="pageTotal" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator show-sizer
                  show-total style="margin:24px 0;text-align:right;"></Page>
                </div>
              </div>
            </Card>

        </div>
        <div slot="footer">
            <ButtonGroup>
                <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button>
                <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
            </ButtonGroup>
        </div>
    </Modal>
</template>
<script>
import { usermanagelApi } from '@/api/usermanage';
import { organization } from '@/api/organization';
import { groupApi } from '@/api/group';
export default {
  name: 'addemp',
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    groupId: null,
    memberId: {
      type: null,
      default: null
    }
  },
  created () {
    this.getemplist();
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password'));
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck');
        }
        callback();
      }
    };
    return {
      statList: [
        {
          label: this.$t('usermanage_view.working'),
          value: 1
        },
        {
          label: this.$t('usermanage_view.Quit'),
          value: 2
        }
      ],
      // 保存按钮加载状态
      modal_loading: false,
      mymoadlStat: this.modalstat,
      treedata: [],
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
          key: 'roleName',
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
        }
      ],
      emplist: [],
      emp_loading: true,
      // 人员搜查id
      searchform: {
        employeename: '',
        account: '',
        roleId: '',
        stat: '',
        pageNum: 1,
        pageSize: 10,
        loginRepositoryId: this.$store.state.user.userLoginInfo.repositoryId
      },
      pageTotal: 0,
      // 角色列表
      roleList: [],
      curPageSelected: [], // 存放当前页选中项
      formValidate: {},
      curPageSelectedName: [] // 存放当前页名字
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.memberId) {
        console.log('this.memberId=====', this.memberId);
        this.formValidate.serviceIdList = this.memberId.split(',').map(Number);
      } else {
        this.formValidate.serviceIdList = [];
      }
      console.log('父传子====================>', this.formValidate.serviceIdList);
      this.reset();
      this.getemplist();
      this.getroleList();
    }
  },
  computed: {
    curPageAllIds () { // 存放当前页所有数据
      return this.emplist.map((item) => item.id);
    },
    curPageAllNames () {
      return this.emplist.map((item) => item.personName);
    }
  },
  mounted () {
    this.getorganizationtreedata();
  },
  methods: {
    async getroleList () {
      await usermanagelApi.getroleList().then(res => {
        this.roleList = res.data.content;
      });
    },
    reset () {
      this.searchform = {
        employeename: '',
        account: '',
        roleId: '',
        stat: '',
        pageNum: 1,
        pageSize: 10,
        loginRepositoryId: this.$store.state.user.userLoginInfo.repositoryId
      };
      this.$refs.searchform.resetFields();
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    handsave () {
      this.modal_loading = true;
      let data = {};
      try {
        data.empIds = this.formValidate.serviceIdList.join(',');
        data.names = this.formValidate.serviceIdNameList.join(',');
        setTimeout(() => {
          this.modal_loading = false;
          this.$emit('updateStat', false, data);
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          this.modal_loading = false;
          this.$emit('updateStat', false, data);
        }, 1000);
      }
    },
    // 获取组织架构
    async getorganizationtreedata () {
      const result = await organization.organizationlist().then(res => {
        return res;
      });
      const map = {
        title: 'organizeName',
        parentId: 'parentId',
        children: 'children',
        level: 'level',
        id: 'id'
      };
      this.treedata = this.convertTree(result.data.content, map);
    },
    /**
     * tree 数据转换
     * @param  {Array} tree 待转换的 tree
     * @param  {Object} map  键值对映射
     * @return {Array}      转换后的 tree
     */
    convertTree (tree, map) {
      const result = [];
      // 遍历 tree
      tree.forEach((item) => {
        // 读取 map 的键值映射
        const title = item[ map.title ];
        const parentId = item[ map.parentId ];
        const expand = true;
        const level = item[ map.level ];
        const id = item[ map.id ];
        let children = item[ map.children ];
        // 如果有子节点，递归
        if (children) {
          children = this.convertTree(children, map);
        }

        result.push({
          title,
          expand,
          parentId,
          children,
          level,
          id
        });
      });

      return result;
    },
    // ===========================>组织架构结束<==========================================
    // 获取员工列表
    getemplist () {
      this.emp_loading = true;
      usermanagelApi.queryList(this.searchform).then(res => {
        this.pageTotal = res.data.content.totalCount;
        this.emp_loading = false;
        this.emplist = this.selectFromId(res.data.content.list, this.formValidate.serviceIdList);
      });
    },
    // 分页函数
    changePage (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getemplist();
    },
    changePageSize (pageSize) {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getemplist();
    },
    // 搜索函数
    search () {
      this.getemplist();
    },
    filterorg (a, b) {
      console.log('b=================>', b);
      this.searchform.organizationOa = b.id;
      this.getemplist();
    },
    // 保存分页选中
    selectService (selection) {
      this.curPageSelected = selection.map((item) => item.id);
      // otherPageIds其他页面选中项 为所有选中项减去当前页所有数据
      let otherPageIds = this._.without(this.formValidate.serviceIdList, ...this.curPageAllIds);
      // 最终选择项为
      this.formValidate.serviceIdList = this._.union(otherPageIds, this.curPageSelected);
      this.curPageSelectedName = selection.map((item) => item.personName);
      let otherPageName = this._.without(this.formValidate.serviceIdNameList, ...this.curPageAllNames);
      this.formValidate.serviceIdNameList = this._.union(otherPageName, this.curPageSelectedName);
    },
    // 根据id选中
    selectFromId (showList, selectList) {
      let that = this;
      if (selectList) {
        for (const i in showList) {
          if (selectList.includes(showList[i].id)) {
            showList[i]._checked = true;
            // this.$set(this.showList[i], '_checked', true);
          } else {
            showList[i]._checked = false;
            // this.$set(this.showList[i], '_checked', false);
          }
        }
      }
      return showList;
    }
  }
};
</script>
<style lang="less" scoped>
     .add /deep/ .ivu-modal-header {
        background-color: #2d8cf0;
    }
    .add /deep/ .ivu-modal-content {
        background-color: #eee;
    }
    .add /deep/ .ivu-modal-footer {
        border: none;
    }
</style>
