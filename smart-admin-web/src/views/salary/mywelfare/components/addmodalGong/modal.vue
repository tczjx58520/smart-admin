<template>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :transfer="false" :styles="{top: '10px'}" @on-cancel="mycancel">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('usermanage_view.adduser') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <List border size="small">
                    <ListItem style="background-color:#ccc;">
                      <p>用户名：{{ addformbase.empName }}</p>
                    </ListItem>
                    <ListItem>
                      <p>日期： {{ addformbase.yearAndMonth }}</p>
                    </ListItem>
                    <ListItem style="background-color:#ccc;">
                      <p>社会保险</p>
                    </ListItem>
                    <ListItem>
                      <span style="margin-right:20px;">社保基数：</span><Input :value="addformbase.basicSocialSecurity.basicMoney" readonly placeholder="Enter something..." style="width:200px;"/>
                    </ListItem>
                    <ListItem>
                      <Collapse v-model="cs1" style="width:100%">
                          <Panel name="1">
                              <span style="margin-right:20px;">个人承担：</span><Input :value="addformbase.basicSocialSecurity.personall" readonly placeholder="Enter something..." style="width:200px;"/>
                              <div slot="content">
                                <div style="margin-bottom:10px;">
                                  <span style="margin-right:20px;">{{ $t('mywelfare_view.EndowmentInsurance') }}</span><Input :value="addformbase.basicSocialSecurity.personalPensionInsurance" readonly placeholder="Enter something..." style="width:200px;"/>
                                </div>
                                <div style="margin-bottom:10px;">
                                  <span style="margin-right:20px;">{{ $t('mywelfare_view.MedicalInsurance') }}</span><Input :value="addformbase.basicSocialSecurity.personalMedicalInsurance" readonly placeholder="Enter something..." style="width:200px;"/>
                                </div>
                                <div style="margin-bottom:10px;">
                                  <span style="margin-right:20px;">{{ $t('mywelfare_view.MaternItyinsurance') }}</span><Input :value="addformbase.basicSocialSecurity.personalBirthInsurance" readonly placeholder="Enter something..." style="width:200px;"/>
                                </div>
                                <div style="margin-bottom:10px;">
                                  <span style="margin-right:20px;">{{ $t('mywelfare_view.unemploymentInsurance') }}</span><Input :value="addformbase.basicSocialSecurity.personalUnemploymentInsurance" readonly placeholder="Enter something..." style="width:200px;"/>
                                </div>
                                <div style="margin-bottom:10px;">
                                  <span style="margin-right:20px;">{{ $t('mywelfare_view.injuryInsurance') }}</span><Input :value="addformbase.basicSocialSecurity.personalInjuryInsurance" readonly placeholder="Enter something..." style="width:200px;"/>
                                </div>
                              </div>
                          </Panel>
                      </Collapse>
                    </ListItem>
                    <ListItem>
                      <!-- <span style="margin-right:20px;">公司承担：</span><Input :value="addformbase.optionMoney" readonly placeholder="Enter something..." style="width:200px;"/> -->
                      <Collapse v-model="cs2" style="width:100%">
                          <Panel name="2">
                              <span style="margin-right:20px;">公司承担：</span><Input :value="this.addformbase.basicSocialSecurity.companyall" readonly placeholder="Enter something..." style="width:200px;"/>
                              <div slot="content">
                                <div style="margin-bottom:10px;">
                                  <span style="margin-right:20px;">{{ $t('mywelfare_view.EndowmentInsurance') }}</span><Input :value="addformbase.basicSocialSecurity.companyPensionInsurance" readonly placeholder="Enter something..." style="width:200px;"/>
                                </div>
                                <div style="margin-bottom:10px;">
                                  <span style="margin-right:20px;">{{ $t('mywelfare_view.MedicalInsurance') }}</span><Input :value="addformbase.basicSocialSecurity.companyMedicalInsurance" readonly placeholder="Enter something..." style="width:200px;"/>
                                </div>
                                <div style="margin-bottom:10px;">
                                  <span style="margin-right:20px;">{{ $t('mywelfare_view.MaternItyinsurance') }}</span><Input :value="addformbase.basicSocialSecurity.companyBirthInsurance" readonly placeholder="Enter something..." style="width:200px;"/>
                                </div>
                                <div style="margin-bottom:10px;">
                                  <span style="margin-right:20px;">{{ $t('mywelfare_view.unemploymentInsurance') }}</span><Input :value="addformbase.basicSocialSecurity.companyUnemploymentInsurance" readonly placeholder="Enter something..." style="width:200px;"/>
                                </div>
                                <div style="margin-bottom:10px;">
                                  <span style="margin-right:20px;">{{ $t('mywelfare_view.injuryInsurance') }}</span><Input :value="addformbase.basicSocialSecurity.companyInjuryInsurance" readonly placeholder="Enter something..." style="width:200px;"/>
                                </div>
                              </div>
                          </Panel>
                      </Collapse>
                    </ListItem>
                    <ListItem style="background-color:#ccc;">
                      <p>公积金</p>
                    </ListItem>
                    <ListItem>
                      <span style="margin-right:20px;">社保基数：</span><Input :value="addformbase.basicAccumulationFund.basicMoney" readonly placeholder="Enter something..." style="width:200px;"/>
                    </ListItem>
                    <ListItem>
                      <span style="margin-right:20px;">个人承担：</span><Input :value="addformbase.basicAccumulationFund.personalAdd" readonly placeholder="Enter something..." style="width:200px;"/>
                    </ListItem>
                    <ListItem>
                      <span style="margin-right:20px;">公司承担：</span><Input :value="addformbase.basicAccumulationFund.companyAdd" readonly placeholder="Enter something..." style="width:200px;"/>
                    </ListItem>
                    <ListItem style="background-color:#ccc;">
                      <p>薪酬项目</p>
                    </ListItem>
                    <ListItem v-for="(item, index) in addformbase.salaryDetails" :key="index">
                      <span style="margin-right:20px;">{{ item.salaryOptionName }}：</span><Input :value="item.optionMoney" readonly placeholder="Enter something..." style="width:200px;"/>
                    </ListItem>
                </List>
            </Card>

        </div>
        <div slot="footer">
            <ButtonGroup>
                <!-- <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button> -->
                <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
            </ButtonGroup>
        </div>
    </Modal>
</template>
<script>
export default {
  name: 'addGong',
  components: {
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
      cs1: '',
      cs2: '',
      isShowTree: false,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {
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
      this.addformbase.basicSocialSecurity.personall = this.addformbase.basicSocialSecurity.personalPensionInsurance + this.addformbase.basicSocialSecurity.personalMedicalInsurance + this.addformbase.basicSocialSecurity.personalBirthInsurance + this.addformbase.basicSocialSecurity.personalUnemploymentInsurance + this.addformbase.basicSocialSecurity.personalInjuryInsurance;
      this.addformbase.basicSocialSecurity.companyall = this.addformbase.basicSocialSecurity.companyPensionInsurance + this.addformbase.basicSocialSecurity.companyMedicalInsurance + this.addformbase.basicSocialSecurity.companyBirthInsurance + this.addformbase.basicSocialSecurity.companyUnemploymentInsurance + this.addformbase.basicSocialSecurity.companyInjuryInsurance;
    }
  },
  methods: {
    mycancel () {
      this.$emit('updateStat', false);
    },
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
