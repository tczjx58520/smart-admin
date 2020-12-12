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
      <span>修改流程</span>
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
            <Input v-model="addformbase.flowName"></Input>
          </FormItem>
          <FormItem :label="$t('processDesign_view.category')" prop="category">
            <Select v-model="addformbase.category" style="width: 100%">
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
            <Select v-model="addformbase.receiptType" style="width: 100%">
              <Option
                v-for="item in businessList"
                :value="item.id"
                :key="item.id"
                >{{ item.businessName }}</Option
              >
            </Select>
          </FormItem>
          <FormItem :label="$t('processDesign_view.processType')">
            <RadioGroup v-model="addformbase.type">
              <Radio :label="1">
                {{ $t("processDesign_view.fixedProcess") }}
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="$t('zhstz')">
            <RadioGroup v-model="addformbase.recallNotice">
              <Radio :label="1">
                {{ $t("bzzbr") }}
              </Radio>
              <Radio :label="2">
                {{ $t("fqrjdqzbr") }}
              </Radio>
              <Radio :label="3">
                {{ $t("syzbr") }}
              </Radio>
              <Radio :label="4">
                {{ $t("btz") }}
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="$t('cxstz')">
            <RadioGroup v-model="addformbase.cancelNotice">
              <Radio :label="1">
                {{ $t("bzzbr") }}
              </Radio>
              <Radio :label="2">
                {{ $t("fqrjdqzbr") }}
              </Radio>
              <Radio :label="3">
                {{ $t("syzbr") }}
              </Radio>
              <Radio :label="4">
                {{ $t("btz") }}
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="$t('thstz')">
            <RadioGroup v-model="addformbase.returnNotice">
              <Radio :label="1">
                {{ $t("bzzbr") }}
              </Radio>
              <Radio :label="2">
                {{ $t("fqrjdqzbr") }}
              </Radio>
              <Radio :label="3">
                {{ $t("syzbr") }}
              </Radio>
              <Radio :label="4">
                {{ $t("btz") }}
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="$t('jjstz')">
            <RadioGroup v-model="addformbase.refuseNotice">
              <Radio :label="1">
                {{ $t("bzzbr") }}
              </Radio>
              <Radio :label="2">
                {{ $t("fqrjdqzbr") }}
              </Radio>
              <Radio :label="3">
                {{ $t("syzbr") }}
              </Radio>
              <Radio :label="4">
                {{ $t("btz") }}
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="$t('zzstz')">
            <RadioGroup v-model="addformbase.breakNotice">
              <Radio :label="1">
                {{ $t("bzzbr") }}
              </Radio>
              <Radio :label="2">
                {{ $t("fqrjdqzbr") }}
              </Radio>
              <Radio :label="3">
                {{ $t("syzbr") }}
              </Radio>
              <Radio :label="4">
                {{ $t("btz") }}
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="$t('jsstz')">
            <RadioGroup v-model="addformbase.endNotice">
              <Radio :label="1">
                {{ $t("bzzbr") }}
              </Radio>
              <Radio :label="2">
                {{ $t("fqrjdqzbr") }}
              </Radio>
              <Radio :label="3">
                {{ $t("syzbr") }}
              </Radio>
              <Radio :label="4">
                {{ $t("btz") }}
              </Radio>
            </RadioGroup>
          </FormItem>
          <!-- 搁置 -->
          <FormItem :label="$t('file')">
            <Checkbox v-model="addformbase.type2"></Checkbox>
          </FormItem>
        </Form>
        <div style="margin: 20px 0" v-if="addformbase.type === 1">
          <Button
            style="margin-right: 15px"
            @click="additem"
            icon="md-add"
            type="info"
            >{{ $t("Create") }}</Button
          >
        </div>
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
    <editStepDialog
      :modalstat="visiable"
      :receiptType="addformbase.receiptType"
      :editinfo="rowinfo"
      :stepinfo="mystepdata"
      :stepName="stepName"
      @updateStat="updateStat_step"
    ></editStepDialog>
  </Modal>
  <!-- 设置步骤弹窗======================= -->
