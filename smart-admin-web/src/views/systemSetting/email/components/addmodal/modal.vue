<template>
        <Modal v-model="mymoadlStat" class="add" width="1020" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('usermanage_view.adduser') }}</span>
        </div>
        <div>
            <Card dis-hover>
              <div style="margin-bottom:20px;color:#000;font-weight:700;">
                <Icon type="ios-mail-open" />{{ infoObj.title }}
              </div>
              <div class="sendperson" style="margin-bottom:20px;">
                发件人：{{ infoObj.createName }}
              </div>
              <div class="time" style="margin-bottom:20px;">
                <span>开始时间 {{ infoObj.beginTime }}</span> <span>开始时间 {{ infoObj.endTime }}</span>
              </div>
              <div class="fujian" style="margin-bottom:20px;">
                <ul  style="display:flex;">
                  <li style="list-style:none;margin-right:15px;" v-for="(item, index) in infoObj.picPaths" :key="index"><Icon type="ios-link" /><a :href="item" target="_blank" style="color:#ccc;">查看附件</a></li>
                </ul>
              </div>
            </Card>
            <Card dis-hover style="height:300px;overflow-y:scroll;">
              <div v-html="infoObj.content"></div>
            </Card>
        </div>
        <div slot="footer">
            <ButtonGroup>
                <!-- <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button> -->
                <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
            </ButtonGroup>
        </div>
    </Modal>
</template>
<script>
export default {
  name: 'addModal',
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    info: null
  },
  created () {
  },
  data () {
    return {
      mymoadlStat: this.modalstat,
      infoObj: {}
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      this.infoObj = this.info;
      console.log(this.infoObj);
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    cancel () {
      this.$emit('updateStat', false);
    }
  }
};
</script>
<style lang="less" scoped>
     .add /deep/ .ivu-modal-header {
        background-color: #2d8cf0;
    }
    .add /deep/ .ivu-modal-content {
        background-color: #eee;
    }
    .add /deep/ .ivu-modal-footer {
        border: none;
    }
</style>
