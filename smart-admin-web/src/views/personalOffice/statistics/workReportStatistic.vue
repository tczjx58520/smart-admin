<template>
  <div>
    <Card dis-hover>
      <div style="display:flex">
        <div style="width: 15%">
          <Tree ref="mytree"
                :data="treedata"
                style="height: 485px;border-right:1px solid gray"
                @on-select-change="getnode"></Tree>
        </div>

        <div style="width: 75%;margin-left:100px">
          <div style="display:flex">
            <RadioGroup v-model="searchform.buttonSize"
                        type="button">
              <Radio label="large">日报</Radio>
              <Radio label="default">周报</Radio>
              <Radio label="small">月报</Radio>
            </RadioGroup>
          </div>
          <Divider style="background-color:gray" />

          <div style="display:flex;margin-bottom:20px">
            <DatePicker type="date"
                        size="small"
                        placeholder="Select date"
                        style="width: 200px"></DatePicker>
            <CheckboxGroup v-model="searchform.check"
                           style="margin-left:20px">
              <Checkbox label="正常"></Checkbox>
              <Checkbox label="补交"></Checkbox>
              <Checkbox label="未提交"></Checkbox>
            </CheckboxGroup>

            <span style="width:10px;height:10px;border-radius:50%;background-color:red;margin-top: 5px;"></span>
            <span>表示未提交统计</span>
            <span style="width:10px;height:10px;border-radius:50%;background-color:yellow;margin-top: 5px;margin-left:10px"></span>
            <span>表示补交统计</span>
            <span style="width:10px;height:10px;border-radius:50%;background-color:blue;margin-top: 5px;margin-left:10px"></span>
            <span>表示正常提交</span>

          </div>
          <Table border
                 ref="selection"
                 :columns="columns4"
                 :data="emplist"
                 max-height="400"
                 :loading="emp_loading"
                 @on-selection-change="selectService"></Table>
          <Page :current="searchform.pageNum"
                :page-size="searchform.pageSize"
                :page-size-opts="[10, 20, 30, 50, 100]"
                :total="pageTotal"
                @on-change="changePage"
                @on-page-size-change="changePageSize"
                show-elevator
                show-sizer
                show-total
                style="margin:24px 0;text-align:right;"></Page>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { usermanagelApi } from '@/api/usermanage';
import { organization } from '@/api/organization';
import { groupApi } from '@/api/group';
export default {
  created () {
    this.getemplist();
  },
  data () {
    return {
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
      // 保存按钮加载状态
      modal_loading: false,
      treedata: [],
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('userName1'),
          key: 'personName'
        }
      ],
      emplist: [],
      emp_loading: true,
      // 人员搜查id
      searchform: {
        roleId: '',
        pageNum: 1,
        pageSize: 10,
        loginRepositoryId: this.$store.state.user.userLoginInfo.repositoryId
      },
      pageTotal: 0,
      // 角色列表
      roleList: [],
      curPageSelected: [], // 存放当前页选中项
      formValidate: {},
      curPageSelectedName: [] // 存放当前页名字
    };
  },
  computed: {
    curPageAllIds () { // 存放当前页所有数据
      return this.emplist.map((item) => item.id);
    },
    curPageAllNames () {
      return this.emplist.map((item) => item.personName);
    }
  },
  mounted () {
    this.getorganizationtreedata();
  },
  methods: {
    async getroleList () {
      await usermanagelApi.getroleList().then(res => {
        this.roleList = res.data.content;
      });
    },
    // 获取组织架构
    async getorganizationtreedata () {
      const result = await organization.organizationlist().then(res => {
        return res;
      });
      const map = {
        title: 'organizeName',
        parentId: 'parentId',
        children: 'children',
        level: 'level',
        id: 'id'
      };
      this.treedata = this.convertTree(result.data.content, map);
    },
    /**
     * tree 数据转换
     * @param  {Array} tree 待转换的 tree
     * @param  {Object} map  键值对映射
     * @return {Array}      转换后的 tree
     */
    convertTree (tree, map) {
      const result = [];
      // 遍历 tree
      tree.forEach((item) => {
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
    // ===========================>组织架构结束<==========================================
    // 获取员工列表
    getemplist () {
      this.emp_loading = true;
      usermanagelApi.queryList(this.searchform).then(res => {
        this.pageTotal = res.data.content.totalCount;
        this.emp_loading = false;
        this.emplist = this.selectFromId(res.data.content.list, this.formValidate.serviceIdList);
      });
    },
    // 分页函数
    changePage (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getemplist();
    },
    changePageSize (pageSize) {
      //   this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getemplist();
    },
    // 搜索函数
    search () {
      this.getemplist();
    },
    getnode (a, b) {
      this.searchform.organizationOa = b.id;
      this.getemplist();
    },
    // 保存分页选中
    selectService (selection) {
      this.curPageSelected = selection.map((item) => item.id);
      // otherPageIds其他页面选中项 为所有选中项减去当前页所有数据
      let otherPageIds = this._.without(this.formValidate.serviceIdList, ...this.curPageAllIds);
      // 最终选择项为
      this.formValidate.serviceIdList = this._.union(otherPageIds, this.curPageSelected);
      this.curPageSelectedName = selection.map((item) => item.personName);
      let otherPageName = this._.without(this.formValidate.serviceIdNameList, ...this.curPageAllNames);
      this.formValidate.serviceIdNameList = this._.union(otherPageName, this.curPageSelectedName);
    },
    // 根据id选中
    selectFromId (showList, selectList) {
      let that = this;
      if (selectList) {
        for (const i in showList) {
          if (selectList.includes(showList[i].id)) {
            showList[i]._checked = true;
            // this.$set(this.showList[i], '_checked', true);
          } else {
            showList[i]._checked = false;
            // this.$set(this.showList[i], '_checked', false);
          }
        }
      }
      return showList;
    }
  }
};
</script>
