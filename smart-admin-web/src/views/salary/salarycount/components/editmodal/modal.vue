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
                    <FormItem :label="$t('usermanage_view.middlename')" prop="middlename">
                        <Input v-model="addformbase.middlename"></Input>
                    </FormItem>
                    <FormItem :label="$t('usermanage_view.lastname')" prop="lastname">
                        <Input v-model="addformbase.lastname"></Input>
                    </FormItem>
                    <FormItem :label="$t('usermanage_view.post')" prop="postOa">
                        <Input v-model="addformbase.postOa"></Input>
                    </FormItem>
                    <FormItem :label="$t('usermanage_view.organization')" prop="organizationOa">
                        <Input v-model="addformbase.organizationOa"></Input>
                    </FormItem>
                    <FormItem :label="$t('usermanage_view.belongRole')" prop="roleOa">
                        <Input v-model="addformbase.roleOa"></Input>
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
import { usermanagelApi } from '@/api/usermanage';
export default {
  name: 'editModal',
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
    const validatePass2 = (rule, value, callback) => {
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
    const validatePass3 = (rule, value, callback) => {
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
    const validatePass4 = (rule, value, callback) => {
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
      modal_loading: false,
      mymoadlStat: this.modalstat,
      editForm: this.editinfo,
      addformbase: {
        firstname: '',
        middlename: '',
        lastname: '',
        postOa: '',
        organizationOa: '',
        roleOa: '',
        stat: 0
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
      }
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      console.log('moadlStat=======>', this.modalstat, this.editinfo);
      this.addformbase.firstname = this.editinfo.firstName;
      this.addformbase.middlename = this.editinfo.middleName;
      this.addformbase.lastname = this.editinfo.lastName;
      this.addformbase.postOa = this.editinfo.postOa;
      this.addformbase.organizationOa = this.editinfo.organizationOa;
      this.addformbase.roleOa = this.editinfo.roleOa;
      this.addformbase.stat = this.editinfo.stat;
      this.addformaccount.account = this.editinfo.account;
      this.addformaccount.passwd = this.editinfo.password;
    }
  },
  methods: {
    cancel () {
      this.$emit('updateStat', false);
    },
    handsave () {
    //   console.log(this.addformbase, this.addformaccount);
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$refs['form2'].validate((valid) => {
            if (valid) {
              usermanagelApi.register(this.addformbase, this.addformaccount).then(res => {
                console.log('res========>', res);
              });
              this.$Message.success('Success!');
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
