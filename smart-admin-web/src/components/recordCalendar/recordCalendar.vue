<template>
    <div class="calendarMain">
        <div class="search_parms">
            <div class="rightTop">
                <Button icon="md-refresh" type="default" style="margin-right:15px;">{{ $t('Reflash') }}</Button>
               </div>
               <div class="rightTopItem">
                   <span class="rightTopItemTitle">{{$t('kqgl.yhm')}}</span>
                   <span>
                        <Input :placeholder="$t('kqgl.yhm')" type="text" v-model="empName" @on-focus="getemp" clearable @on-clear="clearEmp"/>
                        <selectEmp :modalstat.sync="empstat" @selectData="selectData"/>
                   </span>
               </div>
                <div class="rightTopItem">
                   <span class="rightTopItemTitle">{{$t('kqgl.xuanzepaibanyuefen')}}</span>
                   <span>
                    <DatePicker type="month" placeholder="Select month" style="width: 200px" @on-change="getMonth"/>

                   </span>
               </div>
               <div class="rightTopItem">
                   <Button type="primary" @click.native="handleSearch">{{$t('Search')}}</Button>
               </div>
        </div>
        <div class="calenderTop">
        <div class="topLeft">
            <div class="leftItem">
                {{$t('kqgl.qx')}}: {{topData.realDays}}
            </div>
            <div class="leftItem">
                {{$t('kqgl.zd')}}: {{topData.lateDays}}
            </div>
            <div class="leftItem">
                {{$t('kqgl.zt')}}: {{topData.earlyDays}}
            </div>
            <div class="leftItem">
                {{$t('kqgl.sbwdj')}}: {{topData.noPunchForWorkDays}}
            </div>
            <div class="leftItem">
                {{$t('kqgl.xbwdj')}}: {{topData.noPunchForLeaveWorkDays}}
            </div>
            <div class="leftItem">
                {{$t('kqgl.zcq')}}: {{topData.allDays}}
            </div>
        </div>
        <div class="topRight">
            <!-- <div class="icon_item">
                <div class="icon_content"></div>
                <div class="icon_title">全部</div>
            </div> -->
            <div class="icon_item">
                <div class="icon_content2"></div>
                <div class="icon_title">正常</div>
            </div>
            <div class="icon_item">
                <div class="icon_content3"></div>
                <div class="icon_title">迟到</div>
            </div>
            <div class="icon_item">
                <div class="icon_content4"></div>
                <div class="icon_title">早退</div>
            </div>
            <div class="icon_item">
                <div class="icon_content5"></div>
                <div class="icon_title">旷工</div>
            </div>
            <div class="icon_item">
                <div class="icon_content6"></div>
                <div class="icon_title">漏签</div>
            </div>
            <div class="icon_item">
                <div class="icon_content7"></div>
                <div class="icon_title">请假</div>
            </div>
            <div class="icon_item">
                <div class="icon_content8"></div>
                <div class="icon_title">出差</div>
            </div>
            <div class="icon_item">
                <div class="icon_content9"></div>
                <div class="icon_title">外勤</div>
            </div>
            <div class="icon_item">
                <div class="icon_content10"></div>
                <div class="icon_title">加班</div>
            </div>
        </div>
        </div>
        <div class="calendercontent">
        <div class="calenderWeek">
            <div class="weekItem">{{$t('kqgl.zr')}}</div>
            <div class="weekItem">{{$t('kqgl.zy')}}</div>
            <div class="weekItem">{{$t('kqgl.ze')}}</div>
            <div class="weekItem">{{$t('kqgl.zs')}}</div>
            <div class="weekItem">{{$t('kqgl.zsi')}}</div>
            <div class="weekItem">{{$t('kqgl.zwu')}}</div>
            <div class="weekItem">{{$t('kqgl.zl')}}</div>
        </div>
        <div class="calenderDate">
            <div  class="dateItem" v-for="(item, index) in forData" :key="index">
                <div class="item_top"> 
                    <div class="top_icon_null" v-if="item.punchStatus === null"></div>
                    <div class="top_icon" v-if="item.punchStatus === 0"></div>
                    <div class="top_icon2" v-if="item.punchStatus === 2"></div>
                    <div class="top_icon3" v-if="item.punchStatus === 3"></div>
                    <div class="top_date" v-if="item.stat === 0">{{(item.punchDate).substring(7, 9)}}</div>
                    <div class="top_date" v-else>{{(item.punchDate).substring(8, 10)}}</div>
                </div>
                <div class="item_nail"> 
                    <div class="begintime" v-if="item.firstStartTime">签到时间： {{item.firstStartTime}}</div>
                    <div class="endtime" v-if="item.secondEndTime">签退时间： {{item.secondEndTime}}</div>
                </div>

            </div>

        </div>
        </div>
    </div>
</template>

