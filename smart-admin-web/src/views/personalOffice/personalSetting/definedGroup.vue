<template>
  <div>
    <Card class="warp-card"
          dis-hover>
      <div>
        <Button style="margin-right:15px;"
                icon="md-refresh"
                @click="refresh"
                type="default">{{ $t('Reflash') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['10-15-1']"
                @click="addAddressBook"
                icon="md-add"
                type="warning">{{ $t('Create') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['10-15-3']"
                @click="deleteMore"
                icon="md-close"
                type="error">{{ $t('Delete') }}</Button>
      </div>
    </Card>

    <Card style="margin-top:10px">
      <Table max-height="500px"
             :columns="tablecolumns"
             :data="tableData"
             @on-selection-change="changeTable"></Table>
      <Page :current="listQuery.pageNum"
            :page-size="listQuery.pageSize"
            :page-size-opts="[10, 20, 30, 50, 100]"
            :total="total"
            @on-change="changePageNum"
            @on-page-size-change="changePageSize"
            show-elevator
            show-sizer
            show-total
            style="margin:24px 0;text-align:right;"></Page>
    </Card>
    <Modal v-model="modal1"
           width="720px"
           :title="$t('tjtxl')">
      <Form :model="formItem"
            :label-width="80"
            inline>
        <FormItem label="群组名称"
                  style="width:40%">
          <Input v-model="formItem.groupName"
                 placeholder="Enter something..."></Input>
        </FormItem>
      </Form>

      <div slot="footer">
        <ButtonGroup>
          <Button type="primary"
                  size="large"
                  @click="ok">{{ $t("Save") }}</Button>
          <Button type="error"
                  size="large"
                  @click="cancel">{{
            $t("Close")
          }}</Button>
        </ButtonGroup>
      </div>
    </Modal>
  </div>
</template>
<script>
import { personSetting } from '@/api/personSetting';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  employeeId: null
};
export default {
  data () {
    return {
      modal1: false,
      tablecolumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('groupName'),
          key: 'groupName'
        }
      ],
      tableData: [],
      total: 0,
      listQuery: Object.assign({}, defaultListQuery),
      formItem: {},
      selectedData: null
    };
  },
  created () {
    this.getList();
  },
  methods: {
    getList () {
      this.listQuery.employeeId = this.$store.state.user.userLoginInfo.userId;
      personSetting.findGroup(this.listQuery).then(res => {
        console.log(res);
        this.tableData = res.data.list;
        this.total = res.data.totalCount;
      });
    },
    changePageNum (val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    changePageSize (val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    changeTable (val) {
      this.selectedData = val;
      console.log(this.selectedData);
    },
    refresh () {
      this.getList();
    },
    addAddressBook () {
      this.modal1 = true;
    },
    deleteMore () {
      const idList = [];
      this.selectedData.forEach(element => {
        idList.push(element.id);
      });
      personSetting.deleteGroup(idList).then(res => {
        this.$Message.success('删除成功');
        this.getList();
      });
    },
    ok () {
      this.modal1 = false;
      const data = {
        employeeId: this.$store.state.user.userLoginInfo.userId,
        groupName: this.formItem.groupName
      };
      personSetting.addGroup(data).then(res => {
        this.getList();
        this.$Message.success('添加成功');
      });
    },
    cancel () {
      this.modal1 = false;
      this.formItem = {};
    }
  }
};
</script>
