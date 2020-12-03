<template>
  <!--div 功能权限部分 start-->
  <div id="tree">
    <!-- <Row>
      <Col class="button-style" span="8">
        <Button
          @click.native="saveChange()"
          style="margin-right: 20px;"
          type="primary"
          v-privilege="'update-role-privilege'"
        >保存</Button>
      </Col>
    </Row> -->
    <!--CheckboxGroup 功能权限勾选部分 start-->
    <CheckboxGroup v-model="checkedData" disabled>
      <div class="checked-box">
        <ul>
          <!--li 一级权限模块 start-->
          <li :key="module.id" v-for="module in tree">
            <div class="level-one">
              <!-- <Checkbox
                :label="module.id"
                @click.prevent.native="handleall(tree, moduleIndex)"
              >{{module.name}}</Checkbox> -->
              <Icon v-if="!module.value" type="md-add">
              </Icon>
              <Icon v-else type="md-trash">
              </Icon>
              <span class="level-one" style="font-size:12px;">{{module.name}}</span>
            </div>
            <!--div 二级权限模块 start-->
            <div
              :key="childrenModule.id"
              class="level-teo"
              v-for="childrenModule in module.authorityVos"
            >
              <!-- <Checkbox
                :value="childrenModule.value"
                @click.prevent.native="handleCheckAll(module.authorityVos,childrenModuleIndex,module.id)"
                class="level-teo-label"
              >{{childrenModule.name}}</Checkbox> -->
              <Icon v-if="!childrenModule.value" type="md-add">
              </Icon>
              <Icon v-else type="md-trash">
              </Icon>
              <span class="level-teo-label" style="font-size:12px;">{{childrenModule.name}}</span>
              <!--div 三级权限模块 start-->
              <div class="level-three">
                <template v-for="(pages,pagesIndex) in childrenModule.authorityDetails">
                  <div
                    :key="pages.id + '-' + childrenModule.authorityDetails.id"
                    class="isLevel-four"
                    v-if="pages.children && pages.children.length > 0"
                  >
                    <Checkbox
                      :key="pages.key"
                      :label="pages.key"
                      disabled
                      class="level-three-label"
                    >{{pages.name}}</Checkbox>
                    <div :key="pagesIndex" class="Level-four" v-if="pages.children.length > 0">
                      <template v-for="page in pages.children">
                        <Checkbox
                          :key="page.key"
                          :label="page.key"
                          disabled
                        >{{page.name}}</Checkbox>
                      </template>
                    </div>
                  </div>
                  <Checkbox
                    :key="module.id + '-' + childrenModule.id + '-' + pages.id"
                    :label="module.id + '-' + childrenModule.id + '-' + pages.id"
                    disabled
                    v-else
                  >{{pages.name}}</Checkbox>
                </template>
              </div>
              <!--div 三级权限模块 end-->
            </div>
            <!--div 二级权限模块 end-->
          </li>
          <!--li 一级权限模块 end-->
        </ul>
      </div>
    </CheckboxGroup>
    <!--CheckboxGroup 功能权限勾选部分 end-->
  </div>
  <!--div 功能权限部分 end-->
