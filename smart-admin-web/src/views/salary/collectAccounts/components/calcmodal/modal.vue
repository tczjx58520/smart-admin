<template>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('usermanage_view.adduser') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('BaseData')}}</div>
                </div>
                <Table :columns="columns1" :data="data1"></Table>
            </Card>

        </div>
        <div slot="footer">
            <ButtonGroup>
                <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button>
                <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
            </ButtonGroup>
        </div>
        <!-- 输入公式 -->
        <caldetail :modalstat = "Calcvisiable" :editinfo="calcinfo" :optionList="data1" @updateStat = "updateStat_calc"></caldetail>
        <!-- 验证公式 -->
        <Validatedetail :modalstat = "Valivisiable" :editinfo="calcinfo" @updateStat = "updateStat_vali"></Validatedetail>
    </Modal>
</template>
<script>
import $ from 'jquery';
import {
  salaryOptionApi
} from '@/api/salaryOption';
import caldetail from '../caldetail/modal';
import Validatedetail from '../Validatedetail/modal';
export default {
  name: 'Calcmodal',
  components: {
    caldetail,
    Validatedetail
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null
  },
  created () {
    console.log('moadlStat=======>', this.modalstat);
  },
  mounted () {
  },
  data () {
    return {
      Calcvisiable: false,
      Valivisiable: false,
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
            if (params.row.type === 4 || params.row.type === 1) {
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
                      this.validate(params.row);
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
        title: [
          { required: true, message: 'The title cannot be empty', trigger: 'blur' }
        ]
      },
      // 新建员工弹窗
      visiable_emp: false,
      // 计算数据
      calcinfo: null
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      this.addformbase = this.editinfo;
      console.log(this.addformbase);
      this.data1 = this.addformbase.salaryOptionVos;
    }
  },
  methods: {
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
          salaryOptionApi.addsalaryOption(this.addformbase).then(res => {
            if (res.ret === 200) {
              this.$emit('updateStat', false);
              this.$Message.success(res.msg);
            }
          });
        } else {
          this.$Message.error('Fail!');
        }
      });
    },
    Calc (row) {
      this.calcinfo = row;
      this.Calcvisiable = true;
    },
    updateStat_calc (state) {
      this.Calcvisiable = state;
    },
    validate (row) {
      this.calcinfo = row;
      this.Valivisiable = true;
    },
    updateStat_vali (state) {
      this.Valivisiable = state;
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
