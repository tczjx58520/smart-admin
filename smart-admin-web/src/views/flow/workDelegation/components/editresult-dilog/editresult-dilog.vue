<template>
  <Modal
    v-model="mymoadlStat"
    fullscreen
    class="add"
    :closable="false"
    :mask-closable="false"
  >
    <div slot="header" style="text-align: center; color: #fff">
      <span>修改工作委托</span>
    </div>
    <div>
      <Card dis-hover>
        <div style="display: flex">
          <div style="flex: 1">
            <Form
              ref="form"
              :model="addformbase"
              label-position="left"
              :label-width="100"
              :rules="ruleValidate"
            >
              <FormItem :label="$t('wtr')" prop="entrustPersonName">
                <Input v-model="addformbase.entrustPersonName"></Input>
              </FormItem>
              <FormItem :label="$t('bwtr')" prop="entrustedPersonName">
                <Input v-model="addformbase.entrustedPersonName" @click.native="showEmp" readonly></Input>
              </FormItem>
              <FormItem :label="$t('kssj')" prop="beginTimeStr">
                <!-- <Input v-model="addformbase.beginTime"></Input> -->
                <DatePicker v-model="addformbase.beginTimeStr" confirm type="date" placeholder="Select date" @on-change="selectBegin"></DatePicker>
              </FormItem>
              <FormItem :label="$t('jssj')" prop="endTimeStr">
                <!-- <Input v-model="addformbase.endTime"></Input> -->
                <DatePicker v-model="addformbase.endTimeStr" confirm type="date" placeholder="Select date" @on-change="selectEnd"></DatePicker>
              </FormItem>
              <FormItem :label="$t('wtyy')" prop="entrustReason">
                <Input type="textarea" v-model="addformbase.entrustReason"></Input>
              </FormItem>
            </Form>
            <span style="color: #d81920"
              >说明：当结束时间为空的时候代表一直有效否则只在时间范围内有效</span
            >
          </div>
          <div style="flex: 5; padding: 0 48px">
            <List border>
              <template slot="header">
                <Checkbox
                  :indeterminate="indeterminate"
                  :value="checkAll"
                  @click.prevent.native="handleCheckAll(undefined,'all',undefined)"
                  >全选</Checkbox
                >
              </template>
              <ListItem v-for="(item,index) in processLists" :key="item.id">
                <ListItemMeta>
                  <template slot="title">
                    <Checkbox
                      :indeterminate="listitem[index]"
                      :value="checkList[index]"
                      @click.prevent.native="handleCheckAll(item.flowInfoVos,'item',index)"
                      >{{ item.categoryName }}</Checkbox
                    >
                     <Divider />
                  </template>
                  <template slot="description">
                    <CheckboxGroup v-model="checkAllGroup[index]" @on-change="checkAllGroupChange($event,item.flowInfoVos,index)">
                      <Checkbox v-for="items in item.flowInfoVos" :label="items.id" border :key="items.id" >
                        {{  items.flowName  }}
                      </Checkbox>
                    </CheckboxGroup>
                  </template>
                </ListItemMeta>
              </ListItem>
            </List>
          </div>
        </div>
      </Card>
    </div>
    <div slot="footer">
      <ButtonGroup>
        <Button type="primary"
          size="large"
          :loading="modal_loading"
          @click="handsave">{{
          $t("Save")
        }}</Button>
        <Button type="error" size="large" @click="cancel">{{
          $t("Close")
        }}</Button>
      </ButtonGroup>
    </div>
    <!-- 各种办理弹窗 -->
    <addemp :modalstat = "visiable_emp" :memberId="addformbase" @updateStat = "updateStat_emp"/>
  </Modal>
