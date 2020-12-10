<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="1040"
    :closable="false"
    :mask-closable="false"
    :transfer="false"
    :styles="{ top: '10px' }"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>选择审批单据</span>
    </div>
    <div>
      <Card dis-hover>
        <div
          style="
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e1e1e1;
            padding-bottom: 20px;
          "
        >
          <div
            style="
              width: 4px;
              height: 20px;
              background: #2d8cf0;
              margin-right: 15px;
            "
          ></div>
          <div>{{ $t("BaseData") }}</div>
        </div>
        <Divider />
        <Table border highlight-row :columns="columns" :data="data" @on-current-change="selectCurrent"></Table>
        <Page
          :current="searchform.pageNum"
          :page-size="searchform.pageSize"
          :page-size-opts="[10, 20, 30, 50, 100]"
          :total="pageTotal"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          show-elevator
          show-sizer
          show-total
          style="margin: 24px 0; text-align: right"
        ></Page>
      </Card>
    </div>
    <div slot="footer">
      <ButtonGroup>
        <Button
          type="primary"
          size="large"
          :loading="modal_loading"
          @click="handsave"
          >{{ $t("Save") }}</Button
        >
        <Button type="error" size="large" @click="cancel">{{
          $t("Close")
        }}</Button>
      </ButtonGroup>
    </div>
  </Modal>
</template>
<script>
import { salaryjudgeApi } from '@/api/salaryjudge';
import { utils } from '@/lib/util';
export default {
  name: 'selectModal',
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null,
    myvalue: null
  },
  created () {},
  mounted () {},
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (
        this.addformbase.month === '' &&
        this.addformbase.month === null &&
        this.addformbase.month === undefined
      ) {
        callback(new Error('Please enter your month'));
      } else {
        callback();
      }
    };
    return {
      modal_loading: false,
      mymoadlStat: this.modalstat,
      searchform: {
        pageNum: 1,
        pageSize: 10,
        stat: 1
      },
      loading: false,
      pageTotal: 0,
      columns: [
        {
          title: this.$t('welfare_view.title'),
          key: 'title'
        },
        {
          title: this.$t('welfare_view.creatTime'),
          key: 'createDate',
          render: (h, params) => {
            console.log(params.row.createDate);
            const mydate = new Date(params.row.createDate);
            return h('span', utils.getDate(mydate, 'YMDHMS'));
          }
        },
        {
          title: this.$t('welfare_view.creatPerson'),
          key: 'createName'
        },
        {
          title: this.$t('welfare_view.suitable'),
          key: 'userName',
          render: (h, params) => {
            if (params.row.suitType === 2) {
              return h('span', this.$t('welfare_view.personnel'));
            } else {
              return h('span', this.$t('welfare_view.org'));
            }
          }
        },
        {
          title: this.$t('welfare_view.content'),
          key: 'content'
        }
      ],
      data: [],
      current: {}
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.modalstat) {
        this.getList();
      }
    }
  },
  methods: {
    selectCurrent (currentRow) {
      console.log(currentRow);
      this.current = currentRow;
    },
    // 翻页
    changePage (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getList();
    },
    // 改变一页展示数
    changePageSize (pageSize) {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getList();
    },
    async getList () {
      try {
        this.loading = true;
        let result = await salaryjudgeApi.getjudgeList(this.searchform);
        this.loading = false;
        this.data = result.data.content.list;
        this.pageTotal = result.data.content.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.loading = false;
      }
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    reset () {
      this.addformbase = {
        organizationOaName: '',
        organizationOa: '',
        empList: '',
        empListIds: '',
        title: '',
        contnet: '',
        suitType: '1'
      };
      this.$refs['form'].resetFields();
    },
    handsave () {
      this.$store.commit('setTransInfo', this.current);
      this.$emit('updateStat', false, this.myvalue);
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
