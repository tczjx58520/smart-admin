<template>
        <Modal v-model="mymoadlStat" class="add" width="1020" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('salaryEntry_view.newSalaryEntry') }}</span>
        </div>
        <div>
            <Card dis-hover>
              <Form ref="form" :model="addformbase" label-position="right" :label-width="100" inline>
                <FormItem :label="$t('processDesign_view.personnel')">
                    <Select v-model="addformbase.personnel" style="width:200px;">
                        <Option v-for="item in personList" :value="item.id" :key="item.id">{{ item.Name }}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="$t('processDesign_view.organization')">
                    <Select v-model="addformbase.organization" style="width:200px;">
                        <Option v-for="item in orgList" :value="item.id" :key="item.id">{{ item.Name }}</Option>
                    </Select>
                </FormItem>
              </Form>
              <Divider />
            <!-- 步骤表格start===================================== -->
            <!-- <Table border :columns="stepcolumns" :data="stepdata" max-height="calc(70vh)" highlight-row @on-current-change="selects" :loading="table_loading" ref="tablesMain"></Table> -->
            <p>选择岗位</p>
            <Table border :columns="stepcolumns" :data="stepdata" :loading="table_loading" highlight-row ref="tablesMain" @on-current-change="selects"></Table>
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
import { salaryEntryApi } from '@/api/salaryentry';
import { positionApi } from '@/api/position';
export default {
  name: 'addrolerule',
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
      personList: [
        {
          id: 1,
          Name: this.$t('processDesign_view.sponsor')
        }
        // {
        //   id: 2,
        //   Name: this.$t('processDesign_view.organiser')
        // },
        // {
        //   id: 3,
        //   Name: this.$t('processDesign_view.sponsorhimself')
        // },
        // {
        //   id: 4,
        //   Name: this.$t('processDesign_view.allHandledPersons')
        // }
      ],
      orgList: [
        {
          id: 1,
          Name: this.$t('processDesign_view.organizationBelong')
        },
        {
          id: 2,
          Name: this.$t('processDesign_view.parentOrganization')
        },
        {
          id: 3,
          Name: this.$t('processDesign_view.affiliatedOrganizationsAndSuperiorOrganizations')
        }
      ],
      addformbase: {},
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
        if (this.memberId.roleruleList) {
          for (const i in this.memberId.roleruleList) {
            let item = this.memberId.roleruleList[i];
            this.formValidate.serviceIdList.push(Number(item.key));
            this.formValidate.serviceIdNameList.push(item.label);
          }
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
      this.selected = param
      // this.selected = param.map(item => {
      //   return {
      //     label: item.roleName,
      //     key: item.id
      //   };
      // })
      ;
    },
    getlist () {
      this.getbaseclassification();
    },
    // 获取岗位信息
    async getbaseclassification () {
      this.table_loading = true;
      // await roleApi.getAllRole(this.searchForm).then(res => {
      //   console.log('roleresult=>', res.data.content);
      //   this.table_loading = false;
      //   this.stepdata = this.selectFromId(res.data.content, this.formValidate.serviceIdList);
      // });
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
      console.log(this.addformbase.personnel, this.addformbase.organization);
      if (!this.addformbase.personnel) {
        this.$Message['warning']({
          background: true,
          content: '请选择人员类型'
        });
        return false;
      }
      if (!this.addformbase.organization) {
        this.$Message['warning']({
          background: true,
          content: '请选择组织类型'
        });
        return false;
      }
      const person = this.personList[this.addformbase.personnel - 1].Name;
      const organization = this.orgList[this.addformbase.organization - 1].Name;
      this.modal_loading = true;
      const fin = `[${person}] [${organization}] [${this.selected.postName}]`;
      const array = [
        { value: 1, label: fin }
      ];
      try {
        setTimeout(() => {
          this.modal_loading = false;
          this.$emit('updateStat', false, array, this.addformbase);
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          this.modal_loading = false;
          this.$emit('updateStat', false, array, this.addformbase);
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
