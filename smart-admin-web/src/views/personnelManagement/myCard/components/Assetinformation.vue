<template>
  <div>
    <TabPane :label="$t('zchanap')" name="name7">
      <Form
        :model="showformBase"
        label-position="left"
        :label-width="100"
        inline
        style="padding: 24px"
      >
        <FormItem :label="$t('zichanbianhao')" style="width: 48%">
          <span>1835156789123</span>
        </FormItem>
        <FormItem :label="$t('mingchen')" style="width: 48%">
          <span>电脑</span>
        </FormItem>
        <FormItem :label="$t('guigexinghao')" style="width: 48%">
          <span>南京嗯哇</span>
        </FormItem>
        <FormItem :label="$t('zhuangtai')" style="width: 48%">
          <span>完好</span>
        </FormItem>
        <FormItem :label="$t('canzhilv')" style="width: 48%">
          <span>0.1</span>
        </FormItem>
      </Form>
    </TabPane>
  </div>
</template>
<script>
export default {
  name: 'Assetinformation_tab',
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