<script>
import selectEmp from '@/components/selectEmp'
export default {
    name: 'recordCalendar',
    components: {
        selectEmp
    },
    props: {
        calendarData: {
            type: Array,
            default() {
                return []
            }
        },
        otherData: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            empName: '',
            empstat: false,
            getPropDate: {
                nowDate: null
            },
            forData: this.calendarData,
            topData: this.otherData
        }
    },
    watch: {
        calendarData(){
            console.log('this.calendarData', this.calendarData)
            let year = this.calendarData[0].punchDate.substring(0, 4)
            let lastMonth = this.calendarData[0].punchDate.substring(5, 7) - 1
            let firstWeek = new Date(this.calendarData[0].punchDate).getDay()

            var lastDay = new Date(year, lastMonth, 0).getDate();
            console.log('firstWeek', firstWeek)
            console.log('lastMonth', lastMonth)
            console.log('lastDay', lastDay)
            let arr = []
            for(let i = 0; i < firstWeek; i ++) {
                let obj = {
                    punchDate: year + '-' +  lastMonth + '-' + (lastDay - i),
                    stat: 0,
                    punchStatus: null
                }
               arr.unshift(obj)
            }
            console.log('this.calendarData', this.calendarData)
            this.forData =JSON.parse(JSON.stringify(this.calendarData )) 
            for (let i in arr) {
                this.forData.unshift(arr[i])
            }
            console.log('arr', arr)
        },
        otherData() {
            this.topData = this.otherData
        }
    },
    methods: {
        clearEmp() {

        this.empName = ''
            let obj = {
                id: ''
            }
            this.$emit('empIdData', obj)
        },
        handleSearch() {
            this.$emit('searh', true)
        },
        selectData(val) {
            this.$emit('empIdData', val)
            this.empName = val.personName
        },
        getemp() {
            this.empstat = true
        },
        getMonth(val) {
            console.log('val', val)
            this.$emit('monthData', val)
        },
        getWeek() {
            // console.log('nowDate', nowDate)
            let now = new Date()
            console.log(now.getDay())

        }
    }
}
</script>

<style lang="less" scoped>
.calenderTop {
     display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    padding: 10px 0;
        height: 60px;
            width: 98%;
}
.topLeft{
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.calendercontent{
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
}
.calenderWeek {
    width: 100%;
    display: flex;
}
.weekItem {
    border-right: 1px solid #f0f0f0;
    width: 14%;
    height: 45px;
    text-align: center;
    line-height: 45px;
    background: #f5f5f5;
}

.weekItem:nth-of-type(7n+7) {
    border-right: none;
}

.calenderDate {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

}

.dateItem {
    border-right: 1px solid #f0f0f0;
    width: 14%;
    height: 186px;
    // text-align: right;
    // padding-right: 30px;
    // line-height: 50px;
    background: #ffffff;
    border-bottom: 1px solid #f0f0f0;
    line-height: 40px;
}

.dateItem:nth-of-type(7n+7) {
    border-right: none;
}

.top_icon {
    width: 20px;
    height: 20px;
    background: url('../../assets/images/nomal.png');
    background-size: 100%;
    background-repeat: no-repeat;
}

.top_icon_null {
    width: 20px;
    height: 20px;
}

.top_icon2 {
    width: 20px;
    height: 20px;
    background: url('../../assets/images/later.png');
    background-size: 100%;
    background-repeat: no-repeat;
}

.top_icon3 {
    width: 20px;
    height: 20px;
    background: url('../../assets/images/early.png');
    background-size: 100%;
    background-repeat: no-repeat;
}

.item_top{
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
}

.item_nail {
        padding-left: 40px;
}



.topRight {
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.icon_content{
   width: 20px;
    height: 20px;
    margin: 0 auto;
    background: url('../../assets/images/all.png');
    background-size: 100%;
    background-repeat: no-repeat;
}

.icon_content2{
   width: 20px;
    height: 20px;
    margin: 0 auto;
    background: url('../../assets/images/nomal.png');
    background-size: 100%;
    background-repeat: no-repeat;
}


.icon_content3{
   width: 20px;
    height: 20px;
    margin: 0 auto;
    background: url('../../assets/images/later.png');
    background-size: 100%;
    background-repeat: no-repeat;
}

.icon_content4{
   width: 20px;
    height: 20px;
    margin: 0 auto;
    background: url('../../assets/images/early.png');
    background-size: 100%;
    background-repeat: no-repeat;
}

.icon_content5{
    width: 20px;
    height: 20px;
    margin: 0 auto;
    background: url('../../assets/images/kuang.png');
    background-size: 100%;
    background-repeat: no-repeat;
}

.icon_content6{
   width: 20px;
    height: 20px;
    margin: 0 auto;
    background: url('../../assets/images/louqian.png');
    background-size: 100%;
    background-repeat: no-repeat;
}

.icon_content7{
    width: 20px;
    height: 20px;
    margin: 0 auto;
    background: url('../../assets/images/qingjai.png');
    background-size: 100%;
    background-repeat: no-repeat;
}

.icon_content8{
    width: 20px;
    height: 20px;
    margin: 0 auto;
    background: url('../../assets/images/chucai.png');
    background-size: 100%;
    background-repeat: no-repeat;
}

.icon_content9{
    width: 20px;
    height: 20px;
    margin: 0 auto;
    background: url('../../assets/images/waiqin.png');
    background-size: 100%;
    background-repeat: no-repeat;
}

.icon_content10{
  width: 20px;
    height: 20px;
    margin: 0 auto;
    background: url('../../assets/images/jiaban.png');
    background-size: 100%;
    background-repeat: no-repeat;
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

.search_parms {
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #e1e1e1;
}


</style>