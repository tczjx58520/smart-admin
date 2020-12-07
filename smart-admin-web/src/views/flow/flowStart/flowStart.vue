<template>
  <div>
    <Card class="warp-card" dis-hover>
      <Form
        ref="listQuery"
        :model="listQuery"
        inline
        :label-width="65"
        label-position="left"
      >
        <FormItem label="流程名称">
          <Input
            v-model="listQuery.name"
            placeholder="请输入流程名称"
            style="width: 240px"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </FormItem>
        <FormItem>
          <Button type="primary" icon="el-icon-search" @click="handleQuery"
            >搜索</Button
          >
        </FormItem>
      </Form>

      <div v-for="item in processLists" :key="item.id">
        <div v-if="item.flowInfoVos.length !== 0">
          <div class="workflow-classify-title">
            {{ item.categoryName }}
          </div>
          <div style="margin-bottom: 15px;">
            <template v-for="buttonItem in item.flowInfoVos">
              <Tooltip :key="buttonItem.id" theme="dark" placement="top">
                <div slot="content">
                  {{ buttonItem.flowName }}
                  <br />
                  {{ buttonItem.receiptType | typeFilter(that) }}
                </div>
                <Button
                  class="workflow-classify-button"
                  @click="submitWorkOrder(buttonItem)"
                >
                  <div class="process-button-div">
                    <div class="process-div-icon">
                      <Icon class="process-div-el-icon" type="ios-hammer" />
                    </div>
                    <div class="process-div-body">
                      <div class="process-div-title ellipsis">
                        {{ buttonItem.flowName }}
                      </div>
                      <div class="process-div-remarks ellipsis">
                        {{ buttonItem.receiptType | typeFilter(that) }}
                      </div>
                    </div>
                  </div>
                </Button>
              </Tooltip>
            </template>
          </div>
        </div>
      </div>
    </Card>
    <selectModal
      :modalstat="visiable_select"
      :myvalue="myvalue"
      @updateStat="updateStat_select"
    ></selectModal>
    <select-modal-emp
      :modalstat="visiable_contract"
      :myvalue="myvalue"
      @updateStat="updateStat_contract" />
      <select-modal-hademp
      :modalstat="visiable_newcontract"
      :myvalue="myvalue"
      @updateStat="updateStat_newcontract" />
  </div>
</template>

<script>
import { FlowCategoryApi } from "@/api/flowClassification";
import selectModal from "./components/selectModal/selectModal";
import SelectModalEmp from './components/selectModal/selectModal_emp.vue';
import SelectModalHademp from './components/selectModal/selectModal_hademp.vue';
// eslint-disable-next-line no-var
export default {
  name: 'ApplyProcessList',
  components: {
    selectModal,
    SelectModalEmp,
    SelectModalHademp
  },
  data () {
    return {
      processLists: [],
      tempList: [],
      listQuery: {
        empId: this.$store.state.user.userLoginInfo.userId
      },
      visiable_select: false,
      visiable_contract: false,
      visiable_newcontract: false,
      myvalue: null,
      that: this
    };
  },
  filters: {
    // 流程单据
    typeFilter (val, that) {
      const map = {
        1: that.$t('xcsp'),
        2: that.$t('ygrz'),
        3: that.$t('htqs'),
        4: that.$t('ygzz'),
        5: that.$t('ygdg'),
        6: that.$t('yglz'),
        7: that.$t('ygxq'),
        8: that.$t('qj'),
        9: that.$t('jiaban'),
        10: that.$t('chuchai'),
        11: that.$t('waichu'),
        12: that.$t('buka'),
        13: that.$t('xiaojia')
      };
      return map[val];
    }
  },
  created () {
    this.getProcessList();
  },
  methods: {
    getProcessList () {
      FlowCategoryApi.getEmpStart(this.listQuery).then(response => {
        this.processLists = response.data.content;
        this.tempList = response.data.content;
      });
    },
    handleQuery () {
      let temp = this._.cloneDeep(this.tempList);
      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i].flowInfoVos.length; j++) {
          const element = temp[i].flowInfoVos[j];
          let reg = new RegExp(this.listQuery.name.trim());
          if (element.flowName.match(reg)) {
            // 匹配成功do something
          } else {
            temp[i].flowInfoVos.splice(j, 1);
            j--;
          }
        }
        if (temp[i].flowInfoVos.length === 0) {
          temp.splice(i, 1);
          i--;
        }
      }
      this.processLists = temp;
    },
    submitWorkOrder (value) {
      console.log(value);
      switch (value.receiptType) {
        case 1:
          this.selectFrom(value);
          break;
        case 2:
          this.$router.push({
            path: '/processDo/actionflowStart',
            query: {
              receiptType: value.receiptType,
              receiptLabel: value.flowName,
              flowId: value.id,
              flowCategory: value.category
            }
          });
          break;
          case 3:
          this.selectEmp_contract(value)
          break;
          case 7:
          this.selectEmp_newcontract(value)
          break;
        default:
          this.$router.push({
            path: '/processDo/actionflowStart',
            query: {
              receiptType: value.receiptType,
              receiptLabel: value.flowName,
              flowId: value.id,
              flowCategory: value.category
            }
          });
          break;
      }
    },
    selectFrom (value) {
      this.visiable_select = true;
      this.myvalue = value;
    },
    selectEmp_contract(value) {
      this.visiable_contract = true;
      this.myvalue = value;
    },
    selectEmp_newcontract(value) {
      this.visiable_newcontract = true;
      this.myvalue = value;
    },
    updateStat_select(state, value) {
      console.log(value);
      if (value) {
        this.$router.push({
          path: "/processDo/actionflowStart",
          query: {
            receiptType: value.receiptType,
            receiptLabel: value.flowName,
            flowId: value.id,
            flowCategory: value.category
          }
        });
      }
      this.visiable_select = state;
    },
    updateStat_contract(state, value) {
      if (value) {
        this.$router.push({
          path: "/processDo/actionflowStart",
          query: {
            receiptType: value.receiptType,
            receiptLabel: value.flowName,
            flowId: value.id,
            flowCategory: value.category
          }
        });
      }
      this.visiable_contract = state;
    },
    updateStat_newcontract(state, value) {
      if (value) {
        this.$router.push({
          path: "/processDo/actionflowStart",
          query: {
            receiptType: value.receiptType,
            receiptLabel: value.flowName,
            flowId: value.id,
            flowCategory: value.category
          }
        });
      }
      this.visiable_newcontract = state;
    }
  }
};
</script>

<style scoped>
.workflow-classify-title {
  border-left: 3px solid rgb(64, 158, 255);
  padding-left: 5px;
}

.workflow-classify-button {
  height: auto;
  margin-left: 0;
  margin-right: 12px;
  margin-top: 12px;
}

.el-card__body {
  padding-bottom: 0;
}

.process-button-div {
  width: 180px;
  height: 50px;
}

.process-div-icon {
  float: left;
  width: 50px;
  height: 100%;
  margin-right: 10px;
}

.process-div-el-icon {
  font-size: 32px;
  line-height: 50px;
  color: #606266;
}

.process-div-body {
  float: left;
  width: 120px;
  height: 100%;
  text-align: left;
}

.process-div-title {
  font-size: 15px;
  margin-top: 10px;
  color: #606266;
}

.process-div-remarks {
  color: #999999;
  margin-top: 6px;
  font-size: 12px;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
