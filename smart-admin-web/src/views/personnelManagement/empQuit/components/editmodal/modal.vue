<template>
  <div>
        <Modal v-model="mymoadlStat" class="add" width="1024" :closable="false" :mask-closable="false" :transfer="false" fullscreen>
          <div slot="header" style="text-align:left;color:#fff;">
              <span>{{ $t('role_view.addrole') }}</span>
          </div>
          <div>
              <Card dis-hover>
                  <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                  <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                  <div>{{$t('BaseData')}}</div>
                  </div>
                  <Divider />
                  <Form ref="form" :model="addformbase" label-position="right" :label-width="150" :rules="ruleValidate">
                      <FormItem :label="$t('indicatorSet_view.metricSetName')" prop="name">
                          <Input v-model="addformbase.name"></Input>
                      </FormItem>
                      <FormItem :label="$t('indicatorSet_view.indicatorSetContent')" prop="content">
                          <Input v-model="addformbase.content" type="textarea"></Input>
                      </FormItem>
                      <FormItem :label="$t('kezbjlx')" prop="collectType">
                          <Select v-model="addformbase.collectType">
                            <Option :value="1">{{ $t('ry') }}</Option>
                            <Option :value="2">{{ $t('md') }}</Option>
                            <Option :value="3">{{ $t('gw') }}</Option>
                          </Select>
                      </FormItem>
                      <FormItem :label="$t('mdjb')" prop="repositoryLevelId" >
                          <Select v-model="addformbase.repositoryLevelId" filterable>
                            <Option v-for="item in levelList" :value="item.id" :key="item.id">{{ item.levelName }}</Option>
                          </Select>
                      </FormItem>
                  </Form>
                  <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
                  <div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
                  <div>{{$t('indicatorSet_view.assessmentIndexItems')}}</div>
                  </div>
                  <div style="margin:20px 0;">
                    <Button style="margin-right:15px;" @click="additem" icon="md-add" type="info">{{ $t('Create') }}</Button>
                  </div>
                  <Tables border ref="selection" :maxheight="300" :columns="mycolumns" :value="mydataList" editable></Tables>
              </Card>
          </div>
          <div slot="footer">
              <ButtonGroup>
                  <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button>
                  <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
              </ButtonGroup>
          </div>
    </Modal>
  </div>
