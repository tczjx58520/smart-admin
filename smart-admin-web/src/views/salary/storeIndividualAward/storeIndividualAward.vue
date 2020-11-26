<template>
  <div style="height:100%">
    <Card class="warp-card" dis-hover style="height:100%;">
      <div style="margin-bottom:15px;">{{ $t("dmgrjgz") }}</div>
      <div>
        <div>
          <div>
            <span style="margin-bottom:15px;">{{ $t("khxm") }}</span>
            <Select
              v-model="selectItems"
              multiple
              style="width:260px"
              label-in-value
              filterable
              @on-change="setAttribute"
            >
              <Option
                v-for="item in assessmentList"
                :value="item.id"
                :key="item.id"
                >{{ item.itemName }}</Option
              >
            </Select>
          </div>
          <Divider />
          <!-- 奖金规则 -->
          <div class="title">
            <div style="flex:1;">{{ $t("jjgz") }}</div>
            <div style="flex:1;text-align:right;">
              <ButtonGroup>
                <Button type="text" @click="addrule()">
                  <Icon type="md-add-circle"></Icon>
                  {{ $t("tj") }}
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <Table :columns="columns_rule" :data="data_rule"></Table>
          <Divider />
          <!-- 计算规则 -->
          <div class="title">
            <div style="flex:1;">{{ $t("jsgz") }}</div>
            <div style="flex:1;text-align:right;">
              <ButtonGroup>
                <Button type="text" @click="addformula()">
                  <Icon type="md-add-circle"></Icon>
                  {{ $t("tj") }}
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <Table :columns="columns_formula" :data="data_formula"></Table>
        </div>
      </div>
      <div class="button-warp">
        <div class="button-group">
          <Button type="primary" @click="handlerSave()">
            保存
          </Button>
          <!-- <Button @click="$router.go(-1)">
            取消
          </Button> -->
        </div>
      </div>
    </Card>
    <ruleModal
      :modalstat="rule_dialog"
      :editinfo="rule_info"
      :isedit="edit_rule_flag"
      @updateStat="updateStat_rule"
    />
    <formulaModal
      :modalstat="formula_dialog"
      :editinfo="formula_info"
      :calItme="ruleList"
      :isedit="edit_formula_flag"
      @updateStat="updateStat_formula"
    />
  </div>
