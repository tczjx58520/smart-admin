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
      <span>{{ $t('zcbg') }}</span>
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
            <Col span="12">
              <FormItem :label="$t('zichanbianhao')" style="width: 100%;height:60px" prop="assetNum">
                <span>{{ addformbase.assetNum }}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('zichanmingchen')" style="width: 100%;height:60px" prop="assetName">
                <span>{{ addformbase.assetName }}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('gouzhiriqi')" style="width: 100%;height:60px">
                <span>{{ addformbase.purchaseTime }}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('xinghao')" style="width: 100%;height:60px">
                <span>{{ addformbase.speciation }}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('baoguanzuzhi')" style="width: 100%;height:60px">
                <span>{{ addformbase.organizationName }}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('baoguanrenyuan')" style="width: 100%;height:60px">
                <span>{{ addformbase.custodiansName }}</span>
              </FormItem>
            </Col>
          </Row>
        </Form>

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
          <div>{{ $t('bgxx') }}</div>
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
              <FormItem :label="$t('zczt')" style="width: 100%;height:60px" prop="assetNum">
                <span>{{ statFilter(addformbase.detailStat) }}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('yzz')" style="width: 100%;height:60px" prop="assetNum">
                <span>{{ addformbase.useOrganizationName }}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('yyh')" style="width: 100%;height:60px" prop="assetNum">
                <span>{{ addformbase.usersName }}</span>
              </FormItem>
            </Col>
            <!-- <Col span="12">
              <FormItem :label="$t('baoguanzuzhi')" style="width: 100%;height:60px">
                <Button @click="selectOrg(4)" style="width:100%;">选择组织</Button>
                <Input type="textarea" v-model="addformbase.manageOrganizeName" readonly/>
              </FormItem>
            </Col> -->
            <Col span="12">
              <FormItem :label="$t('biangenghourenyuan')" style="width: 100%;height:60px">
                <Button @click="selectEmp(4)" style="width:100%;">选择人员</Button>
                <Input type="textarea" v-model="addformbase.manageEmpName" readonly/>
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
    <addemp
      :modalstat="visiable_emp"
      :type="mytype"
      :memberId="tranferValue"
      @updateStat="updateStat_emp"
    ></addemp>
    <!-- <addorg
      :modalstat="visiable_org"
      :type="mytype"
      :memberId="tranferValue"
      @updateStat="updateStat_org"
    ></addorg> -->
    <addpost
      :modalstat="visiable_post"
      :memberId="tranferValue"
      @updateStat="updateStat_post"
    ></addpost>
    <organization
      :modalstat.sync="visiable_org"
      @organizationData="getOrganizationData"
    />
    <!-- 新建结束============= -->
  </Modal>
