<template>
  <div>
    <div>
      <Card dis-hover class="add">
        <h2 slot="title" style="text-align: center">薪酬发放申请审批单</h2>
        <List
          ref="listDom"
          border
          size="large"
          :style="{
            height: myheigth,
            overflow: 'auto',
          }"
        >
          <ListItem>
            <div style="padding: 10px 60px; width: 300px">
              <h3>已选审批名称</h3>
            </div>
            <div>
              <Input
                style="width: 500px"
                v-model="selectName"
                readonly
                size="large"
                placeholder="large size"
              />
            </div>
          </ListItem>
          <ListItem>
            <div style="padding: 10px 60px; width: 300px">
              <h3>流程编号</h3>
            </div>
            <div>
              <Input
                style="width: 500px"
                v-model="receiptNumber"
                readonly
                size="large"
                placeholder="large size"
              />
            </div>
          </ListItem>
          <ListItem>
            <div style="padding: 10px 60px; width: 300px">
              <h3>重要等级</h3>
            </div>
            <div>
              <Select
                v-model="addformbase.important"
                style="width: 500px"
                size="large"
              >
                <Option
                  v-for="item in cityList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
          </ListItem>
          <!-- 测试 -->
          <ListItem v-for="(item, index) in formList" :key="index">
            <div style="padding: 10px 60px; width: 300px">
              <h3>{{ item.label }}</h3>
            </div>
            <div>
              <Input
                v-if="item.value === 'applyPersonId'"
                style="width: 500px"
                v-model="addformbase.applyPersonName"
                readonly
                size="large"
                placeholder="选择内容"
              />
              <Cascader
                v-else-if="item.value === 'organizeId'"
                style="width: 500px"
                size="large"
                :data="orgValue"
                v-model="addformbase.actuallyOrganizeId"
                filterable
                change-on-select
                @on-change="getSelectValue"
              ></Cascader>
              <Input
                v-else
                style="width: 500px"
                v-model="addformbase[item.value]"
                readonly
                size="large"
                placeholder="选择内容"
              />
            </div>
          </ListItem>
          <!-- end -->
          <ListItem>
            <div style="padding: 10px 60px; width: 300px"><h3>附件</h3></div>
            <div>
              <Input
                style="width: 500px"
                size="large"
                readonly
                v-model="addformbase.picPath"
                placeholder="附件地址"
                @click.native="LinktoPic"
              >
                <Upload
                  :action="myupLoadUrl"
                  :data="{ type: 3 }"
                  slot="append"
                  :on-success="mysuccess"
                >
                  <Button icon="ios-cloud-upload-outline">上传附件</Button>
                </Upload>
              </Input>
            </div>
          </ListItem>
          <ListItem style="flex-wrap: wrap;">
            <div style="padding: 10px 60px; width: 300px"><h3>薪酬明细</h3></div>
            <div>
            <Table :columns="columns" :data="data" max-height="500" size="small" style="width:1000px;">
              <template slot-scope="scope" slot="personName">
                <span type="text"> {{ scope.row.empName }} </span>
              </template>
              <template slot-scope="scope" slot="organizationOaName">
                <span>{{ scope.row.organizeName }}</span>
              </template>
              <template slot-scope="scope" slot="yearAndMonth">
                <span style="width: 180px">{{ scope.row.yearAndMonth }}</span>
              </template>
              <template slot-scope="scope" slot="grantDate">
                <span style="width: 180px">{{ scope.row.grantDate }}</span>
              </template>
              <template slot-scope="scope" slot="basicAccumulationFund">
                <span>{{ scope.row.basicAccumulationFund.basicMoney }}</span>
              </template>
              <template slot-scope="scope" slot="basicSocialSecurity">
                <span>{{ scope.row.basicSocialSecurity.basicMoney }}</span>
              </template>
            </Table>
            </div>
          </ListItem>
        </List>
        <div class="button-warp">
          <div class="button-group">
            <Button
              style="margin-right: 15px"
              type="primary"
              size="large"
              :loading="modal_loading"
              @click="handsave"
              >{{ $t("salaryjudge_view.submitForApproval") }}</Button
            >
            <Button type="warning" style="margin-right: 15px" size="large" @click="cancel">{{
              $t("cgx")
            }}</Button>
            <Button type="error" size="large" @click="cancel">{{
              $t("Close")
            }}</Button>
          </div>
        </div>
      </Card>
    </div>
    <!-- 选择申请人 -->
    <addempSingle :modalstat="visiable" @updateStat="updateStat"></addempSingle>
  </div>
