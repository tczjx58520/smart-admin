<template>

<div>
<div style="display: flex;align-items:center" >
  <div style="width: 20%">
  <Card class="warp-card" dis-hover >
<div style="display:flex; align-items: center;flex-wrap: wrap">
           <div style="margin-right: 15px;margin-top: 10px"  ><Button icon="md-refresh" @click="getorganizationtreedata">{{$t('Reflash')}}</Button> </div>
            <div style="margin-right: 15px;margin-top: 10px"><Button v-privilege="['1-2-3']" icon="md-close" type="error" @click="deletetree">{{$t('Delete')}}</Button> </div>
         </div>
  </Card>
  </div>
  <div style="width: 80%">
  <Card class="warp-card" dis-hover >
<div style="display:flex; align-items: center">
             <div style="margin-right: 15px;margin-top: 10px"><Button v-privilege="['1-2-1']" icon="md-add" type="primary" @click="handleSave">{{$t('Save')}}</Button> </div>

         </div>
  </Card>
  </div>
</div>
  <div style="display:flex;margin-top: 20px">
    <div style="width: 20%">

      <Card class="warp-card" dis-hover style="height: calc(65vh)">

          <!-- <Tree
            ref="mytree"
            :data="treedata"
            style="height: 485px;overflow-x: scroll"
            @on-select-change="getnode"
          ></Tree> -->
          <Tree
            ref="mytree"
            :data="treedata"
            :render="renderDepartmentTreeButton"
            style="height: 485px;overflow-x: scroll"
          ></Tree>
        </Card>
  </div>
    <div style="width: 80%;">
      <Card class="warp-card" dis-hover style="height: calc(65vh);">
<div>
  <div style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;">
<div style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"></div>
<div>{{$t('BaseData')}}</div>
  </div>
  <div style="margin-top: 20px;">
 <Form ref="myForm" :model="formdata" label-position="top" :rules="ruleValidate">
        <FormItem :label="$t('OrganizationName')" prop="organizeName">
            <Input v-model="formdata.organizeName" style="width: 30%"></Input>
        </FormItem>
        <FormItem :label="$t('BelongParent')">
            <Input v-model="formdata.organizeParent" readonly @click.native="isShowTree = !isShowTree" style="width: 30%">
            <Icon slot="suffix" type="ios-arrow-down" v-if="!isShowTree" />
                  <Icon slot="suffix" type="ios-arrow-up" v-else />
                </Input>
                <div class="department-wrap" v-if="isShowTree">
                  <DepartmentEmployeeTree
                    :isDepartment="true"
                    @on-select="selectDepartmentOrEmployee"
                    ref="departmentEmployeeTree"
                  ></DepartmentEmployeeTree>
                </div>
        </FormItem>
    </Form>
  </div>
   </div>
      </Card>
    </div>
  </div>
  </div>
