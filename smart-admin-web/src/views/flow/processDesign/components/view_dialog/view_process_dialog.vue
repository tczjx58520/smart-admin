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
      <span>查看流程</span>
    </div>
    <div>
      <Card dis-hover>
        <Form
          ref="form"
          :model="addformbase"
          label-position="right"
          :label-width="120"
          :rules="ruleValidate"
        >
          <FormItem
            :label="$t('processDesign_view.newProcess')"
            prop="flowName"
          >
            <Input v-model="addformbase.flowName" readonly></Input>
          </FormItem>
          <FormItem :label="$t('processDesign_view.category')" prop="category">
            <Select v-model="addformbase.category" style="width: 100%" disabled>
              <Option
                v-for="item in categoryList"
                :value="item.id"
                :key="item.id"
                >{{ item.categoryName }}</Option
              >
            </Select>
          </FormItem>
          <FormItem
            :label="$t('processDesign_view.businessDocuments')"
            prop="receiptType"
          >
            <Select v-model="addformbase.receiptType" style="width: 100%" disabled>
              <Option
                v-for="item in businessList"
                :value="item.id"
                :key="item.id"
                >{{ item.businessName }}</Option
              >
            </Select>
          </FormItem>
          <FormItem :label="$t('processDesign_view.processType')">
            <RadioGroup v-model="addformbase.type" disabled>
              <Radio :label="1">
                {{ $t("processDesign_view.fixedProcess") }}
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="$t('zhstz')">
            <RadioGroup v-model="addformbase.recallNotice" >
              <Radio :label="1" disabled>
                {{ $t("bzzbr") }}
              </Radio>
              <Radio :label="2" disabled>
                {{ $t("fqrjdqzbr") }}
              </Radio>
              <Radio :label="3" disabled>
                {{ $t("syzbr") }}
              </Radio>
              <Radio :label="4" disabled>
                {{ $t("btz") }}
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="$t('cxstz')">
            <RadioGroup v-model="addformbase.cancelNotice" >
              <Radio :label="1" disabled>
                {{ $t("bzzbr") }}
              </Radio>
              <Radio :label="2" disabled>
                {{ $t("fqrjdqzbr") }}
              </Radio>
              <Radio :label="3" disabled>
                {{ $t("syzbr") }}
              </Radio>
              <Radio :label="4" disabled>
                {{ $t("btz") }}
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="$t('thstz')">
            <RadioGroup v-model="addformbase.returnNotice" >
              <Radio :label="1" disabled>
                {{ $t("bzzbr") }}
              </Radio>
              <Radio :label="2" disabled>
                {{ $t("fqrjdqzbr") }}
              </Radio>
              <Radio :label="3" disabled>
                {{ $t("syzbr") }}
              </Radio>
              <Radio :label="4" disabled>
                {{ $t("btz") }}
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="$t('jjstz')">
            <RadioGroup v-model="addformbase.refuseNotice" >
              <Radio :label="1" disabled>
                {{ $t("bzzbr") }}
              </Radio>
              <Radio :label="2" disabled>
                {{ $t("fqrjdqzbr") }}
              </Radio>
              <Radio :label="3" disabled>
                {{ $t("syzbr") }}
              </Radio>
              <Radio :label="4" disabled>
                {{ $t("btz") }}
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="$t('zzstz')">
            <RadioGroup v-model="addformbase.breakNotice" >
              <Radio :label="1" disabled>
                {{ $t("bzzbr") }}
              </Radio>
              <Radio :label="2" disabled>
                {{ $t("fqrjdqzbr") }}
              </Radio>
              <Radio :label="3" disabled>
                {{ $t("syzbr") }}
              </Radio>
              <Radio :label="4" disabled>
                {{ $t("btz") }}
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="$t('jsstz')">
            <RadioGroup v-model="addformbase.endNotice" >
              <Radio :label="1" disabled>
                {{ $t("bzzbr") }}
              </Radio>
              <Radio :label="2" disabled>
                {{ $t("fqrjdqzbr") }}
              </Radio>
              <Radio :label="3" disabled>
                {{ $t("syzbr") }}
              </Radio>
              <Radio :label="4" disabled>
                {{ $t("btz") }}
              </Radio>
            </RadioGroup>
          </FormItem>
          <!-- 搁置 -->
          <FormItem :label="$t('file')">
            <Checkbox v-model="addformbase.type2"></Checkbox>
          </FormItem>
        </Form>
        <!-- 步骤表格start===================================== -->
        <Table
          border
          :columns="stepcolumns"
          :data="stepdata"
          v-if="addformbase.type === 1"
        ></Table>
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
    <viewStepDialog
      :modalstat="visiable"
      :receiptType="addformbase.receiptType"
      :editinfo="rowinfo"
      :stepinfo="mystepdata"
      @updateStat="updateStat_step"
    ></viewStepDialog>
  </Modal>
  <!-- 设置步骤弹窗======================= -->
