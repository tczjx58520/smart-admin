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
      <span>{{ $t("kqgl.bukadengjidan") }}</span>
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
          <FormItem :label="$t('kqgl.bukabanci')">
            <Select v-model="fromBaseData.shiftId" style="width: 34%">
              <Option
                v-for="item in selectData"
                :key="item.id"
                :value="item.id"
                >{{ item.shiftName }}</Option
              >
            </Select>
          </FormItem>
          <FormItem :label="$t('kqgl.bukariqi')">
            <DatePicker
              type="datetime"
              placeholder="Select date"
              style="width: 34%"
              @on-change="selectDate"
            ></DatePicker>
          </FormItem>
          <FormItem :label="$t('kqgl.bukashiyou')">
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
      selectData: [],
      orgStat: false,
      employeeName: this.$store.state.user.userLoginInfo.actualName,
      organazationName: this.$store.state.user.userLoginInfo.organizationOaName,
      empSata: false,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      componetState: this.modalState,
      fromBaseData: {
        employeeId: this.$store.state.user.userLoginInfo.userId,
        organazationId: this.$store.state.user.userLoginInfo.organizationOa,
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
      this.getSelectData();
    },
    editData() {
      //   console.log('this.editData', this.editData)
      this.fromBaseData.note = this.editData.note;
      this.fromBaseData.id = this.editData.id;
      this.fromBaseData.employeeId = this.editData.employeeId;
    },
  },
  methods: {
    selectDate(val) {
      this.fromBaseData.fillDate = val;
    },
    async getSelectData() {
      let params = {
        pageNum: 1,
        pageSize: 1000000,
      };
      try {
        let result = await attendance.findAllShiftInfo(params);
        console.log(result);
        this.selectData = result.data.list;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
      }
    },
    chooseOrg() {
      this.orgStat = true;
    },
    getOrgData(val) {
      //   console.log(val)
      this.fromBaseData.organazationId = val.id;
      this.organazationName = val.title;
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
    changeStartTime(val) {
      console.log(val);
      this.fromBaseData.startTime = val[0];
      this.fromBaseData.endTime = val[1];
      this.countTotalTime(val[0], val[1]);
    },
    countTotalTime(val, val2) {
      const subDays = val.substring(0, 10);
      const subDays2 = val2.substring(0, 10);
      const diffdays = this.datedifference(subDays, subDays2);
      let hours1 = Number(val.substring(11, 13));
      let hours2 = Number(val2.substring(11, 13));
      let minute1 = Number(val.substring(14, 16));
      let minute2 = Number(val2.substring(14, 16));
      let second1 = Number(val.substring(17, 19));
      let second2 = Number(val2.substring(17, 19));
      console.log("minute1", minute1, "second1", second1, "hours1", hours1);
      console.log(diffdays);
      let diffHours = hours2 - hours1;
      let diffminutes = minute2 - minute1;
      this.fromBaseData.totalTime =
        diffHours + diffminutes / 60 + Number(diffdays) * 24;
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
        organazationId: this.$store.state.user.userLoginInfo.organizationOa,
      };
      this.$refs["form"].resetFields();
    },
    handsave() {
      this.modal_loading = true;
      console.log(this.fromBaseData);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          attendance.addFillClock(this.fromBaseData).then((res) => {
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
