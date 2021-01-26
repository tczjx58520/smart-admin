<template>
  <Modal v-model="mymoadlStat"
         class="add"
         :closable="false"
         :mask-closable="false"
         :transfer="false"
         fullscreen>
    <div slot="header"
         style="text-align: left; color: #fff">
      <span>{{ $t("tjpxzl") }}</span>
    </div>
    <div>
      <Card dis-hover>
        <!-- 内容区域 -->
        <Tabs value="name1"
              :animated="false">
          <div>
            <TabPane :label="$t('zwsx')"
                     name="name1">
              <Form ref="form2"
                    :model="leaderform"
                    label-position="right"
                    :label-width="150"
                    :rules="ruleValidate"
                    inline>
                <FormItem :label="$t('danganmingchen')"
                          style="width: 40%">
                  <Input v-model="leaderform.materialName" />
                </FormItem>
                <FormItem :label="$t('danganbianhao')"
                          style="width: 40%">
                  <Input v-model="leaderform.materialNo" />
                </FormItem>
                <!-- <FormItem :label="$t('wendangfenlei')" style="width: 40%">
                  <Input v-model="leaderform.classificationId" />
                </FormItem> -->
                <FormItem :label="$t('wendangsuoyouzhe')"
                          style="width: 40%"
                          @click.native="selectemp('ownerId')">
                  <Input v-model="leaderform.ownerName" />
                </FormItem>
                <!-- <FormItem :label="$t('suoshubumen')" style="width: 40%">
                  <Select
                    v-model="leaderform.deptId"
                    filterable
                    :transfer="true"
                  >
                    <Option
                      v-for="item in postData"
                      :value="item.id"
                      :key="item.id"
                      >{{ item.postName }}</Option
                    >
                  </Select>
                </FormItem> -->
                <FormItem :label="$t('baoguanzuzhi')"
                          style="width: 40%"
                          @click.native="showorg_ass">
                  <Input v-model="leaderform.organizationName" />
                </FormItem>
                <FormItem :label="$t('baoguanyuan')"
                          style="width: 40%"
                          @click.native="selectemp('employeeId')">
                  <Input v-model="leaderform.employeeName" />
                </FormItem>
              </Form>
            </TabPane>
            <TabPane :label="$t('zwnr')"
                     name="name2">
              <Editor v-model="leaderform.materialBody" />
            </TabPane>
            <TabPane :label="$t('fjxx')"
                     name="name3">
              <Upload :action="myupLoadUrl"
                      :data="{ type: 7 }"
                      :on-success="mysuccess">
                <Button type="primary"
                        icon="ios-cloud-upload-outline">{{$t('add')}}</Button>
              </Upload>

              <!-- <Table :columns="enclosureColumns"
                     style="margin-top:20px"
                     :data="enclosureData">
                <template slot-scope="{ row, index }"
                          slot="action">
                  <Button type="primary"
                          size="small"
                          style="margin-right: 5px"
                          @click="load(index)">{{$t('load')}}</Button>
                  <Button type="primary"
                          size="small"
                          style="margin-right: 5px"
                          @click="remove(index)">{{$t('remove')}}</Button>
                </template>
              </Table> -->
            </TabPane>
          </div>
        </Tabs>
      </Card>
    </div>
    <div slot="footer">
      <ButtonGroup>
        <Button type="primary"
                size="large"
                :loading="modal_loading"
                @click="handsave">{{ $t("Save") }}</Button>
        <Button type="error"
                size="large"
                @click="cancel">{{
          $t("Close")
        }}</Button>
      </ButtonGroup>
    </div>
    <addempSingle :modalstat="visiable"
                  @updateStat="updateStat"></addempSingle>
    <addorg :modalstat="visiable_org"
            :type="mytype"
            :memberId="leaderform"
            @updateStat="updateStat_org"></addorg>
  </Modal>
