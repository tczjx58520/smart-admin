<template>
  <div class="maincontent">
    <!-- <div class="leftTree">
      <organizationTree />
    </div> -->
    <div class="rightRecord">
      <recordCalendar :calendarData="sendData" :otherData="otherData" @empIdData="getEmpData" @monthData="getMonthData" @searh="research"/>
    </div>
  </div>
</template>

<script>
import organizationTree from "@/components/organizationTree";
import recordCalendar from "@/components/recordCalendar";
import { attendance } from "@/api/attendance";
export default {
  name: "attendanceRecord",
  components: {
    organizationTree,
    recordCalendar,
  },
  data() {
    return {
      otherData: {},
      sendData: [],
      searchform: {
        employeeId: this.$store.state.user.userLoginInfo.userId,
        date: "2020-11",
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    research(val) {
      this.getData()
    },
    getMonthData(val) {
      console.log('getMonthData', val)
      this.searchform.date = val
    },
    getEmpData(val) {
      console.log('getEmpData', val)
      this.searchform.employeeId = val.id
    },
    async getData() {
      try {
        let result = await attendance.attendanceRecord(this.searchform);
        console.log('result', result)
        this.sendData = result.data.list
        this.otherData = result.data
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.maincontent {
  display: flex;
  // align-items: center;
  // justify-content: center;
}
.leftTree {
  width: 20%;
}
.rightRecord {
  width: 100%;
}
</style>