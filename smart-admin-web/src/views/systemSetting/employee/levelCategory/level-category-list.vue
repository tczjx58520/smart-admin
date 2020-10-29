<template>
  <div>
     <Card dis-hover>
       <div style="display: flex;align-items: center;">
         <div style="margin-right: 15px">{{$t('categoryName')}}</div>
       <div>
         <Input v-model="value1" />
       </div>
       <div>
      <Button type="primary" style="margin-left: 15px" @click="this.getlist">{{$t('Search')}}</Button>
       </div>

       </div>

     </Card>
    <!-- Card 岗位管理内容区 start -->
    <Card class="warp-card" dis-hover>
      <!-- Form 搜索按钮区 start -->
<div style="display: flex;align-items: center;margin-bottom: 15px">
  <div style="margin-right: 15px"  @click="getlist"><Button>{{$t('Reflash')}}</Button> </div>
  <div style="margin-right: 15px"><Button icon="md-add" type="warning" @click="newPosition">{{$t('Create')}}</Button> </div>
<!--<div style="margin-right: 15px"><Button icon="md-close" type="error" @click="deletePost">{{$t('Delete')}}</Button> </div>-->
</div>
      <!-- Form 搜索按钮区 end -->
      <Table :columns="columns" :data="data" @on-selection-change="selects" :loading="isShowTablesLoading" ref="tablesMain" @on-row-dblclick="Edit"></Table>
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
      :title="$t('UpdateLevelCat')"
      v-model="isShowEditModal"
    >
      <Form :label-width="100" :model="updateItem" :rules="updateValidate" ref="updateRef">
        <FormItem :label="$t('categoryName')" prop="categoryName">
          <Input style="width:350px" :maxlength="30" v-model="updateItem.categoryName"></Input>
        </FormItem>
        <FormItem :label="$t('isEffective')">
          <RadioGroup v-model="updateItem.isEffective">
            <Radio v-for="item in chooseList" :label="item.value" :key="item.value">
              <span style="margin-right: 30px;">{{item.label}}</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="$t('isDetail')">
          <RadioGroup v-model="updateItem.isDetail">
            <Radio v-for="item in chooseList2" :label="item.value" :key="item.value">
              <span style="margin-right: 30px;">{{item.label}}</span>
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
    <!-- Modal 编辑岗位弹窗 end -->
    <!-- Modal 添加岗位弹窗 start -->
    <Modal
      :loading="isShowSaveLoading"
      @on-cancel="cancelSaveData"
      @on-ok="validateAndAddPosition"
      :title="$t('CreateLevelCat')"
      v-model="isShowAddModal"
    >
      <Form :label-width="100" :model="saveItem" :rules="saveValidate" ref="saveRef">
        <FormItem :label="$t('categoryName')" prop="categoryName">
          <Input style="width:350px" :maxlength="30" v-model="saveItem.categoryName"></Input>
        </FormItem>
        <FormItem :label="$t('isEffective')">
          <RadioGroup v-model="saveItem.isEffective">
            <Radio v-for="item in chooseList" :label="item.value" :key="item.value">
              <span style="margin-right: 30px;">{{item.label}}</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="$t('isDetail')">
          <RadioGroup v-model="saveItem.isDetail">
            <Radio v-for="item in chooseList2" :label="item.value" :key="item.value">
              <span style="margin-right: 30px;">{{item.label}}</span>
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
    <!-- Modal 添加岗位弹窗 end -->
  </div>
</template>

