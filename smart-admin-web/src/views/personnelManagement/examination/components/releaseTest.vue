<template>
  <div>
    <Modal v-model="mymoadlStat"
           class="add"
           width="1024"
           :closable="false"
           :mask-closable="false"
           :transfer="false"
           fullscreen>
      <div slot="header"
           style="text-align:left;color:#fff;">
        <span>发布考试</span>
      </div>
      <Card dis-hover>
        <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
          <Form ref="form"
                :model="testForm"
                label-position="right"
                :label-width="150"
                :rules="ruleValidate"
                inline>
            <FormItem :label="$t('testName')"
                      prop="title"
                      style="width:40%;">
              <Input v-model="testForm.examName"></Input>
            </FormItem>
            <FormItem :label="$t('testType')"
                      prop="collectType"
                      style="width:40%;">
              <Select v-model="testForm.examTypeId">
                <Option v-for="item in typeList"
                        :key="item.id"
                        :value="item.id">{{ item.typeName }}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('startTime')"
                      prop="title"
                      style="width:40%;">
              <DatePicker type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          @on-change="changeDate"
                          ref="changeDatePicker"
                          v-model="testForm.startTime"
                          placeholder="Select date"
                          style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem :label="$t('endTime')"
                      prop="title"
                      style="width:40%;">
              <DatePicker type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          @on-change="changeDate1"
                          ref="changeDatePicker1"
                          v-model="testForm.endTime"
                          placeholder="Select date"
                          style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem :label="$t('questionNum')"
                      prop="title"
                      style="width:40%;">
              <Input v-model="testForm.questionCount"></Input>
            </FormItem>
            <FormItem :label="$t('totalCount')"
                      prop="title"
                      style="width:40%;">
              <Input v-model="testForm.totalPoint"></Input>
            </FormItem>
            <FormItem :label="$t('passGoal')"
                      prop="title"
                      style="width:40%;">
              <Input v-model="testForm.passPoint"></Input>
            </FormItem>
            <FormItem :label="$t('testTime')"
                      prop="title"
                      style="width:40%;">
              <Input v-model="testForm.totalTime"></Input>
            </FormItem>
            <FormItem :label="$t('testObject')"
                      prop="title"
                      style="width:80%;">
              <Input v-model="testForm.userName"
                     type="textarea"
                     @click.native="goSelectExamObject"
                     :autosize="{ minRows: 2, maxRows: 5 }"
                     :placeholder="$t('processDesign_view.TipPerson')"
                     readonly></Input>
            </FormItem>
            <FormItem :label="$t('questionsSetting')"
                      prop="title"
                      style="width:100%;">
              <span style="padding-right:10px">题库分类</span>
              <Input v-model="testForm.typeName"
                     style="width:300px;"
                     @click.native="goSelectType"
                     :placeholder="$t('selectQuestionType')"></Input>
              <!-- <span style="margin-left:530px">权重</span>
              <Input v-model="testForm.weight"
                     style="width:300px;padding-left:10px;"></Input>
              <Button type="success"
                      style="width:100px;margin-left:50px">添加</Button> -->
            </FormItem>
          </Form>
        </div>
      </Card>
      <div slot="footer">
        <ButtonGroup>
          <Button type="primary"
                  size="large"
                  :loading="modal_loading"
                  @click="handsave">{{ $t("Save") }}</Button>
          <Button type="error"
                  size="large"
                  @click="cancel">{{
            $t("Close")
          }}</Button>
        </ButtonGroup>
      </div>
    </Modal>
    <Modal v-model="kindModal"
           width="1024"
           :title="$t('selectType')">
      <Table :columns="kindColumns"
             @on-selection-change="changeTable"
             :data="kindData">
      </Table>
      <div slot="footer">
        <ButtonGroup>
          <Button type="primary"
                  size="large"
                  :loading="modal_loading"
                  @click="ok_type">{{ $t("Save") }}</Button>
          <Button type="error"
                  size="large"
                  @click="cancel_type">{{
            $t("Close")
          }}</Button>
        </ButtonGroup>
      </div>
    </Modal>
    <employeeSelect :modalstat="visiable_emp"
                    :type="mytype"
                    :memberId="testForm"
                    @updateStat="updateStat_emp">
    </employeeSelect>
  </div>
