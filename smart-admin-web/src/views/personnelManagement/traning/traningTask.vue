<template>
  <div>
    <Card class="warp-card"
          dis-hover>
      <div>
        <Button style="margin-right:15px;"
                icon="md-refresh"
                @click="refresh"
                type="default">{{ $t('Reflash') }}</Button>
        <Button style="margin-right:15px;"
                @click="addGong"
                icon="md-add"
                type="warning">{{ $t('Create') }}</Button>
        <Button style="margin-right:15px;"
                @click="deleteMore"
                icon="md-close"
                type="error">{{ $t('Delete') }}</Button>
      </div>
    </Card>

    <Card style="margin-top:10px">
      <Table max-height="500px"
             :columns="Gongcolumns"
             :data="tableData"
             :loading="Gongloading"
             @on-selection-change="changeTable"></Table>
      <Page :current="Gongsearchform.pageNum"
            :page-size="Gongsearchform.pageSize"
            :page-size-opts="[10, 20, 30, 50, 100]"
            :total="GongpageTotal"
            @on-change="GongchangePage"
            @on-page-size-change="GongchangePageSize"
            show-elevator
            show-sizer
            show-total
            style="margin:24px 0;text-align:right;"></Page>
    </Card>

    <!--添加-->
    <Modal width="720"
           v-model="modal1"
           :title="$t('addTrainingTask1')">
      <Form :model="formItem"
            ref="formRef"
            :rules="ruleInline"
            :label-width="100">
        <FormItem :label="$t('TrainingTypeName')"
                  prop="typeName">
          <Input v-model="formItem.taskName"
                 placeholder="Enter something..." />
        </FormItem>
        <FormItem :label="$t('traningKind')"
                  prop="desc">
          <Select v-model="formItem.taskType">
            <Option value="0">本组织自行培训</Option>
            <Option value="1">公司集体培训</Option>
            <Option value="2">外训</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('traningType')"
                  prop="desc">
          <Select v-model="formItem.trainningTypeId">
            <Option v-for="item in typeList"
                    :value="item.id"
                    :key="item.id">{{item.typeName}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('traningPlace')"
                  prop="desc">
          <Input v-model="formItem.address"
                 placeholder="Enter something..." />
        </FormItem>
        <FormItem :label="$t('startTime')"
                  prop="startTime">
          <DatePicker type="datetime"
                      :options="options3"
                      format="yyyy-MM-dd HH:mm:ss"
                      @on-change="changeDate"
                      ref="changeDatePicker"
                      placeholder="Select date"
                      v-model="startTime"
                      style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem :label="$t('endTime')"
                  prop="endTime">
          <DatePicker type="datetime"
                      :options="options3"
                      format="yyyy-MM-dd HH:mm:ss"
                      @on-change="changeDate1"
                      ref="changeDatePicker1"
                      placeholder="Select date"
                      v-model="endTime"
                      style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem :label="$t('traningPController')"
                  prop="desc">
          <Input v-model="formItem.headName"
                 @click.native="goSelectController"
                 :autosize="{ minRows: 2, maxRows: 5 }"
                 placeholder="Enter something..." />
        </FormItem>
        <FormItem :label="$t('trainingPeople')"
                  prop="desc">
          <Input v-model="formItem.trainingPeople"
                 disabled
                 type="textarea"
                 placeholder="Enter something..." />
          <Button type="info"
                  style="margin-top:10px;margin-right:10px"
                  size="large"
                  @click="goSelectPeople">{{ $t("followPeople") }}</Button>
          <Button type="info"
                  style="margin-top:10px;margin-right:10px"
                  size="large"
                  @click="goSelectOrganization">{{ $t("followOrganization") }}</Button>
        </FormItem>
        <FormItem :label="$t('ifTest')"
                  prop="desc">
          <RadioGroup v-model="formItem.whetherExam">
            <Radio :label="0">需要</Radio>
            <Radio :label="1">不需要</Radio>
          </RadioGroup>
          <Button type="info"
                  v-if="formItem.whetherExam===0"
                  style="margin-left:20px"
                  size="small"
                  @click="goSelectExam">{{ $t("selectExam") }}</Button>
        </FormItem>
      </Form>
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

    <!--修改-->
    <Modal width="720"
           v-model="modal_edit"
           :title="$t('updateTrainingTask')">
      <Form :model="formItem"
            ref="formRef"
            :rules="ruleInline"
            :label-width="100">
        <FormItem :label="$t('TrainingTypeName')"
                  prop="typeName">
          <Input v-model="formItem.taskName"
                 placeholder="Enter something..." />
        </FormItem>
        <FormItem :label="$t('traningKind')"
                  prop="desc">
          <Select v-model="formItem.taskType">
            <Option :value="0">本组织自行培训</Option>
            <Option :value="1">公司集体培训</Option>
            <Option :value="2">外训</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('traningType')"
                  prop="desc">
          <Select v-model="formItem.trainningTypeId">
            <Option v-for="item in typeList"
                    :value="item.id"
                    :key="item.id">{{item.typeName}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('traningPlace')"
                  prop="desc">
          <Input v-model="formItem.address"
                 placeholder="Enter something..." />
        </FormItem>
        <FormItem :label="$t('startTime')"
                  prop="startTime">
          <DatePicker type="datetime"
                      :options="options3"
                      format="yyyy-MM-dd HH:mm:ss"
                      @on-change="changeDate"
                      ref="changeDatePicker"
                      placeholder="Select date"
                      v-model="startTime"
                      style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem :label="$t('endTime')"
                  prop="endTime">
          <DatePicker type="datetime"
                      :options="options3"
                      format="yyyy-MM-dd HH:mm:ss"
                      @on-change="changeDate1"
                      ref="changeDatePicker1"
                      placeholder="Select date"
                      v-model="endTime"
                      style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem :label="$t('traningPController')"
                  prop="desc">
          <Input v-model="formItem.headName"
                 @click.native="goSelectController"
                 :autosize="{ minRows: 2, maxRows: 5 }"
                 placeholder="Enter something..." />
        </FormItem>
        <FormItem :label="$t('trainingPeople')"
                  prop="desc">
          <Input v-model="formItem.trainingPeople"
                 disabled
                 type="textarea"
                 placeholder="Enter something..." />
          <Button type="info"
                  style="margin-top:10px;margin-right:10px"
                  size="large"
                  @click="goSelectPeople">{{ $t("followPeople") }}</Button>
          <Button type="info"
                  style="margin-top:10px;margin-right:10px"
                  size="large"
                  @click="goSelectOrganization">{{ $t("followOrganization") }}</Button>
        </FormItem>
        <FormItem :label="$t('ifTest')"
                  prop="desc">
          <RadioGroup v-model="formItem.whetherExam">
            <Radio :label="0">需要</Radio>
            <Radio :label="1">不需要</Radio>
          </RadioGroup>
          <Button type="info"
                  v-if="formItem.whetherExam===0"
                  style="margin-left:20px"
                  size="small"
                  @click="goSelectExam">{{ $t("selectExam") }}</Button>
        </FormItem>
      </Form>
      <div slot="footer">
        <ButtonGroup>
          <Button type="primary"
                  size="large"
                  @click="ok_edit">{{ $t("Save") }}</Button>
          <Button type="error"
                  size="large"
                  @click="cancel_edit">{{
            $t("Close")
          }}</Button>
        </ButtonGroup>
      </div>
    </Modal>
    <Modal v-model="selectExam"
           title="选择考试"
           width="1024px">
      <Table border
             ref="selection"
             :columns="columns4"
             @on-selection-change="changeExamTable"
             :data="ExamtableData">
      </Table>
      <Page :current="examQuery.pageNum"
            :page-size="examQuery.pageSize"
            :page-size-opts="[10, 20, 30, 50, 100]"
            :total="ExamTotal"
            @on-change="ExamchangePage"
            @on-page-size-change="ExamchangePageSize"
            show-elevator
            show-sizer
            show-total
            style="margin:24px 0;text-align:right;"></Page>
      <div slot="footer">
        <ButtonGroup>
          <Button type="primary"
                  size="large"
                  @click="okExam">{{ $t("Save") }}</Button>
          <Button type="error"
                  size="large"
                  @click="cancelExam">{{
            $t("Close")
          }}</Button>
        </ButtonGroup>
      </div>
    </Modal>
    <Modal v-model="evaluation"
           title="培训考评"
           width="1024px">
      <Table border
             ref="selection"
             :columns="evaluationColumns"
             :data="evaluationTableData">
      </Table>
      <div slot="footer">
        <ButtonGroup>
          <Button type="primary"
                  size="large"
                  @click="okEvaluation">{{ $t("Save") }}</Button>
          <Button type="error"
                  size="large"
                  @click="cancelEvaluation">{{
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
import { training } from '@/api/traning';
import controllerSelect from './components/addemp_single/modal';
import userSelect from './components/addemp_single/modal1';
import organizationSelect from './components/add_org/modal';
import { examination } from '@/api/examination';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10
};
const defaulExamQuery = {
  pageNum: 1,
  pageSize: 10
};
const defaultFormItem = {
  employeeList: [],
  startTime: null,
  endTime: null,
  whetherExam: 1,
  taskType: null,
  trainningTypeId: null
};
export default {
  components: {
    userSelect,
    controllerSelect,
    organizationSelect
  },
  data () {
    return {
      evaluation: false,
      listQuery: Object.assign({}, defaultListQuery),
      GongpageTotal: 0,
      Gongloading: false,
      Gongsearchform: {
        pageNum: 1,
        pageSize: 10
      },
      options3: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      evaluationColumns: [
        {
          title: this.$t('trainingPeople'),
          key: 'employeeName',
          align: 'center'
        },
        {
          title: this.$t('belongOrganize'),
          key: 'organizationName',
          align: 'center'
        },
        {
          title: this.$t('traningResult'),
          key: 'result',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.result
              },
              on: {
                'on-change': (event) => {
                  console.log(params);
                  this.evaluationTableData[params.index][params.column.key] = event.currentTarget.value; // 获取编辑行的inde和编辑字段名，对表格数据进行重新赋值
                }
              }
            });
          }
        }
      ],
      evaluationTableData: [],
      columns4: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('examActivityName'),
          key: 'examName',
          align: 'center'
        },
        {
          title: this.$t('startTime'),
          key: 'startTime',
          align: 'center'
        },
        {
          title: this.$t('endTime'),
          key: 'endTime',
          align: 'center'
        },
        {
          title: this.$t('questionNum'),
          key: 'questionCount',
          align: 'center'
        },
        {
          title: this.$t('examNum'),
          key: 'employeeTotalCount',
          align: 'center'
        },
        {
          title: this.$t('alreadyNum'),
          key: 'employeeCount',
          align: 'center'
        },
        {
          title: this.$t('passGoal'),
          key: 'passPoint',
          align: 'center'
        }, {
          title: this.$t('passNum'),
          key: 'employeePassCount',
          align: 'center'
        }
      ],
      ExamtableData: [],
      ExamTotal: 0,
      visiable_emp: false,
      visiable_emp1: false,
      visiable_org: false,
      selectExam: false,
      mytype: 3,
      formItem: Object.assign({}, defaultFormItem),
      modal1: false,
      modal_edit: false,
      Gongcolumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('TrainingActivityName'),
          key: 'taskName'
        },
        {
          title: this.$t('startTime'),
          key: 'startTime'
        },
        {
          title: this.$t('endTime'),
          key: 'endTime'
        },
        {
          title: this.$t('traningPlace'),
          key: 'address'
        },
        {
          title: this.$t('traningPController'),
          key: 'headName'
        },
        {
          title: this.$t('traningType'),
          key: 'typeName'
        },
        {
          title: this.$t('traningStatus'),
          key: 'status',
          render: (h, params) => {
            if (params.row.status === 0) {
              return h('span', '未开始');
            } if (params.row.status === 1) {
              return h('span', '已开始');
            } if (params.row.status === 2) {
              return h('span', '已终止');
            } if (params.row.status === 3) {
              return h('span', '已结束');
            } if (params.row.status === 4) {
              return h('span', '已考评');
            }
          }
        },
        {
          title: this.$t('traningKind'),
          key: 'taskType',
          render: (h, params) => {
            if (params.row.status === 0) {
              return h('span', '本组织自行培训');
            } if (params.row.status === 1) {
              return h('span', '公司集体培训');
            } else {
              return h('span', '外训');
            }
          }
        },
        {
          title: this.$t('action'),
          key: 'action',
          width: 300,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: params.row.status !== 0 ? 'none' : 'inline-block'
                },
                on: {
                  click: () => {
                    this.show(params.row);
                  }
                }
              }, this.$t('Update')),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: params.row.status !== 0 ? 'none' : 'inline-block'
                },
                on: {
                  click: () => {
                    this.remove(params.row.id);
                  }
                }
              }, this.$t('Delete')),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: params.row.status !== 0 ? 'none' : 'inline-block'
                },
                on: {
                  click: () => {
                    this.break(params.row.id);
                  }
                }
              }, this.$t('Break')),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log(11111, params.row);
                    this.$router.push({ path: '/traning/traningTaskDetail', query: { data: params.row } });
                  }
                }
              }, this.$t('Look')),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: params.row.status !== 3 ? 'none' : 'inline-block'
                },
                on: {
                  click: () => {
                    this.evaluation = true;
                    console.log(params.row);
                    this.evaluationTableData = params.row.taskVo;
                    for (let i = 0; i < this.evaluationTableData.length; i++) {
                      this.evaluationTableData[i].taskId = params.row.id;
                    }
                    console.log(this.evaluationTableData);
                  }
                }
              }, this.$t('Evaluation'))
            ]);
          }
        }
      ],
      ruleInline: {
        // typeName: [
        //   {
        //     required: true,
        //     message: 'Please fill in the materialsName',
        //     trigger: 'blur'
        //   }
        // ],
      },
      tableData: [],
      selectedData: [],
      typeList: [],
      examQuery: Object.assign({}, defaulExamQuery),
      selectedDataExam: [],
      startTime: null,
      endTime: null

    };
  },

  created () {
    // 获取培训类型
    training.findTrainingType(this.listQuery).then(res => {
      console.log(res);
      this.tableData = res.data.list;
      this.GongpageTotal = res.data.totalCount;
    });
  },
  mounted () {
    this.getList();
    this.getTypeList();
    this.getExamList();
  },
  methods: {
    okEvaluation () {
      console.log(333333333444444, this.evaluationTableData);
      training.evaluation(this.evaluationTableData).then(res => {
        this.$Message.success('保存成功');
        this.getList();
      });
      this.evaluation = false;
    },
    cancelEvaluation () {
      this.evaluation = false;
    },
    okExam () {
      if (this.selectedDataExam.length === 0) {
        this.$Message.error('必须选择一场考试');
        return false;
      }
      if (this.selectedDataExam.length > 1) {
        this.$Message.error('只能选择一场考试');
        return false;
      }
      this.formItem.examId = this.selectedDataExam[0].id;
      this.selectExam = false;
      console.log(this.formItem.examId);
    },
    cancelExam () {
      this.selectExam = false;
    },
    changeExamTable (val) {
      this.selectedDataExam = val;
    },
    getExamList () {
      examination.findExamTask(this.examQuery).then(res => {
        this.ExamtableData = res.data.list;
        this.ExamTotal = res.data.totalCount;
      });
    },
    goSelectExam () {
      this.selectExam = true;
    },
    getTypeList () {
      training.findTrainingType(this.listQuery).then(res => {
        this.typeList = res.data.list;
      });
    },
    changeDate () {
      console.log(this.formItem);
      if (this.startTime) {
        this.$refs['changeDatePicker'].onSelectionModeChange('time');// 弹出时间选择框
        this.startTime = this.$refs.changeDatePicker.visualValue;
        this.formItem.startTime = this.startTime;
      }
    },
    changeDate1 () {
      console.log(this.formItem);
      if (this.endTime) {
        this.$refs['changeDatePicker1'].onSelectionModeChange('time');// 弹出时间选择框
        this.endTime = this.$refs.changeDatePicker1.visualValue;
        this.formItem.endTime = this.endTime;
      }
    },
    // 选择负责人
    updateStat_emp1 (stat, empList, type) {
      this.visiable_emp1 = stat;
      if (empList) {
        if (type === 3) {
          this.formItem.headName = empList.names;
          this.formItem.headerId = Number(empList.empIds);
        }
      }
    },

    // 选择人员
    updateStat_emp (stat, empList, type) {
      this.visiable_emp = stat;
      this.formItem.employeeList = [];
      if (empList) {
        if (type === 3) {
          console.log(333333, empList);
          this.formItem.trainingPeople = empList.names;
          this.formItem.employeeIds = empList.empIds;
          const list = this.formItem.employeeIds.split(',');
          for (let i = 0; i < list.length; i++) {
            const data = {
              employeeId: Number(list[i])
            };
            this.formItem.employeeList.push(data);
          }
          console.log(this.formItem.employeeList);
        }
      }
    },

    // 选择组织
    updateStat_org (stat, empList, type) {
      this.visiable_org = stat;
      this.formItem.employeeList = [];
      // console.log(11111, stat);
      // console.log(22222, empList);
      // console.log(33333, type);
      if (empList) {
        if (type === 3) {
          const data = {
            organizationId: Number(empList.organizationOa)
          };
          training.findPeopleByOrc(data).then(res => {
            let eList = res.data;
            console.log(11111111, eList);
            let nameList = [];
            let idList = [];
            for (let i = 0; i < eList.length; i++) {
              console.log(33333333, eList[i].employeeName);
              nameList.push(eList[i].employeeName);
              const data = {
                employeeId: Number(eList[i].id)
              };
              this.formItem.employeeList.push(data);
            }
            let a = nameList.join(',');
            this.$set(this.formItem, 'trainingPeople', a);
            console.log(333333333, this.formItem.trainingPeople);
            console.log(444444, this.formItem.employeeList);
          });
        }
      }
    },
    goSelectController () {
      this.visiable_emp1 = true;
    },
    ExamchangePage (val) {
      this.examQuery.pageNum = val;
      this.getExamList();
    },
    ExamchangePageSize (val) {
      this.examQuery.pageSize = val;
      this.getExamList();
    },
    goSelectPeople () {
      this.visiable_emp = true;
    },
    goSelectOrganization () {
      this.visiable_org = true;
    },

    changeTable (val) {
      this.selectedData = val;
    },
    getList () {
      this.Gongloading = true;
      training.findTrainingTask(this.listQuery).then(res => {
        this.Gongloading = false;
        console.log(res);
        this.tableData = res.data.list;
        this.GongpageTotal = res.data.totalCount;
      });
    },
    show (row) {
      console.log(row);
      this.modal_edit = true;

      this.formItem = Object.assign({}, row);

      this.startTime = this.formItem.startTime;
      this.endTime = this.formItem.endTime;

      let nameList = [];
      for (let i = 0; i < this.formItem.taskVo.length; i++) {
        nameList.push(this.formItem.taskVo[i].employeeName);
      }

      const idList = [];
      this.formItem.taskVo.map(item => {
        idList.push(
          { employeeId: item.employeeId }
        );
      });

      this.formItem.employeeList = idList;
      let a = nameList.join(',');
      this.$set(this.formItem, 'trainingPeople', a);

      console.log(33333333, this.formItem);
    },

    GongchangePage (val) {
      this.listQuery.pageNum = val;
      this.getList();
      console.log(val);
    },
    GongchangePageSize (val) {
      this.listQuery.pageSize = val;
      this.getList();
      console.log(val);
    },
    addGong () {
      this.modal1 = true;
      this.startTime = null;
      this.endTime = null;
      this.formItem = Object.assign({}, defaultFormItem);
    },
    refresh () {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    ok () {
      this.$refs.formRef.validate(valid => {
        console.log(valid);
        if (!valid) {
          this.$Message.error(this.$t('qsrwzxx'));
        } else {
          this.formItem.operationId = this.$store.state.user.userLoginInfo.id;
          this.formItem.status = 0;
          this.formItem.taskType = Number(this.formItem.taskType);
          this.formItem.trainningTypeId = Number(this.formItem.trainningTypeId);
          this.formItem.startTime = this.startTime;
          this.formItem.endTime = this.endTime;
          const data = JSON.stringify(this.formItem);
          training.addTrainingTask(data).then(res => {
            this.getList();
            this.formItem = Object.assign({}, defaultFormItem);
            this.$Message.success('添加成功');
            this.modal1 = false;
          });
        }
      });
    },
    cancel () {
      this.modal1 = false;
      this.formItem = Object.assign({}, defaultFormItem);
      this.$Message.info('Clicked cancel');
    },
    ok_edit () {
      this.formItem.operationId = this.$store.state.user.userLoginInfo.id;
      training.updateTrainingTask(this.formItem).then(res => {
        this.getList();
        this.formItem = Object.assign({}, defaultFormItem);
        this.$Message.success('修改成功');
        this.modal_edit = false;
      });
    },
    cancel_edit () {
      this.formItem = Object.assign({}, defaultFormItem);
      this.modal_edit = false;
    },
    remove (id) {
      const ids = [];
      ids.push(id);
      training.deleteTrainingTask(ids).then(res => {
        this.$Message.success('删除成功');
        this.getList();
      });
    },
    break (id) {
      const data = {
        id: id
      };
      training.breakTrainingTask(data).then(res => {
        this.$Message.success('终止成功');
        this.getList();
      });
    },
    deleteMore () {
      console.log(111111111, this.selectedData);
      if (this.selectedData.length === 0) {
        this.$Message.error('请先选择一行');
        return false;
      }
      const ids = [];
      for (let i = 0; i < this.selectedData.length; i++) {
        ids.push(this.selectedData[i].id);
      }
      training.deleteTrainingTask(ids).then(res => {
        this.$Message.success('删除成功');
        this.getList();
      });
    }
  }
};

</script>
