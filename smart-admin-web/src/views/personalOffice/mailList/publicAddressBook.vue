<template>
  <div>
    <Card dis-hover>
      <div style="display: flex;align-items: center;">
        <div style="margin-right: 7px">{{ $t("name") }}</div>
        <div>
          <Input v-model="searchForm.name"
                 clearable />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("phone") }}</div>
        <div>
          <Input v-model="searchForm.mobile"
                 clearable />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">QQ</div>
        <div>
          <Input v-model="searchForm.qq"
                 clearable />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("email") }}</div>
        <div>
          <Input v-model="searchForm.mail"
                 clearable />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("sharePerson") }}</div>
        <div>
          <Input v-model="searchForm.group"
                 clearable />
        </div>
        <Button type="primary"
                style="margin-left: 15px"
                @click="handleSelect">{{ $t("Search") }}</Button>
      </div>
    </Card>
    <Card class="warp-card"
          dis-hover>
      <div>
        <Button style="margin-right:15px;"
                icon="md-refresh"
                @click="refresh"
                type="default">{{ $t('Reflash') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['10-15-1']"
                @click="exportTable"
                icon="md-add"
                type="warning">{{ $t('daochu') }}</Button>
      </div>
    </Card>

    <Card style="margin-top:10px">
      <Table max-height="500px"
             :columns="tablecolumns"
             :data="tableData"></Table>
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
import { addressBook } from '@/api/addressBook';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10
};
export default {
  data () {
    return {
      tablecolumns: [
        {
          title: this.$t('name'),
          key: 'name'
        },
        {
          title: this.$t('sex'),
          key: 'gender',
          render: (h, params) => {
            if (params.row.gender === 0) {
              return h('span', '男');
            } if (params.row.gender === 1) {
              return h('span', '女');
            } else {
              return h('span', '未知');
            }
          }
        },
        {
          title: this.$t('position1'),
          key: 'post'
        },
        {
          title: this.$t('workAddress'),
          key: 'company'
        },
        {
          title: this.$t('address'),
          key: 'homeAddress'
        },
        {
          title: 'QQ',
          key: 'qq'
        },
        {
          title: this.$t('phone'),
          key: 'mobile'
        },
        {
          title: this.$t('email'),
          key: 'mail'
        },
        {
          title: this.$t('sharePerson'),
          key: 'position'
        }
      ],
      tableData: [],
      total: 0,
      listQuery: Object.assign({}, defaultListQuery),
      searchForm: {}
    };
  },
  created () {
    this.getList();
  },
  methods: {
    getList () {
      addressBook.findPublicAddressBook(this.searchForm, this.listQuery.pageNum, this.listQuery.pageSize).then(res => {
        console.log(22222222, res);
        this.tableData = res.data.list;
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

    refresh () {
      this.getList();
    },
    exportTable () {

    },
    handleSelect () {
      this.getList();
    }
  }
};
</script>
