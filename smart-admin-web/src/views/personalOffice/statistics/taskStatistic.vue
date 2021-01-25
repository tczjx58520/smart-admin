<template>
  <div>
    <Card dis-hover>
      <div style="display: flex;align-items: center;">
        <div style="margin-right: 7px">{{ $t("organization1") }}</div>
        <div>
          <Input v-model="listQuery.organizationName"
                 @click.native="goSelectOrganization"
                 :autosize="{ minRows: 2, maxRows: 5 }"
                 placeholder="Enter something..."
                 readonly />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("people") }}</div>
        <div>
          <Input v-model="listQuery.headName"
                 @click.native="goSelectHeader"
                 :autosize="{ minRows: 2, maxRows: 5 }"
                 placeholder="Enter something..."
                 readonly />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("date") }}</div>
        <div>
          <Select v-model="listQuery.dateType"
                  v-if="listQuery.type===0"
                  style="width:200px">
            <Option :value="0">上周</Option>
            <Option :value="1">本周</Option>
          </Select>

          <Select v-model="listQuery.dateType"
                  v-if="listQuery.type===1"
                  style="width:200px">
            <Option :value="0">上月</Option>
            <Option :value="1">本月</Option>
          </Select>

          <Select v-model="listQuery.dateType"
                  v-if="listQuery.type===2"
                  style="width:200px">
            <Option :value="0">去年</Option>
            <Option :value="1">本年</Option>
          </Select>
        </div>

        <Button type="primary"
                style="margin-left: 15px"
                @click="handleSelect">{{ $t("Search") }}</Button>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("statisticType") }}</div>
        <div>
          <RadioGroup v-model="listQuery.type">
            <Radio :label="0">周</Radio>
            <Radio :label="1">月</Radio>
            <Radio :label="2">年</Radio>
          </RadioGroup>
        </div>
      </div>
    </Card>

    <Card style="margin-top:10px">
      <Table max-height="500px"
             :columns="tablecolumns"
             :data="tableData"
             @on-selection-change="changeTable">
      </Table>
      <Page :current="listQuery.pageNum"
            :page-size="listQuery.pageSize"
            :page-size-opts="[10, 20, 30, 50, 100]"
            :total="total"
            @on-change="changePageNum"
            @on-page-size-change="changePageSize"
            show-elevator
            show-sizer
            show-total
            style="margin:24px 0;text-align:right;"></Page>
    </Card>

    <controllerSelect :modalstat="visiable_emp1"
                      :type="mytype"
                      :memberId="listQuery"
                      @updateStat="updateStat_emp1">
    </controllerSelect>

    <organizationSelect :modalstat="visiable_org"
                        :type="mytype"
                        :memberId="listQuery"
                        @updateStat="updateStat_org">
    </organizationSelect>
  </div>
</template>
<script>
import { statistic } from '@/api/taskStatistic';
import controllerSelect from './components/addemp_single/modal';
import organizationSelect from './components/add_org/modal';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  dateType: 1,
  employeeId: null,
  startTime: null,
  endTime: null,
  organizationId: null,
  type: 2
};
export default {
  components: {
    controllerSelect,
    organizationSelect
  },
  data () {
    return {
      mytype: 3,
      visiable_emp1: false,
      visiable_org: false,
      assignmentVisible: false,
      tablecolumns: [
        {
          title: this.$t('people'),
          key: 'employeeName'
        },
        {
          title: this.$t('organization1'),
          key: 'organizationName'
        },
        {
          title: this.$t('taskNumber'),
          key: 'total'
        },
        {
          title: this.$t('ing'),
          key: 'ingStatus'
        },
        {
          title: this.$t('yyq'),
          key: 'delayStatus'
        },
        {
          title: this.$t('wcl'),
          key: 'finishRate'
        }
      ],
      tableData: [],
      total: 0,
      listQuery: Object.assign({}, defaultListQuery)
    };
  },
  created () {
    this.getList();
  },
  methods: {
    getList () {
      statistic.findTaskStatistic(this.listQuery.pageNum, this.listQuery.pageSize, this.listQuery).then(res => {
        this.total = res.data.totalCount;
        this.tableData = res.data.list;
      });
    },
    goSelectHeader () {
      this.visiable_emp1 = true;
    },
    goSelectOrganization () {
      this.visiable_org = true;
    },
    updateStat_emp1 (stat, empList, type) {
      this.visiable_emp1 = stat;
      if (empList) {
        if (type === 3) {
          this.listQuery.headName = empList.names;
          this.listQuery.employeeId = Number(empList.empIds);
        }
      }
    },
    updateStat_org (stat, empList, type) {
      this.visiable_org = stat;
      console.log(11111, stat);
      console.log(22222, empList);
      console.log(33333, type);
      if (empList) {
        if (type === 3) {
          this.listQuery.organizationId = Number(empList.organizationOa);
          this.listQuery.organizationName = empList.organizationOaName;
        }
      }
    },
    changePageNum (val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    changePageSize (val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    changeTable (val) {

    },
    handleSelect () {
      this.getList();
    }
  }
};
</script>
