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
      <span>{{ $t("tjzc") }}</span>
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
              <FormItem v-if="!isrequireNum" :label="$t('zichanbianhao')" style="width: 100%;height:60px" prop="assetNum">
                <Input v-model="addformbase.assetNum" :disabled="isrequireNum"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('zichanmingchen')" style="width: 100%;height:60px" prop="assetName">
                <Input v-model="addformbase.assetName" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('leibiemingchen')" style="width: 100%;height:60px">
                <Cascader v-model="addformbase.parentClassifyId" :data="data_class" :load-data="loadData_class"></Cascader>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('xinghao')" style="width: 100%;height:60px">
                <Input v-model="addformbase.speciation" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('danwei')" style="width: 100%;height:60px" prop="unitId">
                <Select v-model="addformbase.unitId" filterable>
                  <Option
                    v-for="item in unitList"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.companyName }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('shuliang')" style="width: 100%;height:60px">
                <InputNumber :min="0" v-model="addformbase.amount" style="width: 100%"></InputNumber>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('danjia')" style="width: 100%;height:60px" prop="unitPrice">
                <Input v-model="addformbase.unitPrice" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('jiazhi')" style="width: 100%;height:60px">
                <Input v-model="allPrice" readonly/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('canzhilv')" style="width: 100%;height:60px" prop="depreciationRate">
                <InputNumber :min="0" :max="1" :step="0.1" v-model="addformbase.depreciationRate" style="width: 100%"></InputNumber>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('nianzhejiuzijin')" style="width: 100%;height:60px">
                <Input v-model="depreciationPrice" readonly/>
              </FormItem>
            </Col>
            <!-- <Col span="12">
              <FormItem :label="$t('baoguanzuzhi')" style="width: 100%;height:60px">
                <Button @click="selectOrg(4)" style="width:100%;">{{ $t('selectorganize') }}</Button>
                <Input type="textarea" v-model="addformbase.manageOrganizeName" readonly/>
              </FormItem>
            </Col> -->
            <Col span="12">
              <FormItem :label="$t('baoguanrenyuan')" style="width: 100%;height:60px">
                <Button @click="selectEmp(4)" style="width:100%;">{{ $t('selectemp') }}</Button>
                <Input type="textarea" v-model="addformbase.manageEmpName" readonly/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('shiyongquanxian')" style="width: 100%;height:60px">
                <Input v-model="addformbase.serviceLife">
                  <span slot="append" style="width: 70px">{{ $t('day') }}</span>
                </Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('cunfnagdidian')" style="width: 100%;height:60px">
                <Select v-model="addformbase.storageId" filterable>
                  <Option
                    v-for="item in locationList"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.storageLocation }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('gouzhiriqi')" style="width: 100%;height:60px">
                <DatePicker
                  v-model="addformbase.purchaseTimeStr"
                  :options="options"
                  type="date"
                  placeholder="Select date"
                  style="width: 100%"
                  @on-change="selectDate"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('dengjiriqi')" style="width: 100%;height:60px">
                <DatePicker
                  v-model="addformbase.registrationTimeStr"
                  type="date"
                  placeholder="Select date"
                  style="width: 100%"
                  @on-change="selectDate2"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem :label="$t('Remark')" style="width: 100%;height:60px">
                <Input type="textarea" v-model="addformbase.remarks" />
              </FormItem>
            </Col>
          </Row>
          <!-- <FormItem :label="$t('glqx')">
                        <div style="display:flex;">
                          <div style="padding:8px;">
                            <Button @click="selectOrg(4)" style="width:100%;">选择组织</Button>
                            <Input type="textarea" v-model="addformbase.manageOrganizeName" readonly/>
                          </div>
                          <div style="padding:8px;">
                            <Button @click="selectPost(4)" style="width:100%;">选择岗位</Button>
                            <Input type="textarea" v-model="addformbase.managePostName" readonly/>
                          </div>
                          <div style="padding:8px;">
                            <Button @click="selectEmp(4)" style="width:100%;">选择人员</Button>
                            <Input type="textarea" v-model="addformbase.manageEmpName" readonly/>
                          </div>
                        </div>
                    </FormItem> -->
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
import { classification } from '@/api/classification';
import { numSetting } from '@/api/numSetting';
import {
  unitOfMeasure
} from '@/api/unitOfMeasure';
import {
  storage
} from '@/api/storageLocation';
const defaultForm = {
  'amount': 0,
  'assetName': null,
  'assetNum': null,
  'classifyId': null,
  'custodiansId': null,
  'depreciationRate': 0,
  'organizationId': null,
  'purchaseTime': null,
  'registrationTime': null,
  'remarks': null,
  'serviceLife': null,
  'speciation': null,
  'storageId': null,
  'unitId': null,
  'unitPrice': 0
};
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
      addformbase: Object.assign({}, defaultForm),
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
        ]
        // depreciationRate: [
        //   {
        //     required: true,
        //     message: 'The depreciationRate cannot be empty',
        //     trigger: 'change'
        //   }
        // ]
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
      isrequireNum: false,
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
      this.addformbase.classifyId = this.addformbase.parentClassifyId[1];
      this.addformbase.classifyParentId = this.addformbase.parentClassifyId.join(',');
      this.addformbase.custodiansId = this.addformbase.manageEmp;
      // this.addformbase.organizationId = this.addformbase.manageOrganize;
      this.$refs['form'].validate(valid => {
        if (valid) {
          assetManage.addstorage(this.addformbase).then(res => {
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
