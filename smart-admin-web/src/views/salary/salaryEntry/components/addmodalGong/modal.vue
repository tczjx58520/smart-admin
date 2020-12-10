<template>
        <Modal v-model="mymoadlStat" class="add" width="1020" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('salaryEntry_view.newSalaryEntry') }}</span>
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
                  >
                    <template slot-scope="scope" slot="personName">
                        <span type="text"> {{ scope.row.personName }} </span>
                    </template>
                    <template slot-scope="scope" slot="organizationOaName">
                        <span>{{ scope.row.organizationOaName }}</span>
                    </template>
                    <template slot-scope="scope" slot="yearAndMonth">
                        <DatePicker type="month"  format:="yyyy-MM" v-model="scope.row.yearAndMonth" placeholder="Select date" style="width: 180px" @on-change="getmyyearAndMonth($event,scope)"></DatePicker>
                    </template>
                    <template slot-scope="scope" slot="grantDate">
                        <DatePicker type="date"  format:="yyyy-MM-dd" v-model="scope.row.grantDate" placeholder="Select date" style="width: 180px" @on-change="getmydate($event,scope)"></DatePicker>
                    </template>
                    <template slot-scope="scope" slot="basicAccumulationFund">
                        <span >{{ scope.row.account.basicAccumulationFund.basicMoney }}</span>
                    </template>
                    <template slot-scope="scope" slot="basicSocialSecurity">
                        <span >{{ scope.row.account.basicSocialSecurity.basicMoney }}</span>
                    </template>
                  </Table>
                   <div style="display:none;"> {{act}}</div>
            </Card>

        </div>
        <div slot="footer">
            <ButtonGroup>
                <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button>
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
  name: 'addGong',
  components: {
    Tables
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: true
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
          title: '薪酬月份',
          slot: 'yearAndMonth',
          width: '200'
        },
        {
          title: '发薪日期',
          key: 'grantDate',
          width: '200'
          // render: (h, params) => {
          //   this.data[params.index] = params.row;
          //   return h(
          //     'div',
          //     this.$refs.myTable.$scopedSlots.date({
          //       row: params.row,
          //       idx: params.row._index
          //     })
          //   );
          // }
        },
        {
          title: this.$t('usermanage_view.stat'),
          key: 'stat',
          width: '100',
          render: (h, params) => {
            if (params.row.stat === 1) {
              return h('span', this.$t('Open'));
            } else {
              return h('span', this.$t('Forbid'));
            }
          }
        },
        {
          title: this.$t('salaryEntry_view.confirmStatus'),
          key: 'confirmStat',
          width: '100',
          render: (h, params) => {
            if (params.row.confirmStat === 0) {
              return h('span', this.$t('no'));
            } else {
              return h('span', this.$t('yes'));
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
      console.log(this.editinfo);
      this.reset();
      this.pageTotal = this.editinfo.length;
      await this.querycolumns();
      this.baseinfo = this.editinfo.map(item => {
        return {
          personName: item.personName,
          organizationOaName: item.organizationOaName,
          yearAndMonth: '',
          grantDate: '',
          stat: item.stat,
          isEnter: item.isEnter,
          id: item.id,
          confirmStat: 0
        };
      });
      let salary = await Promise.all(this.editinfo.map(async item => {
        let data = {};
        data.pageNum = 1;
        data.pageSize = 10;
        data.empId = item.id;
        if (item.isEnter === 0) {
          data.yearAndMonth = this.getpredate();
        } else {
          data.yearAndMonth = this.getcurrentdate();
        }
        return salaryEntryApi.getentryList(data);
      }));
      this.querysalary = salary.map(item => { return item.data.content.list; });
      let postcolumns = await Promise.all(this.editinfo.map(item => {
        return collectAccountsApi.querycollectAccountsByEmp(item.id);
      }));
      let processcolumns = postcolumns.map(item => item.data.content);
      console.log('processcolumns===============>', processcolumns);
      for (let i = 0; i < this.baseinfo.length; i++) {
        if (processcolumns[i].id === null) {
          this.$Message.error('请先新建套账');
          this.$emit('updateStat', false);
          this.$router.push({
            name: 'collectAccounts'
          });
          return false;
        }
        this.baseinfo[i].salaryinfo = this.querysalary[i][0];
        this.baseinfo[i].account = processcolumns[i];
        this.baseinfo[i].socialSecurityId = processcolumns[i].socialSecurityId;
        this.baseinfo[i].accumulationFundId = processcolumns[i].accumulationFundId;
        if (this.baseinfo[i].salaryinfo !== null && this.baseinfo[i].salaryinfo !== undefined) {
          this.baseinfo[i].yearAndMonth = this.baseinfo[i].salaryinfo.yearAndMonth;
          this.baseinfo[i].grantDate = this.baseinfo[i].salaryinfo.grantDate;
          this.baseinfo[i].confirmStat = this.baseinfo[i].salaryinfo.confirmStat;
        }
      }
      // 动态生成报表项
      for (let i = 0; i < this.baseinfo.length; i++) {
        console.log(this.baseinfo[i]);
        this.baseinfo[i].formula = [];
        this.baseinfo[i].salaryOptionJson = [];
        for (const key in this.baseinfo[i].account) {
          if (key === 'salaryOptionVos') {
            for (const j in this.baseinfo[i].account[key]) {
              console.log('j======================>', j, this.baseinfo[i].account[key][j]);
              if (this.baseinfo[i].salaryinfo !== null && this.baseinfo[i].salaryinfo !== undefined) {
                this.baseinfo[i][this.baseinfo[i].account[key][j].name] = this.baseinfo[i].salaryinfo.salaryDetails[j].optionMoney;
              } else {
                this.baseinfo[i][this.baseinfo[i].account[key][j].name] = 0;
              }
              let data = {
                salaryOption: this.baseinfo[i].account[key][j].id,
                salaryOptionName: this.baseinfo[i].account[key][j].name,
                optionMoney: 0
              };
              this.baseinfo[i].salaryOptionJson.push(data);
              if (this.baseinfo[i].account[key][j].type === 4 || this.baseinfo[i].account[key][j].type === 1) {
                this.baseinfo[i]['formula'].push(this.baseinfo[i].account[key][j].calculationFormulaVo);
              }
            }
          }
        }
      }
      console.log('this.baseinfo====================>', this.baseinfo);
      this.data = this.baseinfo;
      this.$nextTick(() => {
        this.act = !this.act;
      });
      this.table_loading = false;
    }
  },
  methods: {
    reset () {
      this.columns = [
        {
          title: this.$t('usermanage_view.userName'),
          key: 'personName',
          width: '200',
          slot: 'personName'
        },
        {
          title: this.$t('usermanage_view.Organization'),
          key: 'organizationOaName',
          slot: 'organizationOaName',
          width: '100'
        },
        {
          title: '发薪日期',
          slot: 'yearAndMonth',
          width: '200'
        },
        {
          title: '薪酬日期',
          slot: 'grantDate',
          width: '200'
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
          title: this.$t('usermanage_view.stat'),
          key: 'stat',
          width: '100',
          render: (h, params) => {
            if (params.row.stat === 1) {
              return h('span', this.$t('Open'));
            } else {
              return h('span', this.$t('Forbid'));
            }
          }
        },
        {
          title: this.$t('salaryEntry_view.confirmStatus'),
          key: 'confirmStat',
          width: '100',
          render: (h, params) => {
            if (params.row.confirmStat === 0) {
              return h('span', this.$t('no'));
            } else {
              return h('span', this.$t('yes'));
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
              return h('Input', {
                props: {
                  value: params.row[item.name],
                  size: 'small'
                },
                on: {
                  input: (val) => {
                    console.log('val========>', val, item.name);
                    this.data[params.index][item.name] = val;
                    console.log(this.data[params.index]);
                    this.calc(params, item.name);
                  }
                }
              });
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
    selectDepartmentOrEmployee (department) {
      console.log('department==============>', department);
      // this.addformbase.organizationOaName = department.name;
      // this.addformbase.organizationOa = department.id;
      // this.$set(this.formdata, 'organizeParent', department.id);
      // this.$set(this.formdata, 'organizeParent', department.name);
      // this.isShowTree = false;
      // $('.department-wrap').hide();
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
          this.baseinfo[j].createId = this.$store.state.user.userLoginInfo.userId;
          this.baseinfo[j].empId = this.baseinfo[j].id;
          this.baseinfo[j].salaryOptionJson = JSON.stringify(this.baseinfo[j].salaryOptionJson);
          await salaryEntryApi.addentryList(this.baseinfo[j]).then(res => {
            this.$Message.success('新建成功');
          });
        } else {
          this.baseinfo[j].salaryId = this.baseinfo[j].salaryinfo.id;
          this.baseinfo[j].operatId = this.$store.state.user.userLoginInfo.userId;
          this.baseinfo[j].salaryOptionJson = JSON.stringify(this.baseinfo[j].salaryOptionJson);
          await salaryEntryApi.updateentryList(this.baseinfo[j]).then(res => {
            this.$Message.success('修改成功');
          });
        }
      }
      this.modal_loading = false;
      this.$emit('updateStat', false);
    },
    // 计算函数
    calc (params, mykey) {
      let myformula = null;
      if (this.data[params.index].formula) {
        for (const i in this.data[params.index].formula) {
          let process = [];
          myformula = this.data[params.index].formula[i].formula.replace(/#(.*?)#/g, function (word, $1) {
            process.push($1);
            return $1;
          });
          console.log('process===========>', process);
          for (const key in this.data[params.index]) {
            if (process.findIndex(val => val === key) > -1) {
              console.log('计算属性===========================>', process.findIndex(val => val === key), key);
              process.splice(process.findIndex(val => val === key), 1, Number(this.data[params.index][key]));
            }
          }
          console.log('process.join===================>', process.join(''));

          // eslint-disable-next-line
          let res = eval(process.join('')).toFixed(this.data[params.index].formula[i].pointNum);
          console.log('res======================>', res);

          // this.data[params.index][this.data[params.index].formula[i]] = res;
          this.data[params.index][this.data[params.index].formula[i].salaryOptionName] = res;
          this.$set(params.row, this.data[params.index].formula[i].salaryOptionName, res);
          // console.log('myformula=========>', myformula);
        }
      }
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
