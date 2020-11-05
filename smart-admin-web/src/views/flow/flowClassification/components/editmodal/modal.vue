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
                    <FormItem :label="$t('fqqx')">
                        <div style="display:flex;">
                          <div style="padding:8px;">
                            <Button @click="selectOrg(1)" style="width:100%;">选择组织</Button>
                            <Input type="textarea" v-model="addformbase.startOrganizeName" readonly/>
                          </div>
                          <div style="padding:8px;">
                            <Button @click="selectPost(1)" style="width:100%;">选择岗位</Button>
                            <Input type="textarea" v-model="addformbase.startPostName" readonly/>
                          </div>
                          <div style="padding:8px;">
                            <Button @click="selectEmp(1)" style="width:100%;">选择人员</Button>
                            <Input type="textarea" v-model="addformbase.startEmpName" readonly/>
                          </div>
                        </div>
                    </FormItem>
                    <FormItem :label="$t('jzfq')">
                        <div style="display:flex;">
                          <div style="padding:8px;">
                            <Button @click="selectOrg(2)" style="width:100%;">选择组织</Button>
                            <Input type="textarea" v-model="addformbase.forbidOrganizeName" readonly/>
                          </div>
                          <div style="padding:8px;">
                            <Button @click="selectPost(2)" style="width:100%;">选择岗位</Button>
                            <Input type="textarea" v-model="addformbase.forbidPostName" readonly/>
                          </div>
                          <div style="padding:8px;">
                            <Button @click="selectEmp(2)" style="width:100%;">选择人员</Button>
                            <Input type="textarea" v-model="addformbase.forbidEmpName" readonly/>
                          </div>
                        </div>
                    </FormItem>
                    <FormItem :label="$t('cyqx')">
                        <div style="display:flex;">
                          <div style="padding:8px;">
                            <Button @click="selectOrg(3)" style="width:100%;">选择组织</Button>
                            <Input type="textarea" v-model="addformbase.queryOrganizeName" readonly/>
                          </div>
                          <div style="padding:8px;">
                            <Button @click="selectPost(3)" style="width:100%;">选择岗位</Button>
                            <Input type="textarea" v-model="addformbase.queryPostName" readonly/>
                          </div>
                          <div style="padding:8px;">
                            <Button @click="selectEmp(3)" style="width:100%;">选择人员</Button>
                            <Input type="textarea" v-model="addformbase.queryEmpName" readonly/>
                          </div>
                        </div>
                    </FormItem>
                    <FormItem :label="$t('glqx')">
                        <div style="display:flex;">
                          <div style="padding:8px;">
                            <Button @click="selectOrg(4)" style="width:100%;">选择组织</Button>
                            <Input type="textarea" v-model="addformbase.manageOrganizeName" readonly/>
                          </div>
                          <div style="padding:8px;">
                            <Button @click="selectPost(4)" style="width:100%;">选择岗位</Button>
                            <Input type="textarea" v-model="addformbase.managePostName" readonly/>
                          </div>
                          <div style="padding:8px;">
                            <Button @click="selectEmp(4)" style="width:100%;">选择人员</Button>
                            <Input type="textarea" v-model="addformbase.manageEmpName" readonly/>
                          </div>
                        </div>
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
        <addemp :modalstat = "visiable_emp" :type="mytype" :memberId="tranferValue" @updateStat = "updateStat_emp"></addemp>
        <addorg :modalstat = "visiable_org" :type="mytype" :memberId="tranferValue" @updateStat = "updateStat_org"></addorg>
        <addpost :modalstat = "visiable_post" :memberId="tranferValue" @updateStat = "updateStat_post"></addpost>
        <!-- 新建结束============= -->
    </Modal>