</template>
<script>
import Editor from '@/components/editor/editor';
import 'wangeditor/release/wangEditor.min.css';
import { training } from '@/api/traning';
import addempSingle from '../addemp_single/modal';
import addorg from '../add_org/modal';
import { positionApi } from '@/api/position';
const defaultleaderform = {
  attachments: [],
  materialBody: null
};
export default {
  name: 'addModal',
  components: {
    Editor,
    addempSingle,
    addorg
  },
  props: {
    modalstat: {
      type: Boolean,
      default: false
    }
  },
  created () { },
  mounted () { },
  data () {
    let baseUrl = process.env.VUE_APP_URL;
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (
        this.leaderform.organizationOaName === '' &&
        this.leaderform.organizationOaName === null &&
        this.leaderform.organizationOaName === undefined
      ) {
        callback(new Error('Please enter your organization'));
      } else {
        callback();
      }
    };
    return {
      myupLoadUrl: baseUrl + '/upload/uploadpic',
      enclosureColumns: [{
        title: this.$t('enclosureName'),
        key: 'attachmentName'
      },
      {
        title: this.$t('uploadTime'),
        key: 'createTime'
        // render: (h, params) => {
        //   console.log(params.row.createTime);
        //   return h('span', this.formate(params.row.createTime * 1000));
        // }
      },
      {
        title: this.$t('uploadMan'),
        key: 'createName'
      },
      {
        title: this.$t('action'),
        slot: 'action',
        width: 150,
        align: 'center'
      }

      ],
      enclosureData: [],
      visiable: false,
      isShowTree: false,
      visiable_org: false,
      mytype: 1,
      statList: [
        {
          label: this.$t('usermanage_view.working'),
          value: 1
        },
        {
          label: this.$t('usermanage_view.Quit'),
          value: 2
        }
      ],
      modal_loading: false,
      mymoadlStat: this.modalstat,
      ruleValidate: {
        firstname: [
          {
            required: true,
            message: 'The firstname cannot be empty',
            trigger: 'blur'
          }
        ],
        middlename: [
          {
            required: true,
            message: 'The middlename cannot be empty',
            trigger: 'blur'
          }
        ]
      },
      leaderform: Object.assign({}, defaultleaderform),
      backvalue: null,
      postData: []
    };
  },
  watch: {
    async modalstat () {
      this.mymoadlStat = this.modalstat;
      if (this.mymoadlStat) {
        this.getPostlist();
      }
    }
  },
  methods: {
    // formate (val) {
    //   let date = new Date(val);
    //   let YY = date.getFullYear() + '-';
    //   let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    //   let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    //   let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    //   let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    //   let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    //   return YY + MM + DD + ' ' + hh + mm + ss;
    // },
    mysuccess (response, file, fileList) {
      // console.log(this.$store.state.user.userLoginInfo.userId);
      const data = {
        attachmentName: file.name,
        createName: this.$store.state.user.userLoginInfo.actualName,
        attachmentUrl: file.response.data.content.picPath[0],
        createId: this.$store.state.user.userLoginInfo.userId
      };
      // console.log();
      this.leaderform.attachments.push(data);
    },
    load (index) {

    },
    remove (index) {

    },
    getPostlist () {
      const searchFrom = {
        pageNum: 1,
        pageSize: 9999
      };
      positionApi.postList(searchFrom).then((res) => {
        if (res.ret === 200) {
          this.postData = res.data.content.list;
        } else {
          console.log('列表出错');
        }
      });
    },
    showorg_ass () {
      this.mytype = 2;
      this.visiable_org = true;
    },
    updateStat_org (stat, orgList, type) {
      this.visiable_org = stat;
      if (orgList) {
        console.log(type);
        if (type === 1) {
          this.leaderform.organizationName = orgList.organizationOaName;
          this.leaderform.organizationId = orgList.organizationOa;
        } else {
          console.log('进入此');
          this.leaderform.organizationName = orgList.organizationOaName;
          this.leaderform.organizationId = orgList.organizationOa;
          console.log(this.leaderform.organizationName);
        }
      }
    },
    selectemp (value) {
      this.backvalue = value;
      this.visiable = true;
    },
    updateStat (state, row) {
      this.visiable = state;
      if (row) {
        console.log('this.backvalue=========', this.backvalue);
        switch (this.backvalue) {
          case 'ownerId':
            this.leaderform.ownerId = Number(row.empIds);
            this.leaderform.ownerName = row.names;
            break;
          case 'employeeId':
            this.leaderform.employeeId = Number(row.empIds);
            this.leaderform.employeeName = row.names;
            break;
          default:
            break;
        }
      }
    },
    cancel () {
      this.$emit('updateStat', false);
      this.leaderform = Object.assign({}, defaultleaderform);
    },
    reset () {
      this.leaderform = {};
    },
    handsave () {
      this.leaderform.classificationId = Number(this.$route.query.id);
      this.$refs['form2'].validate((valid) => {
        if (valid) {
          training.addTrainingDetail(this.leaderform).then((res) => {
            if (res.ret === 200) {
              this.$emit('updateStat', false);
              this.$Message.success(res.msg);
              this.leaderform = Object.assign({}, defaultleaderform);
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
</style>
