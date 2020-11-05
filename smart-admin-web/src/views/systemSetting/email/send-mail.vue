<template>
  <div>
    <Card class="warp-card" dis-hover>
      <Button icon="ios-arrow-back" @click="goBack">{{$t('notice_view.back')}}</Button>
    </Card>
    <Card class="warp-card" dis-hover>
      <Form :label-width="80" :model="form" :rules="ruleInline">
        <FormItem class="marginBottom20" :label="$t('notice_view.title')" prop="title">
          <Input class="addressWidth" placeholder="请输入标题" v-model="form.title"></Input>
        </FormItem>
        <FormItem class="marginBottom20" :label="$t('notice_view.startoEnd')">
          <DatePicker type="daterange" v-model="form.time" split-panels format="yyyy-MM-dd" placeholder="Select date" style="width: 200px" @on-change="time1"></DatePicker>
        </FormItem>
        <FormItem class="marginBottom20" :label="$t('notice_view.Enclosure')">
          <Upload
            multiple
            ref="upload"
            name="file"
            :data="{ type: 2 }"
            :before-upload="handleUpload"
            :on-success="mysuccess"
            :action="myupLoadUrl">
            <Button icon="ios-cloud-upload-outline">{{$t('notice_view.addEnclosure')}}</Button>
          </Upload>
          <div class="div" v-if="showfile">
          <div v-for="(item, index) in file" :key="index">
            <div>{{ item.name }} <Icon type="ios-trash-outline" style="cursor: pointer;" @click.native="handleRemove(item)"></Icon></div>
          </div>
        </div>
        </FormItem>
        <FormItem :label="$t('notice_view.content')" prop="content">
          <div id="editor"></div>
        </FormItem>
        <FormItem>
          <Button
            :loading="isShowSaveButtonLoading"
            @click="addOrUpdateEmail"
            type="primary"
          >保存</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import WangEditor from 'wangeditor';
import Cookies from 'js-cookie';
import config from '@/config';
import { noticeApi } from '@/api/notice';

const baseUrl = config.baseUrl.apiUrl;
export default {
  name: 'notice',
  components: {},
  props: {},
  data () {
    let baseUrl = process.env.VUE_APP_URL;
    return {
      showfile: false,
      myupLoadUrl: baseUrl + '/upload/uploadpic',
      // loading
      isShowSaveButtonLoading: false,
      // 上传
      upload: {
        uploadList: [],
        data: {
          type: 'NEWS_PIC'
        }
      },
      // 富文本编辑器对象
      editor: null,
      // 基础路径
      baseUrl: baseUrl,
      // 传输内容
      form: {
        // 收件人
        title: '',
        time: '',
        content: ''
      },
      // 验证规则
      ruleInline: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      file: [],
      picIds: [],
      // 计数器
      count: 0,
      id: null
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.initEditor();
    this.getEmailDetails();
  },
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {},
  methods: {
    time1 (e) {
      this.form.time2 = e;
    },
    // 上传之前函数
    handleUpload (file) {
      this.file.push(file);
      this.showfile = true;
      console.log(this.file);
      return false;
    },
    // 后退
    goBack () {
      this.$router.closeCurrentPage();
    },
    // 富文本初始化
    initEditor () {
      let g = this;
      g.editor = new WangEditor('#editor');
      g.editor.customConfig = {
        // 功能键
        menus: [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'list', // 列表
          'justify', // 对齐方式 // 表情
          'image', // 插入图片
          'table', // 表格
          'undo', // 撤销
          'redo' // 重复
        ],
        showLinkImg: false,
        uploadImgShowBase64: true,
        zIndex: 250
      };
      g.editor.create();
    },
    // 保存邮件
    async addOrUpdateEmail () {
      // 富文本
      this.form.content = this.editor.txt.html();
      this.form.createId = this.$store.state.user.userLoginInfo.userId;
      if (this.form.time2 !== null && this.form.time2 !== undefined && this.form.time2 !== '') {
        this.form.beginTime = this.form.time2[0];
        this.form.endTime = this.form.time2[1];
      }
      console.log(this.file);
      let newsId = this.$route.query.id;
      if (newsId) {
        if (this.file.length > 0) {
          this.uploadImg();
        } else {
          this.editEmail();
        }
      } else {
        if (this.file.length > 0) {
          this.uploadImg();
        } else {
          this.addNew();
        }
      }
      // 纯文本
      // let newsId = this.$route.query.id;
      // if (newsId) {
      // 编辑
      // this.editEmail();
      // } else {
      // 新增
      // }
    },
    // 新增
    async addNew () {
      try {
        this.$Spin.show();
        this.isShowSaveButtonLoading = true;
        if (this.picIds !== undefined && this.picIds !== null && this.picIds !== '') {
          this.form.picIds = [...this.picIds].join(',');
        }
        let res = await noticeApi.addNotice(this.form);
        console.log('this.form============>', this.form, res);
        this.isShowSaveButtonLoading = false;
        this.$Spin.hide();
        this.$Message.success('新建成功');
        this.goBack();
      } catch (error) {
        // TODO zhuoda sentry
        console.error(error);
        this.isShowSaveButtonLoading = false;
        this.$Spin.hide();
      }
    },
    // 编辑
    async editEmail () {
      this.isShowSaveButtonLoading = true;
      this.$Spin.show();
      try {
        this.form.operatId = this.$store.state.user.userLoginInfo.userId;
        let res = await noticeApi.updateNotice(this.form);
        this.isShowSaveButtonLoading = false;
        this.$Spin.hide();
        if (this.picIds !== undefined && this.picIds !== null && this.picIds !== '') {
          this.form.picIds = [...this.picIds].join(',');
        }
        this.$Message.success('编辑成功');
        this.goBack();
      } catch (error) {
        // TODO zhuoda sentry
        console.error(error);
        this.isShowSaveButtonLoading = false;
      } finally {
        this.$Spin.hide();
      }
    },
    // 获取详情
    async getEmailDetails () {
      this.$Spin.show();
      try {
        let id = this.$route.query.id;
        let data = {};
        data.noticeId = id;
        console.log('修改=============================================>');

        if (id) {
          let res = await noticeApi.getNoticeList(data);
          console.log('res==========>', res.data.content.list);
          this.form = res.data.content.list[0];
          this.form.noticeId = res.data.content.list[0].id;
          this.editor.txt.html(res.data.content.list[0].content);
          this.form.time = [this.form.beginTime, this.form.endTime];
        }
      } catch (error) {
        // TODO zhuoda sentry
        console.error(error);
      } finally {
        this.$Spin.hide();
      }
    },
    // 删除附件
    handleRemove (file) {
      const fileList = this.file;
      console.log('删除===========>', this.$refs.upload);
      fileList.splice(fileList.indexOf(file), 1);
    },
    // 上传文件
    uploadImg () { // 上传文件
      console.log(this.file);
      this.showfile = false;
      console.log(this.$refs.upload.post);
      for (const i in this.file) {
        this.$refs.upload.post(this.file[i]);
      }
      this.count = 0;
    },
    mysuccess (response, file, fileList) {
      console.log(response, file, fileList);
      let id = response.data.content.picId;
      this.picIds.push(response.data.content.picId);
      console.log([...this.picIds]);
      this.count++;
      console.log(this.count, fileList.length);
      if (this.count === fileList.length) {
        let newsId = this.$route.query.id;
        if (newsId) {
          this.editEmail();
        } else {
          this.addNew();
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.addressWidth {
  width: 350px;
}
.marginTop20 {
  margin-top: 20px;
}
.marginBottom20 {
  margin-bottom: 20px;
}
</style>
