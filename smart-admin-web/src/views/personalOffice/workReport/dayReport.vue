<template>
  <div>
    <Card>
      <Button type="primary"
              @click="save">保存</Button>
      <div style="margin-left:30px">
        <div style="margin-top: 20px;font-weight: 600;font-size: 24px;">日报</div>
        <Divider />
        <div class="fontStyle">今日完成工作</div>
        <Input v-model="formItem.dailyReportVo.todayWork"
               placeholder="Enter something..."
               type="textarea"
               style="width: 300px" />

        <div style="margin: 10px 0;">
          <span style="font-weight: 600;">任务工作汇报</span>
          <span style="padding-left:10px;color:#0095ff;font-size:8px;cursor: pointer;"
                @click="selectTask">选择任务</span>
        </div>
        <Table :columns="columns"
               width="601"
               :data="tableData"></Table>

        <div class="fontStyle">未完成的工作</div>
        <Input v-model="formItem.dailyReportVo.unfinishedWork"
               placeholder="Enter something..."
               type="textarea"
               style="width: 300px" />

        <div class="fontStyle">需协调的工作</div>
        <Input v-model="formItem.dailyReportVo.help"
               placeholder="Enter something..."
               type="textarea"
               style="width: 300px" />

        <div class="fontStyle">备注</div>
        <Input v-model="formItem.dailyReportVo.note"
               placeholder="Enter something..."
               type="textarea"
               style="width: 300px" />

        <div class="fontStyle">图片</div>
        <Upload :action="myupLoadUrl"
                :data="{ type: 7 } "
                :on-success="successImgUpload">
          <Button icon="ios-add"></Button>
        </Upload>

        <div class="fontStyle">附件</div>
        <Upload :action="myupLoadUrl"
                :data="{ type: 7 } "
                :on-success="successFjUpload">
          <Button icon="ios-add"></Button>
        </Upload>

        <Divider />

        <div class="fontStyle">接收人 ({{userName}}) </div>
        <Icon style="font-size: 20px;"
              @click="goSelectPeople"
              type="ios-add-circle-outline" />

        <div style="margin: 10px 0;">
          <span style="font-weight: 600;">接收群</span>
          <span style="padding-left:10px;color:gray;font-size:8px">默认发送到群聊</span>
        </div>
        <Icon style="font-size: 20px;"
              type="ios-add-circle-outline" />

        <div class="fontStyle">更多</div>
        <Radio v-model="single"
               true-value="1"
               false-value="0">仅接收人可见，不可转发</Radio>
        <div style="padding-left:20px;color:gray;font-size:8px">除了你自己，任何人不可转发你的日志内容</div>
      </div>
    </Card>
    <userSelect :modalstat="visiable_emp"
                :type="mytype"
                :memberId="formItem"
                @updateStat="updateStat_emp">
    </userSelect>
    <Modal v-model="taskVisible"
           @on-visible-change="visiblChange"
           width="720px"
           :title="$t('selectTask')">
      <Table :columns="selectTaskColumns"
             :data="selectTaskData"
             @on-selection-change="changeTable"></Table>
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
  </div>
