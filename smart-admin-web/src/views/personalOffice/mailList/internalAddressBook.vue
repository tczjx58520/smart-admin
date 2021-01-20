<template>
  <div>
    <Card dis-hover>
      <div style="display: flex;align-items: center;">
        <div style="margin-right: 7px">{{ $t("name") }}</div>
        <div>
          <Input v-model="listQuery.employeeName"
                 clearable />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("phone") }}</div>
        <div>
          <Input v-model="listQuery.phone"
                 clearable />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">QQ</div>
        <div>
          <Input v-model="listQuery.qq"
                 clearable />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("email") }}</div>
        <div>
          <Input v-model="listQuery.mail"
                 clearable />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("organization1") }}</div>
        <div>
          <Select v-model="listQuery.organizationId"
                  style="width:150px"
                  clearable>
            <Option v-for="item in organizeList"
                    :value="item.id"
                    :key="item.id">{{item.organizeName}}</Option>
          </Select>
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
                icon="md-add"
                type="warning">{{ $t('Import') }}</Button>
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
import { organization } from '@/api/organization';
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
          key: 'employeeName'
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
          title: this.$t('belongOrganization'),
          key: 'position'
        },
        {
          title: this.$t('position1'),
          key: 'position'
        },
        {
          title: this.$t('phone'),
          key: 'phone'
        },
        {
          title: this.$t('email'),
          key: 'email'
        }
      ],
      tableData: [],
      total: 0,
      listQuery: Object.assign({}, defaultListQuery),
      organizeList: []
    };
  },
  created () {
    this.getList();
    this.getOrganizationList();
  },
  methods: {
    getList () {
      addressBook.findInnerAddressBook(this.listQuery).then(res => {
        this.tableData = res.data.list;
      });
    },
    getOrganizationList () {
      organization.organizationlist().then(res => {
        const list = res.data.content;
        list.forEach(element => {
          const data = {
            id: element.id,
            organizeName: element.organizeName
          };
          this.organizeList.push(data);
          if (element.children) {
            element.children.forEach(child => {
              const childData = {
                id: child.id,
                organizeName: child.organizeName
              };
              this.organizeList.push(childData);

              if (child.children) {
                child.children.forEach(grandson => {
                  const grandsonData = {
                    id: grandson.id,
                    organizeName: grandson.organizeName
                  };
                  this.organizeList.push(grandsonData);
                });
              }
            });
          }
        });
      });
    },
    changePageNum (val) {
      this.listQuery.pageNum = val;
    },
    changePageSize (val) {
      this.listQuery.pageSize = val;
    },
    refresh () {
      this.getList();
    },
    handleSelect () {
      this.getList();
    }
  }
};
</script>
