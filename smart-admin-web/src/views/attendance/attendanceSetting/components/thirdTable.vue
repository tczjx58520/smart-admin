<template>
    <div>
        <TabPane :label="$t('kqgl.bzhu')">
            <div style="margin-bottom:20px;">
              <Button style="margin-right:15px;" @click="resetThirdTable" icon="md-refresh" type="default">{{ $t('Reflash') }}</Button>
              <Button style="margin-right:15px;" @click="newThirdForm" icon="md-add" type="warning">{{ $t('Create') }}</Button>
              <Button style="margin-right:15px;" @click="clearThirdTable" icon="md-close" type="error">{{ $t('Delete') }}</Button>
            </div>
            <Table :columns="ThirdColumns" :data="ThirdData" :loading="ThirdLoading" @on-selection-change="selectThird"></Table>
            <Page :current="ThirdTable.pageNum" :page-size="ThirdTable.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
            :total="fistTotal" @on-change="ThirdChangePage" @on-page-size-change="ThirdChangePageSize" show-elevator show-sizer
            show-total style="margin:24px 0;text-align:right;"></Page>
        </TabPane>
        <ThirdForm :modalstat.sync="modalstat" :modalState.sync="modalState" :editData="editData" @restList="restList"/>
    </div>
</template>

<script>
import { attendance } from '@/api/attendance';
import ThirdForm from './thirdFrom';

export default {
  name: 'ThirdTable',
  components: {
    ThirdForm
  },
  data () {
    return {
      selectData: '',
      editData: null,
      ThirdLoading: false,
      ThirdTable: {
        pageNum: 1,
        pageSize: 10
      },
      fistTotal: 0,
      ThirdColumns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('kqgl.zzmc'),
          key: 'organizeName'
        },
        {
          title: this.$t('kqgl.bz'),
          key: 'shiftSystemName'
        }
      ],
      ThirdData: [],
      modalstat: false,
      modalState: ''
    };
  },
  mounted () {
    this.getThirdTableData();
  },
  methods: {
    restList (val) {
      if (val) {
        this.getThirdTableData();
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
      // this.ThirdLoading = true;
      this.modalstat = true;
    },
    selectThird (selection) {
      this.selectData = selection;
    },
    clearThirdTable () {
      let sendParms = {
        ids: [],
        createId: this.$store.state.user.userLoginInfo.userId
      };
      for (const i in this.selectData) {
        sendParms.ids.push(this.selectData[i].id);
      }

      console.log(sendParms);
      attendance.deleteShiftGroupPatch(sendParms).then(res => {
        if (res.ret === 200) {
          this.$Message.success(res.msg);
          this.getThirdTableData();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    async getThirdTableData () {
      try {
        this.ThirdLoading = true;
        let result = await attendance.findAllShiftGroupInfo(this.ThirdTable);
        this.ThirdLoading = false;
        // console.log(result)
        this.ThirdData = result.data.list;
        this.fistTotal = result.data.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.ThirdLoading = false;
      }
    },
    // 翻页
    ThirdChangePage (pageNum) {
      this.ThirdTable.pageNum = pageNum;
      this.getThirdTableData();
    },
    // 改变一页展示数
    ThirdChangePageSize (pageSize) {
      this.ThirdTable.pageNum = 1;
      this.ThirdTable.pageSize = pageSize;
      this.getThirdTableData();
    },
    // 重置
    resetThirdTable () {
      this.ThirdTable.pageNum = 1;
      this.getThirdTableData();
    },
    newThirdForm () {
      this.modalState = '新建';
      // this.ThirdLoading = true;
      this.modalstat = true;
    }
  }
};
</script>
