<template>
  <div>
    <Modal
      v-model="mymoadlStat"
      class="add"
      width="1024"
      :closable="false"
      :mask-closable="false"
      :transfer="false"
      fullscreen
    >
      <div slot="header" style="text-align: left; color: #fff">
        <span>添加指标集</span>
      </div>
      <div>
        <Card dis-hover>
          <div
            style="
              display: flex;
              align-items: center;
              border-bottom: 1px solid #e1e1e1;
              padding-bottom: 20px;
            "
          >
            <div
              style="
                width: 4px;
                height: 20px;
                background: #2d8cf0;
                margin-right: 15px;
              "
            ></div>
            <div>{{ $t("BaseData") }}</div>
          </div>
          <Divider />
          <Form
            ref="form"
            :model="addformbase"
            label-position="right"
            :label-width="150"
            :rules="ruleValidate"
          >
            <FormItem
              :label="$t('indicatorSet_view.metricSetName')"
              prop="name"
            >
              <Input v-model="addformbase.name"></Input>
            </FormItem>
            <FormItem
              :label="$t('indicatorSet_view.metricSetName')"
              prop="name"
            >
              <Select
                v-model="addformbase.postId"
                size="large"
                filterable
                :transfer="true"
                @on-change="selectPost()"
              >
                <Option
                  v-for="item in postData"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.postName }}</Option
                >
              </Select>
            </FormItem>
            <FormItem
              :label="$t('indicatorSet_view.metricSetName')"
              prop="name"
            >
              <Select
                v-model="addformbase.levelId"
                size="large"
                filterable
                :transfer="true"
              >
                <Option
                  v-for="item in levelList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.levelName }}</Option
                >
              </Select>
            </FormItem>
          </Form>
          <div
            style="
              display: flex;
              align-items: center;
              border-bottom: 1px solid #e1e1e1;
              padding-bottom: 20px;
            "
          >
            <div
              style="
                width: 4px;
                height: 20px;
                background: #2d8cf0;
                margin-right: 15px;
              "
            ></div>
            <div>{{ $t("indicatorSet_view.assessmentIndexItems") }}</div>
          </div>
          <div style="margin: 20px 0">
            <Button
              style="margin-right: 15px"
              @click="additem"
              icon="md-add"
              type="info"
              >{{ $t("Create") }}</Button
            >
          </div>
          <Tables
            border
            ref="selection"
            :maxheight="300"
            :columns="mycolumns"
            :value="mydataList"
            editable
          ></Tables>
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
    <addIndicatorSingleModal
      :modalstat="indicator_dialog"
      :editinfo="indicator_info"
      :isedit="edit_indicator_flag"
      @updateStat="updateStat_indicator"
    />
  </div>
