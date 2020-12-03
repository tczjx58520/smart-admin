<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="720"
    :closable="false"
    :mask-closable="false"
    :transfer="false"
    :styles="{ top: '10px' }"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>{{ formTitle }}</span>
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
          :model="fromBaseData"
          label-position="right"
          :label-width="100"
          :rules="ruleValidate"
        >
          <FormItem :label="$t('kqgl.bcmc')" prop="shiftName">
            <Input v-model="fromBaseData.shiftName" style="width: 34%" />
          </FormItem>
          <FormItem :label="$t('kqgl.sbsj')" prop="startWorkTimeMorning">
            <TimePicker
              type="time"
              v-model="fromBaseData.startWorkTimeMorning"
              confirm
            />
          </FormItem>
          <FormItem :label="$t('kqgl.xbsj')" prop="overWorkTimeMorning">
            <TimePicker
              type="time"
              v-model="fromBaseData.overWorkTimeMorning"
              confirm
            />
          </FormItem>
          <FormItem :label="$t('kqgl.sbsj')" prop="startWorkTimeAfternoon">
            <TimePicker
              type="time"
              v-model="fromBaseData.startWorkTimeAfternoon"
              confirm
            />
          </FormItem>
          <FormItem :label="$t('kqgl.xbsj')" prop="overWorkTimeAfternoon">
            <TimePicker
              type="time"
              v-model="fromBaseData.overWorkTimeAfternoon"
              confirm
            />
          </FormItem>
          <FormItem :label="$t('kqgl.sfswxj')">
            <RadioGroup v-model="fromBaseData.whetherVocation">
              <Radio
                v-for="item in chooseList"
                :label="item.value"
                :key="item.value"
              >
                <span style="margin-right: 30px">{{ item.label }}</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="$t('isEffective')">
            <RadioGroup v-model="fromBaseData.whetherEffect">
              <Radio
                v-for="item in chooseList"
                :label="item.value"
                :key="item.value"
              >
                <span style="margin-right: 30px">{{ item.label }}</span>
              </Radio>
            </RadioGroup>
          </FormItem>
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
import $ from "jquery";
import { attendance } from "@/api/attendance";
export default {
  name: "addGong",
  components: {},
  props: {
    modalstat: {
      type: Boolean,
      default: false,
    },
    modalState: {
      type: String,
      default: null,
    },
    editData: {
      type: Object,
      default: null,
    },
  },
  created() {},
  mounted() {},
  data() {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter"));
      } else {
        callback();
      }
    };
    return {
      open: false,
      testDate: "",
      formTitle: "",
      chooseList: [
        {
          label: "YES",
          value: 0,
        },
        {
          label: "NO",
          value: 1,
        },
      ],
      modal_loading: false,
      mymoadlStat: this.modalstat,
      componetState: this.modalState,
      fromBaseData: {
        startWorkTimeMorning: "",
        overWorkTimeMorning: "",
        startWorkTimeAfternoon: null,
        overWorkTimeAfternoon: null,
        whetherEffect: 0,
        whetherVocation: 1,
        createId: this.$store.state.user.userLoginInfo.userId,
      },
      ruleValidate: {
        shiftName: [
          {
            required: true,
            message: "The shiftName cannot be empty",
            trigger: "blur",
          },
        ],
        startWorkTimeMorning: [
          { required: true, validator: validatePass, trigger: "change" },
        ],
        overWorkTimeMorning: [
          { required: true, validator: validatePass, trigger: "change" },
        ],
        startWorkTimeAfternoon: [
          { required: true, validator: validatePass, trigger: "change" },
        ],
        overWorkTimeAfternoon: [
          { required: true, validator: validatePass, trigger: "change" },
        ],
      },
      // 新建员工弹窗
      visiable_emp: false,
    };
  },
  watch: {
    modalstat() {
      this.mymoadlStat = this.modalstat;
    },
    modalState() {
      this.componetState = this.modalState;
      if (this.componetState === "新建") {
        this.formTitle = this.$t("kqgl.tjbc");
      } else if (this.componetState === "修改") {
        this.formTitle = this.$t("kqgl.xgbc");
      }
    },
    editData() {
      console.log("this.editData", this.editData);
      this.fromBaseData = this.editData;
    },
  },
  methods: {
    handleClick(e) {
      console.log(e);
      if (e) {
        this.open = !this.open;
      }
      // this.open = !this.open;
    },
    handleChange(time) {
      // this.value3 = time;
    },
    handleClear() {
      this.open = false;
    },
    handleOk() {
      this.open = false;
    },
    cancel() {
      this.mymoadlStat = false;
      this.modal_loading = false;
      this.reset();
      this.$emit("update:modalstat", false);
    },
    reset() {
      this.fromBaseData = {
        whetherEffect: 0,
        whetherVocation: 1,
        createId: this.$store.state.user.userLoginInfo.userId,
      };
      this.$refs["form"].resetFields();
    },
    handsave() {
      this.modal_loading = true;
      if (this.componetState === "新建") {
        console.log(this.fromBaseData);
        const parmJson = JSON.stringify(this.fromBaseData);
        this.$refs["form"].validate((valid) => {
          if (valid) {
            attendance.addShift(parmJson).then((res) => {
              if (res.ret === 200) {
                this.$Message.success(res.msg);
                this.mymoadlStat = false;
                this.$emit("update:modalstat", false);
                this.$emit("restList", true);
                this.reset();
              }
              this.modal_loading = false;
            });
          } else {
            this.modal_loading = false;

            this.$Message.error("Fail!");
          }
        });
      } else if (this.componetState === "修改") {
        console.log(this.fromBaseData);
        const parmJson = JSON.stringify(this.fromBaseData);
        this.$refs["form"].validate((valid) => {
          if (valid) {
            attendance.modifyShift(this.fromBaseData).then((res) => {
              if (res.ret === 200) {
                this.$Message.success(res.msg);
                this.mymoadlStat = false;
                this.$emit("update:modalstat", false);
                this.$emit("restList", true);
                this.reset();
              }
              this.modal_loading = false;
            });
          } else {
            this.modal_loading = false;

            this.$Message.error("Fail!");
          }
        });
      }
    },
  },
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
