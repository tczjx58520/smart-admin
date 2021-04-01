<template>
  <div>
    <Card dis-hover>
      <div style="display: flex;align-items: center;">
        <div style="margin-right: 7px">{{ $t("planTitle") }}</div>
        <div>
          <Input v-model="listQuery.title" />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("createTime") }}</div>
        <div>
          <DatePicker type="daterange"
                      @on-change="changeDate"
                      placement="bottom-end"
                      placeholder="Select date"
                      style="width: 200px"></DatePicker>
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("state") }}</div>
        <div>
          <Select v-model="listQuery.planStatus"
                  style="width:200px">
            <Option v-for="item in selectList"
                    :value="item.value"
                    :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("planType") }}</div>
        <div>
          <Select v-model="listQuery.type"
                  style="width:200px">
            <Option :value="0">日计划</Option>
            <Option :value="1">周计划</Option>
            <Option :value="2">月计划</Option>
            <Option :value="3">年计划</Option>
          </Select>
        </div>
        <Button type="primary"
                style="margin-left: 15px"
                @click="handleSelect">{{ $t("Search") }}</Button>
      </div>
    </Card>
    <Card class="warp-card"
          dis-hover>
      <div>
        <Button style="margin-right:15px;"
                icon="md-refresh"
                @click="refresh"
                type="default">{{ $t('Reflash') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['101-110-1']"
                @click="addPlan"
                type="warning">{{ $t('Create') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['101-110-3']"
                @click="deleteMore"
                type="error">{{ $t('delete') }}</Button>
      </div>
    </Card>

    <Card style="margin-top:10px">
      <Table max-height="500px"
             :columns="tablecolumns"
             :data="tableData"
             @on-selection-change="changeTable">
        <template slot-scope="{ row, index }"
                  slot="action">
          <Button type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="show(row)">查看</Button>
          <Button type="error"
                  size="small"
                v-privilege="['101-110-2']"
                  v-if="row.planStatus===0"
                  @click="update(row)">修改</Button>
        </template>
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
    <personPlan :visible="addVisible"
                :planType="0"
                @updateStat="updateStatus"></personPlan>

    <updatePersonPlan :visible2="updateVisible"
                      :updatePlan="updatePlanInfo"
                      @updateStat2="updateStatus2"></updatePersonPlan>
  </div>
</template>
<script>
import personPlan from './components/addPersonalPlan';
import updatePersonPlan from './components/updatePersonalPlan';
import { planManage } from '@/api/planManage';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  employeeId: null,
  category: 0,
  createStartTime: null,
  createEndTime: null
};
export default {
  components: {
    personPlan,
    updatePersonPlan
  },
  data () {
    return {
      updatePlanInfo: null,
      addVisible: false,
      updateVisible: false,
      tablecolumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('title'),
          key: 'title'
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
          title: this.$t('planState'),
          key: 'planStatus',
          render: (h, params) => {
            if (params.row.planStatus === 0) {
              return h('span', '未开始');
            }
            if (params.row.planStatus === 1) {
              return h('span', '进行中');
            }
            if (params.row.planStatus === 2) {
              return h('span', '已完成');
            }
          }
        },
        {
          title: this.$t('updateTime'),
          key: 'createTime'
        },
        {
          title: this.$t('planType'),
          key: 'type',
          render: (h, params) => {
            if (params.row.type === 0) {
              return h('span', '日');
            }
            if (params.row.type === 1) {
              return h('span', '周');
            }
            if (params.row.type === 2) {
              return h('span', '月');
            }
            if (params.row.type === 3) {
              return h('span', '年');
            }
          }
        },
        {
          title: this.$t('action'),
          key: 'position',
          slot: 'action'
        }
      ],
      tableData: [],
      total: 0,
      listQuery: Object.assign({}, defaultListQuery),
      selectList: [
        {
          value: '0',
          label: '未开始'
        },
        {
          value: '1',
          label: '进行中'
        },
        {
          value: '2',
          label: '已完成'
        }
      ],
      selectedData: []
    };
  },
  created () {
    this.getList();
  },
  methods: {
    changeDate (val) {
      this.listQuery.createStartTime = val[0];
      this.listQuery.createEndTime = val[1];
      console.log(val);
    },
    getList () {
      this.listQuery.employeeId = this.$store.state.user.userLoginInfo.userId;
      planManage.findPlan(this.listQuery).then(res => {
        this.tableData = res.data.list;
        this.total = res.data.total;
        console.log(111111111, this.tableData);
      });
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
      this.selectedData = val;
    },
    refresh () {
      this.getList();
    },
    addPlan () {
      this.addVisible = true;
    },
    deleteMore () {
      if (this.selectedData.length < 1) {
        return this.$Message.error('必须先选择一项');
      }
      for (let i = 0; i < this.selectedData.length; i++) {
        if (this.selectedData[i].planStatus !== 0) {
          return this.$Message.error('只能删除未开始的计划！！！');
        }
      }
      const ids = [];
      this.selectedData.forEach(element => {
        ids.push(element.id);
      });
      planManage.deletePlan(ids).then(res => {
        console.log(res);
        this.$Message.success('删除成功');
        this.getList();
      });
    },
    handleSelect () {
      this.getList();
    },
    show (row) {
      console.log('show', row);
      const planInfomation = Object.assign({}, row);
      const nameList = [];
      planInfomation.planShareFors.forEach(element => {
        nameList.push(element.shareForPersonName);
      });
      planInfomation.userName = nameList.join(',');
      this.$router.push({ path: '/planManagement/viewPlan', query: { planInfo: planInfomation } });
    },
    update (row) {
      console.log('update', row);
      this.updateVisible = true;
      this.updatePlanInfo = Object.assign({}, row);
      const nameList = [];
      this.updatePlanInfo.planShareFors.forEach(element => {
        nameList.push(element.shareForPersonName);
      });
      this.updatePlanInfo.userName = nameList.join(',');
      console.log(3333333, this.updatePlanInfo.userName);
    },
    updateStatus (val) {
      this.addVisible = val;
      this.getList();
    },
    updateStatus2 (val) {
      this.updateVisible = val;
      this.getList();
    }
  }
};
</script>
