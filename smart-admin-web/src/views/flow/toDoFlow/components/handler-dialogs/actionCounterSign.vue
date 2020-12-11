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
      <span>办理会签</span>
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
          <FormItem label="会签意见">
            <Input
              v-model="addformbase.signOpinion"
              type="textarea"
              style="width: 100%"
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
  </Modal>
</template>
<script>
import { unDoFlowApi } from '@/api/unDoFlow';
import { utils } from '@/lib/util';
import { countersign } from '@/api/countersign';
export default {
  name: 'stepaction',
  components: {
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    actionInfo: null,
    stat: null
  },
  created () {},
  mounted () {},
  filters: {
    statFilter (val) {
      const map = {
        2: '同意当前步骤',
        3: '退回',
        4: '拒绝',
        5: '保留意见'
      };
      return map[val];
    }
  },
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
      visiable_emp: false
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
      }
    }
  },
  methods: {
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
      const data = {
        countersignRecordId: this.actionInfo.id,
        signOpinion: this.addformbase.signOpinion
      };
      countersign.handlercountersign(data).then((res) => {
        if (res.ret === 200) {
          this.modal_loading = false;
          this.$emit('updateStat', false);
          this.$Message.success(res.msg);
          // this.reset();
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
