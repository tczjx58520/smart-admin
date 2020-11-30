<template>
    <div>
 <Card class="warp-card" dis-hover>
    <Tabs :animated="false">

<firstTable />
<secondTable/>
<thirdTable/>
<fourFrom/>
    </Tabs>
    </Card>
    </div>
</template>

<script>
import firstTable from './components/firstTable';
import secondTable from './components/secondTable';
import thirdTable from './components/thirdTable';
import fourFrom from './components/fourFrom';

export default {
  name: 'attendanceSetting',
  components: {
    firstTable,
    secondTable,
    thirdTable,
    fourFrom
  },
  data () {
    return {

    };
  },
  mounted () {
  },
  methods: {

  }
};
</script>
