<template>
        <Modal v-model="mymoadlStat" class="add" width="1020" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('salaryEntry_view.newSalaryEntry') }}</span>
        </div>
        <div>
            <Card dis-hover>
              <Divider />
            <!-- 步骤表格start===================================== -->
            <Table :columns="stepcolumns" :data="stepdata" max-height="calc(70vh)" @on-selection-change="selects" :loading="table_loading" ref="tablesMain"></Table>
            </Card>
        </div>
        <div slot="footer">
            <ButtonGroup>
                <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button>
                <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
            </ButtonGroup>
        </div>
    </Modal>
    <!-- 设置步骤弹窗======================= -->
</template>
<script>
import Tables from '@/components/tables';
import { roleApi } from '@/api/role';
import { salaryEntryApi } from '@/api/salaryentry';
export default {
  name: 'addrole',
  components: {
    Tables
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null,
    memberId: null
  },
  created () {
    console.log('moadlStat=======>', this.modalstat);
  },
  mounted () {
  },
  data () {
    return {
      pageTotal: 0,
      visiable: false,
      table_loading: true,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      searchForm: {
        pageNum: 1,
        pageSize: 10,
        loginRepositoryId: this.$store.state.user.userLoginInfo.repositoryId
      },
      stepcolumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('role_view.roleName'),
          key: 'roleName'
        },
        {
          title: this.$t('role_view.description'),
          key: 'description'
        },
        {
          title: this.$t('CreatePerson'),
          key: 'createPersonName'
        },
        {
          title: this.$t('CreateTime'),
          key: 'createTime'
        }
      ],
      stepdata: [],
      selected: [],
      formValidate: {}
    };
  },
  watch: {
    async modalstat () {
      this.mymoadlStat = this.modalstat;
      this.formValidate.serviceIdList = [];
      this.formValidate.serviceIdNameList = [];
      if (this.modalstat) {
        for (const i in this.memberId.roleList) {
          let item = this.memberId.roleList[i];
          this.formValidate.serviceIdList.push(Number(item.key));
          this.formValidate.serviceIdNameList.push(item.label);
        }
        this.getbaseclassification();
      }
    }

  },
  methods: {
    // 根据id选中
    selectFromId (showList, selectList) {
      let that = this;
      if (selectList) {
        for (const i in showList) {
          if (selectList.includes(showList[i].id)) {
            showList[i]._checked = true;
            // this.$set(this.showList[i], '_checked', true);
          } else {
            showList[i]._checked = false;
            // this.$set(this.showList[i], '_checked', false);
          }
        }
      }
      return showList;
    },
    selects (param) {
      console.log('param', param);
      this.selected = param.map(item => {
        return {
          label: item.roleName,
          key: item.id
        };
      })
      ;
    },
    getlist () {
      this.getbaseclassification();
    },
    // 获取岗位信息
    async getbaseclassification () {
      this.table_loading = true;
      await roleApi.getAllRole(this.searchForm).then(res => {
        console.log('roleresult=>', res.data.content);
        this.table_loading = false;
        this.stepdata = this.selectFromId(res.data.content, this.formValidate.serviceIdList);
      });
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    async handsave () {
      this.modal_loading = true;
      try {
        setTimeout(() => {
          this.modal_loading = false;
          this.$emit('updateStat', false, this.selected);
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          this.modal_loading = false;
          this.$emit('updateStat', false, this.selected);
        }, 1000);
      }
    },
    // 页码改变
    changePage (pageNum) {
      this.searchForm.pageNum = pageNum;
      this.getbaseclassification();
    },
    // 改变每页显示数据条数
    changePageSize (pageSize) {
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = pageSize;
      this.getbaseclassification();
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
    .add /deep/ .ivu-table-wrapper{
      overflow: visible;
    }
</style>
