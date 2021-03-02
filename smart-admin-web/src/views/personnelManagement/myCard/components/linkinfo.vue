<template>
  <div>
    <TabPane :label="$t('lianxixinxi')" name="name4">
      <Form
        :model="showformBase"
        label-position="left"
        :label-width="100"
        inline
        style="padding: 24px"
      >
        <FormItem :label="$t('shoujihaoma')" style="width: 48%">
          <span>{{ showformBase.phone }}</span>
        </FormItem>
        <FormItem :label="$t('youxiang')" style="width: 48%">
          <span>{{ showformBase.email }}</span>
        </FormItem>
        <FormItem :label="$t('bangongdidian')" style="width: 48%">
          <span>{{ showformBase.address }}</span>
        </FormItem>
        <!-- <FormItem :label="$t('bangongdianhua')" style="width: 48%">
          <span>0255555555</span>
        </FormItem>
        <FormItem :label="$t('jinjilianxiren')" style="width: 48%">
          <span>沈中平</span>
        </FormItem>
        <FormItem :label="$t('lianxirendianhua')" style="width: 48%">
          <span>13000000000</span>
        </FormItem> -->
      </Form>
    </TabPane>
  </div>
</template>
<script>
import { empCard } from '@/api/empCard';
export default {
  name: 'linkinfo_tab',
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
        employeeId: this.$store.state.user.userLoginInfo.userId
        // employeeId: 75568
      };
      empCard.getContract(data).then(res => {
        this.showformBase = Object.assign({}, res.data);
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
