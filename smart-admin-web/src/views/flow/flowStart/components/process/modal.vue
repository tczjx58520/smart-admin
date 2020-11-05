<template>
        <Modal v-model="mymoadlStat" class="add" width="1024" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('salaryjudge_view.initiationProcess') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <h2 style="text-align:center;">薪酬发放申请审批单</h2>
                <Divider dashed/>
                <List border size="large">
                    <ListItem>
                      <div style="padding:10px 60px;width:300px;"><h3>发放单位</h3> </div>
                      <div><Input style="width:500px" v-model="addformbase.organizeName" size="large" placeholder="large size" /></div>
                    </ListItem>
                    <ListItem>
                      <div style="padding:10px 60px;width:300px;"><h3>本月应发金额(元)</h3> </div>
                      <div><Input style="width:500px" v-model="addformbase.allShould" readonly size="large" placeholder="large size" /></div>
                    </ListItem>
                    <ListItem>
                      <div style="padding:10px 60px;width:300px;"><h3>本月实发金额(元)</h3> </div>
                      <div><Input style="width:500px" v-model="addformbase.allActual" readonly size="large" placeholder="large size" /></div>
                    </ListItem>
                    <ListItem>
                      <div style="padding:10px 60px;width:300px;"><h3>附件</h3> </div>
                      <div>
                        <Input style="width:500px" size="large" readonly v-model="addformbase.picPath" placeholder="附件地址" @click.native="LinktoPic">
                          <Upload :action="myupLoadUrl" :data="{ type: 3 }" slot="append" :on-success="mysuccess">
                              <Button icon="ios-cloud-upload-outline">上传附件</Button>
                          </Upload>
                        </Input>
                      </div>
                    </ListItem>
                    <ListItem>
                      <div style="padding:10px 60px;width:300px;"><h3>申请人</h3> </div>
                      <div><Input style="width:500px" v-model="addformbase.applyPersonName" readonly size="large" placeholder="large size" @click.native="selectemp"/></div>
                    </ListItem>
                </List>
            </Card>

        </div>
        <div slot="footer">
            <div>
                <Button style="margin-right:15px;" type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('salaryjudge_view.submitForApproval') }}</Button>
                <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
            </div>
        </div>
        <!-- 选择申请人 -->
        <addempSingle :modalstat = "visiable" @updateStat = "updateStat"></addempSingle>
    </Modal>
</template>
<script>
import {
  salaryjudgeApi
} from '@/api/salaryjudge';
import { organization } from '@/api/organization';
import addempSingle from '../addemp_single/modal';
export default {
  name: 'process',
  components: {
    addempSingle
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    calcinfo: null
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
    const validatePass3 = (rule, value, callback) => {
      if (this.addformbase.organizationOaName === '' && this.addformbase.organizationOaName === null && this.addformbase.organizationOaName === undefined) {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    const validatePass4 = (rule, value, callback) => {
      if (this.addformbase.empList === '' && this.addformbase.empList === null && this.addformbase.empList === undefined) {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    let baseUrl = process.env.VUE_APP_URL;
    return {
      myupLoadUrl: baseUrl + '/upload/uploadpic',
      visiable: false,
      isShowTree: false,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {
        picPath: '',
        organizeName: ''
      },
      ruleValidate: {
        title: [
          { required: true, message: 'The title cannot be empty', trigger: 'blur' }
        ],
        payDate: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        organizationOa: [
          { required: true, validator: validatePass3, trigger: 'blur' }
        ],
        personnel: [
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
      this.reset();
      this.getorg();
      console.log('calcinfo===================', this.calcinfo);
      let allShould = 0;
      let allActual = 0;
      for (const i in this.calcinfo.empSalaryVos) {
        allShould += this.calcinfo.empSalaryVos[i].shouldSalary;
        allActual += this.calcinfo.empSalaryVos[i].actualSalary;
      }
      this.addformbase.allShould = allShould;
      this.addformbase.allActual = allActual;
      this.addformbase.applyPersonId = this.$store.state.user.userLoginInfo.userId;
      this.addformbase.applyPersonName = this.$store.state.user.userLoginInfo.actualName;
      this.addformbase.salaryJudgeId = this.calcinfo.id;
    }
  },
  methods: {
    async getorg () {
      const result = await organization.organizationlist().then(res => {
        return res.data.content[0];
      });
      let name = result.organizeName;
      let id = result.id;
      console.log('res=============', result);
      this.addformbase.organizeName = name;
      this.addformbase.organizeId = id;
    },
    LinktoPic () {
      console.log(this.addformbase.picPath);
      if (this.addformbase.picPath !== '') {
        window.open(this.addformbase.picPath);
      }
    },
    mysuccess (response, file, fileList) {
      let id = response.data.content.picId;
      let picIds = response.data.content.picId;
      // picIds.push(response.data.content.picId);
      let picapath = response.data.content.picPath[0];
      console.log('picIds===============', picIds, response.data.content);
      this.$nextTick(() => {
        this.addformbase.picPath = picapath;
        this.$set(this.addformbase, 'picPath', picapath);
        this.addformbase.picIds = picIds;
        console.log(this.addformbase);
      });
    },
    selectemp () {
      console.log(1231231231231);
      this.visiable = true;
    },
    updateStat (state, row) {
      this.visiable = state;
      if (row) {
        this.addformbase.applyPersonId = row.id;
        this.addformbase.applyPersonName = row.personName;
      }
    },
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
      console.log(typeof (this.addformbase.empListIds), this.addformbase);
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
        picPath: '',
        organizeName: ''
      };
    },
    handsave () {
      this.modal_loading = true;
      console.log(this.addformbase);
      this.addformbase.createId = this.$store.state.user.userLoginInfo.userId;
      console.log('this.addformbase===========', this.addformbase);
      salaryjudgeApi.addapproveApplication(this.addformbase).then(res => {
        if (res.ret === 200) {
          this.$emit('updateStat', false);
          this.$Message.success(res.msg);
          this.modal_loading = false;
        } else {
          this.$Message.success(res.msg);
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
    .add /deep/ .ivu-divider-dashed {
      border-top:1px dashed #ccc;
    }
    .add /deep/ .ivu-input-group-large > .ivu-input-group-append {
      padding: 0;
    }
    .add /deep/ .ivu-upload-list {
      display: none;
    }
</style>
