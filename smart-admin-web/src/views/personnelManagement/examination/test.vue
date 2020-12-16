<template>
  <div style="background:#eee;padding: 50px;300px;300px;300px;height:100%">
    <div style="display: flex;justify-content: flex-end;">
      <Button type="primary"
              @click="submit">提交</Button>
    </div>
    <div style="font-size: 30px;">
      考试时间还剩：{{leaveTimeMin}}: {{leaveTimeSecond}}
    </div>
    <div style="text-align: center;font-size: 40px;margin-bottom: 50px;">好好考试，天天向上</div>
    <div style="height:950px;overflow:auto;">
      <Card :bordered="false"
            v-for="(item,index) in questionList"
            :key=item.id>
        <p slot="title">{{(index+1)+'、'+item.choiceInfo}}</p>
        <RadioGroup v-model="item.attachment"
                    vertical
                    size="large">
          <Radio :label="item.choiceA"
                 style="margin-top:30px">
            <Icon type="social-apple"></Icon>
            <span>{{item.choiceA}}</span>
          </Radio>
          <Radio :label="item.choiceB"
                 style="margin-top:30px">
            <Icon type="social-android"></Icon>
            <span>{{item.choiceB}}</span>
          </Radio>
          <Radio :label="item.choiceC"
                 style="margin-top:30px">
            <Icon type="social-windows"></Icon>
            <span>{{item.choiceC}}</span>
          </Radio>
          <Radio :label="item.choiceD"
                 style="margin-top:30px">
            <Icon type="social-windows"></Icon>
            <span>{{item.choiceD}}</span>
          </Radio>
        </RadioGroup>
      </Card>
    </div>
  </div>
</template>
<script>
import { examination } from '@/api/examination';
export default {
  data () {
    return {
      questionList: [],
      examId: null,
      leaveTimeMin: null,
      leaveTimeSecond: null,
      totalTime: null,
      startTime: null,
      currentTime: null
    };
  },
  created () {
    // 考试ID
    this.examId = Number(this.$route.query.examId);

    const data = {
      employeeId: this.$store.state.user.userLoginInfo.userId,
      examId: this.examId
    };
    examination.beginExam(data).then(res => {
      // 考试问题
      this.questionList = res.data.choiceQstList;
      // 考试时间毫秒值
      this.startTime = Number(res.data.createTime);
      // 当前时间毫秒值
      this.currentTime = Number(res.data.currentTime);

      // 考试总时长
      this.totalTime = Number(this.$route.query.totalTime);

      // 考试结束时间毫秒值
      let endTime = this.startTime + this.totalTime * 60 * 1000;

      console.log(11111, endTime);

      // 剩余考试时间的毫秒值
      let surplus = endTime - this.currentTime;

      console.log(22222222, surplus);

      console.log(55555555, surplus);

      if (surplus < 0 || surplus === 0) {
        this.leaveTimeSecond = 0;
        this.leaveTimeMin = 0;
      } else {
        // 剩余考试时间多少秒
        this.leaveTimeSecond = parseInt((surplus / 1000) % 60);
        // 剩余考试时间多少分钟
        this.leaveTimeMin = parseInt(surplus / 1000 / 60);
      }

      console.log(123123, this.startTime);
      console.log(123123, this.currentTime);
    });

    // const myDate = this.$moment(nowTime);
    // const myDate2 = this.$moment(Number(this.startTime));
    // console.log(5555555555, myDate2);

    this.leaveTime();
  },
  methods: {
    leaveTime () {
      const interval = setInterval(() => {
        if (this.leaveTimeSecond !== 0) {
          this.leaveTimeSecond--;
        }
        if (this.leaveTimeSecond < 10) {
          this.leaveTimeSecond = '0' + this.leaveTimeSecond;
        }
        if (Number(this.leaveTimeSecond) === 0 && this.leaveTimeMin !== 0) {
          this.leaveTimeMin--;
          this.leaveTimeSecond = 59;
        }

        if (this.leaveTimeSecond === 0 && this.leaveTimeMin === 0) {
          clearInterval(interval);
          this.leaveTimeSecond = 0;
          this.submit();
        }
      }, 1000);
    },
    submit () {
      console.log(this.questionList);
      const list = [];

      this.questionList.map(item => {
        if (item.attachment) {
          list.push({
            id: item.id,
            result: item.attachment.split('、')[0]
          });
        } else {
          list.push({
            id: item.id,
            result: item.attachment
          });
        }
      });

      examination.examGoal(JSON.stringify(list), this.$store.state.user.userLoginInfo.userId, this.examId).then(res => {
        console.log(33333333333333, res);
        this.$router.closeCurrentPage();
      });
    },
    callback () {

    }
  }
};
</script>
