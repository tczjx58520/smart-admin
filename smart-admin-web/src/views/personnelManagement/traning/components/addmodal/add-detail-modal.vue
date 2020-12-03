<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    :closable="false"
    :mask-closable="false"
    :transfer="false"
    fullscreen
  >
    <div slot="header" style="text-align:left;color:#fff;">
      <span>{{ $t("tjpxzl") }}</span>
    </div>
    <div>
      <Card dis-hover>
        <!-- 内容区域 -->
        <Tabs value="name1" :animated="false">
          <div>
            <TabPane :label="$t('zwsx')" name="name1">
              <Form
                ref="form2"
                :model="leaderform"
                label-position="right"
                :label-width="150"
                :rules="ruleValidate"
                inline
              >
                <FormItem :label="$t('danganmingchen')" style="width: 40%">
                  <Input v-model="leaderform.rewardBase" />
                </FormItem>
                <FormItem :label="$t('danganbianhao')" style="width: 40%">
                  <Input v-model="leaderform.leaderPercent" />
                </FormItem>
                <FormItem :label="$t('wendangfenlei')" style="width: 40%">
                  <Input v-model="leaderform.assistantPercent" />
                </FormItem>
                <FormItem :label="$t('wendangsuoyouzhe')" style="width: 40%">
                  <Input v-model="leaderform.assistantPercent" />
                </FormItem>
                <FormItem :label="$t('suoshubumen')" style="width: 40%">
                  <Input v-model="leaderform.assistantPercent" />
                </FormItem>
                <FormItem :label="$t('baoguanzuzhi')" style="width: 40%">
                  <Input v-model="leaderform.assistantPercent" />
                </FormItem>
                <FormItem :label="$t('baoguanyuan')" style="width: 40%">
                  <Input v-model="leaderform.assistantPercent" />
                </FormItem>
              </Form>
            </TabPane>
            <TabPane :label="$t('zwnr')" name="name2">
              <Editor v-model="leaderform.html"/>
            </TabPane>
          </div>
        </Tabs>
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
import Editor from '@/components/editor/editor';
import 'wangeditor/release/wangEditor.min.css';
export default {
  name: 'addModal',
  components: {
    Editor
  },
  props: {
    modalstat: {
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
    const validatePass2 = (rule, value, callback) => {
      if (
        this.addformbase.organizationOaName === '' &&
        this.addformbase.organizationOaName === null &&
        this.addformbase.organizationOaName === undefined
      ) {
        callback(new Error('Please enter your organization'));
      } else {
        callback();
      }
    };
    return {
      isShowTree: false,
      statList: [
        {
          label: this.$t('usermanage_view.working'),
          value: 1
        },
        {
          label: this.$t('usermanage_view.Quit'),
          value: 2
        }
      ],
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {},
      ruleValidate: {
        firstname: [
          {
            required: true,
            message: 'The firstname cannot be empty',
            trigger: 'blur'
          }
        ],
        middlename: [
          {
            required: true,
            message: 'The middlename cannot be empty',
            trigger: 'blur'
          }
        ]
      },
      leaderform: {}
    };
  },
  watch: {
    async modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('updateStat', false);
    },
    reset () {
      this.addformbase = {};
      this.addformaccount = {};
    },
    handsave () {
      console.log(this.addformbase, this.leaderform.html);
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$refs['form2'].validate(valid => {
            if (valid) {
              usermanagelApi
                .register(this.addformbase, this.addformaccount)
                .then(res => {
                  if (res.ret === 200) {
                    this.$emit('updateStat', false);
                    this.$Message.success(res.msg);
                  }
                });
            } else {
              this.$Message.error('Fail!');
            }
          });
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
