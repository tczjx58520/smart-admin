<template>
        <Modal v-model="mymoadlStat" class="add" width="1024" :closable="false" :mask-closable="false" :transfer="false" :styles="{top: '10px'}">
        <div slot="header" style="text-align:left;color:#fff;">
            <span>{{ $t('usermanage_view.adduser') }}</span>
        </div>
        <Tabs type="card" :animated="false">
            <!-- 开始步骤流程设置  -->
            <TabPane label="步骤设置" v-if="this.baseinfo._index === 0">
              <div>
                <Card dis-hover>
                <Form ref="form" :model="addformbase" label-position="right" :label-width="100" :rules="ruleValidate">
                    <FormItem :label="$t('processDesign_view.stepName')" prop="stepName">
                        <Input v-model="addformbase.action_name" readonly></Input>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.allowOperation')" >
                        <CheckboxGroup v-model="addformbase.Allow_action">
                            <Checkbox label="1">
                              <span>召回</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="2">
                              <span>撤销</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="3">
                              <span>发送短信</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.attachmentPermissions')" >
                        <CheckboxGroup v-model="addformbase.Attachment_permission">
                            <Checkbox label="1">
                              <span>添加附件</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="2">
                              <span>查看附件</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="3">
                              <span>修改附件</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="4">
                              <span>删除附件</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="5">
                              <span>下载附件</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.countersignAttachmentPermissions')" >
                        <CheckboxGroup v-model="addformbase.Countersign_Attachment_permission">
                            <Checkbox label="1">
                              <span>添加附件</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="2">
                              <span>查看附件</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="3">
                              <span>删除附件</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="4">
                              <span>下载附件</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.nextStep')">
                        <CheckboxGroup v-model="addformbase.Next_actions">
                            <Checkbox :label="item.id" v-for="(item, index) in stepList" :key="index">
                              <span>{{ item.stepName }}</span>
                            </Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                </Form>
                </Card>
              </div>
            </TabPane>
            <!-- 非开始步骤流程设置 -->
            <TabPane label="步骤设置" v-else>
              <div>
                <Card dis-hover>
                <Form ref="form" :model="addformbase" label-position="right" :label-width="200" :rules="ruleValidate">
                    <FormItem :label="$t('processDesign_view.stepName')" prop="stepName">
                        <Input v-model="addformbase.stepName"></Input>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.typeOfApplication')" prop="stepName">
                        <Select v-model="addformbase.typeOfApplication" style="width:100%;">
                            <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.Name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.allowOperation')" prop="stepName">
                        <CheckboxGroup v-model="addformbase.Allow_action">
                            <Checkbox label="1">
                              <span>{{ this.$t('processDesign_view.refuse') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="2">
                              <span>{{ this.$t('processDesign_view.countersign') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="3">
                              <span>{{ this.$t('processDesign_view.distribution') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="4">
                              <span>{{ this.$t('processDesign_view.return') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="5">
                              <span>{{ this.$t('processDesign_view.print') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="6">
                              <span>{{ this.$t('processDesign_view.reservations') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="7">
                              <span>{{ this.$t('processDesign_view.sendMessages') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.attachmentPermissions')" >
                        <CheckboxGroup v-model="addformbase.attachmentPermissions">
                            <Checkbox label="1">
                              <span>{{ this.$t('processDesign_view.addAttachments') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="2">
                              <span>{{ this.$t('processDesign_view.viewAttachments') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="3">
                              <span>{{ this.$t('processDesign_view.modifyAttachment') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="4">
                              <span>{{ this.$t('processDesign_view.deleteAttachment') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="5">
                              <span>{{ this.$t('processDesign_view.downloadAttachments') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="6">
                              <span>{{ this.$t('processDesign_view.archive') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.countersignAttachmentPermissions')" >
                        <CheckboxGroup v-model="addformbase.attachmentPermissions">
                            <Checkbox label="1">
                              <span>{{ this.$t('processDesign_view.addAttachments') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="2">
                              <span>{{ this.$t('processDesign_view.viewAttachments') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="3">
                              <span>{{ this.$t('processDesign_view.deleteAttachment') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="4">
                              <span>{{ this.$t('processDesign_view.downloadAttachments') }}</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.allowModificationOfFieldTypes')" >
                        <CheckboxGroup v-model="addformbase.Allow_action">
                            <Checkbox label="1">
                              <span>召回</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="2">
                              <span>撤销</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                            <Checkbox label="3">
                              <span>发送短信</span>
                              <Tooltip max-width="200" content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.">
                                  <Icon type="md-information-circle" :color="tipcolor"/>
                              </Tooltip>
                            </Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.processingTime')" >
                        <Input v-model="addformbase.stepName">
                          <span slot="append">小时</span>
                        </Input>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.urgeInAdvance')" >
                        <Input v-model="addformbase.stepName">
                          <span slot="append">分钟</span>
                        </Input>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.reminder')" >
                        <Select v-model="addformbase.reminder" style="width:100%;">
                            <Option v-for="item in reminderList" :value="item.id" :key="item.id">{{ item.Name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.signingAuthority')" >
                        <Input type="textarea" :placeholder="$t('processDesign_view.TipPerson')" v-model="addformbase.Countersign_permission_personsNames" :autosize="{minRows: 2,maxRows: 5}" style="width:40%;margin-right:20px;" readonly @click.native="showemp_exa"></Input>
                        <Input type="textarea" :placeholder="$t('processDesign_view.TipOrganization')" v-model="addformbase.Countersign__permission_organizeNames" style="width:40%;" :autosize="{minRows: 2,maxRows: 5}" readonly @click.native="showorg_exa"></Input>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.distributionRights')" >
                        <Input type="textarea" :placeholder="$t('processDesign_view.TipPerson')" v-model="addformbase.distribution_permission_personsNames" :autosize="{minRows: 2,maxRows: 5}" style="width:40%;margin-right:20px;" readonly @click.native="showemp_ass"></Input>
                        <Input type="textarea" :placeholder="$t('processDesign_view.TipOrganization')" v-model="addformbase.distribution__permission_organizeNames" style="width:40%;" :autosize="{minRows: 2,maxRows: 5}" readonly @click.native="showorg_ass"></Input>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.automaticDistributionStaff')" >
                        <Input v-model="addformbase.Auto_distribution_organizeNames" :placeholder="$t('processDesign_view.TipPerson')" readonly @click.native="showemp_viewer"></Input>
                    </FormItem>
                    <FormItem :label="$t('processDesign_view.nextStep')">
                        <CheckboxGroup v-model="addformbase.Next_actions">
                            <Checkbox :label="item.id" v-for="(item, index) in stepList" :key="index">
                              <span>{{ item.stepName }}</span>
                            </Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                </Form>
                </Card>
              </div>
            </TabPane>
            <!-- 经办角色 -->
            <TabPane label="经办人">
              <Divider orientation="left">角色设置</Divider>
              <div style="display:flex;" class="role">
                <div style="flex:1;">
                  <label for="">人员：</label>
                  <Transfer
                    :data="data_person"
                    :target-keys="targetKeys1"
                    :render-format="render1"
                    @on-change="handleChange1"
                    @on-selected-change="selected_person">
                  </Transfer>
                  <div class="button" style="margin-top:10px;display:flex;justify-content:flex-start;">
                    <Button type="primary" style="margin-right:10px;" @click="addperson">添加人员</Button>
                    <Button type="error" style="margin-right:10px;" @click="delperson">删除</Button>
                    <Button @click="clearperson">清空</Button>
                  </div>
                </div>
                <div style="flex:1;">
                  <label for="">角色：</label>
                  <Transfer
                    :data="data_role"
                    :target-keys="targetKeys1"
                    :render-format="render1"
                    @on-change="handleChange1"
                    @on-selected-change="selected_role">
                  </Transfer>
                  <div class="button" style="margin-top:10px;display:flex;justify-content:flex-start;">
                    <Button type="primary" style="margin-right:10px;" @click="addrole">添加角色</Button>
                    <Button type="error" style="margin-right:10px;" @click="delrole">删除</Button>
                    <Button @click="clearrole">清空</Button>
                  </div>
                </div>
                <div style="flex:1;">
                  <label for="">岗位：</label>
                  <Transfer
                    :data="data_position"
                    :target-keys="targetKeys1"
                    :render-format="render1"
                    @on-change="handleChange1"
                    @on-selected-change="selected_post">
                  </Transfer>
                  <div class="button" style="margin-top:10px;display:flex;justify-content:flex-start;">
                    <Button type="primary" style="margin-right:10px;" @click="addposition">添加岗位</Button>
                    <Button type="error" style="margin-right:10px;" @click="delposition">删除</Button>
                    <Button @click="clearposition">清空</Button>
                  </div>
                </div>
              </div>
              <Divider orientation="left">角色规则</Divider>
              <div style="display:flex;" class="role role2">
                <div style="flex:2;">
                  <label for="">角色规则：</label>
                  <Transfer
                    :data="data_rolerule"
                    :target-keys="targetKeys1"
                    :render-format="render1"
                    @on-change="handleChange1"
                    @on-selected-change="selected_rolerule">
                  </Transfer>
                  <div class="button" style="margin-top:10px;display:flex;justify-content:flex-start;">
                    <Button type="primary" style="margin-right:10px;" @click="addrolerule">添加规则</Button>
                    <Button type="error" style="margin-right:10px;" @click="delrolerule">删除</Button>
                    <Button @click="clearrolerule">清空</Button>
                  </div>
                </div>
                <div style="flex:1;">
                </div>
              </div>
            </TabPane>
            <TabPane label="条件设置">标签三的内容</TabPane>
        </Tabs>
        <div slot="footer">
            <ButtonGroup>
                <Button type="primary" size="large" :loading="modal_loading" @click="handsave">{{ $t('Save') }}</Button>
                <Button type="error" size="large"  @click="cancel">{{ $t('Close') }}</Button>
            </ButtonGroup>
        </div>
        <addemp :modalstat = "visiable_emp" :type="mytype" :memberId="addformbase" @updateStat = "updateStat_emp"></addemp>
        <addorg :modalstat = "visiable_org" :type="mytype" :memberId="addformbase" @updateStat = "updateStat_org"></addorg>
        <addpost :modalstat = "visiable_post" :memberId="addformbase" @updateStat = "updateStat_post"></addpost>
        <addrole :modalstat = "visiable_role" :memberId="addformbase" @updateStat = "updateStat_role"></addrole>
        <addrolerule :modalstat = "visiable_rolerule" :memberId="addformbase" @updateStat = "updateStat_rolerule"></addrolerule>
    </Modal>
</template>
<script>
import {
  salaryOptionApi
} from '@/api/salaryOption';
import addemp from '../addemp_more/modal';
import addorg from '../add_org/modal';
import addpost from '../addpost/modal';
import addrole from '../addrole/modal';
import addrolerule from '../addrolerule/modal';
export default {
  name: 'addShe',
  components: {
    addemp,
    addorg,
    addpost,
    addrole,
    addrolerule
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    editinfo: {
      type: Object,
      default: () => {
        return {
          _index: 0
        };
      }
    },
    stepinfo: null
  },
  created () {
    console.log('moadlStat=======>', this.modalstat);
  },
  mounted () {
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (this.addformbase.stepName === '' && this.addformbase.stepName === null && this.addformbase.stepName === undefined) {
        callback(new Error('Please enter your stepName'));
      } else {
        callback();
      }
    };
    return {
      data_position: [],
      selected_positionList: [],
      data_role: [],
      selected_roleList: [],
      data_person: [],
      selected_personList: [],
      data_rolerule: [],
      selected_roleruleList: [],
      // test
      targetKeys1: this.getTargetKeys(),
      // ==========================================
      mytype: null,
      // 新建员工弹窗
      visiable_emp: false,
      visiable_org: false,
      visiable_post: false,
      visiable_role: false,
      visiable_rolerule: false,
      reminderList: [
        {
          id: 1,
          Name: this.$t('processDesign_view.organiser')
        },
        {
          id: 2,
          Name: this.$t('processDesign_view.sponsor')
        },
        {
          id: 3,
          Name: this.$t('processDesign_view.organiserAndSponsor')
        },
        {
          id: 4,
          Name: this.$t('processDesign_view.noNotice')
        }
      ],
      stepList: [],
      typeList: [
        {
          id: 1,
          Name: this.$t('processDesign_view.agree')
        },
        {
          id: 2,
          Name: this.$t('processDesign_view.audit')
        },
        {
          id: 3,
          Name: this.$t('processDesign_view.approval')
        },
        {
          id: 4,
          Name: this.$t('processDesign_view.confirm')
        },
        {
          id: 5,
          Name: this.$t('processDesign_view.File')
        },
        {
          id: 6,
          Name: this.$t('processDesign_view.read')
        }
      ],
      tipcolor: '#ff9900',
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {
      },
      ruleValidate: {
        stepName: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      // 父件需要的基础信息
      baseinfo: null
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      this.baseinfo = this.editinfo;
      console.log('this.baseinfo======>', this.baseinfo);
      for (let i = 0; i < this.stepinfo.length; i++) {
        this.stepinfo[i].id = i + 1;
      }
      this.stepList = this.stepinfo;
      console.log('stepinfo==============', this.stepinfo);
      if (this.baseinfo._index === 0) {
        this.addformbase.action_name = this.$t('processDesign_view.start');
        this.addformbase.Allow_action = ['1', '2'];
        this.addformbase.Attachment_permission = ['1', '2', '3', '4', '5'];
        this.addformbase.Countersign_Attachment_permission = ['1', '2', '3', '4'];
      }
    },
    data_position: {
      handler () {
        this.addformbase.postlist = this.data_position;
      },
      deep: true
    },
    data_person: {
      handler () {
        this.addformbase.personList = this.data_person;
      },
      deep: true
    },
    data_role: {
      handler () {
        this.addformbase.roleList = this.data_role;
      },
      deep: true
    },
    data_rolerule: {
      handler () {
        this.addformbase.roleruleList = this.data_rolerule;
      },
      deep: true
    }
  },
  methods: {
    // test==============================================
    getMockData () {
      let mockData = [];
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: 'Content ' + i,
          description: 'The desc of content  ' + i
        });
      }
      return mockData;
    },
    getTargetKeys () {
    },
    // 添加人员
    addperson () {
      this.mytype = 4;
      this.visiable_emp = true;
    },
    selected_person (sourceSelectedKeys, targetSelectedKeys) {
      console.log('选中触发了=========================', sourceSelectedKeys, targetSelectedKeys);
      this.selected_personList = sourceSelectedKeys;
      console.log(this.selected_personList);
    },
    delperson () {
      console.log('this.selected_personList===', this.selected_personList);
      let a = this.data_person;
      let b = this.selected_personList;
      a = a.filter(function (item) {
        return b.indexOf(item.key) < 0;
      });
      this.data_person = a;
    },
    clearperson () {
      this.data_person = [];
    },
    // 添加岗位
    addposition () {
      this.visiable_post = true;
    },
    selected_post (sourceSelectedKeys, targetSelectedKeys) {
      console.log('选中触发了=========================', sourceSelectedKeys, targetSelectedKeys);
      this.selected_positionList = sourceSelectedKeys;
      console.log(this.selected_positionList);
    },
    delposition () {
      console.log('this.selected_positionList===', this.selected_positionList);
      let a = this.data_position;
      let b = this.selected_positionList;
      a = a.filter(function (item) {
        return b.indexOf(item.key) < 0;
      });
      this.data_position = a;
    },
    clearposition () {
      this.data_position = [];
    },
    // 添加角色
    addrole () {
      this.visiable_role = true;
    },
    selected_role (sourceSelectedKeys, targetSelectedKeys) {
      console.log('选中触发了=========================', sourceSelectedKeys, targetSelectedKeys);
      this.selected_roleList = sourceSelectedKeys;
      console.log(this.selected_roleList);
    },
    delrole () {
      console.log('this.selected_roleList===', this.selected_roleList);
      let a = this.data_role;
      let b = this.selected_roleList;
      a = a.filter(function (item) {
        return b.indexOf(item.key) < 0;
      });
      this.data_role = a;
    },
    clearrole () {
      this.data_role = [];
    },
    // 添加规则
    addrolerule () {
      this.visiable_rolerule = true;
    },
    selected_rolerule (sourceSelectedKeys, targetSelectedKeys) {
      console.log('选中触发了=========================', sourceSelectedKeys, targetSelectedKeys);
      this.selected_roleruleList = sourceSelectedKeys;
      console.log(this.selected_roleruleList);
    },
    delrolerule () {
      console.log('this.selected_roleruleList===', this.selected_roleruleList);
      let a = this.data_rolerule;
      let b = this.selected_roleruleList;
      a = a.filter(function (item) {
        return b.indexOf(item.key) < 0;
      });
      this.data_rolerule = a;
    },
    clearrolerule () {
      this.data_rolerule = [];
    },
    // ============================
    render1 (item) {
      return item.label;
    },
    handleChange1 (newTargetKeys, direction, moveKeys) {
      this.targetKeys1 = newTargetKeys;
    },
    // ===================end===============================
    updateStat_org (stat, orgList, type) {
      this.visiable_org = stat;
      console.log('选择组织=================》', orgList, type);
      if (orgList) {
        if (type === 1) {
          this.addformbase.Countersign__permission_organizeNames = orgList.organizationOaName;
          this.addformbase.Countersign__permission_organize = orgList.organizationOa;
        } else {
          this.addformbase.distribution__permission_organizeNames = orgList.organizationOaName;
          this.addformbase.distribution__permission_organize = orgList.organizationOa;
        }
      }
    },
    showorg_exa () {
      this.mytype = 1;
      this.visiable_org = true;
      console.log('this.mytype 传递前================>', this.mytype);
    },
    showorg_ass () {
      this.mytype = 2;
      this.visiable_org = true;
    },
    cocatobj (a, b) {
      const isEmpty = xs => xs.length === 0;
      const head = ([x, ...xs]) => x;
      const tail = ([x, ...xs]) => xs;
      const map = (f, ...xxs) => {
        let loop = (acc, xxs) => {
          if (xxs.some(isEmpty)) { return acc; } else { return loop([...acc, f(...xxs.map(head))], xxs.map(tail)); }
        };
        return loop([], xxs);
      };
      return map((label, key) => ({ label, key }), a, b);
    },
    // ======================
    updateStat_emp (stat, empList, type) {
      this.visiable_emp = stat;
      console.log('empList=======', empList);
      if (empList) {
        if (type === 1) {
          this.addformbase.Countersign_permission_personsNames = empList.names;
          this.addformbase.Countersign_permission_persons = empList.empIds;
        } else if (type === 3) {
          this.addformbase.Auto_distribution_organizeNames = empList.names;
          this.addformbase.Auto_distribution_organize = empList.empIds;
        } else if (type === 4) {
          console.log('empList==============', empList);
          if (empList) {
            this.addformbase.Handle_persons = empList.empIds.split(',');
            this.addformbase.Handle_personsNames = empList.names.split(',');
            this.data_person = this.cocatobj(this.addformbase.Handle_personsNames, this.addformbase.Handle_persons);
          }
        } else {
          this.addformbase.distribution_permission_personsNames = empList.names;
          this.addformbase.distribution_permission_persons = empList.empIds;
        }
      }
    },
    showemp_viewer () {
      this.mytype = 3;
      this.visiable_emp = true;
    },
    showemp_exa () {
      this.mytype = 1;
      this.visiable_emp = true;
    },
    showemp_ass () {
      this.mytype = 2;
      this.visiable_emp = true;
    },
    updateStat_post (stat, postlist) {
      console.log('postlist=======', postlist);
      this.visiable_post = stat;
      if (postlist) {
        let a = postlist.empIds.split(',');
        let b = postlist.names.split(',');
        this.data_position = this.cocatobj(b, a);
        console.log('this.data_position===========', this.data_position);
      }
    },
    updateStat_role (stat, rolelist) {
      this.visiable_role = stat;
      console.log('rolelist==============', rolelist);
      if (rolelist) {
        this.data_role = rolelist;
      }
    },
    updateStat_rolerule (stat, rolerulelist, rule) {
      this.visiable_rolerule = stat;
      if (rolerulelist) {
        this.data_rolerule = rolerulelist;
      }
      if (rule) {
        this.addformbase.role_rule_person = rule.personnel;
        this.addformbase.role_rule_organize = rule.organization;
      }
    },
    cancel () {
      this.$emit('updateStat', false);
    },
    reset () {
      this.addformbase = {
      };
      this.$refs['form'].resetFields();
    },
    handsave () {
      this.addformbase.createId = this.$store.state.user.userId;
      this.$refs['form'].validate((valid) => {
        console.log('valid======>', valid);
        if (valid) {
          salaryOptionApi.updatesalaryOption(this.addformbase).then(res => {
            if (res.ret === 200) {
              this.$emit('updateStat', false);
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
    .role /deep/ .ivu-transfer-operation {
      display: none;
    }
    .role /deep/ .ivu-transfer-list {
      width: 80%;
    }
    .role2 /deep/ .ivu-transfer-list {
      width: 90%;
    }
    .role /deep/ .ivu-transfer-list:nth-of-type(3) {
      display: none;
    }
</style>
