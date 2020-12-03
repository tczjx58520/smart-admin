<template>
    <div class="maincontent">
<div class="leftTree">
     <div class="leftTitle">组织架构图</div>
            <organizationTree @chooseTreeData="getTreeData" />
        </div>
    <div class="rightRecord">
        <div class="rightTop">
                <Button @click="refresh" icon="md-refresh" type="default" style="margin-right:15px;">{{ $t('Reflash') }}</Button>
               <div class="rightTopItem">
                   <span class="rightTopItemTitle">{{$t('kqgl.yhm')}}</span>
                   <span>
                        <Input :placeholder="$t('kqgl.yhm')" type="text" v-model="searchform.createPersonName"/>
                   </span>
               </div>
                <div class="rightTopItem">
                   <span class="rightTopItemTitle">{{$t('kqgl.xuanzexiugaidebanc')}}</span>
                   <span>
                        <Select :value ="model1" @on-select="handleSelectShift" style="width: 200px">
                            <Option v-for="item in selectData" :value="item.id" :key="item.id">{{ item.shiftName }}</Option>
                        </Select>
                   </span>
               </div>
                <div class="rightTopItem">
                   <span class="rightTopItemTitle">{{$t('kqgl.xzpbrq')}}</span>
                   <span>
                    <DatePicker type="month" :value="month" placeholder="Select month" style="width: 200px" @on-change="getMonth"/>

                   </span>
               </div>
               <div class="rightTopItem">
                   <Button type="primary" @click.native="getListData">{{$t('Search')}}</Button>
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
                    border
                    @on-save-selectData='editData'
                    @on-cell-click="onCellClick"
                  ></Tables>
            </Card>
        </div>
        </div>
    </div>
</template>

<script>
import organizationTree from '@/components/organizationTree';
import Tables from '@/components/tables';
import { attendance } from '@/api/attendance';