<script>
import { levelCategoryApi } from '@/api/levelCategory';
let _that;
export default {
  name: 'levelCategory',
  components: {},
  props: {},
  data () {
    return {
      chooseList: [
        {
          label: 'YES',
          value: '1'
        }, {
          label: 'NO',
          value: '2'
        }
      ],
      chooseList2: [
        {
          label: '启用',
          value: '1'
        }, {
          label: '不启用',
          value: '2'
        }
      ],
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
        isEffective: '1',
        isDetail: '1',
        id: 0,
        categoryName: 'categoryName',
        remarks: ''
      },
      // 添加保存的数据
      saveItem: {
        categoryName: '',
        isEffective: '1',
        isDetail: '2',
        operatId: this.$store.state.user.userId
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
          title: this.$t('categoryName'),
          key: 'categoryName'
        },
        {
          title: this.$t('isEffective'),
          key: 'isEffective',
          render: (h, params) => {
            console.log('params渲染==========》', params.row.stat);
            if (params.row.isEffective === 1) {
              return h('span', this.$t('yes'));
            } else {
              return h('span', this.$t('no'));
            }
          }
        },
        {
          title: this.$t('isDetail'),
          key: 'isDetail',
          render: (h, params) => {
            console.log('params渲染==========》', params.row.stat);
            if (params.row.isDetail === 1) {
              return h('span', this.$t('yes'));
            } else {
              return h('span', this.$t('no'));
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          align: 'center',
          className: 'action-hide',
          render: (h, params) => {
            if (params.row.isEffective === 2) {
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
                      this.show(params);
                    }
                  }
                }, this.$t('Open')),
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
                      this.copy(params);
                    }
                  }
                }, this.$t('Copy')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.updateItem = {
                        categoryId: params.row.id,
                        categoryName: params.row.categoryName,
                        isEffective: params.row.isEffective.toString(),
                        isDetail: params.row.isDetail.toString(),
                        operatId: this.$store.state.user.userId
                      };
                      this.isShowEditModal = true;
                    }
                  }
                }, this.$t('Edit')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '友情提醒',
                        content: '确定要删除吗？',
                        onOk: () => {
                          console.log('删除');
                          this.deleteItem.categoryId = params.row.id;
                          this.deleteItem.operatId = this.$store.state.user.userId;
                          this.deletePositionById(this.deleteItem);
                        }
                      });
                    }
                  }
                }, this.$t('Delete'))
              ]);
            } else {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.Forbid(params);
                    }
                  }
                }, this.$t('Forbid2')),
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
                      this.copy(params);
                    }
                  }
                }, this.$t('Copy')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.updateItem = {
                        categoryId: params.row.id,
                        categoryName: params.row.categoryName,
                        isEffective: params.row.isEffective.toString(),
                        isDetail: params.row.isDetail.toString(),
                        operatId: this.$store.state.user.userId
                      };
                      this.isShowEditModal = true;
                    }
                  }
                }, this.$t('Edit')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '友情提醒',
                        content: '确定要删除吗？',
                        onOk: () => {
                          console.log('删除');
                          this.deleteItem.categoryId = params.row.id;
                          this.deleteItem.operatId = this.$store.state.user.userId;
                          this.deletePositionById(this.deleteItem);
                        }
                      });
                    }
                  }
                }, this.$t('Delete'))
              ]);
            }
          }
        }
      ],
      // table数据
      data: [],
      updateValidate: {
        categoryName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        remarks: [{ required: true, message: '请输入岗位描述', trigger: 'blur' }]
      },
      saveValidate: {
        categoryName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        remarks: [{ required: true, message: '请输入岗位描述', trigger: 'blur' }]
      },
      searchFrom: {
        categoryName: '',
        pageNum: 1,
        pageSize: 10,
        searchCount: true,
        sort: false
      },
      searchFromInt: {},
      isShowdeleteLoading: false
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
  },
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {},
  methods: {
    Edit (row) {
      this.updateItem = {
        categoryId: row.id,
        categoryName: row.categoryName,
        isEffective: row.isEffective.toString(),
        isDetail: row.isDetail.toString(),
        operatId: this.$store.state.user.userId
      };
      this.isShowEditModal = true;
    },
    copy (row) {
      this.saveItem.categoryName = row.row.categoryName;
      this.saveItem.isEffective = row.row.isEffective.toString();
      this.saveItem.isDetail = row.row.isDetail.toString();
      this.isShowAddModal = true;
    },
    show (row) {
      console.log(row.row.id);
      let data = {};
      this.updateItem.categoryId = row.row.id;
      this.updateItem.isEffective = 1;
      levelCategoryApi.updateLevelCategory(this.updateItem).then(res => {
        if (res.ret === 200) {
          this.$Message.info('启用成功');
          this.getPositionListPage();
        }
      });
    },
    Forbid (row) {
      console.log(row.row.id);
      let data = {};
      this.updateItem.categoryId = row.row.id;
      this.updateItem.isEffective = 2;
      levelCategoryApi.updateLevelCategory(this.updateItem).then(res => {
        if (res.ret === 200) {
          this.$Message.info('禁用成功');
          this.getPositionListPage();
        } else {
          this.$Message.info(res.msg);
        }
      });
    },
    getlist () {
      console.log('123', 123);
      console.log('userLoginInfo', this.$store.state.user.userLoginInfo);
      console.log('userId', this.$store.state.user.userId);
      this.searchFrom.categoryName = this.value1;
      this.searchFrom.pageNum = 1;
      levelCategoryApi.levelCategoryList(this.searchFrom).then(res => {
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
        this.deleteItem.operatId = this.$store.state.user.userId;
        let result = await levelCategoryApi.deleteLevelCategory(this.deleteItem);
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
        this.searchFrom.categoryName = this.value1;
        levelCategoryApi.levelCategoryList(this.searchFrom).then(res => {
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
      try {
        await levelCategoryApi.updateLevelCategory(this.updateItem).then(res => {
          if (res.ret === 200) {
            this.$Message.info('修改成功');
          } else {
            this.$Message.info(res.msg);
          }
        });
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
        console.log('this.saveItem.isEffective', this.saveItem.isEffective);
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
      try {
        let result = await levelCategoryApi.addLevelCategory(this.saveItem);
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
      this.saveItem['createId'] = this.$store.state.user.userId;
      this.isShowAddModal = false;
    },
    // 根据ID删除岗位
    async deletePositionById (id) {
      try {
        this.isShowdeleteLoading = true;
        await levelCategoryApi.deleteLevelCategory(id).then(res => {
          if (res.ret === 200) {
            this.$Message.info('删除成功');
          } else {
            this.$Message.info(res.msg);
          }
        });
        this.isShowdeleteLoading = false;
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
<style lang="less" scoped>
</style>
