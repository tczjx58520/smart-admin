<template>
        <Modal v-model="mymoadlStat" class="add" width="1020" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('salaryEntry_view.newSalaryEntry') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <Form ref="form" :model="addformbase" label-position="right" :label-width="100" :rules="ruleValidate">
                    <FormItem :label="$t('processDesign_view.newProcess')" prop="newProcess">
                        <Input v-model="addformbase.categoryName"></Input>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.category')" prop="category">
                        <Select v-model="addformbase.category" style="width:100%">
                            <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.categoryName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.businessDocuments')" prop="businessDocuments">
                        <Select v-model="addformbase.business" style="width:100%">
                            <Option v-for="item in businessList" :value="item.id" :key="item.id">{{ item.businessName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.processType')" prop="processType">
                        <RadioGroup v-model="addformbase.processType">
                            <Radio :label="$t('processDesign_view.fixedProcess')">
                            </Radio>
                            <Radio :label="$t('processDesign_view.freeSequenceFlow')">
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
                <div style="margin:20px 0;" v-if="addformbase.processType === $t('processDesign_view.fixedProcess')">
              <Button style="margin-right:15px;" @click="additem" icon="md-add" type="info">{{ $t('Create') }}</Button>
            </div>
            <!-- 步骤表格start===================================== -->
            <Table :columns="stepcolumns" :data="stepdata" v-if="addformbase.processType === $t('processDesign_view.fixedProcess')"></Table>
            </Card>
        </div>
        <div slot="footer">
            <ButtonGroup>
                <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button>
                <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
            </ButtonGroup>
        </div>
        <addShe :modalstat = "visiable" :editinfo="rowinfo" :stepinfo="stepdata" @updateStat = "updateStat_step"></addShe>
    </Modal>
    <!-- 设置步骤弹窗======================= -->
</template>
<script>
import Tables from '@/components/tables';
import addShe from '../addmodalShe/modal';
import { FlowCategoryApi } from '@/api/flowClassification';
import { salaryEntryApi } from '@/api/salaryentry';
export default {
  name: 'addGong',
  components: {
    Tables,
    addShe
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null
  },
  created () {
    console.log('moadlStat=======>', this.modalstat);
  },
  mounted () {
  },
  data () {
    return {
      visiable: false,
      table_loading: true,
      addformbase: {},
      modal_loading: false,
      mymoadlStat: this.modalstat,
      ruleValidate: {
        newProcess: [
          { required: true, message: 'The newProcess cannot be empty', trigger: 'blur' }
        ],
        processClassification: [
          { required: true, message: 'The processClassification cannot be empty', trigger: 'blur' }
        ],
        category: [
          { required: true, message: 'The processClassification cannot be empty', trigger: 'blur' }
        ],
        businessDocuments: [
          { required: true, message: 'The processClassification cannot be empty', trigger: 'blur' }
        ],
        processNumber: [
          { required: true, message: 'The processClassification cannot be empty', trigger: 'blur' }
        ],
        processType: [
          { required: true, message: 'The processClassification cannot be empty', trigger: 'blur' }
        ]
      },
      searchForm: {
        pageNum: 1,
        pageSize: 999
      },
      categoryList: [],
      businessList: [
        {
          id: 1,
          businessName: '薪酬审批'
        }
      ],
      stepcolumns: [
        {
          title: this.$t('processDesign_view.serialNumber'),
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('processDesign_view.stepName'),
          key: 'stepName'
          // width: 100
        },
        {
          title: this.$t('processDesign_view.condition'),
          key: 'condition'
          // width: 100
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          className: 'action-hide',
          render: (h, params) => {
            return this.$tableAction(h, [
              {
                title: '步骤设置',
                action: () => {
                  this.visiable = true;
                  this.rowinfo = params.row;
                }
              },
              {
                title: '删除',
                action: () => {
                  this.$Modal.confirm({
                    title: '友情提醒',
                    content: '确定要删除吗？',
                    onOk: () => {
                      console.log('删除');
                      this.stepdata.splice(params.index, 1);
                    }
                  });
                }
              }
            ]);
          }
        }
      ],
      stepdata: [
        { stepName: this.$t('processDesign_view.start') },
        { stepName: this.$t('processDesign_view.finish') }
      ],
      rowinfo: null
    };
  },
  watch: {
    async modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.modalstat) {
        this.getbaseclassification();
      }
    }

  },
  methods: {
    updateStat_step (stat) {
      this.visiable = stat;
    },
    // 添加步骤
    additem () {
      this.$Modal.confirm({
        title: '输入步骤名称',
        render: (h) => {
          return h('Input', {
            props: {
              value: this.value,
              placeholder: 'Please enter your stepName'
            },
            on: {
              input: (val) => {
                this.value = val;
              }
            }
          });
        },
        onOk: () => {
          console.log('this.value==============>', this.value);
          let obj =
        { stepName: this.value };
          const length = this.stepdata.length - 1;
          this.stepdata.splice(length, 0, obj);
          this.value = '';
        },
        onCancel: () => {
          this.$Message.warning('cacel');
        }
      });
    },
    // 获取基础信息
    async getbaseclassification () {
      await FlowCategoryApi.getGroup(this.searchForm).then(res => {
        this.categoryList = res.data.content.list;
      });
    },
    getmydate (e, scope) {
      // row.grantDate = e;
      this.data[scope.index].grantDate = e;
      console.log('value============>', this.data);
    },
    getmyyearAndMonth (e, scope) {
      // row.grantDate = e;
      this.data[scope.index].yearAndMonth = e;
      console.log('value============>', this.data);
    },
    getcurrentdate () {
      let myDate = new Date(); // 获取当前年份(2位)
      let year = myDate.getFullYear(); // 获取完整的年份(4位,1970-????)
      let month = myDate.getMonth(); // 获取当前月份(0-11,0代表1月)
      if (month + 1 < 10) {
        month = '0' + (month + 1);
      }
      return year + '-' + month;
    },
    getpredate () {
      let myDate = new Date(); // 获取当前年份(2位)
      let year = myDate.getFullYear(); // 获取完整的年份(4位,1970-????)
      let month = myDate.getMonth(); // 获取当前月份(0-11,0代表1月)
      if (month + 1 < 10) {
        month = '0' + (month + 1);
      }
      let dayNow = year + '-' + month;
      let arr = dayNow.split('-');
      let peryear = arr[0]; // 获取当前日期的年份
      let premonth = arr[1]; // 获取当前日期的月份
      let year2 = peryear;
      let month2 = parseInt(month) - 1;
      if (month2 === 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
      }
      if (month2 < 10) {
        month2 = '0' + month2;
      }
      return year2 + '-' + month2;
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    async handsave () {
      this.modal_loading = true;
      console.log('this.baseinfo=============================>', this.baseinfo);
      // 把输入的值插入json
      for (let i = 0; i < this.baseinfo.length; i++) {
        // this.baseinfo[i].salaryOptionvalue = [];
        let count = 0;
        for (const key in this.baseinfo[i]) {
          count++;
          if (count > 14) {
            this.baseinfo[i].salaryOptionJson[count - 15].optionMoney = this.baseinfo[i][key];
          }
          if (key === '实发工资') {
            this.baseinfo[i].actualSalary = this.baseinfo[i][key];
          }
          if (key === '应发工资') {
            this.baseinfo[i].shouldSalary = this.baseinfo[i][key];
          }
        }
      }
      for (let j = 0; j < this.baseinfo.length; j++) {
        if (this.baseinfo[j].isEnter === 0) {
          this.baseinfo[j].createId = this.$store.state.user.userId;
          this.baseinfo[j].empId = this.baseinfo[j].id;
          this.baseinfo[j].salaryOptionJson = JSON.stringify(this.baseinfo[j].salaryOptionJson);
          await salaryEntryApi.addentryList(this.baseinfo[j]).then(res => {
            this.$Message.success('新建成功');
          });
        } else {
          this.baseinfo[j].salaryId = this.baseinfo[j].salaryinfo.id;
          this.baseinfo[j].operatId = this.$store.state.user.userId;
          this.baseinfo[j].salaryOptionJson = JSON.stringify(this.baseinfo[j].salaryOptionJson);
          await salaryEntryApi.updateentryList(this.baseinfo[j]).then(res => {
            this.$Message.success('修改成功');
          });
        }
      }
      this.modal_loading = false;
      this.$emit('updateStat', false);
    }
  }
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
    .add /deep/ .ivu-table-wrapper{
      overflow: visible;
    }
</style>
