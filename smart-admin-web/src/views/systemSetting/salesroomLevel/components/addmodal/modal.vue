<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    fullscreen
    width="720"
    :closable="false"
    :mask-closable="false"
    :transfer="false"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>{{ $t("tjzb") }}</span>
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
          :label-width="100"
          :rules="ruleValidate"
        >
          <FormItem :label="$t('jbmc')" style="width: 80%">
            <Input v-model="addformbase.levelName" />
          </FormItem>
          <FormItem :label="$t('mdrybz')" style="width: 80%">
            <Input v-model="addformbase.employeeStandards" />
          </FormItem>
        </Form>
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
          <div>{{ $t("tdjgz") }}</div>
        </div>
        <!-- 团队奖基准 -->
        <div class="title">
          <div class="left">
            <span>{{ $t("tdjjz") }}</span>
          </div>
          <div class="rigth">
            <div style="text-align:right;">
              <ButtonGroup>
                <Button type="text" @click="addteamrule">
                  <Icon type="md-add-circle"></Icon>
                  {{ $t("tj") }}
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <div style="padding-left:48px;">
          <Table
            :columns="columns_team"
            :data="data_team"
            @on-selection-change="get_team_select"
          ></Table>
        </div>
        <!-- 排名奖励 -->
        <div style="padding-left:48px;">
          <div>{{ $t("pmj") }}</div>
          <div style="display:flex;">
            <div style="width:50px;">{{ $t("gz") }}</div>
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
        </div>
        <!-- 店面超额销售计划 -->
        <div class="title">
          <div class="left">
            <span>{{ $t("dpxlcembgz") }}</span>
            <div style="padding: 5px 24px;">{{ $t("dmxlcgmbd") }}</div>
          </div>
          <div class="rigth">
            <div style="text-align:right;">
              <ButtonGroup>
                <Button type="text" @click="addoverSalerule">
                  <Icon type="md-add-circle"></Icon>
                  {{ $t("tj") }}
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <div style="padding-left:48px;">
          <Table :columns="columns_oversale" :data="data_oversale"></Table>
        </div>
        <Divider />
        <!-- 领头人奖励 -->
        <div
          style="
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e1e1e1;
            padding-bottom: 20px;
            margin-bottom:15px;
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
          <div>{{ $t("ltrjlgz") }}</div>
        </div>
        <Form
          ref="form2"
          :model="leaderform"
          label-position="right"
          :label-width="150"
          :rules="ruleValidate"
          inline
        >
          <FormItem :label="$t('jljz')" style="width: 80%">
            <Input v-model="leaderform.rewardBase" />
          </FormItem>
          <FormItem :label="$t('ltrfpbl')" style="width: 40%">
            <Input v-model="leaderform.leaderPercent" />
          </FormItem>
          <FormItem :label="$t('dmzlfpbl')" style="width: 40%">
            <Input v-model="leaderform.assistantPercent" />
          </FormItem>
        </Form>
        <div class="title">
          <div class="left">
            <span>{{ $t("mbwcqz") }}</span>
          </div>
          <div class="rigth">
            <div style="text-align:right;">
              <ButtonGroup>
                <Button type="text" @click="addleaderrule">
                  <Icon type="md-add-circle"></Icon>
                  {{ $t("tj") }}
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <div style="padding-left:48px;">
          <Table :columns="columns_leader" :data="data_leader"></Table>
        </div>
        <div class="title">
          <div class="left">
            <span>{{ $t("jltj") }}</span>
          </div>
          <div style="flex:4;">
            <Form
              ref="form2"
              :model="leaderform"
              label-position="right"
              :label-width="150"
              :rules="ruleValidate"
            >
              <FormItem label="每超过">
                <div style="display:flex;">
                  <div style="flex:1;">
                    <Input v-model="leaderform.overPercent">
                      <span slot="append">%</span>
                    </Input>
                  </div>
                  <div style="flex:1;">
                    <span>增加</span>
                  </div>
                  <div style="flex:1;">
                    <Input v-model="leaderform.overBasePercent">
                      <span slot="prepend">基准奖金的</span>
                      <span slot="append">%</span>
                    </Input>
                  </div>
                </div>
              </FormItem>
              <FormItem label="每少">
                <div style="display:flex;">
                  <div style="flex:1;">
                    <Input v-model="leaderform.reducePercent">
                      <span slot="append">%</span>
                    </Input>
                  </div>
                  <div style="flex:1;">
                    <span>减少</span>
                  </div>
                  <div style="flex:1;">
                    <Input v-model="leaderform.reduceBasePercent">
                      <span slot="prepend">基准奖金的</span>
                      <span slot="append">%</span>
                    </Input>
                  </div>
                </div>
              </FormItem>
              <FormItem label="目标少于">
                <Input v-model="leaderform.lowerPercent">
                  <span slot="append">%</span>
                </Input>
              </FormItem>
            </Form>
          </div>
        </div>
        <div class="title">
          <div class="left">
            <span>{{ $t("ltrtdjgz") }}</span>
          </div>
          <div style="flex:4;">
            <Form
              ref="form2"
              :model="leaderform"
              label-position="right"
              :label-width="150"
              :rules="ruleValidate"
            >
              <FormItem label="团队奖比例">
                <Input v-model="leaderform.teamPercent">
                  <span slot="append">%</span>
                </Input>
              </FormItem>
            </Form>
          </div>
        </div>
        <Divider />
        <!-- 店面经理规则 -->
        <div
          style="
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e1e1e1;
            padding-bottom: 20px;
            margin-bottom:15px;
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
          <div>{{ $t("dmjljlgz") }}</div>
        </div>
        <div class="title">
          <div class="left">
            <span>{{ $t("jljjz") }}</span>
          </div>
          <div class="rigth">
            <div style="text-align:right;">
              <ButtonGroup>
                <Button type="text" @click="addmanagerrule">
                  <Icon type="md-add-circle"></Icon>
                  {{ $t("tj") }}
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <div style="padding-left:48px;">
          <Table :columns="columns_manager" :data="data_manager"></Table>
        </div>
        <div class="title">
          <div class="left">
            <span>{{ $t("qz") }}</span>
          </div>
          <div style="flex:4;">
            <Form
              ref="form2"
              :model="managerform"
              label-position="right"
              :label-width="150"
              :rules="ruleValidate"
            >
              <FormItem label="考核项目">
                <div style="display:flex;">
                  <div style="flex:1;">
                    <Select v-model="managerform.itemId1">
                      <Option
                        v-for="item in assessmentList"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.itemName }}</Option
                      >
                    </Select>
                  </div>
                  <div style="flex:1;">
                    <Input v-model="managerform.salePercent">
                      <span slot="prepend">{{ $t("qz") }}</span>
                      <span slot="append">%</span>
                    </Input>
                  </div>
                </div>
              </FormItem>
              <FormItem label="考核项目">
                <div style="display:flex;">
                  <div style="flex:1;">
                    <Select v-model="managerform.itemId2">
                      <Option
                        v-for="item in assessmentList"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.itemName }}</Option
                      >
                    </Select>
                  </div>
                  <div style="flex:1;">
                    <Input v-model="managerform.installmentPercent">
                      <span slot="prepend">{{ $t("qz") }}</span>
                      <span slot="append">%</span>
                    </Input>
                  </div>
                </div>
              </FormItem>
            </Form>
          </div>
        </div>
        <div class="title">
          <div class="left">
            <span>{{ $t("jltj") }}</span>
          </div>
          <div style="flex:4;">
            <Form
              ref="form2"
              :model="managerform"
              label-position="right"
              :label-width="150"
              :rules="ruleValidate"
            >
              <FormItem label="每超过">
                <div style="display:flex;">
                  <div style="flex:1;">
                    <Input v-model="managerform.overPercent">
                      <span slot="append">%</span>
                    </Input>
                  </div>
                  <div style="flex:1;">
                    <span>增加</span>
                  </div>
                  <div style="flex:1;">
                    <Input v-model="managerform.overBasePercent">
                      <span slot="prepend">基准奖金的</span>
                      <span slot="append">%</span>
                    </Input>
                  </div>
                </div>
              </FormItem>
              <FormItem label="每少">
                <div style="display:flex;">
                  <div style="flex:1;">
                    <Input v-model="managerform.reducePercent">
                      <span slot="append">%</span>
                    </Input>
                  </div>
                  <div style="flex:1;">
                    <span>减少</span>
                  </div>
                  <div style="flex:1;">
                    <Input v-model="managerform.reduceBasePercent">
                      <span slot="prepend">基准奖金的</span>
                      <span slot="append">%</span>
                    </Input>
                  </div>
                </div>
              </FormItem>
              <FormItem label="目标少于">
                <Input v-model="managerform.lowerPercent">
                  <span slot="append">%</span>
                </Input>
              </FormItem>
            </Form>
          </div>
        </div>
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
    <!-- 新建团队奖弹窗 -->
    <addTeamModal
      :modalstat="team_dialog"
      :editinfo="team_info"
      :isedit="edit_team_flag"
      @updateStat="updateStat_TeamModal"
    />
    <!-- 新建结束============= -->
    <!-- 新建名次奖弹窗 -->
    <addRankModal :modalstat="rank_dialog" @updateStat="updateStat_rankModal" />
    <!-- 新建结束============= -->
    <!-- 新建团队奖弹窗 -->
    <addOverSaleModal
      :modalstat="oversale_dialog"
      :editinfo="oversale_info"
      :isedit="edit_oversale_flag"
      @updateStat="updateStat_oversale"
    />
    <!-- 新建结束============= -->
    <!-- 新建领头人权重弹窗 -->
    <addLeaderModal
      :modalstat="leader_dialog"
      :editinfo="leader_info"
      :isedit="edit_leader_flag"
      @updateStat="updateStat_leader"
    />
    <!-- 新建结束============= -->
    <!-- 新建领头人权重弹窗 -->
    <addManagerModal
      :modalstat="manager_dialog"
      :editinfo="manager_info"
      :isedit="edit_manager_flag"
      @updateStat="updateStat_manager"
    />
    <!-- 新建结束============= -->
  </Modal>
