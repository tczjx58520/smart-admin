<template>
  <div>
    <Card class="warp-card" dis-hover>
      <Button
        style="margin-right: 15px"
        @click="getList(0)"
        icon="md-refresh"
        type="default"
        >{{ $t("Reflash") }}</Button
      >
      <Button
        v-privilege="['10-16-1']"
        style="margin-right: 15px"
        @click="created"
        icon="md-add"
        type="warning"
        >{{ $t("Save") }}</Button
      >
    </Card>
    <Card class="warp-card" dis-hover>
      <div style="display: flex; align-items: center">
        <div
          style="
            width: 4px;
            height: 20px;
            background: #2d8cf0;
            margin-right: 15px;
          "
        ></div>
        <div>{{ $t("bhgzsz") }}</div>
      </div>
      <div style="padding: 20px;">
        <RadioGroup v-model="saveItem.numMethod" style="margin-bottom:24px;">
          <Radio :label="0" style="margin-right: 24px">{{
            $t("autoMake")
          }}</Radio>
          <Radio :label="1">{{ $t("hanlderInput") }}</Radio>
        </RadioGroup>
        <Form :label-width="100" :model="saveItem" v-if="saveItem.numMethod === 0">
          <FormItem :label="$t('numpre')">
            <Input :maxlength="30" v-model="saveItem.numPrefix"></Input>
          </FormItem>
          <FormItem :label="$t('liushui')">
            <Input :maxlength="30" v-model="saveItem.numSerial"></Input>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>
<script>
import { numSetting } from '@/api/numSetting';
export default {
  name: 'numSetting',
  data () {
    return {
      saveItem: {}
    };
  },
  mounted () {
    this.getList();
  },
  methods: {
    getList () {
      numSetting.getstorage().then(res => {
        console.log('res=====', res.data);
        this.saveItem = Object.assign({}, res.data);
      });
    },
    created () {
      console.log('baocun=====');
      numSetting.updatestorage(this.saveItem).then(res => {
        console.log('res=====', res.data);
        this.getList();
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
