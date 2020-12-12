<template>
  <div>
    <TabPane :label="$t('kqgl.txj')">
      <div class="rightTop">
        <Button @click="resetFirstTable"
                icon="md-refresh"
                type="default"
                style="margin-right: 15px">{{ $t("Reflash") }}</Button>
        <div class="rightTopItem">
          <span class="rightTopItemTitle">{{ $t("kqgl.rqxz") }}</span>
          <span>
            <DatePicker type="year"
                        v-model="year"
                        placeholder="Select year"
                        style="width: 200px" />
          </span>
        </div>
        <div class="rightTopItem">
          <span class="rightTopItemTitle">{{ $t("kqgl.yhm") }}</span>
          <span>
            <Input placeholder="请输入用户名"
                   :value="organizationName"
                   type="text"
                   @click.native="selectOrg()" />
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
              :pageShow="true"
              :editable="true"
              :total="fistTotal"
              :value="firstData"
              @on-change="firstChangePage"
              @on-selection-change="selectFirst"
              @on-save-edit="getEditData"
              show-elevator></Tables>
    </TabPane>
  </div>
</template>

<script>
import { attendance } from '@/api/attendance';
import Tables from '@/components/tables';
import organization from '@/components/organization';

export default {
  name: 'secondTable',
  components: {
    Tables,
    organization
  },
  data () {
    return {
      year: '',
      organizationName: '',
      selectData: '',
      editData: null,
      firstLoading: false,
      firstTable: {
        year: null,
        organizationId: '',
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
          title: this.$t('kqgl.yhm'),
          key: 'username'
        },
        {
          title: this.$t('kqgl.kytx'),
          key: 'exchangeDayCanUse',
          editable: true,
          editType: 'input'
        },
        {
          title: this.$t('kqgl.yytx'),
          key: 'exchangeDayRemain'
        }
      ],
      firstData: [],
      modalstat: false,
      modalState: ''
    };
  },
  mounted () {
    // this.getFirstTableData()
  },
  methods: {
    organizationData (val) {
      this.organizationName = val.title;
      this.firstTable.organizationId = val.id;
    },
    selectOrg () {
      this.modalstat = true;
    },
    async getEditData (val) {
      console.log('getEditData', val);
      if (val.column.key === 'annualLeaveTotalDays') {
        const parms = {
          annualLeaveRemainDays: Number(val.value) - Number(val.row.annualLeaveUsedDays),
          annualLeaveTotalDays: Number(val.value),
          annualLeaveUsedDays: val.row.annualLeaveUsedDays,
          id: val.row.id
        };
        try {
          this.firstLoading = true;
          let result = await attendance.modifyAnnual(parms);
          this.firstLoading = false;
          console.log(result);
          if (result.ret === 200) {
            this.getFirstTableData();
          }
        } catch (e) {
          // TODO zhuoda sentry
          console.error(e);
          this.getFirstTableData();
          this.firstLoading = false;
        }
      }
    },
    restList (val) {
      if (val) {
        this.getFirstTableData();
      }
    },
    Edit (row) {
      // if (this.$judge(['1-4-2'])) {
      //   this.editinfo = row;
      //   this.visiable_edit = true;
      // } else {
      //   console.log('needroles');
      // }
      this.modalState = '修改';
      this.editData = Object.assign({}, row);

      // this.firstLoading = true;
      this.modalstat = true;
    },
    selectFirst (selection) {
      this.selectData = selection;
    },
    GMTToStr (time) {
      let date = new Date(time);
      let Str = date.getFullYear();
      return Str;
    },
    async getFirstTableData () {
      console.log('year', this.GMTToStr(this.year));
      console.log('this.firstTable', this.firstTable);
      this.firstTable.year = this.GMTToStr(this.year);
      try {
        this.firstLoading = true;
        let result = await attendance.findExchangeDay(this.firstTable);
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