</template>
<script>
import $ from 'jquery';
import addemp from '../addemp/modal';
import addorg from '../add_org/modal';
import addpost from '../addpost/modal';
import organization from '@/components/organization';
import { assetManage } from '@/api/assetManage';
import { assetDetail } from '@/api/assetDetail';
import { classification } from '@/api/classification';
import { numSetting } from '@/api/numSetting';
import {
  unitOfMeasure
} from '@/api/unitOfMeasure';
import {
  storage
} from '@/api/storageLocation';
export default {
  name: 'addModal',
  components: {
    addemp,
    addorg,
    addpost,
    organization
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    flag: null,
    hadlerInfo: null
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
        this.addformbase.unitId === '' &&
        this.addformbase.unitId === null &&
        this.addformbase.unitId === undefined
      ) {
        callback(new Error('Please enter your unit'));
      } else {
        callback();
      }
    };
    const validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    const validatePass4 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter'));
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
      addformbase: {},
      ruleValidate: {
        assetNum: [
          {
            required: !this.isrequireNum,
            message: 'The assetNum cannot be empty',
            trigger: 'change'
          }
        ],
        assetName: [
          {
            required: true,
            message: 'The assetName cannot be empty',
            trigger: 'change'
          }
        ],
        unitId: [
          {
            required: true,
            trigger: 'change',
            validator: validatePass2
          }
        ],
        unitPrice: [
          {
            required: true,
            message: 'The unitPrice cannot be empty',
            trigger: 'change'
          }
        ],
        depreciationRate: [
          {
            required: true,
            message: 'The depreciationRate cannot be empty',
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
      locationList: [],
      isrequireNum: false
    };
  },
  computed: {
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        this.getList();
        this.getwelfareList();
      }
    }
  },
  methods: {
    filterTitle (val) {
      const map = {
        1: this.$t('tjzcdsxx'),
        2: this.$t('tjzcwxxx'),
        3: this.$t('tjzcghxx'),
        4: this.$t('tjzcwjxx'),
        5: this.$t('tjzcbfxx')
      };
      return map[val];
    },
    filterSecondTitle (val) {
      const map = {
        1: this.$t('dsxx'),
        2: this.$t('wxxx'),
        3: this.$t('ghxx'),
        4: this.$t('wjxx'),
        5: this.$t('bfxx')
      };
      return map[val];
    },
    statFilter (val) {
      const map = {
        0: this.$t('daiyong'),
        1: this.$t('waijie'),
        2: this.$t('weixiu'),
        3: this.$t('baofei'),
        4: this.$t('diushi')
      };
      return map[val];
    },
    selectDate (val) {
      this.addformbase.purchaseTime = val;
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
      this.$emit('updateStat', false);
    },
    reset () {
      this.addformbase = {};
      this.$refs['form'].resetFields();
    },
    handsave () {
      console.log(this.addformbase.organizationId);
      this.addformbase.presentId = this.addformbase.manageEmp;
      this.addformbase.presentValue = this.addformbase.manageEmpName;
      this.addformbase.operatorId = this.$store.state.user.userLoginInfo.userId;
      // this.addformbase.organizationId = this.addformbase.manageOrganize;
      this.addformbase.assetDetailId = this.addformbase.assetDetailId;
      assetDetail.updateChange(this.addformbase).then(res => {
        console.log('res=============', res);
        this.$emit('updateStat', false);
      });
      // this.$refs['form'].validate(valid => {
      //   if (valid) {
      //     assetManage.addstorage(this.addformbase).then(res => {
      //       if (res.ret === 200) {
      //         this.$emit('updateStat', false);
      //         this.$Message.success(res.msg);
      //       }
      //     });
      //   } else {
      //     this.$Message.error('Fail!');
      //   }
      // });
    },
    // 弹窗组件结束=========================》
    getList (val) {
      numSetting.getstorage().then(res => {
        this.isrequireNum = !res.data.numMethod;
      });
      const data3 = {};
      storage.getstorage(data3).then(res => {
        console.log(res);
        this.locationList = res.data;
      });
      const data2 = {};
      unitOfMeasure.getstorage(data2).then(res => {
        console.log(res);
        this.unitList = res.data;
      });
      const data = {
        parentId: val || 0
      };
      classification.getstorage(data).then((res) => {
        console.log('res=======', res.data);
        const data = res.data.map((item) => {
          return {
            loading: false,
            label: item.classifyName,
            value: item.id,
            parentId: 0,
            children: []
          };
        });
        this.data_class = data;
      });
    },
    loadData_class (item, callback) {
      const data = {
        parentId: item.value
      };
      classification.getstorage(data).then((res) => {
        const data = res.data.map((items) => {
          return {
            label: items.classifyName,
            value: items.id,
            parentId: item.id
          };
        });
        item.children = data;
        callback();
      });
    },
    async getwelfareList () {
      const searchform = {
        pageNum: 1,
        pageSize: 10,
        flag: 0,
        custodiansId: this.$store.state.user.userLoginInfo.userId,
        id: this.$route.query.assetId
      };
      try {
        let result = await assetManage.getstorage(searchform);
        this.addformbase = Object.assign({}, result.data.list[0]);
        const data = Object.assign({}, this.hadlerInfo);
        this.addformbase.detailStat = data.assetStatus;
        this.addformbase.assetBorrowNum = data.assetBorrowNum;
        this.addformbase.assetDetailId = data.id;
        const searchdata = {
          assetBorrowNum: this.addformbase.assetBorrowNum,
          status: this.addformbase.detailStat
        };
        let result2 = await assetDetail.getborrow(searchdata);
        const data2 = Object.assign({}, result2.data);
        this.$set(this.addformbase, 'usersName', data2.usersName);
        this.$set(this.addformbase, 'useOrganizationName', data2.useOrganizationName);
        this.addformbase.originalId = data2.usersId || data2.repairPersonId;
        this.addformbase.originalValue = data2.usersName;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
      }
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
