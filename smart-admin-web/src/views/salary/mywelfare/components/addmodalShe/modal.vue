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
                    <FormItem :label="$t('socialSecurityFund_view.basic')" prop="basic">
                        <InputNumber v-model="addformbase.basicMoney"></InputNumber>
                    </FormItem>
                    <Divider>养老保险</Divider>
                    <FormItem :label="$t('socialSecurityFund_view.Personalcommitment')" >
                        <InputNumber v-model="addformbase.personalPensionInsurance"></InputNumber>
                    </FormItem>
                    <FormItem :label="$t('socialSecurityFund_view.companycommitment')" >
                        <InputNumber v-model="addformbase.companyPensionInsurance"></InputNumber>
                    </FormItem>
                    <Divider>医疗保险</Divider>
                    <FormItem :label="$t('socialSecurityFund_view.Personalcommitment')" >
                        <InputNumber v-model="addformbase.personalMedicalInsurance"></InputNumber>
                    </FormItem>
                    <FormItem :label="$t('socialSecurityFund_view.companycommitment')" >
                        <InputNumber v-model="addformbase.companyMedicalInsurance"></InputNumber>
                    </FormItem>
                    <Divider>生育保险</Divider>
                    <FormItem :label="$t('socialSecurityFund_view.Personalcommitment')" >
                        <InputNumber v-model="addformbase.personalBirthInsurance"></InputNumber>
                    </FormItem>
                    <FormItem :label="$t('socialSecurityFund_view.companycommitment')" >
                        <InputNumber v-model="addformbase.companyBirthInsurance"></InputNumber>
                    </FormItem>
                    <Divider>失业保险</Divider>
                    <FormItem :label="$t('socialSecurityFund_view.Personalcommitment')" >
                        <InputNumber v-model="addformbase.personalUnemploymentInsurance"></InputNumber>
                    </FormItem>
                    <FormItem :label="$t('socialSecurityFund_view.companycommitment')" >
                        <InputNumber v-model="addformbase.companyUnemploymentInsurance"></InputNumber>
                    </FormItem>
                    <Divider>工伤保险</Divider>
                    <FormItem :label="$t('socialSecurityFund_view.Personalcommitment')" >
                        <InputNumber v-model="addformbase.personalInjuryInsurance"></InputNumber>
                    </FormItem>
                    <FormItem :label="$t('socialSecurityFund_view.companycommitment')" >
                        <InputNumber v-model="addformbase.companyInjuryInsurance"></InputNumber>
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
import {
  socialSecurityFundApi
} from '@/api/socialSecurityFund';
export default {
  name: 'addShe',
  components: {
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    }
  },
  created () {
    console.log('moadlStat=======>', this.modalstat);
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
      if (this.addformbase.basicMoney === '' && this.addformbase.basicMoney === null && this.addformbase.basicMoney === undefined) {
        callback(new Error('Please enter your basicMoney'));
      } else {
        callback();
      }
    };
    return {
      isShowTree: false,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {
      },
      ruleValidate: {
        basic: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      // 新建员工弹窗
      visiable_emp: false
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
    }
  },
  methods: {
    cancel () {
      this.$emit('updateStat', false);
    },
    reset () {
      this.addformbase = {
        organizationOaName: '',
        organizationOa: '',
        empList: '',
        empListIds: '',
        title: '',
        contnet: '',
        suitType: '1'
      };
      this.$refs['form'].resetFields();
    },
    handsave () {
      this.addformbase.createId = this.$store.state.user.userId;
      this.$refs['form'].validate((valid) => {
        console.log('valid======>', valid);
        if (valid) {
          socialSecurityFundApi.addShe(this.addformbase).then(res => {
            if (res.ret === 200) {
              this.$emit('updateStat', false);
              this.$Message.success(res.msg);
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
