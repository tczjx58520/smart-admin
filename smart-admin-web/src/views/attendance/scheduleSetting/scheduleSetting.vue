<template>
    <div class="maincontent">
<div class="leftTree">
     <div class="leftTitle">组织架构图</div>
            <organizationTree @chooseTreeData="getTreeData"/>
        </div>
    <div class="rightRecord">
        <div class="rightTop">
                <Button @click="refresh" icon="md-refresh" type="default" style="margin-right:15px;">{{ $t('Reflash') }}</Button>
               <div class="rightTopItem">
                   <span class="rightTopItemTitle">{{$t('kqgl.yhm')}}</span>
                   <span>
                        <Input :placeholder="$t('kqgl.yhm')" type="text" v-model="searchform.employeename"/>
                   </span>
               </div>
                <div class="rightTopItem">
                   <span class="rightTopItemTitle">操作人</span>
                   <span>
                        <Input placeholder="请输入用户名" type="text" v-model="searchform.employeename"/>
                   </span>
               </div>
                <div class="rightTopItem">
                   <span class="rightTopItemTitle">{{$t('kqgl.xzpbrq')}}</span>
                   <span>
                        <Input :placeholder="$t('kqgl.xzpbrq')" type="text" v-model="searchform.employeename"/>
                   </span>
               </div>
        </div>
            <Card class="warp-card" dis-hover>
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
                    show-elevator
                  ></Tables>
            </Card>
        </div>
        </div>
    </div>
</template>

<script>
import organizationTree from '@/components/organizationTree'
import Tables from '@/components/tables';
import { attendance } from '@/api/attendance'

export default {
    name: 'scheduleSetting',
    components: {
        organizationTree,
        Tables
    },
    data() {
        return {
      searchform: {
        pageNum: 1,
        pageSize: 10,
        organizationId: this.$store.state.user.userLoginInfo.organizationOa
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
        }
      ],
      // table数据
      data: [],
      visiable: false,
        }
    },
    mounted() {
      this.getListData()
    },
    methods: {
    async getListData() {
        try {
        this.loading = true;
        let result = await attendance.findScheduling(this.searchform);
        this.loading = false;
        console.log(result)
        this.firstData = result.data.list;
        this.fistTotal = result.data.totalCount;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.loading = false;
      }
      },
      getTreeData(val) {
        console.log(val)
      },
        myselected (selection) {
      this.moreemp = selection;
      console.log('this.moreemp===========>', this.moreemp);
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
    }
}
</script>

<style lang="less" scoped>
.maincontent {
    display: flex;
}
.leftTree {
    width: 20%;
}

.leftTitle {
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    font-size: 15px;
    padding-left: 20px;
}
.rightRecord {
    width: 80%;
}
.rightTop { 
    background: #ffffff;
    padding: 10px 0;
    display: flex;
    
}

.rightTopItem{
    display: flex;
    align-items: center;
    font-size: 12px;
    padding-left: 25px;
}

.rightTopItemTitle {
    padding-right: 10px;
}
</style>