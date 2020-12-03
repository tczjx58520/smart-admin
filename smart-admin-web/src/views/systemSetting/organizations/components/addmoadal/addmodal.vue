<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="720"
    :closable="false"
    :mask-closable="false"
    :styles="{ top: '10px' }"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>修改组织</span>
    </div>
    <div>
      <Card dis-hover>
        <Divider />
        <Form
          ref="form"
          :model="addformbase"
          label-position="right"
          :label-width="100"
          :rules="ruleValidate"
        >
          <FormItem :label="$t('zzmc')">
            <Input
              v-model="addformbase.organizeName"
              style="width: 100%"
            ></Input>
          </FormItem>
        </Form>
        <Divider />
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
import { organization } from '@/api/organization';
import { utils } from '@/lib/util';
export default {
  name: 'stepaction',
  components: {
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
    const validatePass2 = (rule, value, callback) => {
      if (
        this.addformbase.entrustedPersonName === '' ||
        this.addformbase.entrustedPersonName === null ||
        this.addformbase.entrustedPersonName === undefined
      ) {
        callback(new Error('Please select your emp'));
      } else {
        callback();
      }
    };
    const validatePass3 = (rule, value, callback) => {
      if (
        this.addformbase.empNames === '' ||
        this.addformbase.empNames === null ||
        this.addformbase.empNames === undefined
      ) {
        callback(new Error('Please enter your emp'));
      } else {
        callback();
      }
    };
    return {
      originList: [],
      mytype: null,
      // 新建基础数据
      GongList: [],
      SheList: [],
      itemsList: [],
      allitems: [],
      // ===============================>
      socialSecurity: true,
      accumulationFund: true,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {},
      ruleValidate: {
        entrustedPersonName: [
          {
            required: true,
            validator: validatePass2,
            trigger: 'change'
          }
        ]
      },
      // 新建员工弹窗
      visiable_emp: false
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        this.addformbase = Object.assign({}, this.editInfo);
        this.addformbase.organizeName = this.addformbase.title;
      }
    }
  },
  methods: {
    updateStat_emp (stat, row, type) {
      this.visiable_emp = stat;
      console.log('row=========', row.personName);
      this.addformbase.entrustedPersonName = row.personName;
      this.addformbase.entrustedPersonIds = row.id;
      // console.log('empList==================', row);
      // this.data = this.empList.map
    },
    delCounterSign (index) {
      this.data.splice(index, 1);
      const temp = this.addformbase.checkPerson.split(',');
      temp.splice(index, 1);
      this.addformbase.checkPerson = temp.join(',');
      console.log(this.addformbase);
    },
    addorg (selection) {
      console.log('selection==========>', selection);
      console.log(
        selection
          .map((item) => {
            return item.title;
          })
          .join(',')
      );
      this.addformbase.organizationOaName = selection
        .map((item) => {
          return item.title;
        })
        .join(',');
      this.addformbase.organizationOa = selection
        .map((item) => {
          return item.id;
        })
        .join(',');
      console.log(this.addformbase.organizationOaName);
    },
    showemp_exa () {
      // if (
      //   typeof this.addformbase.testHandle === 'string' &&
      //   this.addformbase.testHandle !== null
      // ) {
      //   this.addformbase.testHandle.split(',');
      // }
      this.mytype = 2;
      this.visiable_emp = true;
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    reset () {
      for (let key in this.addformbase) {
        delete this.addformbase[key];
      }
      this.$refs['form'].resetFields();
    },
    handsave () {
      this.modal_loading = true;
      console.log(this.addformbase);
      const data = {
        organizeName: this.addformbase.organizeName,
        organizeId: this.addformbase.id,
        operatId: this.$store.state.user.userLoginInfo.id
      };
      organization.updateOrganization(data).then((res) => {
        if (res.ret === 200) {
          this.modal_loading = false;
          this.$emit('updateStat', false, true);
          this.$Message.success(res.msg);
          // this.reset();
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
