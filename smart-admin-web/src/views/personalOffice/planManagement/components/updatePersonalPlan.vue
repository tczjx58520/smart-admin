<template>
  <div>
    <Modal v-model="modal1"
           class="add"
           width="1024"
           fullscreen
           :closable="false"
           :mask-closable="false"
           :transfer="false">
      <div slot="header"
           style="text-align:left;color:#fff;">
        <span>修改计划</span>
      </div>

      <Card dis-hover>
        <Form :model="formItem"
              :label-width="150"
              inline>
          <FormItem :label="$t('title')"
                    style="width:80%">
            <Input v-model="formItem.title"
                   placeholder="Enter something..."></Input>
          </FormItem>

          <!-- <FormItem :label="$t('kind')"
                    style="width:40%"
                    @on-change="changeKind">
            <RadioGroup v-model="formItem.category">
              <Radio :label="0">个人计划</Radio>
              <Radio :label="1">组织计划</Radio>
              <Radio :label="2">工作汇报</Radio>
              <Radio :label="3">工作总结</Radio>
            </RadioGroup>
          </FormItem> -->

          <FormItem :label="$t('selectOrganization')"
                    v-if="formItem.category===1"
                    style="width:40%">
            <Input v-model="formItem.organizationName"
                   @click.native="goSelectOrganization"
                   :autosize="{ minRows: 2, maxRows: 5 }"
                   placeholder="Enter something..."
                   readonly></Input>
          </FormItem>

          <FormItem :label="$t('planType')"
                    style="width:40%">
            <Select v-model="formItem.type">
              <Option :value="0">日</Option>
              <Option :value="1">周</Option>
              <Option :value="2">月</Option>
              <Option :value="3">年</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('planDate')"
                    style="width:40%">
            <DatePicker type="datetime"
                        :options="options3"
                        format="yyyy-MM-dd HH:mm:ss"
                        @on-change="changeDate0"
                        ref="changeDatePicker0"
                        v-model="date"
                        placeholder="Select date"></DatePicker>
          </FormItem>

          <FormItem :label="$t('startTime')"
                    prop="startTime"
                    style="width:40%;">
            <DatePicker type="datetime"
                        :options="options3"
                        format="yyyy-MM-dd HH:mm:ss"
                        @on-change="changeDate1"
                        ref="changeDatePicker1"
                        v-model="startTime"
                        placeholder="Select date"></DatePicker>
          </FormItem>
          <FormItem :label="$t('endTime')"
                    prop="endTime"
                    style="width:40%;">
            <DatePicker type="datetime"
                        :options="options3"
                        format="yyyy-MM-dd HH:mm:ss"
                        @on-change="changeDate2"
                        ref="changeDatePicker2"
                        v-model="endTime"
                        placeholder="Select date"></DatePicker>
          </FormItem>

          <FormItem :label="$t('remindTime')"
                    style="width:40%;">
            <span>提前</span>
            <Input v-model.number="formItem.remindDate"
                   style="width:200px;margin:0 10px"
                   placeholder="Enter something..."></Input>
            <span>天</span>
          </FormItem>
          <FormItem style="width:40%;"
                    :label="$t('sjdxtx')">
            <Checkbox v-model="formItem.mobileRemind"
                      true-value="1"
                      false-value="0"></Checkbox>
          </FormItem>

          <FormItem :label="$t('planContent')"
                    style="width:80%">
            <Input v-model="formItem.content"
                   type="textarea"
                   placeholder="Enter something..."></Input>
          </FormItem>

          <FormItem :label="$t('fj')"
                    style="width:80%">
            <Upload :action="myupLoadUrl"
                    :data="{ type: 7 }"
                    :on-progress="successUpload">
              <Button icon="ios-add"></Button>
            </Upload>
          </FormItem>

          <FormItem :label="$t('hbjh')"
                    style="width:80%">
            <Input v-model="formItem.reportForPersonName"
                   @click.native="goSelectHeader"
                   :autosize="{ minRows: 2, maxRows: 5 }"
                   placeholder="Enter something..."
                   readonly></Input>
          </FormItem>

          <FormItem :label="$t('fxjh')"
                    style="width:80%">
            <Input v-model="formItem.userName"
                   @click.native="goSelectPeople"
                   :autosize="{ minRows: 2, maxRows: 5 }"
                   placeholder="Enter something..."
                   readonly></Input>
          </FormItem>

        </Form>
      </Card>

      <div slot="footer">
        <ButtonGroup>
          <Button type="primary"
                  size="large"
                  @click="ok">{{ $t("Save") }}</Button>
          <Button type="error"
                  size="large"
                  @click="cancel">{{
            $t("Close")
          }}</Button>
        </ButtonGroup>
      </div>
    </Modal>
    <controllerSelect :modalstat="visiable_emp1"
                      :type="mytype"
                      :memberId="formItem"
                      @updateStat="updateStat_emp1">
    </controllerSelect>

    <userSelect :modalstat="visiable_emp"
                :type="mytype"
                :memberId="formItem"
                @updateStat="updateStat_emp">
    </userSelect>

    <organizationSelect :modalstat="visiable_org"
                        :type="mytype"
                        :memberId="formItem"
                        @updateStat="updateStat_org">
    </organizationSelect>
  </div>
