<template>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('tjfl') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('BaseData')}}</div>
                </div>
                <Divider />
                <Form ref="form" :model="addformbase" label-position="right" :label-width="100" :rules="ruleValidate">
                    <FormItem :label="$t('flowClassification_view.categoryName')" prop="categoryName">
                        <Input v-model="addformbase.categoryName" />
                    </FormItem>
                    <FormItem :label="$t('flowClassification_view.description')">
                        <Input type="textarea" v-model="addformbase.remark" />
                    </FormItem>
                    <FormItem :label="$t('fqqx')">
                        <div style="display:flex;">
                          <div>
                            <Input type="textarea" v-model="addformbase.startOrganize" @focus="selectOrg"/>
                          </div>
                          <div>
                            <Input type="textarea" v-model="addformbase.startPost" @focus="selectPost"/>
                          </div>
                          <div>
                            <Input type="textarea" v-model="addformbase.startEmp" @focus="selectEmp"/>
                          </div>
                        </div>
                    </FormItem>
                    <FormItem :label="$t('jzfq')">
                        <div>
                          <div>按部门</div>
                          <div>按岗位</div>
                          <div>按人员</div>
                        </div>
                    </FormItem>
                    <FormItem :label="$t('cyqx')">
                        <div>
                          <div>按部门</div>
                          <div>按岗位</div>
                          <div>按人员</div>
                        </div>
                    </FormItem>
                    <FormItem :label="$t('glqx')">
                        <div>
                          <div>按部门</div>
                          <div>按岗位</div>
                          <div>按人员</div>
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
        <addemp :modalstat = "visiable_emp" :memberId="addformbase.empListIds" @updateStat = "updateStat_emp"></addemp>
        <addorg :modalstat = "visiable_org" :type="mytype" :memberId="addformbase" @updateStat = "updateStat_org"></addorg>
        <addpost :modalstat = "visiable_post" :memberId="addformbase" @updateStat = "updateStat_post"></addpost>
        <!-- 新建结束============= -->
    </Modal>
</template>
<script>
import $ from 'jquery';
import {
  welfareApi
} from '@/api/welfare';
import { FlowCategoryApi } from '@/api/flowClassification';
import addemp from '../addemp/modal';
import addorg from '../add_org/modal';
import addpost from '../addpost/modal';
export default {
  name: 'addModal',
  components: {
    addemp
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
      },
      ruleValidate: {
        categoryName: [
          { required: true, message: 'The categoryName cannot be empty', trigger: 'blur' }
        ]
      },
      // 新建员工弹窗
      visiable_emp: false,
      visiable_org: false,
      visiable_post: false
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
    }
  },
  methods: {
    // 选择人员部门岗位
    selectOrg () {
      console.log('zhixing==========');
      this.visiable_org = true;
    },
    selectPost () {
      this.visiable_post = true;
    },
    selectEmp () {
      this.showemp();
    },
    // ==============end========
    updateStat_emp (stat, empList) {
      this.visiable_emp = stat;
      this.addformbase.empList = empList.names;
      this.addformbase.empListIds = empList.empIds;
    },
    showemp () {
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
        categoryName: '',
        remark: ''
      };
      this.$refs['form'].resetFields();
    },
    handsave () {
      console.log(this.addformbase);
      this.addformbase.createPersonId = this.$store.state.user.userId;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          FlowCategoryApi.addGroup(this.addformbase).then(res => {
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
