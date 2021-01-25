<template>
        <Modal v-model="mymoadlStat" class="add" width="1020" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('usermanage_view.adduser') }}</span>
        </div>
        <div>
            <Card dis-hover>
                <div>
                  <Row :gutter="16">
                    <Form :model="searchform" class="tools" inline ref="searchform" :label-width="60" label-position="left">
                      <Col span="5">
                      <FormItem prop="person" :label="$t('usermanage_view.userName')" style="width:100%">
                        <Input placeholder="请输入用户名" type="text" v-model="searchform.employeename" style="width:100%" />
                      </FormItem>
                      </Col>
                      <Col span="5">
                      <FormItem prop="startDate" :label="$t('usermanage_view.account')" style="width:100%">
                        <Input placeholder="请输入登录帐号" type="text" v-model="searchform.account" style="width:100%" />
                      </FormItem>
                      </Col>
                      <Col span="5">
                      <FormItem prop="type" :label="$t('usermanage_view.stat')" style="width:100%;margin-right:15px;">
                        <Select v-model="searchform.stat" style="width:100%">
                          <Option v-for="item in statList" :value="item.value" v-bind:key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                      </Col>
                      <Col span="4">
                          <Button @click="search" icon="ios-search" type="primary">{{ $t('Search') }}</Button>
                          <!-- <Button @click="reset" icon="md-refresh" type="default">重置</Button> -->
                      </Col>
                    </Form>
                  </Row>
                  <Table border ref="selection" :columns="columns4" :data="emplist" max-height="400" :loading="emp_loading" highlight-row @on-row-click="selectmyemp"></Table>
                  <Page :current="searchform.pageNum" :page-size="searchform.pageSize" :page-size-opts="[10, 20, 30, 50, 100]"
                  :total="pageTotal" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator show-sizer
                  show-total style="margin:24px 0;text-align:right;"></Page>
                </div>
            </Card>

        </div>
        <div slot="footer">
            <ButtonGroup>
                <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
            </ButtonGroup>
        </div>
    </Modal>
</template>
<script>
import { usermanagelApi } from '@/api/usermanage';
import { organization } from '@/api/organization';
import { groupApi } from '@/api/group';
import { contract } from '@/api/contract';
import { utils } from '@/lib/util';
export default {
  name: 'addcontract',
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    groupId: null,
    memberId: {
      type: null,
      default: () => {
        return [];
      }
    }
  },
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
      mymoadlStat: this.modalstat,
      treedata: [],
      columns4: [
        {
          title: this.$t('lianxirenxingming'),
          key: 'name'
        },
        {
          title: this.$t('xingbie'),
          key: 'sex'
        },
        {
          title: this.$t('chushengriqi'),
          key: 'birthday',
          render: (h, params) => {
            let date = 'N/A';
            if (params.row.birthday) {
              const temp = new Date(params.row.birthday);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('span', date);
          }
        },
        {
          title: this.$t('dianhua'),
          key: 'telephone'
        },
        {
          title: this.$t('suoshufenlei'),
          key: 'classifyName'
        },
        {
          title: this.$t('zhiwei'),
          key: 'position'
        },
        {
          title: this.$t('jigoumingchen'),
          key: 'organizationName'
        }
      ],
      emplist: [],
      emp_loading: true,
      // 人员搜查id
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
      // 角色列表
      curPageSelected: [], // 存放当前页选中项
      formValidate: {},
      curPageSelectedName: [] // 存放当前页名字
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      this.getemplist();
    }
  },
  computed: {
  },
  methods: {
    selectmyemp (row) {
      console.log('row==========>', row);
      this.$emit('updateStat', false, row);
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    async getemplist () {
      try {
        this.emp_loading = true;
        let result = await contract.getstorage(this.searchform);
        this.emp_loading = false;
        this.emplist = result.data.list;
        this.pageTotal = result.data.total;
      } catch (e) {
        console.error(e);
        this.emp_loading = false;
      }
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
</style>
