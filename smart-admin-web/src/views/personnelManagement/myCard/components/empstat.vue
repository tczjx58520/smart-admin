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
          <span>2020-12-19 02:13:00</span>
        </FormItem>
        <FormItem :label="$t('yonggongnianxian')" style="width: 48%">
          <span>20</span>
        </FormItem>
        <FormItem :label="$t('zhuangzhengriqi')" style="width: 48%">
          <span>2020-12-19 02:13:00</span>
        </FormItem>
        <FormItem :label="$t('shiyongqixian')" style="width: 48%">
          <span>2020-9-19 02:13:00 - 2020-12-19 02:13:00</span>
        </FormItem>
        <FormItem :label="$t('gongnian')" style="width: 48%">
          <span>12</span>
        </FormItem>
      </Form>
    </TabPane>
  </div>
</template>
<script>
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
  mounted () {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
