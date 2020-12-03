<template>
  <div>
    <Modal
      v-model="mymoadlStat"
      class="add"
      width="1024"
      :closable="false"
      :mask-closable="false"
      :transfer="false"
      fullscreen
    >
      <div slot="header" style="text-align:left;color:#fff;">
        <span>{{ $t("xjygrzlc") }}</span>
      </div>
      <div>
        <Card dis-hover>
          <div
            style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;"
          >
            <div
              style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"
            ></div>
            <div>{{ $t("xygxx") }}</div>
          </div>
          <Divider />
          <Form
            ref="form"
            :model="addformbase"
            label-position="right"
            :label-width="150"
            :rules="ruleValidate"
            inline
          >
            <FormItem :label="$t('bt')" prop="title" style="width:40%;">
              <Input v-model="addformbase.title"></Input>
            </FormItem>
            <FormItem :label="$t('jjcd')" prop="collectType" style="width:40%;">
              <Select v-model="addformbase.collectType">
                <Option :value="1">{{ $t("jinj") }}</Option>
                <Option :value="2">{{ $t("yiban") }}</Option>
                <Option :value="3">{{ $t("bzhongyao") }}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('ygxm')" prop="name" style="width:40%;">
              <Input
                v-model="addformbase.middleName"
                :placeholder="$t('xin')"
                style="width: 33.3%;"
              />
              <Input
                v-model="addformbase.lastName"
                :placeholder="$t('zhongjianmin')"
                style="width: 33.3%;"
              />
              <Input
                v-model="addformbase.firstName"
                :placeholder="$t('ming')"
                style="width: 33.3%;"
              />
            </FormItem>
            <FormItem :label="$t('xb')" prop="gender" style="width:40%;">
              <Select v-model="addformbase.gender">
                <Option :value="1">{{ $t("nan") }}</Option>
                <Option :value="2">{{ $t("nv") }}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('sfzh')" prop="idCard" style="width:40%;">
              <Input v-model="addformbase.idCard"></Input>
            </FormItem>
            <FormItem :label="$t('sjh')" prop="phone" style="width:40%;">
              <Input v-model="addformbase.phone"></Input>
            </FormItem>
            <FormItem :label="$t('sfzfj')" prop="name" style="width:40%;">
              <Upload
                :action="myupLoadUrl"
                :data="{ type: 4 }"
                :on-success="mysuccess"
              >
                <Button icon="ios-cloud-upload-outline">{{
                  $t("shangc")
                }}</Button>
              </Upload>
            </FormItem>
            <FormItem :label="$t('ygxp')" prop="name" style="width:40%;">
              <Upload
                :action="myupLoadUrl"
                :data="{ type: 4 }"
                :on-success="mysuccess2"
              >
                <Button icon="ios-cloud-upload-outline">{{
                  $t("shangc")
                }}</Button>
              </Upload>
            </FormItem>
          </Form>
          <div
            style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;"
          >
            <div
              style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"
            ></div>
            <div>{{ $t("gwxx") }}</div>
          </div>
          <Divider />
          <Form
            ref="form"
            :model="addformbase"
            label-position="right"
            :label-width="150"
            :rules="ruleValidate"
            inline
          >
            <FormItem :label="$t('sszz')" prop="organizeId" style="width:40%;">
              <Input
                v-model="addformbase.organizeId"
                readonly
                @click.native="showorg_ass"
              ></Input>
            </FormItem>
            <FormItem :label="$t('zssj')" prop="superiorId" style="width:40%;">
              <Input
                v-model="addformbase.superiorId"
                readonly
                @click.native="showemp_ass"
              />
            </FormItem>
            <FormItem :label="$t('ssgw')" prop="postId" style="width:40%;">
              <Select v-model="addformbase.levelId">
                <Option
                  v-for="item in postList"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.postName }}</Option
                >
              </Select>
            </FormItem>
            <FormItem :label="$t('jb')" prop="levelId" style="width:40%;">
              <Select v-model="addformbase.levelId">
                <Option
                  v-for="item in levelList"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.levelName }}</Option
                >
              </Select>
            </FormItem>
            <FormItem :label="$t('dgsj')" prop="onDate" style="width:40%;">
              <Input v-model="addformbase.onDate"></Input>
            </FormItem>
            <FormItem :label="$t('gzdd')" prop="workAddress" style="width:40%;">
              <Input v-model="addformbase.workAddress"></Input>
            </FormItem>
            <FormItem :label="$t('gwzz')" prop="postContent" style="width:40%;">
              <Input v-model="addformbase.postContent"></Input>
            </FormItem>
          </Form>
          <div
            style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;"
          >
            <div
              style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"
            ></div>
            <div>{{ $t("xtxx") }}</div>
          </div>
          <Divider />
          <Form
            ref="form"
            :model="addformbase"
            label-position="right"
            :label-width="150"
            :rules="ruleValidate"
            inline
          >
            <FormItem :label="$t('xtzh')" prop="account" style="width:40%;">
              <Input v-model="addformbase.account"></Input>
            </FormItem>
            <FormItem :label="$t('js')" prop="roleId" style="width:40%;">
              <Select v-model="addformbase.roleId">
                <Option
                  v-for="item in rolelist"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.roleName }}</Option
                >
              </Select>
            </FormItem>
          </Form>
          <div
            style="display:flex; align-items: center; border-bottom: 1px solid #e1e1e1;padding-bottom: 20px;"
          >
            <div
              style="width: 4px; height: 20px;background: #2d8cf0;margin-right: 15px"
            ></div>
            <div>
              {{ $t("pxxx") }}
              <Checkbox v-model="addformbase.isTrain">{{
                $t("sfxypx")
              }}</Checkbox>
            </div>
          </div>
          <Divider />
          <Form
            v-if="addformbase.isTrain"
            ref="form"
            :model="addformbase"
            label-position="right"
            :label-width="150"
            :rules="ruleValidate"
            inline
          >
            <FormItem :label="$t('pxhdmc')" prop="trainName" style="width:40%;">
              <Input v-model="addformbase.trainName"></Input>
            </FormItem>
            <FormItem :label="$t('pxfs')" prop="trainWay" style="width:40%;">
              <Select v-model="addformbase.trainWay">
                <Option :value="1">{{ $t("bzzzxpx") }}</Option>
                <Option :value="2">{{ $t("gsjtpx") }}</Option>
                <Option :value="3">{{ $t("wx") }}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('pxlex')" prop="trainType" style="width:40%;">
              <Input v-model="addformbase.trainType"></Input>
            </FormItem>
            <FormItem
              :label="$t('pxdd')"
              prop="trainAddress"
              style="width:40%;"
            >
              <Input v-model="addformbase.trainAddress"></Input>
            </FormItem>
            <FormItem :label="$t('kssj')" prop="beginTime" style="width:40%;">
              <DatePicker
                v-model="addformbase.beginTime"
                type="date"
                placeholder="Select date"
                style="width:100%;"
              ></DatePicker>
            </FormItem>
            <FormItem :label="$t('jssj')" prop="endTime" style="width:40%;">
              <DatePicker
                v-model="addformbase.endTime"
                type="date"
                placeholder="Select date"
                style="width:100%;"
              ></DatePicker>
            </FormItem>
            <FormItem
              :label="$t('pxfzr')"
              prop="trainHandle"
              style="width:40%;"
            >
              <Input
                v-model="addformbase.trainHandle"
                readonly
                @click.native="showemp_ass"
              ></Input>
            </FormItem>
            <FormItem :label="$t('sfxyks')" prop="isTest" style="width:40%;">
              <RadioGroup v-model="addformbase.isTest">
                <Radio :label="1">{{ $t('yes') }}</Radio>
                <Radio :label="2">{{ $t('no') }}</Radio>
              </RadioGroup>
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
    </Modal>
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
  </div>
