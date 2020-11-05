<template>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('salaryOption_view.newSalaryEntry') }}</span>
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
import $ from 'jquery';
import {
  salaryOptionApi
} from '@/api/salaryOption';
export default {
  name: 'addGong',
  components: {
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    }
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
    const checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('please enter'));
      }
      setTimeout(() => {
        console.log(String(value).length);
        if (String(value).length !== 11) {
          callback(new Error('please enter Correct phone'));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      typeList: [
        { value: 2, label: this.$t('salaryOption_view.Input') },
        { value: 3, label: this.$t('salaryOption_view.Report') },
        { value: 4, label: this.$t('salaryOption_view.Calculation') }
      ],
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {
        suitType: '1',
        empListIds: null
      },
      ruleValidate: {
        title: [
          { required: true, message: 'The title cannot be empty', trigger: 'blur' }
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
    addorg (selection) {
      console.log('selection==========>', selection);
      console.log(selection.map(item => { return item.title; }).join(','));
      this.addformbase.organizationOaName = selection.map(item => { return item.title; }).join(',');
      this.addformbase.organizationOa = selection.map(item => { return item.id; }).join(',');
      console.log(this.addformbase.organizationOaName);
    },
    updateStat_emp (stat, empList) {
      this.visiable_emp = stat;
      this.addformbase.empList = empList.names;
      console.log('names========>', this.addformbase.empList);
      this.addformbase.empListIds = empList.empIds;
      console.log('empIds===============>', this.addformbase.empListIds);
      console.log('empList==================================>', empList);
    },
    showemp () {
      console.log('新建员工');
      console.log(typeof (this.addformbase.empListIds));
      if (typeof (this.addformbase.empListIds) === 'string' && this.addformbase.empListIds !== null) {
        this.addformbase.empListIds.split(',');
      }
      this.visiable_emp = true;
    },
    // 选择部门或者成员
    selectDepartmentOrEmployee (department) {
      console.log('department==============>', department);
      // this.addformbase.organizationOaName = department.name;
      // this.addformbase.organizationOa = department.id;
      // this.$set(this.formdata, 'organizeParent', department.id);
      // this.$set(this.formdata, 'organizeParent', department.name);
      // this.isShowTree = false;
      // $('.department-wrap').hide();
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    reset () {
      for (let key in this.addformbase) {
        delete this.addformbase[key];
      }
      this.$refs['form'].resetFields();
    },
    handsave () {
      console.log(this.addformbase);
      this.addformbase.createId = this.$store.state.user.userLoginInfo.userId;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          salaryOptionApi.addsalaryOption(this.addformbase).then(res => {
            if (res.ret === 200) {
              this.$emit('updateStat', false);
              this.$Message.success(res.msg);
              this.reset();
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
