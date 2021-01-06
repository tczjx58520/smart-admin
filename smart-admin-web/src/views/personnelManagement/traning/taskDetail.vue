<template>
  <div style="height:100%">
    <Card dis-hover
          style="height:100%">
      <p style="margin-bottom:20px;font-weight:600">培训任务基本信息</p>
      <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
        <Form ref="form"
              :model="formData"
              label-position="right"
              :label-width="150"
              inline>
          <FormItem :label="$t('TrainingActivityName')"
                    prop="examName"
                    style="width:40%;">
            <Input v-model="formData.taskName"
                   disabled></Input>
          </FormItem>
          <FormItem :label="$t('traningKind')"
                    prop="typeName1"
                    style="width:40%;">
            <Select v-model="formData.taskType"
                    disabled>
              <Option :value="0">本组织自行培训</Option>
              <Option :value="1">公司集体培训</Option>
              <Option :value="2">外训</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('startTime')"
                    prop="startTime"
                    style="width:40%;">
            <DatePicker type="datetime"
                        disabled
                        :options="options3"
                        format="yyyy-MM-dd HH:mm:ss"
                        @on-change="changeDate"
                        ref="changeDatePicker"
                        v-model="formData.startTime"
                        placeholder="Select date"
                        style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem :label="$t('endTime')"
                    prop="endTime"
                    style="width:40%;">
            <DatePicker type="datetime"
                        disabled
                        :options="options3"
                        format="yyyy-MM-dd HH:mm:ss"
                        @on-change="changeDate1"
                        ref="changeDatePicker1"
                        v-model="formData.endTime"
                        placeholder="Select date"
                        style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem :label="$t('traningType')"
                    prop="questionCount"
                    style="width:40%;">
            <Select v-model="formData.trainningTypeId"
                    disabled>
              <Option v-for="item in typeList"
                      :key="item.id"
                      :value="item.id">{{ item.typeName }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('traningPlace')"
                    prop="totalPoint"
                    style="width:40%;">
            <Input v-model="formData.address"
                   disabled></Input>
          </FormItem>
          <FormItem :label="$t('traningPController')"
                    prop="passPoint"
                    style="width:40%;">
            <Input v-model="formData.headName"
                   disabled></Input>
          </FormItem>
          <FormItem :label="$t('ifTest')"
                    prop="totalTime"
                    style="width:40%;">
            <RadioGroup v-model="formData.whetherExam">
              <Radio :label="0">需要</Radio>
              <Radio :label="1">不需要</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>
      <p style="margin:20px;font-weight:600">培训明细</p>
      <div>
        <Table max-height="500px"
               :columns="columns"
               :data="tableData"></Table>
      </div>

      <!-- <div style="position:fixed; bottom:50px;left:50%">
        <Button type="primary"
                size="large"
                style="width:100px"
                :loading="modal_loading"
                @click="handsave">{{ $t("Save") }}</Button>
      </div> -->

    </Card>
  </div>
</template>
<script>
import { training } from '@/api/traning';
export default {
  name: 'taskDetail',
  data () {
    return {
      testForm: {},
      modal_loading: false,
      typeList: [],
      options3: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      columns: [
        {
          title: this.$t('trainingPeople'),
          key: 'employeeName'
        },
        {
          title: this.$t('belongOrganize'),
          key: 'organizationName'
        },
        {
          title: this.$t('belongWork'),
          key: 'postName'
        },
        {
          title: this.$t('workLevel'),
          key: 'levelName'
        },
        {
          title: this.$t('trainingDays'),
          key: 'trainningDays'
        },
        {
          title: this.$t('qianDaoDay'),
          key: 'signDays'
        },
        {
          title: this.$t('traningResult'),
          key: 'result'
        },
        {
          title: this.$t('trainingGoal'),
          key: 'point'
        }
      ],
      tableData: [],
      formData: {},
      listQuery: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },

  created () {
    this.formData = this.$route.query.data;
    this.tableData = this.formData.taskVo;
    console.log(222222, this.tableData);
  },
  mounted () {
    this.getTypeList();
  },
  methods: {
    getTypeList () {
      training.findTrainingType(this.listQuery).then(res => {
        console.log(res);
        this.typeList = res.data.list;
      });
    },
    changeDate () {

    },
    changeDate1 () {

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
