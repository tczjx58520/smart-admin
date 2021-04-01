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
      <div class="rightTopItem">
        <span class="rightTopItemTitle">{{ $t("kqgl.rqxz") }}</span>
        <span>
          <DatePicker
            type="month"
            v-model="year"
            placeholder="Select year"
            style="width: 200px"
          />
        </span>
      </div>
      <div class="rightTopItem">
        <span class="rightTopItemTitle">{{ $t("kqgl.kaoqingjiId") }}</span>
        <span>
          <Input
            :value="organizationName"
            type="text"
            @click.native="selectOrg()"
          />
        </span>
        <organization
          :modalstat.sync="modalstat"
          @organizationData="organizationData"
        />
      </div>
      <div class="rightTopItem">
        <Button type="primary" @click.native="getFirstTableData">{{
          $t("Search")
        }}</Button>
      </div>
      <div class="rightTopItem">
        <Button type="primary" @click.native="getFirstTableData">{{
          $t("daoru")
        }}</Button>
      </div>
    </div>
    <Tables
      :columns="firstColumns"
      :loading="firstLoading"
      :pageShow="false"
      :value="firstData"
      show-elevator
    ></Tables>
    <!-- <firstFrom :modalstat.sync ='modalstat' :editData.sync='editData' @restList="restList"/> -->
  </div>
</template>

<script>
import { attendance } from '@/api/attendance';
import Tables from '@/components/tables';
import organization from '@/components/organization';
// import firstFrom from './components/firstFrom'

export default {
  name: 'punchTheClock',
  components: {
    Tables,
    organization
  },
  data () {
    return {
      year: '',
      organizationName: '',
      editData: {},
      employeeId: this.$store.state.user.userLoginInfo.userId,
      // employeeId: 2,
      searchParm: {},
      firstLoading: false,
      firstColumns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('kqgl.kaoqingjiId'),
          key: 'attendanceMachineId'
        },
        {
          title: this.$t('kqgl.kaoqinzheid'),
          key: 'employeeId'
        },
        {
          title: this.$t('kqgl.xingming'),
          key: 'createPersonName'
        },
        {
          title: this.$t('kqgl.dakashijian'),
          key: 'punchTime'
        }
      ],
      firstData: [],
      modalstat: false,
      modalState: ''
    };
  },
  mounted () {
    this.getFirstTableData();
  },
  methods: {
    organizationData (val) {
      console.log(val);
    },
    restList (val) {
      if (val) {
        this.getFirstTableData();
      }
    },
    Edit (row) {
      this.editData = row;
      this.modalstat = true;
    },
    async getFirstTableData () {
      try {
        this.firstLoading = true;
        let result = await attendance.findAttendacneMachineRecord(this.searchParm);
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
