<template>
  <div>
    <Card class="warp-card" dis-hover style="height: calc(100vh - 75px)">
      <div style="margin-bottom: 20px">
        <Button
          style="margin-right: 15px"
          @click="handleBack"
          icon="md-refresh"
          type="default"
          >{{ $t("Back") }}</Button
        >
        <!-- <Button
          v-privilege="['10-12-1']"
          v-if="addformbase.status === 0 "
          style="margin-right: 15px"
          @click="addGong"
          icon="md-add"
          type="warning"
          >{{ $t("Tjwj") }}</Button
        > -->
        <Upload ref="upload" v-if="addformbase.status === 0" :action="myupLoadUrl" style="display:inline-block;margin-right: 15px" :data="uploadObject" :before-upload="handleUpload" :show-upload-list="false" :on-success="handleRefresh">
          <Button icon="ios-cloud-upload-outline">{{ $t("Tjwj") }}</Button>
        </Upload>
        <Button
          v-privilege="['10-12-1']"
          v-if="addformbase.status === 0 "
          style="margin-right: 15px"
          @click="handleProcess"
          icon="md-add"
          type="warning"
          >{{ $t("Process") }}</Button
        >
        <Button
          v-privilege="['10-12-1']"
          v-if="addformbase.status === 0 "
          style="margin-right: 15px"
          @click="endEvent"
          icon="md-add"
          type="warning"
          >{{ $t("Ending") }}</Button
        >
        <Button
          v-privilege="['10-12-3']"
          style="margin-right: 15px"
          icon="md-close"
          type="error"
          @click="delEvent"
          >{{ $t("Delete") }}</Button
        >
      </div>
      <Tabs :animated="false">
        <TabPane v-privilege="['10-12-4']" :label="$t('BaseData')">
          <Form
          ref="form"
          :model="addformbase"
          label-position="right"
          :label-width="100"
          inline
        >
          <Row>
            <Col span="24">
              <FormItem :label="$t('shijianbiaoti')" style="width: 100%;height:60px" prop="title">
                <span>{{ addformbase.title }}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('lianxiren')" style="width: 100%;height:60px" prop="contactName">
                <span> {{ addformbase.contactName }}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('shijianfang')" style="width: 100%;height:60px" >
                <span>{{ addformbase.organizationName }}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('chuliren')" style="width: 100%;height:60px" prop="handPersonName">
                <span>{{ addformbase.handPersonName }}</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('shijianshijian')" style="width: 100%;height:60px">
                <span>{{ addformbase.createtimeStr }}</span>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem :label="$t('shijianneirong')" style="width: 100%;height:60px" prop="content">
                <span> {{ addformbase.content }}</span>
              </FormItem>
            </Col>
          </Row>
        </Form>
        </TabPane>
        <TabPane v-privilege="['10-11-4']" :label="$t('gengjingjilu')">
          <Table
            :columns="processColumns"
            :data="processData"
            :loading="Sheloading"
          ></Table>
        </TabPane>
        <TabPane v-privilege="['10-11-4']" :label="$t('wendangqu')">
          <Table
            :columns="documentColumns"
            :data="documentData"
            :loading="documentLoading"
          ></Table>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import { publicEventsList } from '@/api/publicEventsList';
