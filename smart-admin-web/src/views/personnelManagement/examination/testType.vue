<template>
  <div>
    <Card class="warp-card"
          dis-hover>
      <div>
        <Button style="margin-right:15px;"
                icon="md-refresh"
                @click="refresh"
                type="default">{{ $t('Reflash') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['10-15-1']"
                @click="addGong"
                icon="md-add"
                type="warning">{{ $t('Create') }}</Button>
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
             @on-selection-change="changeTable"></Table>
      <Page :current="Gongsearchform.pageNum"
            :page-size="Gongsearchform.pageSize"
            :page-size-opts="[10, 20, 30, 50, 100]"
            :total="GongpageTotal"
            @on-change="GongchangePage"
            @on-page-size-change="GongchangePageSize"
            show-elevator
            show-sizer
            show-total
            style="margin:24px 0;text-align:right;"></Page>
    </Card>
    <Modal width="720"
           v-model="modal1"
           :title="$t('addTrainingTask')">
      <Form :model="formItem"
            ref="formRef"
            :rules="ruleInline"
            :label-width="100">
        <FormItem :label="$t('TestType')"
                  prop="typeName">
          <Input v-model="formItem.typeName"
                 placeholder="Enter something..." />
        </FormItem>
        <FormItem :label="$t('Desc')"
                  prop="desc">
          <Input v-model="formItem.desc"
                 type="textarea"
                 placeholder="Enter something..."></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <ButtonGroup>
          <Button type="primary"
                  size="large"
                  @click="ok">{{ $t("Save") }}</Button>
          <Button type="error"
                  size="large"
                  @click="cancel">{{
            $t("Close")
          }}</Button>
        </ButtonGroup>
      </div>
    </Modal>
    <Modal width="720"
           v-model="modal_edit"
           :title="$t('addTrainingTask')">
      <Form :model="formItem"
            ref="formRef"
            :rules="ruleInline"
            :label-width="100">
        <FormItem :label="$t('TestType')"
                  prop="typeName">
          <Input v-model="formItem.typeName"
                 placeholder="Enter something..." />
        </FormItem>
        <FormItem :label="$t('Desc')"
                  prop="desc">
          <Input v-model="formItem.desc"
                 type="textarea"
                 placeholder="Enter something..."></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <ButtonGroup>
          <Button type="primary"
                  size="large"
                  @click="ok_edit">{{ $t("Save") }}</Button>
          <Button type="error"
                  size="large"
                  @click="cancel_edit">{{
            $t("Close")
          }}</Button>
        </ButtonGroup>
      </div>
    </Modal>
  </div>
</template>
<script>
import { examination } from '@/api/examination';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10
};
const defaultFormItem = {
  typeName: null,
  desc: null,
  createId: null
};
export default {
  data () {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      GongpageTotal: 0,
      Gongloading: false,
      Gongsearchform: {
        pageNum: 1,
        pageSize: 10
      },
      formItem: Object.assign({}, defaultFormItem),
      modal1: false,
      modal_edit: false,
      Gongcolumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('TestType'),
          key: 'typeName'
        },
        {
          title: this.$t('Desc'),
          key: 'desc'
        },
        {
          title: this.$t('createName'),
          key: 'employeeName'
        },
        {
          title: this.$t('createTime'),
          key: 'createTime'
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
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.row);
                  }
                }
              }, this.$t('Update')),
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
      ruleInline: {
        typeName: [
          {
            required: true,
            message: 'Please fill in the materialsName',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: 'Please fill in the describe',
            trigger: 'blur'
          }
        ]
      },
      tableData: [],
      selectedData: []

    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () { },
  beforeMount () {

  },
  mounted () {
    this.getTestType();
  },
  methods: {
    changeTable (val) {
      this.selectedData = val;
    },
    // 获取考试类型列表
    getTestType () {
      this.Gongloading = true;
      examination.findTestType(this.listQuery).then(res => {
        this.Gongloading = false;
        console.log(res);
        this.tableData = res.data.list;
        this.GongpageTotal = res.data.totalCount;
      });
    },
    show (row) {
      this.modal_edit = true;
      this.formItem = Object.assign({}, row);
      console.log(row);
    },

    GongchangePage (val) {
      console.log(val);
    },
    GongchangePageSize (val) {
      console.log(val);
    },
    addGong () {
      this.modal1 = true;
    },
    refresh () {
      this.listQuery.pageNum = 1;
      this.getTestType();
    },
    ok () {
      this.formItem.createId = this.$store.state.user.userLoginInfo.id;
      this.$refs.formRef.validate(valid => {
        console.log(valid);
        if (!valid) {
          this.$Message.error(this.$t('qsrwzxx'));
        } else {
          const data = JSON.stringify(this.formItem);
          examination.addTestType(data).then(res => {
            this.getTestType();
            this.formItem = Object.assign({}, defaultFormItem);
            this.$Message.success('添加成功');
            this.modal1 = false;
          });
        }
      });
    },
    cancel () {
      this.modal1 = false;
      this.formItem = Object.assign({}, defaultFormItem);
      this.$Message.info('Clicked cancel');
    },
    ok_edit () {
      this.formItem.createId = this.$store.state.user.userLoginInfo.id;
      examination.updateTestType(this.formItem).then(res => {
        this.getTestType();
        this.formItem = Object.assign({}, defaultFormItem);
        this.$Message.success('修改成功');
        this.modal_edit = false;
      });
    },
    cancel_edit () {
      this.formItem = Object.assign({}, defaultFormItem);
      this.modal_edit = false;
    },
    remove (id) {
      const ids = [];
      ids.push(id);
      examination.deleteTestType(ids).then(res => {
        this.$Message.success('删除成功');
        this.getTestType();
      });
    },
    deleteMore () {
      console.log(111111111, this.selectedData);
      if (this.selectedData.length === 0) {
        this.$Message.error('请先选择一行');
        return false;
      }
      const ids = [];
      for (let i = 0; i < this.selectedData.length; i++) {
        ids.push(this.selectedData[i].id);
      }
      examination.deleteTestType(ids).then(res => {
        this.$Message.success('删除成功');
        this.getTestType();
      });
    }
  }
};

</script>
