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
              <Select v-model="addformbase.important" style="width: 500px" size="large">
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
          <ListItem v-for="(item,index) in formList" :key="index">
            <div style="padding: 10px 60px; width: 300px">
              <h3>{{ item.label }}</h3>
            </div>
            <div>
              <Input
                style="width: 500px"
                v-model="addformbase.applyPersonName"
                readonly
                size="large"
                placeholder="large size"
                @click.native="selectemp"
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
    this.getEditLabel();
  },
  computed: {
    myheigth () {
      return window.innerHeight - '240' + 'px';
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
    const validatePass2 = (rule, value, callback) => {
      if (
        this.addformbase.month === '' &&
        this.addformbase.month === null &&
        this.addformbase.month === undefined
      ) {
        callback(new Error('Please enter your month'));
      } else {
        callback();
      }
    };
    const validatePass3 = (rule, value, callback) => {
      if (
        this.addformbase.organizationOaName === '' &&
        this.addformbase.organizationOaName === null &&
        this.addformbase.organizationOaName === undefined
      ) {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    const validatePass4 = (rule, value, callback) => {
      if (
        this.addformbase.empList === '' &&
        this.addformbase.empList === null &&
        this.addformbase.empList === undefined
      ) {
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
        picPath: '',
        organizeName: ''
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: 'The title cannot be empty',
            trigger: 'blur'
          }
        ],
        payDate: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        organizationOa: [
          { required: true, validator: validatePass3, trigger: 'blur' }
        ],
        personnel: [
          { required: true, validator: validatePass4, trigger: 'blur' }
        ]
      },
      cityList: [
        { value: 1, label: '重要' },
        { value: 2, label: '一般' },
        { value: 3, label: '不重要' }
      ],
      // 新建员工弹窗
      visiable_emp: false,
      formList: []
    };
  },
  methods: {
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
      console.log('res=============', result);
      this.addformbase.organizeName = name;
      this.addformbase.organizeId = id;
    },
    LinktoPic () {
      console.log(this.addformbase.picPath);
      if (this.addformbase.picPath !== '') {
        window.open(this.addformbase.picPath);
      }
    },
    mysuccess (response, file, fileList) {
      let id = response.data.content.picId;
      let picIds = response.data.content.picId;
      // picIds.push(response.data.content.picId);
      let picapath = response.data.content.picPath[0];
      console.log('picIds===============', picIds, response.data.content);
      this.$nextTick(() => {
        this.addformbase.picPath = picapath;
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
      console.log(this.addformbase);
      this.addformbase.createId = this.$store.state.user.userLoginInfo.userId;
      console.log('this.addformbase===========', this.addformbase);
      salaryjudgeApi.addapproveApplication(this.addformbase).then((res) => {
        if (res.ret === 200) {
          this.$emit('updateStat', false);
          this.$Message.success(res.msg);
          this.modal_loading = false;
        } else {
          this.$Message.success(res.msg);
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
