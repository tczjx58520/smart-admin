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
                    <FormItem :label="$t('OrganizationName')" prop="selectTextData">
                        <Input type="textarea" :rows="4"  v-model="selectTextData" style="width: 34%" @click.native="chooseOrganzation"/>
                    <moreOrganizationTree :modalstat.sync='moreOrganizationTreeVisible' @moreOrganizationData ='moreOrganizationData'/>

                    </FormItem>
                    <FormItem :label="$t('kqgl.bz')" prop="shiftSystemId">
                        <Select v-model="fromBaseData.shiftSystemId"  style="width: 34%">
                            <Option v-for="item in selectData" :value="item.id" :key="item.id">{{ item.shiftSystemName }}</Option>
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

import moreOrganizationTree from '@/components/moreOrganizationTree';
export default {
  name: 'thirdFrom',
  components: {
    moreOrganizationTree
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
    const validatePass2 = (rule, value, callback) => {
      if (!this.selectTextData) {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    return {
      selectTextData: '',
      moreOrganizationTreeVisible: false,
      selectData: [],
      formTitle: '',
      modal_loading: false,
      mymoadlStat: this.modalstat,
      componetState: this.modalState,
      fromBaseData: {
        createId: this.$store.state.user.userLoginInfo.userId
      },
      ruleValidate: {
        shiftSystemId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        selectTextData: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ]
      }
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      this.getSelectData();
    },
    modalState () {
      this.componetState = this.modalState;
      if (this.componetState === '新建') {
        this.formTitle = this.$t('kqgl.xjbzu');
      } else if (this.componetState === '修改') {
        this.formTitle = this.$t('kqgl.xgbz');
      }
    },
    editData () {
      console.log('this.editData', this.editData);
      this.fromBaseData = this.editData;
      this.fromBaseData.createId = this.$store.state.user.userLoginInfo.userId;
    }
  },
  methods: {
    moreOrganizationData (val) {
      this.fromBaseData.organizationId = val.organizationOa;
      this.selectTextData = val.organizationOaName;
    },
    chooseOrganzation () {
      console.log('test');
      this.moreOrganizationTreeVisible = true;
    },
    async  getSelectData () {
      const parms = {
        pageNum: 1,
        pageSize: 99999999
      };
      try {
        let result = await attendance.findAllShiftSystemInfo(parms);
        this.selectData = result.data.list;
      } catch (e) {
        console.error(e);
      }
    },
    handleClick (e) {
      console.log(e);
      if (e) {
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
      this.mymoadlStat = false;
      this.modal_loading = false;
      this.reset();
      this.$emit('update:modalstat', false);
    },
    reset () {
      this.fromBaseData = {
        createId: this.$store.state.user.userLoginInfo.userId
      };
      this.$refs['form'].resetFields();
    },
    handsave () {
      this.modal_loading = true;
      if (this.componetState === '新建') {
        console.log(this.fromBaseData);
        const parmJson = JSON.stringify(this.fromBaseData);
        this.$refs['form'].validate((valid) => {
          if (valid) {
            attendance.addShiftGroup(parmJson).then(res => {
              if (res.ret === 200) {
                this.$Message.success(res.msg);
                this.mymoadlStat = false;
                this.$emit('update:modalstat', false);
                this.$emit('restList', true);
                this.reset();
              }
              this.modal_loading = false;
            });
          } else {
            this.modal_loading = false;

            this.$Message.error('Fail!');
          }
        });
      } else if (this.componetState === '修改') {
        console.log(this.fromBaseData);
        const parmJson = JSON.stringify(this.fromBaseData);
        this.$refs['form'].validate((valid) => {
          if (valid) {
            attendance.modifyShiftSystem(this.fromBaseData).then(res => {
              if (res.ret === 200) {
                this.$Message.success(res.msg);
                this.mymoadlStat = false;
                this.$emit('update:modalstat', false);
                this.$emit('restList', true);
                this.reset();
              }
              this.modal_loading = false;
            });
          } else {
            this.modal_loading = false;

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
