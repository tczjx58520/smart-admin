<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="720"
    :closable="false"
    :mask-closable="false"
    :styles="{ top: '10px' }"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>纠正</span>
    </div>
    <div>
      <Card dis-hover>
        <Divider />
        <Form
          ref="form"
          :model="addformbase"
          label-position="right"
          :label-width="100"
          :rules="ruleValidate"
        >
          <FormItem :label="$t('dqbz')">
            <span>{{ title }}</span>
          </FormItem>
          <FormItem :label="$t('jzjbr')" prop="entrustedPersonName">
            <Input
              v-model="addformbase.entrustedPersonName"
              @click.native="showemp_exa"
            ></Input>
          </FormItem>
        </Form>
        <Divider />
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
      :memberId="addformbase"
      :actionInfo="actionInfo"
      @updateStat="updateStat_emp"
    ></addemp>
    <!-- 新建结束============= -->
  </Modal>
</template>
<script>
import { entrust } from '@/api/entrust';
import addemp from '../addemp/modal';
import { utils } from '@/lib/util';
import { unDoFlowApi } from '@/api/unDoFlow';
export default {
  name: 'correct',
  components: {
    addemp
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    actionInfoId: null
  },
  created () {},
  mounted () {},
  data () {
    const validatePass2 = (rule, value, callback) => {
      if (
        this.addformbase.entrustedPersonName === '' ||
        this.addformbase.entrustedPersonName === null ||
        this.addformbase.entrustedPersonName === undefined
      ) {
        callback(new Error('Please select your emp'));
      } else {
        callback();
      }
    };
    const validatePass3 = (rule, value, callback) => {
      if (
        this.addformbase.empNames === '' ||
        this.addformbase.empNames === null ||
        this.addformbase.empNames === undefined
      ) {
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
      addformbase: {},
      ruleValidate: {
        entrustedPersonName: [
          {
            required: true,
            validator: validatePass2,
            trigger: 'change'
          }
        ]
      },
      // 新建员工弹窗
      visiable_emp: false,
      actionInfo: null,
      title: ''
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        // this.data = this.actionInfo[0].countersignRecordVos;
        this.gettoday();
        unDoFlowApi.getFlowRecordDetail(this.actionInfoId).then(res => {
          this.actionInfo = res.data.content;
          this.title = this.actionInfo[0].handleRecordVos[0].actionName;
        });
      }
    }
  },
  methods: {
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
    updateStat_emp (stat, row, type) {
      this.visiable_emp = stat;
      console.log('row=========', row.personName);
      this.addformbase.entrustedPersonName = row.personName;
      this.addformbase.entrustedPersonIds = row.id;
      // console.log('empList==================', row);
      // this.data = this.empList.map
    },
    delCounterSign (index) {
      this.data.splice(index, 1);
      const temp = this.addformbase.checkPerson.split(',');
      temp.splice(index, 1);
      this.addformbase.checkPerson = temp.join(',');
      console.log(this.addformbase);
    },
    addorg (selection) {
      console.log('selection==========>', selection);
      console.log(
        selection
          .map(item => {
            return item.title;
          })
          .join(',')
      );
      this.addformbase.organizationOaName = selection
        .map(item => {
          return item.title;
        })
        .join(',');
      this.addformbase.organizationOa = selection
        .map(item => {
          return item.id;
        })
        .join(',');
      console.log(this.addformbase.organizationOaName);
    },
    showemp_exa () {
      // if (
      //   typeof this.addformbase.testHandle === 'string' &&
      //   this.addformbase.testHandle !== null
      // ) {
      //   this.addformbase.testHandle.split(',');
      // }
      this.mytype = 2;
      this.visiable_emp = true;
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
      this.modal_loading = true;
      this.addformbase.createId = this.$store.state.user.userLoginInfo.userId;
      const data = {
        entrustedPersonId: this.addformbase.entrustedPersonIds,
        flowRecordId: this.actionInfo[0].handleRecordVos[0].flowRecordId
      };
      this.$refs.form.validate((valid) => {
        if (valid) {
          entrust.updatehandlerPerson(data).then(res => {
            if (res.ret === 200) {
              this.modal_loading = false;
              this.$emit('updateStat', false);
              this.$Message.success(res.msg);
              // this.reset();
            }
          });
        } else {
          this.$Message.error('验证不通过');
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
