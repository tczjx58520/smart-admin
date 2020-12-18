<template>
        <Modal v-model="mymoadlStat" class="add" width="1024" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('usermanage_view.adduser123') }}</span>
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
                <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button>
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
          key: 'rolesOaName ',
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
      data.testStat = 0;
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
          key: item.itemName,
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row[item.itemName],
                size: 'small'
              },
              on: {
                input: (val) => {
                  console.log('val========>', val, item);
                  this.mydata[params.index][item.itemName] = val;
                  console.log(this.mydata[params.index]);
                  let index = this.mydata[params.index].itemScoreVos.findIndex(val => val.itemName === item.itemName);
                  console.log('index===========', index);
                  this.mydata[params.index].totalScore = 0;
                  this.mydata[params.index].flag = true;
                  for (const i in this.mydata[params.index].itemScoreVos) {
                    this.mydata[params.index].itemScoreVos[index].score = val;
                    this.mydata[params.index].totalScore += Number(this.mydata[params.index].itemScoreVos[i].score);
                  }
                }
              }
            });
          }
        };
      });
      this.columns = this.columns.concat(mycolumns);
      for (const i in result) {
        for (let j = 0; j < result[i].itemScoreVos.length; j++) {
          result[i][result[i].itemScoreVos[j].itemName] = result[i].itemScoreVos[j].score;
          result[i].flag = false;
        }
      }
      this.mydata = result;
      this.loading = false;
      console.log('this.mydata============', this.mydata);
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
    async handsave () {
      this.modal_loading = true;
      console.log(this.mydata);
      for (const i in this.mydata) {
        this.mydata[i].taskId = this.mydata[i].itemScoreVos[0].taskId;
        this.mydata[i].operatId = this.$store.state.user.userLoginInfo.userId;
        this.mydata[i].itemScoreJson = JSON.stringify(this.mydata[i].itemScoreVos);
        if (this.mydata[i].flag) {
          await assessmentTaskApi.manualscore(this.mydata[i]).then(res => {
            if (res.ret === 200) {
            } else {
              this.$emit('updateStat', false);
              this.$Message.success('fail');
              return false;
            }
          });
        }
      }
      this.modal_loading = false;
      this.$emit('updateStat', false);
      this.$Message.success('考核成功');
      console.log('this.mydata=====', this.mydata);
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
