<template>
  <div style="height:100%">
    <Card class="warp-card" dis-hover style="height:100%;">
      <div style="margin-bottom:15px;">{{ $t("tdjffgz") }}</div>
      <div style="display:flex;">
        <div class="left">{{ $t("ffgz") }}</div>
        <div class="right">
          <div>
            <span style="margin-bottom:15px;">{{ $t("khxm") }}</span>
            <Select
              v-model="selectItems"
              multiple
              style="width:260px"
              label-in-value
              filterable
              @on-change="setAttribute"
            >
              <Option
                v-for="item in assessmentList"
                :value="item.id"
                :key="item.id"
                >{{ item.itemName }}</Option
              >
            </Select>
          </div>
          <Divider />
          <div v-for="item in ruleList" :key="item.value">
            <div class="title">
              <div style="flex:1;">{{ item.label }}</div>
              <div style="flex:1;text-align:right;">
                <ButtonGroup>
                  <Button type="text" @click="addrule(item.data,item.value)">
                    <Icon type="md-add-circle"></Icon>
                    {{ $t("tj") }}
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            <Table :columns="columns" :data="item.data"></Table>
          </div>
        </div>
      </div>
      <div style="height:75px;width:100%;"></div>
      <div class="button-warp">
        <div class="button-group">
          <Button type="primary" @click="handlerSave()">
            保存
          </Button>
          <!-- <Button @click="$router.go(-1)">
            取消
          </Button> -->
        </div>
      </div>
    </Card>
    <ruleModal
      :modalstat="rule_dialog"
      :editinfo="rule_info"
      :isedit="edit_rule_flag"
      @updateStat="updateStat_rule"
    />
  </div>
</template>
<script>
import { assessmentCollect } from '@/api/assessmentCollect';
import ruleModal from './components/ruleModal/ruleModal';
import { teamAward } from '@/api/teamAward';
export default {
  name: 'teamAward',
  components: {
    ruleModal
  },
  props: {},
  data () {
    return {
      columns: [
        {
          title: this.$t('tiaoj'),
          render: (h, params) => {
            return h(
              'span',
              `${params.row.begin}${this.$t('to')}${params.row.end}`
            );
          }
        },
        {
          title: this.$t('sfcyxwwcl'),
          key: 'isMultiplied',
          render: (h, params) => {
            if (params.row.isMultiplied === 1) {
              return h('span', this.$t('yes'));
            } else {
              return h('span', this.$t('no'));
            }
          }
        },
        {
          title: this.$t('zkbl'),
          key: 'impoundedPercent'
        },
        {
          title: this.$t('usermanage_view.action'),
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-16-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.Edit_leader(params.row);
                    }
                  }
                },
                this.$t('Edit')
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  directives: [
                    {
                      name: 'privilege',
                      value: ['10-16-2']
                    }
                  ],
                  on: {
                    click: () => {
                      this.delleaderrule(params.row, params.index);
                    }
                  }
                },
                this.$t('sc')
              )
            ]);
          }
        }
      ],
      assessmentList: [],
      selectItems: [],
      ruleList: [],
      rule_dialog: false,
      rule_info: null,
      edit_rule_flag: false,
      data: [],
      isedit: false,
      id: null,
      parentId: null
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.getassessmentList();
    this.getteamReward();
  },
  methods: {
    getteamReward () {
      const searchForm = {
        pageNum: 1,
        pageSize: 10
      };
      teamAward.getteamAward(searchForm).then(res => {
        console.log('res========', res.data.content.list);
        if (res.data.content.list.length > 0) {
          this.isedit = true;
          this.id = res.data.content.list[0].id;
          const temp = res.data.content.list[0].itemTypes.split(',').map(Number);
          this.selectItems = temp;
          setTimeout(() => {
            for (let i = 0; i < temp.length; i++) {
              for (let j = 0; j < res.data.content.list[0].grantRules.length; j++) {
                if (res.data.content.list[0].grantRules[j].itemType === Number(temp[i])) {
                  res.data.content.list[0].grantRules[j].parentId = this.ruleList[i].value;
                  this.ruleList[i].data.push(res.data.content.list[0].grantRules[j]);
                }
              }
            }
            console.log('this.ruleList======', this.ruleList);
          }, 100);
        }
      });
    },
    updateStat_rule (stat, value) {
      this.rule_dialog = stat;
      if (value) {
        if (this.edit_rule_flag) {
          const index = this.ruleList.findIndex(item => {
            return item.value === value.parentId;
          });
          console.log('index=====', index);
          this.ruleList[index].data.splice(value._index, 1, value);
        } else {
          value.parentId = this.parentId;
          this.data.push(value);
        }
      }
      console.log(this.ruleList);
    },
    addrule (value, id) {
      this.rule_dialog = true;
      this.data = value;
      this.parentId = id;
      this.edit_rule_flag = false;
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
    setAttribute (value) {
      this.ruleList = this._.cloneDeep(value);
      this.ruleList.map(item => {
        // item.data = [];
        this.$set(item, 'data', []);
      });
      console.log(this.ruleList);
    },
    handlerSave () {
      let temp = {};
      if (this.id) {
        temp = {
          id: this.id,
          itemTypes: this.selectItems.join(','),
          createId: this.$store.state.user.userLoginInfo.userId
        };
      } else {
        temp = {
          itemTypes: this.selectItems.join(','),
          createId: this.$store.state.user.userLoginInfo.userId
        };
      }
      console.log(temp);
      const data = JSON.stringify(temp);
      const temp2 = [];
      console.log(this.ruleList);
      for (let i = 0; i < this.ruleList.length; i++) {
        for (let j = 0; j < this.ruleList[i].data.length; j++) {
          this.ruleList[i].data[j].itemType = this.ruleList[i].value;
          temp2.push(this.ruleList[i].data[j]);
        }
      }
      const data2 = JSON.stringify(temp2);
      if (this.isedit) {
        teamAward.updateteamAward(data, data2).then(res => {
          console.log(res);
        });
      } else {
        teamAward.addteamAward(data, data2).then(res => {
          console.log(res);
        });
      }
    },
    Edit_leader (row) {
      this.edit_rule_flag = true;
      this.rule_info = Object.assign({}, row);
      this.rule_dialog = true;
    },
    delleaderrule (value, rowIndex) {
      const index = this.ruleList.findIndex(item => {
        return item.value === value.parentId;
      });
      this.ruleList[index].data.splice(rowIndex, 1);
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
.button-warp {
    box-sizing: border-box;
    text-align: center;
    height: 75px;
    padding:0 20px;
    position: fixed;
    bottom: 0;
    right: 0;
    width: ~"calc(100% - 254px)";
    z-index: 9;
    .button-group {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      -webkit-box-shadow: 0 0 4px hsla(0,0%,78.4%,.4);
      box-shadow: 0 0 4px hsla(0,0%,78.4%,.4);
      height: 100%;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