import { utils } from '@/lib/util';
export default {
  name: 'publicEventsDetail',
  components: {},
  props: {},
  data () {
    let baseUrl = process.env.VUE_APP_URL;
    return {
      myupLoadUrl: baseUrl + '/uploadDocuments/uploadDocument',
      uploadObject: {
        name: '',
        uploadPersonId: this.$store.state.user.userLoginInfo.userId,
        type: 1,
        id: this.$route.query.id
      },
      addformbase: {},
      //   社保
      Shevisiable: false,
      Sheloading: false,
      documentLoading: false,
      Shesearchform: {
        pageNum: 1,
        pageSize: 10
      },
      // table表头
      processColumns: [
        {
          title: this.$t('genjinshijian'),
          key: 'finishTime',
          render: (h, params) => {
            let date = 'N/A';
            if (params.row.finishTime) {
              const temp = new Date(params.row.finishTime);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('span', date);
          }
        },
        {
          title: this.$t('genjinren'),
          key: 'handPersonName'
        },
        {
          title: this.$t('genjinfangshi'),
          key: 'followWay'
        },
        {
          title: this.$t('genjinneirong'),
          key: 'followContent',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    innerHTML: params.row.followContent
                  }
                },
                ''
              )
            ]);
          }
        }
      ],
      documentData: [],
      documentColumns: [
        {
          title: this.$t('wenjianming'),
          key: 'name'
        },
        {
          title: this.$t('shangchuanshijian'),
          key: 'uploadTime',
          render: (h, params) => {
            let date = 'N/A';
            if (params.row.uploadTime) {
              const temp = new Date(params.row.uploadTime);
              date = utils.getDate(temp, 'YMDHM');
            }
            return h('span', date);
          }
        },
        {
          title: this.$t('shangchuanren'),
          key: 'uploadPersonName'
        },
        {
          title: this.$t('action'),
          key: 'followContent',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    size: 'small',
                    type: 'text'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.download(params.row);
                    }
                  }
                },
                this.$t('download')
              ),
              h(
                'Button',
                {
                  props: {
                    size: 'small',
                    type: 'text'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.delDocument(params.row);
                    }
                  }
                },
                this.$t('Delete')
              )
            ]);
          }
        }
      ],
      processData: [],
      // table数据
      Shedata: [],
      moreGong: [],
      moreShe: [],
      file: null,
      value: null
    };
  },
  computed: {},
  watch: {},
  filters: {},
  created () {},
  mounted () {
    this.getwelfareList();
    this.getprocessList();
    this.getdocumentList();
  },
  methods: {
    download (row) {
      const elt = document.createElement('a');
      elt.setAttribute('href', row.path);
      elt.setAttribute('download', row.name);
      elt.style.display = 'none';
      document.body.appendChild(elt);
      elt.click();
      document.body.removeChild(elt);
    },
    delDocument (row) {
      this.$Modal.confirm({
        title: this.$t('friendlyNotice'),
        content: this.$t('sureending4'),
        onOk: () => {
          const data = {
            id: row.id
          };
          publicEventsList.delDocument(data).then(res => {
            if (res.ret === 200) {
              this.$Message.success(res.msg);
              this.getdocumentList();
            }
          });
        }
      });
    },
    handleUpload (file) {
      this.file = file;
      console.log('this.file=============', this.file);
      this.$Modal.confirm({
        title: this.$t('tianjiawenjianbiaoti'),
        render: (h) => {
          return h('Input', {
            props: {
              value: this.value,
              placeholder: 'Please enter your fileName'
            },
            on: {
              input: (val) => {
                this.value = val;
              }
            }
          });
        },
        onOk: async () => {
          if (!this.value) {
            this.$Message(this.$t('qsrmc'));
            return false;
          }
          this.uploadObject.name = this.value;
          this.value = '';
          this.$refs.upload.post(this.file);
        },
        onCancel: () => {
          this.$Message.warning('cacel');
        }
      });
      return false;
    },
    handleRefresh () {
      this.getdocumentList();
    },
    handleLinkForm (response, file, fileList) {
      console.log(response);
    },
    endEvent () {
      this.$Modal.confirm({
        title: this.$t('friendlyNotice'),
        content: this.$t('sureending'),
        onOk: () => {
          const data = {
            id: this.$route.query.id,
            status: 1,
            updateTime: utils.getDateStr(0, 'YMD')
          };
          publicEventsList.updatestorage(data).then(res => {
            if (res.ret === 200) {
              this.$router.closeCurrentPage();
              this.$Message.success(res.msg);
            }
          });
        }
      });
    },
    delEvent () {
      this.$Modal.confirm({
        title: this.$t('friendlyNotice'),
        content: this.$t('sureDel'),
        onOk: () => {
          const data = {
            id: this.$route.query.id
          };
          publicEventsList.deletestorage(data).then(res => {
            if (res.ret === 200) {
              this.$router.closeCurrentPage();
              this.$Message.success(res.msg);
            }
          });
        }
      });
    },
    handleProcess () {
      this.$router.push({ path: '/publicRelationShip/followPublicEvents', query: { id: this.$route.query.id } });
    },
    handleBack () {
      this.$router.closeCurrentPage();
    },
    async getwelfareList () {
      const searchform = {
        pageNum: 1,
        pageSize: 99,
        id: this.$route.query.id
      };
      try {
        let result = await publicEventsList.getstorage(searchform);
        this.addformbase = Object.assign({}, result.data.list[0]);
        this.addformbase.handPersonName = this.addformbase.handlePersonName;
        this.addformbase.organizationName = this.addformbase.eventParty;
        const temp = new Date(this.addformbase.createtime);
        const date = utils.getDate(temp, 'YMDHM');
        this.addformbase.createtimeStr = date;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
        this.loading = false;
      }
    },
    async getprocessList () {
      const searchform = {
        pageNum: 1,
        pageSize: 99,
        id: this.$route.query.id
      };
      try {
        let result = await publicEventsList.getFollowStorage(searchform);
        this.processData = result.data.list;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
      }
    },
    async getdocumentList () {
      const searchform = {
        pageNum: 1,
        pageSize: 99,
        id: this.$route.query.id
      };
      try {
        let result = await publicEventsList.getDocumentList(searchform);
        this.documentData = result.data.list;
      } catch (e) {
        // TODO zhuoda sentry
        console.error(e);
      }
    },
    handleDelete () {
      this.$Modal.confirm({
        title: '友情提醒',
        content: '确定要删除吗？',
        onOk: () => {
          const data = {
            id: this.$route.query.id
          };
          publicEventsList.deletestorage(data).then(res => {
            this.$Message.success(this.$t('sccg'));
            this.getwelfareList();
          });
        }
      });
    },
    // 翻页
    GongchangePage (pageNum) {
      this.searchform.pageNum = pageNum;
      this.getGongList();
    },
    // 改变一页展示数
    GongchangePageSize (pageSize) {
      this.Gongsearchform.pageNum = 1;
      this.Gongsearchform.pageSize = pageSize;
      this.getGongList();
    },
    // 重置
    resetGong () {
      this.getGongList();
    },
    addGong () {
      this.Gongvisiable = true;
    },
    // 重置
    resetShe () {
      this.getSheList();
    },
    addShe () {
      this.Shevisiable = true;
    },
    updateStat_gong (state) {
      this.Gongvisiable = state;
      this.getGongList();
    },
    updateStat_she (state) {
      this.Shevisiable = state;
      this.getSheList();
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item {
  margin-bottom: 0;
}
</style>
