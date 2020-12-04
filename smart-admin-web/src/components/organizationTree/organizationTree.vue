<template>
    <div>
         <Card class="warp-card" dis-hover style="height: calc(65vh)">
          <Tree
            ref="mytree"
            :data="treedata"
            :render="renderDepartmentTreeButton"
            style="height: 100%;overflow-x: scroll"
          ></Tree>
        </Card>
    </div>
</template>

<script>
import { organization } from '@/api/organization';
import $ from 'jquery';
export default {
    name: 'organizationTree',
    data() {
        return {
            treedata: [],
            formdata: {
                organizeName: '',
                organizeParent: '',
                level: 1,
                parentId: 0
            },
        }
    },
    mounted() {
        this.getorganizationtreedata()
    },
    methods: {
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
        // console.log(item);
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
    //   console.log('result', result);
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
    renderDepartmentTreeButton (h, { root, node, data }) {
      // console.log(root, node, data);
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
                            // console.log('11');
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
      console.log(data)
      this.$emit('chooseTreeData', data)
      let target = event.target;
      let tagName = target.tagName;
      if (tagName !== 'BUTTON') {
        target.parentNode.style.backgroundColor = '#5cadff';
        target.parentNode.style.color = '#ffffff';
      } else {
        target.style.backgroundColor = '#5cadff';
        target.style.color = '#ffffff';
      }
    }
    }
}
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