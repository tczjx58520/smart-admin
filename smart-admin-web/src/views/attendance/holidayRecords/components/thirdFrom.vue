<template>
  <div>
    <TabPane :label="$t('kqgl.zdnj')">
      <div class="saveButton">
        <Button type="primary" :loading="loading" @click="handleSave">{{
          $t("Save")
        }}</Button>
      </div>
      <div class="formContent">
        <Form
          ref="form"
          :model="fromBaseData"
          label-position="left"
          :label-width="100"
          :rules="ruleValidate"
        >
          <FormItem :label="$t('kqgl.njjs')" prop="annualBase">
            <InputNumber
              :max="100"
              :min="1"
              v-model="fromBaseData.annualBase"
              style="width: 20%"
            />
          </FormItem>
          <FormItem :label="$t('kqgl.zgnj')" prop="annualTop">
            <InputNumber
              :max="100"
              :min="1"
              v-model="fromBaseData.annualTop"
              style="width: 20%"
            />
          </FormItem>
          <div class="settingData">
            <span style="padding-right: 40px; padding-left: 45px"
              >{{ $t("kqgl.mei") }}
            </span>
            <InputNumber
              :max="100"
              :min="1"
              v-model="fromBaseData.howManyYears"
              style="width: 10%"
            />
            <span style="padding: 0 20px">{{ $t("kqgl.niandizeng") }} </span>
            <InputNumber
              :max="100"
              :min="1"
              v-model="fromBaseData.howManyDays"
              style="width: 10%"
            />
            <span style="padding-left: 40px">{{ $t("kqgl.tian") }} </span>
          </div>

          <div class="settingData">
            <FormItem :label="$t('kqgl.yiqiyong')" style="text-align: right">
              <RadioGroup v-model="fromBaseData.status">
                <Radio :label="0">{{ $t("kqgl.shi") }}</Radio>
                <Radio :label="1">{{ $t("kqgl.fou") }}</Radio>
              </RadioGroup>
            </FormItem>
          </div>
        </Form>
      </div>
    </TabPane>
  </div>
</template>

<script>
import { attendance } from "@/api/attendance";
export default {
  name: "thirdFrom",
  data() {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      fromBaseData: {
        status: 0,
      },
      ruleValidate: {
        annualBase: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        annualTop: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getFromData();
  },
  methods: {
    async getFromData() {
      try {
        let result = await attendance.findAnnualSet();
        console.log(result);
        if (result.ret === 200) {
          this.fromBaseData = result.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async handleSave() {
      this.loading = true;
      try {
        let result = await attendance.modifyAnnualSet(this.fromBaseData);
        console.log(result);
        if (result.ret === 200) {
          this.$Message.success(result.msg);
        }
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="less" scope>
.settingData {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>