<template>
  <div>
    <Card dis-hover>
      <div style="display: flex;align-items: center;">
        <div style="margin-right: 7px">{{ $t("name") }}</div>
        <div>
          <Input v-model="listQuery.name"
                 clearable />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("phone") }}</div>
        <div>
          <Input v-model="listQuery.mobile"
                 clearable />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">QQ</div>
        <div>
          <Input v-model="listQuery.qq"
                 clearable />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("email") }}</div>
        <div>
          <Input v-model="listQuery.mail"
                 clearable />
        </div>

        <div style="margin-left: 50px;margin-right: 7px">{{ $t("group1") }}</div>
        <div>
          <Select v-model="listQuery.groupId"
                  style="width:150px"
                  clearable>
            <Option v-for="item in groupList"
                    :value="item.id"
                    :key="item.id">{{item.groupName}}</Option>
          </Select>
        </div>
        <Button type="primary"
                style="margin-left: 15px"
                @click="handleSelect">{{ $t("Search") }}</Button>
      </div>
    </Card>
    <Card class="warp-card"
          dis-hover>
      <div>
        <Button style="margin-right:15px;"
                @click="refresh"
                type="default">{{ $t('Reflash') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['101-102-1']"
                @click="addAddressBook"
                type="warning">{{ $t('Create') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['101-102-2']"
                @click="updateAddressBook"
                type="error">{{ $t('update1') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['101-102-3']"

                @click="deleteMore"
                type="error">{{ $t('Delete') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['101-102-50']"
                @click="deleteMore"
                type="info">{{ $t('daochu') }}</Button>
        <Button style="margin-right:15px;"
                v-privilege="['101-102-37']"
                @click="deleteMore"
                type="success">{{ $t('Import') }}</Button>
      </div>
    </Card>

    <Card style="margin-top:10px">
      <Table max-height="500px"
             :columns="tablecolumns"
             :data="tableData"
             @on-selection-change="changeTable"></Table>
      <Page :current="listQuery.pageNum"
            :page-size="listQuery.pageSize"
            :page-size-opts="[10, 20, 30, 50, 100]"
            :total="total"
            @on-change="changePageNum"
            @on-page-size-change="changePageSize"
            show-elevator
            show-sizer
            show-total
            style="margin:24px 0;text-align:right;"></Page>
    </Card>
    <Modal v-model="modal1"
           width="720px"
           :title="$t('tjtxl')">
      <div>
        <span style="border-left: 5px solid #2064ff;margin-right:10px"></span>
        <span>基本资料</span>
      </div>
      <Divider />
      <Form :model="formItem"
            ref="addFormRef"
            :rules="addFormRules"
            :label-width="80"
            inline>
        <FormItem label="姓名"
                  prop="name"
                  style="width:40%">
          <Input v-model="formItem.name"
                 placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="性别"
                  style="width:40%">
          <Select v-model="formItem.gender">
            <Option :value="0">男</Option>
            <Option :value="1">女</Option>
          </Select>
        </FormItem>
        <FormItem label="出身日期"
                  style="width:40%">
          <DatePicker type="date"
                      @on-change="handleChange"
                      format="yyyy-MM-dd"
                      placeholder="Select date"
                      style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem label="所在群组"
                  style="width:40%">
          <Select v-model="formItem.groupId">
            <Option v-for="item in groupList"
                    :value="item.id"
                    :key="item.id">{{item.groupName}}</Option>
          </Select>
        </FormItem>

        <FormItem label="共享给他人"
                  style="width:80%">
          <Checkbox v-model="formItem.whetherShare"
                    true-value="1"
                    false-value="0"> </Checkbox>
        </FormItem>

        <div>
          <span style="border-left: 5px solid #2064ff;margin-right:10px"></span>
          <span>联系资料</span>
        </div>
        <Divider />

        <FormItem label="QQ"
                  style="width:40%">
          <Input v-model.number="formItem.qq"
                 placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="手机号"
                  prop="mobile"
                  style="width:40%">
          <Input v-model="formItem.mobile"
                 placeholder="Enter something..."></Input>
        </FormItem>

        <FormItem label="传真"
                  prop="fax"
                  style="width:40%">
          <Input v-model="formItem.fax"
                 placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="电子邮箱"
                  prop="mail"
                  style="width:40%">
          <Input v-model="formItem.mail"
                 placeholder="Enter something..."></Input>
        </FormItem>

        <FormItem label="家庭住址"
                  prop="homeAddress"
                  style="width:80%">
          <Input v-model="formItem.homeAddress"
                 placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="工作单位"
                  prop="company"
                  style="width:80%">
          <Input v-model="formItem.company"
                 placeholder="Enter something..."></Input>
        </FormItem>

        <FormItem label="职位"
                  prop="post"
                  style="width:40%">
          <Input v-model="formItem.post"
                 placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="办公电话"
                  prop="officePhone"
                  style="width:40%">
          <Input v-model="formItem.officePhone"
                 placeholder="Enter something..."></Input>
        </FormItem>

        <FormItem label="单位地址"
                  prop="companyAddress"
                  style="width:80%">
          <Input v-model="formItem.companyAddress"
                 placeholder="Enter something..."></Input>
        </FormItem>

        <FormItem label="备注"
                  prop="note"
                  style="width:80%">
          <Input v-model="formItem.note"
                 type="textarea"
                 placeholder="Enter something..."></Input>
        </FormItem>

      </Form>

      <div slot="footer">
        <ButtonGroup>
          <Button type="primary"
                  size="large"
                  @click="ok">{{ $t("Save") }}</Button>
          <Button type="error"
                  size="large"
                  @click="cancel">{{
            $t("Close")
          }}</Button>
        </ButtonGroup>
      </div>
    </Modal>

    <Modal v-model="updatemodal"
           width="720px"
           :title="$t('xgtxl')">
      <div>
        <span style="border-left: 5px solid #2064ff;margin-right:10px"></span>
        <span>基本资料</span>
      </div>
      <Divider />
      <Form :model="updateForm"
            ref="updateFormRef"
            :label-width="80"
            :rules="addFormRules"
            inline>
        <FormItem label="姓名"
                  prop="name"
                  style="width:40%">
          <Input v-model="updateForm.name"
                 placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="性别"
                  style="width:40%">
          <Select v-model="updateForm.gender">
            <Option :value="0">男</Option>
            <Option :value="1">女</Option>
          </Select>
        </FormItem>
        <FormItem label="出身日期"
                  style="width:40%">
          <DatePicker type="date"
                      @on-change="handleChange2"
                      v-model="updateBirthDay"
                      format="yyyy-MM-dd"
                      placeholder="Select date"
                      style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem label="所在群组"
                  style="width:40%">
          <Select v-model="updateForm.groupId">
            <Option v-for="item in groupList"
                    :value="item.id"
                    :key="item.id">{{item.groupName}}</Option>
          </Select>
        </FormItem>

        <FormItem label="共享给他人"
                  style="width:80%">
          <Checkbox v-model="updateForm.whetherShare"
                    :true-value="1"
                    :false-value="0"> </Checkbox>
        </FormItem>

        <div>
          <span style="border-left: 5px solid #2064ff;margin-right:10px"></span>
          <span>联系资料</span>
        </div>
        <Divider />

        <FormItem label="QQ"
                  style="width:40%">
          <Input v-model.number="updateForm.qq"
                 placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="手机号"
                  prop="mobile"
                  style="width:40%">
          <Input v-model="updateForm.mobile"
                 placeholder="Enter something..."></Input>
        </FormItem>

        <FormItem label="传真"
                  prop="fax"
                  style="width:40%">
          <Input v-model="updateForm.fax"
                 placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="电子邮箱"
                  prop="mail"
                  style="width:40%">
          <Input v-model="updateForm.mail"
                 placeholder="Enter something..."></Input>
        </FormItem>

        <FormItem label="家庭住址"
                  prop="homeAddress"
                  style="width:80%">
          <Input v-model="updateForm.homeAddress"
                 placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="工作单位"
                  prop="company"
                  style="width:80%">
          <Input v-model="updateForm.company"
                 placeholder="Enter something..."></Input>
        </FormItem>

        <FormItem label="职位"
                  prop="post"
                  style="width:40%">
          <Input v-model="updateForm.post"
                 placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="办公电话"
                  prop="officePhone"
                  style="width:40%">
          <Input v-model="updateForm.officePhone"
                 placeholder="Enter something..."></Input>
        </FormItem>

        <FormItem label="单位地址"
                  prop="companyAddress"
                  style="width:80%">
          <Input v-model="updateForm.companyAddress"
                 placeholder="Enter something..."></Input>
        </FormItem>

        <FormItem label="备注"
                  prop="note"
                  style="width:80%">
          <Input v-model="updateForm.note"
                 type="textarea"
                 placeholder="Enter something..."></Input>
        </FormItem>

      </Form>

      <div slot="footer">
        <ButtonGroup>
          <Button type="primary"
                  size="large"
                  @click="ok_edit">{{ $t("Save") }}</Button>
          <Button type="error"
                  size="large"
                  @click="cancel_edit">{{
            $t("Close")
          }}</Button>
        </ButtonGroup>
      </div>
    </Modal>
  </div>
</template>
<script>
import { addressBook } from '@/api/addressBook';
import { personSetting } from '@/api/personSetting';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10
};
export default {
  data () {
    return {
      modal1: false,
      tablecolumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('name'),
          key: 'name'
        },
        {
          title: this.$t('sex'),
          key: 'gender',
          render: (h, params) => {
            if (params.row.gender === 0) {
              return h('span', '男');
            } if (params.row.gender === 1) {
              return h('span', '女');
            } else {
              return h('span', '未知');
            }
          }
        },
        {
          title: this.$t('position1'),
          key: 'post'
        },
        {
          title: this.$t('workAddress'),
          key: 'company'
        },
        {
          title: this.$t('address'),
          key: 'homeAddress'
        },
        {
          title: 'QQ',
          key: 'qq'
        },
        {
          title: this.$t('phone'),
          key: 'mobile'
        },
        {
          title: this.$t('email'),
          key: 'mail'
        },
        {
          title: this.$t('group1'),
          key: 'groupId'
        }
      ],
      tableData: [],
      total: 0,
      listQuery: Object.assign({}, defaultListQuery),
      formItem: {
        whetherShare: 0
      },
      groupList: [],
      selectedData: [],
      updatemodal: false,
      updateForm: {},
      updateBirthDay: null,
      addFormRules: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: 'The gender cannot be empty', trigger: 'blur' }
        ],
        groupId: [
          { required: true, message: 'The group cannot be empty', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: 'The mobile cannot be empty', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        fax: [
          { required: true, message: 'The fax cannot be empty', trigger: 'blur' }
        ],
        homeAddress: [
          { required: true, message: 'The homeAddress cannot be empty', trigger: 'blur' }
        ],
        company: [
          { required: true, message: 'The company cannot be empty', trigger: 'blur' }
        ],
        post: [
          { required: true, message: 'The post cannot be empty', trigger: 'blur' }
        ],
        officePhone: [
          { required: true, message: 'The required cannot be empty', trigger: 'blur' }
        ],
        companyAddress: [
          { required: true, message: 'The companyAddress cannot be empty', trigger: 'blur' }
        ],
        note: [
          { required: true, message: 'The note cannot be empty', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    this.getList();
    this.getGroupList();
  },
  methods: {
    getList () {
      this.listQuery.employeeId = this.$store.state.user.userLoginInfo.userId;
      addressBook.findMyAddressBook(this.listQuery).then(res => {
        this.tableData = res.data.list;
        this.total = res.data.totalCount;
        console.log(res);
      });
    },
    getGroupList () {
      const data = {
        employeeId: this.$store.state.user.userLoginInfo.userId,
        pageNum: 1,
        pageSize: 20
      };
      personSetting.findGroup(data).then(res => {
        this.groupList = res.data.list;
      });
    },
    // 修改通讯录
    updateAddressBook () {
      if (this.selectedData !== null && this.selectedData !== '' && this.selectedData !== undefined) {
        if (this.selectedData.length !== 1) {
          return this.$Message.error('必须且只能选中一行');
        }
      }
      this.updateForm = this.selectedData[0];
      this.updateBirthDay = this.updateForm.birthday;
      this.updatemodal = true;
      console.log(111111123, this.updateForm);
    },
    changePageNum (val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    changePageSize (val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    changeTable (val) {
      this.selectedData = val;
    },
    refresh () {
      this.getList();
    },
    addAddressBook () {
      this.modal1 = true;
    },
    deleteMore () {
      console.log(22222222, this.selectedData);
      if (this.selectedData === null || this.selectedData === '' || this.selectedData === undefined || this.selectedData.length < 1) {
        return this.$Message.error('必须选中一行');
      }

      const idList = [];
      this.selectedData.forEach(element => {
        idList.push(element.id);
      });
      addressBook.deleteAddressBook(idList).then(res => {
        this.$Message.error('删除成功');
        this.getList();
      });
    },
    handleSelect () {
      this.getList();
    },
    handleChange (daterange) {
      this.formItem.birthday = daterange;
    },
    handleChange2 (val) {
      this.updateForm.birthday = val;
    },
    ok () {
      this.$refs.addFormRef.validate((valid) => {
        if (valid) {
          this.formItem.gender = Number(this.formItem.gender);
          this.formItem.whetherShare = Number(this.formItem.whetherShare);
          this.formItem.employeeId = this.$store.state.user.userLoginInfo.userId;
          addressBook.addAddressBook(this.formItem).then(res => {
            this.modal1 = false;
            this.$Message.success('添加成功');
            this.formItem = {};
            this.getList();
          });
        } else {
          this.$Message.error('Plaese Fill All Infomation!');
        }
      });
    },
    cancel () {
      this.modal1 = false;
      this.formItem = {};
    },
    ok_edit () {
      this.$refs.updateFormRef.validate((valid) => {
        if (valid) {
          addressBook.updateAddressBook(this.updateForm).then(res => {
            this.$Message.success('修改成功');
            this.updatemodal = false;
            this.getList();
          });
        } else {
          this.$Message.error('Plaese Fill All Infomation!');
        }
      });
    },
    cancel_edit () {
      this.updatemodal = false;
      this.updateForm = {};
    }
  }
};
</script>
