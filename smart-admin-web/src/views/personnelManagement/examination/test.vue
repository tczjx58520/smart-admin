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
    <div style="height:1000px;overflow:auto;">
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
      leaveTimeSecond: 60,
      totalTime: null
    };
  },
  created () {
    this.questionList = this.$route.query.questionList;
    this.examId = Number(this.$route.query.examId);
    this.startTime = this.$route.query.startTime;
    this.totalTime = Number(this.$route.query.totalTime);
    console.log(this.startTime);

    // 当前时间
    let nowTime = new Date();

    const myDate = this.$moment(nowTime);
    const myDate2 = this.$moment(Number(this.startTime));
    const surplus = myDate.diff(myDate2, 'minutes');
    console.log(myDate);
    console.log(myDate2);

    console.log(surplus);
    console.log(this.totalTime);

    console.log(this.$moment.duration(myDate.diff(myDate2))._data);
    console.log(11111, this.$moment.duration(myDate.diff(myDate2))._data.minutes);
    console.log(22222, this.$moment.duration(myDate.diff(myDate2))._data.seconds);

    const day = this.$moment.duration(myDate.diff(myDate2))._data.day * 24 * 60 * 60 * 1000;
    const hour = this.$moment.duration(myDate.diff(myDate2))._data.hours * 60 * 60 * 1000;
    const minutes = this.$moment.duration(myDate.diff(myDate2))._data.hours * 60 * 1000;
    const seconds = this.$moment.duration(myDate.diff(myDate2))._data.hours * 1000;

    if (surplus > this.totalTime) {
      this.leaveTimeMin = this.totalTime - 1;
    } else {
      this.leaveTimeMin = surplus - this.totalTime - 1;
    }

    this.leaveTime();
  },
  methods: {
    leaveTime () {
      setInterval(() => {
        if (this.leaveTimeSecond !== 0 && this.leaveTimeMin !== 0) {
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
          this.leaveTimeSecond = 0;
          clearInterval();
          this.submit();
        }
      }, 1000);
    },
    submit () {
      console.log(this.questionList);
      const list = [];
      this.questionList.map(item => {
        list.push({
          id: item.id,
          result: item.attachment.split('、')[0]
        });
      });

      examination.examGoal(JSON.stringify(list), this.$store.state.user.userLoginInfo.userId, this.examId).then(res => {
        console.log(33333333333333333333333, res);
        this.$router.closeCurrentPage();
      });
    },
    callback () {

    }
  }
};
</script>
