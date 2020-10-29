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
                    <FormItem :label="$t('salaryOption_view.type')">
                        <Select v-model="addformbase.type" style="width:100%">
                          <Option v-for="item in typeList" :value="item.value" v-bind:key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('salaryOption_view.name')" prop="middlename">
                        <Input v-model="addformbase.name"></Input>
                    </FormItem>
                    <FormItem :label="$t('salaryOption_view.sort')" prop="middlename">
                        <Input v-model="addformbase.idx"></Input>
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
import {
  salaryOptionApi
} from '@/api/salaryOption';
export default {
  name: 'addShe',
  components: {
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: {
      type: Object,
      default: () => {
        return {};
      }
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
      typeList: [
        { value: 1, label: this.$t('salaryOption_view.System') },
        { value: 2, label: this.$t('salaryOption_view.Input') },
        { value: 3, label: this.$t('salaryOption_view.Report') },
        { value: 4, label: this.$t('salaryOption_view.Calculation') }
      ],
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
      this.addformbase = this.editinfo;
      console.log('this.addformbase======>', this.addformbase);
    }
  },
  methods: {
    cancel () {
      this.$emit('updateStat', false);
    },
    reset () {
      this.addformbase = {
      };
      this.$refs['form'].resetFields();
    },
    handsave () {
      this.addformbase.createId = this.$store.state.user.userId;
      this.$refs['form'].validate((valid) => {
        console.log('valid======>', valid);
        if (valid) {
          salaryOptionApi.updatesalaryOption(this.addformbase).then(res => {
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
