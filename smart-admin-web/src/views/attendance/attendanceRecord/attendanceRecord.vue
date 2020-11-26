<template>
    <div class="maincontent">
        <div class="leftTree">
            <organizationTree />
        </div>
        <div class="rightRecord">
            <recordCalendar/>
        </div>
    </div>
</template>

<script>
import organizationTree from '@/components/organizationTree'

import recordCalendar from '@/components/recordCalendar'
export default {
    name: 'attendanceRecord',
    components: {
        organizationTree,
        recordCalendar
    },
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
.maincontent {
    display: flex;
    // align-items: center;
    // justify-content: center;
}
.leftTree {
    width: 20%;
}
.rightRecord {
    width: 80%;
}
</style>