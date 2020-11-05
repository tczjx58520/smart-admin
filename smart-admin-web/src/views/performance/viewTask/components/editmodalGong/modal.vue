<template>
        <Modal v-model="mymoadlStat" class="add" width="1024" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('usermanage_view.adduser') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <div style="display:flex; align-items: center;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('BaseData')}}</div>
                </div>
                <Divider />
            </Card>
            <Table max-height="400" :columns="columns" :data="mydata" :loading="loading"></Table>
        </div>
        <div slot="footer">
            <ButtonGroup>
                <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
            </ButtonGroup>
        </div>
        <!-- 新建员工弹窗 -->
        <!-- 新建结束============= -->
    </Modal>
</template>
<script>
import { indicatorSetApi } from '@/api/indicatorSet';
import { assessmentTaskApi } from '@/api/assessmentTask';
export default {
  name: 'editGong',
  components: {

  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null
  },
  created () {
    
  },
  mounted () {
  },
  data () {
    return {
      loading: true,
      mydata: [],
      columns: [],
      originList: [],
      mytype: null,
      // 新建基础数据
      GongList: [],
      SheList: [],
      itemsList: [],
      allitems: [],
      // ===============================>
      socialSecurity: true,
      accumulationFund: true,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {
      },
      // 新建员工弹窗
      visiable_emp: false
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        this.addformbase = this.editinfo;
        console.log('this.addformbase=================?', this.addformbase);
        // this.gettoday();
        this.getscore();
      }
    }
  },
  methods: {
    async getscore () {
      this.columns = [
        {
          title: this.$t('OrganizationName'),
          key: 'organizeName',
          width: 200
        },
        {
          title: this.$t('usermanage_view.name'),
          key: 'empName',
          width: 200
        },
        {
          title: this.$t('usermanage_view.role'),
          key: 'roleName',
          width: 100
        },
        {
          title: this.$t('viewTask_view.totalScore'),
          key: 'totalScore',
          width: 100
        }
      ];
      let data = {};
      data.taskId = this.editinfo.id;
      let result = null;
      await assessmentTaskApi.viewallscore(data).then(res => {
        result = res.data.content;
      });
      console.log(result);
      let mycolumns = [];
      mycolumns = result[0].itemScoreVos.map(item => {
        return {
          title: item.itemName,
          minWidth: 150,
          render: (h, params) => {
            return h('div', params.row[item.itemName]);
          }
        };
      });
      this.columns = this.columns.concat(mycolumns);
      for (const i in result) {
        for (let j = 0; j < result[i].itemScoreVos.length; j++) {
          result[i][result[i].itemScoreVos[j].itemName] = result[i].itemScoreVos[j].score;
        }
      }
      this.mydata = result;
      this.loading = false;
    },
    cancel () {
      this.reset();
      this.$emit('updateStat', false);
    },
    reset () {
      for (let key in this.addformbase) {
        delete this.addformbase[key];
      }
    },
    handsave () {
      this.modal_loading = true;
      console.log(this.addformbase);
      this.addformbase.taskId = this.addformbase.id;
      this.addformbase.operatId = this.$store.state.user.userLoginInfo.userId;
      console.log(this.addformbase);
      this.$refs['form'].validate((valid) => {
        if (valid) {
          assessmentTaskApi.updateassessmentTask(this.addformbase).then(res => {
            if (res.ret === 200) {
              this.modal_loading = false;
              this.$emit('updateStat', false);
              this.$Message.success(res.msg);
              this.reset();
            }
          });
        } else {
          this.$Message.error('Fail!');
          this.modal_loading = false;
        }
      });
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
