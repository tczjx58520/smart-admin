<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="1020"
    :closable="false"
    :mask-closable="false"
    :transfer="false"
    :styles="{ top: '10px' }"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>手动考核</span>
    </div>
    <div>
      <Card dis-hover>
        <Table
          border
          ref="selection"
          :columns="columns"
          :data="list"
          max-height="calc(70vh)"
        ></Table>
        <!-- <Page
          :current="searchform.pageNum"
          :page-size="searchform.pageSize"
          :page-size-opts="[10, 20, 30, 50, 100]"
          :total="pageTotal"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          show-elevator
          show-sizer
          show-total
          style="margin: 24px 0; text-align: right"
        ></Page> -->
      </Card>
    </div>
    <div slot="footer">
      <ButtonGroup>
        <!-- <Button
          type="primary"
          size="large"
          :loading="modal_loading"
          @click="handsave"
          >{{ $t("Save") }}</Button
        > -->
        <Button type="error" size="large" @click="cancel">{{
          $t("Close")
        }}</Button>
      </ButtonGroup>
    </div>
  </Modal>
  <!-- 设置步骤弹窗======================= -->
</template>
<script>
import { personnelAnalysis } from "@/api/personnelAnalysis";
const defaultEvent = {
  flowName: "",
  category: null,
};
export default {
  name: "addGong",
  components: {},
  props: {
    modalstat: {
      type: Boolean,
      default: false,
    },
    editInfo: null,
  },
  created() {},
  mounted() {},
  data() {
    return {
      mymoadlStat: this.modalstat,
      modal_loading: false,
      searchform: {
        pageNum: 1,
        pageSize: 999,
      },
      pageTotal: 0,
      columns: [
        {
          title: this.$t("assessmentTask_view.examiner"),
          key: "a",
          width: "200",
        },
        {
          title: this.$t("assessmentTask_view.hadexaminer"),
          key: "b",
          width: "200",
        },
        {
          title: this.$t("assessmentTask_view.unassessedPerson"),
          key: "c",
        },
      ],
      list: [],
      addform: {},
    };
  },
  watch: {
    async modalstat() {
      this.mymoadlStat = this.modalstat;
      if (this.modalstat) {
        this.addform = this.editInfo;
        console.log(this.addform);
        const data = {
          id: this.addform.id,
        };
        personnelAnalysis.querytest(data).then((res) => {
          console.log(res);
          process = res.data.content;
          process.testHandleStr = process.testHandleName.join(",");
          process.testEndStr = process.testEndName.join(",");
          process.unTestStr = process.unTestName.join(",");
          this.concatarry(
            process.testHandleName,
            process.testEndName,
            process.unTestName
          );
        });
      }
    },
  },
  methods: {
    concatarry(a, b, c) {
      if (typeof a === "undefined") {
        a = [];
      }
      if (typeof b === "undefined") {
        b = [];
      }
      if (typeof c === "undefined") {
        c = [];
      }
      console.log(typeof a, [...a], typeof b, b, typeof c, c);
      let al = a.length;
      let bl = b.length;
      let cl = c.length;
      let lengtharry = [al, bl, cl];
      let processlen = lengtharry.sort((a, b) => {
        return a - b;
      });
      let proceesarry = [];
      console.log("processlen=======", processlen[2]);
      for (let i = 0; i < processlen[2]; i++) {
        console.log("i==================", i, a[i], b[i], c[i]);
        let data = {};
        data.a = a[i] || "";
        data.b = b[i] || "";
        data.c = c[i] || "";
        proceesarry.push(data);
      }
      this.list = proceesarry;
      console.log("proceesarry===============", proceesarry);
    },
    handsave() {},
    cancel() {
      this.$emit("updateStat", false);
    },
    // 分页
    changePage(pageNum) {
      this.searchform.pageNum = pageNum;
      this.getpersonnelAnalysis();
    },
    // 分页
    changePageSize(pageSize) {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getpersonnelAnalysis();
    },
  },
};
</script>
<style lang="less" scoped>
.add /deep/ .ivu-modal-header {
  background-color: #2d8cf0;
}
.add /deep/ .ivu-modal-content {
  background-color: #eee;
}
.add /deep/ .ivu-modal-footer {
  border: none;
}
.add /deep/ .ivu-table-wrapper {
  overflow: visible;
}
</style>
