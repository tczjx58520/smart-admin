<template>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('kqgl.xinjianshoujikaoqinshezhi') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('BaseData')}}</div>
                </div>
                <Divider />
                <Form ref="form" :model="fromBaseData" label-position="right" :label-width="100" :rules="ruleValidate">
                  <FormItem :label="$t('kqgl.didianmingcheng')" prop="addressName">
                        <Input  style="width: 34%" v-model="fromBaseData.addressName"/>
                    </FormItem>
                    <FormItem :label="$t('kqgl.jingdu')" prop="longitude">
                        <Input   style="width: 34%" @click.native="selectLong" v-model="fromBaseData.longitude"/>
                        <selectInMap :modalstat.sync="mapStat" @mapdata='getMapData'/>
                    </FormItem>
                    <FormItem :label="$t('kqgl.weidu')" prop="latitude">
                        <Input   style="width: 34%" disabled v-model="fromBaseData.latitude"/>
                    </FormItem>
                    <FormItem :label="$t('kqgl.banjing')" prop="radius">
                        <Input   style="width: 34%"  v-model="fromBaseData.radius"/>
                    </FormItem>
                    <FormItem :label="$t('kqgl.syry')" prop="textareaData1">
                            <Input type="textarea" :autosize="{minRows: 4,maxRows: 15}" disabled style="width: 34%" v-model="fromBaseData.textareaData1"/>
                    </FormItem>
                    <div class="buttons">
                          <Button type="primary" @click="chooseOrganization">{{$t('kqgl.tjzz')}}</Button>
                    <moreOrganizationTree :modalstat.sync='moreOrganizationTreeVisible' @moreOrganizationData ='moreOrganizationData'/>

                        <Button type="primary" class="buttonItem" @click="chooseMoreEmp">{{$t('kqgl.tjry')}}</Button>
                        <moreSelectEmp :modalstat.sync="moreSelectEmpVisible" @empData='getEmpData'/>
                        
                            <Button class="buttonItem" @click="clearTextArea">{{$t('kqgl.qk')}}</Button>
                    </div>

                    <FormItem :label="$t('kqgl.jzry')" style="padding-top:20px;" prop="textareaData2">
                            <Input type="textarea" :autosize="{minRows: 4,maxRows: 15}" disabled style="width: 34%" v-model="fromBaseData.textareaData2"/>
                    </FormItem>
                    <div class="buttons">
                          <Button type="primary" @click="chooseOrganization2">{{$t('kqgl.tjzz')}}</Button>
                    <moreOrganizationTree :modalstat.sync='moreOrganizationTreeVisible2' @moreOrganizationData ='moreOrganizationData2'/>

                        <Button type="primary" class="buttonItem" @click="chooseMoreEmp2">{{$t('kqgl.tjry')}}</Button>
                        <moreSelectEmp :modalstat.sync="moreSelectEmpVisible2" @empData='getEmpData2'/>

                            <Button class="buttonItem" @click="clearTextArea2">{{$t('kqgl.qk')}}</Button>
                    </div>
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
import selectInMap from './selectInMap'
import moreOrganizationTree from '@/components/moreOrganizationTree'
import moreSelectEmp from '@/components/moreSelectEmp'


