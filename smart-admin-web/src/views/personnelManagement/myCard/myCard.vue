<template>
  <div>
    <Card class="warp-card" dis-hover>
      <div slot="title">
        <div class="wrap">
          <div class="left_img">
            <Icon type="md-body" size="50" />
          </div>
          <div class="right_info">
            <div>{{ name }}</div>
            <div>{{ userinfo }}</div>
          </div>
        </div>
      </div>
      <div
        slot="extra"
        @click.prevent="changeLimit"
        style="height:50px;line-height:50px;"
      >
        <Button type="info">{{ $t("bianji") }}</Button>
        <Icon type="md-list" />
      </div>
      <Tabs value="name1" :animated="false">
        <!-- <TabPane :label="$t('zaizhixinxi')" name="name1">标签一的内容</TabPane> -->
        <userInfo />
        <linkinfo />
        <empstat />
        <myexperson/>
        <workwelfare />
        <assetinformation />
        <schedule />
        <attendance-information />
        <training-information />
      </Tabs>
    </Card>
  </div>
</template>
<script>
import userInfo from './components/userInfo';
import linkinfo from './components/linkinfo';
import empstat from './components/empstat';
import myinfo from './components/myinfo';
import Myexperson from './components/myexperson.vue';
import Workwelfare from './components/workwelfare.vue';
import Assetinformation from './components/Assetinformation.vue';
import Schedule from './components/Schedule.vue';
import AttendanceInformation from './components/attendanceInformation.vue';
import TrainingInformation from './components/trainingInformation.vue';
export default {
  name: 'teamAward',
  components: {
    userInfo,
    linkinfo,
    empstat,
    myinfo,
    Myexperson,
    Workwelfare,
    Assetinformation,
    Schedule,
    AttendanceInformation,
    TrainingInformation
  },
  props: {},
  data () {
    return {};
  },
  computed: {
    name () {
      return this.$store.state.user.userLoginInfo.actualName;
    },
    userinfo () {
      const str = this.$store.state.user.userLoginInfo.organizationOaName;
      const str2 = this.$store.state.user.userLoginInfo.postOaName;
      return str + '/' + str2;
    }
  },
  watch: {},
  filters: {},
  created () {},
  mounted () {},
  methods: {}
};
</script>
<style lang="less" scoped>
/deep/.ivu-card-head {
  background: #ffffff;
}
.wrap {
  display: flex;
  height: 50px;
  .right_info {
    line-height: 25px;
  }
}
</style>