</template>
<script>/* eslint-disable no-undef */
import { roleApi } from '@/api/role';
import { privilegeApi } from '@/api/privilege';
export default {
  name: 'RoleTree',
  props: {
    // 角色id
    // roleId: {
    //   type: Number,
    //   required: true,
    //   validator: value => {
    //     return value >= 0;
    //   }
    // }
    selected: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  // 父级组件数据传递
  data () {
    return {
      // 权限数据
      tree: [],
      loading: false,
      // 提交保存数据
      rolePower: {
        privilegeKeyList: [],
        roleId: ''
      },
      // 已选项
      checkedData: []
    };
  },
  computed: {},
  watch: {
    // roleId (newVal) {
    //   if (newVal) {
    //     this.getListPrivilegeByRoleId(newVal);
    //   }
    // }
    selected () {
      console.log('selected=======>', this.selected);
      this.checkedData = this.selected.rolesOa;
    }
  },
  filters: {},
  created () {},
  mounted () {
    this.getListPrivilegeByRoleId();
    console.log('selected=======>', this.selected);
  },
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {},
  methods: {
    // 自定义一级节点方法
    handleall (currentModuleList, moduleIndex) {
      let mymodule = currentModuleList[moduleIndex];
      mymodule.value = !mymodule.value;
      for (const i in mymodule.authorityVos) {
        let item = mymodule.authorityVos[i];
        console.log(item, mymodule);
        this.handleCheckAll(mymodule.authorityVos, Number(i), mymodule.id, mymodule);
      }
      console.log(this.checkedData);
    },
    // 自定义二级节点方法
    handleCheckAll (currentModuleList, moduleIndex, upOneModuleList, upOneModule) {
      // this.tree.authorityVos
      let mymodule = currentModuleList[moduleIndex];
      // this.tree.authorityVos[moduleIndex].value = !this.tree.authorityVos[moduleIndex].value;
      mymodule.value = !mymodule.value;
      for (const i in mymodule.authorityDetails) {
        const label = upOneModuleList + '-' + mymodule.id + '-' + mymodule.authorityDetails[i].id;
        let findIndex = this.checkedData.findIndex(val => val === label);
        if (findIndex !== -1) {
          if (mymodule.value === false) {
            this.checkedData.splice(findIndex, 1);
          }
        } else {
          if (mymodule.value === true) {
            this.checkedData.push(label);
          }
        }
        console.log('upOneModule===>', upOneModule, currentModuleList.every(item => item.flag === true));

        if (currentModuleList.every(item => item.value === true)) {
          upOneModule.value = true;
        } else {
          upOneModule.value = false;
        }
        console.log(this.checkedData);
      }
    },
    // 自定义三级节点方法
    selectCheckbox2 (currentModuleList,
      moduleIndex,
      upOneModuleList,
      uptwoModuleList,
      fatherModule,
      topmodule
    ) {
      console.log(currentModuleList, moduleIndex, upOneModuleList, uptwoModuleList, fatherModule, topmodule.authorityVos);
      let module = currentModuleList[moduleIndex];
      const thisLabel = uptwoModuleList + '-' + upOneModuleList + '-' + module.id;
      let findIndex = this.checkedData.indexOf(thisLabel);
      if (findIndex !== -1) {
        this.checkedData.splice(findIndex, 1);
        module.flag = false;
        topmodule.value = false;
        // return false;
      } else {
        this.checkedData.push(thisLabel);
        module.flag = true;
      }
      if (currentModuleList.every(item => item.flag === true)) {
        fatherModule.value = true;
      } else {
        fatherModule.value = false;
      }
      if (topmodule.authorityVos.every(item => item.value === true)) {
        topmodule.value = true;
      } else {
        topmodule.value = false;
      };
      console.log(this.checkedData);
    },
    // 勾选权限
    selectCheckbox (
      currentModuleList,
      moduleIndex,
      upOneModuleList,
      upTwoModuleList
    ) {
      let module = currentModuleList[moduleIndex];
      // 是否勾选
      let findIndex = this.checkedData.indexOf(module.key);
      if (findIndex !== -1) {
        this.spliceCheck(module);
        // 取消的上级ID
        // 判断同级是否全部已取消勾选
        let currentLevelAllUnchecked = this.isUnCheckedThisLevel(
          currentModuleList
        );
        if (currentLevelAllUnchecked && upOneModuleList) {
          // 判断上级是否全部已取消勾选
          let upOneLevelAllUnchecked = this.isUnCheckedThisLevel(
            upOneModuleList
          );
          if (upOneLevelAllUnchecked && upTwoModuleList) {
            // 判断上上级是否全部已取消勾选
            this.isUnCheckedThisLevel(upTwoModuleList);
          }
        }
      } else {
        // 选中子级所有checkBox
        this.addCheck(module);
        // 选中上级组件
        if (module.parentKey) {
          if (
            this.checkedData.findIndex(val => val === module.parentKey) === -1
          ) {
            this.checkedData.push(module.parentKey);
          }
        }
        // 选中上上级组件
        if (upOneModuleList) {
          let upOneFindIndex = upOneModuleList.findIndex(
            e => e.key === module.parentKey
          );
          let upOneFind =
            upOneFindIndex === -1 ? null : upOneModuleList[upOneFindIndex];
          if (
            upOneFind &&
            upOneFind.parentKey &&
            this.checkedData.findIndex(val => val === upOneFind.parentKey) ===
              -1
          ) {
            this.checkedData.push(upOneFind.parentKey);
          }
          // 选中上上上级组件
          if (upTwoModuleList) {
            let upTwoFindIndex = upTwoModuleList.findIndex(
              e => e.key === upOneFind.parentKey
            );
            let upTwoFind =
              upTwoFindIndex === -1 ? null : upTwoModuleList[upTwoFindIndex];
            if (
              upTwoFind &&
              upTwoFind.parentKey &&
              this.checkedData.findIndex(val => val === upTwoFind.parentKey) ===
                -1
            ) {
              this.checkedData.push(upTwoFind.parentKey);
            }
          }
        }
      }
    },
    // 判断同级是否全部已取消勾选
    isUnCheckedThisLevel (moduleList) {
      let thisLevelAllUnchecked = true;
      moduleList.forEach(e => {
        let brotherIndex = this.checkedData.findIndex(val => val === e.key);
        if (brotherIndex !== -1) {
          thisLevelAllUnchecked = false;
        }
      });
      if (thisLevelAllUnchecked) {
        let number = this.checkedData.findIndex(
          e => e === moduleList[0].parentKey
        );
        if (number !== -1) {
          this.checkedData.splice(number, 1);
        }
      }
      return thisLevelAllUnchecked;
    },
    // 选中子级所有checkBox
    addCheck (module) {
      let findIndex = this.checkedData.findIndex(val => val === module.id);
      if (findIndex === -1) {
        this.checkedData.push(module.id);
      }
      if (module.authorityVos) {
        module.authorityVos.forEach(item => {
          this.addCheck(item);
        });
      }
      if (module.authorityDetails) {
        module.authorityDetails.forEach(item => {
          this.addCheck(item);
        });
      }
    },
    // 取消自己和下级勾选
    spliceCheck (module) {
      let findIndex = this.checkedData.findIndex(val => val === module.key);
      if (findIndex !== -1) {
        this.checkedData.splice(findIndex, 1);
      }
      if (module.children) {
        module.children.forEach(item => {
          this.spliceCheck(item);
        });
      }
    },
    // 保存改变权限
    saveChange () {
      if (this.checkedData.length === 0) {
        this.$Message.error('还未选择任何权限');
        return;
      }
      this.rolePower.roleId = this.roleId;
      this.rolePower.privilegeKeyList = this.checkedData.concat();
      this.getRolePower(this.rolePower);
    },
    // 更新角色功能权限方法
    async getRolePower (data) {
      this.$Spin.show();
      try {
        await privilegeApi.getRolePower(data);
        this.$Message.info('保存成功');
        this.rolePower.privilegeKeyList = [];
        await this.getListPrivilegeByRoleId(this.roleId);
      } catch (e) {
        console.error(e);
      } finally {
        this.$Spin.hide();
      }
    },
    // 获取角色可选的功能权限
    async getListPrivilegeByRoleId () {
      try {
        let response = await roleApi.getRoleDetail();
        let datas = response.data.content;
        this.tree = datas;
        // this.checkedData = datas.selectedKey || [];
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="less" scoped>
#tree {
  border-top: none;
}
.col-desc {
  margin: 20px 0;
  font-size: 15px;
  color: #95a5a6;
  padding: 0 20px;
}
.button-style {
  margin: 20px 0 20px 0;
  padding-left: 20px;
  text-align: right;
}
.check-right {
  margin-right: 20px;
}
.row-border {
  border: 1px solid #f0f0f0;
}
.col-border {
  line-height: 50px;
  padding-left: 20px;
  border-right: 1px solid #f0f0f0;
}
.col-left {
  line-height: 50px;
  padding-left: 40px;
  border-right: 1px solid #f0f0f0;
}
.col-right {
  padding-left: 20px;
  border-right: 1px solid #f0f0f0;
}
.ivu-tree ul li {
  white-space: normal;
}
.ivu-tree {
  > ul {
    > li {
      > ul {
        > li {
          .ivu-tree-title {
            vertical-align: middle;
            font-weight: bold;
          }
          > ul {
            display: inline-block;
            .ivu-tree-title {
              font-weight: normal;
            }
          }
        }
      }
    }
  }
}
.checked-box {
  padding: 0 15px;
  ul {
    padding: 0;
    margin: 0;
    li {
      list-style: none;
      padding: 0;
      margin: 0;
      .level-one {
        border-bottom: 1px solid rgb(240, 240, 240);
        padding: 10px 0;
      }
      .level-teo {
        display: flex;
        align-items: center;
        margin-left: 4%;
        position: relative;
        border-bottom: 1px solid rgb(240, 240, 240);
        line-height: 40px;
        .level-teo-label {
          width: 12%;
          min-width: 120px;
        }
        // &:before{ content: '';  position: absolute; height: 100%; width: 1px; background: rgb(240, 240, 240); left: 12%; top: 0; }
        .level-three {
          padding-left: 4%;
          display: block;
          flex: 1;
          min-height: 40px;
          border-left: 1px rgb(240, 240, 240) solid;
          .isLevel-four {
            display: flex;
            align-items: center;
            .level-three-label {
              width: 12%;
              min-width: 120px;
            }
            .Level-four {
              padding-left: 4%;
              flex: 1;
              min-height: 40px;
              border-left: 1px rgb(240, 240, 240) solid;
            }
          }
        }
      }
      .ivu-checkbox-wrapper {
        margin-right: 15px;
      }
    }
  }
}
</style>