</template>
<script>
import { salaryjudgeApi } from '@/api/salaryjudge';
import { organization } from '@/api/organization';
import { FlowApi } from '@/api/flow';
import addempSingle from './components/addemp_single/modal';
import { utils } from '@/lib/util';
export default {
  name: 'process',
  components: {
    addempSingle
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    calcinfo: null
  },
  created () {},
  mounted () {
    if (!this.$store.state.user.transInfo.id) {
      this.$router.go(-1);
      this.$router.closeCurrentPage();
    } else {
      this.addformbase = Object.assign(
        this.addformbase,
        this.$store.state.user.transInfo
      );
      this.getOrgValue();
      console.log(this.addformbase);
    }
    this.getEditLabel();
  },
  computed: {
    myheigth () {
      return window.innerHeight - 240 + 'px';
    },
    receiptNumber () {
      const str = utils.getDateStr(0, 'receipt');
      console.log(utils.getDateStr(0, 'YMDHM'));
      return `${this.$route.query.receiptLabel}${this.$store.state.user.userLoginInfo.nickName}${str}`;
    }
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    let baseUrl = process.env.VUE_APP_URL;
    return {
      myupLoadUrl: baseUrl + '/upload/uploadpic',
      visiable: false,
      isShowTree: false,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {
        important: 1,
        actuallyOrganizeId: [],
        applyPersonId: this.$store.state.user.userLoginInfo.userId,
        applyPersonName: this.$store.state.user.userLoginInfo.nickName
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: 'The title cannot be empty',
            trigger: 'blur'
          }
        ]
      },
      cityList: [
        { value: 1, label: '重要' },
        { value: 2, label: '一般' },
        { value: 3, label: '不重要' }
      ],
      // 新建员工弹窗
      visiable_emp: false,
      formList: [],
      selectName: this.$store.state.user.transInfo.title,
      columns: [
        {
          title: this.$t('usermanage_view.userName'),
          width: '200',
          slot: 'personName',
          fixed: 'left'
        },
        {
          title: this.$t('usermanage_view.Organization'),
          slot: 'organizationOaName',
          fixed: 'left'
        },
        {
          title: '公积金基数',
          slot: 'basicAccumulationFund'
        },
        {
          title: '社保基数',
          slot: 'basicSocialSecurity'
        },
        {
          title: '发薪日期',
          slot: 'yearAndMonth'
        },
        {
          title: '薪酬日期',
          key: 'grantDate'
        },
        {
          title: this.$t('salaryEntry_view.confirmStatus'),
          key: 'confirmStat',
          width: '100',
          render: (h, params) => {
            if (params.row.confirmStat === 0) {
              return h(
                'span',
                {
                  style: {
                    color: '#ed4014'
                  }
                },
                this.$t('no')
              );
            } else {
              return h(
                'span',
                {
                  style: {
                    color: '#ed4014'
                  }
                },
                this.$t('yes')
              );
            }
          }
        }
      ],
      data: this.$store.state.user.transInfo.empSalaryVos,
      orgValue: [],
      selectOrg: ''
    };
  },
  methods: {
    getSelectValue (val, selectedData) {
      const length = selectedData.length;
      this.selectOrg = selectedData[length - 1].label;
      console.log(this.selectOrg);
    },
    deepLoop (list) {
      for (let i = 0; i < list.length; i++) {
        list[i].label = list[i].organizeName;
        list[i].value = list[i].id;
        if (list[i].children.length > 0) {
          this.deepLoop(list[i].children);
        }
      }
    },
    getOrgValue () {
      organization.organizationlist().then((res) => {
        console.log(res.data.content);
        this.deepLoop(res.data.content);
        this.orgValue = res.data.content;
      });
    },
    getEditLabel () {
      let process = [];
      const data = this.$route.query.receiptType;
      FlowApi.getFlowContent(data).then((res) => {
        let data = res.data.content;
        let data2 = data.split(',');
        for (let i = 0; i < data2.length; i++) {
          let data3 = data2[i].split(':');
          const temp = {
            label: data3[1],
            value: data3[0]
          };
          process.push(temp);
        }
        this.formList = process;
      });
    },
    async getorg () {
      const result = await organization.organizationlist().then((res) => {
        return res.data.content[0];
      });
      let name = result.organizeName;
      let id = result.id;
      this.addformbase.organizeName = name;
      this.addformbase.organizeId = id;
    },
    LinktoPic (e) {
      console.log(e, '123', e.target);
      if (this.addformbase.picPath) {
        window.open(this.addformbase.picPath);
      }
    },
    mysuccess (response, file, fileList) {
      let id = response.data.content.picId;
      let picIds = response.data.content.picId;
      let picapath = response.data.content.picPath[0];
      this.$nextTick(() => {
        this.$set(this.addformbase, 'picPath', picapath);
        this.addformbase.picIds = picIds;
        console.log(this.addformbase);
      });
    },
    selectemp () {
      console.log(1231231231231);
      this.visiable = true;
    },
    updateStat (state, row) {
      this.visiable = state;
      if (row) {
        this.addformbase.applyPersonId = row.id;
        this.addformbase.applyPersonName = row.personName;
      }
    },
    showmytime (e) {
      this.addformbase.salaryDate = e;
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
    updateStat_emp (stat, empList) {
      this.visiable_emp = stat;
      this.addformbase.empList = empList.names;
      console.log('names========>', this.addformbase.empList);
      this.addformbase.empListIds = empList.empIds;
      console.log('empIds===============>', this.addformbase.empListIds);
      console.log('empList==================================>', empList);
    },
    showemp () {
      console.log('新建员工');
      console.log(typeof this.addformbase.empListIds, this.addformbase);
      if (
        typeof this.addformbase.empListIds === 'string' &&
        this.addformbase.empListIds !== null
      ) {
        this.addformbase.empListIds.split(',');
      }
      this.visiable_emp = true;
    },
    // 选择部门或者成员
    selectDepartmentOrEmployee (department) {
      console.log('department==============>', department);
    },
    cancel () {
      this.$router.go(-1);
    },
    reset () {
      this.addformbase = {
        picPath: '',
        organizeName: ''
      };
    },
    handsave () {
      this.modal_loading = true;
      if (this.$store.state.user.transInfo.empSalaryVos.length === 0) {
        this.$Message.error('此单据无审批数据');
        this.modal_loading = false;
        return false;
      }
      if (this.addformbase.actuallyOrganizeId.length === 0) {
        this.$Message.error('请选择发放单位');
        this.modal_loading = false;
        return false;
      }
      this.addformbase.organizeId = this.addformbase.actuallyOrganizeId[this.addformbase.actuallyOrganizeId.length - 1];
      this.addformbase.createId = this.$store.state.user.userLoginInfo.userId;
      this.addformbase.flowNumber = this.receiptNumber;
      this.addformbase.salaryJudgeId = this.addformbase.id;
      salaryjudgeApi.addapproveApplication(this.addformbase).then((res) => {
        if (res.ret === 200) {
          console.log('res======================', res.data.receiptId, 'color:red;');
          this.addformbase.receiptId = res.data.receiptId;
          this.addformbase.initiatePersonId = this.$store.state.user.userLoginInfo.userId;
          this.addformbase.flowCategory = this.$route.query.flowCategory;
          this.addformbase.flowId = this.$route.query.flowId;
          FlowApi.addFlowRecord(this.addformbase).then(res => {
            if (res.data.ret === 200) {
              this.$Message.success(res.msg);
              this.modal_loading = false;
              this.$store.commit('setTransInfo', '');
              this.$router.go(-1);
              this.$router.closeCurrentPage();
            } else {
              this.$Message.error(res.msg);
              this.modal_loading = false;
            }
          });
        } else {
          this.$Message.error(res.msg);
          this.modal_loading = false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.add /deep/ .ivu-divider-dashed {
  border-top: 1px dashed #ccc;
}
/deep/ .ivu-card-head {
  background-color: #fff;
}
.add /deep/ .ivu-input-group-large > .ivu-input-group-append {
  padding: 0;
}
.add /deep/ .ivu-upload-list {
  display: none;
}
.button-warp {
  box-sizing: border-box;
  text-align: center;
  height: 75px;
  padding: 0 20px;
  position: fixed;
  bottom: 0;
  right: 0;
  width: calc(~"100% - 254px");
  z-index: 9;
  .button-group {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    -webkit-box-shadow: 0 0 4px hsla(0, 0%, 78.4%, 0.4);
    box-shadow: 0 0 4px hsla(0, 0%, 78.4%, 0.4);
    height: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
