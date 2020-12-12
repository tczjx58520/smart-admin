<template>
  <div>
    <div class="rightTop">
      <Button @click="resetFirstTable"
              icon="md-refresh"
              type="default"
              style="margin-right: 15px">{{ $t("Reflash") }}</Button>
      <!-- <Button @click="resetFirstTable" type="primary" style="margin-right:15px;">{{ $t('kqgl.daying') }}</Button> -->
      <div class="rightTopItem">
        <span class="rightTopItemTitle">{{ $t("kqgl.yonghuming") }}</span>
        <span>
          <Input v-model="firstTable.employeeName"
                 type="text" />
        </span>
        <selectEmp :modalstat.sync="empSata"
                   @selectData="selectData" />
      </div>

      <div class="rightTopItem">
        <span class="rightTopItemTitle">{{ $t("kqgl.suoshuzhuzhi") }}</span>
        <span>
          <Input :value="organizationName"
                 clearable
                 type="text"
                 @on-focus="selectOrg()"
                 @on-clear="clearData" />
        </span>
        <organization :modalstat.sync="modalstat"
                      @organizationData="organizationData" />
      </div>
      <div class="rightTopItem">
        <Button type="primary"
                @click.native="getFirstTableData">{{
          $t("Search")
        }}</Button>
      </div>
    </div>
    <Tables :columns="firstColumns"
            :current="firstTable.pageNum"
            :loading="firstLoading"
            :page-size="firstTable.pageSize"
            @on-current-change="firstChangePage"
            :pageShow="true"
            :editable="true"
            :total="fistTotal"
            :value="firstData"
            @on-change="firstChangePage"
            @on-save-selectData="editselectData"
            show-elevator
            show-sizer></Tables>
  </div>
</template>

<script>
import { attendance } from '@/api/attendance';
import Tables from '@/components/tables';
import organization from '@/components/organization';
import selectEmp from '@/components/selectEmp';

export default {
  name: 'firstTable',
  components: {
    Tables,
    organization,
    selectEmp
  },
  data () {
    return {
      createPersonName: '',
      organizationName: '',
      firstLoading: false,
      firstTable: {
        pageNum: 1,
        pageSize: 10
      },
      fistTotal: 0,
      firstColumns: [
        {
          title: this.$t('kqgl.yonghuming'),
          key: 'employeeName'
        },
        {
          title: this.$t('kqgl.suoshuzhuzhi'),
          key: 'applyTime'
        },
        {
          title: this.$t('kqgl.shifoujinxingkaoqing'),
          key: 'whetherAttendance',
          editType: 'nomalselect',
          editable: 'true',
          selectData: [
            { id: 0, name: this.$t('kqgl.yes') },
            { id: 1, name: this.$t('kqgl.no') }
          ]
        },
        {
          title: this.$t('kqgl.kaoqingjiid'),
          key: 'attendanceMachineId',
          editType: 'input',
          editable: 'true'
        },
        {
          title: this.$t('kqgl.shifoukaoqingjidaka'),
          key: 'whetherUseAttendanceMachine',
          editType: 'nomalselect',
          editable: 'true',
          selectData: [
            { id: 0, name: this.$t('kqgl.yes') },
            { id: 1, name: this.$t('kqgl.no') }
          ]
        },
        {
          title: this.$t('kqgl.shifoushoujidaka'),
          key: 'whetherUseMobile',
          editType: 'nomalselect',
          editable: 'true',
          selectData: [
            { id: 0, name: this.$t('kqgl.yes') },
            { id: 1, name: this.$t('kqgl.no') }
          ]
        },
        {
          title: this.$t('kqgl.waiqing'),
          key: 'whetherWorkOutside',
          editType: 'nomalselect',
          editable: 'true',
          selectData: [
            { id: 0, name: this.$t('kqgl.yes') },
            { id: 1, name: this.$t('kqgl.no') }
          ]
        },
        {
          title: this.$t('kqgl.yunxukaoqinqiandaodizhi'),
          key: 'fieldOfWorkOutside'
        }
      ],
      firstData: [],
      modalstat: false,
      modalState: '',
      empSata: false
    };
  },
  mounted () {
    this.getFirstTableData();
  },
  methods: {
    clearData () {
      this.organizationName = '';
      this.firstTable.deptId = '';
    },
    editselectData (val) {
      console.log(val);
      let parms = {
        id: val.row.id
      };
      if (val.column.key === 'whetherAttendance') {
        parms.whetherAttendance = val.value;
      }

      if (val.column.key === 'whetherUseAttendanceMachine') {
        parms.whetherUseAttendanceMachine = val.value;
      }

      if (val.column.key === 'whetherUseMobile') {
        parms.whetherUseMobile = val.value;
      }

      if (val.column.key === 'whetherWorkOutside') {
        parms.whetherWorkOutside = val.value;
      }

      if (val.column.key === 'attendanceMachineId') {
        parms.attendanceMachineId = val.value2;
      }

      attendance.modifyAttendanceEmployeeSet(parms).then((res) => {
        console.log(res);
        if (res.ret === 200) {
          this.$Message.success(res.msg);
        }
        this.getFirstTableData();
      });
    },
    chooseDate (val) {
      this.firstTable.conditionTime = val;
    },
    selectData (val) {
      // console.log('val', val)
      this.firstTable.employeeName = val.id;
      this.createPersonName = val.personName;
    },
    chooseEmp () {
      this.empSata = true;
    },
    organizationData (val) {
      this.organizationName = val.title;
      this.firstTable.deptId = val.id;
    },
    selectOrg () {
      this.modalstat = true;
    },
    restList (val) {
      if (val) {
        this.getFirstTableData();
      }
    },
    async getFirstTableData () {
      if (!this.firstTable.employeeName) {
        delete this.firstTable.employeeName;
      }
      if (!this.firstTable.deptId) {
        delete this.firstTable.deptId;
      }
      try {
        this.firstLoading = true;
        let result = await attendance.findAttendanceEmployeeSet(
          this.firstTable
        );
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
      console.log('pageNum', pageNum);
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
      this.modalState = '新建';
      // this.firstLoading = true;
      this.modalstat = true;
    }
  }
};
</script>

<style lang="less" scoped>
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
