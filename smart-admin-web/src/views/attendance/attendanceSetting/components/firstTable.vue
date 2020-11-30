<template>
  <div>
    <TabPane :label="$t('kqgl.bc')">
      <div style="margin-bottom: 20px">
        <Button
          style="margin-right: 15px"
          @click="resetFirstTable"
          icon="md-refresh"
          type="default"
          >{{ $t("Reflash") }}</Button
        >
        <Button
          style="margin-right: 15px"
          @click="newFirstForm"
          icon="md-add"
          type="warning"
          >{{ $t("Create") }}</Button
        >
        <Button
          style="margin-right: 15px"
          @click="clearFirstTable"
          icon="md-close"
          type="error"
          >{{ $t("Delete") }}</Button
        >
      </div>
      <Table
        :columns="firstColumns"
        :data="firstData"
        :loading="firstLoading"
        @on-selection-change="selectFirst"
      ></Table>
      <Page
        :current="firstTable.pageNum"
        :page-size="firstTable.pageSize"
        :page-size-opts="[10, 20, 30, 50, 100]"
        :total="fistTotal"
        @on-change="firstChangePage"
        @on-page-size-change="firstChangePageSize"
        show-elevator
        show-sizer
        show-total
        style="margin: 24px 0; text-align: right"
      ></Page>
    </TabPane>
    <firstForm
      :modalstat.sync="modalstat"
      :modalState.sync="modalState"
      :editData="editData"
      @restList="restList"
    />
  </div>
</template>

<script>
<<<<<<< Updated upstream
import { attendance } from '@/api/attendance';
import firstForm from './firstFrom';

export default {
  name: 'firstTable',
  components: {
    firstForm
  },
  data () {
    return {
      selectData: '',
=======
import { attendance } from "@/api/attendance";
import firstForm from "./firstFrom";

export default {
  name: "firstTable",
  components: {
    firstForm,
  },
  data() {
    return {
      selectData: "",
>>>>>>> Stashed changes
      editData: null,
      firstLoading: false,
      firstTable: {
        pageNum: 1,
<<<<<<< Updated upstream
        pageSize: 10
=======
        pageSize: 10,
>>>>>>> Stashed changes
      },
      fistTotal: 0,
      firstColumns: [
        {
<<<<<<< Updated upstream
          type: 'selection',
=======
          type: "selection",
>>>>>>> Stashed changes
          width: 50,
          align: "center",
        },
        {
          title: this.$t("kqgl.bcmc"),
          key: "shiftName",
        },
        {
          title: this.$t("kqgl.sbsj"),
          key: "startWorkTimeMorning",
        },
        {
          title: this.$t("kqgl.xbsj"),
          key: "overWorkTimeMorning",
        },
        {
          title: this.$t("kqgl.sbsj"),
          key: "startWorkTimeAfternoon",
        },
        {
<<<<<<< Updated upstream
          title: this.$t('kqgl.sbsj'),
          key: 'startWorkTimeMorning'
        }, {
          title: this.$t('kqgl.xbsj'),
          key: 'overWorkTimeMorning'
        }, {
          title: this.$t('kqgl.sbsj'),
          key: 'startWorkTimeAfternoon'
        }, {
          title: this.$t('kqgl.xbsj'),
          key: 'overWorkTimeAfternoon'
        }, {
          title: this.$t('kqgl.sfswxj'),
          key: 'whetherVocation',
=======
          title: this.$t("kqgl.xbsj"),
          key: "overWorkTimeAfternoon",
        },
        {
          title: this.$t("kqgl.sfswxj"),
          key: "whetherVocation",
>>>>>>> Stashed changes
          render: (h, params) => {
            if (params.row.whetherVocation === 0) {
              return h("span", this.$t("kqgl.yes"));
            } else {
              return h("span", this.$t("kqgl.no"));
            }
<<<<<<< Updated upstream
          }
        }, {
          title: this.$t('kqgl.sfsx'),
          key: 'whetherEffect',
          render: (h, params) => {
            if (params.row.whetherVocation === 0) {
              return h('span', this.$t('kqgl.yes'));
=======
          },
        },
        {
          title: this.$t("kqgl.sfsx"),
          key: "whetherEffect",
          render: (h, params) => {
            if (params.row.whetherVocation === 0) {
              return h("span", this.$t("kqgl.yes"));
>>>>>>> Stashed changes
            } else {
              return h("span", this.$t("kqgl.no"));
            }
<<<<<<< Updated upstream
          }
        }, {
          title: this.$t('usermanage_view.action'),
          key: 'action',
=======
          },
        },
        {
          title: this.$t("usermanage_view.action"),
          key: "action",
>>>>>>> Stashed changes
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
                this.$t("Edit")
              ),
            ]);
<<<<<<< Updated upstream
          }
        }
      ],
      firstData: [],
      modalstat: false,
      modalState: ''
    };
  },
  mounted () {
    this.getFirstTableData();
  },
  methods: {
    restList (val) {
=======
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
>>>>>>> Stashed changes
      if (val) {
        this.getFirstTableData();
      }
    },
<<<<<<< Updated upstream
    Edit (row) {
=======
    Edit(row) {
>>>>>>> Stashed changes
      // if (this.$judge(['1-4-2'])) {
      //   this.editinfo = row;
      //   this.visiable_edit = true;
      // } else {
      //   console.log('needroles');
      // }
<<<<<<< Updated upstream
      this.modalState = '修改';
=======
      this.modalState = "修改";
>>>>>>> Stashed changes
      this.editData = Object.assign({}, row);

      // this.firstLoading = true;
      this.modalstat = true;
    },
    selectFirst(selection) {
      this.selectData = selection;
    },
    clearFirstTable() {
      let sendParms = {
        ids: [],
<<<<<<< Updated upstream
        createId: this.$store.state.user.userLoginInfo.userId
=======
        createId: this.$store.state.user.userLoginInfo.userId,
>>>>>>> Stashed changes
      };
      for (const i in this.selectData) {
        sendParms.ids.push(this.selectData[i].id);
      }

      console.log(sendParms);
<<<<<<< Updated upstream
      attendance.deleteShiftPatch(sendParms).then(res => {
=======
      attendance.deleteShiftPatch(sendParms).then((res) => {
>>>>>>> Stashed changes
        if (res.ret === 200) {
          this.$Message.success(res.msg);
          this.getFirstTableData();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    async getFirstTableData() {
      try {
        this.firstLoading = true;
        let result = await attendance.findAllShiftInfo(this.firstTable);
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
<<<<<<< Updated upstream
    newFirstForm () {
      this.modalState = '新建';
      // this.firstLoading = true;
      this.modalstat = true;
    }
  }
};
</script>
=======
    newFirstForm() {
      this.modalState = "新建";
      // this.firstLoading = true;
      this.modalstat = true;
    },
  },
};
</script>
>>>>>>> Stashed changes