</template>
<script>
import Tables from '@/components/tables';
import editStepDialog from '../edit-step-dialog/edit-step-dialog';
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
    editStepDialog
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null,
    IsCopy: {
      type: Boolean,
      default: false
    }
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
                name += value.label;
              }
              return name;
            }).join(',');
            return h('div', [
              h('span', name)
            ]);
          }
          // width: 100
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
                  title: '步骤设置',
                  action: () => {
                    if (this.addformbase.receiptType) {
                      this.visiable = true;
                      this.rowinfo = params.row;
                      const temp = this.stepdata.slice(0);
                      this.mystepdata = temp.slice(params.row._index + 1);
                      console.log(this.mystepdata);
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
                  title: '步骤设置',
                  action: () => {
                    if (this.addformbase.receiptType) {
                      this.visiable = true;
                      this.rowinfo = params.row;
                      const temp = this.stepdata.slice(0);
                      this.stepName = params.row.actionName;
                      this.mystepdata = temp.slice(params.row._index + 1);
                    } else {
                      this.$Message.warning(this.$t('qxzdjlx'));
                    }
                  }
                },
                {
                  title: '删除',
                  action: () => {
                    this.$Modal.confirm({
                      title: '友情提醒',
                      content: '确定要删除吗？',
                      onOk: () => {
                        this.stepdata.splice(params.index, 1);
                      }
                    });
                  }
                }
              ]);
            }
          }
        }
      ],
      stepdata: [],
      mystepdata: [],
      rowinfo: null,
      // 传递姓名
      stepName: ''
    };
  },
  watch: {
    async modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.modalstat) {
        this.getbaseclassification();
        this.addformbase = this.editinfo;
        FlowApi.getFlowDetail(this.addformbase.id).then(res => {
          this.stepdata = res.data.content.flowActionVos;
          this.stepdata.map(item => { item.myid = this.generateUUID(); });
          for (let i = 0; i < this.stepdata.length; i++) {
            const element = this.stepdata[i];
            for (let j = 0; j < element.stepNextConditionVos.length; j++) {
              const elementj = element.stepNextConditionVos[j];
              elementj.myid = this.stepdata[elementj.nextSerialNumber].myid;
              elementj.nextSerialId = this.stepdata[elementj.nextSerialNumber].myid;
              elementj.actionName = this.stepdata[elementj.nextSerialNumber].actionName;
            }
            element.roleruleList = JSON.parse(element.roleruleList);
          }
        });
      }
    }
  },
  methods: {
    generateUUID,
    updateStat_step (stat, val1, val2, val3) {
      console.log(val1, val2, val3);
      this.visiable = stat;
      if (val1 && val2 && val3) {
        for (const value of val2) {
          value.actionSerialId = this.rowinfo.myid;
          value.nextSerialId = value.myid;
        }
        for (const value of val3) {
          value.actionSerialId = this.rowinfo.myid;
          value.fieldName = value.value;
        }
        Object.assign(this.stepdata[this.rowinfo._index], val1);
        this.stepdata[this.rowinfo._index].stepNextConditions = this._.cloneDeep(val2);
        for (let i = 0; i < this.stepdata[this.rowinfo._index].stepNextConditions.length; i++) {
          // 装全部计算公式容器
          let temp = '';
          const element = this.stepdata[this.rowinfo._index].stepNextConditions[i];
          for (let j = 0; j < element.myformlua.length; j++) {
            const item = element.myformlua[j];
            let flag = '';
            if (item.label === '(') {
              flag = '(';
            } else if (item.label === ')') {
              flag = ')';
            } else {
              if (item.calcCadition3) {
                switch (item.calcCadition3) {
                  case 1:
                    flag += '&&';
                    break;
                  case 2:
                    flag += '||';
                    break;
                  case 3:
                    flag += '!';
                    break;
                }
              }
              flag = flag + `value${j}`;
              switch (item.calcCadition2) {
                case 1:
                  flag += `<${item.calcCadition4}`;
                  break;
                case 2:
                  flag += `>${item.calcCadition4}`;
                  break;
                case 3:
                  flag += `.equals(\"${item.calcCadition4}\")`;
                  break;
                case 4:
                  flag += `<=${item.calcCadition4}`;
                  break;
                case 5:
                  flag += `>=${item.calcCadition4}`;
                  break;
                case 6:
                  flag += `!=${item.calcCadition4}`;
                  break;
              }
            }
            // 装每条计算公式
            temp += flag;
            element.formula = temp;
            element.contentId = element.myformlua.map(item => { return item.calcCadition1; }).join(',');
          }
        }
        this.stepdata[this.rowinfo._index].flowContents = val3.slice(0);
        this.stepdata[this.rowinfo._index].attachmentPermission = this.stepdata[this.rowinfo._index].attachmentPermission.join(',');
        this.stepdata[this.rowinfo._index].countersignAttachmentPermission = this.stepdata[this.rowinfo._index].countersignAttachmentPermission.join(',');
        this.stepdata[this.rowinfo._index].allowAction = this.stepdata[this.rowinfo._index].allowAction.join(',');
      }
    },
    // 添加步骤
    additem () {
      this.$Modal.confirm({
        title: '输入步骤名称',
        render: (h) => {
          return h('Input', {
            props: {
              value: this.value,
              placeholder: 'Please enter your stepName'
            },
            on: {
              input: (val) => {
                this.value = val;
              }
            }
          });
        },
        onOk: () => {
          const length = this.stepdata.length - 1;
          let obj = { actionName: this.value, myid: this.generateUUID() };
          this.stepdata.splice(length, 0, obj);
          this.value = '';
        },
        onCancel: () => {
          this.$Message.warning('cancel');
        }
      });
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
      if (this.IsCopy) {
        for (let i = 0; i < this.stepdata.length; i++) {
          let item = this.stepdata[i];
          item.roleruleList = JSON.stringify(item.roleruleList);
          item.serialNumber = i;
          console.log(this.stepdata.length, i, this.stepdata[i]);
          if (i === this.stepdata.length - 1) {
            break;
          }
          if (!item.isEdit) {
            item.stepNextConditions = item.stepNextConditionVos;
            item.flowContents = item.flowContentVos;
          }
          for (let j = 0; j < item.stepNextConditions.length; j++) {
            let element = item.stepNextConditions[j];
            // element.actionSerialNumber = this._.findIndex(this.stepdata, (item) => { return item.myid === element.actionSerialId; });
            element.actionSerialNumber = i;
            element.nextSerialNumber = this._.findIndex(this.stepdata, (item) => { return item.myid === element.nextSerialId; });
            if (typeof (element.myformlua) !== 'string') {
              element.myformlua = JSON.stringify(element.myformlua);
            }
            console.log(element.myformlua);
          }
          for (let j = 0; j < item.flowContents.length; j++) {
            let element = item.flowContents[j];
            element.actionSerialNumber = i;
          }
        }
        console.log(this.stepdata);
        this.addformbase.createId = this.$store.state.user.userLoginInfo.userId;
        for (const key in this.addformbase) {
          if (key === 'id') {
            delete this.addformbase[key];
          }
        }
        const data = JSON.stringify(this.addformbase);
        const data2 = JSON.stringify(this.stepdata);
        const result = await FlowApi.addFlow(data, data2);
        console.log('复制流程', result);
        if (result.ret === 100) {
          this.$Message.error(result.msg)
        }
      } else {
        for (let i = 0; i < this.stepdata.length; i++) {
          let item = this.stepdata[i];
          item.roleruleList = JSON.stringify(item.roleruleList);
          item.serialNumber = i;
          console.log(this.stepdata.length, i, this.stepdata[i]);
          if (i === this.stepdata.length - 1) {
            break;
          }
          if (!item.isEdit) {
            item.stepNextConditions = item.stepNextConditionVos;
            item.flowContents = item.flowContentVos;
          }
          for (let j = 0; j < item.stepNextConditions.length; j++) {
            let element = item.stepNextConditions[j];
            // element.actionSerialNumber = this._.findIndex(this.stepdata, (item) => { return item.myid === element.actionSerialId; });
            element.actionSerialNumber = i;
            element.nextSerialNumber = this._.findIndex(this.stepdata, (item) => { return item.myid === element.nextSerialId; });
            if (typeof (element.myformlua) !== 'string') {
              element.myformlua = JSON.stringify(element.myformlua);
            }
            console.log(element.myformlua);
          }
          for (let j = 0; j < item.flowContents.length; j++) {
            let element = item.flowContents[j];
            element.actionSerialNumber = i;
          }
        }
        console.log(this.stepdata);
        const data = JSON.stringify(this.addformbase);
        const data2 = JSON.stringify(this.stepdata);
        const data3 = this.$store.state.user.userLoginInfo.userId;
        const result = await FlowApi.updateFlow(data, data2, data3);
        console.log(result);
      }
      // 把输入的值插入json
      this.modal_loading = false;
      this.$emit('updateStat', false);
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