</template>
<script>
import { examination } from '@/api/examination';
import employeeSelect from './modal';

export default {
  components: {
    employeeSelect
  },
  name: 'releaseTest',
  props: {
    modalstat: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mymoadlStat: this.modalstat,
      testForm: {
        examEmployeeList: [],
        examQuestionBankList: []
      },
      visiable_emp: false,
      mytype: 3,
      modal_loading: false,
      ruleValidate: {

      },
      typeList: [],
      kindModal: false,
      kindColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('kindName'),
          key: 'typeName'
        },
        {
          title: this.$t('Desc'),
          key: 'desc'
        },
        {
          title: this.$t('weight'),
          key: 'weight',
          render: (h, params) => {
            console.log(2222222, params);
            return h('Input', {
              props: {
                value: params.row.weight
              },
              on: {
                'on-change': (event) => {
                  console.log(666666666, event.currentTarget.value);
                  // 获取编辑行的inde和编辑字段名，对表格数据进行重新赋值
                  this.$set(this.kindData[params.index], [params.column.key], event.currentTarget.value);
                  console.log(this.kindData);
                }
              }
            });
          }
        }
      ],
      kindData: [],
      selectedData: []
    };
  },
  created () {
    this.getTypeList();
    this.getKindList();
  },
  mounted () {

  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
    }
  },
  methods: {
    updateStat_emp (stat, empList, type) {
      this.visiable_emp = stat;
      if (empList) {
        if (type === 3) {
          this.testForm.userName = empList.names;
          this.testForm.employeeId = empList.empIds;
          const list = this.testForm.employeeId.split(',');
          for (let i = 0; i < list.length; i++) {
            const data = {
              employeeId: Number(list[i])
            };
            this.testForm.examEmployeeList.push(data);
          }
        }
      }
      console.log(222222222222222, this.testForm.examEmployeeList);
    },
    changeTable (val) {
      this.selectedData = val;
    },
    handsave () {
      console.log(22222222222, this.testForm);
      const data = {
        endTime: this.testForm.endTime,
        examEmployeeList: this.testForm.examEmployeeList,
        examName: this.testForm.examName,
        examQuestionBankList: this.testForm.examQuestionBankList,
        examTypeId: this.testForm.examTypeId,
        passPoint: Number(this.testForm.passPoint),
        questionCount: Number(this.testForm.questionCount),
        startTime: this.testForm.startTime,
        totalPoint: Number(this.testForm.totalPoint),
        totalTime: Number(this.testForm.totalTime)
      };
      console.log(1111111111111, data);
      examination.releaseExam(data).then(res => {
        console.log(res);
        this.$emit('updateStat', false);
      });
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    // 获取考试类型下拉框
    getTypeList () {
      const data = {
        pageNum: 1,
        pageSize: 100
      };
      examination.findTestType(data).then(res => {
        this.typeList = res.data.list;
      });
    },

    // 选择考试对象对话框
    goSelectExamObject () {
      this.visiable_emp = true;
    },
    // 获取考试分类
    getKindList () {
      examination.findExaminationType().then(res => {
        this.kindData = res.data;
        for (let i = 0; i < this.kindData.length; i++) {
          this.$set(this.kindData[i], 'weight', 0);
        }
        console.log(123123, this.kindData);
      });
    },
    // 弹出选择考试分类
    goSelectType () {
      this.kindModal = true;
    },
    ok_type () {
      this.testForm.typeName = this.selectedData[0].typeName;
      console.log(this.selectedData);
      for (let i = 0; i < this.selectedData.length; i++) {
        console.log(this.selectedData[i].weight);
        const data = {
          questionBankId: Number(this.selectedData[i].id),
          weight: Number(this.selectedData[i].weight)
        };
        console.log(222222222, data);
        this.testForm.examQuestionBankList.push(data);
      }
      console.log(3333333333, this.testForm.examQuestionBankList);
      this.kindModal = false;
    },
    cancel_type () {
      this.kindModal = false;
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
