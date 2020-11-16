<template>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ formTitle }}</span>
        </div>
        <div>
            <Card dis-hover>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('BaseData')}}</div>
                </div>
                <Divider />
                <Form ref="form" :model="fromBaseData" label-position="right" :label-width="100" :rules="ruleValidate">
                    <FormItem :label="$t('kqgl.bcmc')" prop="shiftSystemName">
                        <Input  v-model="fromBaseData.shiftSystemName" style="width: 34%"/>
                    </FormItem>
                    <FormItem :label="$t('kqgl.xqy')" prop="monday"> 
                        <Select v-model="fromBaseData.monday"  style="width: 34%">
                            <Option v-for="item in selectData" :value="item.id" :key="item.id">{{ item.shiftName }}</Option>
                        </Select>      
                    </FormItem>
                    <FormItem :label="$t('kqgl.xqe')" prop="tuesday">
                        <Select v-model="fromBaseData.tuesday"  style="width: 34%">
                            <Option v-for="item in selectData" :value="item.id" :key="item.id">{{ item.shiftName }}</Option>
                        </Select> 
                    </FormItem>
                    <FormItem :label="$t('kqgl.xqs')" prop="thursday">
                        <Select v-model="fromBaseData.thursday"  style="width: 34%">
                            <Option v-for="item in selectData" :value="item.id" :key="item.id">{{ item.shiftName }}</Option>
                        </Select> 
                    </FormItem>
                    <FormItem :label="$t('kqgl.xqsi')" prop="wednesday">
                        <Select v-model="fromBaseData.wednesday"  style="width: 34%">
                            <Option v-for="item in selectData" :value="item.id" :key="item.id">{{ item.shiftName }}</Option>
                        </Select> 
                    </FormItem>
                    <FormItem :label="$t('kqgl.xqw')" prop="friday"> 
                        <Select v-model="fromBaseData.friday"  style="width: 34%">
                            <Option v-for="item in selectData" :value="item.id" :key="item.id">{{ item.shiftName }}</Option>
                        </Select> 
                    </FormItem>
                    <FormItem :label="$t('kqgl.xql')" prop="saturday">
                        <Select v-model="fromBaseData.saturday"  style="width: 34%">
                            <Option v-for="item in selectData" :value="item.id" :key="item.id">{{ item.shiftName }}</Option>
                        </Select> 
                    </FormItem>
                    <FormItem :label="$t('kqgl.xqr')" prop="sunday">
                        <Select v-model="fromBaseData.sunday"  style="width: 34%">
                            <Option v-for="item in selectData" :value="item.id" :key="item.id">{{ item.shiftName }}</Option>
                        </Select> 
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
import {
  attendance
} from '@/api/attendance';
export default {
  name: 'secondFrom',
  components: {
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    modalState: {
        type: String,
        default: null
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
        selectData: [],
        formTitle: '',
      modal_loading: false,
      mymoadlStat: this.modalstat,
      componetState: this.modalState,
      fromBaseData: {
        createId:this.$store.state.user.userLoginInfo.userId
      },
      ruleValidate: {
        shiftSystemName: [
          { required: true, message: 'The shiftName cannot be empty', trigger: 'blur' }
        ],
        monday: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        tuesday: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        thursday: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        wednesday: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
         friday: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        saturday: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        sunday: [
          { required: true, validator: validatePass, trigger: 'change' }
        ]
      }
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      this.getSelectData()
    },
    modalState () {
        this.componetState = this.modalState
        if(this.componetState === '新建') {
            this.formTitle = this.$t('kqgl.xjbz')
        } else if (this.componetState === '修改'){
            this.formTitle = this.$t('kqgl.xgbz')
        }
    },
    editData() {
      console.log('this.editData', this.editData)
      this.fromBaseData = this.editData
        this.fromBaseData.createId = this.$store.state.user.userLoginInfo.userId

    }
  },
  methods: {
    async  getSelectData() {
        const parms = {
            pageNum: 1,
            pageSize: 99999999
        }
        try {
        let result = await attendance.findAllShiftInfo(parms);
        this.selectData = result.data.list;
      } catch (e) {
        console.error(e);
      }
      },
       handleClick (e) {
           console.log(e)   
           if(e) {
            this.open = !this.open;   
           }
                // this.open = !this.open;
            },
            handleChange (time) {
                // this.value3 = time;
            },
            handleClear () {
                this.open = false;
            },
            handleOk () {
                this.open = false;
            },
    cancel () {
        this.mymoadlStat = false
        this.modal_loading = false
        this.reset()
        this.$emit('update:modalstat', false)
    },
    reset () {
      this.fromBaseData = {
        createId:this.$store.state.user.userLoginInfo.userId
      };
      this.$refs['form'].resetFields();
    },
    handsave () {
            this.modal_loading = true
      if(this.componetState === '新建') {
      console.log(this.fromBaseData);
      const parmJson = JSON.stringify(this.fromBaseData)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          attendance.addShiftSystem(parmJson).then(res => {
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
        } else if (this.componetState === '修改'){
       console.log(this.fromBaseData);
      const parmJson = JSON.stringify(this.fromBaseData)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          attendance.modifyShiftSystem(this.fromBaseData).then(res => {
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
</style>
