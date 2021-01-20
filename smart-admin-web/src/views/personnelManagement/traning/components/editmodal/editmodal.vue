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
                  <Input v-model="leaderform.materialName" />
                </FormItem>
                <FormItem :label="$t('danganbianhao')" style="width: 40%">
                  <Input v-model="leaderform.materialNo" />
                </FormItem>
                <!-- <FormItem :label="$t('wendangfenlei')" style="width: 40%">
                  <Input v-model="leaderform.classificationId" />
                </FormItem> -->
                <FormItem
                  :label="$t('wendangsuoyouzhe')"
                  style="width: 40%"
                  @click.native="selectemp('ownerId')"
                >
                  <Input v-model="leaderform.ownerName" />
                </FormItem>
                <!-- <FormItem :label="$t('suoshubumen')" style="width: 40%">
                  <Select
                    v-model="leaderform.deptId"
                    filterable
                    :transfer="true"
                  >
                    <Option
                      v-for="item in postData"
                      :value="item.id"
                      :key="item.id"
                      >{{ item.postName }}</Option
                    >
                  </Select>
                </FormItem> -->
                <FormItem
                  :label="$t('baoguanzuzhi')"
                  style="width: 40%"
                  @click.native="showorg_ass"
                >
                  <Input v-model="leaderform.organizationName" />
                </FormItem>
                <FormItem
                  :label="$t('baoguanyuan')"
                  style="width: 40%"
                  @click.native="selectemp('employeeId')"
                >
                  <Input v-model="leaderform.employeeName" />
                </FormItem>
              </Form>
            </TabPane>
            <TabPane :label="$t('zwnr')" name="name2">
              <Editor v-model="leaderform.materialBody" :showFlag="mymoadlStat"/>
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
    <addempSingle :modalstat="visiable" @updateStat="updateStat"></addempSingle>
    <addorg
      :modalstat="visiable_org"
      :type="mytype"
      :memberId="leaderform"
      @updateStat="updateStat_org"
    ></addorg>
  </Modal>
</template>
<script>
import Editor from '@/components/editor/editor';
import 'wangeditor/release/wangEditor.min.css';
import { training } from '@/api/traning';
import addempSingle from '../addemp_single/modal';
import addorg from '../add_org/modal';
import { positionApi } from '@/api/position';
export default {
  name: 'addModal',
  components: {
    Editor,
    addempSingle,
    addorg
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editInfo: null
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
      visiable: false,
      isShowTree: false,
      visiable_org: false,
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
      leaderform: {},
      backvalue: null,
      mytype: null,
      postData: []
    };
  },
  watch: {
    async modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        this.getPostlist();
        this.leaderform = this.editInfo;
      }
    }
  },
  methods: {
    getPostlist () {
      const searchFrom = {
        pageNum: 1,
        pageSize: 9999
      };
      positionApi.postList(searchFrom).then((res) => {
        if (res.ret === 200) {
          this.postData = res.data.content.list;
        } else {
          console.log('列表出错');
        }
      });
    },
    showorg_ass () {
      this.mytype = 2;
      this.visiable_org = true;
    },
    updateStat_org (stat, orgList, type) {
      this.visiable_org = stat;
      if (orgList) {
        console.log(type);
        if (type === 1) {
          this.leaderform.organizationName = orgList.organizationOaName;
          this.leaderform.organizationId = orgList.organizationOa;
        } else {
          console.log('进入此');
          this.leaderform.organizationName = orgList.organizationOaName;
          this.leaderform.organizationId = orgList.organizationOa;
          console.log(this.leaderform.organizationName);
        }
      }
    },
    selectemp (value) {
      this.backvalue = value;
      this.visiable = true;
    },
    updateStat (state, row) {
      this.visiable = state;
      if (row) {
        console.log('this.backvalue=========', this.backvalue);
        switch (this.backvalue) {
          case 'ownerId':
            this.leaderform.ownerId = row.id;
            this.leaderform.ownerName = row.personName;
            break;
          case 'employeeId':
            this.leaderform.employeeId = row.id;
            this.leaderform.employeeName = row.personName;
            break;
          default:
            break;
        }
      }
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    reset () {
      this.addformbase = {};
      this.addformaccount = {};
    },
    handsave () {
      console.log(this.leaderform, this.leaderform.materialBody);
      this.leaderform.classificationId = this.$route.query.id;
      this.$refs['form2'].validate((valid) => {
        if (valid) {
          training.updateTrainingDetail(this.leaderform).then((res) => {
            if (res.ret === 200) {
              this.$emit('updateStat', false);
              this.$Message.success(res.msg);
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
