<template>
        <Modal v-model="mymoadlStat" class="add" width="1460" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('salaryjudge_view.seeDetails') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('BaseData')}}</div>
                </div>
                <Divider />
                <Table
                    :columns="columns"
                    :loading="table_loading"
                    :data="data"
                    ref="myTable"
                    border
                    max-height="500"
                  >
                    <template slot-scope="scope" slot="personName">
                        <span type="text"> {{ scope.row.empName }} </span>
                    </template>
                    <template slot-scope="scope" slot="organizationOaName">
                        <span>{{ scope.row.organizeName }}</span>
                    </template>
                    <template slot-scope="scope" slot="yearAndMonth">
                        <span  style="width: 180px" >{{ scope.row.yearAndMonth }}</span>
                    </template>
                    <template slot-scope="scope" slot="grantDate">
                        <span  style="width: 180px" >{{ scope.row.grantDate }}</span>
                    </template>
                    <template slot-scope="scope" slot="basicAccumulationFund">
                        <span >{{ scope.row.basicAccumulationFund.basicMoney }}</span>
                    </template>
                    <template slot-scope="scope" slot="basicSocialSecurity">
                        <span >{{ scope.row.basicSocialSecurity.basicMoney }}</span>
                    </template>
                  </Table>
                   <div style="display:none;"> {{act}}</div>
            </Card>

        </div>
        <div slot="footer">
            <ButtonGroup>
                <!-- <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button> -->
                <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
            </ButtonGroup>
        </div>
    </Modal>
</template>
<script>
import Tables from '@/components/tables';
import { collectAccountsApi } from '@/api/collectAccounts';
import { salaryOptionApi } from '@/api/salaryOption';
import { salaryEntryApi } from '@/api/salaryentry';
export default {
  name: 'Viewmodal',
  components: {
    Tables
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    viewinfo: null
  },
  created () {
    
  },
  mounted () {
  },
  data () {
    return {
      act: false,
      table_loading: true,
      columns: [
        {
          title: this.$t('usermanage_view.userName'),
          width: '100'
          // fixed: 'left'
        },
        {
          title: this.$t('usermanage_view.Organization'),
          slot: 'organizationOaName',
          width: '100'
        },
        {
          title: '公积金基数',
          width: '100',
          slot: 'basicAccumulationFund'
        },
        {
          title: '社保基数',
          width: '100',
          slot: 'basicSocialSecurity'
        },
        {
          title: '发薪日期',
          slot: 'yearAndMonth',
          width: '200'
        },
        {
          title: '薪酬日期',
          key: 'grantDate',
          width: '200'
        },
        {
          title: this.$t('salaryEntry_view.confirmStatus'),
          key: 'confirmStat',
          width: '100',
          render: (h, params) => {
            if (params.row.confirmStat === 0) {
              return h('span', {
                style: {
                  color: '#ed4014'
                }
              }, this.$t('no'));
            } else {
              return h('span', {
                style: {
                  color: '#ed4014'
                }
              }, this.$t('yes'));
            }
          }
        }

      ],
      data: [],
      modal_loading: false,
      mymoadlStat: this.modalstat,
      pageTotal: 0,
      // 基本信息
      baseinfo: [],
      // 薪酬查询
      querysalary: []
    };
  },
  watch: {
    async modalstat () {
      this.mymoadlStat = this.modalstat;
      console.log(this.viewinfo);
      this.reset();
      await this.querycolumns();
      let mydata = this.viewinfo.empSalaryVos;
      for (let i = 0; i < mydata.length; i++) {
        for (let j = 0; j < mydata[i].salaryDetails.length; j++) {
          mydata[i][mydata[i].salaryDetails[j].salaryOptionName] = mydata[i].salaryDetails[j].optionMoney;
        }
      }
      this.data = mydata;
      this.table_loading = false;
      console.log('mydata===============================>', mydata);
    }
  },
  methods: {
    reset () {
      this.columns = [
        {
          title: this.$t('usermanage_view.userName'),
          key: 'empName',
          width: '200',
          slot: 'personName',
          fixed: 'left'
        },
        {
          title: this.$t('usermanage_view.Organization'),
          key: 'organizationOaName',
          slot: 'organizationOaName',
          width: '100',
          fixed: 'left'
        },
        {
          title: '发薪日期',
          slot: 'yearAndMonth',
          width: '200',
          fixed: 'left'
        },
        {
          title: '薪酬日期',
          slot: 'grantDate',
          width: '200',
          fixed: 'left'
        },
        {
          title: '公积金基数',
          width: '100',
          slot: 'basicAccumulationFund'
        },
        {
          title: '社保基数',
          width: '100',
          slot: 'basicSocialSecurity'
        },
        {
          title: this.$t('salaryEntry_view.confirmStatus'),
          key: 'confirmStat',
          width: '100',
          render: (h, params) => {
            if (params.row.confirmStat === 0) {
              return h('span', {
                style: {
                  color: '#ed4014'
                }
              },
              this.$t('no'));
            } else {
              return h('span', {
                style: {
                  color: '#ed4014'
                }
              }, this.$t('yes'));
            }
          }
        }

      ];
      this.data = [];
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
    // 动态生成表头
    async querycolumns () {
      let data = {};
      data.pageNum = 1;
      data.pageSize = 999;
      let mycolumns = [];
      await salaryOptionApi.getsalaryOptionList(data).then(res => {
        console.log(res.data.content.list);
        mycolumns = res.data.content.list;
      });
      let processcolumns = mycolumns.map(item => {
        return {
          title: item.name,
          key: item.name,
          editable: true,
          width: '100',
          render: (h, params) => {
            console.log('判断函数', item.name, params.row[item.name]);
            if (params.row[item.name] !== undefined) {
              return h('span', params.row[item.name]);
            } else {
              return h('span', '无此薪酬项');
            }
          }
        };
      });
      console.log('mycolumns===========>', processcolumns);
      for (const i in processcolumns) {
        this.columns.push(processcolumns[i]);
      }
      console.log('this.columns==========>', this.columns);
    },
    addorg (selection) {
      console.log('selection==========>', selection);
      console.log(selection.map(item => { return item.title; }).join(','));
      this.addformbase.organizationOaName = selection.map(item => { return item.title; }).join(',');
      this.addformbase.organizationOa = selection.map(item => { return item.id; }).join(',');
      console.log(this.addformbase.organizationOaName);
    },
    updateStat_emp (stat, empList) {
      this.visiable_emp = stat;
      this.addformbase.empList = empList.names;
      console.log('names========>', this.addformbase.empList);
      this.addformbase.empListIds = empList.empIds;
      console.log('empIds===============>', this.addformbase.empListIds);
      console.log('empList==================================>', empList);
    },
    showemp () {
      console.log('新建员工');
      console.log(typeof (this.addformbase.empListIds));
      if (typeof (this.addformbase.empListIds) === 'string' && this.addformbase.empListIds !== null) {
        this.addformbase.empListIds.split(',');
      }
      this.visiable_emp = true;
    },
    // 选择部门或者成员
    cancel () {
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
      overflow: hidden;
    }
</style>
