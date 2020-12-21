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
          <span>1835156789</span>
        </FormItem>
        <FormItem :label="$t('youxiang')" style="width: 48%">
          <span>8373@qq.com</span>
        </FormItem>
        <FormItem :label="$t('bangongdidian')" style="width: 48%">
          <span>南京嗯哇</span>
        </FormItem>
        <FormItem :label="$t('bangongdianhua')" style="width: 48%">
          <span>0255555555</span>
        </FormItem>
        <FormItem :label="$t('jinjilianxiren')" style="width: 48%">
          <span>沈中平</span>
        </FormItem>
        <FormItem :label="$t('lianxirendianhua')" style="width: 48%">
          <span>13000000000</span>
        </FormItem>
      </Form>
    </TabPane>
  </div>
</template>
<script>
export default {
  name: "linkinfo_tab",
  components: {},
  props: {},
  data() {
    return {
      showformBase: {}
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped></style>