</template>
<script>
import Tables from '@/components/tables';
import viewStepDialog from '../view-step-dialog/view-step-dialog';
import { FlowCategoryApi } from '@/api/flowClassification';
import { FlowApi } from '@/api/flow';
import { generateUUID } from '@/lib/util';
const defaultEvent = {
  flowName: '',
  category: null,
  receiptType: null,
  type: 1,
  recallNotice: 1,
  cancelNotice: 1,
  returnNotice: 1,
  refuseNotice: 1,
  breakNotice: 1,
  endNotice: 1
};
export default {
  name: 'addGong',
  components: {
    Tables,
    viewStepDialog
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null
  },
  created () {},
  mounted () {},
  data () {
    return {
      visiable: false,
      table_loading: true,
      addformbase: Object.assign({}, defaultEvent),
      modal_loading: false,
      mymoadlStat: this.modalstat,
      ruleValidate: {
        flowName: [
          {
            required: true,
            message: 'The flowName cannot be empty',
            trigger: 'blur'
          }
        ],
        category: [
          {
            required: true,
            message: 'The category cannot be empty',
            trigger: 'blur'
          }
        ],
        receiptType: [
          {
            required: true,
            message: 'The receiptType cannot be empty',
            trigger: 'blur'
          }
        ]
      },
      searchForm: {
        pageNum: 1,
        pageSize: 999
      },
      categoryList: [],
      businessList: [
        {
          id: 1,
          businessName: this.$t('xcsp')
        },
        {
          id: 2,
          businessName: this.$t('ygrz')
        },
        {
          id: 3,
          businessName: this.$t('htqs')
        },
        {
          id: 4,
          businessName: this.$t('ygzz')
        },
        {
          id: 5,
          businessName: this.$t('ygdg')
        },
        {
          id: 6,
          businessName: this.$t('yglz')
        },
        {
          id: 7,
          businessName: this.$t('ygxq')
        },
        {
          id: 8,
          businessName: this.$t('qj')
        },
        {
          id: 9,
          businessName: this.$t('jiaban')
        },
        {
          id: 10,
          businessName: this.$t('chuchai')
        },
        {
          id: 11,
          businessName: this.$t('waichu')
        },
        {
          id: 12,
          businessName: this.$t('buka')
        },
        {
          id: 13,
          businessName: this.$t('xiaojia')
        }
      ],
      stepcolumns: [
        {
          title: this.$t('processDesign_view.serialNumber'),
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('processDesign_view.stepName'),
          key: 'actionName'
          // width: 100
        },
        {
          title: this.$t('processDesign_view.condition'),
          key: 'condition',
          render: (h, params) => {
            const name = params.row.stepNextConditionVos && params.row.stepNextConditionVos.map(item => {
              if (typeof (item.myformlua) === 'string') {
                item.myformlua = JSON.parse(item.myformlua);
              }
              let name = '';
              for (const value of item.myformlua) {
                console.log('value==========', value);
                name += value.label;
              }
              return name;
            }).join(',');
            return h('div', [
              h('span', name)
            ]);
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          className: 'action-hide',
          render: (h, params) => {
            if (params.row._index === 0) {
              return this.$tableAction(h, [
                {
                  title: '步骤查看',
                  action: () => {
                    if (this.addformbase.receiptType) {
                      this.visiable = true;
                      this.rowinfo = params.row;
                      const temp = this.stepdata.slice(0);
                      this.mystepdata = temp.slice(params.row._index + 1);
                    } else {
                      this.$Message.warning(this.$t('qxzdjlx'));
                    }
                  }
                }
              ]);
            } else if (params.row._index === this.stepdata.length - 1) {
              return null;
            } else {
              return this.$tableAction(h, [
                {
                  title: '步骤查看',
                  action: () => {
                    if (this.addformbase.receiptType) {
                      this.visiable = true;
                      this.rowinfo = params.row;
                      const temp = this.stepdata.slice(0);
                      this.mystepdata = temp.slice(params.row._index + 1);
                    } else {
                      this.$Message.warning(this.$t('qxzdjlx'));
                    }
                  }
                }
              ]);
            }
          }
        }
      ],
      stepdata: [
        {
          actionName: this.$t('processDesign_view.start'),
          myid: this.generateUUID()
        },
        {
          actionName: this.$t('processDesign_view.finish'),
          myid: this.generateUUID()
        }
      ],
      mystepdata: [],
      rowinfo: null
    };
  },
  watch: {
    async modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.modalstat) {
        this.getbaseclassification();
        this.addformbase = this.editinfo;
        FlowApi.getFlowDetail(this.addformbase.id).then(res => {
          console.log('res======', res.data.content);
          this.stepdata = res.data.content.flowActionVos;
          for (let i = 0; i < this.stepdata.length; i++) {
            const element = this.stepdata[i];
            element.roleruleList = JSON.parse(element.roleruleList);
          }
        });
      }
    }
  },
  methods: {
    generateUUID,
    updateStat_step (stat) {
      console.log('stat====', stat);
      this.visiable = stat;
    },
    // 获取基础信息
    async getbaseclassification () {
      await FlowCategoryApi.getGroup(this.searchForm).then((res) => {
        this.categoryList = res.data.content.list;
      });
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    async handsave () {
      this.modal_loading = true;
      for (let i = 0; i < this.stepdata.length; i++) {
        let item = this.stepdata[i];
        item.roleruleList = JSON.stringify(item.roleruleList);
        item.serialNumber = i;
        console.log(this.stepdata.length, i, this.stepdata[i]);
        if (i === this.stepdata.length - 1) {
          break;
        }
        for (let j = 0; j < item.stepNextConditions.length; j++) {
          let element = item.stepNextConditions[j];
          element.actionSerialNumber = this._.findIndex(this.stepdata, (item) => { return item.myid === element.actionSerialId; });
          element.nextSerialNumber = this._.findIndex(this.stepdata, (item) => { return item.myid === element.nextSerialId; });
          element.myformlua = JSON.stringify(element.myformlua);
        }
        for (let j = 0; j < item.flowContents.length; j++) {
          let element = item.flowContents[j];
          element.actionSerialNumber = i;
        }
      }
      console.log(this.stepdata);
      const data = JSON.stringify(this.addformbase);
      this.addformbase.createId = this.$store.state.user.userLoginInfo.userId;
      const data2 = JSON.stringify(this.stepdata);
      await FlowApi.addFlow(data, data2);
      // 把输入的值插入json
      this.modal_loading = false;
      // this.$emit('updateStat', false);
    }
  }
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
