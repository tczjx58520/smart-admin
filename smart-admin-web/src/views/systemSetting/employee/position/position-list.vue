<template>
  <div>
    <Card dis-hover>
      <div style="display: flex;align-items: center;">
        <div style="margin-right: 15px">{{ $t("PositionName") }}</div>
        <div>
          <Input v-model="value1" />
        </div>
        <div>
          <Button
            type="primary"
            style="margin-left: 15px"
            @click="this.getlist"
            >{{ $t("Search") }}</Button
          >
        </div>
      </div>
    </Card>
    <!-- Card 岗位管理内容区 start -->
    <Card class="warp-card" dis-hover>
      <!-- Form 搜索按钮区 start -->
      <div style="display: flex;align-items: center;margin-bottom: 15px">
        <div style="margin-right: 15px" @click="getlist">
          <Button>{{ $t("Reflash") }}</Button>
        </div>
        <div style="margin-right: 15px">
          <Button
            v-privilege="['1-5-1']"
            icon="md-add"
            type="warning"
            @click="newPosition"
            >{{ $t("Create") }}</Button
          >
        </div>
        <!--<div style="margin-right: 15px"><Button icon="md-close" type="error" @click="deletePost">{{$t('Delete')}}</Button> </div>-->
      </div>
      <!-- Form 搜索按钮区 end -->
      <Table
        :columns="columns"
        :data="data"
        @on-selection-change="selects"
        :loading="isShowTablesLoading"
        ref="tablesMain"
        @on-row-dblclick="Edit"
      ></Table>
      <Page
        :current="searchFrom.pageNum"
        :page-size="searchFrom.pageSize"
        :show-total="true"
        :total="pageTotal"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
        style="margin:24px 0;text-align:right;"
      ></Page>
    </Card>
    <!-- Card 内容区 end -->
    <!-- Modal 编辑岗位弹窗 start -->
    <Modal
      :loading="isShowUpdateLoading"
      @on-cancel="cancelUpdateData"
      @on-ok="validateAndUpdataPosition"
      title="编辑岗位"
      v-model="isShowEditModal"
    >
      <Form
        :label-width="80"
        :model="updateItem"
        :rules="updateValidate"
        ref="updateRef"
      >
        <FormItem label="岗位名称" prop="postName">
          <Input
            placeholder="请输入岗位名称(必填)"
            v-model="updateItem.postName"
          ></Input>
        </FormItem>
        <FormItem label="岗位描述">
          <Input
            :autosize="{ minRows: 4 }"
            :maxlength="200"
            placeholder="请输入岗位描述(必填)"
            type="textarea"
            v-model="updateItem.remarks"
          ></Input>
        </FormItem>
        <FormItem :label="$t('jb')" prop="levelId">
          <Select v-model="updateItem.levelId" style="width:100%" filterable multiple>
            <Option
              v-for="item in levelList"
              :value="item.id"
              :key="item.id"
              >{{ item.levelName }}</Option
            >
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <!-- Modal 编辑岗位弹窗 end -->
    <!-- Modal 添加岗位弹窗 start -->
    <Modal
      :loading="isShowSaveLoading"
      @on-cancel="cancelSaveData"
      @on-ok="validateAndAddPosition"
      :title="$t('CreatePosition')"
      v-model="isShowAddModal"
    >
      <Form
        :label-width="100"
        :model="saveItem"
        :rules="saveValidate"
        ref="saveRef"
      >
        <FormItem :label="$t('PositionName')" prop="postName">
          <Input :maxlength="30" v-model="saveItem.postName"></Input>
        </FormItem>
        <FormItem label="岗位描述">
          <Input
            :autosize="{ minRows: 4 }"
            :maxlength="200"
            type="textarea"
            v-model="saveItem.remarks"
          ></Input>
        </FormItem>
        <FormItem :label="$t('jb')" prop="levelId">
          <Select v-model="saveItem.levelId" style="width:100%" filterable multiple>
            <Option
              v-for="item in levelList"
              :value="item.id"
              :key="item.id"
              >{{ item.levelName }}</Option
            >
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <!-- Modal 添加岗位弹窗 end -->
  </div>
</template>

