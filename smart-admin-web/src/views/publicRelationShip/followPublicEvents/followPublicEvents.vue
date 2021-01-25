<template>
  <div>
    <Card dis-hover>
      <div style="padding: 24px; text-align: center; font-size: 32px">
        {{ addformbase.title }}
      </div>
      <!-- 内容区域 -->
      <div>
        <Form
          ref="form2"
          :model="leaderform"
          label-position="right"
          :label-width="100"
          :rules="ruleValidate"
          inline
        >
          <FormItem :label="$t('shijianfang')" style="width: 20%">
            <span>{{ addformbase.eventParty }}</span>
          </FormItem>
          <FormItem :label="$t('shijianchuliren')" style="width: 20%">
            <span>{{ addformbase.handlePersonName }}</span>
          </FormItem>
          <FormItem :label="$t('shijianshijian')" style="width: 20%">
            <span>{{ addformbase.createtimeStr }}</span>
          </FormItem>
          <FormItem :label="$t('shijianzhuangtai')" style="width: 20%">
            <span>{{
              addformbase.status === 0 ? $t("genjingzhong") : $t("jieshu")
            }}</span>
          </FormItem>
          <FormItem :label="$t('shijianneirong')" style="width: 100%">
            <span>{{ addformbase.content }}</span>
          </FormItem>
          <FormItem :label="$t('genjinfangshi')" style="width: 100%">
            <Input
              placeholder="请输入内容"
              type="text"
              v-model="leaderform.followWay"
              style="width: 100%"
            />
          </FormItem>
          <FormItem style="width: 100%">
            <Editor v-model="leaderform.followContent" />
          </FormItem>
          <FormItem style="width: 100%">
            <Button
              style="margin-right:15px;"
              :loading="isShowSaveButtonLoading"
              @click="addOrUpdateEmail"
              type="primary"
              >发表</Button
            >
            <Button
              @click="cancel"
              >取消</Button
            >
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>
<script>
import Editor from '@/components/editor/editor';
import 'wangeditor/release/wangEditor.min.css';
import { training } from '@/api/traning';
import { positionApi } from '@/api/position';
import { publicEventsList } from '@/api/publicEventsList';
import { utils } from '@/lib/util';
export default {
  name: 'followPublicEvents',
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
  mounted () {
    this.getwelfareList();
  },
  data () {
    const validatePass2 = (rule, value, callback) => {
      if (
        this.leaderform.organizationOaName === '' &&
        this.leaderform.organizationOaName === null &&
        this.leaderform.organizationOaName === undefined
      ) {
        callback(new Error('Please enter your organization'));
      } else {
        callback();
      }
    };
    return {
      addformbase: {},
      visiable: false,
      isShowTree: false,
      visiable_org: false,
      mytype: 1,
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
      postData: [],
      isShowSaveButtonLoading: false
    };
  },
  watch: {},
  methods: {
    addOrUpdateEmail () {
      this.isShowSaveButtonLoading = true;
      const data = {
        eventId: this.$route.query.id,
        followContent: this.leaderform.followContent,
        followWay: this.leaderform.followWay,
        followPersonId: this.$store.state.user.userLoginInfo.userId
      };
      publicEventsList.doFollowStorage(data).then(res => {
        console.log(res.ret);
        this.isShowSaveButtonLoading = false;
        this.$Message.success(res.msg);
        this.$router.closeCurrentPage();
      });
    },
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
    async getwelfareList () {
      const searchform = {
        pageNum: 1,
        pageSize: 99,
        id: this.$route.query.id
      };
      try {
        let result = await publicEventsList.getstorage(searchform);
        this.addformbase = Object.assign({}, result.data.list[0]);
        this.addformbase.handPersonName = this.addformbase.handlePersonName;
        this.addformbase.organizationName = this.addformbase.eventParty;
        const temp = new Date(this.addformbase.createtime);
        const date = utils.getDate(temp, 'YMDHM');
        this.addformbase.createtimeStr = date;
        console.log('内容==============', this.addformbase);
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.loading = false;
      }
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
      this.$router.closeCurrentPage();
    },
    reset () {
      this.leaderform = {};
    },
    handsave () {
      console.log(this.leaderform, this.leaderform.followContent);
      this.leaderform.classificationId = this.$route.query.id;
      this.$refs['form2'].validate((valid) => {
        if (valid) {
          training.addTrainingDetail(this.leaderform).then((res) => {
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
