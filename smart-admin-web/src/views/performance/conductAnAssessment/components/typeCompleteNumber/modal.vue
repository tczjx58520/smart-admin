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
              <Table max-height="400" :columns="columns" :data="mydata" :loading="loading"></Table>
            </Card>
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
        this.getscore();
      }
    }
  },
  methods: {
    async getscore () {
      console.log('this.editinfo======', this.editinfo.collectType);
      const jungleFlag = this.editinfo.collectType;
      if (jungleFlag === 2) {
        this.columns = [
          {
            title: this.$t('mdmc'),
            key: 'repositoryName',
            minWidth: 100
          },
          {
            title: this.$t('mdjb'),
            key: 'repositoryLevelName',
            minWidth: 100
          }
          // {
          //   title: this.$t('viewTask_view.totalScore'),
          //   key: 'totalScore',
          //   minWidth: 100
          // }
        ];
      } else {
        this.columns = [
          {
            title: this.$t('OrganizationName'),
            key: 'organizeName',
            minWidth: 100
          },
          {
            title: this.$t('usermanage_view.name'),
            key: 'empName',
            minWidth: 100
          },
          {
            title: this.$t('usermanage_view.role'),
            key: 'rolesOaName ',
            minWidth: 100
          }
          // {
          //   title: this.$t('viewTask_view.totalScore'),
          //   key: 'totalScore',
          //   minWidth: 100
          // }
        ];
      }

      let data = {};
      data.taskId = this.editinfo.id;
      data.testStat = 0;
      let result = null;
      await assessmentTaskApi.viewallscore(data).then(res => {
        result = res.data.content;
      });
      let mycolumns = [];
      mycolumns = result[0].itemFinishVos.map(item => {
        if (item.nameId === 1 && this.editinfo.collectType === 2) {
          const arrayRes = result.map(item => {
            return item.repositoryId;
          });
          const queryData = arrayRes.join(',');
          const data = {
            // beginTime: this.beginTime,
            beginTime: '2020-10-01',
            // endTime: this.endTime,
            endTime: '2020-10-31',
            repositoryIds: queryData
          };
          const queryResult = assessmentTaskApi.getRepositorySale(data).then(res => {
            for (let i = 0; i < res.data.content.length; i++) {
              for (let j = 0; j < result.length; j++) {
                if (res.data.content[i].repositoryId === result[j].repositoryId) {
                  result[j][item.itemName] = res.data.content[i].saleQuantity;
                  // result[j].flag = true;
                  result[j].itemFinishVos.map(items => {
                    if (items.itemName === item.itemName) {
                      if (!items.jungleFlag) {
                        result[j][item.itemName] = items.actualFinish;
                      } else {
                        items.actualFinish = res.data.content[i].saleQuantity;
                      }
                    }
                  });
                }
              }
            }
          });
        } else if (item.nameId === 2 && this.editinfo.collectType === 2) {
          const arrayRes = result.map(item => {
            return item.repositoryId;
          });
          const queryData = arrayRes.join(',');
          const data = {
            // beginTime: this.beginTime,
            beginTime: '2020-10-01',
            // endTime: this.endTime,
            endTime: '2020-10-31',
            repositoryIds: queryData
          };
          const queryResult = assessmentTaskApi.getRepositoryService(data).then(res => {
            for (let i = 0; i < res.data.content.length; i++) {
              for (let j = 0; j < result.length; j++) {
                if (res.data.content[i].repositoryId === result[j].repositoryId) {
                  result[j][item.itemName] = res.data.content[i].service;
                  // result[j].flag = true;
                  result[j].itemFinishVos.map(items => {
                    if (items.itemName === item.itemName) {
                      if (!items.jungleFlag) {
                        result[j][item.itemName] = items.actualFinish;
                      } else {
                        items.actualFinish = res.data.content[i].service;
                      }
                    }
                  });
                }
              }
            }
          });
        } else if (item.nameId === 3 && this.editinfo.collectType === 2) {
          const arrayRes = result.map(item => {
            return item.repositoryId;
          });
          const queryData = arrayRes.join(',');
          const data = {
            // beginTime: this.beginTime,
            beginTime: '2020-10-01',
            // endTime: this.endTime,
            endTime: '2020-10-31',
            repositoryIds: queryData
          };
          const queryResult = assessmentTaskApi.getRepositoryInstallment(data).then(res => {
            for (let i = 0; i < res.data.content.length; i++) {
              for (let j = 0; j < result.length; j++) {
                if (res.data.content[i].repositoryId === result[j].repositoryId) {
                  result[j][item.itemName] = res.data.content[i].installment;
                  // result[j].flag = true;
                  result[j].itemFinishVos.map(items => {
                    if (items.itemName === item.itemName) {
                      if (!items.jungleFlag) {
                        result[j][item.itemName] = items.actualFinish;
                      } else {
                        items.actualFinish = res.data.content[i].installment;
                      }
                    }
                  });
                }
              }
            }
          });
        } else if (item.nameId === 1 && this.editinfo.collectType === 1) {
          const arrayRes = result.map(item => {
            return item.empId;
          });
          const queryData = arrayRes.join(',');
          const data = {
            // beginTime: this.beginTime,
            beginTime: '2020-10-01',
            // endTime: this.endTime,
            endTime: '2020-10-31',
            empIds: queryData
          };
          const queryResult = assessmentTaskApi.getRepositorySale(data).then(res => {
            for (let i = 0; i < res.data.content.length; i++) {
              for (let j = 0; j < result.length; j++) {
                if (res.data.content[i].empId === result[j].empId) {
                  result[j][item.itemName] = res.data.content[i].saleQuantity;
                  // result[j].flag = true;
                  result[j].itemFinishVos.map(items => {
                    if (items.itemName === item.itemName) {
                      if (!items.jungleFlag) {
                        result[j][item.itemName] = items.actualFinish;
                      } else {
                        items.actualFinish = res.data.content[i].saleQuantity;
                      }
                    }
                  });
                }
              }
            }
          });
        } else if (item.nameId === 2 && this.editinfo.collectType === 1) {
          const arrayRes = result.map(item => {
            return item.empId;
          });
          const queryData = arrayRes.join(',');
          const data = {
            // beginTime: this.beginTime,
            beginTime: '2020-10-01',
            // endTime: this.endTime,
            endTime: '2020-10-31',
            empIds: queryData
          };
          assessmentTaskApi.getRepositorySale(data).then(res => {
            for (let i = 0; i < res.data.content.length; i++) {
              for (let j = 0; j < result.length; j++) {
                if (res.data.content[i].empId === result[j].empId) {
                  result[j][item.itemName] = res.data.content[i].service;
                  // result[j].flag = true;
                  result[j].itemFinishVos.map(items => {
                    if (items.itemName === item.itemName) {
                      if (!items.jungleFlag) {
                        result[j][item.itemName] = items.actualFinish;
                      } else {
                        items.actualFinish = res.data.content[i].service;
                      }
                    }
                  });
                }
              }
            }
          });
        } else if (item.nameId === 3 && this.editinfo.collectType === 1) {
          const arrayRes = result.map(item => {
            return item.empId;
          });
          const queryData = arrayRes.join(',');
          const data = {
            // beginTime: this.beginTime,
            beginTime: '2020-10-01',
            // endTime: this.endTime,
            endTime: '2020-10-31',
            empIds: queryData
          };
          const queryResult = assessmentTaskApi.getRepositorySale(data).then(res => {
            for (let i = 0; i < res.data.content.length; i++) {
              for (let j = 0; j < result.length; j++) {
                if (res.data.content[i].empId === result[j].empId) {
                  result[j][item.itemName] = res.data.content[i].installment;
                  // result[j].flag = true;
                  result[j].itemFinishVos.map(items => {
                    if (items.itemName === item.itemName) {
                      if (!items.jungleFlag) {
                        result[j][item.itemName] = items.actualFinish;
                      } else {
                        items.actualFinish = res.data.content[i].installment;
                      }
                    }
                  });
                }
              }
            }
          });
        }
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
                  this.mydata[params.index][item.itemName] = val;
                  let index = this.mydata[params.index].itemFinishVos.findIndex(val => val.itemName === item.itemName);
                  this.mydata[params.index].flag = true;
                  this.mydata[params.index].jungleFlag = 1;
                  for (const i in this.mydata[params.index].itemFinishVos) {
                    this.mydata[params.index].itemFinishVos[index].actualFinish = val;
                  }
                }
              }
            });
          }
        };
      });
      this.columns = this.columns.concat(mycolumns);
      for (const i in result) {
        for (let j = 0; j < result[i].itemFinishVos.length; j++) {
          result[i][result[i].itemFinishVos[j].itemName] = result[i].itemFinishVos[j].actualFinish;
          if (!result[i].flag) {
            result[i].flag = false;
          }
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
    async handsave () {
      this.modal_loading = true;
      console.log(this.mydata);
      for (const i in this.mydata) {
        this.mydata[i].taskId = this.mydata[i].itemFinishVos[0].taskId;
        this.mydata[i].operatId = this.$store.state.user.userLoginInfo.userId;
        this.mydata[i].itemFinishJson = JSON.stringify(this.mydata[i].itemFinishVos);
        if (this.mydata[i].flag) {
          await assessmentTaskApi.handItemFinish(this.mydata[i]).then(res => {
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
