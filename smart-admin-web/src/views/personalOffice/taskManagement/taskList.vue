<template>
  <div>
    <Card dis-hover>
      <div style="display: flex;align-items: center;">

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("state") }}</div>
        <div>
          <Select v-model="listQuery.status"
                  style="width:200px">
            <Option v-for="item in statusList"
                    :value="item.value"
                    :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("assignPeople") }}</div>
        <div>
          <Input v-model="listQuery.creatorName" />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("controller") }}</div>
        <div>
          <Input v-model="listQuery.headerName" />
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
                @click="refresh"
                type="default">{{ $t('Reflash') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['10-15-1']"
                @click="arrangementTask"
                type="warning">{{ $t('arrangementTask') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['10-15-1']"
                @click="deleteMore"
                type="primary">{{ $t('delete') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['10-15-1']"
                @click="daochu"
                type="success">{{ $t('daochu') }}</Button>
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
                  @click="see(row)">查看</Button>
          <Button type="error"
                  size="small"
                  v-if="row.status===0"
                  style="margin-right: 5px"
                  @click="update(row)">修改</Button>
          <Button type="error"
                  size="small"
                  style="margin-right: 5px"
                  v-if="row.status===0"
                  @click="revoke(row)">撤销</Button>
          <Button type="error"
                  size="small"
                  style="margin-right: 5px"
                  v-if="row.status===1"
                  @click="over(row)">结束</Button>
          <Button type="error"
                  size="small"
                  style="margin-right: 5px"
                  v-if="row.status===1"
                  @click="supervise(row)">督办</Button>
          <Button type="error"
                  v-if="row.status===0"
                  size="small"
                  @click="deleteTask(row)">删除</Button>
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
    <assignment :visible="assignmentVisible"
                @updateStat="updateStat"></assignment>

    <updateTask :updateVisible="updateVisible"
                :taskData="updateTaskData"
                @updateStat2="updateStat2"></updateTask>
  </div>
</template>
<script>
import assignment from './assignment';
import updateTask from './updateTask';
import { taskManage } from '@/api/taskManage';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  employeeId: null
};
export default {
  components: {
    assignment,
    updateTask
  },
  data () {
    return {
      statusList: [
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
          label: '已结束'
        },
        {
          value: '3',
          label: '已撤销'
        },
        {
          value: '4',
          label: '延期'
        },
        {
          value: '5',
          label: '完成'
        }
      ],
      updateTaskData: {
        creatorId: null,
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
      assignmentVisible: false,
      updateVisible: false,
      tablecolumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('taskTitle'),
          key: 'title'
        },
        {
          title: this.$t('state'),
          key: 'status',
          render: (h, params) => {
            if (params.row.status === 0) {
              return h('span', '未开始');
            }
            if (params.row.status === 1) {
              return h('span', '进行中');
            }
            if (params.row.status === 2) {
              return h('span', '已结束');
            }
            if (params.row.status === 3) {
              return h('span', '已撤销');
            }
            if (params.row.status === 4) {
              return h('span', '延期');
            }
            if (params.row.status === 5) {
              return h('span', '完成');
            }
          }
        },
        {
          title: this.$t('controller'),
          key: 'headerName'
        },
        {
          title: '参与人',
          key: 'personalTaskParticipant',
          render: (h, params) => {
            console.log(1111, params.row.personalTaskParticipant);
            const list = params.row.personalTaskParticipant;
            const nameList = [];
            list.forEach(element => {
              nameList.push(element.participantName);
            });
            const userName = nameList.join(',');

            return h('span', userName);
          }
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
          title: this.$t('action'),
          slot: 'action'
        }
      ],
      tableData: [],
      total: 0,
      listQuery: Object.assign({}, defaultListQuery),
      selectedData: []
    };
  },
  created () {
    this.getList();
  },
  methods: {
    getList () {
      this.listQuery.employeeId = this.$store.state.user.userLoginInfo.userId;
      console.log(123, this.listQuery);
      taskManage.findTaskList(this.listQuery).then(res => {
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },
    changePageNum (val) {
      this.listQuery.pageNum = val;
    },
    changePageSize (val) {
      this.listQuery.pageSize = val;
    },
    changeTable (val) {
      this.selectedData = val;
    },
    handleSelect () {
      this.getList();
    },
    // 刷新
    refresh () {
      this.getList();
    },
    updateStat (stat) {
      this.assignmentVisible = stat;
      this.getList();
    },
    updateStat2 (stat) {
      this.updateVisible = stat;
      this.getList();
    },
    // 布置任务
    arrangementTask () {
      this.assignmentVisible = true;
    },
    // 多选删除
    deleteMore () {
      if (this.selectedData === null || this.selectedData === '' || this.selectedData === undefined || this.selectedData.length < 1) {
        return this.$Message.error('必须选中一行');
      }
      const ids = [];
      this.selectedData.forEach(element => {
        ids.push(element.id);
      });
      taskManage.deleteTask(ids).then(res => {
        this.$Message.success('删除成功');
        this.getList();
      });
    },
    // 导出
    daochu () {

    },
    // 查看
    see (row) {
      console.log('=====row', row);
      const list = row.personalTaskParticipant;
      const nameList = [];
      list.forEach(element => {
        nameList.push(element.participantName);
      });
      row.userName = nameList.join(',');

      const taskContent = row.pesronalTaskContent;
      const contentList = [];
      taskContent.forEach(element => {
        contentList.push(element.content);
      });
      row.taskContent = contentList.join(',');

      this.$router.push({ path: '/taskManage/taskDetail', query: { taskInfo: row } });
    },
    // 修改
    update (row) {
      console.log('修改', row);
      this.updateVisible = true;
      this.updateTaskData = Object.assign({}, row);
      const list = this.updateTaskData.personalTaskParticipant;
      const nameList = [];
      list.forEach(element => {
        nameList.push(element.participantName);
      });
      this.updateTaskData.userName = nameList.join(',');
    },
    // 撤销
    revoke (row) {
      console.log(row);
      const data = {
        id: row.id,
        status: 3
      };
      taskManage.endTask(data).then(res => {
        this.$Message.success('撤销成功');
        this.getList();
      });
    },
    // 结束
    over (row) {
      const data = {
        id: row.id,
        status: 2
      };
      taskManage.endTask(data).then(res => {
        this.$Message.success('撤销成功');
        this.getList();
      });
    },
    // 督办
    supervise (row) {
      const data = {
        id: row.id,
        status: row.status
      };
      taskManage.endTask(data).then(res => {
        this.$Message.success('督办成功');
        this.getList();
      });
    },
    // 删除
    deleteTask (row) {
      const ids = [];
      ids.push(row.id);
      taskManage.deleteTask(ids).then(res => {
        this.$Message.success('删除成功');
        this.getList();
      });
    }

  }
};
</script>
