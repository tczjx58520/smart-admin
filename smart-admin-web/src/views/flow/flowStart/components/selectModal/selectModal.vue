<template>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>选择审批单据</span>
        </div>
        <div>
            <Card dis-hover>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('BaseData')}}</div>
                </div>
                <Divider />
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
export default {
  name: 'selectModal',
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null,
    myvalue: null
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
      if (this.addformbase.month === '' && this.addformbase.month === null && this.addformbase.month === undefined) {
        callback(new Error('Please enter your month'));
      } else {
        callback();
      }
    };
    return {
      isShowTree: false,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {
        suitType: '1',
        empListIds: null
      }
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
    }
  },
  methods: {
    showmytime (e) {
      console.log('e==============>', e);
      this.addformbase.salaryDate = e;
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
      this.$emit('updateStat', false, this.myvalue);
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
      console.log(this.addformbase);
      this.addformbase.operatId = this.$store.state.user.userLoginInfo.userId;
      this.addformbase.judgeId = this.addformbase.id;
      if (this.addformbase.suitType === '2') {
        this.addformbase.suitTarget = this.addformbase.empListIds;
      } else {
        this.addformbase.suitTarget = this.addformbase.organizationOa;
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          salaryjudgeApi.updatejudge(this.addformbase).then(res => {
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
