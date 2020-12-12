<template>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('usermanage_view.adduser') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('BaseData')}}</div>
                </div>
                <Divider />
                <Form ref="form" :model="addformbase" label-position="right" :label-width="100" :rules="ruleValidate">
                    <FormItem :label="$t('usermanage_view.firstname')" prop="firstname">
                        <Input v-model="addformbase.firstname"></Input>
                    </FormItem>
                    <FormItem :label="$t('usermanage_view.middlename')">
                        <Input v-model="addformbase.middlename"></Input>
                    </FormItem>
                    <FormItem :label="$t('usermanage_view.lastname')" prop="lastname">
                        <Input v-model="addformbase.lastname"></Input>
                    </FormItem>
                    <FormItem :label="$t('usermanage_view.phone')" prop="phone">
                        <Input v-model="addformbase.phone"></Input>
                    </FormItem>
                    <FormItem :label="$t('usermanage_view.mail')" prop="mail">
                        <Input v-model="addformbase.mail"></Input>
                    </FormItem>
                    <FormItem :label="$t('usermanage_view.post')" prop="postOa">
                        <!-- <Input v-model="addformbase.postOa"></Input> -->
                        <Select v-model="addformbase.postOa" style="width:100%">
                          <Option v-for="item in postList" :value="item.id" v-bind:key="item.id">{{ item.postName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('usermanage_view.organization')" prop="organizationOa">
                        <Input v-model="addformbase.organizationOaName" readonly @click.native="isShowTree = !isShowTree" style="width: 100%">
                        <Icon slot="suffix" type="ios-arrow-down" v-if="!isShowTree" />
                              <Icon slot="suffix" type="ios-arrow-up" v-else />
                            </Input>
                            <div class="department-wrap" v-if="isShowTree">
                              <DepartmentEmployeeTree
                                :isDepartment="true"
                                @on-select="selectDepartmentOrEmployee"
                                ref="departmentEmployeeTree"
                              ></DepartmentEmployeeTree>
                            </div>
                    </FormItem>
                    <FormItem :label="$t('usermanage_view.belongRole')" prop="roleOa">
                        <!-- <Input v-model="addformbase.roleOa"></Input> -->
                        <Select v-model="addformbase.roleOa" style="width:100%">
                          <Option v-for="item in roleNames" :value="item.id" v-bind:key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('usermanage_view.workstat')" prop="stat">
                        <Select v-model="addformbase.stat" style="width:100%">
                          <Option v-for="item in statList" :value="item.value" v-bind:key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Form>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('usermanage_view.logininfo')}}</div>
                </div>
                <Divider />
                <Form ref="form2" :model="addformaccount" label-position="right" :label-width="100" :rules="ruleValidate2">
                    <FormItem :label="$t('usermanage_view.logininfo')" prop="account">
                        <Input v-model="addformaccount.account"></Input>
                    </FormItem>
                    <FormItem :label="$t('usermanage_view.loginpsd')" prop="passwd">
                        <Input v-model="addformaccount.passwd"></Input>
                    </FormItem>
                </Form>
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
import $ from 'jquery';
import { usermanagelApi } from '@/api/usermanage';
import { positionApi } from '@/api/position';
import { roleApi } from '@/api/role';
import DepartmentEmployeeTree from '../department-employee-tree/department-employee-tree';
export default {
  name: 'addModal',
  components: {
    DepartmentEmployeeTree
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    copyfile: null
  },
  created () {

  },
  mounted () {
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (this.addformbase.organizationOaName === '' && this.addformbase.organizationOaName === null && this.addformbase.organizationOaName === undefined) {
        callback(new Error('Please enter your organization'));
      } else {
        callback();
      }
    };
    const validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    const validatePass4 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    const validatePass5 = (rule, value, callback) => {
      if (this.addformbase.email === '') {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    const checkphone = (rule, value, callback) => {
      if (!this.addformbase.phone) {
        return callback(new Error('please enter'));
      }
      setTimeout(() => {
        if (String(this.addformbase.phone).length !== 11) {
          callback(new Error('please enter Correct phone'));
        } else {
          callback();
        }
      }, 100);
    };
    return {
      isShowTree: false,
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
        firstname: '',
        middlename: '',
        lastname: '',
        postOa: '',
        organizationOa: '',
        roleOa: '',
        stat: 1
      },
      ruleValidate: {
        firstname: [
          { required: true, message: 'The firstname cannot be empty', trigger: 'blur' }
        ],
        middlename: [
          { required: true, message: 'The middlename cannot be empty', trigger: 'blur' }
        ],
        lastname: [
          { required: true, message: 'The lastname cannot be empty', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: checkphone, trigger: 'blur' }
        ],
        mail: [
          { required: true, validator: validatePass5, trigger: 'blur' }
        ],
        postOa: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        organizationOa: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        roleOa: [
          { required: true, validator: validatePass3, trigger: 'blur' }
        ],
        stat: [
          { required: true, validator: validatePass4, trigger: 'blur' }
        ]
      },
      ruleValidate2: {
        account: [
          { required: true, message: 'The account cannot be empty', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: 'The passwd cannot be empty', trigger: 'blur' }
        ]
      },
      addformaccount: {
        account: '',
        passwd: '123456'
      },
      postList: [],
      roleNames: []
    };
  },
  watch: {
    async modalstat () {
      this.mymoadlStat = this.modalstat;
      await this.getBaseList();

      console.log('this.copyfile==================>', this.copyfile);
      if (this.copyfile) {
        this.addformbase.firstname = this.copyfile.firstName;
        this.addformbase.middlename = this.copyfile.middleName;
        this.addformbase.lastname = this.copyfile.lastName;
        this.addformbase.postOa = this.copyfile.postOa;
        this.addformbase.organizationOaName = this.copyfile.organizationOaName;
        this.addformbase.phone = this.copyfile.phone;
        this.addformbase.mail = this.copyfile.email;
        this.addformbase.roleOa = String(this.copyfile.roleOa);
        console.log('this.addformbase.roleOa==================>', this.addformbase.roleOa);
        this.addformbase.stat = this.copyfile.stat;
        this.addformaccount.account = this.copyfile.account;
        this.addformaccount.passwd = this.copyfile.password;
        this.addformbase.organizationOa = this.copyfile.organizationOa;
      } else {
        this.reset();
      }
    }
  },
  methods: {
    // 选择部门或者成员
    selectDepartmentOrEmployee (department) {
      console.log('department', department);
      this.addformbase.organizationOaName = department.name;
      this.addformbase.organizationOa = department.id;
      // this.$set(this.formdata, 'organizeParent', department.id);
      // this.$set(this.formdata, 'organizeParent', department.name);
      this.isShowTree = false;
      $('.department-wrap').hide();
    },
    // 获取基础设置消息
    getBaseList () {
      this.getBasePost();
      this.getBaseRole();
    },
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
      this.roleNames = [];
      this.roleNames = sss3;
      console.log('this.roleNames=======>', this.roleNames);
    },
    // ========================>基础消息结束<=================
    cancel () {
      this.$emit('updateStat', false);
    },
    reset () {
      this.addformbase = {
        firstname: '',
        middlename: '',
        lastname: '',
        postOa: '',
        organizationOa: '',
        roleOa: '',
        stat: 1
      };
      this.addformaccount = {
        account: '',
        passwd: '123456'
      };
      this.$refs['form'].resetFields();
      this.$refs['form2'].resetFields();
    },
    handsave () {
      console.log(123);
    //   console.log(this.addformbase, this.addformaccount);
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$refs['form2'].validate((valid) => {
            if (valid) {
              console.log('保存');
              usermanagelApi.register(this.addformbase, this.addformaccount).then(res => {
                if (res.ret === 200) {
                  this.$emit('updateStat', false);
                  this.$Message.success(res.msg);
                } else{
                  this.$Message.warning(res.msg);
                }
              });
            } else {
              this.$Message.error('Fail!');
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
