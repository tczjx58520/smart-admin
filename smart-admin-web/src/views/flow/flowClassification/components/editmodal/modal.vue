<template>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('welfare_view.editwelfare') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <Divider />
                <Form ref="form" :model="addformbase" label-position="right" :label-width="100" :rules="ruleValidate">
                    <FormItem :label="$t('flowClassification_view.categoryName')" prop="categoryName">
                        <Input v-model="addformbase.categoryName"></Input>
                    </FormItem>
                    <FormItem :label="$t('flowClassification_view.description')">
                        <Input type="textarea" v-model="addformbase.remark"></Input>
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
        <!-- 新建员工弹窗 -->
        <addemp :modalstat = "visiable_emp" :memberId="addformbase.empListIds" @updateStat = "updateStat_emp"></addemp>
        <!-- 新建结束============= -->
    </Modal>
</template>
<script>
import $ from 'jquery';
import { FlowCategoryApi } from '@/api/flowClassification';
import DepartmentEmployeeTree from '../department-employee-tree/department-employee-tree';
import addemp from '../addemp/modal';
export default {
  name: 'editmodal',
  components: {
    DepartmentEmployeeTree,
    addemp
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null
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
      isShowTree: false,
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
      this.addformbase = this.editinfo;
      this.addformbase.suitType = String(this.addformbase.suitType);
      if (this.addformbase.suitType === '2') {
        this.addformbase.empListIds = this.addformbase.welfareTargetVos.map(item => { return item.targetId; }).join(',');
        this.addformbase.empList = this.addformbase.welfareTargetVos.map(item => { return item.targetName; }).join(',');
      } else {
        this.addformbase.organizationOaName = this.addformbase.welfareTargetVos.map(item => { return item.targetName; }).join(',');
        this.addformbase.organizationOa = this.addformbase.welfareTargetVos.map(item => { return item.targetId; }).join(',');
      }
      // this.addformbase.welfareTargetVos.map(item => { return item.targetId; }).join(',');
      // this.addformbase.welfareTargetVos.map(item => { return item.targetName; }).join(',');
      console.log('this.addformbase==========>', this.addformbase);
    }
  },
  methods: {
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
      this.addformbase = {
        title: '',
        contnet: ''
      };
      this.$refs['form'].resetFields();
    },
    handsave () {
      console.log(this.addformbase);
      this.addformbase.modifyPersonId = this.$store.state.user.userId;
      this.addformbase.id = this.addformbase.id;
      if (this.addformbase.suitType === '2') {
        this.addformbase.suitTarget = this.addformbase.empListIds;
      } else {
        this.addformbase.suitTarget = this.addformbase.organizationOa;
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          FlowCategoryApi.updateGroup(this.addformbase).then(res => {
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
