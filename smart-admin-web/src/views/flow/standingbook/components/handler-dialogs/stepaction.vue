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
      <span>流程步骤</span>
    </div>
    <div>
      <Card dis-hover>
        <Table
          max-height="500"
          :columns="columns"
          :data="data"
          :loading="loading"
        ></Table>
      </Card>
    </div>
    <div slot="footer">
      <ButtonGroup>
        <Button type="error" size="large" @click="cancel">{{
          $t("Close")
        }}</Button>
      </ButtonGroup>
    </div>
    <!-- 新建员工弹窗 -->
    <addemp
      :modalstat="visiable_emp"
      :type="mytype"
      :memberId="addformbase"
      :actionInfo="actionInfo"
      @updateStat="updateStat_emp"
    ></addemp>
    <!-- 新建结束============= -->
  </Modal>
</template>
<script>
import { distribute } from '@/api/distribute';
import addemp from '../addemp_more/modal';
import { utils } from '@/lib/util';
import { unDoFlowApi } from '@/api/unDoFlow';
export default {
  name: 'addGong',
  components: {
    addemp
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    actionInfoId: null
  },
  created () {},
  mounted () {
  },
  data () {
    return {
      actionInfo: null,
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
        title: [
          {
            required: true,
            message: 'The title cannot be empty',
            trigger: 'blur'
          }
        ]
      },
      // 新建员工弹窗
      visiable_emp: false,
      columns: [
        {
          title: this.$t('bzmc'),
          key: 'actionName',
          width: '100'
          // fixed: 'left'
        },
        {
          title: this.$t('zt'),
          key: 'stat',
          width: '100',
          render: (h, params) => {
            return h('div', params.row.stat === 1 ? this.$t('wbl') : this.$t('ybl'));
          }
          // fixed: 'left'
        },
        {
          title: this.$t('jbrsj'),
          width: '150',
          render: (h, params) => {
            let date = '';
            if (params.row.handleDate) {
              const temp = new Date(params.row.handleDate);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('div', [
              h(
                'span',
                {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    title: params.row.actualPersonName ? `${params.row.actualPersonName}/${date}` : '无'
                  }
                },
                params.row.actualPersonName ? `${params.row.actualPersonName}/${date}` : '无'
              )
            ]);
          }
        },
        {
          title: this.$t('cxsc'),
          key: 'stat',
          render: (h, params) => {
            let day = '';
            if (params.row.handleDate) {
              const myDate = this.$moment(params.row.handleDate);
              const myDate2 = this.$moment(params.row.createDate);
              day = myDate.diff(myDate2,'hours') === 0 ? `${myDate.diff(myDate2,'minutes')}分钟` : `${myDate.diff(myDate2,'hours')}时`
            } else {
              const between = new Date().getTime() - params.row.createDate;
              const myDate = this.$moment(new Date().getTime());
              const myDate2 = this.$moment(params.row.createDate);
              day = myDate.diff(myDate2,'hours') === 0 ? `${myDate.diff(myDate2,'minutes')}分钟` : `${myDate.diff(myDate2,'hours')}时`
            }
            return h('div', `${day}`);
          }
        },
        {
          title: this.$t('blly'),
          key: 'handleResult'
        },
        {
          title: this.$t('action'),
          key: 'action',
          width: '100',
          align: 'center',
          render: (h, params) => {
            if (params.row.stat === 1) {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      size: 'small',
                      type: 'text'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.handlerHurry(params.row.index);
                      }
                    }
                  },
                  this.$t('cb')
                )
              ]);
            }
          }
        }
      ],
      data: [],
      loading: false
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        this.gettoday();
        unDoFlowApi.getFlowRecordDetail(this.actionInfoId).then((res) => {
          this.actionInfo = res.data.content;
          this.data = this.actionInfo[0].handleRecordVos;
        });
      }
    }
  },
  methods: {
    handlerHurry () {
      this.$Message.success('已提醒当前步骤处理人');
    },
    getmytime (e) {
      this.addformbase.effectiveDate = e;
    },
    getmytime2 (e) {
      this.addformbase.deadDate = e;
    },
    gettoday () {
      let myDate = new Date(); // 获取当前年份(2位)
      let year = myDate.getFullYear(); // 获取完整的年份(4位,1970-????)
      let month = myDate.getMonth(); // 获取当前月份(0-11,0代表1月)
      if (month + 1 < 10) {
        month = '0' + (month + 1);
      }
      let day = myDate.getDate(); // 获取当前日(1-31)
      if (day < 10) {
        day = '0' + day;
      }
      let dayNow = year + '-' + month + '-' + day;
      this.addformbase.effectiveDate = dayNow;
      this.addformbase.effectiveTime = dayNow;
    },
    updateStat_emp (stat, empList, valueList, type) {
      this.visiable_emp = stat;
      console.log('empList==================', empList);
      if (empList) {
        const ids = empList.empIds.split(',');
        const data = valueList.map((item, index) => {
          return {
            sendPersonName: this.$store.state.user.userLoginInfo.nickName,
            distributionPersonName: item,
            distributionPersonId: Number(ids[index]),
            distributionDate: null,
            reviewContent: null,
            stat: 1
          };
        });
        const data2 = this._.unionWith(this.data, data, (arrVal, othVal) => { return arrVal.distributionPersonId === othVal.distributionPersonId; });
        console.log(data2);
        this.data = data2;
        this.addformbase.checkPerson = empList.empIds;
      }
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
      if (
        typeof this.addformbase.testHandle === 'string' &&
        this.addformbase.testHandle !== null
      ) {
        this.addformbase.testHandle.split(',');
      }
      this.mytype = 1;
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
      console.log(this.actionInfo);
      const temp = this.data.map(item => {
        if (!item.sendPersonId) {
          return item;
        }
      });
      const data = {
        flowRecordId: this.actionInfo[0].handleRecordVos[0].flowRecordId,
        handleRecordId: this.actionInfo[0].handleRecordVos[0].id,
        actionId: this.actionInfo[0].handleRecordVos[0].actionId,
        sendPersonId: this.$store.state.user.userLoginInfo.userId,
        distributionPersonIds: temp.length > 0 && temp.map(item => {
          return item.distributionPersonId;
        }).join(',')
      };
      distribute.adddistribute(data).then((res) => {
        if (res.ret === 200) {
          this.modal_loading = false;
          this.$emit('updateStat', false);
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
