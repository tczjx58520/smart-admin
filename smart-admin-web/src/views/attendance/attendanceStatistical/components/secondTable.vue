<template>
  <div>
    <TabPane :label="$t('kqgl.qingjiatongji')">
      <div class="rightTop">
        <Button
          @click="resetFirstTable"
          icon="md-refresh"
          type="default"
          style="margin-right: 15px"
          >{{ $t("Reflash") }}</Button
        >
        <Button
          @click="resetFirstTable"
          type="primary"
          style="margin-right: 15px"
          >{{ $t("kqgl.daying") }}</Button
        >
        <div class="rightTopItem">
          <span class="rightTopItemTitle">{{ $t("kqgl.rqxz") }}</span>
          <span>
            <DatePicker
              type="date"
              placeholder="Select year"
              style="width: 200px"
              @on-change="chooseDate"
            />
          </span>
        </div>

        <div class="rightTopItem">
          <span class="rightTopItemTitle">{{ $t("kqgl.sengqingren") }}</span>
          <span>
            <Input
              :value="createPersonName"
              type="text"
              @click.native="chooseEmp"
            />
          </span>
          <selectEmp :modalstat.sync="empSata" @selectData="selectData" />
        </div>

        <div class="rightTopItem">
          <span class="rightTopItemTitle">{{ $t("kqgl.suoshuzhuzhi") }}</span>
          <span>
            <Input
              :value="organizationName"
              type="text"
              @click.native="selectOrg()"
            />
          </span>
          <organization
            :modalstat.sync="modalstat"
            @organizationData="organizationData"
          />
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
        :pageShow="true"
        :editable="false"
        :total="fistTotal"
        :value="firstData"
        @on-change="firstChangePage"
        show-elevator
        show-sizer
      ></Tables>
    </TabPane>
  </div>
</template>

<script>
import { attendance } from "@/api/attendance";
import Tables from "@/components/tables";
import organization from "@/components/organization";
import selectEmp from "@/components/selectEmp";

export default {
  name: "firstTable",
  components: {
    Tables,
    organization,
    selectEmp,
  },
  data() {
    return {
      createPersonName: "",
      organizationName: "",
      firstLoading: false,
      firstTable: {
        organizationId: null,
        createPersonName: null,
        conditionTime: null,
        pageNum: 1,
        pageSize: 10,
      },
      fistTotal: 0,
      firstColumns: [
        {
          title: this.$t("kqgl.dengjiren"),
          key: "createPersonName",
        },
        {
          title: this.$t("kqgl.shenqingshijian"),
          key: "applyTime",
        },
        {
          title: this.$t("kqgl.kaishishijian"),
          key: "overWorkTimeMorning",
        },
        {
          title: this.$t("kqgl.jieshushijian"),
          key: "startWorkTimeAfternoon",
        },
        {
          title: this.$t("kqgl.qingjiashijian"),
          key: "totaltime",
        },
        {
          title: this.$t("kqgl.qingjialeixing"),
          key: "type",
          render: (h, params) => {
            if (params.row.type === 0) {
              return h("span", this.$t("kqgl.bingjia"));
            } else if (params.row.type === 1) {
              return h("span", this.$t("kqgl.shijia"));
            } else if (params.row.type === 2) {
              return h("span", this.$t("kqgl.nianjia"));
            } else if (params.row.type === 3) {
              return h("span", this.$t("kqgl.hunjia"));
            } else if (params.row.type === 4) {
              return h("span", this.$t("kqgl.peichanjia"));
            } else if (params.row.type === 5) {
              return h("span", this.$t("kqgl.chanjia"));
            } else if (params.row.type === 6) {
              return h("span", this.$t("kqgl.shangjia"));
            } else if (params.row.type === 7) {
              return h("span", this.$t("kqgl.qita"));
            }
          },
        },
        {
          title: this.$t("kqgl.qingjiashiyou"),
          key: "reason",
        },
      ],
      firstData: [],
      modalstat: false,
      modalState: "",
      empSata: false,
    };
  },
  mounted() {
    this.getFirstTableData();
  },
  methods: {
    chooseDate(val) {
      this.firstTable.conditionTime = val;
    },
    selectData(val) {
      // console.log('val', val)
      this.firstTable.createPersonName = val.id;
      this.createPersonName = val.personName;
    },
    chooseEmp() {
      this.empSata = true;
    },
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
    async getFirstTableData() {
      try {
        this.firstLoading = true;
        let result = await attendance.vocationStatistical(this.firstTable);
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