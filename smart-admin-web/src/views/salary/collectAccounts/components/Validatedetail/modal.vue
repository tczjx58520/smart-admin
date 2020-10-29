<template>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('usermanage_view.adduser') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <Form ref="form" :model="myformbase" label-position="right" :label-width="100" :rules="ruleValidate">
                    <FormItem label="计算结果">
                      <div>
                        <p><span v-if="showres">{{ res }} = {{ formula }}</span></p>
                      </div>
                    </FormItem>
                    <FormItem v-for="(item, index) in calcItem" :key="index" :label="item.name" :prop="item.name" :rules="[{ required: true, message: 'fail', trigger: 'blur'}]">
                        <Input v-model="myformbase[item.name]"></Input>
                    </FormItem>
                </Form>
                <div style="text-align:right;">
                  <Button type="info" size="large"  @click="calc">{{ $t('calc') }}</Button>
                </div>
            </Card>

        </div>
        <div slot="footer">
            <ButtonGroup>
                <!-- <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button> -->
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
export default {
  name: 'Validatedetail',
  components: {
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null
  },
  created () {
  },
  mounted () {
  },
  data () {
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
      myformbase: {},
      ruleValidate: {
        title: [
          { required: true, message: 'The title cannot be empty', trigger: 'blur' }
        ]
      },
      // 新建员工弹窗
      visiable_emp: false,
      calcItem: [],
      formed: '',
      res: null,
      formula: null,
      showres: false,
      numpoint: 0
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      this.addformbase = this.editinfo;
      console.log(this.addformbase);
      this.getcalcList();
    }
  },
  methods: {
    async getcalcList () {
      let data = {};
      data.salaryOptionId = this.addformbase.id;
      let result = await collectAccountsApi.getcalculationFormula(data);
      console.log(result.data.content.list);
      this.calcItem = result.data.content.list[0].salaryOptions;
      this.formed = result.data.content.list[0].formula;
      this.numpoint = result.data.content.list[0].pointNum;
      this.reset();
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    reset () {
      for (const key in this.myformbase) {
        delete this.myformbase[key];
      }
      this.res = null;
      this.showres = false;
      this.$refs['form'].resetFields();
    },
    // 计算公式
    calc () {
      let process = [];
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.showres = true;
          let str = this.formed.replace(/#(.+?)#/g, function (word, $1) {
            console.log(word, $1);
            process.push($1);
            return $1;
          });
          console.log(process, this.myformbase);
          this.formula = str;
          for (const key in this.myformbase) {
            console.log('key=======>', key);
            console.log(process.indexOf(key));
            process.splice(process.indexOf(key), 1, this.myformbase[key]);
            // if (this.formed.indexOf(key)) {
            //   console.log(this.formed.findIndex);
            // }
          }
          console.log('this.formed===============>', process.join(''));
          // eslint-disable-next-line
          this.res = eval(process.join('')).toFixed(this.numpoint);
        } else {
          this.$message.info('请输入必填信息');
        }
      });
      console.log(this.formed);
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