</template>
<script>
import $ from 'jquery';
import { FlowCategoryApi } from '@/api/flowClassification';
import DepartmentEmployeeTree from '../department-employee-tree/department-employee-tree';
import addemp from '../addemp/modal';
import addorg from '../add_org/modal';
import addpost from '../addpost/modal';
const defaultForm = {
  startOrganize: '',
  startPost: '',
  startEmp: '',
  forbidOrganize: '',
  forbidPost: '',
  forbidEmp: '',
  queryOrganize: '',
  queryPost: '',
  queryEmp: '',
  manageOrganize: '',
  managePost: '',
  manageEmp: ''
};
export default {
  name: 'editmodal',
  components: {
    addemp,
    addorg,
    addpost
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null
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
      isShowTree: false,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: Object.assign({}, defaultForm),
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
      visiable_emp: false,
      visiable_org: false,
      visiable_post: false,
      tranferValue: null,
      mytype: null
    };
  },
  watch: {
    modalstat () {
      console.log('this.editinfo=======', this.editinfo);
      this.mymoadlStat = this.modalstat;
      this.addformbase = Object.assign({}, this.editinfo);
      this.addformbase.startOrganizeName = this.addformbase.startOrganizes && this.addformbase.startOrganizes.map(item => { return item.organizeName; }).join(',');
      this.addformbase.startPostName = this.addformbase.startPosts && this.addformbase.startPosts.map(item => { return item.postName; }).join(',');
      this.addformbase.startEmpName = this.addformbase.startEmpVos && this.addformbase.startEmpVos.map(item => { return item.empName; }).join(',');
      this.addformbase.forbidOrganizeName = this.addformbase.forbidOrganizes && this.addformbase.forbidOrganizes.map(item => { return item.organizeName; }).join(',');
      this.addformbase.forbidPostName = this.addformbase.forbidPosts && this.addformbase.forbidPosts.map(item => { return item.postName; }).join(',');
      this.addformbase.forbidEmpName = this.addformbase.forbidEmpVos && this.addformbase.forbidEmpVos.map(item => { return item.empName; }).join(',');
      this.addformbase.queryOrganizeName = this.addformbase.queryOrganizes && this.addformbase.queryOrganizes.map(item => { return item.organizeName; }).join(',');
      this.addformbase.queryPostName = this.addformbase.queryPosts && this.addformbase.queryPosts.map(item => { return item.postName; }).join(',');
      this.addformbase.queryEmpName = this.addformbase.queryEmpVos && this.addformbase.queryEmpVos.map(item => { return item.empName; }).join(',');
      this.addformbase.manageOrganizeName = this.addformbase.manageOrganizes && this.addformbase.manageOrganizes.map(item => { return item.organizeName; }).join(',');
      this.addformbase.managePostName = this.addformbase.managePosts && this.addformbase.managePosts.map(item => { return item.postName; }).join(',');
      this.addformbase.manageEmpName = this.addformbase.manageEmployeeVos && this.addformbase.manageEmployeeVos.map(item => { return item.empName; }).join(',');
      console.log('转换过的格式', this.addformbase);
    }
  },
  methods: {
    // 选择人员部门岗位
    selectOrg (index) {
      this.mytype = index;
      this.visiable_org = true;
      switch (this.mytype) {
        case 1:
          this.tranferValue = this.addformbase.startOrganize;
          break;
        case 2:
          this.tranferValue = this.addformbase.forbidOrganize;
          break;
        case 3:
          this.tranferValue = this.addformbase.queryOrganize;
          break;
        case 4:
          this.tranferValue = this.addformbase.manageOrganize;
          break;
      }
    },
    selectPost (index) {
      this.mytype = index;
      this.visiable_post = true;
      switch (this.mytype) {
        case 1:
          this.tranferValue = this.addformbase.startPost;
          break;
        case 2:
          this.tranferValue = this.addformbase.forbidPost;
          break;
        case 3:
          this.tranferValue = this.addformbase.queryPost;
          break;
        case 4:
          this.tranferValue = this.addformbase.managePost;
          break;
      }
    },
    selectEmp (index) {
      this.mytype = index;
      this.showemp();
    },
    // ==============end========
    updateStat_emp (stat, empList) {
      this.visiable_emp = stat;
      if (!empList) {
        return false;
      }
      switch (this.mytype) {
        case 1:
          this.addformbase.startEmpName = empList.names;
          this.addformbase.startEmp = empList.empIds;
          break;
        case 2:
          this.addformbase.forbidEmpName = empList.names;
          this.addformbase.forbidEmp = empList.empIds;
          break;
        case 3:
          this.addformbase.queryEmpName = empList.names;
          this.addformbase.queryEmp = empList.empIds;
          break;
        case 4:
          this.addformbase.manageEmpName = empList.names;
          this.addformbase.manageEmp = empList.empIds;
          break;
      }
    },
    updateStat_org (stat, orgList) {
      console.log(orgList);
      this.visiable_org = stat;
      if (!orgList) {
        return false;
      }
      switch (this.mytype) {
        case 1:
          this.addformbase.startOrganizeName = orgList.organizationOaName;
          this.addformbase.startOrganize = orgList.organizationOa;
          break;
        case 2:
          this.addformbase.forbidOrganizeName = orgList.organizationOaName;
          this.addformbase.forbidOrganize = orgList.organizationOa;
          break;
        case 3:
          this.addformbase.queryOrganizeName = orgList.organizationOaName;
          this.addformbase.queryOrganize = orgList.organizationOa;
          break;
        case 4:
          this.addformbase.manageOrganizeName = orgList.organizationOaName;
          this.addformbase.manageOrganize = orgList.organizationOa;
          break;
      }
    },
    updateStat_post (stat, postList) {
      this.visiable_post = stat;
      if (!postList) {
        return false;
      }
      switch (this.mytype) {
        case 1:
          this.addformbase.startPostName = postList.names;
          this.addformbase.startPost = postList.empIds;
          break;
        case 2:
          this.addformbase.forbidPostName = postList.names;
          this.addformbase.forbidPost = postList.empIds;
          break;
        case 3:
          this.addformbase.queryPostName = postList.names;
          this.addformbase.queryPost = postList.empIds;
          break;
        case 4:
          this.addformbase.managePostName = postList.names;
          this.addformbase.managePost = postList.empIds;
          break;
      }
    },
    showemp () {
      switch (this.mytype) {
        case 1:
          this.tranferValue = this.addformbase.startEmp;
          break;
        case 2:
          this.tranferValue = this.addformbase.forbidEmp;
          break;
        case 3:
          this.tranferValue = this.addformbase.queryEmp;
          break;
        case 4:
          this.tranferValue = this.addformbase.manageEmp;
          break;
      }
      // if (typeof (this.tranferValue) === 'string' && this.tranferValue !== null) {
      //   this.tranferValue.split(',');
      // }
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
      this.addformbase.modifyPersonId = this.$store.state.user.userLoginInfo.userId;
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
