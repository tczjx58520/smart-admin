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
        <Button
          type="primary"
          size="large"
          :loading="modal_loading"
          @click="handsave"
          >{{ $t("Save") }}</Button
        >
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
      columns: [],
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
          testStat: 0,
        };
        personnelAnalysis.queryAllScore(data).then((res) => {
          console.log(res.data.content);
          const setting = [
            {
              title: this.$t("OrganizationName"),
              key: "organizeName",
              width: 200,
            },
            {
              title: this.$t("usermanage_view.name"),
              key: "empName",
              width: 200,
            },
            {
              title: this.$t("usermanage_view.role"),
              key: "roleName",
              width: 100,
            },
            {
              title: this.$t("viewTask_view.totalScore"),
              key: "totalScore",
              width: 100,
            },
          ];
          res.data.content[0].itemScoreVos.map((item) => {
            const data = {
              title: item.itemName,
              key: item.itemName,
              render: (h, params) => {
                return h("Input", {
                  props: {
                    value: params.row[item.itemName],
                    size: "small",
                  },
                  on: {
                    input: (val) => {
                      console.log("val========>", val, item);
                      this.list[params.index][item.itemName] = val;
                      console.log(this.list[params.index]);
                      let index = this.list[
                        params.index
                      ].itemScoreVos.findIndex(
                        (val) => val.itemName === item.itemName
                      );
                      console.log("index===========", index);
                      this.list[params.index].totalScore = 0;
                      this.list[params.index].flag = true;
                      for (const i in this.list[params.index].itemScoreVos) {
                        this.list[params.index].itemScoreVos[
                          index
                        ].score = val;
                        this.list[params.index].totalScore += Number(
                          this.list[params.index].itemScoreVos[i].score
                        );
                      }
                    },
                  },
                });
              },
            };
            setting.push(data);
          });
          this.columns = setting;
          res.data.content.map((item) => {
            item.itemScoreVos.map((items) => {
              item[items.itemName] = items.score;
            });
          });
          this.list = res.data.content;
          console.log(this.list);
        });
      }
    },
  },
  methods: {
    async handsave() {
      console.log(this.list);
      this.modal_loading = true;
      console.log(this.list);
      for (const i in this.list) {
        this.list[i].taskId = this.list[i].itemScoreVos[0].taskId;
        this.list[i].operatId = this.$store.state.user.userLoginInfo.userId;
        this.list[i].itemScoreJson = JSON.stringify(this.list[i].itemScoreVos);
        if (this.list[i].flag) {
          await personnelAnalysis.handleTest(this.list[i]).then(res => {
            if (res.ret === 200) {
            } else {
              this.$emit('updateStat', false);
              this.$Message.success('fail');
              return false;
            }
          });
        }
      }
      this.modal_loading = false;
      this.$emit('updateStat', false);
      this.$Message.success('考核成功');
      console.log('this.list=====', this.list);
    },
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
