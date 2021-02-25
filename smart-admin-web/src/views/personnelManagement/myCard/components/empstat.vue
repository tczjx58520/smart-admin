<template>
  <div>
    <TabPane :label="$t('ygzt')" name="name3">
      <Form
        :model="showformBase"
        label-position="left"
        :label-width="100"
        inline
        style="padding: 24px"
      >
        <FormItem :label="$t('gongzuoxingzhi')" style="width: 48%">
          <span>技术开发</span>
        </FormItem>
        <FormItem :label="$t('ruzhiriqi')" style="width: 48%">
          <span>{{ showformBase.onDate }}</span>
        </FormItem>
        <!-- <FormItem :label="$t('yonggongnianxian')" style="width: 48%">
          <span>20</span>
        </FormItem> -->
        <FormItem :label="$t('zhuangzhengriqi')" style="width: 48%">
          <span>{{ showformBase.conversionDate }}</span>
        </FormItem>
        <FormItem :label="$t('shiyongqixian')" style="width: 48%">
          <span>{{ showformBase.probation }}</span>
        </FormItem>
        <FormItem :label="$t('gongnian')" style="width: 48%">
          <span>{{ showformBase.workYear }}</span>
        </FormItem>
      </Form>
    </TabPane>
  </div>
</template>
<script>
import { empCard } from '@/api/empCard';
export default {
  name: 'userInfo_tab',
  components: {},
  props: {},
  data () {
    return {
      showformBase: {}
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.getInfo();
  },
  methods: {
    getInfo () {
      const data = {
        empId: this.$store.state.user.userLoginInfo.userId
        // empId: 75568
      };
      empCard.getEmpStat(data).then(res => {
        console.log('res=============', res.data.content[0]);
        this.showformBase = Object.assign({}, res.data.content[0]);
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
