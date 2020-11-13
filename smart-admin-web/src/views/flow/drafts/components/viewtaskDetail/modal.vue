<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="1024"
    fullscreen
    :closable="false"
    :mask-closable="false"
    :transfer="false"
  >
    <div slot="header" style="text-align: center; color: #fff">
      <span>{{ this.editinfo && this.editinfo.flowNumber  }}</span>
    </div>
    <div>
      <Card dis-hover>
        <div style="text-align: center; color: #000">
          <h2> {{ type | typeFilter }} </h2>
        </div>
        <Divider />
        <div style="text-align:right;">
          创建日期 {{ getDate(creatDate, 'YMDHMS') }}
        </div>
        <div style="display: flex; align-items: center">
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
        <List
          ref="listDom"
          border
          size="large"
        >
          <ListItem>
            <div style="padding: 10px 60px; width: 300px">
              <h3>流程编号</h3>
            </div>
            <div>
              <Input
                style="width: 500px"
                v-model="addformbase.flowNumber"
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
                v-model="addformbase.importanceLevel"
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
                size="large"
                placeholder="选择内容"
              />
            </div>
          </ListItem>
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
                  :data="{ type: 4 }"
                  slot="append"
                  :on-success="mysuccess"
                >
                  <Button icon="ios-cloud-upload-outline">上传附件</Button>
                </Upload>
              </Input>
            </div>
          </ListItem>
          <!-- end -->
        </List>
        <Divider />
      </Card>
    </div>
    <div slot="footer">
      <ButtonGroup>
        <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button>
        <!-- <Button size="large" @click="handlerprocessSteps">{{
          $t("lcbz")
        }}</Button>
        <Button size="large" @click="handlerView">{{
          $t("pyyj")
        }}</Button> -->
        <Button type="error" size="large" @click="cancel">{{
          $t("Close")
        }}</Button>
      </ButtonGroup>
    </div>
    <processSteps :modalstat="visiable_processSteps" :actionInfo="actionInfo" @updateStat="updateStat_processSteps" />
    <stepaction :modalstat="visiable_stepaction" :distributionRecordId="distributionRecordId" :actionInfo="actionInfo" @updateStat="updateStat_stepaction" />
  </Modal>
