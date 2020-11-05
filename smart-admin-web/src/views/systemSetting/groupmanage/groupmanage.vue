<template>

<div>
    <div style="display:flex">
        <div style="width:40%;height: calc(80vh)">
            <Card class="warp-card" dis-hover>
              <div class="buttom_group">
                <Button type="default" icon="md-refresh" style="margin-left:15px;" @click="refresh">{{ $t('Reflash') }}</Button>
                <Button type="warning" v-privilege="['1-6-1']" icon="md-add" style="margin-left:15px;" @click="AddGroup">{{ $t('Create') }}</Button>
                <Button type="error" v-privilege="['1-6-3']" icon="md-close" style="margin-left:15px;" @click="delGroup">{{ $t('Delete') }}</Button>
              </div>
              <Table border ref="selection_group" max-height="400" highlight-row :columns="groupColumns" :loading="grouploading" :data="group" @on-current-change="show_member" @on-selection-change="getGroup"></Table>
            </Card>
        </div>
        <div style="width:60%;height:calc(80vh)">
            <Card class="warp-card" dis-hover>
              <div class="buttom_group">
                <Button type="warning" v-privilege="['1-6-5']" icon="md-add" style="margin-left:15px;" @click="Addmemeber">{{ $t('Create') }}</Button>
                <Button type="error" v-privilege="['1-6-6']" icon="md-close" style="margin-left:15px;" @click="delMember">{{ $t('Delete') }}</Button>
              </div>
                <Table border ref="selection" :columns="memberColumns" height="400" :data="memberlist" @on-selection-change="getMember"></Table>
            </Card>
            <!-- 新建弹窗 -->
            <addModal :modalstat = "visiable" :groupId = "addgroup_member" :memberId="memberId" @updateStat = "updateStat"></addModal>
            <!-- 新建结束============= -->
            <!-- 修改弹窗 -->
            <editModal :modalstat = "visiable2" :editinfo="editinfo" @updateStat = "updateStat_edit"></editModal>
            <!-- 新建群组弹窗 -->
            <Modal v-model="group_visiable" class="add" width="720" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
                <div slot="header" style="text-align:left;color:#fff;">
                  <span>{{ $t('groupmanage_view.addGroup') }}</span>
                </div>
                <div>
                    <Card dis-hover>
                        <Form ref="form" :model="addgroup" label-position="right" :label-width="100" :rules="groupValidate">
                            <FormItem :label="$t('groupmanage_view.groupName')" prop="groupName">
                                <Input v-model="addgroup.groupName"></Input>
                            </FormItem>
                        </Form>
                    </Card>
                </div>
                <div slot="footer">
                    <ButtonGroup>
                        <Button type="primary" size="large" :loading="modal_loading" @click="handlersaveGroup">{{ $t('Save') }}</Button>
                        <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
                    </ButtonGroup>
                </div>
            </Modal>
        </div>
    </div>
