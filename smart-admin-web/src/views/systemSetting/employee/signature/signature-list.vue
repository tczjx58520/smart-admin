<template>
  <div>
     <Card dis-hover>
       <div style="display: flex;align-items: center;">
         <div style="margin-right: 15px">{{$t('signatureName')}}</div>
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
  <div style="margin-right: 15px"><Button icon="md-add" v-privilege="['1-23-1']" type="warning" @click="newPosition">{{$t('Create')}}</Button> </div>
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
      :title="$t('editsignature')"
      v-model="isShowEditModal"
    >
      <Form :label-width="80" :model="updateItem" :rules="updateValidate" ref="updateRef">
        <FormItem :label="$t('empName')" prop="editEmpId">
          <Input :maxlength="30" v-model="editEmpId" @on-focus="Addmemeber2" disabled></Input>
        </FormItem>
        <FormItem :label="$t('signatureName')">
          <Input :maxlength="30" v-model="updateItem.signatureName"></Input>
        </FormItem>
        <FormItem class="marginBottom20" :label="$t('signature2')">
          <Upload
            multiple
            ref="upload2"
            name="file"
            :data="{ type: 1 }"
            :before-upload="handleUpload2"
            :on-success="mysuccess2"
            :action="myupLoadUrl">
            <Button icon="ios-cloud-upload-outline">{{$t('notice_view.addEnclosure')}}</Button>
          </Upload>
          <div class="div" v-if="showfile">
            <div v-for="(item, index) in file2" :key="index">
              <div>{{ item.name }} <Icon type="ios-trash-outline" style="cursor: pointer;" @click.native="handleRemove2(item)"></Icon></div>
            </div>
          </div>
        </FormItem>
      </Form>
    </Modal>
    <!-- Modal 编辑岗位弹窗 end -->
    <!-- Modal 添加岗位弹窗 start -->

    <!-- 新建弹窗 -->
    <addModal :modalstat = "visiable" @updateStat = "updateStat" @getEmpId = "getEmpId"></addModal>
    <addModal :modalstat = "visiable2" @updateStat = "updateStat2" @getEmpId = "getEmpId2"></addModal>
    <!-- 新建结束============= -->
    <Modal
      :loading="isShowSaveLoading"
      @on-cancel="cancelSaveData"
      @on-ok="validateAndAddPosition"
      :title="$t('addsignature')"
      v-model="isShowAddModal"
    >
      <Form :label-width="100" :model="saveItem" :rules="saveValidate" ref="saveRef">
        <FormItem :label="$t('empName')" prop="addEmpId">
          <Input :maxlength="30" v-model="addEmpId" @on-focus="Addmemeber"></Input>
        </FormItem>
        <FormItem :label="$t('signatureName')" prop="signatureName">
          <Input :maxlength="30" v-model="saveItem.signatureName"></Input>
        </FormItem>
        <FormItem class="marginBottom20" :label="$t('signature2')">
          <Upload
            multiple
            ref="upload"
            name="file"
            :data="{ type: 1 }"
            :before-upload="handleUpload"
            :on-success="mysuccess"
            :action="myupLoadUrl">
            <Button icon="ios-cloud-upload-outline">{{$t('notice_view.addEnclosure')}}</Button>
          </Upload>
          <div class="div" v-if="showfile">
            <div v-for="(item, index) in file" :key="index">
              <div>{{ item.name }} <Icon type="ios-trash-outline" style="cursor: pointer;" @click.native="handleRemove(item)"></Icon></div>
            </div>
          </div>
        </FormItem>
      </Form>
    </Modal>
    <!-- Modal 添加岗位弹窗 end -->
  </div>
</template>

