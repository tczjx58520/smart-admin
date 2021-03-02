<template>
  <div>
    <Modal v-model="modal1"
           class="add"
           width="1024"
           fullscreen
           :closable="false"
           :mask-closable="false"
           @on-visible-change="changeVisible"
           :transfer="false">
      <div slot="header"
           style="text-align:left;color:#fff;">
        <span>添加任务</span>
      </div>

      <Card dis-hover>
        <Form :model="formItem"
              :label-width="150"
              inline>
          <FormItem :label="$t('taskTitle')"
                    style="width:80%">
            <Input v-model="formItem.title"
                   placeholder="Enter something..."></Input>
          </FormItem>

          <FormItem :label="$t('taskSource')"
                    style="width:80%">
            <RadioGroup v-model="formItem.source">
              <Radio :label="0">自定义</Radio>
              <Radio :label="1">组织计划</Radio>
              <Radio :label="2">母任务</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem :label="$t('select')"
                    v-if="formItem.source===1"
                    style="width:40%">
            <Select v-model="formItem.personalPlanTask.planId">
              <Option v-for="item in organizationList"
                      :value="item.id"
                      :key="item.id">{{item.title}}</Option>
            </Select>
          </FormItem>

          <FormItem :label="$t('select')"
                    v-else
                    style="width:40%">
            <Select v-model="formItem.personalPlanTask.planId"
                    disabled>
              <Option v-for="item in organizationList"
                      :value="item.id"
                      :key="item.id">{{item.title}}</Option>
            </Select>
          </FormItem>

          <FormItem :label="$t('wrokComment')"
                    style="width:40%">
            <Input v-model="formItem.workTime"
                   placeholder="Enter something..."></Input>
          </FormItem>

          <FormItem :label="$t('startTime')"
                    prop="startTime"
                    style="width:40%;">
            <DatePicker type="datetime"
                        :options="options3"
                        format="yyyy-MM-dd HH:mm:ss"
                        @on-change="changeDate"
                        ref="changeDatePicker"
                        v-model="startTime"
                        placeholder="Select date"></DatePicker>
          </FormItem>
          <FormItem :label="$t('endTime')"
                    prop="endTime"
                    style="width:40%;">
            <DatePicker type="datetime"
                        :options="options3"
                        format="yyyy-MM-dd HH:mm:ss"
                        @on-change="changeDate1"
                        ref="changeDatePicker1"
                        v-model="formItem.endTime"
                        placeholder="Select date"></DatePicker>
          </FormItem>

          <FormItem :label="$t('controller')"
                    style="width:40%;">
            <Input v-model="formItem.headerName"
                   type="textarea"
                   @click.native="goSelectHeader"
                   :autosize="{ minRows: 2, maxRows: 5 }"
                   placeholder="Enter something..."
                   readonly></Input>
          </FormItem>
          <FormItem :label="$t('participateMan')"
                    style="width:40%;">
            <Input v-model="formItem.userName"
                   type="textarea"
                   @click.native="goSelectPeople"
                   :autosize="{ minRows: 2, maxRows: 5 }"
                   placeholder="Enter something..."
                   readonly></Input>
          </FormItem>

          <div v-for="(item,index) in formItem.pesronalTaskContent"
               :key="index">
            <FormItem :label="$t('taskContent')"
                      style="width:40%">
              <Input v-model="item.content"
                     placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem :label="$t('type')"
                      style="width:20%">
              <Select v-model="item.type">
                <Option :value="0">非量化</Option>
                <Option :value="1">量化</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('taskNum')"
                      style="width:20%">
              <Input v-model="item.quote"
                     placeholder="Enter something..."></Input>
            </FormItem>
            <Button type="primary"
                    ghost
                    v-if="index!==0"
                    @click="delHang(item,index)">删除</Button>
          </div>

          <FormItem style="width:80%">
            <Button type="dashed"
                    size="small"
                    style="margin-right:10px"
                    @click="handleAdd">添加</Button>

          </FormItem>

          <FormItem :label="$t('fj')"
                    style="width:80%">
            <Upload :action="myupLoadUrl"
                    :data="{ type: 7 }"
                    :on-progress="successUpload">
              <Button icon="ios-add"></Button>
            </Upload>
          </FormItem>

          <FormItem :label="$t('jfbz')"
                    style="width:80%">
            <Input v-model="formItem.rewardPunishment"
                   placeholder="Enter something..."></Input>
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
                :organizationId="oId"
                @updateStat="updateStat_emp">
    </userSelect>
  </div>