</template>
<script>
import { indicatorSetApi } from "@/api/indicatorSet";
import { SalesRoomlevel } from "@/api/salesroomLevel";
import addIndicatorSingleModal from "../add-indicatorSingle-modal/add-indicatorSingle-modal";
import Tables from "@/components/tables";
import RoleTree from "../role-tree/role-tree";
import DepartmentEmployeeTree from "../department-employee-tree/department-employee-tree";
import { personnelAnalysis } from "@/api/personnelAnalysis";
import { positionApi } from "@/api/position";
const defaultForm = {
  name: "",
  levelId: null,
  postId: null,
};
export default {
  name: "addModal",
  components: {
    DepartmentEmployeeTree,
    Tables,
    addIndicatorSingleModal,
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false,
    },
    copyfile: null,
  },
  created() {
    //
  },
  data() {
    const validatePass1 = (rule, value, callback) => {
      if (
        this.addformbase.collectType === "" ||
        this.addformbase.collectType === null ||
        this.addformbase.collectType === undefined
      ) {
        callback(new Error("Please enter your emp"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (
        this.addformbase.repositoryLevelId === "" ||
        this.addformbase.repositoryLevelId === null ||
        this.addformbase.repositoryLevelId === undefined
      ) {
        callback(new Error("Please enter your emp"));
      } else {
        callback();
      }
    };
    return {
      postData: [],
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {},
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "The content cannot be empty",
            trigger: "blur",
          },
        ],
        collectType: [
          { required: true, validator: validatePass1, trigger: "blur" },
        ],
        repositoryLevelId: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
      mycolumns: [
        {
          type: "index",
          width: 50,
          align: "center",
        },
        {
          title: this.$t("khxm"),
          key: "nameId",
          render: (h, params) => {
            const temp = this.indicatorlist.filter((item) => {
              return item.id === params.row.nameId;
            });
            const str = temp[0].itemName;
            return h("span", str);
          },
        },
        {
          title: this.$t("mbz"),
          key: "target",
          // width: 100
        },
        {
          title: this.$t("khbz"),
          key: "scoreDesc",
          // width: 100
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
          className: "action-hide",
          render: (h, params) => {
            return this.$tableAction(h, [
              {
                title: "修改",
                action: () => {
                  this.edit_indicator_flag = true;
                  this.indicator_info = params.row;
                  this.indicator_dialog = true;
                },
              },
              {
                title: "删除",
                action: () => {
                  this.$Modal.confirm({
                    title: "友情提醒",
                    content: "确定要删除吗？",
                    onOk: () => {
                      console.log("删除");
                      this.mydataList.splice(params.index, 1);
                    },
                  });
                },
              },
            ]);
          },
        },
      ],
      mydataList: [],
      levelList: [],
      indicator_dialog: false,
      indicator_info: null,
      edit_indicator_flag: false,
    };
  },
  watch: {
    modalstat() {
      this.mymoadlStat = this.modalstat;
      //
      if (this.mymoadlStat) {
        this.getindicatorlist();
        this.getlist()
      }
    },
  },
  methods: {
    selectPost() {
      this.$set(this.addformbase,'levelId',null)
      const data = this.postData.filter((item) => {
        return item.id === this.addformbase.postId;
      });
      this.levelList = data[0].levelVos;
    },
    getlist() {
      const searchFrom = {
        pageNum: 1,
        pageSize: 9999,
      };
      positionApi.postList(searchFrom).then((res) => {
        if (res.ret === 200) {
          this.postData = res.data.content.list;
          const data = this.postData.filter((item) => {
            return item.id === this.addformbase['postId'];
          });
          // this.levelList = data[0].levelVos;
        } else {
          console.log("列表出错");
        }
      });
    },
    getindicatorlist() {
      this.loading = true;
      personnelAnalysis.getpostTaskSingleSet().then((res) => {
        this.loading = false;
        this.indicatorlist = res.data.content;
      });
    },
    updateStat_indicator(stat, value) {
      this.indicator_dialog = stat;
      if (value && this.edit_indicator_flag) {
        this.mydataList.splice(value._index, 1, value);
      } else if (value) {
        this.mydataList.push(value);
      }
    },
    additem() {
      this.indicator_dialog = true;
      this.edit_indicator_flag = false;
    },
    cancel() {
      this.addformbase = Object.assign({}, defaultForm);
      this.mydataList = [];
      this.$emit("updateStat", false);
    },
    handsave() {
      this.modal_loading = true;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.addformbase.createId = this.$store.state.user.userLoginInfo.userId;
          this.addformbase.itemJson = JSON.stringify(this.mydataList);
          console.log(this.addformbase);
          indicatorSetApi.addindicator(this.addformbase).then((res) => {
            this.$Message.success(this.$t("addSuccess"));
            this.modal_loading = false;
            this.addformbase = Object.assign({}, defaultForm);
            this.mydataList = [];
            this.$emit("updateStat", false);
          });
        } else {
          this.$Message.error("Fail!");
          this.modal_loading = false;
        }
      });
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
</style>