</template>
<script>
import { assessmentCollect } from '@/api/assessmentCollect';
import ruleModal from './components/ruleModal/ruleModal';
import formulaModal from './components/formulaModal/formulaModal';
import { storeIndividualAward } from '@/api/storeIndividualAward';
import { generateUUID } from '@/lib/util';
export default {
  name: 'teamAward',
  components: {
    ruleModal,
    formulaModal
  },
  props: {},
  data () {
    return {
      columns_rule: [
        {
          title: this.$t('rybz'),
          render: (h, params) => {
            return h(
              'span',
              `${params.row.beginQuantity}${this.$t('to')}${params.row.endQuantity}`
            );
          }
        },
        {
          title: this.$t('jjgz'),
          key: 'isMultiplied',
          render: (h, params) => {
            const temp = params.row.personalRankRules.map(item => {
              return item.label;
            });
            const str = temp.join(',');
            return h(
              'span',
              `${str}`
            );
          }
        },
        {
          title: this.$t('usermanage_view.action'),
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-16-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.Edit_rule(params.row);
                    }
                  }
                },
                this.$t('Edit')
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-16-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.delrule(params.index);
                    }
                  }
                },
                this.$t('sc')
              )
            ]);
          }
        }
      ],
      data_rule: [],
      columns_formula: [
        {
          title: this.$t('tjlx'),
          render: (h, params) => {
            if (params.row.conditionType === 1) {
              return h(
                'span',
                this.$t('dmyj')
              );
            } else {
              return h(
                'span',
                this.$t('kysj')
              );
            }
          }
        },
        {
          title: this.$t('tjlr'),
          key: 'isMultiplied',
          render: (h, params) => {
            if (params.row.conditionType === 1) {
              if (params.row.actualFinish === 1) {
                const str = this.$t('xy') + params.row.target + '%';
                return h('span', str);
              } else {
                const str = this.$t('dydy') + params.row.target + '%';
                return h('span', str);
              }
            } else {
              if (params.row.openCondition === 1) {
                const str = this.$t('diyu') + params.row.beginMonth + this.$t('yue');
                return h('span', str);
              } else if (params.row.openCondition === 2) {
                const str = this.$t('dayu') + params.row.beginMonth + this.$t('yue');
                return h('span', str);
              } else {
                return h('span', `${params.row.beginMonth}${this.$t('yue')}-${params.row.endMonth}${this.$t('yue')}`);
              }
            }
          }
        },
        {
          title: this.$t('jsx'),
          render: (h, params) => {
            let str = '';
            if (params.row.conditionType === 1) {
              for (let i = 0; i < params.row.calItem1Array.length; i++) {
                const element = params.row.calItem1Array[i];
                const temp = this.assessmentList.filter(item => {
                  return item.id === Number(element);
                });
                str += temp[0].itemName + '  ';
              }
            } else {
              for (let i = 0; i < params.row.calItem2Array.length; i++) {
                const element = params.row.calItem2Array[i];
                const temp = this.assessmentList.filter(item => {
                  return item.id === Number(element);
                });
                str += temp[0].itemName + '  ';
              }
            }
            return h(
              'span',
              str
            );
          }
        },
        {
          title: this.$t('usermanage_view.action'),
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-16-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.Edit_formula(params.row);
                    }
                  }
                },
                this.$t('Edit')
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-16-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.delformula(params.index);
                    }
                  }
                },
                this.$t('sc')
              )
            ]);
          }
        }
      ],
      data_formula: [],
      assessmentList: [],
      selectItems: [],
      ruleList: [],
      rule_dialog: false,
      formula_dialog: false,
      rule_info: null,
      formula_info: null,
      edit_rule_flag: false,
      edit_formula_flag: false,
      data: [],
      isedit: false,
      id: null
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.getassessmentList();
    this.getList();
  },
  methods: {
    generateUUID,
    getList () {
      storeIndividualAward.getstoreIndividualAward().then(res => {
        if (res.data.content.length > 0) {
          this.isedit = true;
          this.id = res.data.content[0].id;
          this.selectItems = res.data.content[0].itemIds.split(',').map(Number);
          for (let i = 0; i < res.data.content[0].personalRuleItemVos.length; i++) {
            const element = res.data.content[0].personalRuleItemVos[i];
            element.personalRankRules.map(item => {
              item.label = `第${item.level}名奖金${item.money}`;
              item.selected = false;
              item.flagid = this.generateUUID();
            });
          }
          res.data.content[0].personalRewardCals.map(item => {
            if (item.calItem1 && item.conditionType === 1) {
              item.calItem1Array = item.calItem1.split(',').map(Number);
              item.calItem2Array = [];
            }
            if (item.calItem2 && item.conditionType === 2) {
              item.calItem1Array = [];
              item.calItem2Array = item.calItem2.split(',').map(Number);
            }
          });
          this.data_rule = res.data.content[0].personalRuleItemVos;
          this.data_formula = res.data.content[0].personalRewardCals;
        }
      });
    },
    Edit_rule (row) {
      this.edit_rule_flag = true;
      this.rule_info = Object.assign({}, row);
      this.rule_dialog = true;
    },
    Edit_formula (row) {
      this.edit_formula_flag = true;
      this.formula_info = Object.assign({}, row);
      this.formula_dialog = true;
    },
    delrule (index) {
      this.data_rule.splice(index, 1);
    },
    delformula (index) {
      this.data_formula.splice(index, 1);
    },
    updateStat_formula (stat, value) {
      console.log('value========', value);
      this.formula_dialog = stat;
      if (value) {
        if (this.edit_formula_flag) {
          this.data_formula.splice(value._index, 1, value);
        } else {
          this.data_formula.push(value);
        }
      }
    },
    addformula () {
      if (this.selectItems.length === 0) {
        this.$Message.warning(this.$t('qxzkhxm'));
        return false;
      }
      this.formula_dialog = true;
      this.edit_formula_flag = false;
    },
    updateStat_rule (stat, value) {
      this.rule_dialog = stat;
      if (value) {
        if (this.edit_rule_flag) {
          this.data_rule.splice(value._index, 1, value);
        } else {
          this.data_rule.push(value);
        }
      }
    },
    addrule () {
      this.rule_dialog = true;
      this.edit_rule_flag = false;
    },
    getassessmentList () {
      assessmentCollect.getAssessmentCollect().then(res => {
        if (res.ret === 200) {
          this.assessmentList = res.data.content;
        } else {
          console.log('列表出错');
        }
      });
    },
    setAttribute (value) {
      this.ruleList = this._.cloneDeep(value);
      console.log(this.ruleList);
    },
    handlerSave () {
      let temp = {};
      if (this.id) {
        temp = {
          id: this.id,
          itemIds: this.selectItems.join(','),
          createId: this.$store.state.user.userLoginInfo.userId,
          stat: 1
        };
      } else {
        temp = {
          itemIds: this.selectItems.join(','),
          createId: this.$store.state.user.userLoginInfo.userId,
          stat: 1
        };
      }
      console.log(temp);
      for (let i = 0; i < this.data_formula.length; i++) {
        console.log(this.data_formula[i].calItem1Array, this.data_formula[i].calItem2Array);
        const str = this.data_formula[i].calItem1Array.join(',');
        const str2 = this.data_formula[i].calItem2Array.join(',');
        if (str && this.data_formula[i].conditionType === 1) {
          this.data_formula[i].calItem1 = str;
        }
        if (str2 && this.data_formula[i].conditionType === 2) {
          this.data_formula[i].calItem2 = str2;
        }
      }
      const data = JSON.stringify(temp);
      const data2 = JSON.stringify(this.data_formula);
      const data3 = JSON.stringify(this.data_rule);
      if (this.isedit) {
        storeIndividualAward.updatestoreIndividualAward(data, data2, data3).then(res => {
          this.$Message.success('success!');
          this.getList();
          console.log(res);
        });
      } else {
        storeIndividualAward.addstoreIndividualAward(data, data2, data3).then(res => {
          this.$Message.success('success!');
          this.getList();
          console.log(res);
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  display: flex;
}
.button-warp {
  box-sizing: border-box;
  text-align: center;
  height: 75px;
  padding: 0 20px;
  position: fixed;
  bottom: 0;
  right: 0;
  width: ~"calc(100% - 254px)";
  z-index: 9;
  .button-group {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    -webkit-box-shadow: 0 0 4px hsla(0, 0%, 78.4%, 0.4);
    box-shadow: 0 0 4px hsla(0, 0%, 78.4%, 0.4);
    height: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
