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
      <span>选择签署合同人员</span>
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
import { empInduction } from '@/api/empInduction';
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
        isContract: 1
      },
      loading: false,
      pageTotal: 0,
      columns: [
        {
          title: this.$t('xm'),
          key: 'employeeName'
        },
        {
          title: this.$t('sszz'),
          key: 'organizeName'
        },
        {
          title: this.$t('ssgw'),
          key: 'postName'
        },
        {
          title: this.$t('jhrzsj'),
          key: 'onDate'
        },
        {
          title: this.$t('xb'),
          render:(h,params) =>{
            if (params.row.gender === 1) {
              return h('span', this.$t('nan'))
            } else {
              return h('span', this.$t('nv'))
            }
          },
        },
        {
          title: this.$t('sjh'),
          key: 'phone'
        },
      ],
      data: [],
      current: {}
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.modalstat) {
        this.getempInductionList();
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
      this.getempInductionList();
    },
    // 改变一页展示数
    changePageSize (pageSize) {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getempInductionList();
    },
    getempInductionList () {
      this.loading = true;
      empInduction.getempInductionList(this.searchform).then(res => {
        this.loading = false;
        this.data = res.data.content.list;
      });
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
