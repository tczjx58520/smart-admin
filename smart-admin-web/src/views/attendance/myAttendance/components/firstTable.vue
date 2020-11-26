<template>
    <div>
        <TabPane :label="$t('kqgl.wdpbb')">
            <div class="rightTop">
                <Button @click="resetFirstTable" icon="md-refresh" type="default" style="margin-right:15px;">{{ $t('Reflash') }}</Button>
        </div>
            <Tables
                    :columns="firstColumns"
                    :current="firstTable.pageNum"
                    :loading="firstLoading"
                    :page-size="firstTable.pageSize"
                    :pageShow="true"
                    :total="fistTotal"
                    :value="firstData"
                    @on-change="firstChangePage"
                    @on-selection-change="selectFirst"
                    show-elevator
                  ></Tables>
        </TabPane>
    </div>
</template>

<script>
import { attendance } from '@/api/attendance'
import Tables from '@/components/tables';
import organization from '@/components/organization'


export default {
    name: 'firstTable',
    components:{
      Tables,
      organization
    },
    data() {
        return {
          year: '',
          organizationName: '',
          selectData: '',
          editData: null,
            firstLoading: false,
            firstTable:{
                employeeId: this.$store.state.user.userLoginInfo.userId,
        // employeeId: 2,
                pageNum: 1,
                pageSize: 10
            },
            fistTotal: 0,
            firstColumns: [
                {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('kqgl.rq'),
          key: 'date'
        },
        {
          title: this.$t('kqgl.bc'),
          key: 'shiftName',
          editable: true,
          editType: 'input'
        },{
          title: this.$t('kqgl.sb'),
          key: 'startWorkTimeMorning'
        }, {
          title: this.$t('kqgl.xb'),
          key: 'overWorkTimeMorning'
        },{
          title: this.$t('kqgl.sb'),
          key: 'startWorkTimeAfternoon'
        }, {
          title: this.$t('kqgl.xb'),
          key: 'overWorkTimeAfternoon'
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
      organizationData(val) {
        this.organizationName = val.title
        this.firstTable.organizationId = val.id
      },
      selectOrg() {
      this.modalstat = true
    },
      restList(val) {
        if(val) {
        this.getFirstTableData()

        }
      },
      Edit (row) {
      // if (this.$judge(['1-4-2'])) {
      //   this.editinfo = row;
      //   this.visiable_edit = true;
      // } else {
      //   console.log('needroles');
      // }
      this.modalState = '修改'
            this.editData = Object.assign({}, row)

      // this.firstLoading = true;
      this.modalstat = true

    },
    selectFirst (selection) {
      this.selectData = selection;
    },
    GMTToStr(time){
    let date = new Date(time)
    let Str=date.getFullYear() 
    return Str
},
    async getFirstTableData () {
      try {
        this.firstLoading = true;
        let result = await attendance.personalShift(this.firstTable);
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
    // 翻页
    firstChangePage (pageNum) {
      this.firstTable.pageNum = pageNum;
      this.getFirstTableData();
    },
    // 改变一页展示数
    firstChangePageSize (pageSize) {
      this.firstTable.pageNum = 1;
      this.firstTable.pageSize = pageSize;
      this.getFirstTableData();
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