</template>
<script>
import { unDoFlowApi } from '@/api/unDoFlow';
import { standingbook } from '@/api/standingbook';
import { FlowApi } from '@/api/flow';
import { organization } from '@/api/organization';
import { utils } from '@/lib/util';
import processSteps from '../handler-dialogs/processSteps';
import stepaction from '../handler-dialogs/stepaction';
export default {
  name: 'viewtaskDetail',
  components: {
    processSteps,
    stepaction
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null,
    distributionRecordId: null
  },
  created () {},
  mounted () {
    this.getOrgValue();
  },
  data () {
    let baseUrl = process.env.VUE_APP_URL;
    return {
      orgValue: [],
      actionInfo: null,
      visiable_processSteps: false,
      visiable_stepaction: false,
      GongList: [],
      SheList: [],
      itemsList: [],
      allitems: [],
      // ===============================>
      myupLoadUrl: baseUrl + '/upload/uploadpic',
      socialSecurity: true,
      accumulationFund: true,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {},
      // 新建员工弹窗
      visiable_emp: false,
      formList: [],
      cityList: [
        { value: 1, label: '重要' },
        { value: 2, label: '一般' },
        { value: 3, label: '不重要' }
      ],
      Picpath: [],
      type: 1,
      creatDate: '',
      loading: false,
      loading2: false,
      columns1: [
        {
          title: '分发人',
          key: 'sendPersonName'
        },
        {
          title: '评阅人',
          key: 'distributionPersonName'
        },
        {
          title: '所属组织',
          key: 'distributionOrganizeName'
        },
        {
          title: '评阅内容',
          key: 'reviewContent'
        },
        {
          title: '评阅日期',
          key: 'sendDate',
          render: (h, params) => {
            console.log(params.row.sendDate);
            const mydate = new Date(params.row.sendDate);
            return h('span', utils.getDate(mydate, 'YMDHMS'));
          }
        }
      ],
      data1: [],
      columns2: [
        {
          title: '分发人',
          key: 'sendPersonName'
        },
        {
          title: '会签人',
          key: 'signPersonName'
        },
        {
          title: '所属组织',
          key: 'signOrganizeName'
        },
        {
          title: '会签意见',
          key: 'signOpinion'
        },
        {
          title: '会签时间',
          key: 'signDate',
          render: (h, params) => {
            console.log(params.row.signDate);
            const mydate = new Date(params.row.signDate);
            return h('span', utils.getDate(mydate, 'YMDHMS'));
          }
        }
      ],
      data2: [],
      oldId: null
    };
  },
  filters: {
    typeFilter (val) {
      const map = {
        1: '薪酬审批单'
      };
      return map[val];
    }
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        this.getList(this.editinfo.id);
      }
    }
  },
  methods: {
    searchId () {
      const arry = [];
      this.searchLoop(this.orgValue, arry);
    },
    searchLoop (list, arry) {
      for (let i = 0; i < list.length; i++) {
        arry.unshift(list[i].id);
        if (list[i].id === this.actionInfo[0].flowCategory) {
          return;
        }
        if (list[i].children.length > 0) {
          this.searchLoop(list[i].children);
        }
      }
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
    updateStat_processSteps (stat) {
      this.visiable_processSteps = stat;
    },
    updateStat_stepaction (stat) {
      this.visiable_stepaction = stat;
    },
    handlerView () {
      this.visiable_stepaction = true;
    },
    handlerprocessSteps () {
      this.visiable_processSteps = true;
    },
    getDate (val, ymd) {
      const date = new Date(val);
      return utils.getDate(date, ymd);
    },
    getSelectValue (val, selectedData) {
      console.log(val);
    },
    getEditLabel (value) {
      let process = [];
      FlowApi.getFlowContent(value).then((res) => {
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
    async getList (id) {
      let data = {};
      data = id;
      let process = null;
      unDoFlowApi.getFlowRecordDetail(data).then((res) => {
        console.log(res.data.content[0].receiptType);
        this.addformbase = res.data.receipt[0];
        this.Picpath = res.data.content[0].picPaths;
        this.type = res.data.content[0].receiptType;
        this.creatDate = res.data.content[0].initiateDate;
        this.actionInfo = res.data.content;
        if (this.addformbase.organizeIds) {
          this.addformbase.actuallyOrganizeId = this.addformbase.organizeIds.split(',').map(Number);
        } else {
          this.addformbase.actuallyOrganizeId = [];
        }
        if (res.data.content[0].picPaths.length > 0) {
          this.addformbase.picPath = res.data.content[0].picPaths[0].picPath;
          this.picIds = res.data.content[0].picPaths[0].id;
          this.oldId = res.data.content[0].picPaths[0].id;
        }
        // this.data1 = res.data.content[0].distributionRecordVos;
        // this.data2 = res.data.content[0].countersignRecordVos;
        this.getEditLabel(res.data.content[0].receiptType);
      });
    },
    cancel () {
      this.reset();
      this.$emit('updateStat', false);
    },
    reset () {
      for (let key in this.addformbase) {
        delete this.addformbase[key];
      }
    },
    view_pic (index) {
      window.open(this.Picpath[index].picPath);
    },
    handsave () {
      this.modal_loading = true;
      console.log(this.addformbase, this.editinfo, this.picIds);
      if (this.addformbase.actuallyOrganizeId.length > 0) {
        this.addformbase.organizeId = this.addformbase.actuallyOrganizeId[this.addformbase.actuallyOrganizeId.length - 1];
        this.addformbase.organizeIds = this.addformbase.actuallyOrganizeId.join(',');
      } else {
        this.addformbase.organizeId = '';
        this.addformbase.organizeIds = '';
      }
      this.editinfo.importanceLevel = this.addformbase.importanceLevel;
      const data = JSON.stringify(this.editinfo);
      const data2 = JSON.stringify(this.addformbase);
      let data3 = null;
      if (this.picIds !== this.oldId) {
        data3 = this.picIds;
      }
      // return false;
      // this.$refs['form'].validate((valid) => {
      //   if (valid) {
      standingbook.updatestandingbook(data, data2, data3).then((res) => {
        if (res.ret === 200) {
          this.modal_loading = false;
          this.$emit('updateStat', false);
          this.$Message.success(res.msg);
          this.reset();
        }
      });
      //   } else {
      //     this.$Message.error('Fail!');
      //     this.modal_loading = false;
      //   }
      // });
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
.add /deep/ .ivu-upload-list {
  display: none;
}
</style>
