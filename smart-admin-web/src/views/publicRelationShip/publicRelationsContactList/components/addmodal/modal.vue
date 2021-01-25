<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="720"
    :closable="false"
    :mask-closable="false"
    :transfer="false"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>{{ $t("tjlxr") }}</span>
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
          inline
        >
          <Row>
            <Col span="24">
              <FormItem :label="$t('lianxirenxingming')" style="width: 100%;height:60px" prop="name">
                <Input v-model="addformbase.name"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('xingbie')" style="width: 100%;height:60px" prop="sex">
                <Select v-model="addformbase.sex">
                  <Option
                    value="男"
                    >{{ $t('nan') }}</Option
                  >
                  <Option
                    value="女"
                    >{{ $t('nv') }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('chushengriqi')" style="width: 100%;height:60px" prop="birthdayStr">
                <DatePicker
                  v-model="addformbase.birthdayStr"
                  :options="options"
                  type="date"
                  placeholder="Select date"
                  style="width: 100%"
                  @on-change="selectDate"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('dianhua')" style="width: 100%;height:60px" prop="telephone">
                <Input v-model="addformbase.telephone" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('zhiwei')" style="width: 100%;height:60px" prop="position">
                <Input v-model="addformbase.position"/>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem :label="$t('jigoumingchen')" style="width: 100%;height:60px" prop="organizationName">
                <Input v-model="addformbase.organizationName" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem :label="$t('dizhi')" style="width: 100%;height:60px" prop="address">
                <Input type="textarea" v-model="addformbase.address" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem :label="$t('suoshufenlei')" style="width: 100%;height:60px" prop="classifyId">
                <Select v-model="addformbase.classifyId">
                  <Option
                    v-for="item in classifiCationList" :key="item.id"
                    :value="item.id"
                    >{{ item.classifyName }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
          </Row>
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
    <!-- 新建员工弹窗 -->
    <!-- 新建结束============= -->
  </Modal>
</template>
<script>
import { contract } from '@/api/contract';
import { contractclassifiCation } from '@/api/contractclassifiCation';
import {
  unitOfMeasure
} from '@/api/unitOfMeasure';
import {
  storage
} from '@/api/storageLocation';
const defaultForm = {
};
export default {
  name: 'addModal',
  components: {
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
    const validatePass2 = (rule, value, callback) => {
      if (
        this.addformbase.sex === '' &&
        this.addformbase.sex === null &&
        this.addformbase.sex === undefined
      ) {
        callback(new Error('Please enter your sex'));
      } else {
        callback();
      }
    };
    const validatePass3 = (rule, value, callback) => {
      if (
        this.addformbase.classifyId === '' &&
        this.addformbase.classifyId === null &&
        this.addformbase.classifyId === undefined
      ) {
        callback(new Error('Please choose your classify'));
      } else {
        callback();
      }
    };
    const validatePass4 = (rule, value, callback) => {
      if (
        this.addformbase.birthdayStr === '' &&
        this.addformbase.birthdayStr === null &&
        this.addformbase.birthdayStr === undefined
      ) {
        callback(new Error('Please choose your classify'));
      } else {
        callback();
      }
    };
    const checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('please enter'));
      }
      setTimeout(() => {
        console.log(String(value).length);
        if (String(value).length !== 11) {
          callback(new Error('please enter Correct phone'));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      isShowTree: false,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: Object.assign({}, defaultForm),
      ruleValidate: {
        name: [
          {
            required: true,
            message: 'The name cannot be empty',
            trigger: 'change'
          }
        ],
        sex: [
          {
            required: true,
            trigger: 'change',
            validator: validatePass2
          }
        ],
        birthdayStr: [
          {
            required: true,
            validator: validatePass4,
            trigger: 'change'
          }
        ],
        telephone: [
          {
            required: true,
            validator: checkphone,
            trigger: 'change'
          }
        ],
        position: [
          {
            required: true,
            message: 'The position cannot be empty',
            trigger: 'change'
          }
        ],
        organizationName: [
          {
            required: true,
            message: 'The organizationName cannot be empty',
            trigger: 'change'
          }
        ],
        address: [
          {
            required: true,
            message: 'The address cannot be empty',
            trigger: 'change'
          }
        ],
        classifyId: [
          {
            required: true,
            validator: validatePass3,
            trigger: 'change'
          }
        ]
      },
      // 新建员工弹窗
      visiable_emp: false,
      visiable_org: false,
      visiable_post: false,
      tranferValue: null,
      mytype: null,
      levelList: [],
      reposList: [],
      data_class: [],
      unitList: [],
      classifiCationList: [],
      options: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now();
        }
      }
    };
  },
  computed: {
    allPrice () {
      const result = Number(this.addformbase.unitPrice) * Number(this.addformbase.amount);
      if (result) {
        return result;
      } else {
        return 0;
      }
    },
    depreciationPrice () {
      const result = Number(this.addformbase.depreciationRate) * Number(this.allPrice);
      if (result) {
        return result;
      } else {
        return 0;
      }
    }
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        this.getList();
      }
    }
  },
  methods: {
    selectDate (val) {
      this.addformbase.birthday = val;
    },
    selectDate2 (val) {
      this.addformbase.registrationTime = val;
    },
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
    updateStat_emp (stat, row) {
      this.visiable_emp = stat;
      if (!row) {
        return false;
      }
      this.addformbase.manageEmpName = row.personName;
      this.addformbase.manageEmp = row.id;
      this.addformbase.organizationId = row.organizationOa;
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
    getOrganizationData (val) {
      console.log('val-====================', val);

      this.addformbase.manageOrganizeName = val.title;
      this.addformbase.manageOrganize = val.id;
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
      this.$refs['form'].validate(valid => {
        if (valid) {
          contract.addstorage(this.addformbase).then(res => {
            if (res.ret === 200) {
              this.$emit('updateStat', false);
              this.addformbase = Object.assign({}, defaultForm);
              this.$Message.success(res.msg);
            }
          });
        } else {
          this.$Message.error('Fail!');
        }
      });
    },
    // 弹窗组件结束=========================》
    getList (val) {
      const data = {
      };
      contractclassifiCation.getstorage(data).then((res) => {
        this.classifiCationList = res.data;
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
