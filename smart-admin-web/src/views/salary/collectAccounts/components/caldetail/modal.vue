<template>
        <Modal v-model="mymoadlStat" class="add" width="480" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('usermanage_view.adduser') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;margin-bottom:20px;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('BaseData')}}</div>
                </div>
                <Form ref="form" :model="addformbase" label-position="right" :label-width="100" :rules="ruleValidate">
                    <FormItem :label="$t('collectAccounts_view.calculatedItem')">
                        <!-- <Input v-model="addformbase.salaryOptionId" readonly></Input> -->
                        <Select v-model="addformbase.salaryOptionId" style="width:100%" disabled>
                          <Option v-for="item in OptionsList" :value="item.id" v-bind:key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('collectAccounts_view.participateInCalculations')">
                        <Select v-model="addformbase.partOptions" multiple style="width:100%" @on-select="transmitInformation">
                          <Option v-for="item in OptionsList" :value="item.id" v-bind:key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('collectAccounts_view.decimalPlaces')" prop="pointNum">
                        <Input v-model="addformbase.pointNum"></Input>
                    </FormItem>
                    <FormItem :label="$t('collectAccounts_view.calculationFormula')" prop="formula">
                        <Input type="textarea" v-model="addformbase.formula" readonly></Input>
                    </FormItem>
                </Form>
                <formulaPage :calcList = "joincalc" :modalstat="modalstat" @transmissionFormula = "myFormula"></formulaPage>
            </Card>

        </div>
        <div slot="footer">
            <ButtonGroup>
                <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button>
                <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
            </ButtonGroup>
        </div>
    </Modal>
</template>
<script>
import $ from 'jquery';
import {
  salaryOptionApi
} from '@/api/salaryOption';
import { collectAccountsApi } from '@/api/collectAccounts';
import formulaPage from '../calculator/calculator';
export default {
  name: 'caldetail',
  components: {
    formulaPage
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null,
    optionList: null
  },
  created () {
    console.log('moadlStat=======>', this.modalstat);
  },
  mounted () {
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (this.addformbase.pointNum === '' && this.addformbase.pointNum === null && this.addformbase.pointNum === undefined) {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    return {
      columns1: [
        { type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '类型',
          render: (h, params) => {
            console.log(params);
            let typeList = [
              { value: 1, label: this.$t('salaryOption_view.System') },
              { value: 2, label: this.$t('salaryOption_view.Input') },
              { value: 3, label: this.$t('salaryOption_view.Report') },
              { value: 4, label: this.$t('salaryOption_view.Calculation') }
            ];
            console.log(typeList.filter(item => item.value === params.row.type));
            return h('span', typeList.filter(item => item.value === params.row.type)[0].label);
          }
        },
        {
          title: this.$t('usermanage_view.action'),
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            if (params.row.type === 4) {
              return h('div', [
                h('Button', {
                  style: {
                    marginRight: '10px'
                  },
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.Calc(params.row);
                    }
                  }
                }, this.$t('collectAccounts_view.editFormula')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.Calc(params.row);
                    }
                  }
                }, this.$t('collectAccounts_view.validationFormula'))
              ]);
            } else {
              return h('span', '');
            }
          }
        }
      ],
      data1: [],
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {
      },
      ruleValidate: {
        pointNum: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        formula: [
          { required: true, message: 'The formula cannot be empty', trigger: 'blur' }
        ]
      },
      // 新建员工弹窗
      visiable_emp: false,
      OptionsList: [],
      joincalc: []
    };
  },
  watch: {
    async modalstat () {
      this.mymoadlStat = this.modalstat;
      this.addformbase = this.editinfo;
      console.log('this.addformbase===========>', this.addformbase, this.optionList);
      this.OptionsList = this.optionList;
      this.addformbase.salaryOptionId = this.addformbase.id;
      this.joincalc = [];
      if (this.addformbase.calculationFormulaVo) {
        let data = {};
        data.salaryOptionId = this.addformbase.id;
        let result = null;
        await collectAccountsApi.getcalculationFormula(data).then(res => {
          result = res.data.content.list;
        });
        console.log('result==========', result);
        this.addformbase.pointNum = result[0].pointNum;
        this.addformbase.partOptions = result[0].partOptions.split(',').map(Number);
        this.addformbase.formula = result[0].formula;
        console.log(this.addformbase.partOptions);
        this.addformbase.formulaId = result[0].id;
        this.joincalc = result[0].salaryOptions.map(item => {
          return {
            label: item.name,
            value: item.id
          };
        });
      }
      // this.data1 = this.addformbase.salaryOptions;
    }
  },
  methods: {
    myFormula (state) {
      console.log('mystate==================?', state);
      this.$set(this.addformbase, 'formula', state);
      console.log(this.addformbase);
    },
    transmitInformation (selection) {
      console.log('selection===========>', selection);
      let findIndex = this.joincalc.findIndex(val => val.value === selection.value);
      console.log('findIndex================>', findIndex);
      if (findIndex !== -1) {
        this.joincalc.splice(findIndex, 1);
      } else {
        this.joincalc.push(selection);
      }
      console.log('this.joincalc==========>', this.joincalc);
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    reset () {
      this.addformbase = {
      };
      this.$refs['form'].resetFields();
    },
    handsave () {
      console.log(this.addformbase);
      this.addformbase.createId = this.$store.state.user.userId;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.addformbase.formulaId) {
            this.addformbase.operatId = this.$store.state.user.userId;
            collectAccountsApi.updatecalculationFormula(this.addformbase).then(res => {
              if (res.ret === 200) {
                this.$emit('updateStat', false);
                this.$Message.success(res.msg);
              }
            });
          } else {
            collectAccountsApi.addcalculationFormula(this.addformbase).then(res => {
              if (res.ret === 200) {
                this.$emit('updateStat', false);
                this.$Message.success(res.msg);
              }
            });
          }
        } else {
          this.$Message.error('Fail!');
        }
      });
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
</style>
