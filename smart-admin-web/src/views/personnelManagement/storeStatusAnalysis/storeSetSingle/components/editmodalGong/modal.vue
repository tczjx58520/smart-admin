<template>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('usermanage_view.adduser') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <div style="display:flex; align-items: center;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('BaseData')}}</div>
                </div>
                <Divider />
                <Form ref="form" :model="addformbase" label-position="right" :label-width="100" :rules="ruleValidate">
                  <FormItem :label="$t('assessmentTask_view.taskName')" prop="title">
                        <Input v-model="addformbase.title"></Input>
                  </FormItem>
                  <FormItem :label="$t('assessmentTask_view.examiner')" prop="empList">
                      <Input v-model="addformbase.testHandleNames" readonly @click.native="showemp_exa" style="width: 100%"></Input>
                  </FormItem>
                  <FormItem :label="$t('assessmentTask_view.assessee')" prop="empList2">
                      <Input v-model="addformbase.empNames" readonly @click.native="showemp_ass" style="width: 100%"></Input>
                  </FormItem>
                  <FormItem :label="$t('assessmentTask_view.viewer')" prop="empList3">
                      <Input v-model="addformbase.checkPersonNames" readonly @click.native="showemp_viewer" style="width: 100%"></Input>
                  </FormItem>
                  <FormItem :label="$t('assessmentTask_view.assessmentIndicatorSet')" prop="assessmentCollectId">
                      <Select v-model="addformbase.assessmentCollectId" style="width:100%">
                        <Option v-for="item in originList" :value="item.id" v-bind:key="item.id">{{ item.name }}</Option>
                      </Select>
                  </FormItem>
                  <FormItem :label="$t('assessmentTask_view.effectiveDate')" prop="effectiveTime">
                    <DatePicker v-model="addformbase.effectiveTime" type="date" format="yyyy-MM-dd" placeholder="Select date" style="width: 100%" @on-change="getmytime"></DatePicker>
                  </FormItem>
                  <FormItem :label="$t('assessmentTask_view.deadline')" prop="deadTime">
                    <DatePicker v-model="addformbase.deadTime" type="date" format="yyyy-MM-dd" placeholder="Select date" style="width: 100%" @on-change="getmytime2"></DatePicker>
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
        <addemp :modalstat = "visiable_emp" :type="mytype" :memberId="addformbase" @updateStat = "updateStat_emp"></addemp>
        <!-- 新建结束============= -->
    </Modal>