</template>
<script>
import { workReport } from '@/api/workReport';
import { taskManage } from '@/api/taskManage';
import userSelect from './components/modal';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  employeeId: null
};
export default {
  components: {
    userSelect
  },
  data () {
    let baseUrl = process.env.VUE_APP_URL;
    return {
      listQuery: Object.assign({}, defaultListQuery),
      taskVisible: false,
      formItem: {
        dailyReportVo: {
          personalTaskContentVoList: []
        },
        weeklyReportAttachments: null,
        workReportReceives: []
      },
      myupLoadUrl: baseUrl + '/upload/uploadpic',
      single: 0,
      mytype: 3,
      visiable_emp: false,
      userName: null,
      columns: [
        {
          title: this.$t('taskTitle'),
          key: 'title',
          width: 100
        },
        {
          title: this.$t('taskContent'),
          key: 'content',
          width: 100
        },
        {
          title: this.$t('type'),
          key: 'type',
          width: 100,
          render: (h, params) => {
            if (params.row.type === 0) {
              return h('span', '非量化');
            }
            if (params.row.type === 1) {
              return h('span', '量化');
            }
          }
        },
        {
          title: this.$t('taskNum'),
          key: 'quote',
          width: 100
        },
        {
          title: this.$t('finishNum'),
          key: 'alreadyQuote',
          width: 100
        },
        {
          title: this.$t('thisTimeFinish'),
          key: 'todayQuote',
          width: 100,
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.weight
              },
              on: {
                'on-change': (event) => {
                  // 获取编辑行的inde和编辑字段名，对表格数据进行重新赋值
                  this.$set(this.tableData[params.index], [params.column.key], event.currentTarget.value);
                }
              }
            });
          }
        }
      ],
      tableData: [],

      // 弹框显示表格数据
      selectTaskColumns: [
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
          title: this.$t('taskContent'),
          key: 'personalTaskParticipant',
          render: (h, params) => {
            // console.log(1111, params.row.pesronalTaskContent);
            const list = params.row.pesronalTaskContent;
            const nameList = [];
            list.forEach(element => {
              nameList.push(element.content);
            });
            const content = nameList.join(',');

            return h('span', content);
          }
        }
      ],
      selectTaskData: [],
      selectedData: []
    };
  },
  methods: {
    changeTable (val) {
      this.selectedData = val;
    },
    visiblChange () {
      this.listQuery.employeeId = this.$store.state.user.userLoginInfo.userId;
      taskManage.findTaskList(this.listQuery).then(res => {
        this.selectTaskData = res.data.list;
        // console.log(333333, this.selectTaskData);
      });
    },
    selectTask () {
      this.taskVisible = true;
    },
    save () {
      this.formItem.dailyReportVo.employeeId = this.$store.state.user.userLoginInfo.userId;
      for (let i = 0; i < this.tableData.length; i++) {
        const data = {
          todayQuote: Number(this.tableData[i].todayQuote)
        };
        this.formItem.dailyReportVo.personalTaskContentVoList.push(data);
      }

      console.log('======formItem', this.formItem);
      workReport.addDayReport(this.formItem).then(res => {
        this.$Message.success('保存成功');
        this.$router.closeCurrentPage();
      });
    },
    successImgUpload (response, file, fileList) {
      console.log(111, response);
      console.log(222, file);
      console.log(333, fileList);

      console.log(11111, file.response);

      const imgInfo = {
        attachmentName: file.name,
        imgUrl: file.response.data.content.picPath[0],
        category: 2
      };
      this.formItem.weeklyReportAttachments = [];
      this.formItem.weeklyReportAttachments.push(imgInfo);
    },

    goSelectPeople () {
      this.visiable_emp = true;
    },

    updateStat_emp (stat, empList, type) {
      this.visiable_emp = stat;
      this.formItem.workReportReceives = [];
      if (empList) {
        if (type === 3) {
          // console.log(333333, empList);
          this.userName = empList.names;
          const idList = empList.empIds;
          const list = idList.split(',');
          for (let i = 0; i < list.length; i++) {
            const data = {
              receiverId: Number(list[i]),
              category: 2,
              receiveType: 0,
              status: this.single
            };
            this.formItem.workReportReceives.push(data);
          }
          console.log(this.formItem.workReportReceives);
        }
      }
    },

    successFjUpload (response, file, fileList) {
      // console.log(111, response);
      // console.log(222, file);
      // console.log(333, fileList);

      const data = {
        // attachmentName: file.name,
        attachmentUrl: file.response.data.content.picPath[0],
        category: 1
      };

      this.formItem.workReportReceives.push(data);
    },
    ok () {
      if (this.selectedData.length !== 1) {
        return this.$Message.success('只能选择一行');
      }
      console.log(this.selectedData);
      this.taskVisible = false;
      this.tableData = this.selectedData[0].pesronalTaskContent;
      this.formItem.dailyReportVo.personalTaskId = this.selectedData[0].id;

      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].title = this.selectedData[0].title;
      }
      console.log(123, this.tableData);
    },
    cancel () {
      this.taskVisible = false;
    }
  }
};
</script>
<style scoped>
.fontStyle {
  font-weight: 600;
  margin: 10px 0;
}
</style>