export default {
  name: 'scheduleSetting',
  components: {
    organizationTree,
    Tables
  },
  data () {
    return {
      nowMonth: '',
      model1: {},
      month: '',
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
          key: 'rolesOaName ',
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
      moreEditData: []
    };
  },
  mounted () {
    this.getNowMonth();
    this.getListData();
    this.getSelectData();
  },
  methods: {
    getNowMonth () {
      let curDate = new Date();
      this.searchform.month = curDate.getMonth() + 1;
      this.nowMonth = this.searchform.month;
    },
    getMonth (val) {
      this.searchform.month = val.substring(5, 7);
    },
    handleSelectShift (val) {
      console.log('va', val);
      // if(this.moreEditData.length === 0) {
      //   this.$Message.error(this.$t('kqgl.qingxianxuanzhedanyuanshuju'))
      //   this.model1 = ''
      // }
      console.log('this.moreEditData', this.moreEditData);
      // const parmsarr = this.moreEditData.map(item => {
      //   return  {
      //     employeeId: item.substring(19, 20),
      //      shiftId: val,
      //       year: item.substring(0, 4),
      //       month: item.substring(5, 7),
      //       day: item.substring(8, 10)
      //   }
      // })

      let parmsarr = [];
      for (let i in this.moreEditData) {
        let newobj = {};
        let newarr = this.moreEditData[i].split('/');
        newobj.employeeId = newarr[3];
        newobj.shiftId = val.value;
        newobj.year = newarr[0].substring(0, 4);
        newobj.month = newarr[0].substring(5, 7);
        newobj.day = newarr[0].substring(8, 10);
        parmsarr.push(newobj);
      }
      console.log('parmsarr', parmsarr);
      attendance.modifyScheduling(parmsarr).then((res) => {
        console.log(res);
        if (res.ret === 200) {
          this.$Message.success(res.msg);
        }
        this.getListData();
      });
    },
    onCellClick (row, column, data, evnet, params) {
      let index = row._index;
      let judgeClickStat = Object.keys(this.data[index].cellClassName).includes(
        column.key
      );
      if (judgeClickStat && column.key !== 'createPersonName') {
        this.$set(this.data[index].cellClassName, column.key, '');
        delete this.data[index].cellClassName[column.key];
        for (let i in this.moreEditData) {
          if (this.moreEditData[i].substring(0, 10) === column.key) {
            this.moreEditData.splice(i, 1);
          }
        }
        // console.log('this.moreEditData', this.moreEditData)
      } else if (!judgeClickStat && column.key !== 'createPersonName') {
        this.$set(this.data[index].cellClassName, column.key, 'shawnselect');
        let shiftDatas =
          column.key +
          '/' +
          this.data[index][column.key + '/'] +
          '/' +
          row.employeeId;
        this.moreEditData.push(shiftDatas);
      }
      // console.log("this.moreEditData", this.moreEditData);
      // console.log("judgeClickStat", judgeClickStat);
      // console.log("row", row);
      // console.log("column", column);
      // console.log("data", data);
      // console.log("evnet", evnet);
      // console.log("params", params);

      // console.log("index", index);
      // console.log("column.key", column.key);
      // // this.data[index].cellClassName[column.key] = 'shawnselect'

      // console.log("this.data", this.data);
    },
    editData (val) {
      console.log(val);
      let needarr = val.column.key.split('-');
      const parms = {
        employeeId: val.row.employeeId,
        shiftId: val.value,
        year: needarr[0],
        month: needarr[1],
        day: needarr[2]
      };
      let parmsarr = [];
      parmsarr.push(parms);
      attendance.modifyScheduling(parmsarr).then((res) => {
        console.log(res);
        if (res.ret === 200) {
          this.$Message.success(res.msg);
        }
        this.getListData();
      });
    },
    async getSelectData () {
      const parms = {
        pageNum: 1,
        pageSize: 99999999
      };
      try {
        let result = await attendance.findAllShiftInfo(parms);
        this.selectData = result.data.list;
        console.log(this.selectData);
      } catch (e) {
        console.error(e);
      }
    },
    uniqueArray (array, key) {
      let result = [array[0]];
      for (let i = 1; i < array.length; i++) {
        let item = array[i];
        let repeat = false;
        for (let j = 0; j < result.length; j++) {
          if (item[key] === result[j][key]) {
            repeat = true;
            break;
          }
        }
        if (!repeat) {
          result.push(item);
        }
      }
      return result;
    },
    switchData (arr) {
      if (arr.length === 0) {
        return [];
      }
      let newarr = [];
      let newarr2 = [];
      let obj = {};
      let newObj = {};
      for (let i in arr) {
        for (let j in arr[i].dateKey) {
          if (arr[i].dateKey[j]) {
            const needObj =
              arr[i].dateKey[j] +
              '/' +
              arr[i].employeeId +
              '/' +
              arr[i].createPersonName;
            const key = arr[i].dateKey[j].substring(0, 9);
            const data1 = arr[i].dateKey[j].substring(10, 14);

            obj[key] = data1;
            newarr.push(needObj);
          }
        }
      }
      // console.log(newarr);
      let testarr = newarr.map((item) => {
        return { item };
      });

      for (let i in testarr) {
        const arrz = testarr[i].item.split('/');
        // console.log('testarr', testarr[i].item)
        testarr[i][testarr[i].item.substring(0, 10)] = arrz[2];
        testarr[i][testarr[i].item.substring(0, 11)] = arrz[2] + '/' + arrz[3];
        testarr[i]['createPersonName'] = arrz[5];
        testarr[i]['employeeId'] = arrz[4];
        testarr[i]['cellClassName'] = new Object();
        delete testarr[i].item;
      }
      for (let i = 0, l = testarr.length; i < l - 1; i++) {
        for (let j = i + 1; j < l; j++) {
          if (testarr[i].employeeId === testarr[j].employeeId) {
            testarr[i] = Object.assign(testarr[i], testarr[j]);
          }
        }
      }
      let newarr3 = this.uniqueArray(testarr, 'createPersonName');
      // console.log(newarr3)

      return newarr3;
    },
    getMonthDays () {
      let curDate = new Date();
      /* 获取当前月份 */
      let curMonth = this.searchform.month;
      let curYear = curDate.getFullYear();
      // this.searchform.month = curMonth + 1;
      // this.month =curYear + '-' + this.searchform.month
      /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
      curDate.setMonth(Number(curMonth));
      /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
      curDate.setDate(0);
      let lastDay = new Date(curYear, curMonth, 0).getDate();
      // console.log('curYear', curYear)
      // console.log('curMonth', curMonth)

      // console.log('lastDay', lastDay)

      /* 返回当月的天数 */
      return curDate.getDate();
    },

    async setColumns () {
      const parms = {
        pageNum: 1,
        pageSize: 99999999
      };
      let result = await attendance.findAllShiftInfo(parms);
      this.selectData = result.data.list;
      console.log(this.selectData);
      let curDate = new Date();
      let year = curDate.getFullYear();
      let month = this.searchform.month;
      let countDays = this.getMonthDays();
      console.log('countDays', countDays);
      let columnsArr = [];
      let columsTitle = '';
      let weekday = '';
      for (let i = 1; i <= countDays; i++) {
        if (i < 10) {
          columsTitle = year + '-' + month + '-' + '0' + i;
        } else {
          columsTitle = year + '-' + month + '-' + i;
        }

        let d = new Date(columsTitle);
        let week = d.getDay(); // 获取星期
        switch (week) {
          case 0:
            weekday = '星期日';
            break;
          case 1:
            weekday = '星期一';
            break;
          case 2:
            weekday = '星期二';
            break;
          case 3:
            weekday = '星期三';
            break;
          case 4:
            weekday = '星期四';
            break;
          case 5:
            weekday = '星期五';
            break;
          case 6:
            weekday = '星期六';
            break;
        }
        columnsArr.push({
          title: columsTitle + weekday,
          key: columsTitle,
          align: 'center',
          width: '200',
          editType: 'select',
          editable: 'true',
          selectData: this.selectData
        });
      }
      console.log('columnsArr', columnsArr);
      columnsArr.unshift({
        title: '用户名',
        key: 'createPersonName',
        align: 'center',
        width: '100'
      });
      this.columns = columnsArr;
    },
    async getListData () {
      console.log('this.searchform', this.searchform);
      this.moreEditData = [];
      let date = new Date();
      if (this.searchform.month) {
        this.searchform.year = date.getFullYear();
      } else {
        delete this.searchform.year;
        delete this.searchform.month;
      }
      try {
        // this.columns = this.setColumns()
        this.setColumns();
        this.loading = true;
        let result = await attendance.findScheduling(this.searchform);
        this.loading = false;
        // console.log(result);
        this.data = this.switchData(result.data.data.list);
        this.pageTotal = result.data.data.total;
        // console.log(this.data);
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.loading = false;
      }
    },
    getTreeData (val) {
      console.log(val);
      this.searchform.organizationId = val.id;
      this.getListData();
    },
    myselected (selection) {
      this.moreemp = selection;
      console.log('this.moreemp===========>', this.moreemp);
    },
    // 分页
    changePage (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getListData();
    },
    // 分页
    changePageSize (pageSize) {
      this.searchform.pageNum = 1;
      this.searchform.pageSize = pageSize;
      this.getListData();
    },
    // 刷新
    refresh () {
      this.searchform.pageNum = 1;
      delete this.searchform.organizationOa;
      this.getListData();
    }
  }
};
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

.rightTopItem {
  display: flex;
  align-items: center;
  font-size: 12px;
  padding-left: 25px;
}

.rightTopItemTitle {
  padding-right: 10px;
}
</style>
