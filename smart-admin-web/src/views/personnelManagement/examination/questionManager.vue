<template>
  <div>
    <Card class="warp-card"
          dis-hover>
      <div style="display:flex;flex-wrap: wrap;">
        <div style="padding:16px;width:30%;">
          <Card style="height:25vh;cursor:pointer;"
                class="position_mid"
                @click.native="additem">
            <div style="height:100%;width:100%;">
              <Icon type="md-add" /> <span>{{ $t("tj") }}</span>
            </div>
          </Card>
        </div>
        <div style="padding:16px;width:30%;"
             v-for="(item, index) in items"
             :key="index">
          <Card style="height:25vh;cursor:pointer;">
            <div style="height:100%;width:100%;display:flex;"
                 @click="goitem(item.id)">
              <div class="detail_left"
                   style="height:100px;">
                <Icon type="md-filing"
                      size="25" />
              </div>
              <div class="detail_right">
                <div class="title">{{ item.typeName }}</div>
                <div class="content">
                  <p>{{ item.desc }}</p>
                </div>
              </div>
            </div>
            <div style="display:flex;justify-content: space-around;"
                 class="bottom_menu">
              <Poptip confirm
                      :title="$t('isokdel')"
                      @on-ok="ok_del(item.id)"
                      @on-cancel="cancel_del">
                <Button type="text">{{ $t("sc") }}</Button>
              </Poptip>

              <span style="color:#ebebeb;">|</span>
              <Button type="text"
                      @click="Edit_form(item)">{{
                $t("Edit")
              }}</Button>
            </div>
          </Card>
        </div>
      </div>
    </Card>
    <!-- 添加类型 -->
    <Modal v-model="typeDialog"
           title="添加类型">
      <Form ref="formInline"
            :model="addformbase"
            :rules="ruleInline"
            :label-width="80">
        <FormItem prop="typeName"
                  :label="$t('lbmc')">
          <Input type="text"
                 v-model="addformbase.typeName"
                 placeholder="请输入类别名称">
          </Input>
        </FormItem>
        <FormItem prop="desc"
                  :label="$t('ms')">
          <Input type="textarea"
                 v-model="addformbase.desc"
                 placeholder="请输入描述">
          </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <ButtonGroup>
          <Button type="primary"
                  size="large"
                  :loading="modal_loading_new"
                  @click="ok">{{ $t("Save") }}</Button>
          <Button type="error"
                  size="large"
                  @click="cancel">{{
            $t("Close")
          }}</Button>
        </ButtonGroup>
      </div>
    </Modal>
    <!-- 修改类型 -->
    <Modal v-model="typeDialog_edit"
           title="修改类型"
           @on-ok="ok_edit"
           @on-cancel="cancel_edit">
      <Form ref="formInline"
            :model="addformbase"
            :rules="ruleInline"
            :label-width="80">
        <FormItem prop="typeName"
                  :label="$t('lbmc')">
          <Input type="text"
                 v-model="addformbase.typeName"
                 placeholder="请输入类别名称">
          </Input>
        </FormItem>
        <FormItem prop="desc"
                  :label="$t('ms')">
          <Input type="textarea"
                 v-model="addformbase.desc"
                 placeholder="请输入描述">
          </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <ButtonGroup>
          <Button type="primary"
                  size="large"
                  :loading="modal_loading"
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
import { examination } from '@/api/examination';
const defaultform = {
  typeName: '',
  desc: '',
  createId: 1
};
export default {
  name: 'traning',
  components: {},
  props: {},
  data () {
    return {
      items: [],
      addformbase: Object.assign({}, defaultform),
      typeDialog: false,
      typeDialog_edit: false,
      ruleInline: {
        typeName: [
          {
            required: true,
            message: 'Please fill in the materialsName',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: 'Please fill in the describe',
            trigger: 'blur'
          }
        ]
      },
      modal_loading: false,
      modal_loading_new: false
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {

  },
  mounted () {
    this.getItem();
  },
  methods: {
    Edit_form (val) {
      console.log(val);
      this.addformbase = Object.assign({}, val);
      this.$refs.formInline.resetFields();
      this.typeDialog_edit = true;
    },

    // 确认修改
    ok_edit () {
      this.modal_loading = true;
      const data = JSON.stringify(this.addformbase);
      this.$refs.formInline.validate(res => {
        console.log('res===========', res);
        if (res) {
          examination.updateExaminationType(data).then(res => {
            console.log(res);
            this.typeDialog_edit = false;
            this.addformbase = Object.assign({}, defaultform);
            this.getItem();
            this.modal_loading = false;
          });
        } else {
          this.$Message.warning(this.$t('yzbtg'));
          this.this.modal_loading = false;
        }
      });
    },

    // 取消编辑
    cancel_edit () {
      this.typeDialog_edit = false;
      this.addformbase = Object.assign({}, defaultform);
    },

    // 确认删除
    ok_del (id) {
      const data = {
        id: id
      };
      examination.deleteExaminationType(data).then(res => {
        this.$Message.success(this.$t('sccg'));
        this.getItem();
      });
    },

    // 取消删除
    cancel_del () { },

    // 查询考试分类
    getItem () {
      examination.findExaminationType().then(res => {
        console.log(res);
        this.items = res.data;
      });
    },

    // 打开添加考试分类对话框
    additem () {
      this.$refs.formInline.resetFields();
      this.typeDialog = true;
    },
    goitem (id) {
      this.$router.push({
        path: '/examination/questionList',
        query: {
          id: id
        }
      });
    },

    // 添加考试分类
    ok () {
      this.modal_loading_new = true;
      const data = JSON.stringify(this.addformbase);
      this.$refs.formInline.validate(res => {
        if (res) {
          examination.addExaminationType(data).then(res => {
            console.log(res);
            this.typeDialog = false;
            this.addformbase = Object.assign({}, defaultform);
            this.getItem();
            this.modal_loading_new = false;
          });
        } else {
          this.$Message.warning(this.$t('yzbtg'));
          this.modal_loading_new = false;
        }
      });
    },
    cancel () {
      this.addformbase = Object.assign({}, defaultform);
      this.typeDialog = false;
    }
  }
};
</script>
<style lang="less" scoped>
.position_mid {
  display: flex;
  justify-content: center;
  align-items: center;
}
.detail_left {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.detail_right {
  flex: 4;
  .title {
    font-size: 24px;
    margin-bottom: 16px;
  }
  .content {
    font-size: 16px;
    line-height: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    justify-content: space-around;
  }
}
.bottom_menu {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #f7f9fa;
  height: 50px;
  align-items: center;
}
</style>
