<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="720"
    :closable="false"
    :mask-closable="false"
    :transfer="false"
    :styles="{ top: '10px' }"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>{{ $t("addAssessmentMark") }}</span>
    </div>
    <div>
      <Card dis-hover>
        <div style="display: flex; align-items: center">
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
        <Table :columns="columns" :data="dataList" :loading="loading" max-height="400">
          <template slot-scope="{ row }" slot="repositoryLevelName">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row }" slot="repositoryName">
            <strong>{{ row.repositoryName }}</strong>
          </template>
          <template slot-scope="{ index }" slot="marketCost">
            <Input v-model="dataList[index].marketCost" placeholder="Enter"/>
          </template>
        </Table>
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
import { assessmentTaskApi } from '@/api/assessmentTask';
export default {
  name: 'viewtaskDetail',
  components: {},
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null
  },
  created () {},
  mounted () {},
  data () {
    return {
      columns: [
        {
          title: this.$t('mdjb'),
          slot: 'repositoryLevelName',
          width: '200'
        },
        {
          title: this.$t('mdmc'),
          slot: 'repositoryName',
          width: '200'
        },
        {
          title: this.$t('yinxiaotourufeiyong'),
          slot: 'marketCost'
        }
      ],
      dataList: [],
      loading: false,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {}
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        this.getDetailLIst();
      }
    }
  },
  methods: {
    cancel () {
      this.reset();
      this.$emit('updateStat', false);
    },
    reset () {},
    getDetailLIst () {
      assessmentTaskApi.getAssessmentMarket(this.editinfo.id).then(res => {
        if (res.data.length === 0) {
          const repositoryNameList = this.editinfo.repositoryNames.split(',');
          const id = this.editinfo.repositoryIds.split(',').map(Number);
          let result = repositoryNameList.map((repositoryName, i) => ({ repositoryName, repositoryId: id[i], marketCost: 0, taskId: this.editinfo.id }));
          this.dataList = result;
        } else {
          this.dataList = res.data.content;
          console.log(this.dataList);
        }
      });
    },
    handsave () {
      this.modal_loading = true;
      console.log(this.dataList);
      const data = JSON.stringify(this.dataList);
      assessmentTaskApi.addAssessmentMarket(data).then(res => {
        if (res.ret === 200) {
          this.modal_loading = false;
          this.$emit('updateStat', false);
          this.$Message.success(res.msg);
        }
      });
      // this.$refs['form'].validate((valid) => {
      //   if (valid) {
      //     assessmentTaskApi.addassessmentTask(this.addformbase).then((res) => {
      //       if (res.ret === 200) {
      //         this.modal_loading = false;
      //         this.$emit('updateStat', false);
      //         this.$Message.success(res.msg);
      //         this.reset();
      //       }
      //     });
      //   } else {
      //     this.$Message.error('Fail!');
      //     this.modal_loading = false;
      //   }
      // });
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
