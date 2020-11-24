<template>
    <div>
 <Card class="warp-card" dis-hover>
    <Tabs :animated="false">
<fiveTable/>
<firstTable />
<secondTable/>
<thirdTable/>
<fourTable/>
    </Tabs>
    </Card>
    </div>
</template>

<script>
import firstTable from './components/firstTable'
import secondTable from './components/secondTable'
import thirdTable from './components/thirdTable'
import fourTable from './components/fourTable'
import fiveTable from './components/fiveTable'

export default {
    name: 'attendanceStatistical',
    components: {
        firstTable,
        secondTable,
        thirdTable,
        fourTable,
        fiveTable
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