<template>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('kqgl.smqk') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('BaseData')}}</div>
                </div>
                <Divider />
                <Form ref="form" :model="fromBaseData" label-position="right" :label-width="100" :rules="ruleValidate">
                    <FormItem :label="$t('kqgl.smne')" prop="note">
                        <Input  type="textarea" :rows="4"  v-model="fromBaseData.note" style="width: 34%"/>
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
  name: 'addGong',
  components: {
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
      modal_loading: false,
      mymoadlStat: this.modalstat,
      componetState: this.modalState,
      fromBaseData: {
         note: ''
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
    },
    editData() {
      console.log('this.editData', this.editData)
      this.fromBaseData.note = this.editData.note
      this.fromBaseData.id = this.editData.id
      this.fromBaseData.employeeId = this.editData.employeeId
    }
  },
  methods: {
    cancel () {
        this.mymoadlStat = false
        this.modal_loading = false
        this.reset()
        this.$emit('update:modalstat', false)
    },
    reset () {
      this.fromBaseData = {
        note: ''
      };
      this.$refs['form'].resetFields();
    },
    handsave () {
            this.modal_loading = true
       console.log(this.fromBaseData);
      this.$refs['form'].validate((valid) => {
        if (valid) {
          attendance.modifyPunchInfo(this.fromBaseData).then(res => {
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
</style>
