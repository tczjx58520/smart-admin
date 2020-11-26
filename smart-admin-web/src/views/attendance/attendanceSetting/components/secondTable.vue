<template>
    <div>
        <TabPane :label="$t('kqgl.bz')">
            <div style="margin-bottom:20px;">
              <Button style="margin-right:15px;" @click="resetSecondTable" icon="md-refresh" type="default">{{ $t('Reflash') }}</Button>
              <Button style="margin-right:15px;" @click="newsecondForm" icon="md-add" type="warning">{{ $t('Create') }}</Button>
              <Button style="margin-right:15px;" @click="clearSecondTable" icon="md-close" type="error">{{ $t('Delete') }}</Button>
            </div>
            <Table :columns="secondColumns" :data="secondData" :loading="secondLoading" @on-selection-change="selectsecond"></Table>
            <Page :current="SecondTable.pageNum" :page-size="SecondTable.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
            :total="fistTotal" @on-change="secondChangePage" @on-page-size-change="secondChangePageSize" show-elevator show-sizer
            show-total style="margin:24px 0;text-align:right;"></Page>
        </TabPane>
        <secondForm :modalstat.sync="modalstat" :modalState.sync="modalState" :editData="editData" @restList="restList"/>
    </div>
</template>

<script>
import { attendance } from '@/api/attendance'
import secondForm from './secondFrom'

export default {
    name: 'SecondTable',
    components:{
secondForm
    },
    data() {
        return {
          selectData: '',
          editData: null,
            secondLoading: false,
            SecondTable:{
                pageNum: 1,
                pageSize: 10
            },
            fistTotal: 0,
            secondColumns: [
                {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('kqgl.bzmc'),
          key: 'shiftSystemName'
        },
        {
          title: this.$t('kqgl.xqy'),
          key: 'mondayName'
        },{
          title: this.$t('kqgl.xqe'),
          key: 'tuesdayName'
        }, {
          title: this.$t('kqgl.xqs'),
          key: 'wednesdayName'
        },{
          title: this.$t('kqgl.xqsi'),
          key: 'thursdayName'
        },{
          title: this.$t('kqgl.xqw'),
          key: 'fridayName'
        }, {
          title: this.$t('kqgl.xql'),
          key: 'saturdayName'
        },{
          title: this.$t('kqgl.xqr'),
          key: 'sundayName'
        },{
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
            secondData: [],
            modalstat: false,
            modalState: ''
        }
    },
    mounted() {
        this.getSecondTableData()
    },
    methods: {
      restList(val) {
        if(val) {
        this.getSecondTableData()

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
      // this.secondLoading = true;
      this.modalstat = true

    },
    selectsecond (selection) {
      this.selectData = selection;
    },
    clearSecondTable () {
      let sendParms = {
        ids: [],
        createId: this.$store.state.user.userLoginInfo.userId
      }
      for (const i in this.selectData) {
       sendParms.ids.push(this.selectData[i].id)
      }

       console.log(sendParms)
        attendance.deleteShiftSystemPatch(sendParms).then(res => {
          if (res.ret === 200) {
            this.$Message.success(res.msg);
            this.getSecondTableData();
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    async getSecondTableData () {
      try {
        this.secondLoading = true;
        let result = await attendance.findAllShiftSystemInfo(this.SecondTable);
        this.secondLoading = false;
        // console.log(result)
        this.secondData = result.data.list;
        this.fistTotal = result.data.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.secondLoading = false;
      }
    },
    // 翻页
    secondChangePage (pageNum) {
      this.SecondTable.pageNum = pageNum;
      this.getSecondTableData();
    },
    // 改变一页展示数
    secondChangePageSize (pageSize) {
      this.SecondTable.pageNum = 1;
      this.SecondTable.pageSize = pageSize;
      this.getSecondTableData();
    },
    // 重置
    resetSecondTable () {
      this.SecondTable.pageNum = 1;
      this.getSecondTableData();
    },
    newsecondForm () {
      this.modalState = '新建'
      // this.secondLoading = true;
      this.modalstat = true
    },
    }
}
</script>