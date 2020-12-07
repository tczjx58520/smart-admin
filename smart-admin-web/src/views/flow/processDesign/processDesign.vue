<template>
  <div>
    <!-- 添加任务 -->
    <div style="display:flex">
        <!-- <div style="width:20%;height: calc(80vh)">
            <Card class="warp-card" dis-hover>
                <Tree
                  :data="treedata"
                  :render="renderDepartmentTreeButton"
                  style="height: calc(80vh);overflow-x: scroll"
                  @on-select-change="filterorg"
                ></Tree>
            </Card>
        </div> -->
        <div style="height:calc(80vh)">
            <Card class="warp-card" dis-hover>
                <Row :gutter="16">
                    <Form :model="searchform" class="tools" inline ref="searchform" :label-width="65" label-position="left">
                      <Col span="5">
                      <FormItem prop="person" :label="$t('lcmc')" style="width:100%">
                        <Input placeholder="流程名称" type="text" v-model="searchform.flowName" style="width:100%" />
                      </FormItem>
                      </Col>
                      <Col span="5">
                      </Col>
                      <Col span="4">
                      <FormItem>
                        <ButtonGroup>
                          <Button @click="search" icon="ios-search" type="primary">{{ $t('Search') }}</Button>
                          <!-- <Button @click="reset" icon="md-refresh" type="default">重置</Button> -->
                        </ButtonGroup>
                      </FormItem>
                      </Col>
                    </Form>
                </Row>
            </Card>
            <Card class="warp-card" dis-hover>
                <div style="margin-bottom:20px;">
                    <Button @click="refresh" icon="md-refresh" type="default" style="margin-right:15px;">{{ $t('Reflash') }}</Button>
                    <Button @click="created" v-privilege="['10-19-1']" icon="md-add" type="warning" style="margin-right:15px;">{{ $t('processDesign_view.newProcess') }}</Button>
                </div>
                  <Tables
                    :columns="columns"
                    :current="searchform.pageNum"
                    :loading="loading"
                    :page-size="searchform.pageSize"
                    :editable="true"
                    :pageShow="false"
                    :total="pageTotal"
                    :value="data"
                    @on-change="changePage"
                    @on-selection-change="myselected"
                    border
                    show-elevator
                  ></Tables>
                <Page :current="searchform.pageNum" :page-size="searchform.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
                :total="pageTotal" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator show-sizer
                show-total style="margin:24px 0;text-align:right;"></Page>
            </Card>
            <!-- 新建弹窗 -->
            <addGong v-if="refreshModal" :modalstat = "visiable" :editinfo="editinfo" @updateStat = "updateStat"></addGong>
            <!-- 新建结束============= -->
            <!-- <stepDialog :modalstat = "visiable_step" :editinfo="editinfo" @updateStat = "updateStat_step" /> -->
            <viewProcessDialog v-if="refreshModal" :modalstat = "visiable_view" :editinfo="editinfo" @updateStat = "updateStat_view"></viewProcessDialog>
            <editProcessDialog v-if="refreshModal" :modalstat = "visiable_edit" :editinfo="editinfo" :IsCopy="IsCopy" @updateStat = "updateStat_edit"></editProcessDialog>
        </div>
    </div>
    <!-- 任务日志 -->
  </div>
</template>