import {
  attendance
} from '@/api/attendance';
export default {
  name: 'firstFrom',
  components: {
      selectEmp,
      organization,
      selectInMap,
      moreOrganizationTree,
      moreSelectEmp
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: null
    },
    modalState: {
      type: String,
      default: null
    }
  },
  created () {
    
  },
  mounted () {
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (!this.fromBaseData.longitude) {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    return {
      editformData: {},
      moreSelectEmpVisible2: false,
moreOrganizationTreeVisible2: false,
      textareaOrgIds2: [],
      textareaEmpIds2: [],
      textareaData4: '',
      textareaData3: '',
      // 
      textareaOrgIds: [],
      textareaEmpIds: [],
      moreSelectEmpVisible: false,
      textareaData2: '',
      textareaData: '',
      moreOrganizationTreeVisible: false,
      mapStat: false,
        orgStat: false,
        employeeName: this.$store.state.user.userLoginInfo.actualName,
        organazationName: this.$store.state.user.userLoginInfo.organizationOaName,
        empSata: false,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      componetState: this.modalState,
      fromBaseData: {
        addressName: '',
        textareaData1: '',
        textareaData2: ''

      },
      ruleValidate: {
        addressName: [
          { required: true, message: 'The addressName cannot be empty', trigger: 'blur' }
        ],
        longitude:  [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        latitude:  [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        radius:  [
          { required: true, message: 'The latitude cannot be empty', trigger: 'blur' }
        ],
        textareaData1:  [
          { required: true, message: 'The textareaData1 cannot be empty', trigger: 'blur' }
        ],
        textareaData2:  [
          { required: true, message: 'The textareaData2 cannot be empty', trigger: 'blur' }
        ],
      }
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      console.log('this.$store.state.user.userLoginInfo', this.$store.state.user.userLoginInfo)
    },
    editData() {
    this.fromBaseData.addressName = this.editData.addressName
     this.fromBaseData.id = this.editData.id
     this.fromBaseData.latitude = this.editData.latitude
     this.fromBaseData.longitude = this.editData.longitude
     this.fromBaseData.radius = this.editData.radius
     let firstTextDataEmp1 = this.editData.attendaceAddressForEmpolyee.filter(item => {
       return item.status === 0
     })
     console.log(firstTextDataEmp1)
     let firstTextDataOrg1 = this.editData.attendanceAddressForOrganization.filter(item => {
       return item.status === 0
     })

     this.textareaData = firstTextDataOrg1.map(item => {
       return item.organizationName
     }).join(',')
      this.textareaData2 = firstTextDataEmp1.map(item => {
       return item.employeeName
     }).join(',')
      this.fromBaseData.textareaData1 = this.textareaData + '             ' + this.textareaData2
      this.textareaEmpIds = firstTextDataEmp1.map(item => {
       return {
         employeeId: item.id,
          status: item.status,
       }
     })
      this.textareaOrgIds = firstTextDataOrg1.map(item => {
       return {
         organizationId: item.id,
          status: item.status,
       }
     })




     let firstTextDataEmp2 = this.editData.attendaceAddressForEmpolyee.filter(item => {
       return item.status === 1
     })
     console.log(firstTextDataEmp1)
     let firstTextDataOrg2 = this.editData.attendanceAddressForOrganization.filter(item => {
       return item.status === 1
     })

this.textareaData = firstTextDataOrg2.map(item => {
       return item.organizationName
     }).join(',')
      this.textareaData2 = firstTextDataEmp2.map(item => {
       return item.employeeName
     }).join(',')
      this.fromBaseData.textareaData2 = this.textareaData3 + '             ' + this.textareaData4
      this.textareaEmpIds2 = firstTextDataEmp2.map(item => {
       return {
         employeeId: item.id,
          status: item.status,
       }
     })
      this.textareaOrgIds2 = firstTextDataOrg2.map(item => {
       return {
         organizationId: item.id,
          status: item.status,
       }
     })


    },
    modalState() {
      this.componetState = this.modalState

    }
  },
  methods: {
clearTextArea2() {
      this.textareaData4 = ''
      this.textareaData3 = ''
      this.fromBaseData.textareaData2 = ''
      this.textareaEmpIds2 = []
      this.textareaOrgIds2 = []
    },
    getEmpData2(val) {
      console.log(val)
      this.fromBaseData.textareaData2 = ''
      this.textareaEmpIds2 = []
       this.textareaData4 = val.names
      this.fromBaseData.textareaData2 = this.textareaData3 + '             ' +  this.textareaData4
      const empIds = val.empIds.split(',')
      this.textareaEmpIds2 = empIds.map(item => {
        return {
          employeeId: item,
          status: 1,
        }
      })
      console.log('this.fromBaseData', this.fromBaseData)

    },
    chooseMoreEmp2() {
      this.moreSelectEmpVisible2 = true
    },
    moreOrganizationData2(val){
      this.fromBaseData.textareaData2 = ''
      this.textareaOrgIds2 = []
      this.textareaData3 = val.organizationOaName
      this.fromBaseData.textareaData2 = this.textareaData3 + '             ' + this.textareaData4
      this.textareaOrgIds2 = val.organizationOa.map(item => {
        return {
          organizationId: item,
          status: 1,
        }
      })
    },
    chooseOrganization2() {
      this.moreOrganizationTreeVisible2 = true
    },

//
    clearTextArea() {
      this.textareaData = ''
      this.textareaData2 = ''
      this.fromBaseData.textareaData1 = ''
      this.textareaEmpIds = []
      this.textareaOrgIds = []
    },
    getEmpData(val) {
      console.log(val)
      this.fromBaseData.textareaData1 = ''
      this.textareaEmpIds = []
       this.textareaData2 = val.names
      this.fromBaseData.textareaData1 = this.textareaData + '             ' +  this.textareaData2
      const empIds = val.empIds.split(',')
      this.textareaEmpIds = empIds.map(item => {
        return {
          employeeId: item,
          status: 0,
        }
      })
      console.log('this.fromBaseData', this.fromBaseData)

    },
    chooseMoreEmp() {
      this.moreSelectEmpVisible = true
    },
    moreOrganizationData(val){
      this.fromBaseData.textareaData1 = ''
      this.textareaOrgIds = []
      this.textareaData = val.organizationOaName
      this.fromBaseData.textareaData1 = this.textareaData + '             ' + this.textareaData2
      this.textareaOrgIds = val.organizationOa.map(item => {
        return {
          organizationId: item,
          status: 0,
        }
      })
    },
    chooseOrganization() {
      this.moreOrganizationTreeVisible = true
    },
    getMapData(val) {
      console.log(val)
      this.fromBaseData.longitude = val.lang
      this.fromBaseData.latitude = val.lat

    },
    selectLong() {
      this.mapStat = true
    },
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
       addressName: '',
        textareaData1: '',
        textareaData2: ''
      };
       this.textareaData4 = ''
      this.textareaData3 = ''
      this.fromBaseData.textareaData2 = ''
      this.textareaEmpIds2 = []
      this.textareaOrgIds2 = []

       this.textareaData = ''
      this.textareaData2 = ''
      this.fromBaseData.textareaData1 = ''
      this.textareaEmpIds = []
      this.textareaOrgIds = []
      this.$refs['form'].resetFields();
    },
    handsave () {
            this.modal_loading = true
       console.log(this.fromBaseData);
       this.fromBaseData.attendanceAddressForOrganization = this.textareaOrgIds.concat(this.textareaOrgIds2)
       this.fromBaseData.attendaceAddressForEmpolyee = this.textareaEmpIds.concat(this.textareaEmpIds2)

       if(this.componetState === '修改') {

         this.$refs['form'].validate((valid) => {
        if (valid) {
          attendance.addAddressForMobile(this.fromBaseData).then(res => {
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

       } else {
this.$refs['form'].validate((valid) => {
        if (valid) {
          attendance.addAddressForMobile(this.fromBaseData).then(res => {
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

    .buttons{
    display: flex;
    padding-left: 20%;
}
.buttonItem{
    margin-left: 20px;
}
</style>
