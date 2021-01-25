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
        stripe
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
  computed: {
    listshow () {
      const value = this.tableData.every(item => {
        console.log(item.listDisplay);
        return item.listDisplay === 1;
      });
      console.log(value);
      return value ? 1 : 0;
    },
    editshow () {
      const value = this.tableData.every(item => {
        console.log(item.editDisplay);
        return item.editDisplay === 1;
      });
      console.log(value);
      return value ? 1 : 0;
    }
  },
  watch: {
    // tableData: {
    //   handler () {

    //   },
    //   deep: true
    // }
  },
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
                  that.$set(that.tableData[params.index], 'listDisplay', event);
                },
                'on-change': function (event) {
                  that.update(params.row);
                }
              }
            });
          },
          renderHeader: (h, params) => {
            const that = this;
            return h('div', [
              h('span', params.column.title),
              h('i-switch', {
                props: {
                  'true-value': 1,
                  'false-value': 0,
                  value: this.listshow
                },
                on: {
                  'on-change': function (event) {
                    that.Gongloading = true;
                    const arr = that.tableData.map(item => {
                      item.listDisplay = event;
                      return that.update(item);
                    });
                    Promise.all(arr).then(res => {
                      that.getList();
                    });
                  }
                }
              })
            ]);
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
                  console.log(event, params.index);
                  that.$set(that.tableData[params.index], 'editDisplay', event);
                  params.row.editDisplay = event;
                  that.update(params.row);
                },
                'on-change': function (event) {
                //   that.update(params.row);
                }
              }
            });
          },
          renderHeader: (h, params) => {
            const that = this;
            return h('div', [
              h('span', params.column.title),
              h('i-switch', {
                props: {
                  'true-value': 1,
                  'false-value': 0,
                  value: this.editshow
                },
                on: {
                  'on-change': function (event) {
                    that.Gongloading = true;
                    const arr = that.tableData.map(item => {
                      // that.$set(item, 'editDisplay', event);
                      item.editDisplay = event;
                      return that.update(item);
                    });
                    Promise.all(arr).then(res => {
                      that.getList();
                    });
                  }
                }
              })
            ]);
          }
        }
        // {
        //   title: this.$t('usrequire'),
        //   key: 'required',
        //   align: 'center',
        //   render: (h, params) => {
        //     const that = this;
        //     return h('i-switch', {
        //       props: {
        //         value: params.row.required,
        //         'true-value': 1,
        //         'false-value': 0
        //       },
        //       on: {
        //         input: function (event) {
        //           console.log(event);
        //           params.row.required = event;
        //           that.update(params.row);
        //         },
        //         'on-change': function (event) {
        //         //   that.update(params.row);
        //         }
        //       }
        //     });
        //   },
        //   renderHeader: (h, params) => {
        //     const that = this;
        //     return h('div', [
        //       h('span', params.column.title),
        //       h('i-switch', {
        //         props: {
        //           'true-value': 1,
        //           'false-value': 0
        //         },
        //         on: {
        //           'on-change': function (event) {
        //             that.tableData.map(item => {
        //               item.required = event;
        //               that.update(item);
        //             });
        //           }
        //         }
        //       })
        //     ]);
        //   }
        // }
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
      this.getList();
    },
    update (item) {
      console.log('item=======', item);
      return fixedField.updatestorage(item).then((res) => {
        // this.getList();
      });
    }
  }
};
</script>