<script>
import { positionApi } from '@/api/position';
import { levelApi } from '@/api/level';
let _that;
export default {
  name: 'PositionList',
  components: {},
  props: {},
  data () {
    const validatePass = (rule, value, callback) => {
      console.log('验证消息=============', value);
      if (value.length &&  value.length !== 0) {
        callback();
      } else {
        callback(new Error('请选择分类'));
      }
    };
    return {
      ids: [],
      value1: '',
      isShowPage: true,
      searchValue: '',
      isShowEditModal: false,
      isShowAddModal: false,
      // table是否Loading
      isShowTablesLoading: true,
      isShowSaveLoading: true,
      isShowUpdateLoading: true,
      pageTotal: 0,
      deleteItem: {},
      // 更新的数据
      updateItem: {
        id: 0,
        postName: '',
        remarks: '',
        levelId: []
      },
      // 添加保存的数据
      saveItem: {
        postName: '',
        remarks: '',
        createId: this.$store.state.user.userLoginInfo.userId,
        levelId: []
      },
      saveItemInt: {},
      // table表头
      columns: [
        // {
        //   type: 'selection',
        //   width: 60,
        //   align: 'center'
        // },
        {
          title: this.$t('PositionName'),
          key: 'postName'
        },
        {
          title: this.$t('Remark'),
          key: 'remarks'
        },
        {
          title: this.$t('CreatePerson'),
          key: 'createName'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          className: 'action-hide',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['1-5-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.updateItem = {
                        postId: params.row.id,
                        postName: params.row.postName,
                        remarks: params.row.remarks,
                        levelId: params.row.levelId,
                        operatId: this.$store.state.user.userLoginInfo.userId
                      };
                      this.updateItem.levelId = this.updateItem.levelId.split(',').map(Number)
                      console.log(this.updateItem);
                      this.isShowEditModal = true;
                    }
                  }
                },
                this.$t('Edit')
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['1-5-3']
                    }
                  ],
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '友情提醒',
                        content: '确定要删除吗？',
                        onOk: () => {
                          console.log('删除');
                          this.deleteItem.postId = params.row.id;
                          this.deleteItem.operatId = this.$store.state.user.userLoginInfo.userId;
                          this.deletePositionById(this.deleteItem);
                        }
                      });
                    }
                  }
                },
                this.$t('Delete')
              )
            ]);
          }
        }
      ],
      // table数据
      data: [],
      updateValidate: {
        postName: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' }
        ],
        remarks: [
          { required: true, message: '请输入岗位描述', trigger: 'blur' }
        ],
        levelId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ]
      },
      saveValidate: {
        postName: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' }
        ],
        remarks: [
          { required: true, message: '请输入岗位描述', trigger: 'blur' }
        ],
        levelId: [
          { required: true, trigger: 'change', validator: validatePass }
        ]
      },
      searchFrom: {
        postName: '',
        pageNum: 1,
        pageSize: 10,
        searchCount: true,
        sort: false
      },
      searchFromInt: {},
      isShowdeleteLoading: false,
      levelList: []
    };
  },
  computed: {
    TableHeadeData () {
      return this.columns;
    }
  },
  watch: {},
  filters: {},
  created () {
    const that = this;
  },
  mounted () {
    this.getlist();
    Object.assign(this.searchFromInt, this.searchFrom);
    Object.assign(this.saveItemInt, this.saveItem);
    this.getPositionListPage();
    this.getLevelList();
  },
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {},
  methods: {
    getLevelList () {
      const searchFrom = {
        pageNum: 1,
        pageSize: 9999
      };
      levelApi.levelList(searchFrom).then(res => {
        if (res.ret === 200) {
          this.levelList = res.data.content.list;
          console.log('this.list', this.list);
        } else {
          console.log('列表出错');
        }
      });
    },
    Edit (row) {
      if (this.$judge(['1-5-2'])) {
        this.updateItem = {
          postId: row.id,
          postName: row.postName,
          remarks: row.remarks, // levelId
          levelId: row.levelId, //
          operatId: this.$store.state.user.userLoginInfo.userId
        };
        this.isShowEditModal = true;
      } else {
        console.log('need roles');
      }
    },
    getlist () {
      this.searchFrom.postName = this.value1;
      this.searchFrom.pageNum = 1;
      positionApi.postList(this.searchFrom).then(res => {
        console.log('res', res);
        if (res.ret === 200) {
          this.data = res.data.content.list;
          console.log('this.list', this.list);
          this.pageTotal = res.data.content.totalCount;
        } else {
          console.log('列表出错');
        }
        setTimeout(() => {
          this.listLoading = false;
        }, 0.5 * 100);
      });
    },
    async deletePost () {
      try {
        this.isShowdeleteLoading = true;
        this.deleteItem.postId = this.ids;
        this.deleteItem.operatId = this.$store.state.user.userLoginInfo.userId;
        let result = await positionApi.deletePost(this.deleteItem);
        this.isShowdeleteLoading = false;
        this.$Message.success('删除成功');
        await this.getPositionListPage();
        this.cancelSaveData();
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.isShowdeleteLoading = false;
      }
    },
    newPosition () {
      this.isShowAddModal = true;
    },
    // 分页查询所有岗位
    async getPositionListPage () {
      try {
        this.isShowTablesLoading = true;
        this.isShowPage = true;
        this.searchFrom.postName = this.value1;
        positionApi.postList(this.searchFrom).then(res => {
          console.log('res', res);
          if (res.ret === 200) {
            this.data = res.data.content.list;
            console.log('this.list', this.list);
            this.pageTotal = res.data.content.totalCount;
          } else {
            console.log('列表出错');
          }
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 100);
        });
        this.isShowTablesLoading = false;
      } catch (e) {
        this.isShowTablesLoading = false;
        // TODO zhuoda sentry
        console.error(e);
      }
    },
    selects (param) {
      console.log('param', param);
      console.log(param.map(item => item.id).join());
      this.ids = param.map(item => item.id).join();
    },
    // 页码改变
    changePage (pageNum) {
      this.searchFrom.pageNum = pageNum;
      this.getPositionListPage();
    },
    // 改变每页显示数据条数
    changePageSize (pageSize) {
      this.searchFrom.pageNum = 1;
      this.searchFrom.pageSize = pageSize;
      this.getPositionListPage();
    },
    // 检验参数后 更新岗位
    validateAndUpdataPosition () {
      this.$refs['updateRef'].validate(valid => {
        this.isShowUpdateLoading = true;
        if (valid) {
          this.updatePosition();
        } else {
          this.isShowUpdateLoading = false;
          this.$nextTick(() => {
            this.isShowUpdateLoading = true;
          });
        }
      });
    },
    // 更新岗位
    async updatePosition () {
      this.updateItem.levelId = this.updateItem.levelId.join(',')
      try {
        let result = await positionApi.updatePost(this.updateItem);
        this.$Message.success('修改成功');
        await this.getPositionListPage();
        this.cancelUpdateData();
      } catch (e) {
        this.isShowUpdateLoading = false;
        this.$nextTick(() => {
          this.isShowUpdateLoading = true;
        });
        // TODO zhuoda sentry
        console.error(e);
      } finally {
        this.isShowUpdateLoading = false;
      }
    },
    // 清除编辑模态框数据
    cancelUpdateData () {
      this.updateItem = {};
      // 清空form规则检查
      this.$refs['updateRef'].resetFields();
      this.isShowEditModal = false;
    },
    // 搜索
    searchData () {
      this.pageNum = 1;
      this.getPositionListPage();
    },
    // 重置
    clearSearch () {
      Object.assign(this.searchFrom, this.searchFromInt);
      this.getPositionListPage();
    },
    // 添加岗位
    validateAndAddPosition () {
      try {
        this.$refs['saveRef'].validate(valid => {
          this.isShowSaveLoading = true;
          if (valid) {
            this.addPosition();
          } else {
            this.isShowSaveLoading = false;
            this.$nextTick(() => {
              this.isShowSaveLoading = true;
            });
          }
        });
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
      }
    },
    // 添加岗位 - 异步
    async addPosition () {
      this.saveItem.levelId = this.saveItem.levelId.join(',')
      try {
        let result = await positionApi.addPost(this.saveItem);
        this.$Message.success('添加成功');
        this.isShowSaveLoading = true;
        this.getlist();
        this.cancelSaveData();
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.isShowSaveLoading = false;
      }
    },
    // 清除添加模态框数据
    cancelSaveData () {
      Object.assign(this.saveItem, this.saveItemInt);
      // 清空form规则检查
      this.$refs['saveRef'].resetFields();
      this.saveItem['createId'] = this.$store.state.user.userLoginInfo.userId;
      this.isShowAddModal = false;
    },
    // 根据ID删除岗位
    async deletePositionById (id) {
      try {
        this.isShowdeleteLoading = true;
        let result = await positionApi.deletePost(id);
        this.isShowdeleteLoading = false;
        this.$Message.success('删除成功');
        await this.getPositionListPage();
        this.cancelSaveData();
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.isShowdeleteLoading = false;
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