</template>
<script>
import controllerSelect from './addemp_single/modal';
import userSelect from './addemp_single/modal1';
import { planManage } from '@/api/planManage';
import organizationSelect from './add_org/modal';

export default {
  components: {
    controllerSelect,
    userSelect,
    organizationSelect
  },
  name: 'updatePlan',
  props: {
    visible2: {
      type: Boolean,
      default: false
    },
    updatePlan: {
      type: Object,
      default: null
    }
  },
  data () {
    let baseUrl = process.env.VUE_APP_URL;
    return {
      visiable_emp: false,
      visiable_emp1: false,
      visiable_org: false,
      mytype: 3,
      myupLoadUrl: baseUrl + '/upload/uploadpic',
      modal1: false,
      formItem: {
        category: 0,
        mobileRemind: 0,
        date: null,
        startTime: null,
        endTime: null,
        planAttachments: null,
        planShareFors: null
      },
      options3: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      startTime: null,
      endTime: null,
      date: null
    };
  },
  watch: {
    visible2 () {
      this.modal1 = this.visible2;
    },
    updatePlan () {
      this.formItem = this.updatePlan;
      this.startTime = this.formItem.startTime;
      this.endTime = this.formItem.endTime;
      this.date = this.formItem.date;
    }
  },
  methods: {
    // 选择组织
    updateStat_org (stat, empList, type) {
      this.visiable_org = stat;
      console.log(11111, stat);
      console.log(22222, empList);
      console.log(33333, type);
      if (empList) {
        if (type === 3) {
          this.formItem.organizationId = Number(empList.organizationOa);
          this.formItem.organizationName = empList.organizationOaName;
        }
      }
    },
    goSelectOrganization () {
      this.visiable_org = true;
    },
    changeKind (val) {
      this.formItem.organizationId = null;
      this.formItem.organizationName = null;
    },
    ok () {
      console.log(1111111, this.formItem);
      this.formItem.createId = this.$store.state.user.userLoginInfo.userId;
      planManage.updatePlan(this.formItem).then(res => {
        console.log(res);
        this.$Message.success('修改成功');
        this.$emit('updateStat2', false);
      });
    },
    cancel () {
      this.$emit('updateStat2', false);
    },
    changeDate0 () {
      if (this.formItem.date) {
        this.$refs['changeDatePicker0'].onSelectionModeChange('time');// 弹出时间选择框
        this.formItem.date = this.$refs.changeDatePicker0.visualValue;
      }
    },
    changeDate1 () {
      if (this.formItem.startTime) {
        this.$refs['changeDatePicker1'].onSelectionModeChange('time');// 弹出时间选择框
        this.formItem.startTime = this.$refs.changeDatePicker1.visualValue;
      }
    },
    changeDate2 () {
      if (this.formItem.endTime) {
        this.$refs['changeDatePicker2'].onSelectionModeChange('time');// 弹出时间选择框
        this.formItem.endTime = this.$refs.changeDatePicker2.visualValue;
      }
    },
    // 选择负责人
    updateStat_emp1 (stat, empList, type) {
      this.visiable_emp1 = stat;
      if (empList) {
        if (type === 3) {
          this.formItem.reportForPersonName = empList.names;
          this.formItem.reportForId = Number(empList.empIds);
        }
      }
    },

    // 选择人员
    updateStat_emp (stat, empList, type) {
      this.visiable_emp = stat;
      this.formItem.planShareFors = [];
      if (empList) {
        if (type === 3) {
          console.log(333333, empList);
          this.formItem.userName = empList.names;
          const idList = empList.empIds;
          const list = idList.split(',');
          for (let i = 0; i < list.length; i++) {
            const data = {
              employeeId: Number(list[i])
            };
            this.formItem.planShareFors.push(data);
          }
          console.log(this.formItem.planShareFors);
        }
      }
    },
    // 成功上传文件
    successUpload (response, file, fileList) {
      console.log(111, response);
      console.log(222, file);
      console.log(333, fileList);

      const data = {
        attachmentName: file.name,
        attachmentUrl: file.response.data.content.picPath[0]
      };

      this.formItem.planAttachments.push(data);
    },
    goSelectHeader () {
      this.visiable_emp1 = true;
    },
    goSelectPeople () {
      this.visiable_emp = true;
    }

  }
};
</script>
<style scoped>
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
