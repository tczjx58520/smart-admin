<template>
  <div>
    <TabPane :label="$t('kqgl.wdkq')">
      <div class="rightTop">
        <div class="topItems">
          <div class="itemLeft">
            <div class="yingdaotianshu"></div>
            <div class="leftTitle">{{ $t("kqgl.ydts") }}</div>
          </div>
          <div class="itemRight">19</div>
        </div>

        <div class="topItems">
          <div class="itemLeft">
            <div class="yingdaotianshu2"></div>
            <div class="leftTitle">{{ $t("kqgl.cuqingtsh") }}</div>
          </div>
          <div class="itemRight">19</div>
        </div>

        <div class="topItems">
          <div class="itemLeft">
            <div class="yingdaotianshu3"></div>
            <div class="leftTitle">{{ $t("kqgl.chidaozaotui") }}</div>
          </div>
          <div class="itemRight">19</div>
        </div>

        <div class="topItems">
          <div class="itemLeft">
            <div class="yingdaotianshu4"></div>
            <div class="leftTitle">{{ $t("kqgl.quekacishu") }}</div>
          </div>
          <div class="itemRight">19</div>
        </div>

        <div class="topItems">
          <div class="itemLeft">
            <div class="yingdaotianshu5"></div>
            <div class="leftTitle">{{ $t("kqgl.waichucishu") }}</div>
          </div>
          <div class="itemRight">19</div>
        </div>
      </div>
      <div class="rightTop">
        <Button
          @click="resetFirstTable"
          icon="md-refresh"
          type="default"
          style="margin-right: 15px"
          >{{ $t("Reflash") }}</Button
        >
        <div class="rightTopItem">
          <span class="rightTopItemTitle">{{ $t("kqgl.rqxz") }}</span>
          <span>
            <DatePicker
              type="month"
              v-model="year"
              placeholder="Select year"
              style="width: 200px"
            />
          </span>
        </div>
        <div class="rightTopItem">
          <Button type="primary" @click.native="getFirstTableData">{{
            $t("Search")
          }}</Button>
        </div>
      </div>
      <Tables
        :columns="firstColumns"
        :current="firstTable.pageNum"
        :loading="firstLoading"
        :page-size="firstTable.pageSize"
        :pageShow="false"
        :total="fistTotal"
        :value="firstData"
        @on-change="firstChangePage"
        @on-selection-change="selectFirst"
        show-elevator
      ></Tables>
    </TabPane>
  </div>
</template>

<script>
import { attendance } from "@/api/attendance";
import Tables from "@/components/tables";
import organization from "@/components/organization";

export default {
  name: "secondTable",
  components: {
    Tables,
    organization,
  },
  data() {
    return {
      year: "",
      organizationName: "",
      selectData: "",
      editData: null,
      firstLoading: false,
      firstTable: {
        employeeId: this.$store.state.user.userLoginInfo.userId,
        // employeeId: 2,

        pageNum: 1,
        pageSize: 10,
      },
      fistTotal: 0,
      firstColumns: [
        {
          title: this.$t("kqgl.rq"),
          key: "annualLeaveTotalDays",
        },
        {
          title: this.$t("kqgl.sb"),
          key: "annualLeaveUsedDays",
        },
        {
          title: this.$t("kqgl.xb"),
          key: "annualLeaveRemainDays",
        },
        {
          title: this.$t("kqgl.sb"),
          key: "annualLeaveUsedDays",
        },
        {
          title: this.$t("kqgl.xb"),
          key: "annualLeaveRemainDays",
        },
        {
          title: this.$t("kqgl.qkshuom"),
          key: "annualLeaveRemainDays",
        },
      ],
      firstData: [],
      modalstat: false,
      modalState: "",
    };
  },
  mounted() {
    this.getFirstTableData();
  },
  methods: {
    organizationData(val) {
      this.organizationName = val.title;
      this.firstTable.organizationId = val.id;
    },
    selectOrg() {
      this.modalstat = true;
    },
    restList(val) {
      if (val) {
        this.getFirstTableData();
      }
    },
    Edit(row) {
      // if (this.$judge(['1-4-2'])) {
      //   this.editinfo = row;
      //   this.visiable_edit = true;
      // } else {
      //   console.log('needroles');
      // }
      this.modalState = "修改";
      this.editData = Object.assign({}, row);

      // this.firstLoading = true;
      this.modalstat = true;
    },
    selectFirst(selection) {
      this.selectData = selection;
    },
    GMTToStr(time) {
      let date = new Date(time);
      let Str = date.getFullYear();
      return Str;
    },
    async getFirstTableData() {
      try {
        this.firstLoading = true;
        let result = await attendance.personalAttendance(this.firstTable);
        this.firstLoading = false;
        console.log(result)
        this.firstData = result.data.list;
        this.fistTotal = result.data.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.firstLoading = false;
      }
    },
    // 翻页
    firstChangePage(pageNum) {
      this.firstTable.pageNum = pageNum;
      this.getFirstTableData();
    },
    // 改变一页展示数
    firstChangePageSize(pageSize) {
      this.firstTable.pageNum = 1;
      this.firstTable.pageSize = pageSize;
      this.getFirstTableData();
    },
    // 重置
    resetFirstTable() {
      this.firstTable.pageNum = 1;
      this.getFirstTableData();
    },
    newFirstForm() {
      this.modalState = "新建";
      // this.firstLoading = true;
      this.modalstat = true;
    },
  },
};
</script>

<style lang="less" scoped>
.rightTop {
  background: #ffffff;
  padding: 10px 0;
  display: flex;
}

.topItems {
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 10%;
  background: #079af7;
  border-radius: 5px;
  height: 70px;
  color: #ffffff;
}

.topItems:nth-child(1) {
  margin-left: 0;
}

.topItems:nth-child(2) {
  background: #e76740;
}

.topItems:nth-child(3) {
  background: #47dba1;
}

.topItems:nth-child(4) {
  background: #058be0;
}

.topItems:nth-child(5) {
  background: #e05328;
}

.leftTitle {
  padding-top: 5px;
}

.itemRight {
  font-size: 30px;
  color: #ffffff;
}
.rightTopItem {
  display: flex;
  align-items: center;
  font-size: 12px;
  padding-left: 25px;
}

.rightTopItemTitle {
  padding-right: 10px;
}

.yingdaotianshu {
  background: url('../../../../assets/images/yingdaotianshu.png');
  height: 30px;
  width: 30px;
  margin: 0 auto;
  background-size: 100%;
}

.yingdaotianshu2 {
  background: url('../../../../assets/images/chuqing.png');
  height: 30px;
  width: 30px;
  margin: 0 auto;
  background-size: 100%;
}

.yingdaotianshu3 {
  background: url('../../../../assets/images/chidao.png');
  height: 30px;
  width: 30px;
  margin: 0 auto;
  background-size: 100%;
}

.yingdaotianshu4 {
  background: url('../../../../assets/images/queka.png');
  height: 30px;
  width: 30px;
  margin: 0 auto;
  background-size: 100%;
}

.yingdaotianshu5 {
  background: url('../../../../assets/images/waichu.png');
  height: 30px;
  width: 30px;
  margin: 0 auto;
  background-size: 100%;
}
</style>