<script>
import { signatureApi } from '@/api/signature';
import addModal from './components/addmodal/modal';
let _that;
export default {
  name: 'signature',
  components: {
    addModal
  },
  props: {},
  data () {
    const validatePass = (rule, value, callback) => {
      console.log(this.addEmpId);
      if (this.addEmpId === undefined || this.addEmpId === null || this.addEmpId === '') {
        callback(new Error('请选择员工'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      console.log(this.editEmpId);
      if (this.editEmpId === undefined || this.editEmpId === null || this.editEmpId === '') {
        callback(new Error('请选择员工'));
      } else {
        callback();
      }
    };
    let baseUrl = process.env.VUE_APP_URL;
    return {
      file: [],
      file2: [],
      picIds: [],
      picIds2: [],
      showfile: false,
      myupLoadUrl: baseUrl + '/upload/uploadpic',
      addEmpId: '',
      editEmpId: '',
      visiable: false,
      visiable2: false,
      addgroup_member: '',
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
        postName: 'postName',
        remarks: ''
      },
      // 添加保存的数据
      saveItem: {
        postName: '',
        remarks: '',
        operatId: this.$store.state.user.userId
      },
      savePic: {
        type: 1
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
          title: this.$t('empName'),
          key: 'empName'
        },
        {
          title: this.$t('signatureName'),
          key: 'signatureName'
        },
        {
          /*  标题 */
          title: this.$t('signature2'),
          /*  键值 */
          key: 'imgsrc',
          align: 'center',
          render: (h, params) => {
            return h('img', {
              /*  组件样式 */
              style: {
                width: '100px',
                height: '80px',
                'border-radius': '5%'
              },
              /*  html属性 */
              attrs: {
                /*  图片的路径,直接采用后台返回的键值 */
                src: params.row.picPaths[0]
              }
            });
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          className: 'action-hide',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                directives: [
                  {
                    name: 'privilege',
                    value: ['1-23-2']
                  }
                ],
                on: {
                  click: () => {
                    this.updateItem = {
                      signatureId: params.row.id,
                      signatureName: params.row.signatureName,
                      empId: params.row.empId,
                      operatId: this.$store.state.user.userId
                    };
                    this.editEmpId = params.row.empName;
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
                    value: ['1-23-3']
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
                        this.deleteItem.signatureId = params.row.id;
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
      ],
      // table数据
      data: [],
      updateValidate: {
        editEmpId: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        signatureName: [{ required: true, message: '请输入印章名', trigger: 'blur' }]
      },
      saveValidate: {
        addEmpId: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        signatureName: [{ required: true, message: '请输入印章名', trigger: 'blur' }]
      },
      searchFrom: {
        postName: '',
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
      if (this.$judge(['1-23-2'])) {
        this.updateItem = {
          signatureId: row.id,
          signatureName: row.signatureName,
          empId: row.empId,
          operatId: this.$store.state.user.userId
        };
        this.editEmpId = row.empName;
        this.isShowEditModal = true;
      } else {
        console.log('need roles=====');
      }
    },
    // 后退
    goBack () {
      this.$router.closeCurrentPage();
    },
    // 新建上传文件
    uploadImg () { // 上传文件
      console.log(this.file);
      this.showfile = false;
      console.log(this.$refs.upload.post);
      for (const i in this.file) {
        this.$refs.upload.post(this.file[i]);
      }
      this.count = 0;
    },
    // 修改上传文件
    uploadImg2 () { // 上传文件
      console.log(this.file2);
      this.showfile = false;
      console.log(this.$refs.upload2.post);
      for (const i in this.file2) {
        this.$refs.upload2.post(this.file2[i]);
      }
      this.count = 0;
    },
    // 删除附件
    handleRemove2 (file) {
      const fileList = this.file2;
      console.log('删除===========>', this.$refs.upload2);
      fileList.splice(fileList.indexOf(file), 1);
    },
    // 删除附件
    handleRemove (file) {
      const fileList = this.file;
      console.log('删除===========>', this.$refs.upload);
      fileList.splice(fileList.indexOf(file), 1);
    },
    // 新增
    async addNew () {
      try {
        this.$Spin.show();
        this.isShowSaveButtonLoading = true;
        if (this.picIds !== undefined && this.picIds !== null && this.picIds !== '') {
          this.saveItem.picIds = [...this.picIds].join(',');
        }
        let res = await signatureApi.addSignature(this.saveItem);
        this.file = [];
        this.picIds = [];
        console.log('this.file', this.file);
        this.isShowSaveLoading = true;
        this.getlist();
        this.cancelSaveData();
        console.log('this.form============>', this.saveItem, res);
        this.isShowSaveButtonLoading = false;
        this.$Spin.hide();
        this.$Message.success('新建成功');
        this.$router.go(0);
        // this.goBack();
      } catch (error) {
        // TODO zhuoda sentry
        console.error(error);
        this.isShowSaveButtonLoading = false;
        this.$Spin.hide();
      }
    },
    // 修改
    async editSig () {
      try {
        this.$Spin.show();
        this.isShowSaveButtonLoading = true;
        console.log('this.picIds2', this.picIds2);
        if (this.picIds2 !== undefined && this.picIds2 !== null && this.picIds2 !== '') {
          this.updateItem.picIds = [...this.picIds2].join(',');
        }
        console.log('this.updateItem', this.updateItem);
        let res = await signatureApi.updateSignature(this.updateItem);
        this.$Message.success('修改成功');
        await this.getPositionListPage();
        this.cancelUpdateData();
        this.file2 = [];
        this.picIds2 = [];
        console.log('this.file2', this.file2);
        this.getlist();
        console.log('this.form============>', this.saveItem, res);
        this.isShowSaveButtonLoading = false;
        this.$Spin.hide();
        this.$Message.success('修改成功');
        this.$router.go(0);
        // this.goBack();
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

    mysuccess2 (response, file, fileList) {
      console.log(response, file, fileList);
      let id = response.data.content.picId;
      this.picIds2.push(response.data.content.picId);
      console.log([...this.picIds]);
      this.count++;
      console.log(this.count, fileList.length);
      console.log('mysuccess2');
      if (this.count === fileList.length) {
        let newsId = this.$route.query.id;
        this.editSig();
      }
    },
    mysuccess (response, file, fileList) {
      console.log(response, file, fileList);
      let id = response.data.content.picId;
      this.picIds.push(response.data.content.picId);
      console.log([...this.picIds]);
      this.count++;
      console.log(this.count, fileList.length);
      if (this.count === fileList.length) {
        let newsId = this.$route.query.id;
        if (newsId) {
          this.editEmail();
        } else {
          this.addNew();
        }
      }
    },
    // 上传之前函数
    handleUpload2 (file) {
      this.file2.push(file);
      this.showfile = true;
      console.log('this.file2', this.file2);
      return false;
    },
    // 上传之前函数
    handleUpload (file) {
      this.file.push(file);
      this.showfile = true;
      console.log(this.file);
      return false;
    },
    getEmpId (val) {
      console.log('子传父', val);
      this.addEmpId = val.personName;
      this.saveItem.empId = val.id;
    },
    getEmpId2 (val) {
      console.log('子传父2', val);
      this.editEmpId = val.personName;
      this.updateItem.empId = val.id;
    },
    created () {
      this.visiable = true;
    },
    Addmemeber2 () {
      console.log('333');
      this.visiable2 = true;
    },
    Addmemeber () {
      console.log('333');
      this.visiable = true;
    },
    updateStat (stat) {
      this.visiable = stat;
    },
    updateStat2 (stat) {
      this.visiable2 = stat;
    },
    getlist () {
      console.log('123', 123);
      console.log('userLoginInfo', this.$store.state.user.userLoginInfo);
      console.log('userId', this.$store.state.user.userId);
      this.searchFrom.signatureName = this.value1;
      this.searchFrom.pageNum = 1;
      signatureApi.groupList(this.searchFrom).then(res => {
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
        let result = await signatureApi.deleteSignature(this.deleteItem);
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
        this.searchFrom.signatureName = this.value1;
        signatureApi.groupList(this.searchFrom).then(res => {
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
          console.log('this.file2', this.file2);
          if (this.file2.length > 0) {
            this.uploadImg2();
          } else {
            this.updatePosition();
          }
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
        let result = await signatureApi.updateSignature(this.updateItem);
        this.$Message.success('修改成功');
        await this.getPositionListPage();
        this.cancelUpdateData();

        // let result = await signatureApi.updateSignature(this.updateItem);
        // this.$Message.success('修改成功');
        // await this.getPositionListPage();
        // this.cancelUpdateData();
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
      try {
        if (this.file.length > 0) {
          this.uploadImg();
        } else {
          this.$Message.error('请上传签章');
        }
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
      this.addEmpId = '';
      this.file = [];
      this.saveItem['createId'] = this.$store.state.user.userId;
      this.isShowAddModal = false;
    },
    // 根据ID删除岗位
    async deletePositionById (id) {
      try {
        this.isShowdeleteLoading = true;
        let result = await signatureApi.deleteSignature(id);
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
  .addressWidth {
    width: 350px;
  }
  .marginTop20 {
    margin-top: 20px;
  }
  .marginBottom20 {
    margin-bottom: 20px;
  }
</style>