<script>
import Tables from '@/components/tables';
import $ from 'jquery';
import { organization } from '@/api/organization';
import addGong from './components/addmodalGong/modal';
import { FlowApi } from '@/api/flow';
import viewProcessDialog from './components/view_dialog/view_process_dialog';
import editProcessDialog from './components/edit-dialog/edit-dialog';
export default {
  name: 'processDesign',
  components: {
    Tables,
    addGong,
    viewProcessDialog,
    editProcessDialog
  },
  props: {},
  data () {
    return {
      IsCopy: false,
      editinfo: [],
      treedata: [],
      searchform: {
        pageNum: 1,
        pageSize: 10,
        flowName: ''
      },
      pageTotal: 0,
      // table是否loading
      loading: true,
      // table表头
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('lx'),
          key: 'type',
          width: '100',
          render: (h, params) => {
            if (params.row.type === 1) {
              return h('div', [
                h('span', this.$t('processDesign_view.fixedProcess'))
              ]);
            } else {
              return h('div', [
                h('span', this.$t('processDesign_view.fixedProcess'))
              ]);
            }
          }
        },
        {
          title: this.$t('lcmc'),
          key: 'flowName'
        },
        {
          title: this.$t('zt'),
          key: 'stat ',
          width: '100',
          align: 'center',
          render: (h, params) => {
            if (params.row.stat === 1) {
              return h('div', [
                h('span', this.$t('Open'))
              ]);
            } else {
              return h('div', [
                h('span', this.$t('Forbid2'))
              ]);
            }
          }
        },
        {
          title: this.$t('cz'),
          key: 'action',
          className: 'action-hide',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: params.row.stat === 1 ? 'error' : 'primary',
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
                    const data = {
                      id: params.row.id,
                      stat: params.row.stat === 1 ? 2 : 1
                    };
                    FlowApi.changeFlowStat(data).then(res => {
                      this.getTaskList();
                    });
                  }
                }
              }, params.row.stat === 1 ? this.$t('Forbid2') : this.$t('open')),
              h('Button', {
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
                    // console.log('params=====', params);
                    this.visiable_view = true;
                    this.editinfo = params.row;
                  }
                }
              }, this.$t('View')),
              h('Button', {
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
                    // console.log('params=====', params);
                    this.visiable_edit = true;
                    this.IsCopy = false;
                    this.editinfo = params.row;
                  }
                }
              }, this.$t('Edit')),
              h('Button', {
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
                    this.visiable_edit = true;
                    this.IsCopy = true;
                    this.editinfo = params.row;
                  }
                }
              }, this.$t('Copy')),
              h('Button', {
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
                        const data = {
                          id: params.row.id,
                          operatId: this.$store.state.user.userLoginInfo.userId
                        };
                        FlowApi.delFlow(data).then(res => {
                          this.$Message.success(this.$t('sccg'));
                          this.getTaskList();
                        });
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
      visiable: false,
      visiable_view: false,
      visiable_edit: false,
      visiable_step: false,
      moreemp: [],
      refreshModal: true
    };
  },
  mounted () {
    this.getTaskList();
    this.getorganizationtreedata();
  },
  methods: {
    // 渲染部门树形图功能按钮
    renderDepartmentTreeButton (h, { root, node, data }) {
      let newName = data.title;
      if (newName.length > 8) {
        newName = data.title.substring(0, 8) + '...';
      }
      let icon = '';
      if (data.parentId === 0) {
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
          )
        ]
      );
    },
    // 选中部门 更新员工table
    loadEmployeeTable (event, root, node, data) {
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
    myselected (selection) {
      this.moreemp = selection;
    },
    del () {
      console.log('删除');
    },
    created () {
      console.log('新建');
      this.visiable = true;
      this.editinfo = this.moreemp;
    },
    search () {
      this.getTaskList();
    },
    filterorg (a, b) {
      this.searchform.organizationOa = b.id;
      this.getTaskList();
    },
    // 生成树结构
    convertTree (tree, map) {
      const result = [];

      // 遍历 tree
      tree.forEach((item) => {
        // 读取 map 的键值映射
        const title = item[ map.title ];
        const parentId = item[ map.parentId ];
        const expand = true;
        let children = item[ map.children ];
        const id = item[map.id];
        // 如果有子节点，递归
        if (children) {
          children = this.convertTree(children, map);
        }

        result.push({
          title,
          expand,
          parentId,
          children,
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
      const map = {
        title: 'organizeName',
        parentId: 'parentId',
        children: 'children',
        id: 'id'
      };
      this.treedata = this.convertTree(result.data.content, map);
    },
    // 树结构结束===============================>
    // 查询任务调度列表
    async getTaskList () {
      this.loading = true;
      const result = await FlowApi.getFlow(this.searchform);
      this.loading = false;
      this.data = result.data.content.list;
      this.pageTotal = result.data.content.totalCount;
    },
    // 分页
    changePage (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getTaskList();
    },
    // 分页
    changePageSize (pageSize) {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getTaskList();
    },
    // 刷新
    refresh () {
      this.searchform.pageNum = 1;
      delete this.searchform.organizationOa;
      this.getTaskList();
    },
    updateStat (state) {
      this.visiable = state;
      this.refreshModal = false;
      setTimeout(() => {
        this.refreshModal = true;
      }, 300);
      this.getTaskList();
    },
    updateStat_view (state) {
      this.visiable_view = state;
      this.refreshModal = false;
      this.getTaskList();
      setTimeout(() => {
        this.refreshModal = true;
      }, 300);
    },
    updateStat_edit (state) {
      this.visiable_edit = state;
      this.getTaskList();
      this.refreshModal = false;
      setTimeout(() => {
        this.refreshModal = true;
      }, 300);
    }
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
