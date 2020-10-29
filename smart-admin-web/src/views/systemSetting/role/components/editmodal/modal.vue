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
                      <RoleTree ref="mytree" :selected="editForm"></RoleTree>
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
import { roleApi } from '@/api/role';
import RoleTree from '../role-tree/role-tree';
export default {
  name: 'editModal',
  components: {
    RoleTree
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: {
      type: Object,
      default: null
    }
  },
  created () {
    console.log('moadlStat=======>', this.modalstat);
  },
  data () {
    return {
      modal_loading: false,
      mymoadlStat: this.modalstat,
      editForm: this.editinfo,
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
      console.log('moadlStat=======>', this.modalstat, this.editinfo);
      this.addformbase.rolename = this.editinfo.roleName;
      this.addformbase.description = this.editinfo.description;
      this.addformbase.roleid = this.editinfo.id;
      this.editForm = this.editinfo;
    }
  },
  methods: {
    cancel () {
      this.$emit('updateStat', false);
    },
    handsave () {
      const authority = this.$refs.mytree.checkedData;
      this.addformbase.operatId = this.$store.state.user.userId;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          roleApi.updateRole(this.addformbase, authority).then(res => {
            if (res.ret === 200) {
              this.$Message.success(this.$t('editSuccess'));
              this.modal_loading = false;
              this.$emit('updateStat', false);
            }
          });
        } else {
          this.$Message.error('Fail!');
        }
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
</style>
