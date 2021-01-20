<template>
  <div>
    <Card class="warp-card"
          dis-hover>
      <div>
        <Button style="margin-right:15px;"
                v-privilege="['10-15-1']"
                @click="report"
                type="primary">{{ $t('report') }}</Button>

        <Button style="margin-right:15px;"
                v-privilege="['10-15-1']"
                @click="setFinish"
                type="primary">{{ $t('setFinish') }}</Button>
      </div>
    </Card>
    <Card style="margin-top:10px;height:800px">
      <Tabs value="name1">
        <!--基本信息-->
        <TabPane label="基本信息"
                 name="name1">
          <Form :model="formItem"
                :label-width="100"
                inline>
            <FormItem :label="$t('planType1')"
                      style="width:20%">
              <span v-if="formItem.category===0">个人计划</span>
              <span v-if="formItem.category===1">工作汇报</span>
              <span v-if="formItem.category===2">工作总结</span>
            </FormItem>
            <FormItem :label="$t('startTime1')"
                      style="width:20%">
              <span>{{formItem.startTime}}</span>
            </FormItem>
            <FormItem :label="$t('endTime1')"
                      style="width:20%">
              <span>{{formItem.endTime}}</span>
            </FormItem>
            <FormItem :label="$t('planStat1')"
                      style="width:20%">
              <span>{{formItem.status || '无'}}</span>
            </FormItem>

            <FormItem :label="$t('planMan1')"
                      style="width:20%">
              <span>{{formItem.planMan}}</span>
            </FormItem>
            <FormItem :label="$t('reportMan1')"
                      style="width:20%">
              <span>{{formItem.reportForPersonName}}</span>
            </FormItem>
            <FormItem :label="$t('shareMan1')"
                      style="width:20%">
              <span>{{formItem.userName}}</span>
            </FormItem>

            <FormItem :label="$t('planContent1')"
                      style="width:80%">
              <span>{{formItem.content}}</span>
            </FormItem>

          </Form>

          <!--汇报计划-->
        </TabPane>
        <TabPane label="汇报计划"
                 name="name2">
          <Timeline>
            <TimelineItem color="green"
                          v-for="item in planReportList"
                          :key="item.id">
              <div class="time">
                <span>{{item.createTime}}</span>
                <span style="padding-left:20px;color:color: #0095ff;">({{item.createName}})</span>
              </div>
              <p class="content">{{item.reportContent}}</p>
            </TimelineItem>
            </TimelineItem>
          </Timeline>
          <Editor v-model="materialBody"
                  v-if="editorShow===true" />
          <Button type="primary"
                  v-if="editorShow===true"
                  style="float:right;margin-top: 20px;"
                  @click="savePlanReport">保存</Button>
        </TabPane>

        <!--关联任务-->
        <TabPane label="关联任务"
                 name="name3">
          <Table :columns="relationColumns"
                 :data="formItem.personalPlanTasks">
            <template slot-scope="{ row, index }"
                      slot="action">
              <Button type="primary"
                      size="small"
                      @click="viweTask(row)"
                      style="margin-right: 5px">查看</Button>
            </template>
          </Table>
        </TabPane>

        <!--任务文档区-->
        <TabPane label="任务文档区"
                 name="name4">
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
      </Tabs>
    </Card>
  </div>
</template>
<script>
import Editor from '@/components/editor/editor';
import { planManage } from '@/api/planManage';
export default {
  components: {
    Editor
  },
  created () {
    this.formItem = this.$route.query.planInfo;
    console.log(222222, this.formItem);
    this.formItem.planMan = this.$store.state.user.userLoginInfo.nickName;
    this.findPlanReport();
  },
  data () {
    return {
      editorShow: false,
      formItem: {},
      materialBody: null,
      relationColumns: [
        {
          title: this.$t('taskName'),
          key: 'title'
        },
        {
          title: this.$t('taskSpeed'),
          key: 'taskSpeed'
        },
        {
          title: this.$t('controller'),
          key: 'controller'
        },
        {
          title: this.$t('participateMan'),
          key: 'participateMan'
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
      planReportList: [],
      data1: []
    };
  },
  methods: {
    viweTask (row) {
      this.$router.push({ path: '/taskManage/taskList', query: { id: row.id } });
    },
    findPlanReport () {
      const data = {
        planId: this.formItem.id
      };
      planManage.findPlanReport(data).then(res => {
        console.log(123123, res);
        this.planReportList = res.data;
      });
    },
    report () {
      this.editorShow = true;
    },
    savePlanReport () {
      const data = {
        reportContent: this.materialBody,
        createId: this.$store.state.user.userLoginInfo.userId,
        planId: this.formItem.id
      };
      planManage.addPlanReport(data).then(res => {
        console.log(2222211111, res);
        this.$Message.success('添加成功');
        this.findPlanReport();
      });
    },
    setFinish () {

    },
    deleteTask () {

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
