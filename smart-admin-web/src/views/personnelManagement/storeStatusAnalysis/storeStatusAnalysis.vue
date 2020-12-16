<template>
  <div>
    <div style="display: flex">
      <div style="width: 100%; height: calc(80vh)">
        <Card class="warp-card" dis-hover>
          <div style="margin-bottom: 20px">
            <Button
              style="margin-right: 15px"
              @click="refresh"
              icon="md-refresh"
              type="default"
              >{{ $t("Reflash") }}</Button
            >
          </div>
          <Table
            border
            ref="selection"
            :columns="columns4"
            :data="indicatorlist"
            max-height="calc(70vh)"
            @on-selection-change="getmoreaction"
            @on-row-click="rowClick"
            :loading="loading"
            @on-row-dblclick="Edit"
          ></Table>
          <Page
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
          ></Page>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import { roleApi } from "@/api/role";
import { empInduction } from "@/api/empInduction";
import { positionApi } from "@/api/position";
export default {
  name: "storeStatusAnalysis",
  components: {
  },
  data() {
    return {
      postData: [],
      id: "",
      copyfile: null,
      editinfo: {},
      visiable: false,
      visiable_edit: false,
      pageTotal: 0,
      statList: [
        {
          value: 1,
          label: "启用",
        },
        {
          value: 2,
          label: "停用",
        },
      ],
      treedata: [],
      formdata: {
        organizeParent: "",
      },
      searchform: {
        pageNum: 1,
        pageSize: 10,
      },
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: this.$t("xm"),
          key: "employeeName",
        },
        {
          title: this.$t("sszz"),
          key: "organizeName",
        },
        {
          title: this.$t("ssgw"),
          key: "postName",
        },
        {
          title: this.$t("jhrzsj"),
          key: "onDate",
        },
        {
          title: this.$t("xb"),
          render: (h, params) => {
            if (params.row.gender === 1) {
              return h("span", this.$t("nan"));
            } else {
              return h("span", this.$t("nv"));
            }
          },
        },
        {
          title: this.$t("sjh"),
          key: "phone",
        },
        // {
        //   title: this.$t("htqssj"),
        //   key: "itemName",
        // },
        // {
        //   title: this.$t("zzrq"),
        //   key: "itemName",
        // },
        {
          title: this.$t("action"),
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.haveAcontract(params.row);
                    },
                  },
                },
                this.$t("qsht")
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  directives: [
                    {
                      name: "privilege",
                      value: ["1-4-2"],
                    },
                  ],
                  on: {
                    click: () => {
                      this.delSingle(params.row);
                    },
                  },
                },
                this.$t("ryzhuanzheng")
              ),
            ]);
          },
        },
      ],
      indicatorlist: [],
      loading: false,
      moreaction: "",
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created() {},
  mounted() {
    this.getlist();
    this.getempInductionList();
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    haveAcontract(row) {
      this.$router.push({path:'/processDo/flowStart',query:{id:row.id}})
    },
    getlist() {
      const searchFrom = {
        pageNum: 1,
        pageSize: 9999,
      };
      positionApi.postList(searchFrom).then((res) => {
        if (res.ret === 200) {
          this.postData = res.data.content.list;
        } else {
          console.log("列表出错");
        }
      });
    },
    // 分页
    changePage(pageNum) {
      this.searchform.pageNum = pageNum;
      this.getempInductionList();
    },
    // 分页
    changePageSize(pageSize) {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getempInductionList();
    },
    getmoreaction(list) {
      this.moreaction = list;
      console.log("list===>", list);
    },
    updateStat(stat) {
      this.visiable = stat;
      this.getempInductionList();
    },
    updateStat_edit(stat) {
      this.visiable_edit = stat;
      this.getempInductionList();
    },
    updateStat_new(stat) {
      this.visiable3 = stat;
    },
    to_conduct(stat) {
      this.visiable3 = stat;
      this.$router.push({
        name: "conductAnAssessment",
      });
    },
    getempInductionList() {
      this.loading = true;
      empInduction.getempInductionList(this.searchform).then((res) => {
        this.loading = false;
        this.indicatorlist = res.data.content.list;
      });
    },
    rowClick(data, index) {
      // data 该行数据 ，index该行索引
      //   this.$refs.selection.toggleSelect(index);// 选中/取消该行（若已选中则是取消，若已取消则是选中）
    },
    Edit(row) {
      console.log(row);
      this.visiable_edit = true;
      this.editinfo = row;
    },
    delSingle(row) {
      console.log(row);
      this.$router.push({path: '/processDo/flowStart'})
    },
    newtask(row) {
      this.visiable3 = true;
      this.id = row.id;
    },
    search() {
      this.getempInductionList();
    },
    remove(row) {
      console.log("发起考核");
    },
    refresh() {
      console.log("refresh");
      this.searchform = {
        pageNum: 1,
        pageSize: 10,
      };
      this.getempInductionList();
    },
    created() {
      this.$router.push({path: '/processDo/flowStart'})
    },
    del() {
      console.log("del");
      for (const i in this.moreaction) {
        const id = this.moreaction[i].id;
        let data = id;
        indicatorSingle
          .delindicatorSingle(data)
          .then((res) => {
            if (res.ret === 200) {
              console.log(res.msg);
              this.$Message["success"]({
                background: true,
                content: res.msg,
              });
            } else {
              console.log(res.msg);
              this.$Message["error"]({
                background: true,
                content: res.msg,
              });
            }
          })
          .then((res) => {
            this.getempInductionList();
          });
      }
    },
    forbid() {
      console.log("forbid");
    },
    open() {
      console.log("open");
    },
  },
};
</script>

<style lang="less" scoped>
.ivu-tree-children {
  cursor: pointer;
  width: 100%;
}
.option-department {
  font-size: 14px;
  padding: 5px;
  cursor: pointer;
}
.option-department:hover {
  background-color: rgba(5, 170, 250, 0.2);
}
.departmentWrap {
  position: absolute;
  background-color: #ffffff;
  padding: 5px;
  border: 1px solid #dedede;
  width: 100%;
  z-index: 9;
  display: none;
  height: 250px;
  overflow-y: scroll;
}
.ivu-form-item {
  margin-bottom: 0;
}
</style>
