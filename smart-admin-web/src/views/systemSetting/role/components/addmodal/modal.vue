<template>
  <div>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
          <div slot="header" style="text-align:left;color:#fff;">
              <span>{{ $t('role_view.addrole') }}</span>
          </div>
          <div>
              <Card dis-hover>
                  <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                  <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                  <div>{{$t('BaseData')}}</div>
                  </div>
                  <Divider />
                  <Form ref="form" :model="addformbase" label-position="right" :label-width="100" :rules="ruleValidate">
                      <FormItem :label="$t('role_view.roleName')" prop="rolename">
                          <Input v-model="addformbase.rolename"></Input>
                      </FormItem>
                      <!-- <FormItem :label="$t('BelongParent')" prop="organizeParent">
                        <Input v-model="addformbase.organizeParent" readonly @click.native="select_org = !select_org">
                        <Icon slot="suffix" type="ios-arrow-down" v-if="!isShowTree" />
                        <Icon slot="suffix" type="ios-arrow-up" v-else />
                        </Input>
                      </FormItem> -->
                      <FormItem :label="$t('role_view.description')">
                          <Input v-model="addformbase.description" type="textarea"></Input>
                      </FormItem>
                  </Form>
                  <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                  <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                  <div>{{$t('role_view.AuthorizationList')}}</div>
                  </div>
                  <Divider />
                  <div style="display:flex;height:50vh;overflow-y:scroll;">
                    <!-- <div style="flex:1"> -->
                      <RoleTree ref="mytree" :selected="addformbase"></RoleTree>
                    <!-- </div> -->
                    <!-- <Divider type="vertical"/> -->
                    <!-- <div style="flex:1"></div> -->
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
  </div>
</template>
<script>
import $ from 'jquery';
import { roleApi } from '@/api/role';
import RoleTree from '../role-tree/role-tree';
import DepartmentEmployeeTree from '../department-employee-tree/department-employee-tree';
export default {
  name: 'addModal',
  components: {
    DepartmentEmployeeTree,
    RoleTree
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    copyfile: null
  },
  created () {
    // console.log('moadlStat=======>', this.modalstat);
  },
  data () {
    return {
      // 树状图列表
      authlist: [],
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
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {
        rolename: '',
        description: ''
      },
      ruleValidate: {
        rolename: [
          { required: true, message: 'The rolename cannot be empty', trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      // console.log('moadlStat=======>', this.modalstat);
      if (this.mymoadlStat === true) {
        this.getauthList();
        if (this.copyfile) {
          console.log(this.copyfile);
          // ================================================
          this.addformbase = this.copyfile;
          this.addformbase.rolename = this.copyfile.roleName;
          this.addformbase.description = this.copyfile.description;
        } else {
          this.reset();
        }
      }
    }
  },
  methods: {
    reset () {
      this.addformbase = {
        rolename: '',
        description: ''
      };
      this.$refs.form.resetFields();
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    handsave () {
      this.modal_loading = true;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log(1231231);
          console.log(this.$refs.mytree.checkedData);
          this.addformbase.createPersonId = this.$store.state.user.userId;
          const authority = this.$refs.mytree.checkedData;
          roleApi.addRole(this.addformbase, authority).then(res => {
            this.$Message.success(this.$t('addSuccess'));
            this.modal_loading = false;
            this.$emit('updateStat', false);
            this.getauthList();
            this.reset();
          });
        } else {
          this.$Message.error('Fail!');
          this.modal_loading = false;
        }
      });
    },
    // 获取权限列表
    getauthList () {
      roleApi.getRoleDetail().then(res => {
        // console.log('authlist', res);
      });
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
</style>
