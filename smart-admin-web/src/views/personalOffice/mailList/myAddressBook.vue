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
  </div>
</template>
<script>
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10
};
export default {
  data () {
    return {
      tablecolumns: [],
      tableData: [],
      total: 0,
      listQuery: Object.assign({}, defaultListQuery)
    };
  },
  methods: {
    changePageNum (val) {
      this.listQuery.pageNum = val;
    },
    changePageSize (val) {
      this.listQuery.pageSize = val;
    },
    refresh () {

    },
    addAddressBook () {

    },
    deleteMore () {

    }
  }
};
</script>
