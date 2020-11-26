<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="720"
    :closable="false"
    :mask-closable="false"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>{{ $t("tjzb") }}</span>
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
          <FormItem :label="$t('xsjz')" style="width: 80%">
            <Input v-model="addformbase.saleTarget" />
          </FormItem>
          <FormItem :label="$t('jjjs')" style="width: 80%">
            <Input v-model="addformbase.rewardBase" />
          </FormItem>
          <FormItem :label="$t('cejs')" style="width: 80%">
            <Input v-model="addformbase.exceedBase" />
          </FormItem>
          <FormItem :label="$t('yxtrjz')" style="width: 80%">
            <Input v-model="addformbase.marketBase" />
          </FormItem>
          <FormItem :label="$t('mcg')" style="width: 80%">
            <Input v-model="addformbase.overMoney" style="width:100px;"/>
            <span>{{ $t('xsjzzj') }}</span>
            <Input v-model="addformbase.reduceQty" style="width:200px;"/>
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
  saleTarget: 0,
  rewardBase: 0,
  exceedBase: 0,
  marketBase: 0,
  overMoney: 0,
  reduceQty: 0
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
      if (this.mymoadlStat) {
        if (this.isedit) {
          this.addformbase = Object.assign({}, this.editinfo);
        }
      }
    }
  },
  methods: {
    addteamrule () {
      this.team_dialog = true;
    },
    delteamrule () {},
    // 选择人员部门岗位
    selectOrg (index) {
      this.mytype = index;
      this.visiable_org = true;
      switch (this.mytype) {
        case 1:
          this.tranferValue = this.addformbase.startOrganize;
          break;
        case 2:
          this.tranferValue = this.addformbase.forbidOrganize;
          break;
        case 3:
          this.tranferValue = this.addformbase.queryOrganize;
          break;
        case 4:
          this.tranferValue = this.addformbase.manageOrganize;
          break;
      }
    },
    selectPost (index) {
      this.mytype = index;
      this.visiable_post = true;
      switch (this.mytype) {
        case 1:
          this.tranferValue = this.addformbase.startPost;
          break;
        case 2:
          this.tranferValue = this.addformbase.forbidPost;
          break;
        case 3:
          this.tranferValue = this.addformbase.queryPost;
          break;
        case 4:
          this.tranferValue = this.addformbase.managePost;
          break;
      }
    },
    selectEmp (index) {
      this.mytype = index;
      this.showemp();
    },
    // ==============end========
    updateStat_emp (stat, empList) {
      this.visiable_emp = stat;
      if (!empList) {
        return false;
      }
      switch (this.mytype) {
        case 1:
          this.addformbase.startEmpName = empList.names;
          this.addformbase.startEmp = empList.empIds;
          break;
        case 2:
          this.addformbase.forbidEmpName = empList.names;
          this.addformbase.forbidEmp = empList.empIds;
          break;
        case 3:
          this.addformbase.queryEmpName = empList.names;
          this.addformbase.queryEmp = empList.empIds;
          break;
        case 4:
          this.addformbase.manageEmpName = empList.names;
          this.addformbase.manageEmp = empList.empIds;
          break;
      }
    },
    updateStat_org (stat, orgList) {
      console.log(orgList);
      this.visiable_org = stat;
      if (!orgList) {
        return false;
      }
      switch (this.mytype) {
        case 1:
          this.addformbase.startOrganizeName = orgList.organizationOaName;
          this.addformbase.startOrganize = orgList.organizationOa;
          break;
        case 2:
          this.addformbase.forbidOrganizeName = orgList.organizationOaName;
          this.addformbase.forbidOrganize = orgList.organizationOa;
          break;
        case 3:
          this.addformbase.queryOrganizeName = orgList.organizationOaName;
          this.addformbase.queryOrganize = orgList.organizationOa;
          break;
        case 4:
          this.addformbase.manageOrganizeName = orgList.organizationOaName;
          this.addformbase.manageOrganize = orgList.organizationOa;
          break;
      }
    },
    updateStat_post (stat, postList) {
      this.visiable_post = stat;
      if (!postList) {
        return false;
      }
      switch (this.mytype) {
        case 1:
          this.addformbase.startPostName = postList.names;
          this.addformbase.startPost = postList.empIds;
          break;
        case 2:
          this.addformbase.forbidPostName = postList.names;
          this.addformbase.forbidPost = postList.empIds;
          break;
        case 3:
          this.addformbase.queryPostName = postList.names;
          this.addformbase.queryPost = postList.empIds;
          break;
        case 4:
          this.addformbase.managePostName = postList.names;
          this.addformbase.managePost = postList.empIds;
          break;
      }
    },
    showemp () {
      switch (this.mytype) {
        case 1:
          this.tranferValue = this.addformbase.startEmp;
          break;
        case 2:
          this.tranferValue = this.addformbase.forbidEmp;
          break;
        case 3:
          this.tranferValue = this.addformbase.queryEmp;
          break;
        case 4:
          this.tranferValue = this.addformbase.manageEmp;
          break;
      }
      // if (typeof (this.tranferValue) === 'string' && this.tranferValue !== null) {
      //   this.tranferValue.split(',');
      // }
      this.visiable_emp = true;
    },
    // 选择部门或者成员
    selectDepartmentOrEmployee (department) {
      console.log('department==============>', department);
    },
    cancel () {
      this.addformbase = Object.assign({}, defaultForm);
      this.$emit('updateStat', false);
    },
    reset () {
      this.addformbase = {
        categoryName: '',
        remark: ''
      };
      this.$refs['form'].resetFields();
    },
    handsave () {
      console.log(this.addformbase);
      this.addformbase.createPersonId = this.$store.state.user.userLoginInfo.userId;
      this.addformbase.leaders = this.addformbase.manageEmp;
      this.addformbase.repositoryLevelId = 1;
      // repositoryLevelId
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
