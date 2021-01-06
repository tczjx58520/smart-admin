<template>
  <div>
    <Card class="warp-card" dis-hover>
      <div>
        <Button
          style="margin-right: 15px"
          icon="md-refresh"
          @click="refresh"
          type="default"
          >{{ $t("Reflash") }}</Button
        >
      </div>
    </Card>
    <Card style="margin-top: 10px">
      <Table
        border
        ref="selection"
        :max-height="500"
        :columns="columns4"
        :data="tableData"
        :loading="Gongloading"
      >
      </Table>
    </Card>
  </div>
</template>
<script>
import { fixedField } from '@/api/fixedField';
export default {
  components: {},
  data () {
    return {
      columns4: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('ziduanmingchen'),
          key: 'name',
          align: 'center'
        },
        {
          title: this.$t('isliebiaoshow'),
          key: 'listDisplay',
          align: 'center',
          render: (h, params) => {
            const that = this;
            return h('i-switch', {
              props: {
                value: params.row.listDisplay,
                'true-value': 1,
                'false-value': 0
              },
              on: {
                input: function (event) {
                  console.log(event);
                  params.row.listDisplay = event;
                },
                'on-change': function (event) {
                  that.update(params.row);
                }
              }
            });
          }
        },
        {
          title: this.$t('iseditshow'),
          key: 'editDisplay',
          align: 'center',
          render: (h, params) => {
            const that = this;
            return h('i-switch', {
              props: {
                value: params.row.editDisplay,
                'true-value': 1,
                'false-value': 0
              },
              on: {
                input: function (event) {
                  console.log(event);
                  params.row.editDisplay = event;
                },
                'on-change': function (event) {
                  that.update(params.row);
                }
              }
            });
          }
        },
        {
          title: this.$t('usrequire'),
          key: 'required',
          align: 'center',
          render: (h, params) => {
            const that = this;
            return h('i-switch', {
              props: {
                value: params.row.required,
                'true-value': 1,
                'false-value': 0
              },
              on: {
                input: function (event) {
                  console.log(event);
                  params.row.required = event;
                },
                'on-change': function (event) {
                  that.update(params.row);
                }
              }
            });
          }
        }
      ],
      Gongsearchform: {
        pageNum: 1,
        pageSize: 10
      },
      GongpageTotal: 0,
      Gongloading: false,
      tableData: []
    };
  },
  mounted () {
    this.getList();
  },
  methods: {
    getList () {
      this.Gongloading = true;
      fixedField.getstorage(this.listQuery).then((res) => {
        this.tableData = res.data;
        this.Gongloading = false;
      });
    },
    GongchangePage (val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    GongchangePageSize (val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    addGong () {
      this.visiable = true;
      console.log(111);
    },
    updateStat (stat) {
      this.visiable = stat;
      this.getList();
    },
    refresh () {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    update (item) {
      console.log('item=======', item);
      fixedField.updatestorage(item).then((res) => {
        this.getList();
      });
    }
  }
};
</script>