</template>
<script>
import $ from 'jquery';
import { organization } from '@/api/organization';
import DepartmentEmployeeTree from './components/department-employee-tree/department-employee-tree';
export default {
  name: 'Organization',
  components: {
    DepartmentEmployeeTree
  },
  props: {},
  data () {
    return {
      treedata: [],
      formdata: {
        organizeName: '',
        organizeParent: '',
        level: 1,
        parentId: 0
      },
      isShowTree: false,
      ruleValidate: {
        organizeName: [
          { required: true, message: 'The organizeName cannot be empty', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {

  },
  mounted () {
    this.getorganizationtreedata();
  },
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {},
  methods: {
    // 重置表单
    resetForm () {
      this.$refs.myForm.resetFields();
      this.formdata = {
        organizeName: '',
        organizeParent: '',
        level: 1,
        parentId: 0
      };
    },
    getnode (a, b) {
      console.log(a, b);
      // this.formdata.organizeName = b.title;
      // this.formdata.organizeId = b.id
      // this.formdata.organizeParent = department.name;
    },
    // 选择部门点击外部关闭
    clickOutside () {
      if (this.isShowTree) {
        this.isShowTree = false;
      }
    },
    // 选择部门或者成员
    selectDepartmentOrEmployee (department) {
      console.log('department', department);
      this.formdata.organizeParent = department.name;
      this.formdata.level = department.level + 1;
      this.formdata.parentId = department.id;
      // this.$set(this.formdata, 'organizeParent', department.id);
      // this.$set(this.formdata, 'organizeParent', department.name);
      this.isShowTree = false;
      $('.department-wrap').hide();
    },
    handleSave () {
      this.formdata.createId = this.$store.state.user.userId;
      console.log('this.formdata===>', this.formdata);
      this.$refs.myForm.validate((valid) => {
        if (valid) {
          console.log('true==========>');
          organization.addOrganization(this.formdata).then(res => {
            this.$Message.success(this.$t('addSuccess'));
            this.resetForm();
            this.getorganizationtreedata();
            console.log(res);
          });
        } else {
          this.$Message.error('Fail!');
        }
      });
    },
    deletetree () {
      this.$Modal.confirm({
        title: 'Title',
        content: '<p>确认删除该节点？</p>',
        okText: 'OK',
        cancelText: 'Cancel',
        onOk: () => {
          if (this.$refs.mytree.getSelectedNodes().length === 0) {
            this.$Message.error('请选择一个节点');
            return false;
          }
          const nodeinfo = this.$refs.mytree.getSelectedNodes()[0];
          console.log(this.$refs.mytree.getSelectedNodes());
          let data = {};
          data.organizeId = nodeinfo.id;
          data.operatId = this.$store.state.user.userId;
          organization.delOrganization(data).then(res => {
            if (res.ret === 200) {
              this.$Message.info('dele ok');
              this.getorganizationtreedata();
            }
          });
        },
        onCancel: () => {
          this.$Message.info('cancel');
        }
      });
    },
    //     /**
    //  * tree 数据转换
    //  * @param  {Array} tree 待转换的 tree
    //  * @param  {Object} map  键值对映射
    //  * @return {Array}      转换后的 tree
    //  */
    convertTree (tree, map) {
      const result = [];
      // 遍历 tree
      tree.forEach((item) => {
        console.log(item);
        // 读取 map 的键值映射
        const title = item[ map.title ];
        const parentId = item[ map.parentId ];
        const expand = true;
        const level = item[ map.level ];
        const id = item[ map.id ];
        let children = item[ map.children ];
        // 如果有子节点，递归
        if (children) {
          children = this.convertTree(children, map);
        }

        result.push({
          title,
          expand,
          parentId,
          children,
          level,
          id
        });
      });

      return result;
    },
    // 组织架构树数据
    async getorganizationtreedata () {
      const result = await organization.organizationlist().then(res => {
        return res;
      });
      console.log('result', result);
      const map = {
        title: 'organizeName',
        parentId: 'parentId',
        children: 'children',
        level: 'level',
        id: 'id'
      };
      this.treedata = this.convertTree(result.data.content, map);
    },
    // 改写的组织架构
    // 渲染部门树形图功能按钮
    renderDepartmentTreeButton(h, { root, node, data }) {
      console.log(root, node, data);
      let newName = data.title;
      if (newName.length > 8) {
        newName = data.title.substring(0, 8) + '...';
      }
      let icon = '';
      if (data.level === 1) {
        icon = 'md-cube';
      } else {
        icon = 'md-menu';
      }
      return h(
        'div',
        {
          props: {
            placement: 'right'
          },
          style: { fontSize: '12px' }
        },
        [
          h(
            'span',
            {
              style: {
                display: 'inline-block'
              }
            },
            [
              h('span', [
                h(
                  'div',
                  {
                    props: {
                      // content:'123',
                      // placement: 'top'
                    },
                    style: { fontSize: '12px' }
                  },
                  [
                    h('Icon', {
                      props: {
                        type: icon
                      },
                      style: {
                        marginRight: '8px'
                      }
                    }),
                    h(
                      'Button',
                      {
                        props: Object.assign({}),
                        class: ['departmentSelect'],
                        style: {
                          border: 'none',
                          background: '#ffffff',
                          padding: '4px 5px'
                        },
                        on: {
                          click: event => {
                            console.log('11');
                            this.loadEmployeeTable(event, root, node, data);
                          }
                        }
                      },
                      newName
                    )
                  ]
                )
              ])
            ]
          ),
        ]
      );
    },
     // 选中部门 更新员工table
    loadEmployeeTable(event, root, node, data) {
      $('.departmentSelect').css({ background: '#ffffff', color: 'black' });
      let target = event.target;
      let tagName = target.tagName;
      if (tagName !== 'BUTTON') {
        target.parentNode.style.backgroundColor = '#5cadff';
        target.parentNode.style.color = '#ffffff';
      } else {
        target.style.backgroundColor = '#5cadff';
        target.style.color = '#ffffff';
      }
    },
  }
};
</script>

<style lang="less" scoped>
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
.departmentSelect {
  background: #ffffff;
  color: black;
}
/deep/.ivu-tree-title-selected {
  background: #ffffff;
}
</style>