</template>
<script>
import Tables from '@/components/tables';
import { roleApi } from '@/api/role';
import { levelApi } from '@/api/level';
import { positionApi } from '@/api/position';
import addemp from '../addemp_more/modal';
import addorg from '../add_org/modal';
export default {
  name: 'addModal',
  components: {
    Tables,
    addemp,
    addorg
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    },
    copyfile: null
  },
  created () {
    //
  },
  data () {
    const validatePass1 = (rule, value, callback) => {
      if (
        this.addformbase.collectType === '' ||
        this.addformbase.collectType === null ||
        this.addformbase.collectType === undefined
      ) {
        callback(new Error('Please enter your emp'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (
        this.addformbase.repositoryLevelId === '' ||
        this.addformbase.repositoryLevelId === null ||
        this.addformbase.repositoryLevelId === undefined
      ) {
        callback(new Error('Please enter your emp'));
      } else {
        callback();
      }
    };
    let baseUrl = process.env.VUE_APP_URL;
    return {
      visiable_emp: false,
      visiable_org: false,
      mytype: null,
      myupLoadUrl: baseUrl + '/upload/uploadpic',
      modal_loading: false,
      mymoadlStat: this.modalstat,
      addformbase: {},
      ruleValidate: {
        // name: [
        //   {
        //     required: true,
        //     message: 'The name cannot be empty',
        //     trigger: 'blur'
        //   }
        // ],
        // content: [
        //   {
        //     required: true,
        //     message: 'The content cannot be empty',
        //     trigger: 'blur'
        //   }
        // ],
        // collectType: [
        //   { required: true, validator: validatePass1, trigger: 'blur' }
        // ],
        // repositoryLevelId: [
        //   { required: true, validator: validatePass2, trigger: 'blur' }
        // ]
      },
      rolelist: [],
      levelList: [],
      postList: []
    };
  },
  watch: {
    modalstat () {
      this.mymoadlStat = this.modalstat;
      //
      if (this.mymoadlStat) {
        this.getrolelist();
        this.getLevellist();
        this.getPostlist();
      }
    }
  },
  methods: {
    getrolelist () {
      const searchform = {
        pageNum: 1,
        pageSize: 999
      };
      roleApi.getAllRole(searchform).then(res => {
        this.rolelist = res.data.content;
      });
    },
    getLevellist () {
      const searchform = {
        pageNum: 1,
        pageSize: 999
      };
      levelApi.levelList(searchform).then(res => {
        if (res.ret === 200) {
          this.levelList = res.data.content.list;
        } else {
          console.log('列表出错');
        }
      });
    },
    getPostlist () {
      const searchform = {
        pageNum: 1,
        pageSize: 999
      };
      positionApi.postList(searchform).then(res => {
        if (res.ret === 200) {
          this.postList = res.data.content.list;
        } else {
          console.log('列表出错');
        }
      });
    },
    mysuccess (response, file, fileList) {
      let id = response.data.content.picId;
      let picIds = response.data.content.picId;
      let picapath = response.data.content.picPath[0];
      this.$nextTick(() => {
        this.$set(this.addformbase, 'cardpicPath', picapath);
        this.addformbase.cardPic = picIds;
      });
    },
    mysuccess2 (response, file, fileList) {
      let id = response.data.content.picId;
      let picIds = response.data.content.picId;
      let picapath = response.data.content.picPath[0];
      this.$nextTick(() => {
        this.$set(this.addformbase, 'cardpicPath', picapath);
        this.addformbase.empPic = picIds;
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
    cancel () {
      this.$emit('updateStat', false);
    },
    handsave () {
      this.modal_loading = true;
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.addformbase.createId = this.$store.state.user.userLoginInfo.userId;
          this.addformbase.itemJson = JSON.stringify(this.mydataList);
          console.log(this.addformbase);
          indicatorSetApi.addindicator(this.addformbase).then(res => {
            this.$Message.success(this.$t('addSuccess'));
            this.modal_loading = false;
            this.$emit('updateStat', false);
          });
        } else {
          this.$Message.error('Fail!');
          this.modal_loading = false;
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
.ivu-tree-children {
  cursor: pointer;
  width: 100%;
}
.option-department {
  font-size: 14px;
  padding: 5px;
  cursor: pointer;
}
.option-department:hover {
  background-color: rgba(5, 170, 250, 0.2);
}
.departmentWrap {
  position: absolute;
  background-color: #ffffff;
  padding: 5px;
  border: 1px solid #dedede;
  width: 100%;
  z-index: 9;
  display: none;
  height: 250px;
  overflow-y: scroll;
}
</style>
