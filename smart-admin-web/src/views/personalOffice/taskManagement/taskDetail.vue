<template>
  <div>
    <Card class="warp-card"
          v-if="taskInfo.status===1"
          dis-hover>
      <div>
        <Button style="margin-right:15px;"
                v-privilege="['10-15-1']"
                @click="report"
                type="primary">{{ $t('report') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['10-15-1']"
                @click="yanqi"
                type="primary">{{ $t('yanqi') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['10-15-1']"
                @click="taskFinish"
                type="primary">{{ $t('taskFinish') }}</Button>
      </div>
    </Card>
    <Card style="margin-top:10px;height:800px">
      <Tabs value="name1">
        <!--基本信息-->
        <TabPane label="基本信息"
                 name="name1">
          <div style="display:flex;justify-content: flex-start;">
            <div style="margin-right:200px">
              <span>当前状态：</span>
              <span v-if="taskInfo.status===0">未开始</span>
              <span v-if="taskInfo.status===1">进行中</span>
              <span v-if="taskInfo.status===2">已结束</span>
              <span v-if="taskInfo.status===3">已撤销</span>
              <span v-if="taskInfo.status===4">延期</span>
              <span v-if="taskInfo.status===5">已完成</span>
            </div>

            <div style="margin-right:200px">
              <span>开始时间：</span>
              <span>{{taskInfo.startTime}}</span>
            </div>

            <div style="margin-right:200px">
              <span>结束时间：</span>
              <span>{{taskInfo.endTime}}</span>
            </div>

            <div style="margin-right:200px">
              <span>完成时间：</span>
              <span>{{taskInfo.finishTime ||'无'}}</span>
            </div>
          </div>

          <div style="margin-top:20px">
            <span>任务进度</span>
            <Progress :percent="45"
                      style="width:60%;margin-left:20px"
                      :stroke-width="15"
                      status="active"
                      text-inside />
          </div>

          <div style="display:flex;margin-top:20px;justify-content: flex-start;">
            <div style="margin-right:200px">
              <span>任务来源：</span>
              <span v-if="taskInfo.source===0">自定义</span>
              <span v-if="taskInfo.source===1">组织计划</span>
              <span v-if="taskInfo.source===2">母任务</span>
            </div>

            <div style="margin-right:200px">
              <span>工作评估：</span>
              <span>{{taskInfo.workTime}}</span>
            </div>

            <div style="margin-right:200px">
              <span>负责人：</span>
              <span>{{taskInfo.headerName}}</span>
            </div>

            <div style="margin-right:200px">
              <span>参与人：</span>
              <span>{{taskInfo.userName}}</span>
            </div>
          </div>

          <div style="margin-top:20px">
            <span>任务内容:</span>
            <span style="margin-left:10px">{{taskInfo.taskContent}}</span>
          </div>

          <div style="margin-top:20px">
            <span>奖励标准:</span>
            <span style="margin-left:10px">{{taskInfo.rewardPunishment}}</span>
          </div>

          <!--任务汇报区-->
        </TabPane>
        <TabPane label="任务汇报"
                 name="name2">
          <Timeline>
            <TimelineItem color="green"
                          v-for="item in taskReport"
                          :key="item.id">
              <p class="time">{{item.createDate}}</p>
              <p class="content">{{item.reportContent}}</p>
            </TimelineItem>
          </Timeline>
          <Editor v-model="materialBody"
                  v-if="editorShow===true" />
          <Button type="primary"
                  v-if="editorShow===true"
                  style="float:right;margin-top: 20px;"
                  @click="saveTaskReport">保存</Button>
        </TabPane>

        <!--任务文档区-->
        <TabPane label="任务文档区"
                 name="name3">
          <Table :columns="columns1"
                 :data="data1">
            <template slot-scope="{ row, index }"
                      slot="action">
              <Button type="primary"
                      size="small"
                      style="margin-right: 5px"
                      @click="load(index)">下载</Button>
            </template>
          </Table>
        </TabPane>

        <TabPane label="任务日报"
                 name="name4">
          <Timeline v-for="(item,index) in dayReportList"
                    :key="index">
            <TimelineItem color="green"
                          v-for="(item1,index1) in item"
                          :key="index1">
              <div class="time">{{item1.createTime}} ({{item1.createPersonName}})</div>
              <p class="content">{{item1.todayWork}}</p>
            </TimelineItem>
            <Divider />
          </Timeline>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>
<script>
import Editor from '@/components/editor/editor';
import { taskManage } from '@/api/taskManage';
export default {
  components: {
    Editor
  },
  data () {
    return {
      editorShow: false,
      materialBody: null,
      columns1: [
        {
          title: this.$t('document'),
          key: 'document'
        },
        {
          title: this.$t('launchMan'),
          key: 'launchMan'
        },
        {
          title: this.$t('launchTime'),
          key: 'launchTime'
        },
        {
          title: this.$t('action'),
          slot: 'action'
        }
      ],
      data1: [],
      taskInfo: null,
      taskReport: [],
      dayReportList: []
    };
  },
  created () {
    this.taskInfo = this.$route.query.taskInfo;
    console.log(333333, this.taskInfo);
    this.findTaskReport();
    this.findDayReport();
  },
  methods: {
    findDayReport () {
      const data = {
        taskId: this.taskInfo.id
      };
      taskManage.findDayReport(data).then(res => {
        console.log(222222222, res);
        this.dayReportList = res.data;
        console.log('this.dayReportList', this.dayReportList);
      });
    },
    findTaskReport () {
      const data = {
        employeeId: this.$store.state.user.userLoginInfo.userId,
        taskId: this.taskInfo.id
      };
      taskManage.findTaskReport(data).then(res => {
        this.taskReport = res.data;
      });
    },
    report () {
      this.editorShow = true;
    },
    yanqi () {
      const data = {
        id: this.taskInfo.id,
        status: 4
      };
      taskManage.endTask(data).then(res => {
        this.$Message.success('修改成功');
        this.$router.closeCurrentPage();
      });
    },
    taskFinish () {
      const data = {
        id: this.taskInfo.id,
        status: 5
      };
      taskManage.endTask(data).then(res => {
        this.$Message.success('修改成功');
        this.$router.closeCurrentPage();
      });
    },
    load () {

    },
    saveTaskReport () {
      const data = {
        taskId: this.taskInfo.id,
        reportContent: this.materialBody,
        headerId: this.taskInfo.headerId,
        participantId: this.taskInfo.creatorId
      };
      taskManage.addTaskReport(data).then(res => {
        console.log(res);
        this.$Message.success('添加成功');
        this.findTaskReport();
      });
    }
  }
};
</script>
<style scoped>
.time {
  font-size: 14px;
  font-weight: bold;
}
.content {
  padding-left: 5px;
}
</style>