</div>
</template>
<script>
import { groupApi } from '@/api/group';
import { organization } from '@/api/organization';
import addModal from './components/addmodal/modal';
import editModal from './components/editmodal/modal';
export default {
  name: 'groupmanage',
  components: {
    addModal,
    editModal
  },
  data () {
    return {
      group_visiable: false,
      editinfo: {},
      visiable: false,
      visiable2: false,
      pageTotal: 0,
      roleList: [
        {
          value: 1,
          label: '总经理'
        },
        {
          value: 2,
          label: '董事长'
        }
      ],
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
      groupColumns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('groupmanage_view.groupName'),
          key: 'groupName'
        }
      ],
      group: [],
      addgroup: {
        groupName: ''
      },
      memberColumns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('groupmanage_view.memeber'),
          key: 'empName'
        }
      ],
      memberlist: [],
      isShowTree: false,
      member_loading: false,
      grouploading: true,
      groupValidate: {
        groupName: [
          { required: true, message: 'The groupName cannot be empty', trigger: 'blur' }
        ]
      },
      modal_loading: false,
      addgroup_member: '',
      moreGroup: [],
      moreMember: [],
      memberId: []
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {
  },
  mounted () {
    this.getGroupList();
  },
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {},
  methods: {
    getGroup (selection) {
      this.moreGroup = selection;
    },
    getMember (selection) {
      this.moreMember = selection;
    },
    Addmemeber () {
      if (this.addgroup_member !== null && this.addgroup_member !== undefined && this.addgroup_member !== '') {
        this.visiable = true;
      } else {
        this.$Message.warning('请选择需要添加成员的群组');
      }
    },
    // 重置表单
    resetform () {
      this.addgroup = {
        groupName: ''
      };
      this.$refs.form.resetFields();
    },
    show_member (currentRow, oldCurrentRow) {
      console.log(currentRow);
      this.addgroup_member = currentRow.id;
      const mylist = currentRow.empGroupDetailVos.map(item => ({ empName: item.empName, empId: item.empId }));
      this.memberId = currentRow.empGroupDetailVos.map(item => item.empId);
      console.log(mylist);
      this.memberlist = mylist;
    },
    cancel () {
      this.group_visiable = false;
    },
    AddGroup () {
      this.group_visiable = true;
    },
    async updateStat (stat) {
      this.visiable = stat;
      await this.getGroupList();
      // const findList = this.group.find(item => { return item.id === this.addgroup_member; });
      // console.log(findList);
      // const mylist = findList.empGroupDetailVos.map(item => ({ empName: item.empName, empId: item.empId }));
      // console.log('根性的表格==============================>', mylist);
      this.memberlist = [];
    },
    updateStat_edit (stat) {
      this.visiable2 = stat;
    },
    getGroupList () {
      groupApi.getGroup().then(res => {
        console.log('groupresult=>', res);
        this.group = res.data.content;
        this.grouploading = false;
      });
    },
    Edit (row) {
      console.log(row.row);
      this.visiable2 = true;
      this.editinfo = row.row;
    },
    remove () {},
    refresh () {
      this.getGroupList();
    },
    created () {
      this.visiable = true;
    },
    delGroup () {
      if (this.moreGroup.length === 0) {
        this.$Message.error('请选择删除群组');
        return false;
      }
      this.$Modal.confirm({
        title: 'waring',
        content: '<p>是否确认删除</p>',
        onOk: () => {
          for (const i in this.moreGroup) {
            let data = {};
            data.groupId = this.moreGroup[i].id;
            data.operatId = this.$store.state.user.userLoginInfo.userId;
            groupApi.delGroup(data).then(res => {
              if (res.ret === 200) {
                this.$Message.success(res.msg);
                this.memberlist = [];
                this.getGroupList();
              } else {
                this.$Message.error(res.msg);
              }
            });
          }
        },
        onCancel: () => {
          this.$Message.info('cancel');
        }
      });
      console.log(this.moreGroup);
    },
    delMember () {
      let data = {};
      data.groupId = this.addgroup_member;
      data.empIds = this.moreMember.map(item => { return item.empId; });
      data.operatId = this.$store.state.user.userLoginInfo.userId;
      groupApi.delGroupPerson(data).then(res => {
        if (res.ret === 200) {
          this.$Message.success(res.msg);
          this.getGroupList();
          // this.memberlist = [];
          for (let i = 0; i < data.empIds.length; i++) {
            let index = this.memberlist.findIndex(val => val.empId === data.empIds[i]);
            this.memberlist.splice(index, 1);
          }
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    handlersaveGroup () {
      this.modal_loading = true;
      this.addgroup.createId = this.$store.state.user.userLoginInfo.userId;
      groupApi.addGroup(this.addgroup).then(res => {
        if (res.ret === 200) {
          this.$Message.success(res.msg);
          this.group_visiable = false;
          this.modal_loading = false;
          this.resetform();
          this.getGroupList();
        } else {
          this.modal_loading = false;
          this.$Message.error(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .ivu-table-row-highlight td{
  background-color: #ebf0ff!important;
}
.ivu-form-item {
  margin-bottom: 0;
}
.buttom_group {
  margin-bottom: 20px;
}
.add /deep/ .ivu-modal-header {
  background-color: #2d8cf0;
}
</style>
