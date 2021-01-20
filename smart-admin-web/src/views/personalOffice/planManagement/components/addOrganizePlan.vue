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
        <span>添加组织计划</span>
      </div>

      <Card dis-hover>
        <Form :model="formItem"
              :label-width="150"
              inline>
          <FormItem :label="$t('title')"
                    style="width:80%">
            <Input v-model="formItem.input"
                   placeholder="Enter something..."></Input>
          </FormItem>

          <FormItem :label="$t('kind')"
                    style="width:40%">
            <CheckboxGroup v-model="formItem.checkbox">
              <Checkbox label="个人计划"></Checkbox>
              <Checkbox label="组织计划"></Checkbox>
              <Checkbox label="工作汇报"></Checkbox>
              <Checkbox label="工作总结"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem :label="$t('organizationSelect')"
                    style="width:40%">
            <Select v-model="formItem.select1">
              <Option value="1">New York</Option>
              <Option value="2">London</Option>
              <Option value="3">Sydney</Option>
            </Select>
          </FormItem>

          <FormItem :label="$t('planType')"
                    style="width:40%">
            <Select v-model="formItem.select">
              <Option value="1">New York</Option>
              <Option value="2">London</Option>
              <Option value="3">Sydney</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('planDate')"
                    style="width:40%">
            <DatePicker type="datetime"
                        :options="options3"
                        format="yyyy-MM-dd HH:mm:ss"
                        @on-change="changeDate2"
                        ref="changeDatePicker2"
                        v-model="formItem.startTime"
                        placeholder="Select date"></DatePicker>
          </FormItem>

          <FormItem :label="$t('startTime')"
                    prop="startTime"
                    style="width:40%;">
            <DatePicker type="datetime"
                        :options="options3"
                        format="yyyy-MM-dd HH:mm:ss"
                        @on-change="changeDate"
                        ref="changeDatePicker"
                        v-model="formItem.startTime"
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

          <FormItem :label="$t('remindTime')"
                    style="width:40%;">
            <span>提前</span>
            <Input v-model="formItem.userName"
                   style="width:200px;margin:0 10px"
                   placeholder="Enter something..."></Input>
            <span>天</span>
          </FormItem>
          <FormItem style="width:40%;"
                    :label="$t('sjdxtx')">
            <Checkbox v-model="single"></Checkbox>
          </FormItem>

          <FormItem :label="$t('planContent')"
                    style="width:80%">
            <Input v-model="formItem.input"
                   type="textarea"
                   placeholder="Enter something..."></Input>
          </FormItem>

          <FormItem :label="$t('fj')"
                    style="width:80%">
            <Upload :action="myupLoadUrl">
              <Button icon="ios-add"></Button>
            </Upload>
          </FormItem>

          <FormItem :label="$t('hbjh')"
                    style="width:80%">
            <Input v-model="formItem.input"
                   placeholder="Enter something..."></Input>
          </FormItem>

          <FormItem :label="$t('fxjh')"
                    style="width:80%">
            <Input v-model="formItem.input"
                   placeholder="Enter something..."></Input>
          </FormItem>
        </Form>

        <div style="margin-left:100px">
          <Button type="primary">布置任务</Button>
          <Table :columns="columns1"
                 width='1000'
                 style="margin-top:20px;"
                 :data="data1">
            <template slot-scope="{ row, index }"
                      slot="action">
              <Button type="primary"
                      size="small"
                      style="margin-right: 5px"
                      @click="deleteTask(index)">View</Button>
              <Button type="error"
                      size="small"
                      @click="update(index)">Delete</Button>
            </template>
          </Table>
        </div>

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
  </div>
</template>
<script>
export default {
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
      columns1: [
        {
          title: this.$t('taskName'),
          key: 'name'
        },
        {
          title: this.$t('action'),
          key: 'age',
          slot: 'action'
        }
      ],
      data1: [],
      modal1: false,
      single: false,
      formItem: {},
      options3: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      count: [0, 1, 2]
    };
  },
  watch: {
    visible () {
      this.modal1 = this.visible;
      console.log(this.modal1);
    }
  },
  methods: {
    ok () {

    },
    cancel () {
      this.$emit('updateStat', false);
    },
    changeDate () {
      if (this.testForm.startTime) {
        this.$refs['changeDatePicker'].onSelectionModeChange('time');// 弹出时间选择框

        this.testForm.startTime = this.$refs.changeDatePicker.visualValue;
      }
    },
    changeDate1 () {
      if (this.testForm.endTime) {
        this.$refs['changeDatePicker1'].onSelectionModeChange('time');// 弹出时间选择框

        this.testForm.endTime = this.$refs.changeDatePicker1.visualValue;
      }
    },
    changeDate2 () {
      if (this.testForm.endTime) {
        this.$refs['changeDatePicker2'].onSelectionModeChange('time');// 弹出时间选择框

        this.testForm.endTime = this.$refs.changeDatePicker2.visualValue;
      }
    },
    goSelectObject () {

    },
    handleAdd () {
      if (this.count.length) {
        this.count.push(this.count[this.count.length - 1] + 1);
      } else {
        this.count.push(0);
      }
    },
    handleClose2 (event, name) {
      const index = this.count.indexOf(name);
      this.count.splice(index, 1);
    },
    deleteTask () {

    },
    update () {

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
