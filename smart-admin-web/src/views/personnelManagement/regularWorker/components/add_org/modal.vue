<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="460"
    :closable="false"
    :mask-closable="false"
    :styles="{ top: '10px' }"
  >
    <div slot="header" style="text-align:left;color:#fff;">
      <span>{{ $t("usermanage_view.adduser") }}</span>
    </div>
    <div>
      <Card dis-hover>
        <div class="department-wrap">
          <Tree
            ref="mytree"
            :data="treedata"
            :render="renderDepartmentTreeButton"
            style="height: 485px;overflow-x: scroll"
          ></Tree>
        </div>
      </Card>
    </div>
    <div slot="footer">
      <ButtonGroup>
        <Button
          type="primary"
          size="large"
          :loading="modal_loading"
          @click="handsave"
          >{{ $t("Save") }}</Button
        >
        <Button type="error" size="large" @click="cancel">{{
          $t("Close")
        }}</Button>
      </ButtonGroup>
    </div>
  </Modal>
</template>
<script>
import { organization } from '@/api/organization';
import $ from 'jquery';
export default {
  name: 'addorg',
  components: {
  },
  props: {
    modalstat: null,
    type: null,
    memberId: null
  },
  data () {
    return {
      mymoadlStat: false,
      addformbase: {},
      modal_loading: false,
      treedata: []
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      this.getorganizationtreedata();
    }
  },
  methods: {
    addorg (selection) {
      console.log('selection==========>', selection);
      console.log(
        selection
          .map(item => {
            return item.title;
          })
          .join(',')
      );
      this.addformbase.organizationOaName = selection
        .map(item => {
          return item.title;
        })
        .join(',');
      this.addformbase.organizationOa = selection
        .map(item => {
          return item.id;
        })
        .join(',');
      console.log(this.addformbase.organizationOaName);
    },
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
    convertTree (tree, map) {
      const result = [];
      // 遍历 tree
      tree.forEach(item => {
        console.log(item);
        // 读取 map 的键值映射
        const title = item[map.title];
        const parentId = item[map.parentId];
        const expand = true;
        const level = item[map.level];
        const id = item[map.id];
        let children = item[map.children];
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
    ok () {
      this.$Message.info('Clicked ok');
    },
    renderDepartmentTreeButton (h, { root, node, data }) {
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
          )
        ]
      );
    },
    handsave () {
      this.modal_loading = true;
      setTimeout(() => {
        this.$emit('updateStat', false, this.addformbase, this.type);
        this.modal_loading = false;
      }, 1000);
    },
    cancel () {
      this.$emit('updateStat', false);
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