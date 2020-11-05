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
      <span>{{ $t("usermanage_view.adduser") }}</span>
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
                  <Checkbox label="1">
                    <span>召回</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="2">
                    <span>撤销</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="3">
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
                  <Checkbox label="1">
                    <span>添加附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="2">
                    <span>查看附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="3">
                    <span>修改附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="4">
                    <span>删除附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="5">
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
                  <Checkbox label="1">
                    <span>添加附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="2">
                    <span>查看附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="3">
                    <span>删除附件</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="4">
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
                    :label="item.myid"
                    v-for="(item, index) in stepList"
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
                    >{{ item.Name }}</Option
                  >
                </Select>
              </FormItem>
              <FormItem
                :label="$t('processDesign_view.allowOperation')"
                prop="stepName"
              >
                <CheckboxGroup v-model="addformbase.allowAction">
                  <Checkbox label="1">
                    <span>{{ this.$t("processDesign_view.refuse") }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="2">
                    <span>{{ this.$t("processDesign_view.countersign") }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="3">
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
                  <Checkbox label="4">
                    <span>{{ this.$t("processDesign_view.return") }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="5">
                    <span>{{ this.$t("processDesign_view.print") }}</span>
                    <Tooltip
                      max-width="200"
                      content="Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc."
                    >
                      <Icon type="md-information-circle" :color="tipcolor" />
                    </Tooltip>
                  </Checkbox>
                  <Checkbox label="6">
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
                  <Checkbox label="7">
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
                  <Checkbox label="1">
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
                  <Checkbox label="2">
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
                  <Checkbox label="3">
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
                  <Checkbox label="4">
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
                  <Checkbox label="5">
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
                  <Checkbox label="6">
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
                  <Checkbox label="1">
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
                  <Checkbox label="2">
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
                  <Checkbox label="3">
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
                  <Checkbox label="4">
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
                <Input v-model="addformbase.actionTime">
                  <span slot="append">小时</span>
                </Input>
              </FormItem>
              <FormItem :label="$t('processDesign_view.urgeInAdvance')">
                <Input v-model="addformbase.urgeTime">
                  <span slot="append">分钟</span>
                </Input>
              </FormItem>
              <FormItem :label="$t('processDesign_view.reminder')">
                <Select v-model="addformbase.urgePersons" style="width: 100%">
                  <Option
                    v-for="item in reminderList"
                    :value="item.id"
                    :key="item.id"
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
                  @click.native="showemp_exa"
                ></Input>
                <Input
                  type="textarea"
                  :placeholder="$t('processDesign_view.TipOrganization')"
                  v-model="addformbase.Countersign__permission_organizeNames"
                  style="width: 40%"
                  :autosize="{ minRows: 2, maxRows: 5 }"
                  readonly
                  @click.native="showorg_exa"
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
                  @click.native="showemp_ass"
                ></Input>
                <Input
                  type="textarea"
                  :placeholder="$t('processDesign_view.TipOrganization')"
                  v-model="addformbase.distribution__permission_organizeNames"
                  style="width: 40%"
                  :autosize="{ minRows: 2, maxRows: 5 }"
                  readonly
                  @click.native="showorg_ass"
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
                  @click.native="showemp_viewer"
                ></Input>
              </FormItem>
              <FormItem :label="$t('processDesign_view.nextStep')">
                <CheckboxGroup
                  v-model="addformbase.nextActions"
                  @on-change="updateSelect"
                >
                  <Checkbox
                    :label="item.myid"
                    v-for="(item, index) in stepList"
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
              <Button
                type="primary"
                style="margin-right: 10px"
                @click="addperson"
                >添加人员</Button
              >
              <Button type="error" style="margin-right: 10px" @click="delperson"
                >删除</Button
              >
              <Button @click="clearperson">清空</Button>
            </div>
          </div>
          <!-- <div style="flex: 1">
            <label for="">角色：</label>
            <Transfer
              :data="data_role"
              :target-keys="targetKeys1"
              :render-format="render1"
              @on-change="handleChange1"
              @on-selected-change="selected_role"
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
              <Button type="primary" style="margin-right: 10px" @click="addrole"
                >添加角色</Button
              >
              <Button type="error" style="margin-right: 10px" @click="delrole"
                >删除</Button
              >
              <Button @click="clearrole">清空</Button>
            </div>
          </div> -->
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
              <Button
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
              <Button @click="clearposition">清空</Button>
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
              <Button
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
              <Button @click="clearrolerule">清空</Button>
            </div>
          </div>
          <div style="flex: 1"></div>
        </div>
      </TabPane>
      <TabPane label="条件设置">
        <Card v-for="(item, index) in selected_step" :key="item.myid">
          <p slot="title">
            <Icon type="md-fastforward" />
            转入步骤: {{ item.actionName }}
          </p>
          <div>
            <Form ref="formInline" :model="stepFormInfo" inline>
              <Row>
                <Col span="5">
                  <FormItem prop="user" label="控件列表:" style="display: flex">
                    <Select v-model="item.calcCadition1" filterable clearable>
                      <Option
                        v-for="item in defautList"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem prop="password" label="条件:" style="display: flex">
                    <Select v-model="item.calcCadition2" filterable clearable>
                      <Option
                        v-for="item in conditionList"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem prop="password" label="值:" style="display: flex">
                    <Select v-if="item.calcCadition1 === 'b'" v-model="item.value" filterable style="width: 200px">
                      <Option
                        v-for="item in postValue"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.postName }}</Option
                      >
                    </Select>
                    <Cascader v-else-if="item.calcCadition1 === 'c'" :data="orgValue" v-model="item.value2" filterable style="width: 200px" change-on-select @on-change="getSelectValue"></Cascader>
                    <Select v-else-if="item.calcCadition1 === 'e'" v-model="item.value" filterable style="width: 200px">
                      <Option
                        v-for="item in postValue"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.postName }}</Option
                      >
                    </Select>
                    <Cascader v-else-if="item.calcCadition1 === 'f'" :data="orgValue" v-model="item.value2" filterable style="width: 200px" change-on-select @on-change="getSelectValue"></Cascader>
                    <!-- 判断值的输入 -->
                    <Input v-else v-model="item.value" placeholder="value"></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem prop="password" label="关系:" style="display: flex">
                    <Select v-model="item.calcCadition3" filterable clearable>
                      <Option
                        v-for="item in relationList"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
                <Col span="3">
                  <FormItem prop="password">
                    <Button @click="addLeftKuo(item)">（</Button>
                    <Button @click="addRightKuo(item)">）</Button>
                  </FormItem>
                </Col>
                <Col span="1">
                  <FormItem>
                    <Button
                      type="primary"
                      @click="handleSubmit('formInline', item)"
                      >{{ $t("tj") }}</Button
                    >
                  </FormItem>
                </Col>
              </Row>
            </Form>
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
              <div>
                <Button
                  @click="clearSingleRoleRule(item)"
                  style="display: block"
                  >删除</Button
                >
                <Button @click="clearAllRoleRule(item)" style="display: block"
                  >清空</Button
                >
              </div>
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
            <RadioGroup v-model="row.isVisibles">
              <Radio :label="1">可见</Radio>
              <Radio :label="2">保密</Radio>
            </RadioGroup>
          </template>
        </Table>
      </TabPane>
    </Tabs>
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
      this.baseinfo = this.editinfo;
      this.addformbase = this.editinfo;
      console.log('this.addformbase========', this.addformbase);
      this.stepList = this.stepinfo;
      if (this.receiptType && this.mymoadlStat) {
        this.getPostValue();
        this.getOrgValue();
        this.getReceiptContent();
        this.$set(this.addformbase, 'nextActions', [this.stepList[0].myid]);
        const arr = [];
        for (let i = 0; i < this.addformbase.nextActions.length; i++) {
          for (let j = 0; j < this.stepList.length; j++) {
            if (this.addformbase.nextActions[i] === this.stepList[j].myid) {
              this.$set(this.stepList[j], 'myformlua', []);
              arr.push(this.stepList[j]);
            }
          }
        }
        this.selected_step = arr.slice(0);
      }
      if (this.baseinfo._index === 0) {
        this.addformbase.actionName = this.$t('processDesign_view.start');
        this.$set(this.addformbase, 'allowAction', ['1', '2']);
        this.$set(this.addformbase, 'attachmentPermission', [
          '1',
          '2',
          '3',
          '4',
          '5'
        ]);
        this.$set(this.addformbase, 'countersignAttachmentPermission', [
          '1',
          '2',
          '3',
          '4'
        ]);
      } else {
        this.addformbase.actionName = this.actionName;
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
    handleSubmit (form, selected) {
      const value =
        selected.calcCadition1 &&
        this.defautList.filter((item) => {
          return item.value === selected.calcCadition1;
        })[0].label;
      const value2 =
        selected.calcCadition2 &&
        this.conditionList.filter((item) => {
          return item.value === selected.calcCadition2;
        })[0].label;
      const value3 =
        selected.calcCadition3 &&
        this.relationList.filter((item) => {
          return item.value === selected.calcCadition3;
        })[0].label;
      let addvalue = null;
      let calcCadition4 = null;
      switch (selected.calcCadition1) {
        case 'b':
          addvalue = this.postValue.filter(item => {
            return item.id === selected.value;
          })[0].postName;
          calcCadition4 = selected.value;
          break;
        case 'e':
          addvalue = this.postValue.filter(item => {
            return item.id === selected.value;
          })[0].postName;
          calcCadition4 = selected.value;
          break;
        case 'c':
          addvalue = this.selectOrg;
          calcCadition4 = selected.value2[selected.value2.length - 1];
          break;
        case 'f':
          addvalue = this.selectOrg;
          calcCadition4 = selected.value2[selected.value2.length - 1];
          break;
        default:
          addvalue = selected.value;
          break;
      }
      const fin = `${value3 || ''} ${value || ''} ${value2 || ''} ${
        addvalue
      }`;
      selected.myformlua.push({
        label: fin,
        selected: false,
        calcCadition1: selected.calcCadition1,
        calcCadition2: selected.calcCadition2,
        calcCadition3: selected.calcCadition3,
        calcCadition4
      });
      selected.calcCadition1 = null;
      selected.calcCadition2 = null;
      selected.calcCadition3 = null;
      selected.value = '';
      console.log(selected);
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
      console.log('data_person=======', this.data_person);
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
      this.$emit('updateStat', false);
    },
    reset () {
      this.addformbase = {};
      this.$refs['form'].resetFields();
    },
    handsave () {
      if (this.addformbase.nextActions.length === 0) {
        this.$Message.warning(this.$t('qxzxyczbz'));
      }
      console.log(this.addformbase, this.data_conditions);
      this.addformbase.handlePersons = this.data_person
        .map((item) => {
          return item.key;
        })
        .join(',');
      this.addformbase.handlePosts = this.data_position
        .map((item) => {
          return item.key;
        })
        .join(',');
      const FlowContent = this.data_conditions;
      this.$emit(
        'updateStat',
        false,
        this.addformbase,
        this.selected_step,
        FlowContent
      );
      // this.addformbase.createId = this.$store.state.user.userLoginInfo.userId;
      // this.$refs['form'].validate((valid) => {
      //   if (valid) {

      //   } else {
      //     this.$Message.error('Fail!');
      //   }
      // });
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
