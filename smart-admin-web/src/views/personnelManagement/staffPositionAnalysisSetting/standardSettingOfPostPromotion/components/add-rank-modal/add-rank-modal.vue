<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="720"
    :closable="false"
    :mask-closable="false"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>{{ $t("tjpmjgz") }}</span>
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
          :label-width="100"
          :rules="ruleValidate"
        >
          <FormItem :label="$t('mc')" style="width: 80%">
            <Select v-model="addformbase.level" clearable>
              <Option :value="1">1</Option>
              <Option :value="2">2</Option>
              <Option :value="3">3</Option>
              <Option :value="4">4</Option>
              <Option :value="5">5</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('jl')" style="width: 80%">
            <Input v-model="addformbase.money" />
          </FormItem>
        </Form>
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
</template>
<script>
const defaultForm = {
  level: 1,
  money: 0
};
export default {
  name: 'add-team-modal',
  components: {
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null,
    isedit: {
      type: Boolean,
      default: false
    }
  },
  created () {},
  mounted () {},
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    return {
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: Object.assign({}, defaultForm),
      ruleValidate: {
        categoryName: [
          {
            required: true,
            message: 'The categoryName cannot be empty',
            trigger: 'blur'
          }
        ]
      },
      // 新建员工弹窗
      visiable_emp: false,
      visiable_org: false,
      visiable_post: false,
      tranferValue: null,
      mytype: null,
      repositoryList: [],
      levelList: [],
      columns_team: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('xsjz'),
          key: 'repositoryName'
        },
        {
          title: this.$t('jjjs'),
          key: 'repositoryName'
        },
        {
          title: this.$t('cejs'),
          key: 'repositoryName'
        },
        {
          title: this.$t('yxtrjz'),
          key: 'repositoryName'
        },
        {
          title: this.$t('gz'),
          key: 'repositoryName'
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
                      this.Edit(params.row);
                    }
                  }
                },
                this.$t('Edit')
              )
            ]);
          }
        }
      ],
      data_team: [],
      team_dialog: false
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
    }
  },
  methods: {
    addteamrule () {
      this.team_dialog = true;
    },
    delteamrule () {},
    cancel () {
      this.addformbase = Object.assign({}, defaultForm);
      this.$emit('updateStat', false);
    },
    handsave () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('updateStat', false, this.addformbase);
          this.addformbase = Object.assign({}, defaultForm);
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
