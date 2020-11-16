<template>
    <div class="calendarMain">
        <div class="calenderTop">
        <div class="topLeft">
            <div class="leftItem">
                {{$t('kqgl.qx')}}:
            </div>
            <div class="leftItem">
                {{$t('kqgl.zd')}}:
            </div>
            <div class="leftItem">
                {{$t('kqgl.zt')}}:
            </div>
            <div class="leftItem">
                {{$t('kqgl.sbwdj')}}:
            </div>
            <div class="leftItem">
                {{$t('kqgl.xbwdj')}}:
            </div>
            <div class="leftItem" @click="getWeek()">
                {{$t('kqgl.zcq')}}:
            </div>
        </div>
        <div class="topRight"></div>
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
            <div class="dateItem">1</div>
            <div class="dateItem">1</div>
            <div class="dateItem">1</div>
            <div class="dateItem">1</div>
            <div class="dateItem">1</div>
            <div class="dateItem">1</div>
            <div class="dateItem">1</div>
            <div class="dateItem">1</div>
            <div class="dateItem">1</div>
            <div class="dateItem">1</div>
            <div class="dateItem">1</div>
            <div class="dateItem">1</div>

        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'recordCalendar',
    data() {
        return {
            getPropDate: {
                nowDate: null
            }
        }
    },
    methods: {
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
}
.topLeft{
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
    text-align: right;
    padding-right: 30px;
    line-height: 50px;
    background: #ffffff;
    border-bottom: 1px solid #f0f0f0;
}

.dateItem:nth-of-type(7n+7) {
    border-right: none;
}


</style>