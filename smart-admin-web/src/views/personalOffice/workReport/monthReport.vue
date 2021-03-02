<template>
  <div>
    <Card>
      <Button type="primary"
              @click="save">保存</Button>
      <div style="margin-left:30px">
        <div style="margin-top: 20px;font-weight: 600;font-size: 24px;">月报</div>
        <Divider />
        <div class="fontStyle">本月完成工作</div>
        <Input v-model="formItem.monthlyReport.thisMonthWork"
               placeholder="Enter something..."
               type="textarea"
               style="width: 300px" />

        <div class="fontStyle">下月工作计划</div>
        <Input v-model="formItem.monthlyReport.nextMonthPlan"
               placeholder="Enter something..."
               type="textarea"
               style="width: 300px" />

        <div class="fontStyle">本月工作总结</div>
        <Input v-model="formItem.monthlyReport.thisMonthWorkConclusion"
               placeholder="Enter something..."
               type="textarea"
               style="width: 300px" />

        <div class="fontStyle">需要协调与帮助</div>
        <Input v-model="formItem.monthlyReport.help"
               placeholder="Enter something..."
               type="textarea"
               style="width: 300px" />

        <div class="fontStyle">备注</div>
        <Input v-model="formItem.monthlyReport.note"
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
  </div>
</template>
<script>
import { workReport } from '@/api/workReport';
import userSelect from './components/modal';
export default {
  components: {
    userSelect
  },
  data () {
    let baseUrl = process.env.VUE_APP_URL;
    return {
      formItem: {
        monthlyReport: {},
        weeklyReportAttachments: null,
        workReportReceives: []
      },
      myupLoadUrl: baseUrl + '/upload/uploadpic',
      single: 0,
      mytype: 3,
      visiable_emp: false,
      userName: null
    };
  },
  methods: {
    save () {
      this.formItem.monthlyReport.employeeId = this.$store.state.user.userLoginInfo.userId;
      workReport.addMonthReport(this.formItem).then(res => {
        this.$Message.success('保存成功');
        this.$router.back();
      });
    },
    successImgUpload (response, file, fileList) {
      console.log(111, response);
      console.log(222, file);
      console.log(333, fileList);

      const data = {
        // attachmentName: file.name,
        imgUrl: file.response.data.content.picPath[0],
        category: 2
      };
      this.formItem.weeklyReportAttachments = [];
      this.formItem.weeklyReportAttachments.push(data);
    },

    goSelectPeople () {
      this.visiable_emp = true;
    },

    updateStat_emp (stat, empList, type) {
      this.visiable_emp = stat;
      this.formItem.workReportReceives = [];
      if (empList) {
        if (type === 3) {
          console.log(333333, empList);
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
      console.log(111, response);
      console.log(222, file);
      console.log(333, fileList);

      const data = {
        // attachmentName: file.name,
        attachmentUrl: file.response.data.content.picPath[0],
        category: 1
      };

      this.formItem.workReportReceives.push(data);
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
