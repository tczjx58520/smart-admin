<template>
  <Modal
    v-model="mymoadlStat"
    fullscreen
    class="add"
    :closable="false"
    :mask-closable="false"
    :transfer="false"
    :styles="{ top: '10px' }"
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
                disabled
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
              <Input
                v-else-if="item.value === 'organizeId'"
                style="width: 500px"
                size="large"
                readonly
                v-model="addformbase.organizeName"
              ></Input>
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
          <ListItem>
            <div style="padding: 10px 60px; width: 300px">
              <h3 >查看附件</h3>
            </div>
            <div>
              <Button type="text" size="large" @click="view_pic(index)" v-for="(item,index) in Picpath" :key="item.id">{{ `附件${index + 1}` }}</Button>
            </div>
          </ListItem>
          <!-- end -->

        </List>
      </Card>
    </div>
    <div slot="footer">
      <ButtonGroup>
        <!-- <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button> -->
        <!-- <Button size="large" >{{
          $t("lcsj")
        }}</Button> -->
        <Button size="large" @click="handlerprocessSteps">{{
          $t("lcbz")
        }}</Button>
        <Button size="large" >{{
          $t("jrrc")
        }}</Button>
        <Button size="large" @click="handlerEntrust">{{
          $t("wt")
        }}</Button>
        <Button size="large" @click="handlerstepaction(3)">{{
          $t("th")
        }}</Button>
        <Button size="large" @click="handlerDistribute">{{
          $t("ff")
        }}</Button>
        <Button size="large" @click="handlerCountersign">{{
          $t("hq")
        }}</Button>
        <Button size="large" @click="handlerstepaction(4)">{{
          $t("jj")
        }}</Button>
        <Button size="large" >{{
          $t("tjfj")
        }}</Button>
        <Button size="large" @click="handlerstepaction(5)">{{
          $t("blyj")
        }}</Button>
        <Button size="large" @click="handlerstepaction(2)">{{
          stepName
        }}</Button>
        <Button type="error" size="large" @click="cancel">{{
          $t("Close")
        }}</Button>
      </ButtonGroup>
    </div>
    <!-- 各种办理弹窗 -->
    <countersign :modalstat="visiable_countersign" :actionInfo="actionInfo" @updateStat="updateStat_countersign" />
    <entrust :modalstat="visiable_entrust" :actionInfo="actionInfo" @updateStat="updateStat_entrust" />
    <distribute :modalstat="visiable_distribute" :actionInfo="actionInfo" @updateStat="updateStat_distribute" />
    <processSteps :modalstat="visiable_processSteps" :actionInfo="actionInfo" @updateStat="updateStat_processSteps" />
    <stepaction :modalstat="visiable_stepaction" :actionInfo="actionInfo" :stat="stat" @updateStat="updateStat_stepaction" />
  </Modal>
</template>
<script>
import { unDoFlowApi } from '@/api/unDoFlow';
import { FlowApi } from '@/api/flow';
import { organization } from '@/api/organization';
import { utils } from '@/lib/util';
import countersign from '../handler-dialogs/countersign';
import entrust from '../handler-dialogs/entrust';
import distribute from '../handler-dialogs/distribute';
import processSteps from '../handler-dialogs/processSteps';
import stepaction from '../handler-dialogs/stepaction';
export default {
  name: 'viewtaskDetail',
  components: {
    countersign,
    entrust,
    distribute,
    processSteps,
    stepaction
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null
  },
  created () {},
  mounted () {},
  data () {
    return {
      // ===============================>
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {},
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
      visiable_countersign: false,
      visiable_entrust: false,
      visiable_distribute: false,
      visiable_processSteps: false,
      visiable_stepaction: false,
      actionInfo: null,
      stepName: '',
      stat: null
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
        this.getList(this.editinfo.flowRecordId);
      }
    }
  },
  methods: {
    handlerCountersign () {
      this.visiable_countersign = true;
    },
    handlerEntrust () {
      this.visiable_entrust = true;
    },
    handlerDistribute () {
      this.visiable_distribute = true;
    },
    handlerprocessSteps () {
      this.visiable_processSteps = true;
    },
    handlerstepaction (stat) {
      this.stat = stat;
      this.visiable_stepaction = true;
    },
    updateStat_countersign (stat) {
      this.visiable_countersign = stat;
    },
    updateStat_entrust (stat) {
      this.visiable_entrust = stat;
    },
    updateStat_distribute (stat) {
      this.visiable_distribute = stat;
    },
    updateStat_processSteps (stat) {
      this.visiable_processSteps = stat;
    },
    updateStat_stepaction (stat) {
      this.visiable_stepaction = stat;
    },
    getDate (val, ymd) {
      const date = new Date(val);
      return utils.getDate(date, ymd);
    },
    getSelectValue (val, selectedData) {
      console.log(val);
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
        this.addformbase = res.data.receipt[0];
        this.Picpath = res.data.content[0].picPaths;
        this.type = res.data.content[0].receiptType;
        this.creatDate = res.data.content[0].initiateDate;
        this.data1 = res.data.content[0].distributionRecordVos;
        this.data2 = res.data.content[0].countersignRecordVos;
        this.actionInfo = res.data.content;
        this.stepName = this.actionInfo[0].handleRecordVos[0].actionName;
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
      this.addformbase.createId = this.$store.state.user.userLoginInfo.userId;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          unDoFlowApi.getFlowRecordDetail(this.addformbase).then((res) => {
            if (res.ret === 200) {
              this.modal_loading = false;
              this.$emit('updateStat', false);
              this.$Message.success(res.msg);
              this.reset();
            }
          });
        } else {
          this.$Message.error('Fail!');
          this.modal_loading = false;
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
