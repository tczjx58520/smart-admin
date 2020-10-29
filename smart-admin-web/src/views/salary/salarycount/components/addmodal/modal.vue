<template>
        <Modal v-model="mymoadlStat" class="add" width="1020" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('usermanage_view.adduser') }}</span>
        </div>
        <div>
            <Card dis-hover>
              <Table class="mytable" :columns="columns4" :data="Gongdata" :loading="Gongloading"></Table>
              <Page :current="searchform.pageNum" :page-size="searchform.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
              :total="pageTotal" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator show-sizer
              show-total style="margin:24px 0;text-align:right;"></Page>
            </Card>

        </div>
        <div slot="footer">
            <ButtonGroup>
                <!-- <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button> -->
                <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
            </ButtonGroup>
        </div>
    </Modal>
</template>
<script>
import { salarycountApi } from '@/api/salarycount';
export default {
  name: 'addModal',
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    queryinfo: null
  },
  created () {
  },
  data () {
    return {
      // 保存按钮加载状态
      modal_loading: false,
      mymoadlStat: this.modalstat,
      treedata: [],
      columns4: [
        {
          title: '用户名',
          key: 'empName',
          align: 'center',
          width: 100,
          fixed: 'left'
        },
        {
          title: '年份',
          key: 'year',
          width: 100,
          fixed: 'left'
        },
        {
          title: '总计',
          children: [
            {
              title: '实发',
              key: 'allActual',
              width: 100
            },
            {
              title: '应发',
              key: 'allShould',
              width: 100
            }
          ]
        },
        {
          title: '一月',
          children: [
            {
              title: '实发',
              key: 'oneActual',
              width: 100
            },
            {
              title: '应发',
              key: 'oneShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '二月',
          children: [
            {
              title: '实发',
              key: 'twoActual',
              width: 100
            },
            {
              title: '应发',
              key: 'twoShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '三月',
          children: [
            {
              title: '实发',
              key: 'threeActual',
              width: 100
            },
            {
              title: '应发',
              key: 'threeShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '四月',
          children: [
            {
              title: '实发',
              key: 'fourActual',
              width: 100
            },
            {
              title: '应发',
              key: 'fourShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '五月',
          children: [
            {
              title: '实发',
              key: 'fiveActual',
              width: 100
            },
            {
              title: '应发',
              key: 'fiveShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '六月',
          children: [
            {
              title: '实发',
              key: 'sixActual',
              width: 100
            },
            {
              title: '应发',
              key: 'sixShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '七月',
          children: [
            {
              title: '实发',
              key: 'sevenActual',
              width: 100
            },
            {
              title: '应发',
              key: 'sevenShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '八月',
          children: [
            {
              title: '实发',
              key: 'eightActual',
              width: 100
            },
            {
              title: '应发',
              key: 'eightShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '九月',
          children: [
            {
              title: '实发',
              key: 'nineActual',
              width: 100
            },
            {
              title: '应发',
              key: 'nineShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '十月',
          children: [
            {
              title: '实发',
              key: 'tenActual',
              width: 100
            },
            {
              title: '应发',
              key: 'tenShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '十一月',
          children: [
            {
              title: '实发',
              key: 'elevenActual',
              width: 100
            },
            {
              title: '应发',
              key: 'elevenShould',
              width: 100
            }
          ],
          width: 100
        },
        {
          title: '十二月',
          children: [
            {
              title: '实发',
              key: 'twelveActual',
              width: 100
            },
            {
              title: '应发',
              key: 'twelveShould',
              width: 100
            }
          ],
          width: 100
        }
      ],
      // 人员搜查id
      searchform: {
        pageNum: 1,
        pageSize: 10
      },
      pageTotal: 0,
      Gongdata: [],
      Gongloading: true
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      console.log(this.queryinfo);
      if (this.mymoadlStat) {
        this.getdeataillist();
      }
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    cancel () {
      this.$emit('updateStat', false);
    },
    // ===========================>组织架构结束<==========================================
    // 获取员工列表
    getdeataillist () {
      this.Gongloading = true;
      this.searchform.organizeId = this.queryinfo.organizeId;
      this.searchform.year = this.queryinfo.year;
      salarycountApi.getdetailbyId(this.searchform).then(res => {
        this.Gongdata = res.data.content.list;
        this.pageTotal = res.data.content.list.totalCount;
        this.Gongloading = false;
      });
    },
    // 分页函数
    changePage (pageNum) {
      console.log(pageNum);
      this.searchform.pageNum = pageNum;
      this.getemplist();
    },
    changePageSize (pageSize) {
    //   this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getemplist();
    },
    // 搜索函数
    search () {
      this.getemplist();
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
</style>
