<template>
  <div style="height: 100%">
    <Card class="warp-card" dis-hover style="height: 100%">
      <div style="margin-bottom: 15px">{{ $t("gwsjbz") }}</div>
      <div>
        <div>
          <div>
            <Input v-model="addformbase.months" style="width: 500px">
              <span slot="prepend">
                {{ $t("khtjcs") }}
              </span>
              <span slot="append">
                {{ $t("month") }}
              </span>
            </Input>
          </div>
          <Divider />
          <span>{{ $t("sjgz") }}</span>
          <div>
            <Input
              v-model="itemJson.standard"
              style="margin-bottom: 24px; width: 500px"
            >
              <span slot="prepend">
                {{ $t("pjzdy") }}
              </span>
              <span slot="append">
                {{ $t("sz") }}
              </span>
            </Input>
            <Input v-model="itemJson2.standard" style="width: 500px">
              <span slot="prepend">
                {{ $t("pjzxy") }}
              </span>
              <span slot="append">
                {{ $t("jz") }}
              </span>
            </Input>
          </div>
          <Divider />
          <span style="margin-right: 15px">{{ $t("zhuangtai") }}</span>
          <i-switch
            v-model="addformbase.stat"
            :true-value="1"
            :false-value="2"
          />
          <!-- 奖金规则 -->
        </div>
      </div>
      <div class="button-warp">
        <div class="button-group">
          <Button type="primary" v-privilege="['59-80-2']" @click="handlerSave()"> 保存 </Button>
          <!-- <Button @click="$router.go(-1)">
            取消
          </Button> -->
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { personnelAnalysis } from '@/api/personnelAnalysis';
export default {
  name: 'teamAward',
  components: {},
  props: {},
  data () {
    return {
      addformbase: {
        createId: this.$store.state.user.userLoginInfo.userId,
        operatId: this.$store.state.user.userLoginInfo.userId
      },
      itemJson: {
        compareType: 1,
        standard: 0,
        type: 1
      },
      itemJson2: {
        compareType: 2,
        standard: 0,
        type: 2
      },
      isedit: false
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.getList();
  },
  methods: {
    getList () {
      personnelAnalysis.querypostTaskRule().then((res) => {
        if (res.data.content.length > 0) {
          this.isedit = true;
          this.addformbase = Object.assign({}, res.data.content[0]);
          this.itemJson.standard = this.addformbase.postUpDownRules[0].standard;
          this.itemJson2.standard = this.addformbase.postUpDownRules[1].standard;
        } else {
          this.isedit = false;
        }
      });
    },
    handlerSave () {
      this.addformbase.detailJson = JSON.stringify([
        this.itemJson,
        this.itemJson2
      ]);
      if (this.isedit) {
        personnelAnalysis.updatepostTaskRule(this.addformbase).then((res) => {
          this.$Message.success('success!');
          this.getList();
          console.log(res);
        });
      } else {
        personnelAnalysis.addpostTaskRule(this.addformbase).then((res) => {
          this.$Message.success('success!');
          this.getList();
          console.log(res);
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  display: flex;
}
.button-warp {
  box-sizing: border-box;
  text-align: center;
  height: 75px;
  padding: 0 20px;
  position: fixed;
  bottom: 0;
  right: 0;
  width: ~"calc(100% - 254px)";
  z-index: 9;
  .button-group {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    -webkit-box-shadow: 0 0 4px hsla(0, 0%, 78.4%, 0.4);
    box-shadow: 0 0 4px hsla(0, 0%, 78.4%, 0.4);
    height: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
