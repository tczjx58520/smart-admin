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
    </div>
    <Tables
      :columns="firstColumns"
      :loading="firstLoading"
      :pageShow="false"
      :value="firstData"
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
  name: "punchTheClock",
  components: {
    Tables,
    organization,
    firstFrom,
  },
  data() {
    return {
      editData: {},
      employeeId: this.$store.state.user.userLoginInfo.userId,
      // employeeId: 2,

      firstLoading: false,
      firstColumns: [
        {
          type: "selection",
          width: 50,
          align: "center",
        },
        {
          title: this.$t("kqgl.bc"),
          key: "shiftName",
        },
        {
          title: this.$t("kqgl.dengjilexing"),
          key: "punchType",
          render: (h, params) => {
            if (params.row.whetherVocation === 0) {
              return h("span", this.$t("kqgl.sb"));
            } else {
              return h("span", this.$t("kqgl.xb"));
            }
          },
        },
        {
          title: this.$t("kqgl.guidingshijian"),
          key: "setTime",
        },
        {
          title: this.$t("kqgl.ksdjsj"),
          key: "punchStartTime",
        },
        {
          title: this.$t("kqgl.jsdjsj"),
          key: "punchEndTime",
        },
        {
          title: this.$t("kqgl.shijidakashi"),
          key: "punchRealTime",
        },
        {
          title: this.$t("kqgl.djzt"),
          key: "punchStatus",
          render: (h, params) => {
            if (params.row.punchStatus === 0) {
              return h("span", this.$t("kqgl.zhengchang"));
            } else if (params.row.punchStatus === 1) {
              return h("span", this.$t("kqgl.weidaka"));
            } else if (params.row.punchStatus === 2) {
              return h(
                "span",
                { style: { color: "red" } },
                this.$t("kqgl.chidao")
              );
            } else if (params.row.punchStatus === 3) {
              return h(
                "span",
                { style: { color: "red" } },
                this.$t("kqgl.zaotui")
              );
            }
          },
        },
        {
          title: this.$t("kqgl.qkshuom"),
          key: "note",
        },
        {
          title: this.$t("usermanage_view.action"),
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.Edit(params.row);
                    },
                  },
                },
                this.$t("kqgl.smqk")
              ),
            ]);
          },
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
    Edit(row) {
      this.editData = row;
      this.modalstat = true;
    },
    async getFirstTableData() {
      try {
        this.firstLoading = true;
        let result = await attendance.findPunchInfo(this.employeeId);
        this.firstLoading = false;
        // console.log(result)
        this.firstData = result.data.data;
        this.fistTotal = result.data.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.firstLoading = false;
      }
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