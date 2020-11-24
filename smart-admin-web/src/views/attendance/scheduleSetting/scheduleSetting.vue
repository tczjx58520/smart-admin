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
                    :pageShow="false"
                    :total="pageTotal"
                    :value="data"
                    @on-change="changePage"
                    @on-selection-change="myselected"
                    show-elevator
                    border
                    @on-save-selectData='editData'
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
          selectData: [],
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
      this.getSelectData()
    },
    methods: {
     editData(val){
        console.log(val)
        let needarr = val.column.key.split('-')
        const parms = {
            employeeId: val.row.employeeId,
            shiftId: val.value,
            year: needarr[0],
            month: needarr[1],
            day: needarr[2]
        }
        let parmsarr = []
        parmsarr.push(parms)
       attendance.modifyScheduling(parmsarr).then(res => {
         console.log(res)
         if(res.ret === 200) {
           this.$Message.success(res.msg);
         }
         this.getListData()
       })
      },
   async getSelectData() {
        const parms = {
            pageNum: 1,
            pageSize: 99999999
        }
        try {
        let result = await attendance.findAllShiftInfo(parms);
        this.selectData = result.data.list;
        console.log(this.selectData)
      } catch (e) {
        console.error(e);
      }
      },
      uniqueArray(array, key) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
      switchData(arr) {
        if(arr.length === 0) {
          return []
        }
        let newarr = []
        let newarr2 = []
        let obj = {}
        let newObj = {}
        for(let i in arr) {
          for (let j in arr[i].dateKey){
            const needObj = arr[i].dateKey[j] + '/' + arr[i].employeeId + '/' + arr[i].createPersonName
            const key = arr[i].dateKey[j].substring(0, 9)
            const data1 = arr[i].dateKey[j].substring(10, 14)

            obj[key] = data1
            newarr.push(needObj)
          }
        }
            console.log(newarr)
            let testarr = newarr.map(item => {
              return {item}
            })

            for(let i in testarr) {
              const arrz = testarr[i].item.split('/')
              testarr[i][testarr[i].item.substring(0, 10)] = arrz[2]
              testarr[i]['createPersonName'] = arrz[5]
              testarr[i]['employeeId'] = arrz[4]
              // testarr[i]['shiftId'] = arrz[3]
              delete testarr[i].item
            }
            for (let i = 0, l = testarr.length; i < l - 1; i++) {
            for (let j = i + 1; j < l; j++) {
              if (testarr[i].employeeId === testarr[j].employeeId) {
                testarr[i] = Object.assign(testarr[i], testarr[j])
              }
            }
          }
            let newarr3 =this.uniqueArray(testarr, 'createPersonName')
          // console.log(newarr3)
            
    return newarr3
      },
      getMonthDays() {
          let curDate = new Date();
        /* 获取当前月份 */
          let curMonth = curDate.getMonth();
        /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
        curDate.setMonth(curMonth + 1);
        /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
        curDate.setDate(0);
        /* 返回当月的天数 */
        return curDate.getDate();
      },

    async setColumns() {
        const parms = {
            pageNum: 1,
            pageSize: 99999999
        }
        let result = await attendance.findAllShiftInfo(parms);
        this.selectData = result.data.list;
        console.log(this.selectData)
        let curDate = new Date();
        let year = curDate.getFullYear()
        let month = curDate.getMonth() + 1
        let countDays = this.getMonthDays()
        let columnsArr = []
        let columsTitle = ''
        let weekday = ''
        for (let i = 1; i <= countDays; i++) {
          if(i < 10) {
           columsTitle = year + '-' +  month + '-' + '0' + i
          } else {
           columsTitle = year + '-' +  month + '-' + i
          }

          var d=new Date(columsTitle);
	var week=d.getDay();//获取星期
	switch (week){
		case 0:
			weekday = '星期日';  break;
		case 1:
      	weekday = '星期一';  break;
		case 2:
      	weekday = '星期二';  break;
		case 3:
      	weekday = '星期三';  break;
		case 4:
      	weekday = '星期四';  break;
		case 5:
      	weekday = '星期五';  break;
		case 6:
      	weekday = '星期六';  break;
  }
          columnsArr.push({title: columsTitle + weekday, key: columsTitle, align: 'center', width: '200', editType: 'select', editable: 'true', selectData: this.selectData})
        }
        console.log('columnsArr', columnsArr)
        columnsArr.unshift({title: '用户名', key: 'createPersonName', align: 'center', width: '100', })
        this.columns = columnsArr
      },
    async getListData() {
        try {
          // this.columns = this.setColumns()
          this.setColumns()
        this.loading = true;
        let result = await attendance.findScheduling(this.searchform);
        this.loading = false;
        console.log(result)
        this.data = this.switchData(result.data);
        console.log(this.data)
      
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