</template>
<script>
import $ from 'jquery';
import { positionApi } from '@/api/position';
import { assessmentCollect } from '@/api/assessmentCollect';
import { SalesRoomlevel } from '@/api/salesroomLevel';
import addTeamModal from '../add-team-modal/add-team-modal';
import addRankModal from '../add-rank-modal/add-rank-modal';
import addOverSaleModal from '../add-oversale-modal/add-oversale-modal';
import addLeaderModal from '../add-leader-modal/add-leader-modal';
import addManagerModal from '../add-manager-modal/add-manager-modal';
import { generateUUID } from '@/lib/util';
const defaultForm = {
};
export default {
  name: 'addModal',
  components: {
    addTeamModal,
    addRankModal,
    addOverSaleModal,
    addLeaderModal,
    addManagerModal
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    }
  },
  created () {},
  mounted () {},
  data () {
    return {
      isShowTree: false,
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: Object.assign({}, defaultForm),
      leaderform: {},
      managerform: {},
      ruleValidate: {
        categoryName: [
          {
            required: true,
            message: 'The categoryName cannot be empty',
            trigger: 'blur'
          }
        ]
      },
      // 新建员工弹窗
      visiable_emp: false,
      visiable_org: false,
      visiable_post: false,
      tranferValue: null,
      mytype: null,
      repositoryList: [],
      levelList: [],
      columns_team: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('xsjz'),
          key: 'saleTarget'
        },
        {
          title: this.$t('jjjs'),
          key: 'rewardBase'
        },
        {
          title: this.$t('cejs'),
          key: 'exceedBase'
        },
        {
          title: this.$t('yxtrjz'),
          key: 'marketBase'
        },
        {
          title: this.$t('gz'),
          render: (h, params) => {
            const str = `每增加${params.row.overMoney}实际销量减${params.row.reduceQty}`;
            return h('span', str);
          }
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
                      this.Edit_team(params.row);
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
                      this.delteamrule(params.index);
                    }
                  }
                },
                this.$t('sc')
              )
            ]);
          }
        }
      ],
      columns_oversale: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('tiaoj'),
          render: (h, params) => {
            const str = `销量超过目标的${params.row.overBegin}-${params.row.overEnd}`;
            return h('span', str);
          }
        },
        {
          title: this.$t('cejsbs'),
          key: 'multiple'
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
                      this.Edit_oversale(params.row);
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
                      this.deloversalerule(params.index);
                    }
                  }
                },
                this.$t('sc')
              )
            ]);
          }
        }
      ],
      columns_leader: [
        {
          title: this.$t('khxm'),
          key: 'itemId',
          render: (h, params) => {
            const temp = this.assessmentList.filter(item => {
              return item.id === params.row.itemId;
            });
            console.log(temp);
            return h('span', temp[0].itemName);
          }
        },
        {
          title: this.$t('qz'),
          key: 'percent'
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
                      this.delleaderrule(params.index);
                    }
                  }
                },
                this.$t('sc')
              )
            ]);
          }
        }
      ],
      columns_manager: [
        {
          title: this.$t('gw'),
          key: 'postId',
          render: (h, params) => {
            const temp = this.postList.filter(item => {
              return item.id === params.row.postId;
            });
            console.log(temp);
            return h('span', temp[0].postName);
          }
        },
        {
          title: this.$t('jljz'),
          key: 'rewardBase'
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
                      this.Edit_manager(params.row);
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
                      this.delmanagerrule(params.index);
                    }
                  }
                },
                this.$t('sc')
              )
            ]);
          }
        }
      ],
      data_team: [],
      data_oversale: [],
      data_leader: [],
      data_manager: [],
      team_dialog: false,
      rank_dialog: false,
      oversale_dialog: false,
      leader_dialog: false,
      manager_dialog: false,
      team_info: null,
      oversale_info: null,
      leader_info: null,
      manager_info: null,
      edit_team_flag: false,
      edit_oversale_flag: false,
      edit_leader_flag: false,
      edit_manager_flag: false,
      doslist_team: [],
      rankList: [],
      selectId: null,
      postList: [],
      assessmentList: []
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        this.getPostionList();
        this.getassessmentList();
      }
    }
  },
  methods: {
    generateUUID,
    getPostionList () {
      const searchform = {
        pageNum: 1,
        pageSize: 9999
      };
      positionApi.postList(searchform).then(res => {
        if (res.ret === 200) {
          this.postList = res.data.content.list;
        } else {
          console.log('列表出错');
        }
      });
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
    addmanagerrule () {
      this.edit_manager_flag = false;
      this.manager_dialog = true;
    },
    addleaderrule () {
      this.edit_leader_flag = false;
      this.leader_dialog = true;
    },
    addoverSalerule () {
      this.edit_oversale_flag = false;
      this.oversale_dialog = true;
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
    get_team_select (selection) {
      console.log(selection);
      this.doslist_team = selection;
    },
    addteamrule () {
      this.edit_team_flag = false;
      this.team_dialog = true;
    },
    delteamrule (index) {
      this.data_team.splice(index, 1);
    },
    deloversalerule (index) {
      this.data_oversale.splice(index, 1);
    },
    delleaderrule (index) {
      this.data_leader.splice(index, 1);
    },
    delmanagerrule (index) {
      this.data_manager.splice(index, 1);
    },
    updateStat_TeamModal (stat, value) {
      this.team_dialog = stat;
      if (value) {
        if (this.edit_team_flag) {
          console.log(value);
          this.data_team.splice(value._index, 1, value);
        } else {
          this.data_team.push(value);
        }
      }
    },
    updateStat_rankModal (stat, val) {
      this.rank_dialog = stat;
      if (val) {
        const obj = {
          label: `第${val.rank}名奖金${val.reward}`,
          rank: val.rank,
          reward: val.reward,
          selected: false,
          flagid: this.generateUUID()
        };
        console.log(obj);
        this.rankList.push(obj);
      }
    },
    updateStat_oversale (stat, value) {
      this.oversale_dialog = stat;
      if (value) {
        if (this.edit_oversale_flag) {
          console.log(value);
          this.data_oversale.splice(value._index, 1, value);
        } else {
          this.data_oversale.push(value);
        }
      }
    },
    updateStat_leader (stat, value) {
      this.leader_dialog = stat;
      if (value) {
        if (this.edit_leader_flag) {
          console.log(value);
          this.data_leader.splice(value._index, 1, value);
        } else {
          this.data_leader.push(value);
        }
      }
    },
    updateStat_manager (stat, value) {
      this.manager_dialog = stat;
      if (value) {
        if (this.edit_manager_flag) {
          console.log(value);
          this.data_manager.splice(value._index, 1, value);
        } else {
          console.log(value);
          this.data_manager.push(value);
        }
      }
    },
    cancel () {
      this.addformbase = Object.assign({}, defaultForm);
      this.$emit('updateStat', false);
    },
    Edit_team (row) {
      this.edit_team_flag = true;
      this.team_info = Object.assign({}, row);
      this.team_dialog = true;
    },
    Edit_oversale (row) {
      this.edit_oversale_flag = true;
      this.oversale_info = Object.assign({}, row);
      this.oversale_dialog = true;
    },
    Edit_leader (row) {
      this.edit_leader_flag = true;
      this.leader_info = Object.assign({}, row);
      this.leader_dialog = true;
    },
    Edit_manager (row) {
      this.edit_manager_flag = true;
      this.manager_info = Object.assign({}, row);
      this.manager_dialog = true;
    },
    handsave () {
      console.log(this.addformbase);
      this.addformbase.createId = this.$store.state.user.userLoginInfo.userId;
      this.addformbase.stat = 1;
      const data = JSON.stringify(this.addformbase);
      const data2 = JSON.stringify(this.data_team);
      const data3 = JSON.stringify(this.rankList);
      const data4 = JSON.stringify(this.data_oversale);
      const data5 = JSON.stringify(this.leaderform);
      const data6 = JSON.stringify(this.data_leader);
      const data7 = JSON.stringify(this.data_manager);
      const data8 = JSON.stringify(this.managerform);
      const temp = {
        repositoryLevelJson: data,
        commisonTeamRuleJson: data2,
        commisonTeamRankJson: data3,
        commisonTeamOverJson: data4,
        commisonLeaderRuleJson: data5,
        commisonLeaderFinishJson: data6,
        commisonManagerRuleJson: data7,
        commisonManagerRewardJson: data8
      };
      console.log('temp============================', temp);
      this.$refs['form'].validate(valid => {
        if (valid) {
          SalesRoomlevel.addSalesRoomlevel(temp).then(res => {
            if (res.ret === 200) {
              this.$emit('updateStat', false);
              this.addformbase = Object.assign({}, defaultForm);
              this.leaderform = Object.assign({}, defaultForm);
              this.managerform = Object.assign({}, defaultForm);
              this.data_team = [];
              this.data_oversale = [];
              this.data_leader = [];
              this.data_manager = [];
              this.$Message.success(res.msg);
            }
          });
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
.title {
  display: flex;
  .left {
    padding: 0 48px;
    flex: 1;
  }
  .rigth {
    flex: 1;
  }
}
.warpper {
  padding: 0 48px;
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
.rank_btn {
  padding-left: 80px;
}
</style>
