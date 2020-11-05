<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="1224"
    :closable="false"
    :mask-closable="false"
    :transfer="false"
    :styles="{ top: '10px' }"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>查看步骤</span>
    </div>
    <Tabs type="card" :animated="false">
      <!-- 开始步骤流程设置  -->
      <TabPane label="步骤设置" v-if="this.baseinfo._index === 0">
        <div>
          <Card dis-hover>
            <Form
              ref="form"
              :model="addformbase"
              label-position="right"
              :label-width="100"
              :rules="ruleValidate"
            >
              <FormItem
                :label="$t('processDesign_view.stepName')"
                prop="actionName"
              >
                <Input v-model="addformbase.actionName" readonly></Input>
              </FormItem>
              <FormItem :label="$t('processDesign_view.allowOperation')">
                <CheckboxGroup v-model="addformbase.allowAction">
                  <Checkbox label="1" disabled>
                    <span>召回</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="2" disabled>
                    <span>撤销</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="3" disabled>
                    <span>发送短信</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem :label="$t('processDesign_view.attachmentPermissions')">
                <CheckboxGroup v-model="addformbase.attachmentPermission">
                  <Checkbox label="1" disabled>
                    <span>添加附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="2" disabled>
                    <span>查看附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="3" disabled>
                    <span>修改附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="4" disabled>
                    <span>删除附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="5" disabled>
                    <span>下载附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem
                :label="
                  $t('processDesign_view.countersignAttachmentPermissions')
                "
              >
                <CheckboxGroup
                  v-model="addformbase.countersignAttachmentPermission"
                >
                  <Checkbox label="1" disabled>
                    <span>添加附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="2" disabled>
                    <span>查看附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="3" disabled>
                    <span>删除附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="4" disabled>
                    <span>下载附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem :label="$t('processDesign_view.nextStep')">
                <CheckboxGroup
                  v-model="addformbase.nextActions"
                  @on-change="updateSelect"
                >
                  <Checkbox
                    :label="item.serialNumber"
                    v-for="(item, index) in stepList"
                    disabled
                    :key="index"
                  >
                    <span>{{ item.actionName }}</span>
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
            <Form
              ref="form"
              :model="addformbase"
              label-position="right"
              :label-width="200"
              :rules="ruleValidate"
            >
              <FormItem
                :label="$t('processDesign_view.stepName')"
                prop="actionName"
              >
                <Input v-model="addformbase.actionName" readonly></Input>
              </FormItem>
              <FormItem
                :label="$t('processDesign_view.typeOfApplication')"
                prop="stepName"
              >
                <Select v-model="addformbase.type" style="width: 100%">
                  <Option
                    v-for="item in typeList"
                    :value="item.id"
                    :key="item.id"
                    disabled
                    >{{ item.Name }}</Option
                  >
                </Select>
              </FormItem>
              <FormItem
                :label="$t('processDesign_view.allowOperation')"
                prop="stepName"
              >
                <CheckboxGroup v-model="addformbase.allowAction">
                  <Checkbox label="1" disabled>
                    <span>{{ this.$t("processDesign_view.refuse") }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="2" disabled>
                    <span>{{ this.$t("processDesign_view.countersign") }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="3" disabled>
                    <span>{{
                      this.$t("processDesign_view.distribution")
                    }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="4" disabled>
                    <span>{{ this.$t("processDesign_view.return") }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="5" disabled>
                    <span>{{ this.$t("processDesign_view.print") }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="6" disabled>
                    <span>{{
                      this.$t("processDesign_view.reservations")
                    }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="7" disabled>
                    <span>{{
                      this.$t("processDesign_view.sendMessages")
                    }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem :label="$t('processDesign_view.attachmentPermissions')">
                <CheckboxGroup v-model="addformbase.attachmentPermission">
                  <Checkbox label="1" disabled>
                    <span>{{
                      this.$t("processDesign_view.addAttachments")
                    }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="2" disabled>
                    <span>{{
                      this.$t("processDesign_view.viewAttachments")
                    }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="3" disabled>
                    <span>{{
                      this.$t("processDesign_view.modifyAttachment")
                    }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="4" disabled>
                    <span>{{
                      this.$t("processDesign_view.deleteAttachment")
                    }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="5" disabled>
                    <span>{{
                      this.$t("processDesign_view.downloadAttachments")
                    }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="6" disabled>
                    <span>{{ this.$t("processDesign_view.archive") }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem
                :label="
                  $t('processDesign_view.countersignAttachmentPermissions')
                "
              >
                <CheckboxGroup
                  v-model="addformbase.countersignAttachmentPermission"
                >
                  <Checkbox label="1" disabled>
                    <span>{{
                      this.$t("processDesign_view.addAttachments")
                    }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="2" disabled>
                    <span>{{
                      this.$t("processDesign_view.viewAttachments")
                    }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="3" disabled>
                    <span>{{
                      this.$t("processDesign_view.deleteAttachment")
                    }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="4" disabled>
                    <span>{{
                      this.$t("processDesign_view.downloadAttachments")
                    }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem :label="$t('processDesign_view.processingTime')">
                <Input v-model="addformbase.actionTime" disabled>
                  <span slot="append">小时</span>
                </Input>
              </FormItem>
              <FormItem :label="$t('processDesign_view.urgeInAdvance')">
                <Input v-model="addformbase.urgeTime" disabled>
                  <span slot="append">分钟</span>
                </Input>
              </FormItem>
              <FormItem :label="$t('processDesign_view.reminder')">
                <Select v-model="addformbase.urgePersons" style="width: 100%">
                  <Option
                    v-for="item in reminderList"
                    :value="item.id"
                    :key="item.id"
                    disabled
                    >{{ item.Name }}</Option
                  >
                </Select>
              </FormItem>
              <FormItem :label="$t('processDesign_view.signingAuthority')">
                <Input
                  type="textarea"
                  :placeholder="$t('processDesign_view.TipPerson')"
                  v-model="addformbase.Countersign_permission_personsNames"
                  :autosize="{ minRows: 2, maxRows: 5 }"
                  style="width: 40%; margin-right: 20px"
                  readonly
                ></Input>
                <Input
                  type="textarea"
                  :placeholder="$t('processDesign_view.TipOrganization')"
                  v-model="addformbase.Countersign__permission_organizeNames"
                  style="width: 40%"
                  :autosize="{ minRows: 2, maxRows: 5 }"
                  readonly
                ></Input>
              </FormItem>
              <FormItem :label="$t('processDesign_view.distributionRights')">
                <Input
                  type="textarea"
                  :placeholder="$t('processDesign_view.TipPerson')"
                  v-model="addformbase.distribution_permission_personsNames"
                  :autosize="{ minRows: 2, maxRows: 5 }"
                  style="width: 40%; margin-right: 20px"
                  readonly
                ></Input>
                <Input
                  type="textarea"
                  :placeholder="$t('processDesign_view.TipOrganization')"
                  v-model="addformbase.distribution__permission_organizeNames"
                  style="width: 40%"
                  :autosize="{ minRows: 2, maxRows: 5 }"
                  readonly
                ></Input>
              </FormItem>
              <FormItem
                :label="$t('processDesign_view.automaticDistributionStaff')"
              >
                <Input
                  v-model="addformbase.Auto_distribution_organizeNames"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 5 }"
                  :placeholder="$t('processDesign_view.TipPerson')"
                  readonly
                ></Input>
              </FormItem>
              <FormItem :label="$t('processDesign_view.nextStep')">
                <CheckboxGroup
                  v-model="addformbase.nextActions"
                  @on-change="updateSelect"
                >
                  <Checkbox
                    :label="item.serialNumber"
                    v-for="(item, index) in stepList"
                    :key="index"
                    disabled
                  >
                    <span>{{ item.actionName }}</span>
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
        <div style="display: flex" class="role">
          <div style="flex: 1">
            <label for="">人员：</label>
            <Transfer
              :data="data_person"
              :target-keys="targetKeys1"
              :render-format="render1"
              @on-change="handleChange1"
              @on-selected-change="selected_person"
            >
            </Transfer>
            <div
              class="button"
              style="
                margin-top: 10px;
                display: flex;
                justify-content: flex-start;
              "
            >
              <!-- <Button
                type="primary"
                style="margin-right: 10px"
                @click="addperson"
                >添加人员</Button
              >
              <Button type="error" style="margin-right: 10px" @click="delperson"
                >删除</Button
              >
              <Button @click="clearperson">清空</Button> -->
            </div>
          </div>
          <div style="flex: 1">
            <label for="">岗位：</label>
            <Transfer
              :data="data_position"
              :target-keys="targetKeys1"
              :render-format="render1"
              @on-change="handleChange1"
              @on-selected-change="selected_post"
            >
            </Transfer>
            <div
              class="button"
              style="
                margin-top: 10px;
                display: flex;
                justify-content: flex-start;
              "
            >
              <!-- <Button
                type="primary"
                style="margin-right: 10px"
                @click="addposition"
                >添加岗位</Button
              >
              <Button
                type="error"
                style="margin-right: 10px"
                @click="delposition"
                >删除</Button
              >
              <Button @click="clearposition">清空</Button> -->
            </div>
          </div>
        </div>
        <Divider orientation="left">角色规则</Divider>
        <div style="display: flex" class="role role2">
          <div style="flex: 2">
            <label for="">角色规则：</label>
            <Transfer
              :data="data_rolerule"
              :target-keys="targetKeys1"
              :render-format="render1"
              @on-change="handleChange1"
              @on-selected-change="selected_rolerule"
            >
            </Transfer>
            <div
              class="button"
              style="
                margin-top: 10px;
                display: flex;
                justify-content: flex-start;
              "
            >
              <!-- <Button
                type="primary"
                style="margin-right: 10px"
                @click="addrolerule"
                >添加规则</Button
              >
              <Button
                type="error"
                style="margin-right: 10px"
                @click="delrolerule"
                >删除</Button
              >
              <Button @click="clearrolerule">清空</Button> -->
            </div>
          </div>
          <div style="flex: 1"></div>
        </div>
      </TabPane>
      <TabPane label="条件设置">
        <Card v-for="(item, index) in selected_step" :key="item.id">
          <p slot="title">
            <Icon type="md-fastforward" />
            转入步骤: {{ item.actionName }}
          </p>
          <div>
          </div>
          <div style="display: flex">
            <div style="flex: 7; display: flex">
              <div
                for=""
                style="color: #515a6e; font-size: 12px; margin-right: 15px"
              >
                条件公式:
              </div>
              <div class="condition">
                <ul class="conditionList">
                  <li
                    v-for="(items, index) in item.myformlua"
                    :class="[items.selected ? 'active' : 'li-hover']"
                    @click="selectedFormlua(index, item)"
                  >
                    {{ items.label }}
                  </li>
                </ul>
              </div>
            </div>
            <div
              style="flex: 3; display: flex; align-items: center; padding: 24px"
            >
              <!-- <div>
                <Button
                  @click="clearSingleRoleRule(item)"
                  style="display: block"
                  >删除</Button
                >
                <Button @click="clearAllRoleRule(item)" style="display: block"
                  >清空</Button
                >
              </div> -->
            </div>
          </div>
        </Card>
      </TabPane>
      <TabPane label="表单控件">
        <Table border :columns="columns_conditions" :data="data_conditions">
          <template slot-scope="{ row }" slot="label">
            <strong>{{ row.label }}</strong>
          </template>
          <template slot-scope="{ row }" slot="isVisibles">
            <RadioGroup v-model="row.isVisibles" disabled>
              <Radio :label="1" disabled>可见</Radio>
              <Radio :label="2" disabled>保密</Radio>
            </RadioGroup>
          </template>
        </Table>
      </TabPane>
    </Tabs>
    <div slot="footer">
      <ButtonGroup>
        <Button type="error" size="large" @click.native="cancel">{{
          $t("Close")
        }}</Button>
      </ButtonGroup>
    </div>
    <addemp
      :modalstat="visiable_emp"
      :type="mytype"
      :memberId="addformbase"
      @updateStat="updateStat_emp"
    ></addemp>
    <addorg
      :modalstat="visiable_org"
      :type="mytype"
      :memberId="addformbase"
      @updateStat="updateStat_org"
    ></addorg>
    <addpost
      :modalstat="visiable_post"
      :memberId="addformbase"
      @updateStat="updateStat_post"
    ></addpost>
    <addrole
      :modalstat="visiable_role"
      :memberId="addformbase"
      @updateStat="updateStat_role"
    ></addrole>
    <addrolerule
      :modalstat="visiable_rolerule"
      :memberId="addformbase"
      @updateStat="updateStat_rolerule"
    ></addrolerule>
  </Modal>
</template>
<script>
import { FlowApi } from '@/api/flow';
import { positionApi } from '@/api/position';
import { organization } from '@/api/organization';
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
    stepinfo: null,
    receiptType: null,
    actionName: null
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
    const validatePass2 = (rule, value, callback) => {
      if (
        this.addformbase.actionName === '' &&
        this.addformbase.actionName === null &&
        this.addformbase.actionName === undefined
      ) {
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
      addformbase: {},
      ruleValidate: {
        stepName: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      // 父件需要的基础信息
      baseinfo: {
        _index: 0
      },
      columns_conditions: [
        {
          title: this.$t('kjmc'),
          slot: 'label'
        },
        {
          title: this.$t('kjsfkj'),
          slot: 'isVisibles'
        }
      ],
      data_conditions: [],
      // 条件表单
      stepFormInfo: {
        myformlua: []
      },
      defautList: [
        // { value: 'a', label: '发起人姓名' },
        { value: 'b', label: '发起人岗位' },
        { value: 'c', label: '发起人所在组织' },
        // { value: 'd', label: '经办人姓名' },
        { value: 'e', label: '经办人岗位' },
        { value: 'f', label: '经办人所在组织' }
      ],
      conditionList: [
        { value: 1, label: '小于' },
        { value: 2, label: '大于' },
        { value: 3, label: '等于' },
        { value: 4, label: '小于等于' },
        { value: 5, label: '大于等于' },
        { value: 6, label: '不等于' }
      ],
      relationList: [
        { value: 1, label: '与' },
        { value: 2, label: '或' },
        { value: 3, label: '非' }
      ],
      selected_step: [],
      selectIndex: null,
      postValue: [],
      orgValue: [],
      selectOrg: null
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.modalstat) {
        this.baseinfo = this.editinfo;
        this.addformbase = this.editinfo;
        if (this.addformbase.viewFlag) {
          return false;
        }
        console.log(this.addformbase);
        this.stepList = this.stepinfo;
        this.addformbase.allowAction = this.addformbase.allowAction && this.addformbase.allowAction.split(',');
        this.addformbase.attachmentPermission = this.addformbase.attachmentPermission && this.addformbase.attachmentPermission.split(',');
        this.addformbase.countersignAttachmentPermission = this.addformbase.countersignAttachmentPermission && this.addformbase.countersignAttachmentPermission.split(',');
        this.addformbase.nextActions = this.addformbase.stepNextConditionVos.map(item => { return item.nextSerialNumber; });
        if (this.baseinfo._index !== 0) {
          this.addformbase.urgePersons = Number(this.addformbase.urgePersons);
          this.addformbase.Countersign_permission_personsNames = this.addformbase.countersignPermissionPersons && this.addformbase.countersignEmpList.map(item => {
            return item.empName;
          }).join(',');
          this.addformbase.Countersign__permission_organizeNames = this.addformbase.countersignPermissionOrganize && this.addformbase.countersignOrganize.map(item => {
            return item.organizeName;
          }).join(',');
          this.addformbase.distribution_permission_personsNames = this.addformbase.distributionPermissionPersons && this.addformbase.distributionEmpList.map(item => {
            return item.empName;
          }).join(',');
          this.addformbase.distribution__permission_organizeNames = this.addformbase.distributionPermissionOrganize && this.addformbase.distributionOrganize.map(item => {
            return item.organizeName;
          }).join(',');
          this.addformbase.Auto_distribution_organizeNames = this.addformbase.autoDistributionPersons && this.addformbase.autoDistributionEmpList.map(item => {
            return item.empName;
          }).join(',');
        }
        this.addformbase.viewFlag = 1;
        this.data_conditions = this.addformbase.flowContentVos;
        // 转换经办条件可以选择的值
        this.data_position = this.addformbase.handlePost.map(item => {
          return {
            key: item.id,
            label: item.postName
          };
        });
        this.data_person = this.addformbase.handleEmpList.map(item => {
          return {
            key: item.empId,
            label: item.empName
          };
        });
        this.data_rolerule = this.addformbase.roleruleList;
        if (this.receiptType && this.mymoadlStat) {
          this.selected_step = this.addformbase.stepNextConditionVos;
        }
      }
    }
  },
  methods: {
    getPostValue () {
      const searchForm = {
        pageNum: 1,
        pageSize: 9999
      };
      positionApi.postList(searchForm).then(res => {
        this.postValue = res.data.content.list;
      });
    },
    deepLoop (list) {
      for (let i = 0; i < list.length; i++) {
        list[i].label = list[i].organizeName;
        list[i].value = list[i].id;
        if (list[i].children.length > 0) {
          this.deepLoop(list[i].children);
        }
      }
    },
    getOrgValue () {
      organization.organizationlist().then(res => {
        console.log(res.data.content);
        this.deepLoop(res.data.content);
        this.orgValue = res.data.content;
      });
    },
    selectedFormlua (index, item) {
      const hadExistStatus = item.myformlua[index].selected;
      for (let i = 0; i < item.myformlua.length; i++) {
        item.myformlua[i].selected = false;
      }
      item.myformlua[index].selected = !hadExistStatus;
      if (!hadExistStatus) {
        this.selectIndex = index;
      } else {
        this.selectIndex = null;
      }
      console.log('item======', this.selectIndex);
    },
    async getReceiptContent () {
      const res = await FlowApi.getFlowContent(this.receiptType);
      const arr = res.data.content.split(',');
      const temp = arr.map((item) => {
        const temp = item.split(':');
        return {
          value: temp[0],
          label: temp[1],
          isVisibles: 1
        };
      });
      const newarr = this._.concat(this.defautList, temp);
      this.defautList = this._.unionBy(newarr, 'value');
      this.data_conditions = temp;
    },
    addLeftKuo (item) {
      const temp = {
        label: '(',
        selected: false
      };
      item.myformlua.push(temp);
    },
    addRightKuo (item) {
      const temp = {
        label: ')',
        selected: false
      };
      item.myformlua.push(temp);
    },
    getSelectValue (val, selectedData) {
      console.log(val, selectedData);
      const length = selectedData.length;
      this.selectOrg = selectedData[length - 1].label;
    },
    updateSelect (val) {
      const arr = [];
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < this.stepList.length; j++) {
          if (val[i] === this.stepList[j].myid) {
            this.$set(this.stepList[j], 'myformlua', []);
            arr.push(this.stepList[j]);
          }
        }
      }
      this.selected_step = arr.slice(0);
    },
    getTargetKeys () {},
    // 添加人员
    addperson () {
      this.mytype = 4;
      this.visiable_emp = true;
    },
    selected_person (sourceSelectedKeys, targetSelectedKeys) {
      // console.log('选中触发了=========================', sourceSelectedKeys, targetSelectedKeys);
      this.selected_personList = sourceSelectedKeys;
    },
    delperson () {
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
      this.selected_positionList = sourceSelectedKeys;
    },
    delposition () {
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
      this.selected_roleList = sourceSelectedKeys;
    },
    delrole () {
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
      this.selected_roleruleList = sourceSelectedKeys;
    },
    delrolerule () {
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
    clearSingleRoleRule (item) {
      if (this.selectIndex !== null) {
        item.myformlua.splice(this.selectIndex, 1);
      } else {
        this.$Message.warning('请选择删除列');
      }
    },
    clearAllRoleRule (item) {
      item.myformlua = [];
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
      if (orgList) {
        if (type === 1) {
          this.addformbase.Countersign__permission_organizeNames =
            orgList.organizationOaName;
          this.addformbase.countersignPermissionOrganize =
            orgList.organizationOa;
        } else {
          this.addformbase.distribution__permission_organizeNames =
            orgList.organizationOaName;
          this.addformbase.distributionPermissionOrganize =
            orgList.organizationOa;
        }
      }
    },
    showorg_exa () {
      this.mytype = 1;
      this.visiable_org = true;
    },
    showorg_ass () {
      this.mytype = 2;
      this.visiable_org = true;
    },
    cocatobj (a, b) {
      const isEmpty = (xs) => xs.length === 0;
      const head = ([x, ...xs]) => x;
      const tail = ([x, ...xs]) => xs;
      const map = (f, ...xxs) => {
        let loop = (acc, xxs) => {
          if (xxs.some(isEmpty)) {
            return acc;
          } else {
            return loop([...acc, f(...xxs.map(head))], xxs.map(tail));
          }
        };
        return loop([], xxs);
      };
      return map((label, key) => ({ label, key }), a, b);
    },
    // ======================
    updateStat_emp (stat, empList, type) {
      this.visiable_emp = stat;
      if (empList) {
        if (type === 1) {
          this.addformbase.Countersign_permission_personsNames = empList.names;
          this.addformbase.countersignPermissionPersons = empList.empIds;
        } else if (type === 3) {
          this.addformbase.Auto_distribution_organizeNames = empList.names;
          this.addformbase.autoDistributionPersons = empList.empIds;
        } else if (type === 4) {
          if (empList) {
            this.addformbase.handlePersons = empList.empIds.split(',');
            this.addformbase.Handle_personsNames = empList.names.split(',');
            this.data_person = this.cocatobj(
              this.addformbase.Handle_personsNames,
              this.addformbase.handlePersons
            );
          }
        } else {
          this.addformbase.distribution_permission_personsNames = empList.names;
          this.addformbase.distributionPermissionPersons = empList.empIds;
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
      this.visiable_post = stat;
      if (postlist) {
        let a = postlist.empIds.split(',');
        let b = postlist.names.split(',');
        this.data_position = this.cocatobj(b, a);
      }
    },
    updateStat_role (stat, rolelist) {
      this.visiable_role = stat;
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
        this.addformbase.rulePostId = rule.personnel;
        this.addformbase.ruleOrganizeType = rule.organization;
      }
    },
    cancel () {
      console.log('执行===========================');
      this.$emit('updateStat', false);
    },
    reset () {
      this.addformbase = {};
      this.$refs['form'].resetFields();
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
</style>
