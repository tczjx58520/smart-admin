<template>
        <Modal v-model="mymoadlStat" class="add" width="720" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('usermanage_view.adduser') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <div style="display:flex; align-items: center;">
                <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                <div>{{$t('BaseData')}}</div>
                </div>
                <Divider />
                <Table :columns="columns" :data="dataList" :loading="loading"></Table>
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
import { assessmentTaskApi } from '@/api/assessmentTask';
export default {
  name: 'viewtaskDetail',
  components: {
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null
  },
  created () {
    console.log('moadlStat=======>', this.modalstat);
  },
  mounted () {
  },
  data () {
    return {
      columns: [
        {
          title: this.$t('assessmentTask_view.examiner'),
          key: 'a',
          width: '200'
        },
        {
          title: this.$t('assessmentTask_view.hadexaminer'),
          key: 'b',
          width: '200'
        },
        {
          title: this.$t('assessmentTask_view.unassessedPerson'),
          key: 'c'
        }
      ],
      dataList: [],
      loading: false,
      GongList: [],
      SheList: [],
      itemsList: [],
      allitems: [],
      // ===============================>
      socialSecurity: true,
      accumulationFund: true,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {
      },
      // 新建员工弹窗
      visiable_emp: false
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        this.getList(this.editinfo.id);
      }
    }
  },
  methods: {
    concatarry (a, b, c) {
      if (typeof (a) === 'undefined') {
        a = [];
      }
      if (typeof (b) === 'undefined') {
        b = [];
      }
      if (typeof (c) === 'undefined') {
        c = [];
      }
      console.log(typeof (a), [...a], typeof (b), b, typeof (c), c);
      let al = a.length;
      let bl = b.length;
      let cl = c.length;
      let lengtharry = [al, bl, cl];
      let processlen = lengtharry.sort((a, b) => { return a - b; });
      let proceesarry = [];
      console.log('processlen=======', processlen[2]);
      for (let i = 0; i < processlen[2]; i++) {
        console.log('i==================', i, a[i], b[i], c[i]);
        let data = {};
        data.a = a[i] || '';
        data.b = b[i] || '';
        data.c = c[i] || '';
        proceesarry.push(data);
      }
      this.dataList = proceesarry;
      console.log('proceesarry===============', proceesarry);
    },
    async getList (id) {
      let data = {};
      data.taskId = id;
      let process = null;
      await assessmentTaskApi.queryTaskDetail(data).then(res => {
        process = res.data.content;
      });
      process.testHandleStr = process.testHandleName.join(',');
      process.testEndStr = process.testEndName.join(',');
      process.unTestStr = process.unTestName.join(',');
      this.concatarry(process.testHandleName, process.testEndName, process.unTestName);
    },
    cancel () {
      this.reset();
      this.$emit('updateStat', false);
    },
    reset () {
      for (let key in this.addformbase) {
        delete this.addformbase[key];
      }
    },
    handsave () {
      this.modal_loading = true;
      console.log(this.addformbase);
      this.addformbase.createId = this.$store.state.user.userId;
      console.log(this.addformbase);
      this.$refs['form'].validate((valid) => {
        if (valid) {
          assessmentTaskApi.addassessmentTask(this.addformbase).then(res => {
            if (res.ret === 200) {
              this.modal_loading = false;
              this.$emit('updateStat', false);
              this.$Message.success(res.msg);
              this.reset();
            }
          });
        } else {
          this.$Message.error('Fail!');
          this.modal_loading = false;
        }
      });
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
