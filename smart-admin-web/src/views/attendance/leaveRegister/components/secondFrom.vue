<template>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('kqgl.xiaojiadengji') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('BaseData')}}</div>
                </div>
                <Divider />
                <Form ref="form" :model="fromBaseData" label-position="right" :label-width="100" :rules="ruleValidate">
                   <FormItem :label="$t('kqgl.liuchengbianhao')">
                        <Input  style="width: 34%"/>
                    </FormItem>
                    <FormItem :label="$t('kqgl.biaoti')">
                        <Input   style="width: 34%"/>
                    </FormItem>
                    <FormItem :label="$t('kqgl.zhongyaodengji')">
                        <Input   style="width: 34%"/>
                    </FormItem>
                    <FormItem :label="$t('kqgl.shengqingren')">
                        <Input  v-model="employeeName" disabled style="width: 34%" @click.native="chooseEmp"/>
                    </FormItem>
                    <selectEmp :modalstat.sync='empSata' @selectData='selectData'/>
                    <FormItem :label="$t('kqgl.shusuozhuzhi')">
                        <Input  v-model="organazationName" disabled style="width: 34%" @click.native="chooseOrg"/>
                        <organization :modalstat.sync="orgStat" @organizationData="getOrgData"/>
                    </FormItem>
                    <div class="nomalDiv">
                        <span class="zhi">{{$t('kqgl.shiyongnianjai')}}</span>
                        <InputNumber :max="100" :min="0" disabled v-model="fromBaseData.useAnnual"  style="width: 20%"></InputNumber>
                        <div class="zhi">{{$t('kqgl.tian')}}</div>
                        <div class="zhi">{{$t('kqgl.shiyongtiaoxiu')}}</div>
                        <InputNumber :max="100" :min="0" disabled v-model="fromBaseData.useExchangeDay"  style="width: 20%"></InputNumber>
                        <div class="zhi">{{$t('kqgl.tian')}}</div>
                    </div>
                    <div class="nomalDiv">
                        <span class="zhi">{{$t('kqgl.qingjiashijian')}}</span>
                        <!-- <DatePicker type="datetimerange" disabled v-model="times" placeholder="Select date" style="width: 40%"></DatePicker> -->
                        <Input v-model="qingjiatian" disabled   style="width: 50%"/>

                        <!-- <div class="zhi">{{$t('kqgl.qingjiaheji')}}</div>
                        <InputNumber :max="100" :min="0" v-model="fromBaseData.totalTime"  style="width: 20%"></InputNumber>
                        <div class="zhi">{{$t('kqgl.tian')}}</div> -->
                    </div>
                    <FormItem :label="$t('kqgl.qingjiashiyou')">
                        <Input  v-model="fromBaseData.reason" disabled style="width: 34%"/>
                    </FormItem>
                    <FormItem :label="$t('kqgl.qingjialeixing')">
                        <Select v-model="fromBaseData.type" disabled style="width: 34%">
                            <Option :value="0">{{$t('kqgl.bingjia')}}</Option>
                            <Option :value="1">{{$t('kqgl.shijia')}}</Option>
                            <Option :value="2">{{$t('kqgl.nianjia')}}</Option>
                             <Option :value="3">{{$t('kqgl.hunjia')}}</Option>
                            <Option :value="4">{{$t('kqgl.peichanjia')}}</Option>
                            <Option :value="5">{{$t('kqgl.chanjia')}}</Option>
                            <Option :value="6">{{$t('kqgl.shangjia')}}</Option>
                            <Option :value="7">{{$t('kqgl.qita')}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('kqgl.qingjiaheji')">
                        <InputNumber :max="100" :min="0" v-model="fromBaseData.totalTime"  style="width: 20%"></InputNumber>
                    </FormItem>
                     <FormItem :label="$t('kqgl.xiaojiatianshu')">
                        <InputNumber :max="100" :min="0" v-model="fromBaseData.terminalHolidayCount"  style="width: 20%"></InputNumber>
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
    </Modal>
</template>
<script>
import $ from 'jquery';
import selectEmp from '@/components/selectEmp'
import organization from '@/components/organization'
import {
  attendance
} from '@/api/attendance';
export default {
  name: 'secondFrom',
  components: {
      selectEmp,
      organization
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: null
    }
  },
  created () {
    
  },
  mounted () {
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    return {
      qingjiatian: '',
        orgStat: false,
        employeeName: this.$store.state.user.userLoginInfo.actualName,
        organazationName: this.$store.state.user.userLoginInfo.organizationOaName,
        empSata: false,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      componetState: this.modalState,
      fromBaseData: {

      },
      ruleValidate: {
        note: [
          { required: true, message: 'The note cannot be empty', trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      console.log('this.$store.state.user.userLoginInfo', this.$store.state.user.userLoginInfo)
    },
    editData() {
    //   console.log('this.editData', this.editData)
      this.fromBaseData = this.editData
      this.qingjiatian = this.editData.startTime + ' - ' + this.editData.endTime
    }
  },
  methods: {
      chooseOrg() {
          this.orgStat = true
      },
      getOrgData(val) {
        //   console.log(val)
          this.fromBaseData.organazationId = val.id
          this.organazationName = val.title
      },
      changeStartTime(val) {
          this.fromBaseData.startTime = val
          this.countTotalTime()
      },
      changeEndTime(val) {
          this.fromBaseData.endTime = val
          
          this.countTotalTime()
      },
      countTotalTime() {
          if (this.fromBaseData.endTime && this.fromBaseData.startTime) {
              let hours1 =Number(this.fromBaseData.startTime.substring(0, 2)) 
                let hours2 =Number(this.fromBaseData.endTime.substring(0, 2))
                let minute1 =Number(this.fromBaseData.startTime.substring(3, 5)) 
                let minute2 =Number(this.fromBaseData.endTime.substring(3, 5))
                 let second1 =Number(this.fromBaseData.startTime.substring(6, 8)) 
                let second2 =Number(this.fromBaseData.endTime.substring(6, 8))
                // console.log('minute1', minute1, 'second1', second1, 'hours1', hours1)
                let diffHours = hours2 - hours1
                let diffminutes = minute2 - minute1
                this.fromBaseData.totalTime = diffHours + diffminutes/60
          }
      },
      selectData(val) {
          console.log('val', val)
          this.fromBaseData.employeeId = val.id
          this.employeeName = val.personName
      },
      chooseEmp() {
          this.empSata = true
      },
    cancel () {
        this.mymoadlStat = false
        this.modal_loading = false
        this.reset()
        this.$emit('update:modalstat', false)
    },
    reset () {
      this.fromBaseData = {
         employeeId: this.$store.state.user.userLoginInfo.userId,
        organazationId: this.$store.state.user.userLoginInfo.organizationOa,
        reason: '',
        startTime: null,
        endTime: null,
        totalTime: 0,
        type: 0,
        whetherExchange: 0,
      };
      this.$refs['form'].resetFields();
    },
    handsave () {
            this.modal_loading = true
       console.log(this.fromBaseData);
       this.fromBaseData.terminalHoliday = 0
      this.$refs['form'].validate((valid) => {
        if (valid) {
          attendance.addTerminalLeave(this.fromBaseData).then(res => {
            if (res.ret === 200) {
              this.$Message.success(res.msg);
              this.mymoadlStat = false
              this.$emit('update:modalstat', false)
              this.$emit('restList',  true)
              this.reset()
            }
            this.modal_loading = false
          });
        } else {
            this.modal_loading = false

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

    .nomalDiv {
        display: flex;
        align-items: center;
            padding-left: 35px;
    padding-bottom: 20px;
    }
    .zhi {
        padding: 0 10px;
    }
    .zhi:nth-child(1) {
        padding-left: 0;
    }
    .jaibanheji {
        padding: 0 10px;

    }
</style>
