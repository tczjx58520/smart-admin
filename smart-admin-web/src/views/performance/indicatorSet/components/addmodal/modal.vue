<template>
  <div>
        <Modal v-model="mymoadlStat" class="add" width="1024" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
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
                  <Form ref="form" :model="addformbase" label-position="right" :label-width="100" :rules="ruleValidate">
                      <FormItem :label="$t('indicatorSet_view.metricSetName')" prop="name">
                          <Input v-model="addformbase.name"></Input>
                      </FormItem>
                      <FormItem :label="$t('indicatorSet_view.indicatorSetContent')" prop="content">
                          <Input v-model="addformbase.content" type="textarea"></Input>
                      </FormItem>
                      <!-- <FormItem :label="$t('welfare_view.org')" prop="organizationOa">
                        <Input v-model="addformbase.organizationOaName" readonly @click.native="isShowTree = !isShowTree" style="width: 100%">
                        <Icon slot="suffix" type="ios-arrow-down" v-if="!isShowTree" />
                              <Icon slot="suffix" type="ios-arrow-up" v-else />
                            </Input>
                            <div class="department-wrap" v-if="isShowTree">
                              <DepartmentEmployeeTree
                                :isDepartment="true"
                                @on-select="selectDepartmentOrEmployee"
                                @addmyorg = "addorg"
                                ref="departmentEmployeeTree"
                              ></DepartmentEmployeeTree>
                            </div>
                      </FormItem> -->
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
import Tables from '@/components/tables';
import RoleTree from '../role-tree/role-tree';
import DepartmentEmployeeTree from '../department-employee-tree/department-employee-tree';
export default {
  name: 'addModal',
  components: {
    DepartmentEmployeeTree,
    Tables
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    copyfile: null
  },
  created () {
    // console.log('moadlStat=======>', this.modalstat);
  },
  data () {
    return {
      isShowTree: false,
      // 树状图列表
      authlist: [],
      statList: [
        {
          label: this.$t('usermanage_view.working'),
          value: 1
        },
        {
          label: this.$t('usermanage_view.Quit'),
          value: 2
        }
      ],
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {
        rolename: '',
        description: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        content: [
          { required: true, message: 'The content cannot be empty', trigger: 'blur' }
        ]
      },
      mycolumns: [
        {
          type: 'index',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('indicatorSet_view.examTopic'),
          key: 'name',
          editable: true,
          width: 200
        },
        {
          title: this.$t('indicatorSet_view.scoreRange'),
          editable: true,
          children: [
            {
              title: this.$t('indicatorSet_view.beginScore'),
              key: 'beginScore',
              editable: true,
              width: 150
            },
            {
              title: this.$t('indicatorSet_view.endScore'),
              key: 'endScore',
              editable: true,
              width: 150
            }
          ]
          // width: 100
        },
        {
          title: this.$t('indicatorSet_view.scoreDescription'),
          key: 'scoreDesc',
          editable: true
          // width: 100
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
                title: '删除',
                action: () => {
                  this.$Modal.confirm({
                    title: '友情提醒',
                    content: '确定要删除吗？',
                    onOk: () => {
                      console.log('删除');
                      this.mydataList.splice(params.index, 1);
                      // this.deleteItem.postId = params.row.id;
                      // this.deleteItem.operatId = this.$store.state.user.userId;
                      // this.deletePositionById(this.deleteItem);
                    }
                  });
                }
              }
            ]);
          }
        }
      ],
      mydataList: []
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      // console.log('moadlStat=======>', this.modalstat);
      if (this.mymoadlStat === true) {
        if (this.copyfile) {
        } else {
          this.reset();
        }
      }
    }
  },
  methods: {
    additem () {
      const obj = {
        name: '添加内容',
        beginScore: '添加内容',
        endScore: '添加内容',
        scoreDesc: '添加内容'
      };
      this.mydataList.unshift(obj);
    },
    addorg (selection) {
      console.log('selection==========>', selection);
      console.log(selection.map(item => { return item.title; }).join(','));
      this.addformbase.organizationOaName = selection.map(item => { return item.title; }).join(',');
      this.addformbase.organizationOa = selection.map(item => { return item.id; }).join(',');
      console.log(this.addformbase.organizationOaName);
    },
    // 选择部门或者成员
    selectDepartmentOrEmployee (department) {
      console.log('department==============>', department);
    },
    reset () {
      this.addformbase = {
        name: '',
        content: ''
      };
      this.$refs.form.resetFields();
    },
    cancel () {
      this.reset();
      this.$emit('updateStat', false);
    },
    handsave () {
      this.modal_loading = true;
      for (const i in this.mydataList) {
        console.log('this.mydataList[i]==============', this.mydataList[i]);
        let obj = this.mydataList[i];
        for (const key in obj) {
          if (obj[key] === '添加内容') {
            this.modal_loading = false;
            this.$Message.error(`第${Number(i) + 1}行请输入内容`);
            return false;
          }
        }
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.addformbase.createId = this.$store.state.user.userId;
          this.addformbase.itemJson = JSON.stringify(this.mydataList);
          indicatorSetApi.addindicator(this.addformbase).then(res => {
            this.$Message.success(this.$t('addSuccess'));
            this.modal_loading = false;
            this.$emit('updateStat', false);
            this.reset();
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
