<template>
  <div>
    <Card dis-hover>
      <div style="display: flex;align-items: center;">
        <div style="margin-right: 7px">{{ $t("organization1") }}</div>
        <div>
          <Input v-model="listQuery.name" />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("people") }}</div>
        <div>
          <Input v-model="listQuery.phone" />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("date") }}</div>
        <div>
          <Input v-model="listQuery.email" />
        </div>

        <Button type="primary"
                style="margin-left: 15px"
                @click="handleSelect">{{ $t("Search") }}</Button>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("statisticType") }}</div>
        <div>
          <RadioGroup v-model="listQuery.animal">
            <Radio label="周"></Radio>
            <Radio label="年"></Radio>
            <Radio label="月"></Radio>
          </RadioGroup>
        </div>
      </div>
    </Card>

    <Card style="margin-top:10px">
      <Table max-height="500px"
             :columns="tablecolumns"
             :data="tableData"
             @on-selection-change="changeTable">
      </Table>
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
      assignmentVisible: false,
      tablecolumns: [
        {
          title: this.$t('people'),
          key: 'key'
        },
        {
          title: this.$t('organization1'),
          key: 'sex'
        },
        {
          title: this.$t('taskNumber'),
          key: 'position'
        },
        {
          title: this.$t('ing'),
          key: 'position'
        },
        {
          title: this.$t('yyq'),
          key: 'position'
        },
        {
          title: this.$t('wcl'),
          key: 'position'
        }
      ],
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
    changeTable (val) {

    },
    handleSelect () {

    }
  }
};
</script>
