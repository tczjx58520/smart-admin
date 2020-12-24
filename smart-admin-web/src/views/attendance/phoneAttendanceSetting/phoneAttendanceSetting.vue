<template>
  <div>
    <div class="rightTop">
      <Button @click="resetFirstTable"
              icon="md-refresh"
              type="default"
              style="margin-right: 15px">{{ $t("Reflash") }}</Button>
      <Button style="margin-right: 15px"
              @click="handleAdd"
              icon="md-add"
              type="warning">{{ $t("Create") }}</Button>
      <Button style="margin-right: 15px"
              @click="clearFirstTable"
              icon="md-close"
              type="error">{{ $t("Delete") }}</Button>
    </div>
    <Tables :value="firstData"
            :columns="firstColumns"
            :loading="firstLoading"
            :total="fistTotal"
            :pageShow="true"
            :current="seachParms.pageNum"
            :page-size="seachParms.pageSize"
            @on-change="firstChangePage"
            @on-selection-change="selectFirst"
            show-elevator></Tables>
    <firstFrom :modalstat.sync="modalstat"
               :modalState.sync="modalState"
               :editData.sync="editData"
               @restList="restList" />
  </div>
</template>

<script>
import { attendance } from '@/api/attendance';
import Tables from '@/components/tables';
import organization from '@/components/organization';
import firstFrom from './components/firstFrom';

export default {
  name: 'workOvertimeRegistration',
  components: {
    Tables,
    organization,
    firstFrom
  },
  data () {
    return {
      selectData: '',
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
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('kqgl.didianmingcheng'),
          key: 'addressName'
        },
        {
          title: this.$t('kqgl.jingdu'),
          key: 'latitude'
        },
        {
          title: this.$t('kqgl.weidu'),
          key: 'longitude'
        },
        {
          title: this.$t('kqgl.banjing'),
          key: 'radius'
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
                      this.Edit(params.row);
                    }
                  }
                },
                this.$t('Edit')
              )
            ]);
          }
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
    Edit (row) {
      this.modalState = '修改';
      this.editData = Object.assign({}, row);
      this.modalstat = true;
    },
    selectFirst (selection) {
      this.selectData = selection;
    },
    clearFirstTable () {
      let sendParms = {
        ids: []
      };
      let createId = this.$store.state.user.userLoginInfo.userId;
      for (const i in this.selectData) {
        sendParms.ids.push(this.selectData[i].id);
      }

      console.log(sendParms);
      attendance.removeAddressForMobile(sendParms, createId).then((res) => {
        if (res.ret === 200) {
          this.$Message.success(res.msg);
          this.getFirstTableData();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    restList (val) {
      if (val) {
        this.getFirstTableData();
      }
    },
    handleAdd () {
      this.modalstat = true;
    },
    async getFirstTableData () {
      try {
        this.firstLoading = true;
        let result = await attendance.findAddressForMobile(this.seachParms);
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