</template>
<script>
import { entrust } from '@/api/entrust';
import { FlowApi } from '@/api/flow';
import { organization } from '@/api/organization';
import { FlowCategoryApi } from '@/api/flowClassification';
import { utils } from '@/lib/util';
import addemp from '../addemp/modal';
export default {
  name: 'viewtaskDetail',
  components: {
    addemp
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
    const validatePass = (rule, value, callback) => {
      if (this.addformbase.beginTimeStr === '' || this.addformbase.beginTimeStr === null || this.addformbase.beginTimeStr === undefined) {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (this.addformbase.entrustedPersonId === '' || this.addformbase.entrustedPersonId === null || this.addformbase.entrustedPersonId === undefined) {
        callback(new Error('Please enter your entrustedPersonName'));
      } else {
        callback();
      }
    };
    return {
      // indeterminate: false,
      // checkAll: false,
      listitem: [],
      checkList: [],
      checkAllGroup: [],
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
      stat: null,
      processLists: [],
      ruleValidate: {
        entrustPersonName: [
          { required: true, message: 'The entrustPersonName cannot be empty', trigger: 'blur' }
        ],
        entrustedPersonName: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        beginTimeStr: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        entrustReason: [
          { required: true, message: 'The entrustReason cannot be empty', trigger: 'blur' }
        ]
      },
      visiable_emp: false
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
    async modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        await this.getProcessList();
        this.addformbase = Object.assign({}, this.editInfo);
        this.addformbase.beginTimeStr = this.addformbase.beginTime;
        this.addformbase.endTimeStr = this.addformbase.endTime;
        this.processLists.map((item, index) => {
          this.$set(this.checkAllGroup, index, []);
        });
        console.log(this.processLists);
        for (let i = 0; i < this.addformbase.flowInfoVos.length; i++) {
          for (let j = 0; j < this.processLists.length; j++) {
            console.log(this.addformbase.flowInfoVos[i].category, this.processLists[j].id);
            if (this.addformbase.flowInfoVos[i].category === this.processLists[j].id) {
              this.checkAllGroup[j].push(this.addformbase.flowInfoVos[i].id);
            }
          }
        }
        console.log(this.checkAllGroup);
      }
    }
    // checkList: {
    //   handler () {
    //     const flag = this.checkList.every(item => {
    //       return item === true;
    //     });
    //     console.log('测试监听===', flag);
    //     this.
    //   },
    //   deep: true
    // }
  },
  computed: {
    indeterminate () {
      console.log(this.checkList);
      const temp = this.checkList.some(item => {
        return item === true;
      });
      let flag = this.checkList.every(item => {
        return item === true;
      });
      if (flag) {
        flag = !flag;
      }
      return (temp && flag);
    },
    checkAll () {
      const flag = this.checkList.every(item => {
        return item === true;
      });
      return flag;
    }
  },
  methods: {
    showEmp () {
      this.visiable_emp = true;
    },
    selectBegin (val, val2) {
      this.addformbase.beginTime = val;
    },
    selectEnd (val, val2) {
      this.addformbase.endTime = val;
    },
    async getProcessList () {
      const listquery = {
        empId: this.$store.state.user.userLoginInfo.userId
      };
      await FlowCategoryApi.getEmpStart(listquery).then(response => {
        this.processLists = response.data.content;
        for (let i = 0; i < this.processLists.length; i++) {
          this.$set(this.listitem, i, false);
          this.$set(this.checkList, i, false);
        }
      });
    },
    checkAllGroupChange (data, parentVal, index) {
      console.log(data);
      if (data.length === parentVal.length) {
        this.$set(this.listitem, index, false);
        this.$set(this.checkList, index, true);
      } else if (data.length > 0) {
        this.$set(this.listitem, index, true);
        this.$set(this.checkList, index, false);
      } else {
        this.$set(this.listitem, index, false);
        this.$set(this.checkList, index, false);
      }
    },
    handleCheckAll (val, type, index) {
      switch (type) {
        case 'item':
          this.handlercheck_item(val, index);
          break;
        case 'all':
          this.handlercheck();
          break;
      }
    },
    handlercheck_item (val, index) {
      if (this.listitem[index]) {
        this.$set(this.checkList, index, false);
      } else {
        this.$set(this.checkList, index, !this.checkList[index]);
      }
      this.listitem[index] = false;
      if (this.checkList[index]) {
        const value = val.map(item => { return item.id; });
        this.$set(this.checkAllGroup, index, value);
      } else {
        this.$set(this.checkAllGroup, index, []);
      }
    },
    handlercheck () {
      console.log(this.checkAll);
      if (this.checkAll) {
        for (let i = 0; i < this.processLists.length; i++) {
          this.$set(this.checkAllGroup, i, []);
          this.$set(this.checkList, i, false);
        }
      } else {
        console.log(this.indeterminate);
        if (this.indeterminate) {
          for (let i = 0; i < this.processLists.length; i++) {
            this.$set(this.checkAllGroup, i, []);
          }
        } else {
          for (let i = 0; i < this.processLists.length; i++) {
            this.$set(this.checkAllGroup, i, []);
            this.$set(this.checkList, i, true);
            for (let j = 0; j < this.processLists[i].flowInfoVos.length; j++) {
              this.checkAllGroup[i].push(this.processLists[i].flowInfoVos[j].id);
            }
          }
        }
      }
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
      // this.addformbase.createId = this.$store.state.user.userLoginInfo.userId;
      console.log(this.addformbase, this.checkAllGroup);
      const arr = this._.flatten(this.checkAllGroup);
      console.log(arr);
      // return false;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const data = {
            id: this.addformbase.id,
            entrustPersonId: this.addformbase.entrustPersonId,
            entrustedPersonId: this.addformbase.entrustedPersonId,
            beginTime: this.addformbase.beginTime,
            endTime: this.addformbase.endTime || '',
            entrustReason: this.addformbase.entrustReason,
            flowIds: arr.join(','),
            stat: 1
          };
          entrust.updateentrustedResult(data).then((res) => {
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
    },
    updateStat_emp (stat, val) {
      this.visiable_emp = stat;
      console.log(val);
      if (val) {
        this.addformbase.entrustedPersonName = val.personName;
        this.addformbase.entrustedPersonId = val.id;
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
