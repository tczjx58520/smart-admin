<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    fullscreen
    width="720"
    :closable="false"
    :mask-closable="false"
    :transfer="false"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>{{ $t("xgmd") }}</span>
    </div>
    <div>
      <Card dis-hover>
        <div
          style="
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e1e1e1;
            padding-bottom: 20px;
          "
        >
          <div
            style="
              width: 4px;
              height: 20px;
              background: #2d8cf0;
              margin-right: 15px;
            "
          ></div>
          <div>{{ $t("BaseData") }}</div>
        </div>
        <Divider />
        <Form
          ref="form"
          :model="addformbase"
          label-position="right"
          :label-width="100"
          :rules="ruleValidate"
          inline
        >
          <Row>
            <Col span="6">
              <FormItem :label="$t('ckmdmc')" style="width: 80%">
                <Input v-model="addformbase.repositoryName" />
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem :label="$t('melx')" style="width: 80%">
                <Select v-model="addformbase.type" clearable>
                  <Option :value="1">仓库</Option>
                  <Option :value="2">门店</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem :label="$t('dh')" style="width: 80%">
                <Input v-model="addformbase.phone" />
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem :label="$t('dz')" style="width: 80%">
                <Input v-model="addformbase.address" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="6">
              <FormItem :label="$t('kysj')" style="width: 80%">
                <DatePicker
                  v-model="addformbase.time"
                  type="date"
                  placeholder="Select date"
                  style="width: 100%"
                  @on-change="setTime"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem :label="$t('qyzt')" style="width: 80%">
                <Select v-model="addformbase.stat" clearable>
                  <Option :value="1">启用</Option>
                  <Option :value="2">停用</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem :label="$t('cksm')" style="width: 80%">
                <Input v-model="addformbase.description" />
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem :label="$t('mdjb')" style="width: 80%">
                <Select v-model="addformbase.repositoryLevelId">
                  <Option
                    v-for="item in levelList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="6">
              <FormItem :label="$t('ltr')">
                <div style="padding:8px;">
                  <Button @click="selectEmp(4)" style="width:100%;"
                    >选择人员</Button
                  >
                  <Input
                    type="textarea"
                    v-model="addformbase.manageEmpName"
                    readonly
                  />
                </div>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem :label="$t('sslx')" style="width: 80%">
                <RadioGroup v-model="addformbase.repositoryType">
                  <Radio :label="1">主店</Radio>
                  <Radio :label="2">附属店</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem
                v-if="addformbase.repositoryType === 1"
                :label="$t('ywfsmd')"
                style="width: 80%"
              >
                <i-switch v-model="addformbase.havaSister">
                  <span slot="open">有</span>
                  <span slot="close">无</span>
                </i-switch>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem
                v-if="
                  addformbase.repositoryType === 1 && addformbase.havaSister
                "
                :label="$t('fsmd')"
                style="width: 80%"
              >
                <Select v-model="addformbase.sisterRepository">
                  <Option
                    v-for="item in repositoryList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
          </Row>
          <!-- <FormItem :label="$t('glqx')">
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
                    </FormItem> -->
        </Form>
      </Card>
    </div>
    <div slot="footer">
      <ButtonGroup>
        <Button
          type="primary"
          size="large"
          :loading="modal_loading"
          @click="handsave"
          >{{ $t("Save") }}</Button
        >
        <Button type="error" size="large" @click="cancel">{{
          $t("Close")
        }}</Button>
      </ButtonGroup>
    </div>
    <!-- 新建员工弹窗 -->
    <addemp
      :modalstat="visiable_emp"
      :type="mytype"
      :memberId="tranferValue"
      @updateStat="updateStat_emp"
    ></addemp>
    <addorg
      :modalstat="visiable_org"
      :type="mytype"
      :memberId="tranferValue"
      @updateStat="updateStat_org"
    ></addorg>
    <addpost
      :modalstat="visiable_post"
      :memberId="tranferValue"
      @updateStat="updateStat_post"
    ></addpost>
    <!-- 新建结束============= -->
  </Modal>
</template>
<script>
import $ from 'jquery';
import { welfareApi } from '@/api/welfare';
import { FlowCategoryApi } from '@/api/flowClassification';
import { salesroom } from '@/api/salesroom';
import addemp from '../addemp/modal';
import addorg from '../add_org/modal';
import addpost from '../addpost/modal';
import { utils } from '@/lib/util';
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
  name: 'addModal',
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
  created () {},
  mounted () {},
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (
        this.addformbase.organizationOaName === '' &&
        this.addformbase.organizationOaName === null &&
        this.addformbase.organizationOaName === undefined
      ) {
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
        categoryName: [
          {
            required: true,
            message: 'The categoryName cannot be empty',
            trigger: 'blur'
          }
        ]
      },
      // 新建员工弹窗
      visiable_emp: false,
      visiable_org: false,
      visiable_post: false,
      tranferValue: null,
      mytype: null,
      repositoryList: [],
      levelList: []
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      this.addformbase = this.editinfo;
      this.addformbase.manageEmpName = this.addformbase.leadersName;
      this.addformbase.manageEmp = this.addformbase.leaders;
      const mydate = new Date(this.addformbase.openTime);
      this.addformbase.openTimeStr = utils.getDate(mydate, 'YMDHMS');
      this.addformbase.time = new Date(this.addformbase.openTime);
      console.log(this.editinfo);
    }
  },
  methods: {
    setTime (val, val2) {
      this.addformbase.openTimeStr = val;
    },
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
    },
    cancel () {
      this.addformbase = Object.assign({}, defaultForm);
      this.$emit('updateStat', false);
    },
    reset () {
      this.addformbase = {
        categoryName: '',
        remark: ''
      };
      this.$refs['form'].resetFields();
    },
    handsave () {
      console.log(this.addformbase);
      this.addformbase.createPersonId = this.$store.state.user.userLoginInfo.userId;
      this.addformbase.leaders = this.addformbase.manageEmp;
      this.addformbase.repositoryLevelId = 1;
      // repositoryLevelId
      this.$refs['form'].validate(valid => {
        if (valid) {
          salesroom.updateSalesRoomList(this.addformbase).then(res => {
            if (res.ret === 200) {
              this.$emit('updateStat', false);
              this.addformbase = Object.assign({}, defaultForm);
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
