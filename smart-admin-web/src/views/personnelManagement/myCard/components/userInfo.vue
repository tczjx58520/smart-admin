<template>
  <div>
    <TabPane :label="$t('zaizhixinxi')" name="name1">
      <div style="display: flex">
        <div class="left">
          <div
            class="top"
            :style="'background-image: url(' + mypath + ')'"
          ></div>
          <div class="middle">
            <Button shape="circle" icon="md-chatbubbles" size="large"></Button>
            <Button shape="circle" icon="md-mail" size="large"></Button>
            <Button shape="circle" icon="md-calendar" size="large"></Button>
          </div>
          <div class="bottom">
            <Form
              :model="showformBase"
              label-position="left"
              :label-width="100"
            >
              <FormItem :label="$t('zssj')">
                <span>沈中平</span>
              </FormItem>
              <FormItem :label="$t('zhdlrq')">
                <span>2020-12-18 11:40:20</span>
              </FormItem>
              <FormItem :label="$t('gwjsxx')">
                <div>
                  <div>从中国开发调岗菲律宾开发</div>
                  <div>从菲律宾开发调岗中国开发</div>
                </div>
              </FormItem>
            </Form>
          </div>
          <!-- <img src="../../../../assets/images/myPic/avater.jpg" alt=""> -->
        </div>
        <Divider type="vertical" />
        <div class="right">
          <div style="display: flex; align-items: center">
            <div
              style="
                width: 4px;
                height: 20px;
                background: #2d8cf0;
                margin-right: 15px;
              "
            ></div>
            <div>{{ $t("zaizhixinxi") }}</div>
          </div>
          <Form
            :model="showformBase"
            label-position="left"
            :label-width="100"
            inline
            style="padding:24px;"
          >
            <FormItem :label="$t('gonghao')" style="width:48%;">
              <span>325522155664</span>
            </FormItem>
            <FormItem :label="$t('gongzuodidian')" style="width:48%;">
              <span>2020-12-18 11:40:20</span>
            </FormItem>
            <FormItem :label="$t('suozaizuzhi')" style="width:48%;">
              <span>南京嗯哇</span>
            </FormItem>
            <FormItem :label="$t('zhishushangji')" style="width:48%;">
              <span>沈中平</span>
            </FormItem>
            <FormItem :label="$t('usoshugangwei')" style="width:48%;">
              <span>前端开发</span>
            </FormItem>
            <FormItem :label="$t('jibie')" style="width:48%;">
              <span>组长</span>
            </FormItem>
            <FormItem :label="$t('suoshumengdian')" style="width:48%;">
              <span>N/A</span>
            </FormItem>
            <FormItem :label="$t('xitongzhanghao')" style="width:48%;">
              <span>test</span>
            </FormItem>
          </Form>
          <div style="display: flex; align-items: center">
            <div
              style="
                width: 4px;
                height: 20px;
                background: #2d8cf0;
                margin-right: 15px;
              "
            ></div>
            <div>{{ $t("hetongxinxi") }}</div>
          </div>
          <Form
            :model="showformBase"
            label-position="left"
            :label-width="100"
            inline
            style="padding:24px;"
          >
            <FormItem :label="$t('hetongleixing')" style="width:48%;">
              <span>入职合同</span>
            </FormItem>
            <FormItem :label="$t('heitongleixing')" style="width:48%;">
              <span>正式合同</span>
            </FormItem>
            <FormItem :label="$t('hetongkaishishijian')" style="width:48%;">
              <span>2020-12-16 13:26:20</span>
            </FormItem>
            <FormItem :label="$t('hetongjieshushijian')" style="width:48%;">
              <span>2020-12-30 13:26:20</span>
            </FormItem>
          </Form>
        </div>
      </div>
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
      mypath: require('../../../../assets/images/myPic/avater.jpg'),
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
        // employeeId: this.$store.state.user.userLoginInfo.userId
        employeeId: 75568
      };
      console.log('data=======', data);
      empCard.getEmpInfo(data).then(res => {
        console.log('res=============', res);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.left {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 780px;
  .top {
    width: 100%;
    flex: 5;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
  .middle {
    padding: 0 24px;
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .bottom {
    width: 100%;
    flex: 4;
  }
}
.right {
  flex: 4;
}
</style>
