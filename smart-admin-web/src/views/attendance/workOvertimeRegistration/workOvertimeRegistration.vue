<template>
  <div>
    <div class="rightTop">
      <Button
        @click="resetFirstTable"
        icon="md-refresh"
        type="default"
        style="margin-right: 15px"
        >{{ $t("Reflash") }}</Button
      >
      <Button type="warning" @click="handleAdd">{{
        $t("kqgl.jiabandengji")
      }}</Button>
    </div>
    <Tables
      :value="firstData"
      :columns="firstColumns"
      :loading="firstLoading"
      :total="fistTotal"
      :pageShow="true"
      :current="seachParms.pageNum"
      :page-size="seachParms.pageSize"
      @on-change="firstChangePage"
      show-elevator
    ></Tables>
    <firstFrom
      :modalstat.sync="modalstat"
      :editData.sync="editData"
      @restList="restList"
    />
  </div>
</template>

<script>
import { attendance } from "@/api/attendance";
import Tables from "@/components/tables";
import organization from "@/components/organization";
import firstFrom from "./components/firstFrom";

export default {
  name: "workOvertimeRegistration",
  components: {
    Tables,
    organization,
    firstFrom,
  },
  data() {
    return {
      editData: {},
      fistTotal: 0,
      seachParms: {
        employeeId: this.$store.state.user.userLoginInfo.userId,
        // employeeId: 2,
        pageNum: 1,
        pageSize: 10,
      },

      firstLoading: false,
      firstColumns: [
        {
          title: this.$t("kqgl.shenqingshijian"),
          key: "applyTime",
        },
        {
          title: this.$t("kqgl.kaishishijian"),
          key: "startTime",
        },
        {
          title: this.$t("kqgl.jieshushijian"),
          key: "endTime",
        },
        {
          title: this.$t("kqgl.jiabanleixing"),
          key: "type",
          render: (h, params) => {
            if (params.row.type === 0) {
              return h("span", this.$t("kqgl.gzrjiab"));
            } else if (params.row.type === 1) {
              return h("span", this.$t("kqgl.shuangxiuriji"));
            } else if (params.row.type === 2) {
              return h("span", this.$t("kqgl.fdjrjaiba"));
            }
          },
        },
        {
          title: this.$t("kqgl.jiabanshijian"),
          key: "totalTime",
        },
        {
          title: this.$t("kqgl.jiabanshiyou"),
          key: "reason",
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
    restList(val) {
      if (val) {
        this.getFirstTableData();
      }
    },
    handleAdd() {
      // this.modalstat = true;
      this.$router.push({
          name: 'flowStart'
        });
    },
    async getFirstTableData() {
      try {
        this.firstLoading = true;
        let result = await attendance.findWorkOvertime(this.seachParms);
        this.firstLoading = false;
        // console.log(result)
        this.firstData = result.data.list;
        this.fistTotal = result.data.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.firstLoading = false;
      }
    },
    // 重置
    resetFirstTable() {
      this.seachParms.pageNum = 1;
      this.getFirstTableData();
    },
    newFirstForm() {
      this.modalState = "新建";
      // this.firstLoading = true;
      // this.modalstat = true;
      // this.$router.push({
      //     name: 'flowStart'
      //   });
    },
    // 翻页
    firstChangePage(pageNum) {
      this.seachParms.pageNum = pageNum;
      this.getFirstTableData();
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

.rightTopItem {
  display: flex;
  align-items: center;
  font-size: 12px;
  padding-left: 25px;
}

.rightTopItemTitle {
  padding-right: 10px;
}
</style>