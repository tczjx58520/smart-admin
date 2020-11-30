<template>
  <div class="maincontent">
    <div class="leftTree">
      <organizationTree />
    </div>
    <div class="rightRecord">
      <recordCalendar />
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
    async getData() {
      try {
        let result = await attendance.attendanceRecord(this.searchform);
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
  width: 80%;
}
</style>