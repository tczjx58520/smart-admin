<template>
    <div>
            <div class="rightTop">
                <Button @click="resetFirstTable" icon="md-refresh" type="default" style="margin-right:15px;">{{ $t('Reflash') }}</Button>
        </div>
            <Tables
                    :columns="firstColumns"
                    :loading="firstLoading"
                    :pageShow="false"
                    :value="firstData"
                    show-elevator
                  ></Tables>
    </div>
</template>

<script>
import { attendance } from '@/api/attendance'
import Tables from '@/components/tables';
import organization from '@/components/organization'


export default {
    name: 'punchTheClock',
    components:{
      Tables,
      organization
    },
    data() {
        return {
        employeeId: this.$store.state.user.userLoginInfo.userId,
            firstLoading: false,
            firstColumns: [
                {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('kqgl.bc'),
          key: 'username'
        },
        {
          title: this.$t('kqgl.dengjilexing'),
          key: 'annualLeaveTotalDays',
          render: (h, params) => {
            if (params.row.whetherVocation === 0) {
              return h('span', this.$t('kqgl.sb'));
            } else {
              return h('span', this.$t('kqgl.xb'));
            }
          }
        },{
          title: this.$t('kqgl.guidingshijian'),
          key: 'annualLeaveUsedDays'
        }, {
          title: this.$t('kqgl.ksdjsj'),
          key: 'annualLeaveRemainDays'
        }, {
          title: this.$t('kqgl.jsdjsj'),
          key: 'annualLeaveRemainDays'
        }, {
          title: this.$t('kqgl.djzt'),
          key: 'annualLeaveRemainDays',
           render: (h, params) => {
            if (params.row.whetherVocation === 0) {
              return h('span', this.$t('kqgl.sb'));
            } else {
              return h('span', this.$t('kqgl.xb'));
            }
          }
        }
            ],
            firstData: [],
            modalstat: false,
            modalState: ''
        }
    },
    mounted() {
        this.getFirstTableData()
    },
    methods: {
    async getFirstTableData () {
      try {
        this.firstLoading = true;
        let result = await attendance.findPunchInfo(this.employeeId);
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
      this.firstTable.pageNum = 1;
      this.getFirstTableData();
    },
    newFirstForm () {
      this.modalState = '新建'
      // this.firstLoading = true;
      this.modalstat = true
    },
    }
}
</script>

<style lang="less" scoped>
.rightTop { 
    background: #ffffff;
    padding: 10px 0;
    display: flex;
    
}

.rightTopItem{
    display: flex;
    align-items: center;
    font-size: 12px;
    padding-left: 25px;
}

.rightTopItemTitle {
    padding-right: 10px;
}
</style>