</template>
<script>
import { indicatorSetApi } from '@/api/indicatorSet';
import { SalesRoomlevel } from '@/api/salesroomLevel';
import Tables from '@/components/tables';
import RoleTree from '../role-tree/role-tree';
import DepartmentEmployeeTree from '../department-employee-tree/department-employee-tree';
import { indicatorSingle } from '@/api/indicatorSingle';
export default {
  name: 'addModal',
  components: {
    DepartmentEmployeeTree,
    Tables
    // addIndicatorSingleModal
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null,
    itemList: null
  },
  created () {
    //
  },
  data () {
    const validatePass1 = (rule, value, callback) => {
      if (this.addformbase.collectType === '' || this.addformbase.collectType === null || this.addformbase.collectType === undefined) {
        callback(new Error('Please enter your emp'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (this.addformbase.repositoryLevelId === '' || this.addformbase.repositoryLevelId === null || this.addformbase.repositoryLevelId === undefined) {
        callback(new Error('Please enter your emp'));
      } else {
        callback();
      }
    };
    return {
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {
      },
      ruleValidate: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        content: [
          { required: true, message: 'The content cannot be empty', trigger: 'blur' }
        ],
        collectType: [
          { required: true, validator: validatePass1, trigger: 'blur' }
        ],
        repositoryLevelId: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      mycolumns: [
        {
          type: 'index',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('khxm'),
          key: 'nameId',
          render: (h, params) => {
            console.log(this.itemList);
            let str = '';
            const temp = this.itemList.filter(item => {
              return item.id === params.row.nameId;
            });
            str = temp[0].itemName;
            return h('span', str);
          }
        },
        {
          title: this.$t('zblx'),
          key: 'itemType',
          render: (h, params) => {
            const list = [
              { value: 1, label: this.$t('lhzb') },
              { value: 2, label: this.$t('xwjzzb') }
            ];
            const temp = list.filter(item => {
              return item.value === params.row.itemType;
            });
            const str = temp[0].label;
            return h('span', str);
          }
          // width: 100
        },
        {
          title: this.$t('mbz'),
          key: 'target'
          // width: 100
        },
        {
          title: this.$t('qz'),
          key: 'weight'
          // width: 100
        },
        {
          title: this.$t('khbz'),
          key: 'scoreDesc'
          // width: 100
        },
        {
          title: this.$t('jgzly'),
          key: 'resultSource',
          render: (h, params) => {
            const list = [
              { value: 1, label: this.$t('bkhr') },
              { value: 2, label: this.$t('zdry') },
              { value: 3, label: this.$t('zdzz') }
            ];
            const temp = list.filter(item => {
              return item.value === params.row.resultSource;
            });
            const str = temp[0].label;
            return h('span', str);
          }
        },
        {
          title: this.$t('ryzz'),
          render: (h, params) => {
            let str = this.$t('bkhr');
            if (params.row.resultSource !== 1) {
              const temp = params.row.sourceName.map(item => {
                return item;
              }).join(',');
              str = temp;
            }
            return h('span', str);
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          className: 'action-hide',
          render: (h, params) => {
            return this.$tableAction(h, [
              {
                title: '修改',
                action: () => {
                  this.edit_indicator_flag = true;
                  this.indicator_info = params.row;
                  this.indicator_dialog = true;
                }
              },
              {
                title: '删除',
                action: () => {
                  this.$Modal.confirm({
                    title: '友情提醒',
                    content: '确定要删除吗？',
                    onOk: () => {
                      console.log('删除');
                      this.mydataList.splice(params.index, 1);
                    }
                  });
                }
              }
            ]);
          }
        }
      ],
      mydataList: [],
      levelList: [],
      indicator_dialog: false,
      indicator_info: null,
      edit_indicator_flag: false,
      indicatorlist: this.itemList
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      //
      if (this.mymoadlStat) {
        this.getLevelList();
        // this.getindicatorlist();
        this.indicatorlist = this.itemList;
        console.log(this.editinfo);
        this.addformbase = this._.cloneDeep(this.editinfo);
        this.mydataList = this.addformbase.assessmentItemVos;
      }
    }
  },
  methods: {
    updateStat_indicator (stat, value) {
      this.indicator_dialog = stat;
      if (value && this.edit_indicator_flag) {
        this.mydataList.splice(value._index, 1, value);
      } else if (value) {
        this.mydataList.push(value);
      }
    },
    getLevelList () {
      const searchform = {
        pageNum: 1,
        pageSize: 9999
      };
      SalesRoomlevel.getSalesRoomlevel(searchform).then(res => {
        console.log(res.data.content.list);
        this.levelList = res.data.content.list;
      });
    },
    additem () {
      this.indicator_dialog = true;
      this.edit_indicator_flag = false;
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    handsave () {
      this.modal_loading = true;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.addformbase.operatId = this.$store.state.user.userLoginInfo.userId;
          this.addformbase.itemJson = JSON.stringify(this.mydataList);
          console.log(this.addformbase);
          indicatorSetApi.updateIndicator(this.addformbase).then(res => {
            this.$Message.success(this.$t('addSuccess'));
            this.modal_loading = false;
            this.$emit('updateStat', false);
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
    .ivu-tree-children {
  cursor: pointer;
  width: 100%;
}
.option-department {
  font-size: 14px;
  padding: 5px;
  cursor: pointer;
}
.option-department:hover {
  background-color: rgba(5, 170, 250, 0.2);
}
.departmentWrap {
  position: absolute;
  background-color: #ffffff;
  padding: 5px;
  border: 1px solid #dedede;
  width: 100%;
  z-index: 9;
  display: none;
  height: 250px;
  overflow-y: scroll;
}
</style>
