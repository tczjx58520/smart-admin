<template>
  <div>
    <TabPane :label="$t('kqgl.kqsz')">
      <div style="margin-bottom: 20px">
        <Button
          style="margin-right: 15px"
          @click="newFirstForm"
          icon="md-add"
          type="warning"
          >{{ $t("Save") }}</Button
        >
      </div>
      <div>
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
          <div>{{ $t("kqgl.szdycdksj") }}</div>
        </div>
        <Form
          ref="form"
          :model="fromBaseData"
          label-position="left"
          :label-width="140"
          style="padding-top: 20px; padding-left: 1%"
        >
          <FormItem :label="$t('kqgl.sbqyxdjsj')">
            <InputNumber
              :max="100000"
              v-model="fromBaseData.timeBeforeFirstStartWork"
              :min="0"
              style="width: 13%"
            ></InputNumber>
          </FormItem>

          <FormItem :label="$t('kqgl.sbhyxdjsj')">
            <InputNumber
              :max="100000"
              v-model="fromBaseData.timeAfterFirstStartWork"
              :min="0"
              style="width: 13%"
            ></InputNumber>
          </FormItem>
        </Form>
      </div>

      <div>
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
          <div>{{ $t("kqgl.szdecdksj") }}</div>
        </div>
        <Form
          ref="form"
          :model="fromBaseData"
          label-position="left"
          :label-width="140"
          style="padding-top: 20px; padding-left: 1%"
        >
          <FormItem :label="$t('kqgl.sbqyxdjsj')">
            <InputNumber
              :max="100000"
              v-model="fromBaseData.timeBeforeSecondStartWork"
              :min="0"
              style="width: 13%"
            ></InputNumber>
          </FormItem>

          <FormItem :label="$t('kqgl.sbhyxdjsj')">
            <InputNumber
              :max="100000"
              v-model="fromBaseData.timeAfterSecondStartWork"
              :min="0"
              style="width: 13%"
            ></InputNumber>
          </FormItem>
        </Form>
      </div>

      <div>
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
          <div>{{ $t("kqgl.szdccdksj") }}</div>
        </div>
        <Form
          ref="form"
          :model="fromBaseData"
          label-position="left"
          :label-width="140"
          style="padding-top: 20px; padding-left: 1%"
        >
          <FormItem :label="$t('kqgl.sbqyxdjsj')">
            <InputNumber
              :max="100000"
              v-model="fromBaseData.timeBeforeThirdStartWork"
              :min="0"
              style="width: 13%"
            ></InputNumber>
          </FormItem>

          <FormItem :label="$t('kqgl.sbhyxdjsj')">
            <InputNumber
              :max="100000"
              v-model="fromBaseData.timeAfterThirdStartWork"
              :min="0"
              style="width: 13%"
            ></InputNumber>
          </FormItem>
        </Form>
      </div>

      <div>
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
          <div>{{ $t("kqgl.szdsddksj") }}</div>
        </div>
        <Form
          ref="form"
          :model="fromBaseData"
          label-position="left"
          :label-width="140"
          style="padding-top: 20px; padding-left: 1%"
        >
          <FormItem :label="$t('kqgl.sbqyxdjsj')">
            <InputNumber
              :max="100000"
              v-model="fromBaseData.timeBeforeForthStartWork"
              :min="0"
              style="width: 13%"
            ></InputNumber>
          </FormItem>

          <FormItem :label="$t('kqgl.sbhyxdjsj')">
            <InputNumber
              :max="100000"
              v-model="fromBaseData.timeAfterForthStartWork"
              :min="0"
              style="width: 13%"
            ></InputNumber>
          </FormItem>
        </Form>
      </div>

      <div>
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
          <div>{{ $t("kqgl.txbz") }}</div>
        </div>
        <Form
          ref="form"
          :model="fromBaseData"
          label-position="left"
          :label-width="140"
          style="padding-top: 20px; padding-left: 1%"
        >
          <FormItem :label="$t('kqgl.txsc')">
            <InputNumber
              :max="100000"
              v-model="fromBaseData.flexibilityWorkTime"
              :min="0"
              style="width: 13%"
            ></InputNumber>
          </FormItem>

          <!-- <FormItem :label="$t('kqgl.txpblx')">
                       <CheckboxGroup>
                        <Checkbox label="1">{{$t('kqgl.qky')}}</Checkbox>
                        <Checkbox label="2">{{$t('kqgl.qke')}}</Checkbox>
                    </CheckboxGroup>
                    </FormItem> -->

          <FormItem :label="$t('kqgl.tqxblx')">
            <!-- <CheckboxGroup v-model="fromBaseData.flexibilityWorkType">
                        <Checkbox :label="1">{{$t('kqgl.cd')}}</Checkbox>
                        <Checkbox :label="2">{{$t('kqgl.zt')}}</Checkbox>
                    </CheckboxGroup> -->
            <RadioGroup v-model="fromBaseData.workEarlyType">
              <Radio :label="0">{{ $t("kqgl.cd") }}</Radio>
              <Radio :label="1">{{ $t("kqgl.zt") }}</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>

      <div>
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
          <div>{{ $t("kqgl.szsfyxt") }}</div>
        </div>
        <Form
          ref="form"
          :model="fromBaseData"
          label-position="left"
          :label-width="250"
          style="padding-top: 20px; padding-left: 1%"
        >
          <FormItem :label="$t('kqgl.qyzdtbzjbc')">
            <CheckboxGroup v-model="workEarlyType" @on-change="selectWorkType">
              <Checkbox :label="0">{{ $t("kqgl.shi") }}</Checkbox>
            </CheckboxGroup>
          </FormItem>

          <FormItem :label="$t('kqgl.syry')">
            <Input
              type="textarea"
              disabled
              :autosize="{ minRows: 4, maxRows: 15 }"
              v-model="fromBaseData.textareaData1"
              style="width: 34%"
            />
          </FormItem>
          <div class="buttons">
            <Button type="primary" @click="chooseOrganization">{{
              $t("kqgl.tjzz")
            }}</Button>
            <moreOrganizationTree
              :modalstat.sync="moreOrganizationTreeVisible"
              @moreOrganizationData="moreOrganizationData"
            />

            <Button type="primary" class="buttonItem" @click="chooseMoreEmp">{{
              $t("kqgl.tjry")
            }}</Button>
            <moreSelectEmp
              :modalstat.sync="moreSelectEmpVisible"
              @empData="getEmpData"
            />

            <!-- <Button type="primary" class="buttonItem">{{$t('kqgl.tjgw')}}</Button> -->
            <Button class="buttonItem" @click="clearTextArea">{{
              $t("kqgl.qk")
            }}</Button>
          </div>

          <FormItem :label="$t('kqgl.jzry')" style="padding-top: 20px">
            <Input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 15 }"
              disabled
              style="width: 34%"
              v-model="fromBaseData.textareaData2"
            />
          </FormItem>
          <div class="buttons">
            <Button type="primary" @click="chooseOrganization2">{{
              $t("kqgl.tjzz")
            }}</Button>
            <moreOrganizationTree
              :modalstat.sync="moreOrganizationTreeVisible2"
              @moreOrganizationData="moreOrganizationData2"
            />

            <Button type="primary" class="buttonItem" @click="chooseMoreEmp2">{{
              $t("kqgl.tjry")
            }}</Button>
            <moreSelectEmp
              :modalstat.sync="moreSelectEmpVisible2"
              @empData="getEmpData2"
            />
            <!-- <Button type="primary" class="buttonItem">{{$t('kqgl.tjgw')}}</Button> -->
            <Button class="buttonItem" @click="clearTextArea2">{{
              $t("kqgl.qk")
            }}</Button>
          </div>
        </Form>
      </div>

      <div>
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
          <div>{{ $t("kqgl.szmqry") }}</div>
        </div>
        <Form
          ref="form"
          :model="fromBaseData"
          label-position="left"
          :label-width="140"
          style="padding-top: 20px; padding-left: 1%"
        >
          <FormItem :label="$t('kqgl.szmqry')" style="padding-top: 20px">
            <Input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 15 }"
              v-model="textareaData5"
              style="width: 34%"
              @on-focus="choosePunchEmp"
            />
            <moreSelectEmp
              :modalstat.sync="moreSelectEmpVisible3"
              @empData="getEmpData3"
            />
          </FormItem>
        </Form>
      </div>
    </TabPane>
  </div>
