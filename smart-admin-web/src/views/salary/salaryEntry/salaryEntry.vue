<template>
  <div>
    <!-- <Card class="warp-card" dis-hover>
      <Form class="tools" inline>
        <FormItem>
          <Button
            @click="refresh"
            icon="md-refresh"
            type="primary"
            v-privilege="'task-refresh'"
          >刷新任务</Button>
        </FormItem>
        <FormItem>
          <Button @click="addModal=true" icon="md-add" type="primary" v-privilege="'task-add'">添加任务</Button>
        </FormItem>
      </Form>

    </Card> -->
    <!-- 添加任务 -->
    <div style="display:flex">
        <div style="width:20%;height: calc(80vh)">
            <Card class="warp-card" dis-hover>
                <Tree
                  :data="treedata"
                  style="height: calc(80vh);overflow-x: scroll"
                  @on-select-change="filterorg"
                ></Tree>
            </Card>
        </div>
        <div style="width:80%;height:calc(80vh)">
            <Card class="warp-card" dis-hover>
                <Row :gutter="16">
                    <Form :model="searchform" class="tools" inline ref="searchform" :label-width="65" label-position="left">
                      <Col span="5">
                      <FormItem prop="person" :label="$t('usermanage_view.userName')" style="width:100%">
                        <Input placeholder="请输入用户名" type="text" v-model="searchform.employeename" style="width:100%" />
                      </FormItem>
                      </Col>
                      <Col span="5">
                      <FormItem prop="person" :label="$t('usermanage_view.userName')" style="width:100%">
                        <Input placeholder="请输入用户名" type="text" v-model="searchform.employeename" style="width:100%" />
                      </FormItem>
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
                    <Button @click="created" v-privilege="['10-19-1']" icon="md-add" type="warning" style="margin-right:15px;">{{ $t('salaryEntry_view.newSalaryEntry') }}</Button>
                </div>
                  <Tables
                    :columns="columns"
                    :current="searchform.pageNum"
                    :loading="loading"
                    :page-size="searchform.pageSize"
                    :editable="true"
                    :pageShow="true"
                    :total="pageTotal"
                    :value="data"
                    @on-change="changePage"
                    @on-selection-change="myselected"
                    border
                    show-elevator
                  ></Tables>
                <!-- <Page :current="searchform.pageNum" :page-size="searchform.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
                :total="pageTotal" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator show-sizer
                show-total style="margin:24px 0;text-align:right;"></Page> -->
            </Card>
            <!-- 新建弹窗 -->
            <addGong :modalstat = "visiable" :editinfo="editinfo" @updateStat = "updateStat"></addGong>
            <!-- 新建结束============= -->
        </div>
    </div>
    <!-- 任务日志 -->
  </div>
</template>

<script>
import Tables from '@/components/tables';
import { salaryEntryApi } from '@/api/salaryentry';
import { organization } from '@/api/organization';
import addGong from './components/addmodalGong/modal';
import { usermanagelApi } from '@/api/usermanage';
export default {
  name: 'salaryEntry',
  components: {
    Tables,
    addGong
  },
  props: {},
  data () {
    return {
      editinfo: [],
      treedata: [],
      searchform: {
        employeename: '',
        account: '',
        roleId: '',
        stat: '',
        pageNum: 1,
        pageSize: 10,
        loginRepositoryId: this.$store.state.user.userLoginInfo.repositoryId
      },
      pageTotal: 0,
      // table是否loading
      loading: true,
      // table表头
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: this.$t('usermanage_view.userName'),
          key: 'personName',
          width: '100',
          fixed: 'left'
        },
        {
          title: this.$t('usermanage_view.account'),
          key: 'account',
          width: '100'
        },
        {
          title: this.$t('usermanage_view.role'),
          key: 'roleOaName ',
          width: '100'
        },
        {
          title: this.$t('usermanage_view.Organization'),
          key: 'organizationOaName'
        },
        {
          title: this.$t('usermanage_view.position'),
          key: 'postOaName'
        },
        {
          title: this.$t('salaryEntry_view.approvalStatus'),
          key: 'judgeStat',
          render: (h, params) => {
            if (params.row.judgeStat === 0) {
              return h('span', '未审核');
            } else if (params.row.judgeStat === 1) {
              return h('span', '审核成功');
            } else {
              return h('span', '审核失败');
            }
          }
        },
        {
          title: this.$t('salaryEntry_view.EntercurrentMonth'),
          key: 'isEnter',
          render: (h, params) => {
            if (params.row.isEnter === 0) {
              return h('span', this.$t('no'));
            } else {
              return h('span', this.$t('yes'));
            }
          }
        },
        {
          title: this.$t('usermanage_view.stat'),
          key: 'stat',
          width: '100',
          render: (h, params) => {
            if (params.row.stat === 1) {
              return h('span', this.$t('Open'));
            } else {
              return h('span', this.$t('Forbid'));
            }
          }
        }
      ],
      // table数据
      data: [],
      visiable: false,
      moreemp: []
    };
  },
  mounted () {
    this.getTaskList();
    this.getorganizationtreedata();
  },
  methods: {
    myselected (selection) {
      this.moreemp = selection;
      console.log('this.moreemp===========>', this.moreemp);
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
      console.log('b=================>', b);
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
      console.log('result', result);
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
      let myDate = new Date(); // 获取当前年份(2位)
      let year = myDate.getFullYear(); // 获取完整的年份(4位,1970-????)
      let month = myDate.getMonth(); // 获取当前月份(0-11,0代表1月)
      if (month + 1 < 10) {
        month = '0' + (month + 1);
      }
      let dayNow = year + '-' + month;
      this.searchform.yearAndMonth = dayNow;
      const result = await usermanagelApi.querySalaryList(this.searchform);
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
      this.getTaskList();
    }
  }
};
</script>

<style lang="less" scoped>
</style>