</template>
<script>
import $ from 'jquery';
import { indicatorSetApi } from '@/api/indicatorSet';
import { assessmentTaskApi } from '@/api/assessmentTask';
import addemp from '../addemp_more/modal';
export default {
  name: 'addGong',
  components: {
    addemp
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    typeId: null
  },
  created () {

  },
  mounted () {
    this.getindicator();
  },
  data () {
    const validatePass2 = (rule, value, callback) => {
      if (this.addformbase.testHandleNames === '' || this.addformbase.testHandleNames === null || this.addformbase.testHandleNames === undefined) {
        callback(new Error('Please enter your emp'));
      } else {
        callback();
      }
    };
    const validatePass3 = (rule, value, callback) => {
      if (this.addformbase.empNames === '' || this.addformbase.empNames === null || this.addformbase.empNames === undefined) {
        callback(new Error('Please enter your emp'));
      } else {
        callback();
      }
    };
    const validatePass4 = (rule, value, callback) => {
      if (this.addformbase.checkPersonNames === '' || this.addformbase.checkPersonNames === null || this.addformbase.checkPersonNames === undefined) {
        callback(new Error('Please enter your emp'));
      } else {
        callback();
      }
    };
    const validatePass5 = (rule, value, callback) => {
      if (this.addformbase.assessmentCollectId === '' || this.addformbase.assessmentCollectId === null || this.addformbase.assessmentCollectId === undefined) {
        callback(new Error('Please enter your emp'));
      } else {
        callback();
      }
    };
    const validatePass6 = (rule, value, callback) => {
      if (this.addformbase.effectiveDate === '' || this.addformbase.effectiveDate === null || this.addformbase.effectiveDate === undefined) {
        callback(new Error('Please enter your emp'));
      } else {
        callback();
      }
    };
    const validatePass7 = (rule, value, callback) => {
      if (this.addformbase.deadTime === '' || this.addformbase.deadTime === null || this.addformbase.deadTime === undefined) {
        callback(new Error('Please enter your emp'));
      } else {
        callback();
      }
    };
    return {
      originList: [],
      mytype: null,
      // 新建基础数据
      GongList: [],
      SheList: [],
      itemsList: [],
      allitems: [],
      // ===============================>
      socialSecurity: true,
      accumulationFund: true,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {
      },
      ruleValidate: {
        title: [
          { required: true, message: 'The title cannot be empty', trigger: 'blur' }
        ],
        empList: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        empList2: [
          { required: true, validator: validatePass3, trigger: 'change' }
        ],
        empList3: [
          { required: true, validator: validatePass4, trigger: 'change' }
        ],
        effectiveTime: [
          { required: true, validator: validatePass5, trigger: 'blur' }
        ],
        deadTime: [
          { required: true, validator: validatePass6, trigger: 'blur' }
        ],
        assessmentCollectId: [
          { required: true, validator: validatePass7, trigger: 'blur' }
        ]
      },
      // 新建员工弹窗
      visiable_emp: false
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        this.addformbase.assessmentCollectId = this.typeId;
        this.gettoday();
      }
    }
  },
  methods: {
    async getindicator () {
      let data = {};
      data.pageNum = 1;
      data.pageSize = 10;
      let result = null;
      await indicatorSetApi.queryIndicator(data).then(res => {
        result = res.data.content.list;
      });
      this.originList = result.map(item => {
        return {
          name: item.name,
          id: item.id
        };
      });
    },
    getmytime (e) {
      this.addformbase.effectiveDate = e;
    },
    getmytime2 (e) {
      this.addformbase.deadDate = e;
    },
    gettoday () {
      let myDate = new Date(); // 获取当前年份(2位)
      let year = myDate.getFullYear(); // 获取完整的年份(4位,1970-????)
      let month = myDate.getMonth(); // 获取当前月份(0-11,0代表1月)
      if (month + 1 < 10) {
        month = '0' + (month + 1);
      }
      let day = myDate.getDate(); // 获取当前日(1-31)
      if (day < 10) {
        day = '0' + day;
      }
      let dayNow = year + '-' + month + '-' + day;
      this.addformbase.effectiveDate = dayNow;
      this.addformbase.effectiveTime = dayNow;
    },
    updateStat_emp (stat, empList, type) {
      this.visiable_emp = stat;
      if (empList) {
        if (type === 1) {
          this.addformbase.testHandleNames = empList.names;
          this.addformbase.testHandle = empList.empIds;
        } else if (type === 3) {
          this.addformbase.checkPersonNames = empList.names;
          this.addformbase.checkPerson = empList.empIds;
        } else {
          this.addformbase.empNames = empList.names;
          this.addformbase.empIds = empList.empIds;
        }
      }
    },
    addorg (selection) {
      console.log('selection==========>', selection);
      console.log(selection.map(item => { return item.title; }).join(','));
      this.addformbase.organizationOaName = selection.map(item => { return item.title; }).join(',');
      this.addformbase.organizationOa = selection.map(item => { return item.id; }).join(',');
      console.log(this.addformbase.organizationOaName);
    },
    showemp_exa () {
      if (typeof (this.addformbase.testHandle) === 'string' && this.addformbase.testHandle !== null) {
        this.addformbase.testHandle.split(',');
      }
      this.mytype = 1;
      this.visiable_emp = true;
    },
    showemp_viewer () {
      console.log(typeof (this.addformbase.empListIds));
      if (typeof (this.addformbase.checkPerson) === 'string' && this.addformbase.checkPerson !== null) {
        this.addformbase.checkPerson.split(',');
      }
      this.mytype = 3;
      this.visiable_emp = true;
    },
    showemp_ass () {
      console.log(typeof (this.addformbase.empListIds));
      if (typeof (this.addformbase.empIds) === 'string' && this.addformbase.empIds !== null) {
        this.addformbase.empIds.split(',');
      }
      this.mytype = 2;
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
      this.reset();
      this.$emit('updateStat', false);
    },
    reset () {
      for (let key in this.addformbase) {
        delete this.addformbase[key];
      }
      this.$refs['form'].resetFields();
    },
    handsave () {
      this.modal_loading = true;
      console.log(this.addformbase);
      this.addformbase.createId = this.$store.state.user.userLoginInfo.userId;
      console.log(this.addformbase);
      this.$refs['form'].validate((valid) => {
        if (valid) {
          assessmentTaskApi.addassessmentTask(this.addformbase).then(res => {
            if (res.ret === 200) {
              this.modal_loading = false;
              this.$emit('routerlink', false);
              this.$Message.success(res.msg);
              this.reset();
            }
          });
        } else {
          this.$Message.error('Fail!');
          this.modal_loading = false;
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