</template>

<script>
import { attendance } from "@/api/attendance";
import moreOrganizationTree from "@/components/moreOrganizationTree";
import moreSelectEmp from "@/components/moreSelectEmp";

export default {
  name: "firstTable",
  components: {
    moreOrganizationTree,
    moreSelectEmp,
  },
  data() {
    return {
      workEarlyType: [],
      textareaData5: "",
      moreSelectEmpVisible3: false,
      editformData: {},
      moreSelectEmpVisible2: false,
      moreOrganizationTreeVisible2: false,
      textareaOrgIds2: [],
      textareaEmpIds2: [],
      textareaData4: "",
      textareaData3: "",
      //
      textareaOrgIds: [],
      textareaEmpIds: [],
      moreSelectEmpVisible: false,
      textareaData2: "",
      textareaData: "",
      moreOrganizationTreeVisible: false,
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
      fromBaseData: {
        textareaData1: "",
        textareaData2: "",
        workEarlyType: 0,
        timeBeforeThirdStartWork: 0,
        timeBeforeSecondStartWork: 0,
        timeBeforeForthStartWork: 0,
        timeBeforeFirstStartWork: 0,
        timeAfterThirdStartWork: 0,
        timeAfterSecondStartWork: 0,
        timeAfterForthStartWork: 0,
        timeAfterFirstStartWork: 0,
      },
      ruleValidate: [],
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    async getDataList() {
      const result = await attendance.findAttendanceSet();
      console.log("result", result);
      this.fromBaseData = result.data;
      this.workEarlyType = [result.data.workEarlyType];
      this.fromBaseData.timeBeforeThirdStartWork = Number(
        result.data.timeBeforeThirdStartWork
      );
      this.fromBaseData.timeBeforeSecondStartWork = Number(
        result.data.timeBeforeSecondStartWork
      );
      this.fromBaseData.timeBeforeForthStartWork = Number(
        result.data.timeBeforeForthStartWork
      );
      this.fromBaseData.timeBeforeFirstStartWork = Number(
        result.data.timeBeforeFirstStartWork
      );
      this.fromBaseData.timeAfterThirdStartWork = Number(
        result.data.timeAfterThirdStartWork
      );
      this.fromBaseData.timeAfterSecondStartWork = Number(
        result.data.timeAfterSecondStartWork
      );
      this.fromBaseData.timeAfterForthStartWork = Number(
        result.data.timeAfterForthStartWork
      );
      this.fromBaseData.timeAfterFirstStartWork = Number(
        result.data.timeAfterFirstStartWork
      );
      let firstTextDataEmp1 = this.fromBaseData.employeeIdForFlex.filter(
        (item) => {
          return item.status === 0;
        }
      );
      let firstTextDataOrg1 = this.fromBaseData.organizationForFlex.filter(
        (item) => {
          return item.status === 0;
        }
      );
      this.textareaData = firstTextDataOrg1
        .map((item) => {
          return item.organizationName;
        })
        .join(",");
      this.textareaData2 = firstTextDataEmp1
        .map((item) => {
          return item.createPersonName;
        })
        .join(",");

      this.fromBaseData.textareaData1 =
        this.textareaData + "             " + this.textareaData2;

      this.textareaEmpIds = firstTextDataEmp1.map((item) => {
        return {
          employeeId: item.employeeId,
          status: item.status,
        };
      });
      this.textareaOrgIds = firstTextDataOrg1.map((item) => {
        return {
          organizationId: item.organizationId,
          status: item.status,
        };
      });

      //  11

      let firstTextDataEmp2 = this.fromBaseData.employeeIdForFlex.filter(
        (item) => {
          return item.status === 1;
        }
      );
      console.log(firstTextDataEmp1);
      let firstTextDataOrg2 = this.fromBaseData.organizationForFlex.filter(
        (item) => {
          return item.status === 1;
        }
      );

      this.textareaData3 = firstTextDataOrg2
        .map((item) => {
          return item.organizationName;
        })
        .join(",");
      this.textareaData4 = firstTextDataEmp2
        .map((item) => {
          return item.createPersonName;
        })
        .join(",");
      this.fromBaseData.textareaData2 =
        this.textareaData3 + "             " + this.textareaData4;
      this.textareaEmpIds2 = firstTextDataEmp2.map((item) => {
        return {
          employeeId: item.employeeId,
          status: item.status,
        };
      });
      this.textareaOrgIds2 = firstTextDataOrg2.map((item) => {
        return {
          organizationId: item.organizationId,
          status: item.status,
        };
      });

      // 22

      this.textareaData5 = this.fromBaseData.employeeIdForNoPunch
        .map((item) => {
          return item.createPersonName;
        })
        .join(",");

      this.fromBaseData.employeeIdForNoPunch = this.fromBaseData.employeeIdForNoPunch.map(
        (item) => {
          return {
            employeeId: item.employeeId,
          };
        }
      );
    },
    selectWorkType(val) {
      console.log("val", val);
      if (val.length !== 0) {
        this.fromBaseData.automaticPunch = val[0];
      }
    },
    newFirstForm() {
      console.log("this.fromBaseData", this.fromBaseData);
      console.log("this.textareaEmpIds", this.textareaEmpIds);
      console.log("this.textareaEmpIds2", this.textareaEmpIds2);
      console.log("this.textareaOrgIds", this.textareaOrgIds);
      console.log("this.textareaOrgIds2", this.textareaOrgIds2);
      this.fromBaseData.employeeIdForFlex = this.textareaEmpIds.concat(
        this.textareaEmpIds2
      );
      this.fromBaseData.organizationForFlex = this.textareaOrgIds.concat(
        this.textareaOrgIds2
      );

      attendance.modifyAttendanceSet(this.fromBaseData).then((res) => {
        if (res.ret === 200) {
          this.$Message.success(res.msg);
        }
        this.modal_loading = false;
      });
    },
    getEmpData3(val) {
      this.textareaData5 = val.names;
      const empIds = val.empIds.split(",");
      this.fromBaseData.employeeIdForNoPunch = empIds.map((item) => {
        return {
          employeeId: Number(item),
        };
      });
    },
    choosePunchEmp() {
      this.moreSelectEmpVisible3 = true;
    },
    clearTextArea2() {
      this.textareaData4 = "";
      this.textareaData3 = "";
      this.fromBaseData.textareaData2 = "";
      this.textareaEmpIds2 = [];
      this.textareaOrgIds2 = [];
    },
    getEmpData2(val) {
      console.log(val);
      this.fromBaseData.textareaData2 = "";
      this.textareaEmpIds2 = [];
      this.textareaData4 = val.names;
      this.fromBaseData.textareaData2 =
        this.textareaData3 + "             " + this.textareaData4;
      const empIds = val.empIds.split(",");
      this.textareaEmpIds2 = empIds.map((item) => {
        return {
          employeeId: Number(item),
          status: 1,
        };
      });
      console.log("this.fromBaseData", this.fromBaseData);
    },
    chooseMoreEmp2() {
      this.moreSelectEmpVisible2 = true;
    },
    moreOrganizationData2(val) {
      this.fromBaseData.textareaData2 = "";
      this.textareaOrgIds2 = [];
      this.textareaData3 = val.organizationOaName;
      this.fromBaseData.textareaData2 =
        this.textareaData3 + "             " + this.textareaData4;
      this.textareaOrgIds2 = val.organizationOa.map((item) => {
        return {
          organizationId: item,
          status: 1,
        };
      });
    },
    chooseOrganization2() {
      this.moreOrganizationTreeVisible2 = true;
    },

    //
    clearTextArea() {
      this.textareaData = "";
      this.textareaData2 = "";
      this.fromBaseData.textareaData1 = "";
      this.textareaEmpIds = [];
      this.textareaOrgIds = [];
    },
    getEmpData(val) {
      console.log(val);
      this.fromBaseData.textareaData1 = "";
      this.textareaEmpIds = [];
      this.textareaData2 = val.names;
      this.fromBaseData.textareaData1 =
        this.textareaData + "             " + this.textareaData2;
      const empIds = val.empIds.split(",");
      this.textareaEmpIds = empIds.map((item) => {
        return {
          employeeId: Number(item),
          status: 0,
        };
      });
      console.log("this.fromBaseData", this.fromBaseData);
    },
    chooseMoreEmp() {
      this.moreSelectEmpVisible = true;
    },
    moreOrganizationData(val) {
      this.fromBaseData.textareaData1 = "";
      this.textareaOrgIds = [];
      this.textareaData = val.organizationOaName;
      this.fromBaseData.textareaData1 =
        this.textareaData + "             " + this.textareaData2;
      this.textareaOrgIds = val.organizationOa.map((item) => {
        return {
          organizationId: item,
          status: 0,
        };
      });
    },
    chooseOrganization() {
      this.moreOrganizationTreeVisible = true;
    },
  },
};
</script>
<style scoped>
.buttons {
  display: flex;
  padding-left: 20%;
}
.buttonItem {
  margin-left: 20px;
}
</style>