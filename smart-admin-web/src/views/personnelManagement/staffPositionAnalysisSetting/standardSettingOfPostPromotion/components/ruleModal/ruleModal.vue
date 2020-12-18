<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="720"
    :closable="false"
    :mask-closable="false"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>{{ $t("tjfftj") }}</span>
    </div>
    <div>
      <Card dis-hover>
        <div
          style="
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e1e1e1;
            padding-bottom: 20px;
          "
        >
          <div
            style="
              width: 4px;
              height: 20px;
              background: #2d8cf0;
              margin-right: 15px;
            "
          ></div>
          <div>{{ $t("BaseData") }}</div>
        </div>
        <Divider />
        <Form
          ref="form"
          :model="addformbase"
          label-position="right"
          :label-width="250"
          :rules="ruleValidate"
        >
          <FormItem :label="$t('dmrs')" style="width: 80%">
            <Input v-model="addformbase.beginQuantity" style="
            width:45%;"/>
            {{ $t('to') }}
            <Input v-model="addformbase.endQuantity" style="
            width:45%;"/>
          </FormItem>
          <FormItem :label="$t('pmjj')" style="width: 80%">
            <div class="warpper">
              <div class="content">
                <ul class="conditionList">
                  <li
                    v-for="items in rankList"
                    :key="items.flagid"
                    :class="[items.selected ? 'active' : 'li-hover']"
                    @click="selectedFormlua(items.flagid, items)"
                  >
                    {{ items.label }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="rank_btn">
            <ButtonGroup>
              <Button type="text" @click="addrankrule">
                <Icon type="md-add-circle"></Icon>
                {{ $t("tj") }}
              </Button>
              <Button type="text" @click="delrankrule">
                <Icon type="md-close-circle"></Icon>
                {{ $t("sc") }}
              </Button>
            </ButtonGroup>
          </div>
          </FormItem>
        </Form>
      </Card>
    </div>
    <div slot="footer">
      <ButtonGroup>
        <Button
          type="primary"
          size="large"
          :loading="modal_loading"
          @click="handsave"
          >{{ $t("Save") }}</Button
        >
        <Button type="error" size="large" @click="cancel">{{
          $t("Close")
        }}</Button>
      </ButtonGroup>
    </div>
    <!-- 新建名次奖弹窗 -->
    <addRankModal :modalstat="rank_dialog" @updateStat="updateStat_rankModal" />
  </Modal>
</template>
<script>
import addRankModal from '../add-rank-modal/add-rank-modal';
import { generateUUID } from '@/lib/util';
const defaultForm = {
  beginQuantity: 0,
  endQuantity: 0
};
export default {
  name: 'add-leader-modal',
  components: {
    addRankModal
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: null,
    isedit: {
      type: Boolean,
      default: false
    }
  },
  created () {},
  mounted () {},
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    return {
      rank_dialog: false,
      rankList: [],
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: Object.assign({}, defaultForm),
      ruleValidate: {
        categoryName: [
          {
            required: true,
            message: 'The categoryName cannot be empty',
            trigger: 'blur'
          }
        ]
      },
      tranferValue: null,
      mytype: null
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        if (this.isedit) {
          this.addformbase.beginQuantity = this.editinfo.beginQuantity;
          this.addformbase.endQuantity = this.editinfo.endQuantity;
          this.rankList = this._.cloneDeep(this.editinfo.personalRankRules);
        }
      }
    }
  },
  methods: {
    generateUUID,
    delteamrule () {},
    selectedFormlua (id, item) {
      const hadExistStatus = item.selected;
      for (let i = 0; i < this.rankList.length; i++) {
        this.rankList[i].selected = false;
      }
      item.selected = !hadExistStatus;
      if (!hadExistStatus) {
        this.selectId = id;
      } else {
        this.selectId = null;
      }
    },
    updateStat_rankModal (stat, val) {
      this.rank_dialog = stat;
      if (val) {
        const obj = {
          label: `第${val.level}名奖金${val.money}`,
          level: val.level,
          money: val.money,
          selected: false,
          flagid: this.generateUUID()
        };
        console.log(obj);
        this.rankList.push(obj);
      }
    },
    addrankrule () {
      this.rank_dialog = true;
    },
    delrankrule () {
      if (this.selectId) {
        const index = this.rankList.findIndex(item => {
          return item.flagid === this.selectId;
        });
        this.rankList.splice(index, 1);
      } else {
        this.$Message.warning(this.$t('qxzxusch'));
      }
    },
    cancel () {
      this.addformbase = Object.assign({}, defaultForm);
      this.$emit('updateStat', false);
    },
    handsave () {
      const temp = this._.cloneDeep(this.rankList);
      this.addformbase.personalRankRules = temp;
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.rankList = [];
          this.$emit('updateStat', false, this.addformbase);
          this.addformbase = Object.assign({}, defaultForm);
        } else {
          this.$Message.error('Fail!');
        }
      });
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
.warpper {
  height: 120px;
  width: 100%;
  .content {
    height: 100%;
    border: 1px solid #ccc;
  }
}
.conditionList {
  .active {
    background-color: #2d8cf0;
  }
  .li-hover {
    &:hover {
      background-color: #eff6ff;
    }
  }
  li {
    box-sizing: border-box;
    padding: 2px;
    list-style: none;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
