<template>
  <div>
    <Card class="warp-card" dis-hover>
      <Tabs :animated="false">
        <firstTable />
        <secondTable />
        <thirdFrom />
      </Tabs>
    </Card>
  </div>
</template>

<script>
import firstTable from "./components/firstTable";
import secondTable from "./components/secondTable";
import thirdFrom from "./components/thirdFrom";

export default {
  name: "myAttendance",
  components: {
    firstTable,
    secondTable,
    thirdFrom,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>