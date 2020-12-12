<template>
  <div style="height:100%">
    <Card class="warp-card"
          dis-hover
          style="height:100%;">
      <div style="margin-bottom:15px;">{{ $t("grjffgz") }}</div>
      <Form ref="formInline"
            :model="stepFormInfo"
            inline>
        <Row>
          <Col span="5">
          <FormItem prop="user"
                    label="项目:"
                    style="display: flex">
            <Select v-model="stepFormInfo.calcCadition1"
                    filterable
                    clearable>
              <Option v-for="item in assessmentList"
                      :value="item.id"
                      :key="item.id">{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem prop="password"
                    label="条件:"
                    style="display: flex">
            <Select v-model="stepFormInfo.calcCadition2"
                    filterable
                    clearable>
              <Option v-for="item in conditionList"
                      :value="item.value"
                      :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem prop="password"
                    label="值:"
                    style="display: flex">
            <Input v-model="stepFormInfo.value"
                   placeholder="value"></Input>
          </FormItem>
          </Col>
          <Col span="5">
          <FormItem prop="password"
                    label="关系:"
                    style="display: flex">
            <Select v-model="stepFormInfo.calcCadition3"
                    filterable
                    clearable>
              <Option v-for="item in relationList"
                      :value="item.value"
                      :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="1">
          <FormItem>
            <Button type="primary"
                    @click="handleSubmit()">{{
                $t("tj")
              }}</Button>
          </FormItem>
          </Col>
          <Col span="1">
          <FormItem>
            <Button type="primary"
                    @click="clear()">{{
                $t("kqgl.qk")
              }}</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="condition">
        <ul class="conditionList">
          <li v-for="(items, index) in myformlua"
              :class="[items.selected ? 'active' : 'li-hover']"
              @click="selectedFormlua(index, myformlua)">
            {{ items.label }}
          </li>
        </ul>
      </div>
      <div style="margin-top:20px">
        <span>{{$t('qsrjljz')}}</span>
        <Input v-model="baseMoney"
               style="width:200px;padding-left:10px;"
               :placeholder="$t(qsrjljz)" />
      </div>
      <div class="button-warp">
        <div class="button-group">
          <Button type="primary"
                  @click="handlerSave()"
                  :loading="isloading">
            保存
          </Button>
          <!-- <Button @click="$router.go(-1)">
            取消
          </Button> -->
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { assessmentCollect } from '@/api/assessmentCollect';
import { soloAward } from '@/api/soloAward';
const defaultForm = {
  calcCadition1: null,
  calcCadition2: null,
  calcCadition3: null,
  value: null
};
export default {
  name: 'soloAward',
  components: {},
  props: {},
  data () {
    return {
      isloading: false,
      assessmentList: [],
      selectItems: [],
      rulelist: [],
      rule_dialog: false,
      rule_info: null,
      edit_rule_flag: false,
      data: [],
      stepFormInfo: Object.assign({}, defaultForm),
      conditionList: [
        { value: 1, label: '大于' },
        { value: 2, label: '大于等于' }
      ],
      relationList: [
        { value: 1, label: '且' },
        { value: 2, label: '或' }
      ],
      myformlua: [],
      selectIndex: null,
      isedit: false,
      id: null,
      baseMoney: ''
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () { },
  mounted () {
    this.getassessmentList();
    this.getList();
  },
  methods: {
    clear () {
      this.stepFormInfo = {};
    },
    getList () {
      soloAward.getsoloAward().then(res => {
        console.log(res.data.content);
        if (res.data.content.length > 0) {
          this.isedit = true;
          this.id = res.data.content[0].id;
          const temp = JSON.parse(res.data.content[0].myformlua);
          this.myformlua = temp;
        }
      });
    },
    handleSubmit () {
      const value =
        this.stepFormInfo.calcCadition1 &&
        this.assessmentList.filter(item => {
          return item.id === this.stepFormInfo.calcCadition1;
        })[0].itemName;
      const value2 =
        this.stepFormInfo.calcCadition2 &&
        this.conditionList.filter(item => {
          return item.value === this.stepFormInfo.calcCadition2;
        })[0].label;
      const value3 =
        this.stepFormInfo.calcCadition3 &&
        this.relationList.filter(item => {
          return item.value === this.stepFormInfo.calcCadition3;
        })[0].label;
      let addvalue = this.stepFormInfo.value;
      const fin = `${value3 || ''} ${value || ''} ${value2 || ''} ${addvalue}`;
      const temp = this.stepFormInfo.calcCadition2 === 1 ? '>' : '>=';
      const temp2 = this.stepFormInfo.calcCadition3 === 1 ? '&&' : this.stepFormInfo.calcCadition3 === 2 ? '||' : '';
      this.selectItems.push(this.stepFormInfo.calcCadition1);
      this.myformlua.push({
        label: fin,
        selected: false,
        formal: `${temp2 || ''} ${this.stepFormInfo.calcCadition1 || ''} ${temp || ''} ${addvalue}`
      });
      this.stepFormInfo = Object.assign({}, defaultForm);
      // const formula = `${this.stepFormInfo.calcCadition1}${temp}${addvalue}`;
    },
    getassessmentList () {
      assessmentCollect.getAssessmentCollect().then(res => {
        if (res.ret === 200) {
          this.assessmentList = res.data.content;
        } else {
          console.log('列表出错');
        }
      });
    },
    selectedFormlua (index, item) {
      const hadExistStatus = item[index].selected;
      for (let i = 0; i < item.length; i++) {
        item[i].selected = false;
      }
      item[index].selected = !hadExistStatus;
      if (!hadExistStatus) {
        this.selectIndex = index;
      } else {
        this.selectIndex = null;
      }
      console.log('item======', this.selectIndex);
    },
    handlerSave () {
      this.isloading = true;
      console.log(this.myformlua, this.selectItems);
      let formula = '';
      for (let i = 0; i < this.myformlua.length; i++) {
        formula += this.myformlua[i].formal;
      }
      const data2 = this.selectItems.join(',');
      const data3 = JSON.stringify(this.myformlua);
      const data4 = this.$store.state.user.userLoginInfo.userId;
      if (this.isedit) {
        soloAward.updatesoloAward(this.baseMoney, this.id, formula, data2, data3, data4).then(res => {
          console.log(res);
          this.stepFormInfo = Object.assign({}, defaultForm);
          this.isloading = false;
        });
      } else {
        soloAward.addsoloAward(this.baseMoney, formula, data2, data3, data4).then(res => {
          console.log(res);
          console.log(1111111111111, this.baseMoney);
          this.stepFormInfo = Object.assign({}, defaultForm);
        });
        this.getList();
        this.isloading = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.left {
  flex: 1;
}
.right {
  flex: 4;
}
.title {
  display: flex;
}
.condition {
  border: 2px solid #d1d3dd;
  min-height: 160px;
  width: 90%;
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
