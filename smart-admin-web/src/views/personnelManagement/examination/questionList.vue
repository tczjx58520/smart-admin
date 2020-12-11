<template>
  <div>
    <Card class="warp-card"
          dis-hover>
      <div>
        <Button style="margin-right:15px;"
                icon="md-refresh"
                @click="refresh"
                type="default">{{ $t('Reflash') }}</Button>
        <input class="input-file"
               type="file"
               @change="exportData"
               accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        <Button style="margin-right:15px;"
                v-privilege="['10-15-3']"
                @click="btnClick"
                icon="md-add"
                type="success">{{ $t('Import') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['10-15-3']"
                @click="deleteMore"
                icon="md-close"
                type="error">{{ $t('Delete') }}</Button>

      </div>
    </Card>

    <Card style="margin-top:10px">
      <Table max-height="500px"
             :columns="Gongcolumns"
             :data="tableData"
             :loading="Gongloading"
             @on-selection-change="handleSelect"></Table>
      <Page :current="listQuery.pageNum"
            :page-size="listQuery.pageSize"
            :page-size-opts="[10, 20, 30, 50, 100]"
            :total="GongpageTotal"
            @on-change="GongchangePage"
            @on-page-size-change="GongchangePageSize"
            show-elevator
            show-sizer
            show-total
            style="margin:24px 0;text-align:right;"></Page>
    </Card>
    <!-- <Modal width="720"
           v-model="modal1"
           :title="$t('addTrainingTask')"
           @on-ok="ok"
           @on-cancel="cancel">
      <Form :model="formItem"
            :label-width="80">
        <FormItem :label="$t('topicClassification')">
          <Input v-model="formItem.input"
                 placeholder="Enter something..." />
        </FormItem>
        <FormItem :label="$t('topicName')">
          <Input v-model="formItem.input"
                 placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem :label="$t('topicOptions')">
          <Input v-model="formItem.input"
                 placeholder="Enter something..."></Input>
        </FormItem>
      </Form>
    </Modal> -->
  </div>
</template>
<script>
import XLSX from 'xlsx';
import { examination } from '@/api/examination';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  typeId: null
};
export default {
  name: 'HelloWorld',
  props: {
    type: String,
    default: '选择excel文件'
  },
  data () {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      GongpageTotal: 0,
      Gongloading: false,
      // formItem: {},
      // modal1: false,
      Gongcolumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('QuestionName'),
          key: 'choiceInfo'
        },
        {
          title: this.$t('BelongType'),
          key: 'typeName'
        },
        {
          title: this.$t('correctAnswer'),
          key: 'choiceAnsw'
        },
        {
          title: this.$t('createName'),
          key: 'employeeName'
        },
        {
          title: this.$t('action'),
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.row.id);
                  }
                }
              }, this.$t('Delete'))
            ]);
          }
        }
      ],
      tableData: [],
      addList: [],
      selectedData: null

    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {
    this.listQuery.typeId = Number(this.$route.query.id);
  },
  beforeMount () {

  },
  mounted () {
    this.getQuestionList();
  },
  methods: {
    refresh () {
      this.listQuery.pageNum = 1;
      this.getQuestionList();
    },
    handleSelect (val) {
      this.selectedData = val;
    },
    btnClick () {
      document.querySelector('.input-file').click();
    },
    exportData (event) {
      if (!event.currentTarget.files.length) {
        return;
      }
      const that = this;
      // 拿取文件对象
      let f = event.currentTarget.files[0];
      // 用FileReader来读取
      let reader = new FileReader();
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function (f) {
        let binary = '';
        let wb; // 读取完成的数据
        let outdata; // 你需要的数据
        let reader = new FileReader();
        reader.onload = function (e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          let bytes = new Uint8Array(reader.result);
          let length = bytes.byteLength;
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          // 接下来就是xlsx了，具体可看api
          wb = XLSX.read(binary, {
            type: 'binary'
          });
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          // 自定义方法向父组件传递数据
          console.log('outdata = ' + JSON.stringify(outdata));
          // that.$emit('getResult', outdata);

          for (let i = 0; i < outdata.length; i++) {
            const choiceInfo = outdata[i]['题目'];
            const choiceAnsw = outdata[i]['答案'];
            const choiceA = outdata[i]['选项'].split('；')[0];
            const choiceB = outdata[i]['选项'].split('；')[1];
            const choiceC = outdata[i]['选项'].split('；')[2];
            const choiceD = outdata[i]['选项'].split('；')[3];
            const data = {
              choiceInfo: choiceInfo,
              choiceAnsw: choiceAnsw,
              choiceA: choiceA,
              choiceB: choiceB,
              choiceC: choiceC,
              choiceD: choiceD,
              createId: that.$store.state.user.userLoginInfo.id,
              typeId: that.listQuery.typeId
            };
            console.log(data);
            that.addList.push(data);
          }

          examination.addQuestion(that.addList).then(res => {
            console.log(res);

            that.addList = [];
            console.log(111111111, that.addList);
            that.getQuestionList();
          });
        };
        reader.readAsArrayBuffer(f);
      };
      reader.readAsBinaryString(f);
      this.getQuestionList();
    },
    // 获取题目列表
    getQuestionList () {
      console.log(this.listQuery);
      this.Gongloading = true;
      examination.findQuestionsList(this.listQuery).then(res => {
        console.log(res);
        this.tableData = res.data.list;
        this.Gongloading = false;
        this.GongpageTotal = res.data.totalCount;
      });
    },
    // 页码修改
    GongchangePage (val) {
      this.listQuery.pageNum = val;
      this.getQuestionList();
    },
    // 每页展示修改
    GongchangePageSize (val) {
      this.listQuery.pageSize = val;
      this.getQuestionList();
    },
    // 多选删除
    deleteMore () {
      console.log(this.selectedData);
      if (this.selectedData === null || this.selectedData === '' || this.selectedData === undefined) {
        this.$Message.error('请先选择一行');
        return false;
      }
      const ids = [];
      for (let i = 0; i < this.selectedData.length; i++) {
        ids.push(this.selectedData[i].id);
      }
      examination.deleteQuestion(ids).then(res => {
        this.$Message.success('删除成功');
        this.listQuery.pageNum = 1;
        this.getQuestionList();
      });
    },
    // 删除题目
    remove (ids) {
      const idList = [];
      idList.push(ids);
      examination.deleteQuestion(idList).then(res => {
        this.$Message.success('删除成功');
        this.listQuery.pageNum = 1;
        this.getQuestionList();
      });
    }

  }
};

</script>
<style scoped>
.input-file {
  display: none;
}
</style>
