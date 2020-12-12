<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="1040"
    :closable="false"
    :mask-closable="false"
    :transfer="false"
    :styles="{ top: '10px' }"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>选择销假单据</span>
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
        <Table border highlight-row :columns="columns" :data="data" @on-current-change="selectCurrent"></Table>
        <Page
          :current="searchform.pageNum"
          :page-size="searchform.pageSize"
          :page-size-opts="[10, 20, 30, 50, 100]"
          :total="pageTotal"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          show-elevator
          show-sizer
          show-total
          style="margin: 24px 0; text-align: right"
        ></Page>
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
import { attendance } from '@/api/attendance';
import { utils } from '@/lib/util';
export default {
  name: 'selectModal',
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null,
    myvalue: null
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
        this.addformbase.month === '' &&
        this.addformbase.month === null &&
        this.addformbase.month === undefined
      ) {
        callback(new Error('Please enter your month'));
      } else {
        callback();
      }
    };
    return {
      modal_loading: false,
      mymoadlStat: this.modalstat,
      searchform: {
        pageNum: 1,
        pageSize: 10,
        employeeId: this.$store.state.user.userLoginInfo.userId,
      },
      loading: false,
      pageTotal: 0,
      columns: [
        {
          title: this.$t('kqgl.shenqingshijian'),
          key: 'applyTime'
        },
        {
          title: this.$t('kqgl.kaishishijian'),
          key: 'startTime'
        },
        {
          title: this.$t('kqgl.jieshushijian'),
          key: 'endTime'
        },
        {
          title: this.$t('kqgl.shijianleixing'),
          key: 'type',
          render: (h, params) => {
            if (params.row.type === 0) {
              return h('span', this.$t('kqgl.tian'));
            } else if (params.row.type === 1) {
              return h('span', this.$t('kqgl.xiaoshi'));
            }
          }
        },
        {
          title: this.$t('kqgl.qingjiashijian'),
          key: 'totalTime'
        },
        {
          title: this.$t('kqgl.qingjialeixing'),
          key: 'type',
          render: (h, params) => {
            const map = [
              { value: 1, label: this.$t('bingjia') },
              { value: 2, label: this.$t('shijia') },
              { value: 3, label: this.$t('hunjian') },
              { value: 4, label: this.$t('chanjianjia') },
              { value: 5, label: this.$t('chanjia') },
              { value: 6, label: this.$t('jihuashengyushoushujia') },
              { value: 7, label: this.$t('hulijia') },
              { value: 8, label: this.$t('burujia') },
              { value: 9, label: this.$t('sangjia') },
              { value: 10, label: this.$t('nianxiujia') },
              { value: 11, label: this.$t('qita') }
            ]
            const label = map[params.row.type - 1].label
            return h("span", label);
          },
        },
        {
          title: this.$t('kqgl.qingjiashiyou'),
          key: 'reason'
        },
        // {
        //   title: this.$t('kqgl.shifouxiaojia'),
        //   key: 'terminalHoliday',
        //   render: (h, params) => {
        //     if (params.row.terminalHoliday === 0) {
        //       return h('span', this.$t('kqgl.xiaojia'));
        //     } else if (params.row.terminalHoliday === 1) {
        //       return h('span', this.$t('kqgl.weixiaojia'));
        //     }
        //   }
        // }
      ],
      data: [],
      current: {}
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.modalstat) {
        this.getbackHoilday();
        console.log('myvalue==============', this.myvalue);
      }
    }
  },
  methods: {
    async getbackHoilday () {
      try {
        let result = await attendance.findApplyLeave(this.searchform);
        this.data = result.data.list;
      } catch (e) {
        console.error(e);
      }
    },
    selectCurrent (currentRow) {
      console.log(currentRow);
      this.current = currentRow;
    },
    // 翻页
    changePage (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getempInductionList();
    },
    // 改变一页展示数
    changePageSize (pageSize) {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getempInductionList();
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    reset () {
      this.addformbase = {
        organizationOaName: '',
        organizationOa: '',
        empList: '',
        empListIds: '',
        title: '',
        contnet: '',
        suitType: '1'
      };
      this.$refs['form'].resetFields();
    },
    handsave () {
      this.$store.commit('setTransInfo', this.current);
      this.$emit('updateStat', false, this.myvalue);
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
