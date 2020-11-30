<template>
  <Modal
    v-model="mymoadlStat"
    class="add"
    width="720"
    :closable="false"
    :mask-closable="false"
  >
    <div slot="header" style="text-align: left; color: #fff">
      <span>{{ $t("tjpmjgz") }}</span>
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
          <FormItem :label="$t('khxmmc')" style="width: 80%" prop="nameId">
            <Select v-model="addformbase.nameId" clearable>
              <Option v-for="(item, index) in indicatorlist" :key="index" :value="item.id">{{ item.itemName }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('zblx')" style="width: 80%">
            <Select v-model="addformbase.itemType" clearable>
              <Option :value="1">{{ $t("lhzb") }}</Option>
              <Option :value="2">{{ $t("xwjzzb") }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('mbz')" style="width: 80%">
            <Input v-model="addformbase.target" />
          </FormItem>
          <FormItem :label="$t('qz')" style="width: 80%">
            <Input v-model="addformbase.weight" />
          </FormItem>
          <FormItem :label="$t('khbz')" style="width: 80%">
            <Input v-model="addformbase.scoreDesc" />
          </FormItem>
          <FormItem :label="$t('jgzly')" style="width: 80%">
            <RadioGroup v-model="addformbase.resultSource">
              <Radio :label="1">
                <span>{{ $t("bkhr") }}</span>
              </Radio>
              <Radio :label="2">
                <span>{{ $t("zdry") }}</span>
              </Radio>
              <Radio :label="3">
                <span>{{ $t("zdzz") }}</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem v-if="addformbase.resultSource === 2" :label="$t('xzry')" style="width: 80%">
            <Input
              v-model="addformbase.distribution_permission_personsNames"
              type="textarea"
              readonly
              @click.native="showemp_ass"
            />
          </FormItem>
          <FormItem v-if="addformbase.resultSource === 3" :label="$t('xzzz')" style="width: 80%">
            <Input
              v-model="addformbase.distribution__permission_organizeNames"
              type="textarea"
              readonly
              @click.native="showorg_ass"
            />
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
  </Modal>
</template>
<script>
import addemp from '../addemp_more/modal';
import addorg from '../add_org/modal';
import { indicatorSingle } from '@/api/indicatorSingle';
const defaultForm = {
  itemType: 1,
  target: 0,
  weight: 1,
  resultSource: 1
};
export default {
  name: 'add-team-modal',
  components: {
    addemp,
    addorg
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
    const validatePass1 = (rule, value, callback) => {
      if (this.addformbase.nameId === '' || this.addformbase.nameId === null || this.addformbase.nameId === undefined) {
        callback(new Error('Please enter your nameId'));
      } else {
        callback();
      }
    };
    return {
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: Object.assign({}, defaultForm),
      ruleValidate: {
        nameId: [
          {
            required: true,
            validator: validatePass1,
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
          key: 'repositoryName'
        },
        {
          title: this.$t('jjjs'),
          key: 'repositoryName'
        },
        {
          title: this.$t('cejs'),
          key: 'repositoryName'
        },
        {
          title: this.$t('yxtrjz'),
          key: 'repositoryName'
        },
        {
          title: this.$t('gz'),
          key: 'repositoryName'
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
                      this.Edit(params.row);
                    }
                  }
                },
                this.$t('Edit')
              )
            ]);
          }
        }
      ],
      data_team: [],
      indicatorlist: []
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        this.getindicatorlist();
        if (this.isedit) {
          this.addformbase = Object.assign({}, this.editinfo);
          if (this.addformbase.resultSource === 2 && !this.addformbase.distributionPermissionPersons) {
            this.addformbase.distributionPermissionPersons = this.addformbase.sourceIds;
            const temp = this.addformbase.sourceName.map(item => {
              return item;
            }).join(',');
            this.addformbase.distribution_permission_personsNames = temp;
          } else if (this.addformbase.resultSource === 3 && !this.addformbase.distributionPermissionOrganize) {
            this.addformbase.distributionPermissionOrganize = this.addformbase.sourceIds;
            const temp = this.addformbase.sourceName.map(item => {
              return item;
            }).join(',');
            this.addformbase.distribution__permission_organizeNames = temp;
          }
          console.log(this.addformbase);
        }
      }
    }
  },
  methods: {
    getindicatorlist () {
      this.loading = true;
      indicatorSingle.queryindicatorSingle().then(res => {
        this.loading = false;
        this.indicatorlist = res.data.content;
      });
    },
    showemp_ass () {
      this.mytype = 2;
      this.visiable_emp = true;
    },
    showorg_ass () {
      this.mytype = 2;
      this.visiable_org = true;
    },
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
    delteamrule () {},
    cancel () {
      this.addformbase = Object.assign({}, defaultForm);
      this.$emit('updateStat', false);
    },
    handsave () {
      if (this.addformbase.resultSource === 2) {
        this.addformbase.sourceName = this.addformbase.distribution_permission_personsNames.split(',');
        this.addformbase.sourceIds = this.addformbase.distributionPermissionPersons;
      } else if (this.addformbase.resultSource === 3) {
        this.addformbase.sourceName = this.addformbase.distribution__permission_organizeNames.split(',');
        this.addformbase.sourceIds = this.addformbase.distributionPermissionOrganize;
      }
      this.$refs['form'].validate(valid => {
        if (valid) {
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
</style>
