<template>
        <Modal v-model="mymoadlStat" class="add" width="1020" :closable="false" :mask-closable="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('salaryEntry_view.newSalaryEntry') }}</span>
        </div>
        <div>
            <Card dis-hover>
              <div style="display: flex;align-items: center;">
                <div style="margin-right: 15px">{{$t('PositionName')}}</div>
              <div>
                <Input v-model="searchForm.postName" />
              </div>
              <div>
                <Button type="primary" style="margin-left: 15px" @click="getlist">{{$t('Search')}}</Button>
              </div>
              </div>
              <Divider />
            <!-- 步骤表格start===================================== -->
            <Table :columns="stepcolumns" :data="stepdata" :loading="table_loading" ref="tablesMain" @on-selection-change="selectService"></Table>
            <Page
              :current="searchForm.pageNum"
              :page-size="searchForm.pageSize"
              :show-total="true"
              :total="pageTotal"
              @on-change="changePage"
              @on-page-size-change="changePageSize"
              style="margin:24px 0;text-align:right;"
            ></Page>
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
import { positionApi } from '@/api/position';
export default {
  name: 'addpost',
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
        pageSize: 10
      },
      stepcolumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('PositionName'),
          key: 'postName'
        },
        {
          title: this.$t('Remark'),
          key: 'remarks'
        },
        {
          title: this.$t('CreatePerson'),
          key: 'createName'
        }
      ],
      stepdata: [],
      curPageSelected: [], // 存放当前页选中项
      formValidate: {},
      curPageSelectedName: [] // 存放当前页名字
    };
  },
  watch: {
    async modalstat () {
      this.mymoadlStat = this.modalstat;
      this.formValidate.serviceIdList = [];
      this.formValidate.serviceIdNameList = [];
      console.log('memberId============================================', this.memberId);
      if (this.modalstat) {
        // this.formValidate.serviceIdList = this.memberId.Countersign_permission_persons.split(',').map(Number);
        // this.formValidate.serviceIdNameList = this.memberId.Countersign_permission_personsNames.split(',');
        for (const i in this.memberId.postlist) {
          let item = this.memberId.postlist[i];
          this.formValidate.serviceIdList.push(Number(item.key));
          this.formValidate.serviceIdNameList.push(item.label);
        }
        this.getbaseclassification();
      }
    }

  },
  computed: {
    curPageAllIds () { // 存放当前页所有数据
      return this.stepdata.map((item) => item.id);
    },
    curPageAllNames () {
      return this.stepdata.map((item) => item.postName);
    }
  },
  methods: {
    // 保存分页选中
    selectService (selection) {
      this.curPageSelected = selection.map((item) => item.id);
      // otherPageIds其他页面选中项 为所有选中项减去当前页所有数据
      let otherPageIds = this._.without(this.formValidate.serviceIdList, ...this.curPageAllIds);
      // 最终选择项为
      this.formValidate.serviceIdList = this._.union(otherPageIds, this.curPageSelected);
      this.curPageSelectedName = selection.map((item) => item.postName);
      let otherPageName = this._.without(this.formValidate.serviceIdNameList, ...this.curPageAllNames);
      this.formValidate.serviceIdNameList = this._.union(otherPageName, this.curPageSelectedName);
    },
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
    getlist () {
      this.getbaseclassification();
    },
    // 获取岗位信息
    async getbaseclassification () {
      this.table_loading = true;
      await positionApi.postList(this.searchForm).then(res => {
        this.stepdata = this.selectFromId(res.data.content.list, this.formValidate.serviceIdList);
        this.pageTotal = res.data.content.totalCount;
        this.table_loading = false;
      });
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    async handsave () {
      this.modal_loading = true;
      let data = {};
      try {
        data.empIds = this.formValidate.serviceIdList.join(',');
        data.names = this.formValidate.serviceIdNameList.join(',');
        setTimeout(() => {
          this.modal_loading = false;
          this.$emit('updateStat', false, data);
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          this.modal_loading = false;
          this.$emit('updateStat', false, data);
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
