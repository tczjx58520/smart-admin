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
      <span>{{ $t("kqgl.chuchaishengqin") }}</span>
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
          <FormItem :label="$t('kqgl.liuchengbianhao')">
            <Input style="width: 34%" />
          </FormItem>
          <FormItem :label="$t('kqgl.biaoti')">
            <Input style="width: 34%" />
          </FormItem>
          <FormItem :label="$t('kqgl.zhongyaodengji')">
            <Input style="width: 34%" />
          </FormItem>
          <FormItem :label="$t('kqgl.shengqingren')">
            <Input
              v-model="employeeName"
              style="width: 34%"
              @click.native="chooseEmp"
            />
          </FormItem>
          <selectEmp :modalstat.sync="empSata" @selectData="selectData" />
          <div class="nomalDiv">
            <span class="zhi">{{ $t("kqgl.chucaishijian") }}</span>
            <DatePicker
              type="date"
              :value="fromBaseData.startTime"
              confirm
              style="width: 20%"
              @on-change="changeStartTime"
            />
            <div class="zhi">{{ $t("kqgl.zhi") }}</div>
            <DatePicker
              type="date"
              :value="fromBaseData.endTime"
              confirm
              style="width: 20%"
              @on-change="changeEndTime"
            />
            <div class="zhi">{{ $t("kqgl.chucaiheji") }}</div>
            <Input
              v-model="fromBaseData.totalTime"
              disabled
              style="width: 20%"
            />
            <div class="zhi">{{ $t("kqgl.tian") }}</div>
          </div>
          <FormItem :label="$t('kqgl.shusuozhuzhi')">
            <Input
              v-model="organazationName"
              style="width: 34%"
              @click.native="chooseOrg"
            />
            <organization
              :modalstat.sync="orgStat"
              @organizationData="getOrgData"
            />
          </FormItem>
          <FormItem :label="$t('kqgl.chucaididian')">
            <Input v-model="fromBaseData.address" style="width: 34%" />
          </FormItem>
          <FormItem :label="$t('kqgl.chucaishiyou')">
            <Input v-model="fromBaseData.reason" style="width: 34%" />
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
import selectEmp from "@/components/selectEmp";
import organization from "@/components/organization";
import { attendance } from "@/api/attendance";
export default {
  name: "firstFrom",
  components: {
    selectEmp,
    organization,
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false,
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
      orgStat: false,
      employeeName: this.$store.state.user.userLoginInfo.actualName,
      organazationName: this.$store.state.user.userLoginInfo.organizationOaName,
      empSata: false,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      componetState: this.modalState,
      fromBaseData: {
        employeeId: this.$store.state.user.userLoginInfo.userId,
        // employeeId: 2,
        organazationId: this.$store.state.user.userLoginInfo.organizationOa,
        reason: "",
        startTime: null,
        endTime: null,
        totalTime: 0,
        addresss: "",
      },
      ruleValidate: {
        note: [
          {
            required: true,
            message: "The note cannot be empty",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    modalstat() {
      this.mymoadlStat = this.modalstat;
      console.log(
        "this.$store.state.user.userLoginInfo",
        this.$store.state.user.userLoginInfo
      );
    },
    editData() {
      //   console.log('this.editData', this.editData)
      this.fromBaseData.note = this.editData.note;
      this.fromBaseData.id = this.editData.id;
      this.fromBaseData.employeeId = this.editData.employeeId;
    },
  },
  methods: {
    chooseOrg() {
      this.orgStat = true;
    },
    getOrgData(val) {
      //   console.log(val)
      this.fromBaseData.organazationId = val.id;
      this.organazationName = val.title;
    },
    changeStartTime(val) {
      this.fromBaseData.startTime = val + " 00:00:00";
      this.countTotalTime();
    },
    changeEndTime(val) {
      this.fromBaseData.endTime = val + " 00:00:00";

      this.countTotalTime();
    },
    datedifference(sDate1, sDate2) {
      //sDate1和sDate2是2006-12-18格式
      var dateSpan, tempDate, iDays;
      sDate1 = Date.parse(sDate1);
      sDate2 = Date.parse(sDate2);
      dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      return iDays;
    },
    countTotalTime() {
      if (this.fromBaseData.endTime && this.fromBaseData.startTime) {
        console.log("this.fromBaseData.endTime", this.fromBaseData.endTime);
        console.log("this.fromBaseData.startTime", this.fromBaseData.startTime);
        let tian1 = this.datedifference(
          this.fromBaseData.startTime,
          this.fromBaseData.endTime
        );
        console.log(tian1);
        this.fromBaseData.totalTime = tian1;
      }
    },
    selectData(val) {
      console.log("val", val);
      this.fromBaseData.employeeId = val.id;
      this.employeeName = val.personName;
    },
    chooseEmp() {
      this.empSata = true;
    },
    cancel() {
      this.mymoadlStat = false;
      this.modal_loading = false;
      this.reset();
      this.$emit("update:modalstat", false);
    },
    reset() {
      this.fromBaseData = {
        employeeId: this.$store.state.user.userLoginInfo.userId,
        // employeeId: 2,
        organazationId: this.$store.state.user.userLoginInfo.organizationOa,
        reason: "",
        startTime: null,
        endTime: null,
        totalTime: 0,
        addresss: "",
      };
      this.$refs["form"].resetFields();
    },
    handsave() {
      this.modal_loading = true;
      console.log(this.fromBaseData);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          attendance.addBusniessOnTrip(this.fromBaseData).then((res) => {
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