</template>
<script>
import controllerSelect from './components/addemp_single/modal';
import userSelect from './components/addemp_single/modal1';
import { taskManage } from '@/api/taskManage';
import { planManage } from '@/api/planManage';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  employeeId: null,
  category: 1
};
export default {
  components: {
    userSelect,
    controllerSelect
  },
  name: 'assignment',
  props: {
    visible: {
      type: Boolean,
      default: false
    }

  },
  data () {
    let baseUrl = process.env.VUE_APP_URL;
    return {
      myupLoadUrl: baseUrl + '/upload/uploadpic',
      modal1: false,
      formItem: {
        startTime: null,
        creatorId: null,
        personalTaskAttachments: [],
        personalPlanTask: {},
        personalTaskParticipant: [],
        pesronalTaskContent: [
          {
            content: null,
            quote: null,
            type: 0
          }
        ]
      },
      options3: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      visiable_emp: false,
      visiable_emp1: false,
      mytype: 3,
      listQuery: Object.assign({}, defaultListQuery),
      organizationList: [],
      oId: null,
      startTime: null
    };
  },
  watch: {
    visible () {
      this.modal1 = this.visible;
      console.log(this.modal1);
    }
  },
  methods: {
    changeVisible (val) {
      if (val) {
        this.listQuery.employeeId = this.$store.state.user.userLoginInfo.userId;
        planManage.findPlan(this.listQuery).then(res => {
          this.organizationList = res.data.list;
          console.log('=========organizationList', this.organizationList);
        });
      }
      this.getNowTime();
    },
    getNowTime () {
      let nowDate = new Date();
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
      let day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate();
      let hours = nowDate.getHours() < 10 ? '0' + nowDate.getHours() : nowDate.getHours();
      let minutes = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes();
      let seconds = nowDate.getSeconds() < 10 ? '0' + nowDate.getSeconds() : nowDate.getSeconds();
      const end = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
      console.log('111111111', end);
      this.startTime = end;
      this.formItem.startTime = end;
    },
    ok () {
      this.formItem.creatorId = this.$store.state.user.userLoginInfo.userId;
      console.log('=========formItem', this.formItem);
      taskManage.arrangeTask(this.formItem).then(res => {
        console.log(11111111, res);
        this.$Message.success('添加成功');
        this.$emit('updateStat', false);
      });
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    successUpload (response, file, fileList) {
      console.log(111, response);
      console.log(222, file);
      console.log(333, fileList);

      const data = {
        attachmentName: file.name,
        attachmentUrl: file.response.data.content.picPath[0]
      };

      this.formItem.personalTaskAttachments.push(data);
    },
    // 选择负责人
    updateStat_emp1 (stat, empList, type) {
      this.visiable_emp1 = stat;
      if (empList) {
        if (type === 3) {
          this.formItem.headerName = empList.names;
          this.formItem.headerId = Number(empList.empIds);
        }
      }
    },

    // 选择人员
    updateStat_emp (stat, empList, type) {
      this.visiable_emp = stat;
      this.formItem.personalTaskParticipant = [];
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
            this.formItem.personalTaskParticipant.push(data);
          }
          console.log(this.formItem.personalTaskParticipant);
        }
      }
    },
    changeDate () {
      if (this.formItem.startTime) {
        this.$refs['changeDatePicker'].onSelectionModeChange('time');// 弹出时间选择框
        this.startTime = this.$refs.changeDatePicker.visualValue;
        this.formItem.startTime = this.$refs.changeDatePicker.visualValue;
      }
    },
    changeDate1 () {
      if (this.formItem.endTime) {
        this.$refs['changeDatePicker1'].onSelectionModeChange('time');// 弹出时间选择框

        this.formItem.endTime = this.$refs.changeDatePicker1.visualValue;
      }
    },
    goSelectHeader () {
      this.visiable_emp1 = true;
    },
    goSelectPeople () {
      if (this.formItem.source === 1 && this.formItem.personalPlanTask.planId) {
        for (let i = 0; i < this.organizationList.length; i++) {
          if (this.organizationList[i].id === this.formItem.personalPlanTask.planId) {
            this.oId = this.organizationList[i].organizationId;
          }
        }
      }
      console.log(this.oId);
      this.visiable_emp = true;
    },
    handleAdd () {
      this.formItem.pesronalTaskContent.push({
        content: null,
        quote: null,
        type: 0
      });
    },
    delHang (item, index) {
      this.formItem.pesronalTaskContent.splice(index, 1);
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
