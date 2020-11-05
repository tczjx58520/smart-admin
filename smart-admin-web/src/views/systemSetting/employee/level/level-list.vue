<template>
  <div>
     <Card dis-hover>
       <div style="display: flex;align-items: center;">
         <div style="margin-right: 15px">{{$t('levelName')}}</div>
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
  <div style="margin-right: 15px"><Button v-privilege="['1-8-1']" icon="md-add" type="warning" @click="newPosition">{{$t('Create')}}</Button> </div>
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
      :title="$t('UpdateLevel')"
      v-model="isShowEditModal"
    >
      <Form :label-width="100" :model="updateItem" :rules="updateValidate" ref="updateRef">
        <FormItem :label="$t('levelName')" prop="levelName">
          <Input style="width:350px" :maxlength="30" v-model="updateItem.levelName"></Input>
        </FormItem>
        <FormItem :label="$t('levelCategoryName')" prop="categoryId">
          <Select v-model="updateItem.categoryId" @on-change="cateChange2" style="width:200px">
            <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.categoryName }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('partCategoryName')">
          <Select :disabled="updateisabled" v-model="updateItem.partCategory" multiple  style="width:200px">
            <Option v-for="item in categoryList2" :value="item.id" :key="item.id">{{ item.categoryName }}</Option>
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
      :title="$t('CreateLevel')"
      v-model="isShowAddModal"
    >
      <Form :label-width="100" :model="saveItem" :rules="saveValidate" ref="saveRef">
        <FormItem :label="$t('levelName')" prop="levelName">
          <Input style="width:350px" :maxlength="30" v-model="saveItem.levelName"></Input>
        </FormItem>
        <FormItem :label="$t('levelCategoryName')" prop="categoryId">
          <Select v-model="saveItem.categoryId" @on-change="cateChange" style="width:200px">
            <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.categoryName }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('partCategoryName')">
          <Select :disabled="adddisabled"  v-model="saveItem.partCategory" multiple  style="width:200px">
            <Option v-for="item in categoryList2" :value="item.id" :key="item.id">{{ item.categoryName }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <!-- Modal 添加岗位弹窗 end -->
  </div>
</template>

<script>
import { levelApi } from '@/api/level';
import { levelCategoryApi } from '@/api/levelCategory';
let _that;
export default {
  name: 'level',
  components: {},
  props: {},
  data () {
    return {
      adddisabled: true,
      updateisabled: true,
      categoryList: {},
      categoryList2: {},
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
        levelName: '',
        remarks: ''
      },
      // 添加保存的数据
      saveItem: {
        levelName: '',
        createId: this.$store.state.user.userLoginInfo.userId
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
          title: this.$t('levelName'),
          key: 'levelName'
        },
        {
          title: this.$t('levelCategoryName'),
          key: 'levelCategoryName'
        },
        {
          title: this.$t('partCategoryName'),
          key: 'partCategoryName'
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          align: 'center',
          className: 'action-hide',
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
                    this.copy(params);
                  }
                }
              }, this.$t('Copy')),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                directives: [
                  {
                    name: 'privilege',
                    value: ['1-8-2']
                  }
                ],
                on: {
                  click: () => {
                    let part = [];
                    if (params.row.partCategory !== null) {
                      part = params.row.partCategory.split(',');
                    }
                    for (let i = 0; i < part.length; i++) {
                      part[i] = Number(part[i]);
                    }
                    console.log('part', part);
                    this.updateItem = {
                      levelId: params.row.id,
                      categoryId: params.row.categoryId,
                      levelName: params.row.levelName,
                      partCategory: part,
                      operatId: this.$store.state.user.userLoginInfo.userId
                    };
                    this.getcategory();
                    this.cateChange2(params.row.categoryId);
                    this.isShowEditModal = true;
                  }
                }
              }, this.$t('Edit')),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                directives: [
                  {
                    name: 'privilege',
                    value: ['1-8-3']
                  }
                ],
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
                        this.deleteItem.levelId = params.row.id;
                        this.deleteItem.operatId = this.$store.state.user.userLoginInfo.userId;
                        this.deletePositionById(this.deleteItem);
                      }
                    });
                  }
                }
              }, this.$t('Delete'))
            ]);
          }
        }
      ],
      // table数据
      data: [],
      updateValidate: {
        levelName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择一项', trigger: 'change', type: 'number', min: 1 }
        ] },
      saveValidate: {
        levelName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择一项', trigger: 'change', type: 'number', min: 1 }
        ]
      },
      searchFrom: {
        levelName: '',
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
      if (this.$judge(['1-8-2'])) {
        let part = [];
        if (row.partCategory !== null) {
          part = row.partCategory.split(',');
        }
        for (let i = 0; i < part.length; i++) {
          part[i] = Number(part[i]);
        }
        console.log('part', part);
        this.updateItem = {
          levelId: row.id,
          categoryId: row.categoryId,
          levelName: row.levelName,
          partCategory: part,
          operatId: this.$store.state.user.userLoginInfo.userId
        };
        this.getcategory();
        this.cateChange2(row.categoryId);
        this.isShowEditModal = true;
      } else {
        console.log('need roles');
      }
    },
    copy (row) {
      console.log('row', row);
      let part = [];
      if (row.row.partCategory !== null) {
        part = row.row.partCategory.split(',');
      }
      for (let i = 0; i < part.length; i++) {
        part[i] = Number(part[i]);
      }
      console.log('part', part);
      this.saveItem = {
        categoryId: row.row.categoryId,
        levelName: row.row.levelName,
        partCategory: part,
        createId: this.$store.state.user.userLoginInfo.userId
      };
      this.getcategory();
      this.cateChange(row.row.categoryId);
      this.isShowAddModal = true;
    },
    cateChange2 (val) {
      console.log('val', val);
      let m = 0;
      for (let i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i].id === val) {
          m = this.categoryList[i].isDetail;
        }
      }
      console.log('m', m);
      if (m === 1) {
        this.updateisabled = false;
      } else {
        this.updateisabled = true;
        this.updateItem.partCategory = [];
      }
    },
    cateChange (val) {
      console.log('val', val);
      let m = 0;
      for (let i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i].id === val) {
          m = this.categoryList[i].isDetail;
        }
      }
      console.log('m', m);
      if (m === 1) {
        this.adddisabled = false;
      } else {
        this.adddisabled = true;
        this.saveItem.partCategory = [];
      }
    },
    getcategory () {
      const param = {};
      param.isEffective = 1;
      param.pageNum = 1;
      param.pageSize = 999;
      levelCategoryApi.levelCategoryList(param).then(res => {
        console.log('res', res);
        if (res.ret === 200) {
          this.categoryList = res.data.content.list;
          console.log('this.list', this.list);
        } else {
          console.log('列表出错');
        }
      });
      const param2 = {};
      param2.isEffective = 1;
      param2.isDetail = 1;
      param2.pageNum = 1;
      param2.pageSize = 999;
      levelCategoryApi.levelCategoryList(param2).then(res => {
        console.log('res', res);
        if (res.ret === 200) {
          this.categoryList2 = res.data.content.list;
          console.log('this.list', this.list);
        } else {
          console.log('列表出错');
        }
      });
    },
    getlist () {
      this.getcategory();
      this.searchFrom.levelName = this.value1;
      this.searchFrom.pageNum = 1;
      levelApi.levelList(this.searchFrom).then(res => {
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
        let result = await levelApi.deleteLevel(this.deleteItem);
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
      this.getcategory();
      this.isShowAddModal = true;
      this.adddisabled = true;
    },
    // 分页查询所有岗位
    async getPositionListPage () {
      try {
        this.isShowTablesLoading = true;
        this.isShowPage = true;
        this.searchFrom.levelName = this.value1;
        levelApi.levelList(this.searchFrom).then(res => {
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
        let result = await levelApi.updateLevel(this.updateItem);
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
      console.log('saveItem', this.saveItem);
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
      try {
        let result = await levelApi.addLevel(this.saveItem);
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
      this.saveItem = {
        levelName: '',
        createId: this.$store.state.user.userLoginInfo.userId
      };
      // this.saveItem['createId'] = this.$store.state.user.userLoginInfo.userId;
      this.isShowAddModal = false;
    },
    // 根据ID删除岗位
    async deletePositionById (id) {
      try {
        this.isShowdeleteLoading = true;
        let result = await levelApi.deleteLevel(id);
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
<style lang="less" scoped>
</style>
