<template>
  <div>
    <div class="rightTop">
      <Button
        @click="resetFirstTable"
        icon="md-refresh"
        type="default"
        style="margin-right: 15px"
        >{{ $t("Reflash") }}</Button
      >
      <Button type="warning" @click="handleAdd">{{
        $t("leaveRegister")
      }}</Button>
    </div>
    <Tables
      :value="firstData"
      :columns="firstColumns"
      :loading="firstLoading"
      :total="fistTotal"
      :pageShow="true"
      :current="seachParms.pageNum"
      :page-size="seachParms.pageSize"
      @on-change="firstChangePage"
      show-elevator
    ></Tables>
    <firstFrom :modalstat.sync="modalstat" @restList="restList" />
    <second-from
      :modalstat.sync="modalstat2"
      :editData.sync="editData"
      @restList="restList"
    />
  </div>
</template>

<script>
import { attendance } from '@/api/attendance';
import Tables from '@/components/tables';
import organization from '@/components/organization';
import firstFrom from './components/firstFrom';
import SecondFrom from './components/secondFrom.vue';

export default {
  name: 'leaveRegister',
  components: {
    Tables,
    organization,
    firstFrom,
    SecondFrom
  },
  data () {
    return {
      editData: {},
      fistTotal: 0,
      seachParms: {
        employeeId: this.$store.state.user.userLoginInfo.userId,
        // employeeId: 2,
        pageNum: 1,
        pageSize: 10
      },

      firstLoading: false,
      firstColumns: [
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
        {
          title: this.$t('kqgl.shifouxiaojia'),
          key: 'terminalHoliday',
          render: (h, params) => {
            if (params.row.terminalHoliday === 0) {
              return h('span', this.$t('kqgl.xiaojia'));
            } else if (params.row.terminalHoliday === 1) {
              return h('span', this.$t('kqgl.weixiaojia'));
            }
          }
        },
        {
          title: this.$t('usermanage_view.action'),
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.handleAdd2(params.row);
                    }
                  }
                },
                this.$t('kqgl.xiaojiadengji')
              )
            ]);
          }
        }
      ],
      firstData: [],
      modalstat: false,
      modalState: '',
      modalstat2: false
    };
  },
  mounted () {
    this.getFirstTableData();
  },
  methods: {
    handleAdd2 (val) {
      // this.editData = Object.assign({}, val);
      // this.modalstat2 = true;
      this.$router.push({
        name: 'flowStart'
      });
    },
    restList (val) {
      if (val) {
        this.getFirstTableData();
      }
    },
    handleAdd () {
      // this.modalstat = true;
      this.$router.push({
        name: 'flowStart'
      });
    },
    async getFirstTableData () {
      try {
        this.firstLoading = true;
        let result = await attendance.findApplyLeave(this.seachParms);
        this.firstLoading = false;
        // console.log(result)
        this.firstData = result.data.list;
        this.fistTotal = result.data.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.firstLoading = false;
      }
    },
    // 重置
    resetFirstTable () {
      this.seachParms.pageNum = 1;
      this.getFirstTableData();
    },
    newFirstForm () {
      this.modalState = '新建';
      // this.firstLoading = true;
      this.modalstat = true;
    },
    // 翻页
    firstChangePage (pageNum) {
      this.seachParms.pageNum = pageNum;
      this.getFirstTableData();
    }
  }
};
</script>

<style lang="less" scoped>
.secondBtn {
  margin-left: 20px;
}
.rightTop {
  background: #ffffff;
  padding: 10px 0;
  display: flex;
}

.rightTopItem {
  display: flex;
  align-items: center;
  font-size: 12px;
  padding-left: 25px;
}

.rightTopItemTitle {
  padding-right: 10px;
}
</style>
