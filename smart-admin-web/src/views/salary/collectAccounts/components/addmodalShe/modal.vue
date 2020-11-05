<template>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('collectAccounts_view.modifySet') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <div style="display:flex; align-items: center;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('BaseData')}}</div>
                </div>
                <Divider />
                <Form ref="form" :model="addformbase" label-position="right" :label-width="100" :rules="ruleValidate">
                  <FormItem :label="$t('collectAccounts_view.title')" prop="name">
                        <Input v-model="addformbase.name"></Input>
                    </FormItem>
                    <FormItem :label="$t('collectAccounts_view.applicablePeople')" prop="empList">
                        <Input v-model="addformbase.empList" readonly @click.native="showemp" style="width: 100%"></Input>
                    </FormItem>
                    <FormItem :label="$t('collectAccounts_view.socialSecurity')" prop="socialSecurity">
                        <Checkbox v-model="socialSecurity">{{ $t('collectAccounts_view.NeedToBuy') }}</Checkbox>
                    </FormItem>
                    <FormItem v-if="socialSecurity" :label="$t('collectAccounts_view.SIbase')" prop="SIbase">
                        <Select v-model="addformbase.socialSecurityId" style="width:100%">
                          <Option v-for="item in SheList" :value="item.id" v-bind:key="item.id">{{ item.basicMoney }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('collectAccounts_view.accumulationFund')" prop="accumulationFund">
                        <Checkbox v-model="accumulationFund">{{ $t('collectAccounts_view.NeedToBuy') }}</Checkbox>
                    </FormItem>
                    <FormItem v-if="accumulationFund" :label="$t('collectAccounts_view.EPFbase')" prop="EPFbase">
                        <Select v-model="addformbase.accumulationFundId" style="width:100%">
                          <Option v-for="item in GongList" :value="item.id" v-bind:key="item.id">{{ item.basicMoney }}</Option>
                        </Select>
                    </FormItem>
                </Form>
                <div style="display:flex; align-items: center;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('collectAccounts_view.salaryItems')}}</div>
                </div>
                <Divider />
                <Row>
                  <CheckboxGroup v-model="allitems">
                    <Col span="6" v-for="(item, index) in itemsList" :key="index">
                      <Checkbox :label="item.id">
                        <span> {{ item.name }} </span>
                      </Checkbox>
                    </Col>
                  </CheckboxGroup>
                </Row>
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
import {
  salaryOptionApi
} from '@/api/salaryOption';
import { socialSecurityFundApi } from '@/api/socialSecurityFund';
import { collectAccountsApi } from '@/api/collectAccounts';
import addemp from '../addemp/modal';
export default {
  name: 'addShe',
  components: {
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
    
  },
  mounted () {
    this.getBaseInfo();
  },
  data () {
    const validatePass2 = (rule, value, callback) => {
      if (this.addformbase.empList === [] && this.addformbase.empList === null && this.addformbase.empList === undefined) {
        callback(new Error('Please enter your emp'));
      } else {
        callback();
      }
    };
    const validatePass3 = (rule, value, callback) => {
      if (this.addformbase.socialSecurityId === '' && this.addformbase.socialSecurityId === null && this.addformbase.socialSecurityId === undefined) {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    const validatePass4 = (rule, value, callback) => {
      if (this.addformbase.accumulationFundId === '' && this.addformbase.accumulationFundId === null && this.addformbase.accumulationFundId === undefined) {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    return {
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
        empListIds: null
      },
      ruleValidate: {
        name: [
          { required: true, message: 'The title cannot be empty', trigger: 'blur' }
        ],
        empList: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        SIbase: [
          { required: true, validator: validatePass3, trigger: 'blur' }
        ],
        EPFbase: [
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
      if (this.modalstat) {
        this.addformbase = this.editinfo;
        console.log('修改数据================>', this.addformbase);
        this.allitems = this.addformbase.salaryOptionIds.split(',').map(Number);
        console.log('this.allitem===============>', this.allitems);
        if (this.addformbase.socialSecurityId !== '' && this.addformbase.socialSecurityId !== null) {
          this.socialSecurity = true;
        } else {
          this.socialSecurity = false;
        }
        if (this.addformbase.accumulationFundId !== '' && this.addformbase.accumulationFundId !== null) {
          this.accumulationFund = true;
        } else {
          this.accumulationFund = false;
        }
        this.addformbase.empListIds = this.addformbase.collectAccountEmpVos.map(item => { return item.empId; }).join(',');
        this.addformbase.empList = this.addformbase.collectAccountEmpVos.map(item => { return item.empName; }).join(',');
      }
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
    // 获取新建基础数据
    async getBaseInfo () {
      const searchForm = {
        pageNum: 1,
        pageSize: 999
      };
      let GONG = await socialSecurityFundApi.getGongList(searchForm);
      let SHE = await socialSecurityFundApi.getSheList(searchForm);
      let salaryItems = await salaryOptionApi.getsalaryOptionList(searchForm);
      this.GongList = GONG.data.content.list;
      this.SheList = SHE.data.content.list;
      this.itemsList = salaryItems.data.content.list;
      this.allitems = salaryItems.data.content.list.map(item => { return item.id; });
    },
    addorg (selection) {
      console.log('selection==========>', selection);
      console.log(selection.map(item => { return item.title; }).join(','));
      this.addformbase.organizationOaName = selection.map(item => { return item.title; }).join(',');
      this.addformbase.organizationOa = selection.map(item => { return item.id; }).join(',');
      console.log(this.addformbase.organizationOaName);
    },
    showemp () {
      console.log('新建员工');
      console.log(typeof (this.addformbase.empListIds));
      if (typeof (this.addformbase.empListIds) === 'string' && this.addformbase.empListIds !== null) {
        this.addformbase.empListIds.split(',');
      }
      this.visiable_emp = true;
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    reset () {
      this.socialSecurity = true;
      this.accumulationFund = true;
      for (let key in this.addformbase) {
        delete this.addformbase[key];
      }
      this.$refs['form'].resetFields();
    },
    handsave () {
      this.modal_loading = true;
      console.log(this.addformbase);
      this.addformbase.operatId = this.$store.state.user.userLoginInfo.userId;
      this.addformbase.salaryOptionIds = this.allitems.join(',');
      if (this.socialSecurity === false) {
        delete this.addformbase['socialSecurityId'];
      }
      if (this.accumulationFund === false) {
        delete this.addformbase['accumulationFundId'];
      }
      console.log(this.addformbase);
      this.$refs['form'].validate((valid) => {
        if (valid) {
          collectAccountsApi.updatecollectAccounts(this.addformbase).then(res => {
            if (res.ret === 200) {
              this.modal_loading = false;
              this.$emit('updateStat', false);
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
