<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="720"
    :closable="false"
    :mask-closable="false"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>{{ $t("tjjsgz") }}</span>
    </div>
    <div>
      <Card dis-hover>
        <div
          style="
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e1e1e1;
            padding-bottom: 20px;
          "
        >
          <div
            style="
              width: 4px;
              height: 20px;
              background: #2d8cf0;
              margin-right: 15px;
            "
          ></div>
          <div>{{ $t("BaseData") }}</div>
        </div>
        <Divider />
        <Form
          ref="form"
          :model="addformbase"
          label-position="right"
          :label-width="250"
          :rules="ruleValidate"
          inline
        >
          <FormItem :label="$t('tjlx')" style="width: 80%">
            <RadioGroup v-model="addformbase.conditionType">
              <Radio :label="1">{{ $t("dmyj") }}</Radio>
              <Radio :label="2">{{ $t("kysj") }}</Radio>
            </RadioGroup>
          </FormItem>
          <div v-if="addformbase.conditionType === 1">
          <FormItem :label="$t('sjwcz')" style="width: 80%">
            <Select v-model="addformbase.actualFinish" clearable>
              <Option :value="1">{{ $t("xy") }}</Option>
              <Option :value="2">{{ $t("dydy") }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('mbz')" style="width: 80%">
            <Input v-model="addformbase.target">
              <span slot="append">%</span>
            </Input>
          </FormItem>
          <FormItem :label="$t('jsx')" style="width: 80%">
            <CheckboxGroup v-model="addformbase.calItem1Array">
              <Checkbox
                v-for="(item, index) in calItme"
                :key="index"
                :label="item.value"
                >{{ item.label }}</Checkbox
              >
            </CheckboxGroup>
          </FormItem>
          </div>
          <div v-else>
            <FormItem :label="$t('dmkysj')" style="width: 80%">
            <Select v-model="addformbase.openCondition" clearable>
              <Option :value="1">{{ $t("diyu") }}</Option>
              <Option :value="2">{{ $t("dayu") }}</Option>
              <Option :value="3">{{ $t("fw") }}</Option>
            </Select>
          </FormItem>
          <FormItem v-if="addformbase.openCondition !== 3" :label="$t('mbz')" style="width: 80%">
            <Input v-model="addformbase.beginMonth">
              <span slot="append">月</span>
            </Input>
          </FormItem>
          <FormItem v-else :label="$t('mbz')" style="width: 80%">
            <Input v-model="addformbase.beginMonth">
              <span slot="append">月</span>
            </Input>
            <span>{{ $t('to') }}</span>
            <Input v-model="addformbase.endMonth">
              <span slot="append">月</span>
            </Input>
          </FormItem>
          <FormItem :label="$t('jsx')" style="width: 80%">
            <CheckboxGroup v-model="addformbase.calItem2Array" @on-change="selectArray">
              <Checkbox
                v-for="(item, index) in calItme"
                :key="index"
                :label="item.value"
                >{{ item.label }}
                <i-switch v-model="addformbase.testObj[item.value]" size="large" @on-change="selectThisItem($event,item)">
                    <span slot="open">{{ $t('half') }}</span>
                    <span slot="close">{{ $t('all') }}</span>
                </i-switch>
              </Checkbox>
            </CheckboxGroup>
          </FormItem>
          </div>
        </Form>
      </Card>
    </div>
    <div slot="footer">
      <ButtonGroup>
        <Button
          type="primary"
          size="large"
          :loading="modal_loading"
          @click="handsave"
          >{{ $t("Save") }}
        </Button>
        <Button type="error" size="large" @click="cancel">
          {{ $t("Close") }}
        </Button>
      </ButtonGroup>
    </div>
  </Modal>
</template>
<script>
const defaultForm = {
  conditionType: 1,
  actualFinish: 1,
  openCondition: 1,
  target: 0,
  beginMonth: 0,
  endMonth: 0,
  calItem1Array: [],
  calItem2Array: []
};
export default {
  name: 'add-leader-modal',
  components: {
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null,
    isedit: {
      type: Boolean,
      default: false
    },
    calItme: {
      type: Array,
      default: () => []
    }
  },
  created () {},
  mounted () {},
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    return {
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: Object.assign({}, defaultForm),
      ruleValidate: {
        categoryName: [
          {
            required: true,
            message: 'The categoryName cannot be empty',
            trigger: 'blur'
          }
        ]
      },
      tranferValue: null,
      mytype: null,
      testObj: {}
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        this.addformbase.testObj = {};
        this.calItme.map((item, index) => {
          this.addformbase.testObj[item.value] = false;
        });
        if (this.isedit) {
          this.addformbase = Object.assign({}, this.editinfo);
        }
      }
    }
  },
  methods: {
    selectThisItem (val, item) {
      const jungle = this.addformbase.calItem2Array.findIndex(son => {
        return Number(son) === Number(item.value);
      });
      console.log('jungle====', jungle, val);
      if (val && (jungle === -1)) {
        this.addformbase.calItem2Array.push(item.value);
      } else if (!val && (jungle !== -1)) {
        this.addformbase.calItem2Array.splice(jungle, 1);
      }
    },
    selectArray (val) {
      let temp = this._.cloneDeep(this.calItme);
      const array = [];
      for (const key of val) {
        const empty = temp.filter(item => {
          return item.value === key;
        });
        console.log('empty==========', empty);
      }
    },
    delteamrule () {},
    selectedFormlua (id, item) {
      const hadExistStatus = item.selected;
      for (let i = 0; i < this.rankList.length; i++) {
        this.rankList[i].selected = false;
      }
      item.selected = !hadExistStatus;
      if (!hadExistStatus) {
        this.selectId = id;
      } else {
        this.selectId = null;
      }
    },
    cancel () {
      this.addformbase = Object.assign({}, defaultForm);
      this.$emit('updateStat', false);
    },
    handsave () {
      if (this.addformbase.calItem1Array.length === 0 && this.addformbase.calItem2Array.length === 0) {
        this.$Message.warning(this.$t('qxzffjjxm'));
        return false;
      }
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('updateStat', false, this.addformbase);
          this.addformbase = Object.assign({}, defaultForm);
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
.warpper {
  height: 120px;
  width: 100%;
  .content {
    height: 100%;
    border: 1px solid #ccc;
  }
}
.conditionList {
  .active {
    background-color: #2d8cf0;
  }
  .li-hover {
    &:hover {
      background-color: #eff6ff;
    }
  }
  li {
    box-sizing: border-box;
    padding: 2px;
    list-style: none;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
